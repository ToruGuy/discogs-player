use crate::scraper::{DiscogsClient, Result, ScraperError};
use crate::scraper::types::InventoryResponse;

pub async fn fetch_all_inventory(
    client: &DiscogsClient,
    seller: &str,
    limit: Option<u32>,
) -> Result<Vec<u64>> {
    let mut release_ids = Vec::new();
    let mut page = 1;
    let per_page = 100; // Max per page according to API

    loop {
        let response = client.get_inventory(seller, page, per_page).await?;
        
        // Extract release IDs from listings
        for listing in &response.listings {
            release_ids.push(listing.release.id);
        }

        // Check if we've hit the limit
        if let Some(max_items) = limit {
            if release_ids.len() >= max_items as usize {
                release_ids.truncate(max_items as usize);
                break;
            }
        }

        // Check if there are more pages
        if page >= response.pagination.pages {
            break;
        }

        page += 1;
    }

    Ok(release_ids)
}
