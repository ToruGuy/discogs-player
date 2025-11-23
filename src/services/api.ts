import type { Album, CollectionItem, YoutubeVideo } from "@/types";
import { MOCK_ALBUMS } from "@/lib/mockData";

// Simulating a database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MockApiService {
  private albums: Album[] = [...MOCK_ALBUMS];
  private likedAlbumIds: Set<number> = new Set();
  // Track video-level interactions: key = "albumId:videoIndex", value = 'liked' | 'disliked'
  private videoInteractions: Map<string, 'liked' | 'disliked'> = new Map();

  constructor() {
    // Initialize some liked albums from mock data interactions
    this.albums.forEach(album => {
      if (album.user_interactions?.some(i => i.interaction_type === 'liked' && i.video_index === undefined && i.track_index === undefined)) {
        this.likedAlbumIds.add(album.id);
      }
      // Initialize video-level interactions from mock data
      album.user_interactions?.forEach(interaction => {
        // Use video_index if available, otherwise track_index (for backwards compatibility)
        const videoIndex = interaction.video_index !== undefined 
          ? interaction.video_index 
          : interaction.track_index;
          
        if (videoIndex !== undefined && 
            (interaction.interaction_type === 'liked' || interaction.interaction_type === 'disliked')) {
          const key = `${album.id}:${videoIndex}`;
          this.videoInteractions.set(key, interaction.interaction_type);
        }
      });
    });
  }

  async getAlbums(): Promise<Album[]> {
    await delay(300);
    // Return albums with up-to-date liked status
    return this.albums.map(album => {
      const interactions: any[] = [];
      
      // Add album-level liked interaction if exists
      if (this.likedAlbumIds.has(album.id)) {
        interactions.push({ interaction_type: 'liked', created_at: new Date().toISOString() });
      }
      
      // Add video-level interactions
      album.youtube_videos?.forEach((_, videoIndex) => {
        const key = `${album.id}:${videoIndex}`;
        const interactionType = this.videoInteractions.get(key);
        if (interactionType) {
          interactions.push({
            interaction_type: interactionType,
            video_index: videoIndex,
            created_at: new Date().toISOString()
          });
        }
      });
      
      return {
        ...album,
        user_interactions: interactions
      };
    });
  }

  async getAlbum(id: number): Promise<Album | undefined> {
    await delay(100);
    const album = this.albums.find((a) => a.id === id);
    if (!album) return undefined;
    
    const interactions: any[] = [];
    
    // Add album-level liked interaction if exists
    if (this.likedAlbumIds.has(album.id)) {
      interactions.push({ interaction_type: 'liked', created_at: new Date().toISOString() });
    }
    
    // Add video-level interactions
    album.youtube_videos?.forEach((_, videoIndex) => {
      const key = `${album.id}:${videoIndex}`;
      const interactionType = this.videoInteractions.get(key);
      if (interactionType) {
        interactions.push({
          interaction_type: interactionType,
          video_index: videoIndex,
          created_at: new Date().toISOString()
        });
      }
    });
    
    return {
      ...album,
      user_interactions: interactions
    };
  }

  async toggleLike(albumId: number): Promise<boolean> {
    await delay(100);
    if (this.likedAlbumIds.has(albumId)) {
      this.likedAlbumIds.delete(albumId);
      return false; // Unliked
    } else {
      this.likedAlbumIds.add(albumId);
      return true; // Liked
    }
  }

  async toggleVideoLike(albumId: number, videoIndex: number, action: 'like' | 'dislike'): Promise<'liked' | 'disliked' | null> {
    await delay(100);
    const key = `${albumId}:${videoIndex}`;
    const currentInteraction = this.videoInteractions.get(key);
    
    // If clicking the same action, remove it (toggle off)
    if (currentInteraction === action + 'd') {
      this.videoInteractions.delete(key);
      return null; // Removed
    }
    
    // Otherwise, set the new interaction
    const newInteraction = action + 'd' as 'liked' | 'disliked';
    this.videoInteractions.set(key, newInteraction);
    return newInteraction;
  }

  async scrapeUrl(url: string): Promise<{ success: boolean; message: string; jobId?: string }> {
    await delay(1500); // Simulate initial check
    if (url.includes("discogs.com")) {
      return { success: true, message: "Scraping started", jobId: "job_" + Date.now() };
    }
    return { success: false, message: "Invalid Discogs URL" };
  }
  
  // Mock method to get recent jobs
  async getScrapeJobs() {
    await delay(200);
    return [
        { id: "job_123", source: "Hard Wax Berlin", status: "completed", items_found: 50, created_at: "2025-11-23T10:00:00Z" },
        { id: "job_124", source: "Phonica Records", status: "failed", items_found: 0, created_at: "2025-11-22T14:30:00Z" }
    ];
  }
}

export const api = new MockApiService();

