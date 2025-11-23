import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Album } from '@/types';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface DataContextType {
  albums: Album[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  toggleLike: (id: number) => Promise<void>;
  toggleVideoLike: (albumId: number, videoIndex: number, action: 'like' | 'dislike') => Promise<void>;
  scrapeUrl: (url: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getAlbums();
      setAlbums(data);
    } catch (error) {
      console.error("Failed to fetch albums", error);
      toast.error("Failed to load collection");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleLike = async (id: number) => {
    try {
      const isNowLiked = await api.toggleLike(id);
      
      // Optimistic update
      setAlbums(prev => prev.map(album => {
        if (album.id === id) {
             // Create a new interaction list
             const interactions = album.user_interactions ? [...album.user_interactions] : [];
             
             if (isNowLiked) {
                 interactions.push({ 
                     interaction_type: 'liked', 
                     created_at: new Date().toISOString() 
                 });
                 toast.success("Added to Bag");
             } else {
                 const idx = interactions.findIndex(i => i.interaction_type === 'liked' && i.video_index === undefined);
                 if (idx > -1) interactions.splice(idx, 1);
                 toast.info("Removed from Bag");
             }
             
             return { ...album, user_interactions: interactions };
        }
        return album;
      }));

    } catch (error) {
      console.error("Like toggle failed", error);
      toast.error("Action failed");
    }
  };

  const toggleVideoLike = async (albumId: number, videoIndex: number, action: 'like' | 'dislike') => {
    try {
      const result = await api.toggleVideoLike(albumId, videoIndex, action);
      
      // Optimistic update
      setAlbums(prev => prev.map(album => {
        if (album.id === albumId) {
          const interactions = album.user_interactions ? [...album.user_interactions] : [];
          
          // Remove existing like/dislike for this video
          const existingIdx = interactions.findIndex(
            i => i.video_index === videoIndex && 
            (i.interaction_type === 'liked' || i.interaction_type === 'disliked')
          );
          
          if (existingIdx > -1) {
            interactions.splice(existingIdx, 1);
          }
          
          // Add new interaction if not removed
          if (result) {
            interactions.push({
              interaction_type: result,
              video_index: videoIndex,
              created_at: new Date().toISOString()
            });
            toast.success(action === 'like' ? "Track liked" : "Track disliked");
          } else {
            toast.info("Removed");
          }
          
          return { ...album, user_interactions: interactions };
        }
        return album;
      }));
    } catch (error) {
      console.error("Video like toggle failed", error);
      toast.error("Action failed");
    }
  };

  const scrapeUrl = async (url: string) => {
      try {
          const result = await api.scrapeUrl(url);
          if (result.success) {
              toast.success(result.message);
              // In a real app, we might poll for status or wait for an event
          } else {
              toast.error(result.message);
          }
      } catch (error) {
          toast.error("Scraping failed to start");
      }
  };

  return (
    <DataContext.Provider value={{
      albums,
      isLoading,
      refresh,
      toggleLike,
      toggleVideoLike,
      scrapeUrl
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

