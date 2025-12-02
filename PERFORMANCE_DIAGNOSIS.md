# Performance Diagnosis - Discogs Player

**Date:** November 30, 2025  
**Status:** Pending fixes

---

## Executive Summary

The app is rendering **599 album cards** on every frame without virtualization or memoization. Combined with high-frequency progress updates (60fps) propagating through React contexts, this creates significant performance bottlenecks.

**Key metrics:**
- Albums in collection: **599**
- JSON data size: **~2.7MB**
- Cards rendered simultaneously: **599** (should be ~15-30)
- Progress updates: **~60/sec** (should be 4-10/sec)

---

## Issues Found

### 🔴 Critical: No List Virtualization

**File:** `src/components/album/AlbumGrid.tsx`

```tsx
// Current: Renders ALL 599 albums
{albums.map((album) => (
    <AlbumCard key={album.id} album={album} />
))}
```

**Problem:** All 599 `AlbumCard` components are in the DOM at once. Each card has:
- Image element
- Multiple badges
- Popover menu with buttons
- Click handlers
- Hover state logic

**Impact:** DOM has 599 complex card components instead of ~20 visible ones.

**Fix:** Use `react-window` or `@tanstack/react-virtual`:

```tsx
import { FixedSizeGrid as Grid } from 'react-window';

// Only render visible cards + buffer
<Grid
  columnCount={5}
  rowCount={Math.ceil(albums.length / 5)}
  columnWidth={250}
  rowHeight={350}
  height={800}
  width={1250}
>
  {({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 5 + columnIndex;
    const album = albums[index];
    if (!album) return null;
    return <AlbumCard key={album.id} album={album} style={style} />;
  }}
</Grid>
```

---

### 🔴 Critical: No Component Memoization

**File:** `src/components/album/AlbumCard.tsx`

```tsx
// Current: Not memoized
export function AlbumCard({ album }: AlbumCardProps) {
```

**Problem:** `AlbumCard` re-renders whenever ANY parent state changes. With 599 cards, this is catastrophic.

**Fix:**

```tsx
import { memo } from 'react';

export const AlbumCard = memo(function AlbumCard({ album }: AlbumCardProps) {
  // ... existing code
});
```

Also consider extracting the `usePlayer()` hook usage:
- Most cards don't need `isPlaying` or `currentAlbum`
- Only the currently playing card needs these values
- Use selective context subscription or pass `isCurrentAlbum` as prop from parent

---

### 🟠 High: Context Cascading Re-renders

**File:** `src/components/album/AlbumCard.tsx`

```tsx
const { 
    playAlbum, 
    playAlbumNext,
    addAlbumToQueue,
    currentAlbum,   // ← Changes when track changes
    isPlaying,      // ← Changes on play/pause
    togglePlay
} = usePlayer();
```

**Problem:** Every `AlbumCard` subscribes to `currentAlbum` and `isPlaying`. When these change, ALL 599 cards re-render.

**Fix Options:**

1. **Lift comparison to parent:**
```tsx
// In AlbumGrid
const { currentAlbum, isPlaying } = usePlayer();

{albums.map((album) => (
    <AlbumCard 
        key={album.id} 
        album={album}
        isCurrentAlbum={currentAlbum?.id === album.id}
        isPlaying={isPlaying && currentAlbum?.id === album.id}
    />
))}
```

2. **Use context selectors** (with `use-context-selector` library):
```tsx
const isCurrentAlbum = useContextSelector(
    PlayerContext, 
    ctx => ctx.currentAlbum?.id === album.id
);
```

---

### 🟠 High: High-Frequency Progress Updates

**File:** `src/components/player/YoutubePlayer.tsx`

```tsx
const updateProgress = useCallback(() => {
    // ... gets current time
    setProgress(currentTime);  // ← Fires ~60 times/sec
    setDuration(duration);
    requestRef.current = requestAnimationFrame(updateProgress);
}, [isPlaying, isSeeking, setProgress, setDuration]);
```

**Problem:** `setProgress()` triggers state updates at ~60fps. Any component using `progress` from context re-renders 60 times per second.

**Fix:** Throttle to 4-10 updates per second:

```tsx
import { useRef } from 'react';

const lastUpdateRef = useRef(0);
const UPDATE_INTERVAL = 250; // ms (4 updates/sec)

const updateProgress = useCallback(() => {
    const now = Date.now();
    
    if (playerRef.current && isPlaying && !isSeeking) {
        // Only update state at throttled interval
        if (now - lastUpdateRef.current >= UPDATE_INTERVAL) {
            try {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                
                if (typeof currentTime === 'number') setProgress(currentTime);
                if (typeof duration === 'number' && duration > 0) setDuration(duration);
                
                lastUpdateRef.current = now;
            } catch (e) {
                // Ignore errors
            }
        }
    }
    requestRef.current = requestAnimationFrame(updateProgress);
}, [isPlaying, isSeeking, setProgress, setDuration]);
```

---

### 🟡 Medium: No Image Caching

**File:** `src/components/album/AlbumCard.tsx`

```tsx
<img 
    src={album.image_url} 
    alt={album.title}
    className="object-cover w-full h-full"
    loading="lazy"
/>
```

**Problem:** 
- Only using native lazy loading
- No thumbnail/preview images
- No image preloading for visible viewport
- 599 external images compete for bandwidth

**Fix Options:**

1. **Add blur placeholder / skeleton:**
```tsx
const [loaded, setLoaded] = useState(false);

<div className="relative">
    {!loaded && <Skeleton className="absolute inset-0" />}
    <img 
        src={album.image_url}
        onLoad={() => setLoaded(true)}
        className={cn("...", !loaded && "opacity-0")}
    />
</div>
```

2. **Use smaller thumbnails** (if available from Discogs API)

3. **Implement image service with caching:**
```tsx
// services/imageCache.ts
const imageCache = new Map<string, string>();

export async function getCachedImage(url: string): Promise<string> {
    if (imageCache.has(url)) return imageCache.get(url)!;
    
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    imageCache.set(url, objectUrl);
    
    return objectUrl;
}
```

---

### 🟡 Medium: Large Data in React State

**Problem:** 2.7MB of album data with nested structures in React state:
- `youtube_videos[]`
- `collection_items[]`
- `user_interactions[]`
- Full metadata for each album

**Impact:**
- Large state updates when filtering
- Memory pressure
- JSON parsing overhead

**Fix Options:**

1. **Normalize data** (separate stores for videos, interactions)
2. **Paginate API responses** (load 50 albums at a time)
3. **Use external state** (Zustand, Jotai) for better performance

---

## Implementation Priority

| Priority | Fix | Impact | Effort | Est. Time |
|----------|-----|--------|--------|-----------|
| 1 | Memoize `AlbumCard` | 🔥🔥🔥 | Easy | 5 min |
| 2 | Throttle progress updates | 🔥🔥🔥 | Easy | 10 min |
| 3 | Lift context usage to parent | 🔥🔥 | Medium | 20 min |
| 4 | Virtualize grid | 🔥🔥🔥 | Medium | 45 min |
| 5 | Add image loading states | 🔥 | Easy | 15 min |
| 6 | Split contexts (progress vs queue) | 🔥🔥 | Medium | 30 min |

---

## Quick Start

### Step 1: Memoize AlbumCard (5 min)

```bash
# Edit src/components/album/AlbumCard.tsx
```

```tsx
import { memo } from 'react';

export const AlbumCard = memo(function AlbumCard({ album }: AlbumCardProps) {
    // ... existing implementation
});
```

### Step 2: Throttle Progress (10 min)

```bash
# Edit src/components/player/YoutubePlayer.tsx
```

Add throttling logic as shown above.

### Step 3: Install Virtualization (30 min)

```bash
npm install react-window @types/react-window
```

Then update `AlbumGrid.tsx` to use `FixedSizeGrid`.

---

## Verification

After implementing fixes, verify with React DevTools:

1. **Profiler tab** → Record while scrolling
2. **Components tab** → Highlight updates on render
3. **Performance tab** (Chrome) → Look for long tasks

Target metrics:
- Render count per interaction: < 50 (down from 599)
- Progress update frequency: ~4/sec (down from 60/sec)
- Visible DOM nodes: ~30 cards (down from 599)

---

## Dependencies to Add

```json
{
  "dependencies": {
    "react-window": "^1.8.10"
  },
  "devDependencies": {
    "@types/react-window": "^1.8.8"
  }
}
```

Optional for context optimization:
```json
{
  "dependencies": {
    "use-context-selector": "^1.4.4"
  }
}
```

