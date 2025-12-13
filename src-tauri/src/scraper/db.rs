use crate::scraper::types::{ReleaseResponse, Listing};
use crate::scraper::{Result, ScraperError};
use tauri::{AppHandle, Manager};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::Row;

pub struct DatabaseWriter {
    app: AppHandle,
}

impl DatabaseWriter {
    pub fn new(app: AppHandle) -> Self {
        Self { app }
    }

    async fn get_pool(&self) -> Result<sqlx::SqlitePool> {
        // Get the database path from Tauri's app data directory
        let app_data_dir = self.app.path()
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
        
        Ok(pool)
    }

    pub async fn save_album_from_listing(&self, listing: &Listing) -> Result<()> {
        let pool = self.get_pool().await?;
        let release = &listing.release;
        
        let artist = release.artist.clone();
        let year = release.year.map(|y| y as i64);
        let catalog_number = release.catalog_number.clone().unwrap_or_default();
        let format = release.format.clone().unwrap_or_default();
        let cover_image_url = release.thumbnail.clone().unwrap_or_default();
        let release_id_str = release.id.to_string();
        
        sqlx::query!(
            r#"
            INSERT OR REPLACE INTO albums (
                discogs_release_id, artist, title, label, catalog_number,
                format, country, released_year, cover_image_url, resource_url,
                updated_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, CURRENT_TIMESTAMP)
            "#,
            release_id_str,
            artist,
            release.title,
            None::<String>, // label
            catalog_number,
            format,
            None::<String>, // country
            year,
            cover_image_url,
            release.resource_url,
        )
        .execute(&pool)
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to save album: {}", e)))?;

        // Save seller first to satisfy foreign key constraint
        let seller_id = self.save_seller(&pool, &listing.seller).await?;
        self.save_collection_item(&pool, listing, seller_id).await?;

        Ok(())
    }

    async fn save_seller(&self, pool: &sqlx::SqlitePool, seller: &crate::scraper::types::Seller) -> Result<i64> {
        let discogs_seller_id = seller.id as i64;
        let username = &seller.username;
        let uri = seller.resource_url.as_deref();
        
        // Insert or update seller (using runtime query to avoid compile-time schema validation)
        sqlx::query(
            r#"
            INSERT INTO sellers (discogs_seller_id, name, uri)
            VALUES (?1, ?2, ?3)
            ON CONFLICT(discogs_seller_id) DO UPDATE SET
                name = excluded.name,
                uri = excluded.uri
            "#
        )
        .bind(discogs_seller_id)
        .bind(username)
        .bind(uri)
        .execute(pool)
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to save seller: {}", e)))?;
        
        // Get the seller's internal ID (using runtime query)
        let row = sqlx::query(
            r#"SELECT id FROM sellers WHERE discogs_seller_id = ?1"#
        )
        .bind(discogs_seller_id)
        .fetch_one(pool)
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to fetch seller ID: {}", e)))?;
        
        let seller_id: i64 = row.try_get("id")
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to get seller ID from row: {}", e)))?;
        
        Ok(seller_id)
    }

    async fn save_collection_item(&self, pool: &sqlx::SqlitePool, listing: &Listing, seller_id: i64) -> Result<()> {
        let release_id_str = listing.release.id.to_string();
        let condition = listing.condition.as_deref();
        let sleeve_condition = listing.sleeve_condition.as_deref();
        let comments = listing.comments.as_deref();
        let is_available = listing.status == "For Sale";

        sqlx::query!(
            r#"
            INSERT INTO collection_items (
                album_id, seller_id, price, currency, condition,
                sleeve_condition, notes, is_available, item_url
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
            "#,
            release_id_str,
            seller_id,
            listing.price.value,
            listing.price.currency,
            condition,
            sleeve_condition,
            comments,
            is_available,
            listing.uri,
        )
        .execute(pool)
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to save collection item: {}", e)))?;

        Ok(())
    }

    pub async fn update_album_with_release(&self, release: &ReleaseResponse) -> Result<()> {
        let pool = self.get_pool().await?;
        
        let artist = release.artists.first()
            .map(|a| a.name.clone())
            .unwrap_or_default();
        
        let label = release.labels.first().map(|l| l.name.clone());
        let catalog_number = release.labels.first()
            .and_then(|l| l.catno.clone())
            .or(release.catalog_number.clone());
        
        let format = release.formats.as_ref()
            .and_then(|formats| formats.first())
            .map(|f| {
                let mut parts = vec![f.name.clone()];
                if let Some(descriptions) = &f.descriptions {
                    parts.extend(descriptions.iter().cloned());
                }
                parts.join(", ")
            })
            .or(release.format.clone());
        
        let cover_image_url = release.images.as_ref()
            .and_then(|images| {
                images.iter()
                    .find(|img| img.image_type.as_ref().map(|t| t == "primary").unwrap_or(false))
                    .or_else(|| images.first())
            })
            .and_then(|img| img.uri.clone().or(img.resource_url.clone()));

        let year = release.year.or_else(|| {
            release.released.as_ref()
                .and_then(|r| r.split('-').next())
                .and_then(|y| y.parse::<u32>().ok())
        }).map(|y| y as i64);

        let have_count = release.community.as_ref().and_then(|c| c.have).map(|c| c as i64);
        let want_count = release.community.as_ref().and_then(|c| c.want).map(|c| c as i64);
        let avg_rating = release.community.as_ref()
            .and_then(|c| c.rating.as_ref())
            .and_then(|r| r.average);
        let ratings_count = release.community.as_ref()
            .and_then(|c| c.rating.as_ref())
            .and_then(|r| r.count)
            .map(|c| c as i64);

        let release_id_str = release.id.to_string();
        let label_deref = label.as_deref();
        let catalog_number_deref = catalog_number.as_deref();
        let format_deref = format.as_deref();
        let country_deref = release.country.as_deref();
        let cover_image_url_deref = cover_image_url.as_deref();

        sqlx::query!(
            r#"
            UPDATE albums SET
                artist = ?1,
                title = ?2,
                label = ?3,
                catalog_number = ?4,
                format = ?5,
                country = ?6,
                released_year = ?7,
                cover_image_url = ?8,
                resource_url = ?9,
                have_count = ?10,
                want_count = ?11,
                avg_rating = ?12,
                ratings_count = ?13,
                updated_at = CURRENT_TIMESTAMP
            WHERE discogs_release_id = ?14
            "#,
            artist,
            release.title,
            label_deref,
            catalog_number_deref,
            format_deref,
            country_deref,
            year,
            cover_image_url_deref,
            release.resource_url,
            have_count,
            want_count,
            avg_rating,
            ratings_count,
            release_id_str,
        )
        .execute(&pool)
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to update album: {}", e)))?;

        self.save_genres(&pool, release.id, &release.genres).await?;
        self.save_styles(&pool, release.id, &release.styles).await?;
        self.save_tracks(&pool, release.id, &release.tracklist).await?;
        self.save_videos(&pool, release.id, &release.videos).await?;

        Ok(())
    }

    async fn save_genres(&self, pool: &sqlx::SqlitePool, album_id: u64, genres: &[String]) -> Result<()> {
        let album_id_str = album_id.to_string();
        sqlx::query!("DELETE FROM album_genres WHERE album_id = ?1", album_id_str)
            .execute(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to delete genres: {}", e)))?;

        for genre_name in genres {
            // Insert genre if it doesn't exist
            sqlx::query!("INSERT OR IGNORE INTO genres (name) VALUES (?1)", genre_name)
                .execute(pool)
                .await
                .map_err(|e| ScraperError::DatabaseError(format!("Failed to insert genre: {}", e)))?;

            // Get genre ID
            let genre_id = sqlx::query_scalar!(
                "SELECT id FROM genres WHERE name = ?1",
                genre_name
            )
            .fetch_optional(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to get genre ID: {}", e)))?
            .flatten();

            if let Some(genre_id) = genre_id {
                let album_id_str = album_id.to_string(); // Bind again for loop
                sqlx::query!(
                    "INSERT OR IGNORE INTO album_genres (album_id, genre_id) VALUES (?1, ?2)",
                    album_id_str,
                    genre_id
                )
                .execute(pool)
                .await
                .map_err(|e| ScraperError::DatabaseError(format!("Failed to link genre: {}", e)))?;
            }
        }

        Ok(())
    }

    async fn save_styles(&self, pool: &sqlx::SqlitePool, album_id: u64, styles: &[String]) -> Result<()> {
        let album_id_str = album_id.to_string();
        sqlx::query!("DELETE FROM album_styles WHERE album_id = ?1", album_id_str)
            .execute(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to delete styles: {}", e)))?;

        for style_name in styles {
            // Insert style if it doesn't exist
            sqlx::query!("INSERT OR IGNORE INTO styles (name) VALUES (?1)", style_name)
                .execute(pool)
                .await
                .map_err(|e| ScraperError::DatabaseError(format!("Failed to insert style: {}", e)))?;

            // Get style ID
            let style_id = sqlx::query_scalar!(
                "SELECT id FROM styles WHERE name = ?1",
                style_name
            )
            .fetch_optional(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to get style ID: {}", e)))?
            .flatten();

            if let Some(style_id) = style_id {
                let album_id_str = album_id.to_string(); // Bind again for loop
                sqlx::query!(
                    "INSERT OR IGNORE INTO album_styles (album_id, style_id) VALUES (?1, ?2)",
                    album_id_str,
                    style_id
                )
                .execute(pool)
                .await
                .map_err(|e| ScraperError::DatabaseError(format!("Failed to link style: {}", e)))?;
            }
        }

        Ok(())
    }

    async fn save_tracks(&self, pool: &sqlx::SqlitePool, album_id: u64, tracks: &[crate::scraper::types::Track]) -> Result<()> {
        let album_id_str = album_id.to_string();
        sqlx::query!("DELETE FROM tracks WHERE album_id = ?1", album_id_str)
            .execute(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to delete tracks: {}", e)))?;

        for track in tracks {
            let side = track.position.chars().next().map(|c| c.to_string());
            let album_id_str = album_id.to_string();
            let duration = track.duration.as_deref();
            let side_deref = side.as_deref();
            
            sqlx::query!(
                "INSERT INTO tracks (album_id, position, title, duration, side) VALUES (?1, ?2, ?3, ?4, ?5)",
                album_id_str,
                track.position,
                track.title,
                duration,
                side_deref,
            )
            .execute(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to save track: {}", e)))?;
        }

        Ok(())
    }

    async fn save_videos(&self, pool: &sqlx::SqlitePool, album_id: u64, videos: &[crate::scraper::types::Video]) -> Result<()> {
        for (index, video) in videos.iter().enumerate() {
            let video_id = video.uri
                .split("watch?v=")
                .nth(1)
                .and_then(|s| s.split('&').next())
                .unwrap_or_default();

            if video_id.is_empty() {
                continue;
            }

            let title = video.title.as_deref();

            sqlx::query!(
                "INSERT OR REPLACE INTO youtube_videos (id, title, url) VALUES (?1, ?2, ?3)",
                video_id,
                title,
                video.uri
            )
            .execute(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to save video: {}", e)))?;

            let album_id_str = album_id.to_string();
            let index_i64 = index as i64;
            
            sqlx::query!(
                "INSERT OR IGNORE INTO album_videos (album_id, video_id, order_index) VALUES (?1, ?2, ?3)",
                album_id_str,
                video_id,
                index_i64
            )
            .execute(pool)
            .await
            .map_err(|e| ScraperError::DatabaseError(format!("Failed to link video: {}", e)))?;
        }

        Ok(())
    }

    pub async fn album_exists(&self, release_id: u64) -> Result<bool> {
        let pool = self.get_pool().await?;
        let release_id_str = release_id.to_string();
        
        // Use count(*) to ensure we get a valid integer back
        let result = sqlx::query_scalar!(
            "SELECT count(*) FROM albums WHERE discogs_release_id = ?1",
            release_id_str
        )
        .fetch_one(&pool)
        .await
        .map_err(|e| ScraperError::DatabaseError(format!("Failed to check album existence: {}", e)))?;

        Ok(result > 0)
    }
}
