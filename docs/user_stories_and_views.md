# User Stories & View Definitions
> "Discogs Player is not a streaming service. It is a digital record crate."

## 👤 User Personas

### 1. The Digital Digger
*   **Goal:** Replicate the feeling of flipping through vinyl in a physical shop.
*   **Pain Point:** Discogs.com is a database (spreadsheet), not a listening experience. Opening 50 YouTube tabs is slow and breaks the flow.
*   **Need:** FAST preview. Visual browsing (Cover Art first). Context (Who is selling this?).

### 2. The Curator
*   **Goal:** Build a specific "Bag" (Shopping List) of tracks to buy or play.
*   **Need:** Easy way to "Save for later" (Like). Easy way to filtering out "Trash" (Dislike/Hide).

---

## 📖 User Stories

### 1. Global Feed ("All Items")
> "As a user, I want to see a mixed feed of all records from every shop I follow, so I don't have to check them one by one."
*   **Acceptance Criteria:**
    *   View aggregates items from ALL active Collections/Sources in local DB.
    *   Items are sorted by "Date Added" (Newest arrivals first).
    *   **Status Badges:** Visually distinguish "New Arrival" vs "Already Seen".
    *   Lazy loading (infinite scroll) for performance.
    *   Grid layout optimized for Cover Art scanning.

### 2. Audio Playback ("The Contextual Player")
> "As a user, I want to listen to a track *while* reading its liner notes, but I don't want the video to distract me."
*   **Acceptance Criteria:**
    *   **Deck Control:** Play/Pause/Next/Prev controls located in the Top Bar.
    *   **Invisible Source:** Audio plays from YouTube source (invisible iframe).
    *   **Focus Mode:** Clicking the player expands a view showing full Album Details (Year, Label, Price) + Tracklist.
    *   **Source Context:** Player must show "Source Context" (e.g., "Playing from: Hard Wax Berlin").
    *   **Optimistic Play:** UI updates immediately when "Play" is clicked, even if audio is buffering.

### 3. Source Management ("Add Collection")
> "As a user, I want to paste a Discogs URL (Shop or User Collection) and have the app automatically scrape and index it."
*   **Acceptance Criteria:**
    *   Input field accepts `discogs.com/seller/...` or `discogs.com/user/...` URLs.
    *   App validates the URL.
    *   **Import Wizard:** A guided flow (Modal) that shows:
        1.  Validating URL...
        2.  Found "Hard Wax" (12,403 items).
        3.  Syncing... (Progress Bar).
    *   **Scraper Feedback:** User sees real-time stats (Success/Skipped/Failed) during sync.

### 4. Curation ("Like/Dislike")
> "As a user, I want to quickly 'Heart' a track to save it to my Bag, or 'Trash' it to hide it forever."
*   **Acceptance Criteria:**
    *   One-click action on any album card.
    *   "Liked" items move to the `/liked` view.
    *   "Disliked" items are visually removed from the Feed immediately.
    *   **Export List:** User can export a list of liked items (Youtube Links, Discogs Links) to clipboard or file.
    *   **Undo:** A "Toast" notification appears allowing Undo if accidental.

### 5. Smart Filtering ("The Digging Tools")
> "As a user, I want to filter my feed to find exactly what I'm looking for right now."
*   **Acceptance Criteria:**
    *   **Collection Filter:** Toggle specific shops on/off in the main feed.
    *   **Genre Tags:** Clickable badges (Techno, House, Ambient) to refine the grid.
    *   **Price Range:** Slider to hide items outside budget (e.g., "Under €20").
    *   **Year:** "New Releases Only" toggle.

### 6. Record Details ("The Metadata Deep Dive")
> "As a user, I want to see all the nerd details about a record: condition, pressing info, and tracklist."
*   **Acceptance Criteria:**
    *   **Condition:** Media Condition (M, NM, VG+) and Sleeve Condition displayed prominently.
    *   **Pressing:** Label, Catalog Number, Country, Year.
    *   **Stats:** "Have/Want" ratios from Discogs (popularity indicator).
    *   **Tracklist:** Full A/B side breakdown with durations.

### 7. System Health ("Scraping History")
> "As a user, I want to know if my sync jobs worked or if Discogs blocked me."
*   **Acceptance Criteria:**
    *   Dedicated view for past scrape jobs.
    *   Shows: Date, Source, Items Found, Errors.
    *   Ability to retry failed jobs.
    *   View raw logs for debugging.

---

## 📺 Views (The "Deck" Layout)

**Layout:** Top Bar (Player/Controls) + Right Sidebar (Navigation) + Main Area (Content).

| View Name | Route | Description |
| :--- | :--- | :--- |
| **Digging (Home)** | `/` | **Default View.** The "All Items" grid. Infinite scroll of cover art. Hover for quick play. |
| **The Bag** | `/liked` | **Favorites.** A curated grid of only "Liked" items. **Export Tool** available here. |
| **Source Detail** | `/collection/:id` | **Shop Filter.** Same grid as Home, but filtered to a specific source (e.g., only "Hard Wax"). |
| **Focus Mode** | `/now-playing` | **Deep Dive.** Large Album Art, Tracklist, Release Notes, **Condition**, **Pressing Info**. |
| **Settings / Add** | `/settings` | **Management.** Input for new URLs. List of synced collections. Toggle Dark/Light mode. |
| **Scraper History** | `/scraping` | **System Health.** List of past jobs, status, logs. **Rescrape** action available here. |

## 🛠️ Tech Alignment (Tauri v2)

*   **Database:** `tauri-plugin-sql` (SQLite) to store Releases, Artists, and Local Links.
*   **Images:** Local caching strategy (download covers to local fs?) or lazy load from URL.
*   **Audio:** Hidden `<iframe>` or `react-player` handling YouTube stream.
*   **Window:** Custom title bar (The "Deck" header).
