use crate::scraper::runner::{ScrapeJob, ScrapeResult};
use crate::scraper::db::DatabaseWriter;
use std::sync::{Arc, Mutex};
use tauri::{command, AppHandle, State};

type JobState = Arc<Mutex<Option<Arc<ScrapeJob>>>>;

#[command]
pub async fn start_scrape(
    seller: String,
    limit: Option<u32>,
    batch_size: Option<u32>,
    app: AppHandle,
    state: State<'_, JobState>,
) -> Result<ScrapeResult, String> {
    // Create new job
    let job = Arc::new(ScrapeJob::new(app.clone()).await.map_err(|e| e.to_string())?);
    let job_id = job.job_id().to_string();

    // Store job in state
    *state.lock().unwrap() = Some(job.clone());

    // Run the scrape
    let result = job.run(seller.clone(), limit, batch_size).await;

    // Clear job state
    *state.lock().unwrap() = None;

    // Handle result
    match result {
        Ok(r) => Ok(r),
        Err(e) => {
            // Save error to database
            let db = DatabaseWriter::new(app.clone());
            if let Err(db_err) = db.update_scrape_job_error(&job_id, &e.to_string()).await {
                log::warn!("Failed to save error to database: {}", db_err);
            }
            Err(e.to_string())
        }
    }
}

#[command]
pub async fn cancel_scrape(app: AppHandle, state: State<'_, JobState>) -> Result<(), String> {
    // Get job_id and cancel the job, then release the mutex before awaiting
    let job_id = {
        let guard = state.lock().unwrap();
        if let Some(job) = guard.as_ref() {
            let id = job.job_id().to_string();
            job.cancel();
            id
        } else {
            return Err("No active scrape job".to_string());
        }
    }; // Mutex guard is dropped here
    
    // Save cancelled status to database
    let db = DatabaseWriter::new(app.clone());
    if let Err(e) = db.update_scrape_job_cancelled(&job_id).await {
        log::warn!("Failed to save cancelled status to database: {}", e);
    }
    
    Ok(())
}
