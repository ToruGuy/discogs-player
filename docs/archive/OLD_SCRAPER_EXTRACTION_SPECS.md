# Discogs Scraper: Complete Technical Specification

This document contains **all** technical details required to rebuild the scraper. It covers the extraction logic, navigation flow, concurrency model, and data schema.

## 1. Core Scraping Logic

### A. Navigation & Pagination
**Target:** Seller Inventory (`/seller/{NAME}/profile`)

The scraper does not rely on finding a "Next Page" button in the DOM. Instead, it constructs URLs programmatically:

1.  **URL Parsing:** It parses the initial Seller URL using standard URL libraries.
2.  **Query Manipulation:** It appends or modifies the `page` query parameter.
    *   Format: `?page=1`, `?page=2`, etc.
    *   It preserves other existing query parameters (filters).
3.  **Termination:** It stops when:
    *   The page returns 0 items.
    *   The `max_pages` limit is reached.

### B. Concurrency Strategy
**Model:** Thread-per-Item with Isolated Browsers

To maximize speed and stability, the scraper uses a **Thread Pool** (default 5 workers).

*   **Isolation:** For *every single item* processed in parallel, a **new** Chrome driver instance is created and destroyed.
    *   *Pros:* Complete isolation (one crash doesn't affect others), fresh session per item (clears cookies/state).
    *   *Cons:* High resource overhead (CPU/RAM).
*   **Flow:**
    1.  Main thread scrapes the Inventory List (Page 1..N) to get a list of Item URLs.
    2.  `ThreadPoolExecutor` distributes these URLs to workers.
    3.  Each worker: Opens Browser -> Scrapes Release -> Closes Browser.

### C. Anti-Detection & Performance
The Selenium WebDriver is configured with specific flags to avoid detection and speed up loading:

1.  **Chrome Options:**
    *   `--headless=new`
    *   `--disable-blink-features=AutomationControlled`
    *   `excludeSwitches: ["enable-automation"]`
    *   `useAutomationExtension: False`
2.  **Resource Blocking (Speed):**
    *   `--disable-images` (Chrome flag)
    *   `profile.managed_default_content_settings.images = 2` (Preferences)
    *   `profile.managed_default_content_settings.stylesheets = 2` (Block CSS)
    *   *Note:* Even though images are "blocked" from rendering, the `img` tags and their `src` attributes are still present in the DOM for extraction.
3.  **JS Overrides:**
    *   `navigator.webdriver = undefined` (via `Page.addScriptToEvaluateOnNewDocument` or similar).

---

## 2. Data Extraction Specification

### Inventory Page
**Selector Strategy:** CSS Selectors

| Field | Logic / Selector |
|-------|------------------|
| **Item Container** | Table rows in the listings. |
| **Item Link** | `strong a[href*="/sell/item/"]` |
| **Price** | `td.item_price .price` -> Regex `€?\s*(\d+[.,]\d+)` (Convert comma to dot). |

### Item Page
**Strategy:** Regex on `document.body.innerText`
*Reason:* DOM structure varies significantly between items; text parsing is more robust.

| Field | Regex Pattern |
|-------|---------------|
| **Seller Price** | `€([\d.]+)\s*\+\s*€([\d.]+)\s*shipping` |
| **Condition** | `Media:\s*([^\n]+?)(?:\s*Noticeable|\s*$)` |
| **Seller Notes** | Capture text between "Comments" and "Release Information". Filter out standard UI text ("Add to Cart", etc). |
| **Release Link** | CSS: `a.button.release-page` (href). **Critical:** Used to transition to Master Data. |

### Release Page (Master Data)
**Strategy:** Mixed (CSS for structure, JS/Regex for specific fields)

#### Header
*   **Title/Artist:** `h1` text. Split by ` – ` (en-dash) or ` - ` (hyphen). Left = Artist, Right = Title.
*   **Release ID:** Parsed from URL regex: `/release/(\d+)`.

#### Metadata Table
Iterate `table tr`. Match `th` text to identify field:

*   **Label:** Text in `td`. Remove Catalog # suffix (regex: `[–\-]\s*.+$`).
*   **Catalog #:** Regex `[–\-]\s*(.+)$` inside Label field.
*   **Format:** Raw text.
*   **Country:** Raw text.
*   **Year:** Regex `\b(19|20)\d{2}\b`.
*   **Genres/Styles:** `td a` text content.

#### Tracklist
Dynamically find `h2` containing "Tracklist", then parsing the adjacent `table`.
*   **Position:** Column 0.
*   **Title:** Column 2.
*   **Duration:** Column 3 (if exists).

#### Statistics
Regex on `document.body.innerText`:
*   `Have[:\s]+([\d,]+)`
*   `Want[:\s]+([\d,]+)`
*   `Avg Rating[:\s]+([\d.]+)\s*\/\s*5`
*   `Last Sold[:\s]+([^\n]+)`
*   `Low|Median|High` + `€` patterns for price history.

#### Media Extraction
*   **Cover Art:** JS script finds `img` with src containing `i.discogs.com` AND alt text containing "album cover".
*   **YouTube:**
    1.  **Thumbnails (Fast):** `img[src*="i.ytimg.com/vi/"]`. Extract ID from URL.
    2.  **Iframes (Slow):** `iframe[src*="youtube.com"]`. Extract ID from `embed/` path.

---

## 3. Database Schema (SQLite)

The system is designed around a relational SQLite schema.

### Table: `collections`
Groups items.
*   `id` (PK), `name` (Unique), `seller_url`
*   `last_scraped_at` (Timestamp)

### Table: `vinyls`
Canonical release data. Shared across collections.
*   `id` (PK)
*   `discogs_release_id` (Text, Unique)
*   `artist`, `title`, `label`, `catalog_number`, `format`, `country` (Text)
*   `released_year` (Int)
*   `genres`, `styles`, `tracklist` (JSON Text)
*   `have_count`, `want_count`, `ratings_count` (Int)
*   `avg_rating` (Real)
*   `price_low`, `price_median`, `price_high` (Real)
*   `image_url`, `release_url` (Text)

### Table: `collection_items`
Links `collections` to `vinyls` with seller-specific data.
*   `id` (PK)
*   `collection_id` (FK), `vinyl_id` (FK)
*   `item_url` (Text, Unique per collection)
*   `seller_price` (Real)
*   `seller_condition` (Text)
*   `seller_notes` (Text)
*   `is_available` (Boolean) - Set to 0 if item disappears from scrape.

### Table: `youtube_videos`
*   `id` (PK)
*   `vinyl_id` (FK)
*   `youtube_video_id` (Text)
*   `youtube_url` (Text)

---

## 4. Smart Scraping Logic
To optimize performance, the scraper uses a "Smart Skip" logic:

1.  **Check:** When an item is found in the Inventory List, extract its `release_url` -> `release_id`.
2.  **Lookup:** Check if `release_id` exists in `vinyls` table AND is linked to current collection.
3.  **Branch:**
    *   **If Exists:** Do **NOT** visit Release Page. Only update `seller_price` in `collection_items`. Mark as "Skipped".
    *   **If New:** Perform full scrape (Release Page, YouTube, etc).
