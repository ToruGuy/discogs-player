# Queue Player Logic Documentation

This document describes the behavioral specification for the queue-based playback system.

**Core Philosophy**: "Endless Stream & Interrupts". The queue is a persistent timeline. We never clear it (unless explicitly asked). Playing something new "interrupts" the current flow by inserting the new content immediately after the current track, pushing the old "up next" tracks further down.

## Core Concepts

- **Queue**: An ordered list of tracks that grows indefinitely.
- **Queue Index**: Points to the "Now Playing" track.
- **History**: Everything before the Index.
- **Future**: Everything after the Index.

---

## Behaviours & Rules

### Case 1: Play Album (Interrupt / Play Now)
**User Intent**: "I want to listen to Album B *right now*, but don't lose my place in Album A."

*   **Initial State**:
    *   Queue: `[A1, A2, A3]`
    *   Playing: A1 (Index 0)
*   **Action**: User clicks "Play" on **Album B** `[B1, B2, B3]`.
*   **Logic**:
    1.  **Insert** all Album B tracks immediately *after* the current track (A1).
    2.  **Advance** Queue Index to the first new track (B1).
*   **Result Queue**: `[A1(history), B1(playing), B2, B3, A2, A3]`
*   **Playback Flow**:
    *   Now playing B1.
    *   Then B2, then B3.
    *   Once Album B finishes, playback "returns" to A2.

### Case 2: Play Track (Single Interrupt)
**User Intent**: "I want to hear this specific song right now, but then go back to what I was doing."

*   **Initial State**:
    *   Queue: `[A1, A2, A3]`
    *   Playing: A1 (Index 0)
*   **Action**: User clicks "Play" on **Track B1**.
*   **Logic**:
    1.  **Insert** ONLY Track B1 immediately *after* the current track.
    2.  **Advance** Queue Index to B1.
*   **Result Queue**: `[A1(history), B1(playing), A2, A3]`
*   **Playback Flow**:
    *   Now playing B1.
    *   When B1 finishes, playback returns to A2.

### Case 3: Add Album to Queue (Append)
**User Intent**: "I want to hear this later, after everything else is done."

*   **Initial State**:
    *   Queue: `[A1, A2, A3]`
    *   Playing: A1
*   **Action**: User clicks "Add to Queue" on **Album B**.
*   **Logic**:
    1.  **Append** Album B tracks to the *very end* of the queue.
    2.  Queue Index remains unchanged.
*   **Result Queue**: `[A1, A2, A3, B1, B2, B3]`

### Case 4: Play Next (Insert Single/Album)
**User Intent**: "Play this next, but finish the current song first."

*   **Initial State**:
    *   Queue: `[A1, A2, A3]`
    *   Playing: A1
*   **Action**: User clicks "Play Next" on **Album B**.
*   **Logic**:
    1.  **Insert** Album B tracks immediately *after* the current track.
    2.  Queue Index remains unchanged (finish listening to A1).
*   **Result Queue**: `[A1(playing), B1, B2, B3, A2, A3]`

### Case 5: Queue Exhaustion (Collection Auto-Play)
**User Intent**: "I want the music to keep playing from my collection even if I haven't queued anything."

*   **Scenario**: Queue finishes (e.g., A3 ends).
*   **Action**:
    1.  Identify the **Source Album** of the last track (Album A).
    2.  Look up Album A in the user's **Collection**.
    3.  Find the **Next Album** in the collection (Album B).
*   **Logic**:
    *   **If Album B exists**: Auto-add Album B to the queue and continue playing.
    *   **If Album A was last**: Stop/Pause playback.
*   **Result**: Seamless transition from Album A to Album B.

---

## Technical Implementation

### Data Structures

```typescript
interface QueueState {
  items: QueueItem[];
  currentIndex: number; // The pointer to "Now Playing"
}

// Derived values for UI
const queueSize = state.items.length;
const currentTrack = state.items[state.currentIndex];
const historyCount = state.currentIndex;
const upNextCount = queueSize - state.currentIndex - 1;
```

### Persistence Strategy

To ensure total control and reliability, we will use **File-System Persistence** instead of `localStorage`.

*   **File**: `queue.json` in the application data directory (via Tauri fs).
*   **Save Trigger**: Auto-save on any queue modification (debounced 500ms).
*   **Load Trigger**: App startup.
*   **Manual Control**: Users can "Clear Queue" which resets the file to empty.

### Queue Operations Logic

We will use a unified `insertAt` helper to handle the "Interrupt" logic safely.

1.  **`playNow(items)` (Interrupt)**:
    *   Logic: `items` are inserted at `currentIndex + 1`.
    *   Pointer: Moves to `currentIndex + 1` (immediately plays first new item).
    *   Old "Up Next": Pushed down by `items.length`.

2.  **`playNext(items)` (Insert)**:
    *   Logic: `items` are inserted at `currentIndex + 1`.
    *   Pointer: **Stays at `currentIndex`** (finishes current song).
    *   Old "Up Next": Pushed down by `items.length`.

3.  **`addToQueue(items)` (Append)**:
    *   Logic: `items` are pushed to `items.length` (end of array).
    *   Pointer: Unchanged.

4.  **`nextTrack()` (Auto-Play)**:
    *   Check: `if (currentIndex + 1 < items.length)` -> Increment pointer.
    *   Else (Exhausted):
        *   Find `lastItem.albumId` in Collection.
        *   Find `nextAlbum`.
        *   `addToQueue(nextAlbum)`.
        *   Increment pointer.

### Visibility & Control
The Player Context will expose:
- `queue`: Full array (for debugging/UI lists).
- `queueIndex`: Current position integer.
- `queueLength`: Total count.
- `persistQueue()`: Manual trigger to save state to disk.
- `clearQueue()`: Resets queue to empty state.
