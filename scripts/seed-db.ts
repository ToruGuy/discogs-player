import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../src-tauri/discogs.db');
const DATA_PATH = path.join(__dirname, '../mocked_data_albums.json');

console.log(`Using database: ${DB_PATH}`);

// Ensure DB directory exists (though src-tauri should exist)
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  console.log(`Creating directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Read data
const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
const albums = JSON.parse(rawData);

console.log(`Loaded ${albums.length} albums from JSON.`);

// Initialize schema if not exists (simplified version of Rust migration)
// Note: In production, rely on the app to create schema, but this ensures it works standalone.
db.exec(`
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
    have_count INTEGER DEFAULT 0,
    want_count INTEGER DEFAULT 0,
    avg_rating REAL DEFAULT 0,
    ratings_count INTEGER DEFAULT 0,
    last_sold_date TEXT,
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
    is_new INTEGER,
    item_url TEXT,
    FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id TEXT NOT NULL,
    interaction_type TEXT NOT NULL,
    video_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES albums(discogs_release_id) ON DELETE CASCADE
  );
`);

// Statements
const insertAlbum = db.prepare(`
  INSERT INTO albums (
    discogs_release_id, artist, title, label, catalog_number, format, country, released_year, cover_image_url, resource_url, price_low, price_median, price_high, have_count, want_count, avg_rating, ratings_count, last_sold_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(discogs_release_id) DO UPDATE SET
    artist=excluded.artist, title=excluded.title, have_count=excluded.have_count, want_count=excluded.want_count, avg_rating=excluded.avg_rating, ratings_count=excluded.ratings_count, last_sold_date=excluded.last_sold_date, updated_at=CURRENT_TIMESTAMP
`);

const deleteTracks = db.prepare('DELETE FROM tracks WHERE album_id = ?');
const insertTrack = db.prepare('INSERT INTO tracks (album_id, position, title, duration, side) VALUES (?, ?, ?, ?, ?)');

const deleteVideos = db.prepare('DELETE FROM album_videos WHERE album_id = ?');
const insertVideo = db.prepare('INSERT INTO youtube_videos (id, title, url) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING');
const linkVideo = db.prepare('INSERT INTO album_videos (album_id, video_id, order_index) VALUES (?, ?, ?)');

const deleteGenres = db.prepare('DELETE FROM album_genres WHERE album_id = ?');
const insertGenre = db.prepare('INSERT INTO genres (name) VALUES (?) ON CONFLICT(name) DO NOTHING');
const getGenreId = db.prepare('SELECT id FROM genres WHERE name = ?');
const linkGenre = db.prepare('INSERT INTO album_genres (album_id, genre_id) VALUES (?, ?)');

const deleteStyles = db.prepare('DELETE FROM album_styles WHERE album_id = ?');
const insertStyle = db.prepare('INSERT INTO styles (name) VALUES (?) ON CONFLICT(name) DO NOTHING');
const getStyleId = db.prepare('SELECT id FROM styles WHERE name = ?');
const linkStyle = db.prepare('INSERT INTO album_styles (album_id, style_id) VALUES (?, ?)');

const deleteCollection = db.prepare('DELETE FROM collection_items WHERE album_id = ?');
const insertCollection = db.prepare(`
  INSERT INTO collection_items (album_id, collection_id, price, condition, notes, is_available, is_new, item_url) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const deleteInteractions = db.prepare('DELETE FROM user_interactions WHERE album_id = ?');
const insertInteraction = db.prepare(`
  INSERT INTO user_interactions (album_id, interaction_type, video_id, created_at) 
  VALUES (?, ?, ?, ?)
`);


const transaction = db.transaction((albumsToInsert) => {
  for (const album of albumsToInsert) {
    const albumId = String(album.discogs_release_id); // Ensure string

    // Album
    insertAlbum.run(
      albumId,
      album.artist,
      album.title,
      album.label,
      album.catalog_number,
      album.format,
      album.country,
      album.released_year,
      album.image_url || album.cover_image_url, // Handle mapping
      album.release_url || album.resource_url,
      album.price_low,
      album.price_median,
      album.price_high,
      album.have_count || 0,
      album.want_count || 0,
      album.avg_rating || 0,
      album.ratings_count || 0,
      album.last_sold_date || null
    );

    // Tracks
    deleteTracks.run(albumId);
    if (album.tracklist) {
      for (const track of album.tracklist) {
        insertTrack.run(albumId, track.position, track.title, track.duration || '', track.side || '');
      }
    }

    // Videos
    deleteVideos.run(albumId);
    if (album.youtube_videos) {
      let idx = 0;
      for (const video of album.youtube_videos) {
        insertVideo.run(video.youtube_video_id, video.title, video.youtube_url);
        linkVideo.run(albumId, video.youtube_video_id, idx);
        idx++;
      }
    }

    // Genres
    deleteGenres.run(albumId);
    if (album.genres) {
      for (const g of album.genres) {
        insertGenre.run(g);
        const res = getGenreId.get(g) as { id: number };
        linkGenre.run(albumId, res.id);
      }
    }

    // Styles
    deleteStyles.run(albumId);
    if (album.styles) {
      for (const s of album.styles) {
        insertStyle.run(s);
        const res = getStyleId.get(s) as { id: number };
        linkStyle.run(albumId, res.id);
      }
    }

    // Collection Items
    deleteCollection.run(albumId);
    if (album.collection_items) {
      for (const item of album.collection_items) {
        insertCollection.run(
          albumId,
          item.collection_id,
          item.seller_price,
          item.seller_condition,
          item.seller_notes,
          item.is_available ? 1 : 0,
          item.is_new ? 1 : 0,
          item.item_url
        );
      }
    }

    // User Interactions
    deleteInteractions.run(albumId);
    if (album.user_interactions) {
      for (const interaction of album.user_interactions) {
        insertInteraction.run(
          albumId,
          interaction.interaction_type,
          null, // video_id
          interaction.created_at
        );
      }
    }
  }
});

console.log("Starting insertion...");
try {
  transaction(albums);
  console.log("Successfully seeded database.");
} catch (e) {
  console.error("Error seeding database:", e);
}

