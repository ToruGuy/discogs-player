# TODOs

## Queue System Improvements

- [ ] **Implement File-System Persistence**
  - Currently using `localStorage` (browser storage).
  - Goal: Use `queue.json` in the local app data directory for robust persistence.
  - Requires: `@tauri-apps/plugin-fs`.
  - Logic:
    - Auto-save on queue modification (debounced).
    - Load on app startup.
  - Reference: `docs/queue_logic.md` (Lines 105-112).

- [x] **Queue Visualization**
  - Added `X / N` counter to TopBar and PlayerOverlay.

- [ ] **Drag & Drop Reordering**
  - Allow users to reorder the "Up Next" list.

- [ ] **Scrape Video Titles**
  - Currently, we auto-patch titles at runtime when playing.
  - Goal: Implement a background scraper or explicit action to fetch and save accurate video titles to the database permanently.
  - This avoids the "Generic Title" issue for unplayed tracks.
