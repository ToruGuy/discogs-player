use crate::scraper::runner::{ScrapeJob, ScrapeResult};
use crate::scraper::ScraperError;
use std::sync::{Arc, Mutex};
use tauri::{command, AppHandle, Manager, State};

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
    let job = Arc::new(ScrapeJob::new(app.clone()).map_err(|e| e.to_string())?);

    // Store job in state
    *state.lock().unwrap() = Some(job.clone());

    // Run the scrape
    let result = job.run(seller, limit, batch_size).await.map_err(|e| e.to_string())?;

    // Clear job state
    *state.lock().unwrap() = None;

    Ok(result)
}

#[command]
pub async fn cancel_scrape(state: State<'_, JobState>) -> Result<(), String> {
    if let Some(job) = state.lock().unwrap().as_ref() {
        job.cancel();
        Ok(())
    } else {
        Err("No active scrape job".to_string())
    }
}
