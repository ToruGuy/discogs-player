# Database Schema Design

## Overview
We will use **SQLite** as the local database engine, managed via `tauri-plugin-sql`. This provides a relational data store that persists locally on the user's machine.

## Architecture
- **Database**: SQLite
- **Plugin**: `tauri-plugin-sql`
- **ORM/Query Builder**: Raw SQL or a lightweight wrapper (initially raw SQL via Tauri plugin).
- **Migrations**: Managed via Rust `Migration` structs in `src-tauri/src/lib.rs`.

## Design Decisions

### Primary Key Strategy
We use `discogs_release_id` (TEXT) as the natural primary key for albums. Since this is a Discogs-centric application, every album has a Discogs ID, making it the natural identifier. This simplifies queries and avoids surrogate key lookups.

### YouTube Videos (Many-to-Many)
A YouTube video can appear on multiple albums (compilations, re-releases). We use a junction table `album_videos` to model this relationship.

---

## Schema Definitions

### 1. `albums`
The core entity representing a Discogs release.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `discogs_release_id` | TEXT | PRIMARY KEY | The Discogs Release ID (natural key) |
| `artist` | TEXT | NOT NULL | Artist name (flattened for now) |
| `title` | TEXT | NOT NULL | Album title |
| `label` | TEXT | | Record label |
| `catalog_number` | TEXT | | Catalog number |
| `format` | TEXT | | e.g., "Vinyl, LP" |
| `country` | TEXT | | Release country |
| `released_year` | INTEGER | | Year of release |
| `cover_image_url` | TEXT | | URL to local or remote image |
| `resource_url` | TEXT | | Discogs API URL |
| `price_low` | REAL | | |
| `price_median` | REAL | | |
| `price_high` | REAL | | |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | |

### 2. `tracks`
Individual tracks belonging to an album.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `album_id` | TEXT | NOT NULL, FK -> albums(discogs_release_id) | |
| `position` | TEXT | NOT NULL | e.g., "A1", "1", "B2" |
| `title` | TEXT | NOT NULL | Track title |
| `duration` | TEXT | | Duration string (e.g., "3:45") |
| `side` | TEXT | | "A", "B", etc. |

### 3. `genres` & `styles`
Normalized tables for filtering.

**Table: `genres`**
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT |
| `name` | TEXT | UNIQUE NOT NULL |

**Table: `album_genres`**
| Column | Type | Constraints |
|--------|------|-------------|
| `album_id` | TEXT | FK -> albums(discogs_release_id) |
| `genre_id` | INTEGER | FK -> genres(id) |
| PRIMARY KEY (album_id, genre_id) |

*(Same pattern for `styles` and `album_styles`)*

### 4. `youtube_videos`
YouTube video metadata (standalone entity).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | The YouTube Video ID |
| `title` | TEXT | | Video title |
| `url` | TEXT | | Full YouTube URL |

### 5. `album_videos`
Junction table linking albums to YouTube videos (many-to-many).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `album_id` | TEXT | NOT NULL, FK -> albums(discogs_release_id) | |
| `video_id` | TEXT | NOT NULL, FK -> youtube_videos(id) | |
| `order_index` | INTEGER | DEFAULT 0 | For ordering within album |
| PRIMARY KEY (album_id, video_id) | | | |

### 6. `sellers`
Information about who is selling an item.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `name` | TEXT | NOT NULL | e.g. "SecretSpot.Records" |
| `slug` | TEXT | UNIQUE | e.g. "secretspot-records" (for linking) |
| `ships_from` | TEXT | | e.g. "Poland" |
| `rating` | REAL | | e.g. 100.0 |
| `rating_count` | INTEGER | | e.g. 119 |
| `uri` | TEXT | | URL to seller profile |

### 7. `collection_items`
Specific inventory/collection instances.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `album_id` | TEXT | NOT NULL, FK -> albums(discogs_release_id) | |
| `seller_id` | INTEGER | FK -> sellers(id) | Who is selling this specific item |
| `collection_id` | INTEGER | | Discogs collection ID (if applicable) |
| `price` | REAL | | Seller price |
| `currency` | TEXT | | e.g. "EUR" |
| `condition` | TEXT | | Media condition (e.g. "Mint", "G+") |
| `sleeve_condition` | TEXT | | Sleeve condition |
| `notes` | TEXT | | Seller notes |
| `is_available` | BOOLEAN | | |

### 8. `playlists`
User-created and system playlists.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `title` | TEXT | NOT NULL | Playlist Name |
| `description` | TEXT | | |
| `is_system` | BOOLEAN | DEFAULT 0 | Protected system playlists |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | |

### 9. `playlist_items`
Videos in a playlist.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `playlist_id` | INTEGER | NOT NULL, FK -> playlists(id) | |
| `video_id` | TEXT | NOT NULL, FK -> youtube_videos(id) | |
| `position` | INTEGER | NOT NULL | Order in playlist |
| `added_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | |

### 10. `user_interactions`
Tracking user behavior (likes, plays).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | |
| `album_id` | TEXT | NOT NULL, FK -> albums(discogs_release_id) | |
| `interaction_type` | TEXT | NOT NULL | 'played', 'liked', 'disliked' |
| `video_id` | TEXT | FK -> youtube_videos(id) | Optional: specific video played |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | |

---

## Implementation Plan

1.  **Dependencies**: Add `tauri-plugin-sql` with `sqlite` feature to `src-tauri/Cargo.toml`.
2.  **Capabilities**: Update `src-tauri/capabilities/default.json` to allow `sql:default`.
3.  **Migration**: Create the initial migration SQL script in Rust (`src-tauri/src/lib.rs`).
4.  **Service Layer**: Create a TypeScript service (`src/services/db.ts`) to abstract SQL queries.

## Migration 001 SQL

```sql
-- ============================================
-- TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS albums (
  discogs_release_id TEXT PRIMARY KEY,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  label TEXT,
  catalog_number TEXT,
  format TEXT,
  country TEXT,
  released_year INTEGER,
  cover_image_url TEXT,
  resource_url TEXT,
  price_low REAL,
  price_median REAL,
  price_high REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id TEXT NOT NULL,
  position TEXT NOT NULL,
  title TEXT NOT NULL,
  duration TEXT,
  side TEXT,
  FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS album_genres (
  album_id TEXT NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (album_id, genre_id),
  FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS styles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS album_styles (
  album_id TEXT NOT NULL,
  style_id INTEGER NOT NULL,
  PRIMARY KEY (album_id, style_id),
  FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE,
  FOREIGN KEY (style_id) REFERENCES styles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS youtube_videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  url TEXT
);

CREATE TABLE IF NOT EXISTS album_videos (
  album_id TEXT NOT NULL,
  video_id TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  PRIMARY KEY (album_id, video_id),
  FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES youtube_videos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sellers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  ships_from TEXT,
  rating REAL,
  rating_count INTEGER,
  uri TEXT
);

CREATE TABLE IF NOT EXISTS collection_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id TEXT NOT NULL,
  seller_id INTEGER,
  collection_id INTEGER,
  price REAL,
  currency TEXT,
  condition TEXT,
  sleeve_condition TEXT,
  notes TEXT,
  is_available BOOLEAN,
  FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS playlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS playlist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  playlist_id INTEGER NOT NULL,
  video_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES youtube_videos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  video_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES youtube_videos(id) ON DELETE SET NULL
);

-- ============================================
-- INDEXES (Performance)
-- ============================================

-- Tracks: fast lookup by album
CREATE INDEX idx_tracks_album_id ON tracks(album_id);

-- Album-Videos junction: fast lookup both directions
CREATE INDEX idx_album_videos_album_id ON album_videos(album_id);
CREATE INDEX idx_album_videos_video_id ON album_videos(video_id);

-- Collection items: fast lookup by album and seller
CREATE INDEX idx_collection_items_album_id ON collection_items(album_id);
CREATE INDEX idx_collection_items_seller_id ON collection_items(seller_id);

-- Playlist items: fast lookup by playlist
CREATE INDEX idx_playlist_items_playlist_id ON playlist_items(playlist_id);

-- User interactions: fast lookup by album and type
CREATE INDEX idx_user_interactions_album_id ON user_interactions(album_id);
CREATE INDEX idx_user_interactions_type ON user_interactions(interaction_type);

-- Albums: common filter/search columns
CREATE INDEX idx_albums_artist ON albums(artist);
CREATE INDEX idx_albums_released_year ON albums(released_year);

-- ============================================
-- TRIGGERS (Auto-update timestamps)
-- ============================================

CREATE TRIGGER IF NOT EXISTS update_albums_timestamp 
AFTER UPDATE ON albums
FOR EACH ROW
BEGIN
  UPDATE albums SET updated_at = CURRENT_TIMESTAMP WHERE discogs_release_id = NEW.discogs_release_id;
END;
```
