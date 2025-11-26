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

- [ ] **Queue Visualization**
  - Add UI to show `queue.length` and `queueIndex`.
  - Visualize "History" vs "Up Next".

- [ ] **Drag & Drop Reordering**
  - Allow users to reorder the "Up Next" list.

