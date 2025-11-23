import type { Album, CollectionItem, YoutubeVideo } from "@/types";
import { MOCK_ALBUMS } from "@/lib/mockData";

// Simulating a database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MockApiService {
  private albums: Album[] = [...MOCK_ALBUMS];
  private likedAlbumIds: Set<number> = new Set();

  constructor() {
    // Initialize some liked albums from mock data interactions
    this.albums.forEach(album => {
      if (album.user_interactions?.some(i => i.interaction_type === 'liked')) {
        this.likedAlbumIds.add(album.id);
      }
    });
  }

  async getAlbums(): Promise<Album[]> {
    await delay(300);
    // Return albums with up-to-date liked status
    return this.albums.map(album => ({
      ...album,
      user_interactions: this.likedAlbumIds.has(album.id)
        ? [...(album.user_interactions || []), { interaction_type: 'liked', created_at: new Date().toISOString() } as any]
        : (album.user_interactions || []).filter(i => i.interaction_type !== 'liked')
    }));
  }

  async getAlbum(id: number): Promise<Album | undefined> {
    await delay(100);
    const album = this.albums.find((a) => a.id === id);
    if (!album) return undefined;
    
    return {
        ...album,
        user_interactions: this.likedAlbumIds.has(album.id)
          ? [...(album.user_interactions || []), { interaction_type: 'liked', created_at: new Date().toISOString() } as any]
          : (album.user_interactions || []).filter(i => i.interaction_type !== 'liked')
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

