<!-- 3d93f46e-307e-4516-aa56-2f55d2cf141a 2eeb6772-21fc-4cff-91a5-570dafc9f10b -->
# Implement Queue & Expanded Player Overlay

## 1. Queue System Logic (The Backbone)

We need to upgrade `PlayerContext` to handle a list of tracks (Queue) instead of just a single `currentAlbum`.

- **Modify `PlayerContext.tsx`**:
- Add `queue` state: `QueueItem[]` (includes video ID, title, artist, album info, source).
- Add `queueIndex` state: `number` (points to current track in queue).
- Add `addToQueue(items: QueueItem[])`: Appends tracks to the list.
- Add `playNow(items: QueueItem[])`: Adds items to queue *immediately after current track* (or replaces, based on user preference, but user asked for "add to play now but queue remain" - likely means *insert next*).
- **Persistence**: Use `localStorage` to save `queue` and `queueIndex` on change, and load on startup.

## 2. The "Drawer" Overlay (The View)

A new UI component that lives outside the main routing (in `MainLayout`) so it can overlay everything.

- **Create `PlayerOverlay.tsx`**:
- A collapsible container controlled by a state in `PlayerContext` (`isPlayerOpen`).
- **Animation**: Slide down from top (using Tailwind transitions).
- **Layout**:
- **Left/Top**: The YouTube Player (moved here from hidden state).
- **Right/Bottom**: The Queue List (scrollable).
- Drag-and-drop reordering (optional for V1, but good to keep in mind).
- Remove from queue button.
- **Controls**: Clear Queue, Save Queue (maybe later).

## 3. TopBar Integration

- Update `TopBar.tsx`:
- Add a "Expand/Collapse" button (Chevron Down/Up) in the center or near playback controls.
- Update "Mini Player" area to show current Queue info.

## 4. YouTube Player Migration

- Move `<YoutubePlayer />` from `App.tsx` (or wherever it is effectively) to inside `PlayerOverlay.tsx`.
- Ensure it handles visibility correctly (not unmounting when closed to prevent audio stopping, just visually hiding).

## Implementation Steps

1.  **Data Layer**: Update `types.ts` and `PlayerContext.tsx` with Queue logic & persistence.
2.  **UI Layer**: Create `PlayerOverlay` component with the "Slide Down" CSS.
3.  **Integration**: Mount `PlayerOverlay` in `MainLayout` and hook up the `TopBar` toggle.
4.  **Refinement**: Connect the YouTube iframe into the Overlay and test "Play Now" vs "Add to Queue".

### To-dos

- [ ] Define QueueItem type and update PlayerContext with queue state & persistence
- [ ] Create PlayerOverlay component with slide-down animation
- [ ] Update MainLayout to include PlayerOverlay
- [ ] Move YoutubePlayer into PlayerOverlay and ensure persistence logic
- [ ] Update TopBar with toggle button for the overlay
- [ ] Implement 'Play Now' (Insert Next) and 'Add to Queue' logic in AlbumCard