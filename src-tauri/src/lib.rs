mod player_server;
use tauri::command;
use tauri_plugin_sql::{Migration, MigrationKind};

#[command]
fn test_ipc_ping(payload: String) -> String {
    println!("Received ping from frontend: {}", payload);
    format!("Pong! You sent: '{}'. Server time: {:?}. IPC is healthy!", payload, std::time::SystemTime::now())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let migrations = vec![
      Migration {
          version: 1,
          description: "create_initial_tables",
          sql: "
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
              is_new INTEGER DEFAULT 0,
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
          ",
          kind: MigrationKind::Up,
      },
  ];

  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(
      tauri_plugin_sql::Builder::default()
        .add_migrations("sqlite:discogs.db", migrations)
        .build(),
    )
    .invoke_handler(tauri::generate_handler![test_ipc_ping])
    .setup(|app| {
      // Start the Sidecar Player Server
      player_server::start();

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
