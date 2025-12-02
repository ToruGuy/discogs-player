import Database from '@tauri-apps/plugin-sql';
import type { Album, Track, YoutubeVideo, CollectionItem, UserInteraction } from '@/types';

// Database name matching the one in Rust migration
const DB_NAME = 'sqlite:discogs.db';

// DB specific type for YoutubeVideo since DB schema differs from frontend type
interface DbYoutubeVideo {
  id: string;
  title: string;
  url: string;
}

class DatabaseService {
  private db: Database | null = null;

  async connect() {
    if (!this.db) {
      this.db = await Database.load(DB_NAME);
    }
    return this.db;
  }

  async getAllAlbums(): Promise<Album[]> {
    const db = await this.connect();
    
    // Fetch core album data
    const albums = await db.select<any[]>('SELECT * FROM albums ORDER BY created_at DESC');
    
    // For each album, fetch related data
    // Note: In a real app, we'd want to optimize this with JOINS or batch queries
    const enrichedAlbums = await Promise.all(albums.map(async (album) => {
      const tracks = await db.select<Track[]>('SELECT * FROM tracks WHERE album_id = ? ORDER BY position', [album.discogs_release_id]);
      
      const videos = await db.select<(DbYoutubeVideo & { order_index: number })[]>('SELECT v.*, av.order_index FROM youtube_videos v JOIN album_videos av ON v.id = av.video_id WHERE av.album_id = ? ORDER BY av.order_index', [album.discogs_release_id]);
      
      const collectionItems = await db.select<CollectionItem[]>('SELECT * FROM collection_items WHERE album_id = ?', [album.discogs_release_id]);
      
      const interactions = await db.select<UserInteraction[]>('SELECT * FROM user_interactions WHERE album_id = ?', [album.discogs_release_id]);
      
      const genres = await db.select<any[]>('SELECT g.name FROM genres g JOIN album_genres ag ON g.id = ag.genre_id WHERE ag.album_id = ?', [album.discogs_release_id]);
      
      const styles = await db.select<any[]>('SELECT s.name FROM styles s JOIN album_styles as_ ON s.id = as_.style_id WHERE as_.album_id = ?', [album.discogs_release_id]);

      const youtubeVideos: YoutubeVideo[] = videos.map(v => ({
        youtube_video_id: v.id,
        title: v.title,
        youtube_url: v.url,
        order_index: v.order_index || 0
      }));

      return {
        id: parseInt(album.discogs_release_id), // For compatibility with existing types.ts
        discogs_release_id: album.discogs_release_id,
        artist: album.artist,
        title: album.title,
        label: album.label,
        catalog_number: album.catalog_number,
        format: album.format,
        country: album.country,
        released_year: album.released_year,
        image_url: album.cover_image_url, // Mapping to existing type
        release_url: album.resource_url, // Mapping to existing type
        price_low: album.price_low,
        price_median: album.price_median,
        price_high: album.price_high,
        created_at: album.created_at,
        updated_at: album.updated_at,
        tracklist: tracks,
        youtube_videos: youtubeVideos,
        collection_items: collectionItems,
        user_interactions: interactions,
        genres: genres.map(g => g.name),
        styles: styles.map(s => s.name),
        // Calculate derived fields
        have_count: 0, // TODO: Store this?
        want_count: 0, // TODO: Store this?
        avg_rating: 0, // TODO: Store this?
        ratings_count: 0, // TODO: Store this?
        last_sold_date: null, // TODO: Store this?
      };
    }));

    return enrichedAlbums;
  }

  async saveAlbum(album: Album) {
    const db = await this.connect();
    
    try {
      // 1. Upsert Album
      await db.execute(
        `INSERT INTO albums (
          discogs_release_id, artist, title, label, catalog_number, format, country, released_year, cover_image_url, resource_url, price_low, price_median, price_high
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT(discogs_release_id) DO UPDATE SET
          artist=excluded.artist, title=excluded.title, updated_at=CURRENT_TIMESTAMP`,
        [
          album.discogs_release_id, album.artist, album.title, album.label, album.catalog_number, album.format, album.country, album.released_year, album.image_url, album.release_url, album.price_low, album.price_median, album.price_high
        ]
      );

      const albumId = album.discogs_release_id;

      // 2. Save Tracks
      if (album.tracklist && album.tracklist.length > 0) {
        await db.execute('DELETE FROM tracks WHERE album_id = ?', [albumId]);
        for (const track of album.tracklist) {
          await db.execute(
            'INSERT INTO tracks (album_id, position, title, duration, side) VALUES ($1, $2, $3, $4, $5)',
            [albumId, track.position, track.title, track.duration, track.side]
          );
        }
      }

      // 3. Save Videos
      if (album.youtube_videos && album.youtube_videos.length > 0) {
        await db.execute('DELETE FROM album_videos WHERE album_id = ?', [albumId]);
        for (let i = 0; i < album.youtube_videos.length; i++) {
          const video = album.youtube_videos[i];
          // Insert video if not exists
          await db.execute(
            'INSERT INTO youtube_videos (id, title, url) VALUES ($1, $2, $3) ON CONFLICT(id) DO NOTHING',
            [video.youtube_video_id, video.title, video.youtube_url]
          );
          
          // Link - Use INSERT OR REPLACE or just INSERT with ON CONFLICT IGNORE to avoid unique constraint error
          // The previous error was "UNIQUE constraint failed: album_videos.album_id, album_videos.video_id"
          // This happens if we try to insert the same video for the same album twice (e.g. if data has duplicates)
          await db.execute(
            'INSERT OR REPLACE INTO album_videos (album_id, video_id, order_index) VALUES ($1, $2, $3)',
            [albumId, video.youtube_video_id, i]
          );
        }
      }

      // 4. Save Genres & Styles
      if (album.genres) {
        await db.execute('DELETE FROM album_genres WHERE album_id = ?', [albumId]);
        for (const genreName of album.genres) {
          await db.execute('INSERT INTO genres (name) VALUES ($1) ON CONFLICT(name) DO NOTHING', [genreName]);
          const genre = await db.select<any[]>('SELECT id FROM genres WHERE name = ?', [genreName]);
          if (genre.length > 0) {
            await db.execute('INSERT OR IGNORE INTO album_genres (album_id, genre_id) VALUES ($1, $2)', [albumId, genre[0].id]);
          }
        }
      }
      
      if (album.styles) {
        await db.execute('DELETE FROM album_styles WHERE album_id = ?', [albumId]);
        for (const styleName of album.styles) {
          await db.execute('INSERT INTO styles (name) VALUES ($1) ON CONFLICT(name) DO NOTHING', [styleName]);
          const style = await db.select<any[]>('SELECT id FROM styles WHERE name = ?', [styleName]);
          if (style.length > 0) {
            await db.execute('INSERT OR IGNORE INTO album_styles (album_id, style_id) VALUES ($1, $2)', [albumId, style[0].id]);
          }
        }
      }

      // 5. Save Collection Items (Sellers)
      if (album.collection_items && album.collection_items.length > 0) {
          await db.execute('DELETE FROM collection_items WHERE album_id = ?', [albumId]);
          for (const item of album.collection_items) {
              await db.execute(
                  `INSERT INTO collection_items 
                  (album_id, collection_id, price, condition, notes, is_available, is_new) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                  [
                      albumId, 
                      item.collection_id, 
                      item.seller_price, 
                      item.seller_condition, 
                      item.seller_notes, 
                      item.is_available,
                      item.is_new
                  ]
              );
          }
      }

      // 6. Save User Interactions
      if (album.user_interactions && album.user_interactions.length > 0) {
          await db.execute('DELETE FROM user_interactions WHERE album_id = ?', [albumId]);
          for (const interaction of album.user_interactions) {
              await db.execute(
                  `INSERT INTO user_interactions 
                  (album_id, interaction_type, video_id, created_at) 
                  VALUES ($1, $2, $3, $4)`,
                  [
                      albumId, 
                      interaction.interaction_type, 
                      null, // TODO: Handle video specific interactions if we have video IDs in interaction object
                      interaction.created_at
                  ]
              );
          }
      }

      return true;
    } catch (error) {
      console.error('Failed to save album:', error);
      throw error;
    }
  }
  
  async toggleLike(albumId: string, isLiked: boolean) {
    const db = await this.connect();
    if (isLiked) {
        await db.execute('INSERT INTO user_interactions (album_id, interaction_type) VALUES ($1, "liked")', [albumId]);
    } else {
        await db.execute('DELETE FROM user_interactions WHERE album_id = $1 AND interaction_type = "liked" AND video_id IS NULL', [albumId]);
    }
  }

  // Helper to clear DB (for development)
  async clearDatabase() {
    const db = await this.connect();
    await db.execute('DELETE FROM album_styles');
    await db.execute('DELETE FROM album_genres');
    await db.execute('DELETE FROM tracks');
    await db.execute('DELETE FROM album_videos');
    await db.execute('DELETE FROM collection_items');
    await db.execute('DELETE FROM user_interactions');
    await db.execute('DELETE FROM albums');
  }
}

export const dbService = new DatabaseService();
