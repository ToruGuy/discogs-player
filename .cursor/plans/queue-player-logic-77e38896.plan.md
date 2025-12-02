<!-- 77e38896-e23f-45f9-afe4-3d79ae15996a 223dc386-5e6c-4bc1-b6fc-2956ea1e84ac -->
# Integrate Queue System with Player Logic

## Step 1: Document the Queue Logic (FIRST TASK)

Create `/Users/tako/GitRepos/discogs-player/docs/queue_logic.md` with the complete behavioral specification.

### Queue Behavior Rules to Document

**Rule 1: Single Track Play**

- User plays A1 from Album A (A1, A2, A3)
- Queue = [A1]
- When A1 ends:
                                - If queue has more items → play next item in queue
                                - If queue is empty → auto-add remaining album tracks [A2, A3] and continue

**Rule 2: Play Album (Replace Queue)**

- User clicks "Play Album B" while A1 is playing
- Queue = [A1(played), B1, B2, B3]
- A1 stays in history, immediately jump to B1
- B1, B2, B3 play in sequence

**Rule 3: Add Album to Queue (Queue Not Empty)**

- A1 is playing, user adds Album B to queue
- Queue = [A1, B1, B2, B3]
- A1 finishes → B1 plays next (no auto-add of A2, A3 because queue is not empty)

**Rule 4: Add Full Album, Then Another**

- User plays Album A (adds A1, A2, A3)
- User adds Album B to queue
- Queue = [A1, A2, A3, B1, B2, B3]
- Plays A1 → A2 → A3 → B1 → B2 → B3 in order

**Rule 5: Play Next (Insert After Current)**

- A1 is playing, user clicks "Play Next" on Album B
- Queue = [A1, B1, B2, B3, ...rest]
- A1 finishes → B1 plays immediately

**Rule 6: Queue Exhaustion**

- When last track in queue finishes and queue is empty → stop playing

## Step 2: Technical Implementation

### Update `QueueItem` type in `src/types.ts`

Add fields to track source album info:

```typescript
export type QueueItem = {
  videoId: string;
  title: string;
  artist: string;
  albumId: number;
  albumTitle: string;
  albumImageUrl: string;
  trackIndex: number;  // Position in album's youtube_videos array
  totalTracksInAlbum: number;  // Total tracks in source album
  source: 'album' | 'playlist' | 'manual';
};
```

### Rewrite `PlayerContext` (`src/context/PlayerContext.tsx`)

**Add new functions:**

- `playTrack(album: Album, trackIndex: number)` - Adds single track, plays immediately
- `playAlbum(album: Album)` - Replaces queue, adds all tracks, plays from start
- `playAlbumNext(album: Album)` - Inserts album after current track
- `addAlbumToQueue(album: Album)` - Appends album to end

**Update `nextTrack()` logic:**

```
1. Move queueIndex forward
2. If queueIndex < queue.length → play queue[queueIndex]
3. Else (queue exhausted):
   - Get last played track's album info (trackIndex, totalTracksInAlbum)
   - Check if there are remaining tracks in that album
   - If yes → auto-add remaining tracks and continue
   - If no → stop playing
```

**Update `currentVideo` and `currentAlbum` derivation:**

- Derive from `queue[queueIndex]` instead of separate state
- Look up video by videoId from albums data

### Update `AlbumCard` (`src/components/album/AlbumCard.tsx`)

**Modify popover menu actions:**

- "Play Album" → `playAlbum(album)`
- "Play Next" → `playAlbumNext(album)`
- "Add to Queue" → `addAlbumToQueue(album)`

**Update `convertAlbumToQueueItems()`:**

- Include `trackIndex` and `totalTracksInAlbum` fields

### Update `FocusView` (`src/views/FocusView.tsx`)

**Add buttons for album-level actions:**

- "Play Album" button (already exists) → `playAlbum(album)`
- Add "Play Next" button → `playAlbumNext(album)`
- Add "Add to Queue" button → `addAlbumToQueue(album)`

**Add track-level play in tracklist:**

- Each track row needs play button
- Click track → `playTrack(album, trackIndex)`

## Implementation Order

1. **Create `docs/queue_logic.md` with full behavioral documentation**
2. Update `QueueItem` type with new fields
3. Add helper function to convert album to queue items with all fields
4. Rewrite PlayerContext with new playback functions
5. Implement smart `nextTrack()` with auto-continuation logic
6. Update AlbumCard actions
7. Update FocusView with album and track actions
8. Test all scenarios

### To-dos

- [ ] Add trackIndex and totalTracksInAlbum to QueueItem type
- [ ] Refactor PlayerContext to use queue as single source of truth
- [ ] Update AlbumCard with new player functions and queue helpers
- [ ] Add Play Next/Add to Queue and track-level play to FocusView
- [ ] Test auto-continuation and queue progression scenarios