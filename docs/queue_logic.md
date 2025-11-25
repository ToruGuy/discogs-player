# Queue Player Logic Documentation

This document describes the complete behavioral specification for the queue-based playback system in Discogs Player.

## Overview

The queue system is the single source of truth for playback. All tracks are added to a queue, and playback progresses through the queue sequentially. The system supports intelligent auto-continuation when albums are partially added.

## Core Concepts

- **Queue**: An ordered list of tracks to be played
- **Queue Index**: Points to the currently playing track in the queue
- **Auto-continuation**: When a single track from an album finishes and the queue is empty, automatically add remaining tracks from that album

## Queue Behavior Rules

### Rule 1: Single Track Play

**Scenario**: User plays a single track (A1) from Album A which has tracks [A1, A2, A3]

**Initial State**:
- Queue = [A1]
- Queue Index = 0 (playing A1)

**When A1 ends**:
- **If queue has more items** → Play next item in queue
- **If queue is empty** → Auto-add remaining album tracks [A2, A3] and continue playing

**Example Flow**:
1. User clicks play on A1 → Queue = [A1], starts playing A1
2. A1 finishes, queue is empty → Auto-add [A2, A3] → Queue = [A1(played), A2, A3]
3. Continue playing A2, then A3

---

### Rule 2: Play Album (Replace Queue)

**Scenario**: User clicks "Play Album B" while A1 is currently playing

**Initial State**:
- Queue = [A1]
- Queue Index = 0 (playing A1)

**Action**: Play Album B (which has [B1, B2, B3])

**Result**:
- Queue = [A1(played), B1, B2, B3]
- A1 stays in queue history
- Immediately jump to B1 (Queue Index = 1)
- B1, B2, B3 play in sequence

**Note**: The previous track (A1) remains in the queue for history, but playback immediately moves to the new album.

---

### Rule 3: Add Album to Queue (Queue Not Empty)

**Scenario**: A1 is playing, user adds Album B to queue

**Initial State**:
- Queue = [A1]
- Queue Index = 0 (playing A1)

**Action**: Add Album B to queue

**Result**:
- Queue = [A1, B1, B2, B3]
- A1 finishes → B1 plays next
- **No auto-add of A2, A3** because queue is not empty

**Key Point**: Auto-continuation only happens when the queue becomes empty. Since B1, B2, B3 are already in queue, A2 and A3 are not auto-added.

---

### Rule 4: Add Full Album, Then Another

**Scenario**: User plays Album A (adds all tracks), then adds Album B

**Initial State**:
- Queue = [A1, A2, A3]
- Queue Index = 0 (playing A1)

**Action**: Add Album B to queue

**Result**:
- Queue = [A1, A2, A3, B1, B2, B3]
- Plays in order: A1 → A2 → A3 → B1 → B2 → B3

**Note**: Since all tracks from Album A are already in queue, no auto-continuation is needed.

---

### Rule 5: Play Next (Insert After Current)

**Scenario**: A1 is playing, user clicks "Play Next" on Album B

**Initial State**:
- Queue = [A1, ...other tracks]
- Queue Index = 0 (playing A1)

**Action**: Play Next Album B

**Result**:
- Queue = [A1, B1, B2, B3, ...rest of previous queue]
- A1 finishes → B1 plays immediately
- Then B2, B3, then continue with rest of queue

**Key Point**: "Play Next" inserts the album immediately after the current track, pushing existing queue items later.

---

### Rule 6: Queue Exhaustion

**Scenario**: Last track in queue finishes

**When last track finishes**:
- If queue is empty → Stop playing
- If queue has more items → Continue to next item

**Auto-continuation check**:
- Only when queue becomes empty after a track finishes
- Check if the finished track was part of an album with remaining tracks
- If yes → Auto-add remaining tracks and continue
- If no → Stop playing

---

## Technical Implementation Details

### QueueItem Structure

Each item in the queue must track:
- `videoId`: YouTube video ID
- `title`: Track title
- `artist`: Artist name
- `albumId`: Source album ID
- `albumTitle`: Album title
- `albumImageUrl`: Album cover image
- `trackIndex`: Position in album's youtube_videos array (0-based)
- `totalTracksInAlbum`: Total number of tracks in the source album
- `source`: Origin of the track ('album' | 'playlist' | 'manual')

### Playback Functions

1. **`playTrack(album, trackIndex)`**
   - Adds single track to queue
   - Sets queue index to new track
   - Starts playing immediately

2. **`playAlbum(album)`**
   - Replaces entire queue with all album tracks
   - Sets queue index to 0
   - Starts playing from first track

3. **`playAlbumNext(album)`**
   - Inserts all album tracks after current queue index
   - Does not change current playing track
   - Next track will be first track of inserted album

4. **`addAlbumToQueue(album)`**
   - Appends all album tracks to end of queue
   - Does not change current playing track
   - Tracks will play after all existing queue items

### Next Track Logic

```
When current track ends:
1. Increment queueIndex
2. If queueIndex < queue.length:
   → Play queue[queueIndex]
3. Else (queue exhausted):
   a. Get last played track's album info
   b. Check: trackIndex < totalTracksInAlbum - 1?
   c. If yes:
      → Auto-add remaining tracks [trackIndex+1 ... totalTracksInAlbum-1]
      → Continue playing
   d. If no:
      → Stop playing
```

### Current Video Derivation

The currently playing video is derived from:
- `queue[queueIndex]` → Get `videoId` and `albumId`
- Look up album from albums data using `albumId`
- Find video in album's `youtube_videos` array matching `videoId`
- Return that video object

---

## User Interface Actions

### Album Card Actions

- **Play Button**: Calls `playAlbum(album)` - replaces queue, plays immediately
- **Play Next**: Calls `playAlbumNext(album)` - inserts after current
- **Add to Queue**: Calls `addAlbumToQueue(album)` - appends to end

### Focus View (Single Album Page)

- **Play Album Button**: Calls `playAlbum(album)`
- **Play Next Button**: Calls `playAlbumNext(album)`
- **Add to Queue Button**: Calls `addAlbumToQueue(album)`
- **Track-level Play**: Each track row has play button → Calls `playTrack(album, trackIndex)`

---

## Edge Cases

1. **Playing track from middle of album**
   - If only A2 is added (not A1), auto-continuation should add A3, A4, etc. (not A1)

2. **Multiple albums with same track**
   - Queue items are uniquely identified by combination of `albumId` + `videoId` + `trackIndex`

3. **Album modified during playback**
   - Queue items store snapshot of album state at time of addition
   - Changes to album don't affect already-queued items

4. **Empty album**
   - Cannot play or add albums with no youtube_videos
   - Functions should return early with no-op

5. **Queue persistence**
   - Queue and queueIndex are saved to localStorage
   - Restored on app restart
   - Queue items must be validated against current album data on restore

---

## Summary

The queue system provides a flexible, predictable playback experience where:
- Users can play individual tracks or full albums
- Albums can be added to queue without interrupting current playback
- Smart auto-continuation ensures smooth playback when albums are partially added
- Queue history is maintained for user reference
- All playback actions are queue-based and consistent

