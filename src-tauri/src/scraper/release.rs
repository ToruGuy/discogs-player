use crate::scraper::{DiscogsClient, Result};
use crate::scraper::types::ReleaseResponse;

pub async fn fetch_release(client: &DiscogsClient, release_id: u64) -> Result<ReleaseResponse> {
    client.get_release(release_id).await
}
