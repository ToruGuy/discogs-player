use crate::scraper::rate_limiter::{create_limiter, AppRateLimiter};
use crate::scraper::{InventoryResponse, ReleaseResponse, Result, ScraperError};
#[cfg(test)]
use std::env;
use std::sync::Arc;

const BASE_URL: &str = "https://api.discogs.com";
const USER_AGENT: &str = "DiscogsPlayer/1.0 +https://github.com/user/discogs-player";

pub struct DiscogsClient {
    client: reqwest::Client,
    token: String,
    rate_limiter: Arc<AppRateLimiter>,
}

impl DiscogsClient {
    /// Create a new DiscogsClient with a token.
    /// For testing, token can be read from .env, but in production it should come from user settings.
    pub fn new(token: String) -> Result<Self> {
        if token.is_empty() {
            return Err(ScraperError::MissingToken);
        }

        let client = reqwest::Client::builder()
            .user_agent(USER_AGENT)
            .build()
            .map_err(ScraperError::HttpError)?;

        Ok(Self {
            client,
            token,
            rate_limiter: Arc::new(create_limiter()),
        })
    }

    /// Create a new DiscogsClient from environment variable (for testing only)
    #[cfg(test)]
    pub fn from_env() -> Result<Self> {
        // Try loading .env from current directory first, then parent directory
        dotenvy::dotenv().ok();
        dotenvy::from_path("../.env").ok();
        dotenvy::from_path("../../.env").ok();
        
        let token = env::var("DISCOGS_TOKEN")
            .map_err(|_| ScraperError::MissingToken)?;
        
        Self::new(token)
    }

    fn build_request(&self, url: &str) -> reqwest::RequestBuilder {
        self.client
            .get(url)
            .header("Authorization", format!("Discogs token={}", self.token))
    }

    pub async fn get_inventory(
        &self,
        seller: &str,
        page: u32,
        per_page: u32,
    ) -> Result<InventoryResponse> {
        // Wait for rate limiter
        self.rate_limiter.until_ready().await;

        let url = format!(
            "{}/users/{}/inventory?page={}&per_page={}",
            BASE_URL, seller, page, per_page
        );

        let response = self
            .build_request(&url)
            .send()
            .await
            .map_err(ScraperError::HttpError)?;

        if response.status() == 429 {
            return Err(ScraperError::RateLimitExceeded);
        }

        let status = response.status();
        if !status.is_success() {
            let text = response.text().await.unwrap_or_default();
            log::error!("API error {}: {}", status, text);
            return Err(ScraperError::DatabaseError(
                format!("API returned {}: {}", status, text)
            ));
        }

        // Debug: log response headers
        log::debug!("Response status: {}", status);
        log::debug!("Response headers: {:?}", response.headers());

        // Get response text first to debug
        let text = response.text().await.map_err(ScraperError::HttpError)?;
        log::debug!("Response body (first 500 chars): {}", &text.chars().take(500).collect::<String>());

        // Parse JSON
        serde_json::from_str::<InventoryResponse>(&text)
            .map_err(|e| {
                log::error!("JSON parse error: {}", e);
                log::error!("Response text: {}", text);
                ScraperError::JsonError(e)
            })
    }

    pub async fn get_release(&self, release_id: u64) -> Result<ReleaseResponse> {
        // Wait for rate limiter
        self.rate_limiter.until_ready().await;

        let url = format!("{}/releases/{}", BASE_URL, release_id);

        let response = self
            .build_request(&url)
            .send()
            .await
            .map_err(ScraperError::HttpError)?;

        if response.status() == 429 {
            return Err(ScraperError::RateLimitExceeded);
        }

        if response.status() == 404 {
            return Err(ScraperError::NotFound);
        }

        response
            .json::<ReleaseResponse>()
            .await
            .map_err(ScraperError::HttpError)
    }
}
