use crate::scraper::client::DiscogsClient;
use crate::scraper::db::DatabaseWriter;
use crate::scraper::release::fetch_release;
use crate::scraper::{Result, ScraperError};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use tauri::{AppHandle, Manager};
use tauri::Emitter;

#[derive(Debug, Clone, serde::Serialize)]
pub struct ScrapeResult {
    pub albums_added: u32,
    pub albums_updated: u32,
    pub total_items: u32,
}

pub struct ScrapeJob {
    cancelled: Arc<AtomicBool>,
    client: DiscogsClient,
    db: DatabaseWriter,
    app: AppHandle,
}

async fn get_discogs_token_from_db(app: &AppHandle) -> Result<String> {
    // Try to get token from settings first using the SQL plugin
    // The plugin provides access via app.state() but we need to use it differently
    // For now, let's use sqlx to query the same database
    use sqlx::sqlite::SqlitePoolOptions;
    
    let app_data_dir = app.path()
        .app_data_dir()
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to get app data dir: {}", e)))?;
    let db_path = app_data_dir.join("discogs.db");
    
    let pool = SqlitePoolOptions::new()
        .connect_with(
            sqlx::sqlite::SqliteConnectOptions::new()
                .filename(&db_path)
                .create_if_missing(true),
        )
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to connect to database: {}", e)))?;
    
    let result = sqlx::query_as::<_, (String,)>(
        "SELECT value FROM settings WHERE key = ?"
    )
    .bind("discogs_token")
    .fetch_optional(&pool)
    .await
    .map_err(|e| ScraperError::DatabaseError(format!("Failed to query settings: {}", e)))?;
    
    if let Some((token,)) = result {
        if !token.is_empty() {
            return Ok(token);
        }
    }
    
    // Fallback to .env for testing (development only)
    #[cfg(debug_assertions)]
    {
        use std::env;
        use dotenvy;
        dotenvy::dotenv().ok();
        if let Ok(token) = env::var("DISCOGS_TOKEN") {
            log::warn!("Using DISCOGS_TOKEN from .env (testing only)");
            return Ok(token);
        }
    }
    
    Err(ScraperError::MissingToken)
}

impl ScrapeJob {
    pub async fn new(app: AppHandle) -> Result<Self> {
        // Get token from settings
        let token = get_discogs_token_from_db(&app).await?;
        
        Ok(Self {
            cancelled: Arc::new(AtomicBool::new(false)),
            client: DiscogsClient::new(token)?,
            db: DatabaseWriter::new(app.clone()),
            app,
        })
    }

    pub fn cancel(&self) {
        self.cancelled.store(true, Ordering::Relaxed);
    }

    fn check_cancelled(&self) -> Result<()> {
        if self.cancelled.load(Ordering::Relaxed) {
            Err(ScraperError::Cancelled)
        } else {
            Ok(())
        }
    }

    pub async fn run(&self, seller: String, limit: Option<u32>, batch_size: Option<u32>) -> Result<ScrapeResult> {
        let batch_size = batch_size.unwrap_or(10); // Default to 10 for testing
        log::info!("Starting scrape for seller: {}, limit: {:?}, batch_size: {}", seller, limit, batch_size);
        
        // Phase 1: Fetch and save inventory
        self.app
            .emit("scraper:started", serde_json::json!({
                "seller": seller,
                "limit": limit
            }))
            .ok();

        let mut albums_added = 0;
        let mut albums_updated = 0;
        let mut release_ids = Vec::new();

        // Phase 1: Fetch inventory pages and save basic album data
        let mut page = 1;
        let per_page = 100;
        let mut processed = 0;
        let mut total_items = 0;

        loop {
            self.check_cancelled()?;

            let inventory_response = self.client.get_inventory(&seller, page, per_page).await?;
            
            // Set total items from first page
            if page == 1 {
                total_items = inventory_response.pagination.items;
                self.app
                    .emit("scraper:progress", serde_json::json!({
                        "phase": "inventory",
                        "current": 0,
                        "total": total_items
                    }))
                    .ok();
            }

            for listing in inventory_response.listings {
                self.check_cancelled()?;

                release_ids.push(listing.release.id);

                // Check if album already exists
                let exists = self.db.album_exists(listing.release.id).await?;

                if !exists {
                    match self.db.save_album_from_listing(&listing).await {
                        Ok(_) => {
                            albums_added += 1;
                            log::info!("Saved album {}: {} - {}", listing.release.id, listing.release.artist, listing.release.title);
                            
                            self.app
                                .emit("scraper:item_saved", serde_json::json!({
                                    "release_id": listing.release.id,
                                    "title": listing.release.title
                                }))
                                .ok();
                        }
                        Err(e) => {
                            log::warn!("Failed to save album {}: {}", listing.release.id, e);
                            self.app
                                .emit("scraper:error", serde_json::json!({
                                    "message": format!("Failed to save album {}: {}", listing.release.id, e)
                                }))
                                .ok();
                        }
                    }
                } else {
                    log::debug!("Album {} already exists, skipping", listing.release.id);
                }

                processed += 1;

                // Emit progress every 10 items or at the end
                if processed % 10 == 0 || processed == total_items {
                    self.app
                        .emit("scraper:progress", serde_json::json!({
                            "phase": "inventory",
                            "current": processed,
                            "total": total_items
                        }))
                        .ok();
                }

                // Check limit
                if let Some(max_items) = limit {
                    if processed >= max_items {
                        break;
                    }
                }
            }

            // Check limit before continuing to next page
            if let Some(max_items) = limit {
                if processed >= max_items {
                    break;
                }
            }

            if page >= inventory_response.pagination.pages {
                break;
            }

            page += 1;
        }

        // Phase 2: Enrich releases with detailed data (in configurable batches)
        let total_to_enrich = release_ids.len();
        
        self.app
            .emit("scraper:progress", serde_json::json!({
                "phase": "enrichment",
                "current": 0,
                "total": total_to_enrich
            }))
            .ok();

        let mut enrichment_processed = 0;
        
        // Process in batches
        for batch_start in (0..release_ids.len()).step_by(batch_size as usize) {
            self.check_cancelled()?;
            
            let batch_end = (batch_start + batch_size as usize).min(release_ids.len());
            let batch = &release_ids[batch_start..batch_end];
            
            log::info!("Processing enrichment batch {}-{} of {}", batch_start + 1, batch_end, total_to_enrich);
            
            for release_id in batch {
                self.check_cancelled()?;

                // Only fetch if album exists (was added in phase 1)
                if self.db.album_exists(*release_id).await? {
                    match fetch_release(&self.client, *release_id).await {
                        Ok(release) => {
                            match self.db.update_album_with_release(&release).await {
                                Ok(_) => {
                                    albums_updated += 1;
                                    log::info!("Enriched release {}: {}", release_id, release.title);
                                }
                                Err(e) => {
                                    log::warn!("Failed to update release {}: {}", release_id, e);
                                    self.app
                                        .emit("scraper:error", serde_json::json!({
                                            "message": format!("Failed to update release {}: {}", release_id, e)
                                        }))
                                        .ok();
                                }
                            }
                        }
                        Err(e) => {
                            log::warn!("Failed to fetch release {}: {}", release_id, e);
                            self.app
                                .emit("scraper:error", serde_json::json!({
                                    "message": format!("Failed to fetch release {}: {}", release_id, e)
                                }))
                                .ok();
                        }
                    }
                }

                enrichment_processed += 1;
            }
            
            // Emit progress after each batch
            self.app
                .emit("scraper:progress", serde_json::json!({
                    "phase": "enrichment",
                    "current": enrichment_processed,
                    "total": total_to_enrich,
                    "batch_info": format!("Batch {}-{}", batch_start + 1, batch_end)
                }))
                .ok();
            
            // Small delay between batches to avoid overwhelming the API
            tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
        }

        let result = ScrapeResult {
            albums_added,
            albums_updated,
            total_items,
        };

        log::info!("Scrape completed: added={}, updated={}, total={}", 
            albums_added, albums_updated, total_items);

        self.app
            .emit("scraper:completed", serde_json::json!(result))
            .ok();

        Ok(result)
    }
}
