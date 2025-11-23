# Vinyl Player UI Documentation

## 1. Global Design System
- **Framework**: Next.js (App Router) with React.
- **Styling**: Tailwind CSS v4 (configured via `globals.css` with `@theme inline` and CSS variables).
- **Fonts**: Geist Sans and Geist Mono.
- **Theme**: Supports Light and Dark modes (using `oklch` color space variables).
- **Icons**: `lucide-react`.
- **UI Components**: Shadcn UI (Card, Button, Badge, Dialog, Input, Select, Table, Progress, etc.).

## 2. Data Models (Key Types)
The UI is driven by the following core data structures (defined in `lib/types.ts`):
- **Collection**: Represents a user's vinyl collection (id, name, item count).
- **VinylWithCollection**: A comprehensive object merging `Vinyl` (metadata, tracklist, YouTube videos) with `CollectionItem` (price, condition, local state).
- **ScraperProgress**: Real-time status object containing `current`/`total` counts, `phase`, and `stats` (success/error counts).

## 3. State Management (Hooks)
The application uses custom hooks to isolate logic and manage complex state:
- **`useInteractions`** (`hooks/useInteractions.ts`):
  - Manages "Played" and "Liked" status for vinyls/videos.
  - Syncs with the backend API (`/api/interactions`).
  - Provides optimistic UI updates (updates local state immediately, reverts on error).
- **`useScraperProgress`** (`hooks/useScraperProgress.ts`):
  - Manages the Server-Sent Events (SSE) connection for real-time scraping feedback.
  - Handles lifecycle: connection start, progress updates, completion, and error handling.
  - Parses incoming SSE data streams into structured `ScraperProgressState`.
- **`useLocalStorage`** (`hooks/useLocalStorage.ts`):
  - *Legacy/Fallback*: Provides local persistence for played/liked videos when API is unavailable.

## 4. Pages & Component Hierarchy

### 4.1 Root Layout (`app/layout.tsx`)
- **Providers**: None currently visible at root (state is local or hook-based).
- **Global Styles**: Imports `globals.css`.

### 4.2 Main Player (`app/page.tsx`)
- **Route**: `/`
- **Purpose**: The core browsing and playback experience.
- **State**: `selectedCollectionId`, `vinyls`, `currentVinylIndex`, `isPlaying`.
- **Key Children**:
  - `CollectionManager`: Top-level dropdown to switch contexts.
  - `CollectionFilter`: Popover for filtering the current view.
  - `VinylDetail` (Left Column): Displays album art and static metadata.
  - `VinylDetailPanel` (Right Column): Handles the active video player and playlist.
  - `AddCollectionModal`: Triggered via the "Add Collection" button.

### 4.3 Collections Management (`app/collections/page.tsx`)
- **Route**: `/collections`
- **Purpose**: Dashboard for managing all collections.
- **Layout**: Responsive Grid of Cards.
- **Features**:
  - Visual summary of each collection (Name, Count, Last Updated).
  - "Delete" action with confirmation.
  - Statistics summary (Total items, Active collections).

### 4.4 Import Interface (`app/import/page.tsx`)
- **Route**: `/import`
- **Purpose**: Dedicated page for adding data.
- **Key Children**:
  - `ImportForm`: The complex form handling input validation and submission.
  - `ScraperProgressDialog`: Modal that appears during active operations.
  - `ScraperStatusIndicator`: Minimized floating widget for background tasks.

### 4.5 Liked Items (`app/liked/page.tsx`)
- **Route**: `/liked`
- **Purpose**: Favorites gallery.
- **Layout**: Grid of `VinylCard` components.
- **Logic**: Fetches items where `liked_video_indices` is not empty.

### 4.6 Scraping History (`app/scraping/page.tsx`)
- **Route**: `/scraping`
- **Purpose**: System monitor.
- **Layout**:
  - Filter Bar (Collection, Status).
  - Data Table (Session ID, Date, Status, Detailed Stats).
- **Interactions**: Expand rows to view raw operation logs (JSON details).

## 5. Component Detail

### 5.1 `CollectionManager`
- **Visuals**: Select dropdown + Badge (item count) + Delete button.
- **Logic**: Auto-selects first collection if none active.

### 5.2 `VinylDetail`
- **Visuals**:
  - Large Cover Image.
  - **Metadata Card**: Label, Year, Country.
  - **Stats Card**: Community Have/Want, Ratings, Price Range (Low/Med/High).
  - **Tags**: Genre/Style Badges.
  - **Tracklist**: Grouped by Side (A/B).

### 5.3 `VinylDetailPanel`
- **Visuals**:
  - **Player**: YouTube IFrame (via `react-youtube` logic).
  - **Playlist**: Scrollable list of videos.
  - **Controls**: Previous/Next Video buttons.
  - **Interaction**: "Like" button (toggles heart icon).

### 5.4 `ImportForm`
- **Tabs**: "From Discogs URL" vs "From JSON File".
- **Logic**:
  - Auto-extracts Collection Name from URL regex.
  - Validates inputs before submission.
  - Triggers `ScraperProgressDialog` on start.

### 5.5 `ScraperProgressDialog`
- **Visuals**:
  - **Header**: Spinner/Checkmark + Collection Name.
  - **Progress Bar**: Visual percentage.
  - **Stats Row**: Success (Green), Skipped (Gray), Errors (Red).
  - **Log Console**: Scrollable text area for real-time messages.

### 5.6 `ScraperStatusIndicator`
- **Visuals**: Fixed position (bottom-right) floating card.
- **Behavior**:
  - Pulses when active.
  - Shows mini-progress bar.
  - Click expands to full `ScraperProgressDialog`.

### 5.7 `CollectionFilter`
- **Visuals**: Button with badge count -> Popover Content.
- **Fields**:
  - Multi-select badges for Genres/Styles.
  - Number inputs for Price/Year ranges.
  - Checkbox for "New items only".
