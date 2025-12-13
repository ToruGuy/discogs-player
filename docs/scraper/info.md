# Discogs Scraper - Technical Specification

> **Status:** Planning Phase  
> **Language:** Rust (native integration with Tauri)  
> **Last Updated:** 2025-12-12

---

## 1. Overview

### What We're Building
A modular Rust-based scraper that extracts vinyl record data from Discogs pages and stores it in the local SQLite database. The scraper integrates natively with our Tauri app through commands invoked from the frontend.

### Goals
- **HTTP-only** (if possible) - No headless browser for speed and simplicity
- **Strong parallel approach** - Maximize throughput, simple but robust
- **Smart updates** - Keep data fresh, link new sellers to existing releases
- **Modular design** - Separate parsers for each page type, easy to maintain
- **Progress reporting** - Real-time updates to frontend via Tauri events

### Design Principles
- **Simple but robust** - No over-engineering, pragmatic solutions
- **Fast as possible** - ASAP is the target, optimize for speed
- **Never scrape twice unnecessarily** - But always stay up to date

---

## 2. Test Data

### Development URL
```
https://www.discogs.com/seller/SecretSpot.Records/profile?style=Latin
```

---

## 3. Database Schema (Verified)

### Current State
- **599 albums** in database
- **2655 YouTube videos** linked

### Tables & Fields

#### `albums` (Primary Key: `discogs_release_id` TEXT)
| Field | Type | Notes |
|-------|------|-------|
| `discogs_release_id` | TEXT | PK - Discogs release ID |
| `artist` | TEXT | NOT NULL |
| `title` | TEXT | NOT NULL |
| `label` | TEXT | |
| `catalog_number` | TEXT | |
| `format` | TEXT | e.g., "Vinyl, LP, Album" |
| `country` | TEXT | |
| `released_year` | INTEGER | |
| `cover_image_url` | TEXT | Discogs CDN URL |
| `resource_url` | TEXT | Full Discogs release URL |
| `price_low` | REAL | Market statistics |
| `price_median` | REAL | Market statistics |
| `price_high` | REAL | Market statistics |
| `have_count` | INTEGER | DEFAULT 0 |
| `want_count` | INTEGER | DEFAULT 0 |
| `avg_rating` | REAL | DEFAULT 0 |
| `ratings_count` | INTEGER | DEFAULT 0 |
| `last_sold_date` | TEXT | e.g., "27 Jul 2025" |
| `created_at` | DATETIME | Auto |
| `updated_at` | DATETIME | Auto |

#### `tracks`
| Field | Type | Notes |
|-------|------|-------|
| `id` | INTEGER | PK AUTO |
| `album_id` | TEXT | FK → albums |
| `position` | TEXT | e.g., "A1", "B2" |
| `title` | TEXT | NOT NULL |
| `duration` | TEXT | e.g., "3:45" |
| `side` | TEXT | "A", "B" |

#### `youtube_videos`
| Field | Type | Notes |
|-------|------|-------|
| `id` | TEXT | PK - YouTube video ID (e.g., "dQw4w9WgXcQ") |
| `title` | TEXT | Video title (often NULL - fetched later) |
| `url` | TEXT | Full YouTube URL |

#### `album_videos` (Junction Table)
| Field | Type | Notes |
|-------|------|-------|
| `album_id` | TEXT | PK, FK → albums |
| `video_id` | TEXT | PK, FK → youtube_videos |
| `order_index` | INTEGER | DEFAULT 0 |

#### `collection_items` (Seller-specific data)
| Field | Type | Notes |
|-------|------|-------|
| `id` | INTEGER | PK AUTO |
| `album_id` | TEXT | FK → albums |
| `seller_id` | INTEGER | FK → sellers (if exists) |
| `collection_id` | INTEGER | |
| `price` | REAL | Seller's price |
| `currency` | TEXT | e.g., "EUR" |
| `condition` | TEXT | e.g., "VG+", "NM" |
| `sleeve_condition` | TEXT | |
| `notes` | TEXT | Seller notes |
| `is_available` | BOOLEAN | |
| `is_new` | INTEGER | |
| `item_url` | TEXT | Full item listing URL |

#### `genres` & `styles` (Normalized)
- `genres`: `id` (PK), `name` (UNIQUE)
- `styles`: `id` (PK), `name` (UNIQUE)
- `album_genres`: `album_id`, `genre_id` (composite PK)
- `album_styles`: `album_id`, `style_id` (composite PK)

---

## 4. Smart Update Logic

### Scenario: Album Already Exists in DB
```
IF album.discogs_release_id EXISTS in DB:
  1. UPDATE album statistics (have/want/ratings/prices) - they change
  2. UPDATE or INSERT collection_item (new seller listing)
  3. CHECK YouTube videos - verify links still work, add new ones
  4. SKIP full release page scrape IF data is recent (< 7 days?)
```

### Scenario: New Album
```
IF album.discogs_release_id NOT in DB:
  1. Full scrape: Item Page → Release Page
  2. Extract all metadata, tracklist, YouTube videos
  3. INSERT album + tracks + videos + collection_item
```

### YouTube Link Verification
- On each scrape, check if existing YouTube videos are still valid
- Add any new videos found on release page
- Flag broken links for cleanup

---

## 5. Validation Results ✅

### Key Finding: USE THE API, NOT SCRAPING!

**Website scraping is blocked** - Cloudflare returns 403 with `cf-mitigated: challenge`.

**But the Discogs API is FULLY AVAILABLE** without authentication!

### API Endpoints Validated

| Endpoint | Status | Data Available |
|----------|--------|----------------|
| `GET /releases/{id}` | ✅ Works | Full release data, YouTube videos, tracklist, images |
| `GET /users/{seller}/inventory` | ✅ Works | All listings with prices, conditions, pagination |
| `GET /masters/{id}` | ✅ Works | Master release info |

### Rate Limits
| Type | Limit | Notes |
|------|-------|-------|
| Unauthenticated | **25 req/min** | Just User-Agent header |
| With key/secret | **60 req/min** | Register app at discogs.com/settings/developers |
| With OAuth token | **60 req/min** | Full user access |

**Recommendation:** Register app for 60 req/min (2.4x faster!)

### ⚠️ Important: API Doesn't Support Filters!
The website URL `?style=Latin` works in browser, but **API inventory endpoint has NO genre/style filtering**.

**Options:**
1. Fetch all inventory → filter client-side (what we'll do)
2. HTML scraping (blocked by Cloudflare)
3. Search API with filters (requires authentication)

### Pagination
- `per_page`: Max **100** items per request
- For 3727 items = 38 requests = **~1.5 min** (at 25 req/min)

### What the API Provides

**Inventory Listing (`/users/{seller}/inventory`):**
```
Per listing:
├── id, condition, sleeve_condition, comments
├── price: { value, currency }
├── posted, ships_from
└── release:
    ├── id, artist, title, year
    ├── format, label, catalog_number
    └── stats: { in_wantlist, in_collection }
```
**→ Basic info already included! No need to fetch release for display.**

**Release Details (`/releases/{id}`) - Only for enrichment:**
```
Additional data:
├── genres[], styles[]           ← For filtering
├── videos[]: { uri, title }     ← YouTube links!
├── tracklist[]: { position, title, duration }
├── images[]: { uri, type }
├── community: { have, want, rating }
└── lowest_price, num_for_sale
```

### Smart Fetch Strategy

**Phase 1: Inventory (FAST)**
- Fetch all pages: 38 requests for 3727 items
- Time: ~1.5 min (unauth) or ~40 sec (auth)
- Save basic album data + collection_item immediately

**Phase 2: Enrichment (PARALLEL, SMART)**
- Only fetch `/releases/{id}` for albums NOT in DB
- Get: YouTube videos, genres/styles, tracklist, full images
- Skip releases we already have (smart dedup)

**Example:**
- 3727 listings, 2000 unique releases
- 500 already in DB → only fetch 1500 releases
- At 60 req/min = 25 min for full enrichment

### Test Data Verified
```bash
# SecretSpot.Records inventory
curl "https://api.discogs.com/users/SecretSpot.Records/inventory?per_page=5"
# Returns: 3727 items across 746 pages

# Release with YouTube videos
curl "https://api.discogs.com/releases/1431115"
# Returns: Full data including 10 YouTube video links
```

---

## 6. Architecture

### Module Structure (API-based approach)
```
src-tauri/src/
├── lib.rs                    # Tauri app setup (existing)
├── scraper/
│   ├── mod.rs               # Public API, exports
│   ├── client.rs            # Discogs API client (reqwest)
│   ├── types.rs             # Rust structs matching API response
│   ├── api/
│   │   ├── mod.rs
│   │   ├── inventory.rs     # GET /users/{seller}/inventory
│   │   ├── release.rs       # GET /releases/{id}
│   │   └── rate_limiter.rs  # Respect 25 req/min limit
│   ├── runner.rs            # Parallel execution with rate limiting
│   └── db.rs                # Write to SQLite
└── commands/
    └── scraper_commands.rs  # Tauri commands for frontend
```

### Rate-Limited Parallel Execution
```rust
// With API key: 60 req/min = 1 req/sec
// Strategy: Token bucket rate limiter + parallel batch

use governor::{Quota, RateLimiter};

const RATE_LIMIT: u32 = 60;  // requests per minute (authenticated)

// Token bucket: allows bursts while respecting limit
let limiter = RateLimiter::direct(Quota::per_minute(NonZeroU32::new(RATE_LIMIT).unwrap()));

async fn fetch_releases(release_ids: Vec<u64>, limiter: &RateLimiter) {
    let tasks = release_ids.iter().map(|id| {
        let limiter = limiter.clone();
        async move {
            limiter.until_ready().await;  // Wait for rate limit token
            fetch_release(*id).await
        }
    });
    
    // Run all in parallel - rate limiter handles throttling
    let results = futures::future::join_all(tasks).await;
    
    for result in results.into_iter().flatten() {
        save_to_db(result).await;
    }
}
```

### Time Estimates (with auth at 60 req/min)

| Scenario | Inventory | Enrichment | Total |
|----------|-----------|------------|-------|
| SecretSpot (3727 items, all new) | 40 sec | ~60 min | ~61 min |
| SecretSpot (500 new releases) | 40 sec | ~8 min | ~9 min |
| Small seller (200 items) | 3 sec | ~3 min | ~3 min |

**Key insight:** Inventory is FAST. Enrichment is where time goes.
- First scrape: Slow (need all releases)
- Re-scrape: FAST (only new items need enrichment)

### Data Flow
```
Frontend                     Rust Scraper                    Database
   │                              │                              │
   │─── start_scrape(url) ───────>│                              │
   │                              │── validate_url() ───────────>│
   │<── event: job_started ───────│                              │
   │                              │                              │
   │                              │── fetch_inventory_page() ────│
   │                              │── parse_items() ─────────────│
   │<── event: found_N_items ─────│                              │
   │                              │                              │
   │                              │ PARALLEL (20 workers):       │
   │                              │   ├── check_exists_in_db() ──│
   │                              │   ├── fetch & parse ─────────│
   │<── event: item_scraped ──────│   └── save_to_db() ──────────│
   │                              │                              │
   │<── event: job_complete ──────│                              │
```

---

## 7. Dependencies (Rust Crates)

| Crate | Purpose | Notes |
|-------|---------|-------|
| `reqwest` | HTTP client | Async, TLS support |
| `scraper` | HTML parsing | CSS selectors |
| `tokio` | Async runtime | Already in Tauri |
| `serde` | Serialization | Already in project |
| `regex` | Text extraction | For complex patterns |
| `url` | URL manipulation | Query params |

---

## 8. Milestones

### Milestone 1: Validation & Proof of Concept ✅ COMPLETE
**Goal:** Prove API approach works, understand Discogs behavior

**Results:**
- [x] Website scraping blocked by Cloudflare (403)
- [x] Discogs API fully available without auth
- [x] Inventory endpoint works: 3727 items accessible
- [x] Release endpoint works: full data including YouTube videos
- [x] Rate limits documented: 25 req/min unauthenticated
- [x] YouTube video URIs included in API response

**Key Decision:** Use Discogs REST API, not HTML scraping

---

### Milestone 2: Core API Client ⬅️ CURRENT
**Goal:** Rust client for Discogs API with rate limiting

**Deliverables:**
- [ ] Create `src-tauri/src/scraper/` module structure
- [ ] Register Discogs app for API key (60 req/min)
- [ ] Discogs API client with auth headers
- [ ] Rate limiter (governor crate, token bucket)
- [ ] Inventory fetcher (paginated, 100/page)
- [ ] Release fetcher (parallel with rate limit)
- [ ] Types matching API response (serde)
- [ ] Smart update logic (check DB, update vs insert)
- [ ] Write to SQLite via existing schema

**First milestone test:**
- [ ] Fetch SecretSpot.Records inventory (38 pages)
- [ ] Parse and count unique releases
- [ ] Identify which need enrichment (not in DB)

---

### Milestone 3: Tauri Integration
**Goal:** Connect scraper to frontend

**Deliverables:**
- [ ] Tauri commands (start_scrape, cancel_scrape)
- [ ] Tauri events for progress
- [ ] Frontend integration (ImportDialog uses real scraper)
- [ ] Error handling & user feedback

---

### Milestone 4: Polish & Multiple Sources
**Goal:** Production-ready scraper

**Deliverables:**
- [ ] Support all entry points (seller, collection, label, artist)
- [ ] Retry logic for failed requests
- [ ] YouTube link health checking
- [ ] Rate limiting (if needed based on M1 findings)

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| ~~Cloudflare blocks requests~~ | ~~High~~ | ~~High~~ | ✅ SOLVED: Use API instead |
| Rate limiting (25/min) | Medium | Medium | Batch with delays, respect headers |
| API changes | Low | Medium | Version in User-Agent, error handling |
| YouTube videos unavailable | Medium | Low | Validate on playback, flag broken |
| Large inventories slow | Medium | Low | Progress events, resumable jobs |

---

## 10. Next Steps

1. ~~**Bob validates** HTTP approach~~ ✅ Done - Use API
2. **You register** Discogs app at https://www.discogs.com/settings/developers
3. **Bob creates** the scraper module skeleton in Rust
4. **Implement** Discogs API client with rate limiting (60 req/min)
5. **Test** inventory fetch (SecretSpot.Records)
6. **Implement** two-phase approach:
   - Phase 1: Fast inventory → basic data to DB
   - Phase 2: Enrichment → YouTube, genres, tracklist
7. **Connect** to Tauri commands for frontend

## 11. Action Required From You

**Register a Discogs Application:**
1. Go to https://www.discogs.com/settings/developers
2. Click "Generate new token" or "Add new application"
3. Give me the **Consumer Key** and **Consumer Secret**
4. This gets us 60 req/min instead of 25 (2.4x faster!)

**Note:** The API key doesn't give user data access - just higher rate limits and image URLs.

---

*Document created by Bob (Technical Builder) - Ready for review*
