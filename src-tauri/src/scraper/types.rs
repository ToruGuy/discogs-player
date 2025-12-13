use serde::{Deserialize, Serialize};

// Inventory API Response Types
#[derive(Debug, Deserialize)]
pub struct InventoryResponse {
    pub pagination: Pagination,
    pub listings: Vec<Listing>,
}

#[derive(Debug, Deserialize)]
pub struct Pagination {
    pub per_page: u32,
    pub items: u32,
    pub page: u32,
    pub pages: u32,
    #[serde(default)]
    pub urls: PaginationUrls,
}

#[derive(Debug, Deserialize, Default)]
pub struct PaginationUrls {
    #[serde(rename = "next")]
    pub next: Option<String>,
    #[serde(rename = "last")]
    pub last: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Listing {
    pub id: u64,
    pub status: String,
    pub price: Price,
    pub condition: Option<String>,
    pub sleeve_condition: Option<String>,
    pub comments: Option<String>,
    pub uri: String,
    pub release: ListingRelease,
    pub seller: Seller,
}

#[derive(Debug, Deserialize)]
pub struct Price {
    pub currency: String,
    pub value: f64,
}

#[derive(Debug, Deserialize)]
pub struct Seller {
    pub username: String,
    pub id: u64,
    #[serde(default)]
    pub resource_url: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ListingRelease {
    pub id: u64,
    pub title: String,
    pub artist: String,
    pub format: Option<String>,
    pub catalog_number: Option<String>,
    pub year: Option<u32>,
    pub thumbnail: Option<String>,
    pub resource_url: String,
}

// Release API Response Types
#[derive(Debug, Deserialize)]
pub struct ReleaseResponse {
    pub id: u64,
    pub title: String,
    pub artists: Vec<Artist>,
    pub genres: Vec<String>,
    pub styles: Vec<String>,
    pub labels: Vec<Label>,
    pub country: Option<String>,
    pub released: Option<String>,
    pub year: Option<u32>,
    pub format: Option<String>,
    pub formats: Option<Vec<Format>>,
    pub catalog_number: Option<String>,
    pub tracklist: Vec<Track>,
    pub videos: Vec<Video>,
    pub images: Option<Vec<Image>>,
    pub community: Option<Community>,
    pub resource_url: String,
}

#[derive(Debug, Deserialize)]
pub struct Artist {
    pub id: u64,
    pub name: String,
}

#[derive(Debug, Deserialize)]
pub struct Label {
    pub id: u64,
    pub name: String,
    pub catno: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Format {
    pub name: String,
    pub descriptions: Option<Vec<String>>,
    pub qty: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Track {
    pub position: String,
    pub title: String,
    pub duration: Option<String>,
    #[serde(rename = "type_")]
    pub track_type: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Video {
    pub uri: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub duration: Option<u32>,
    pub embed: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct Image {
    pub uri: Option<String>,
    pub resource_url: Option<String>,
    #[serde(rename = "type")]
    pub image_type: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Community {
    pub have: Option<u32>,
    pub want: Option<u32>,
    pub rating: Option<Rating>,
}

#[derive(Debug, Deserialize)]
pub struct Rating {
    pub average: Option<f64>,
    pub count: Option<u32>,
}

// Error Types
#[derive(Debug, thiserror::Error)]
pub enum ScraperError {
    #[error("Missing DISCOGS_TOKEN in environment")]
    MissingToken,
    #[error("HTTP error: {0}")]
    HttpError(#[from] reqwest::Error),
    #[error("Rate limit exceeded")]
    RateLimitExceeded,
    #[error("Resource not found")]
    NotFound,
    #[error("Database error: {0}")]
    DatabaseError(String),
    #[error("JSON parse error: {0}")]
    JsonError(#[from] serde_json::Error),
    #[error("Invalid URL: {0}")]
    UrlError(#[from] url::ParseError),
    #[error("Job cancelled")]
    Cancelled,
}

pub type Result<T> = std::result::Result<T, ScraperError>;
