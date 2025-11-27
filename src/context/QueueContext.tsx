import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Album, QueueItem, YoutubeVideo } from '@/types';
import { convertAlbumToQueueItems, convertTrackToQueueItem } from '@/lib/queue-helpers';
import { useData } from './DataContext';
import { useAudio } from './AudioContext';

interface QueueContextType {
  queue: QueueItem[];
  activeItemId: string | null;
  currentQueueItem: QueueItem | null;
  queueIndex: number; // Derived
  
  // Actions
  playTrack: (album: Album, trackIndex: number) => void;
  playAlbum: (album: Album) => void;
  playAlbumNext: (album: Album) => void;
  addAlbumToQueue: (album: Album) => void;
  addToQueue: (items: QueueItem[]) => void;
  playNow: (items: QueueItem[]) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  jumpToQueueIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  updateQueueItemTitle: (index: number, newTitle: string) => void;
  
  // Data helpers
  currentAlbum: Album | null;
  currentVideo: YoutubeVideo | null;
  currentTrackIndex: number;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

const QUEUE_STORAGE_KEY = 'discogs-player-queue';
const QUEUE_ID_STORAGE_KEY = 'discogs-player-queue-active-id';

function insertAt<T>(array: T[], index: number, items: T[]): T[] {
  return [...array.slice(0, index), ...items, ...array.slice(index)];
}

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const { albums } = useData();
  const { setIsPlaying } = useAudio();
  
  // State
  const [queue, setQueue] = useState<QueueItem[]>(() => {
    try {
      const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load queue", e);
      return [];
    }
  });
  
  const [activeItemId, setActiveItemId] = useState<string | null>(() => {
    return localStorage.getItem(QUEUE_ID_STORAGE_KEY);
  });

  // Derived State
  const queueIndex = useMemo(() => {
    if (!activeItemId) return -1;
    return queue.findIndex(item => item.id === activeItemId);
  }, [queue, activeItemId]);

  const currentQueueItem = useMemo(() => {
    if (queueIndex === -1) return null;
    return queue[queueIndex];
  }, [queue, queueIndex]);

  // Persistence
  useEffect(() => {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    if (activeItemId) {
      localStorage.setItem(QUEUE_ID_STORAGE_KEY, activeItemId);
    } else {
      localStorage.removeItem(QUEUE_ID_STORAGE_KEY);
    }
  }, [activeItemId]);

  // Derived Video/Album Data
  const { currentVideo, currentAlbum, currentTrackIndex } = useMemo(() => {
    if (!currentQueueItem) {
      return { currentVideo: null, currentAlbum: null, currentTrackIndex: 0 };
    }

    const album = albums.find(a => a.id === currentQueueItem.albumId);
    
    if (!album || !album.youtube_videos) {
      return { currentVideo: null, currentAlbum: null, currentTrackIndex: 0 };
    }

    const video = album.youtube_videos.find(
      v => v.youtube_video_id === currentQueueItem.videoId
    );

    return {
      currentVideo: video || null,
      currentAlbum: album,
      currentTrackIndex: currentQueueItem.trackIndex
    };
  }, [currentQueueItem, albums]);

  // Actions
  const playNow = useCallback((items: QueueItem[]) => {
    if (items.length === 0) return;

    if (queue.length === 0) {
      setQueue(items);
      setActiveItemId(items[0].id);
    } else {
      const insertIndex = queueIndex + 1;
      setQueue(prev => insertAt(prev, insertIndex, items));
      setActiveItemId(items[0].id);
    }
    setIsPlaying(true);
  }, [queue, queueIndex, setIsPlaying]);

  const addToQueue = useCallback((items: QueueItem[]) => {
    setQueue(prev => [...prev, ...items]);
  }, []);

  const playTrack = useCallback((album: Album, trackIndex: number) => {
    const item = convertTrackToQueueItem(album, trackIndex);
    if (!item) return;
    playNow([item]);
  }, [playNow]);

  const playAlbum = useCallback((album: Album) => {
    const items = convertAlbumToQueueItems(album);
    playNow(items);
  }, [playNow]);

  const playAlbumNext = useCallback((album: Album) => {
    const items = convertAlbumToQueueItems(album);
    if (items.length === 0) return;

    const insertIndex = queueIndex + 1;
    setQueue(prev => insertAt(prev, insertIndex, items));
  }, [queueIndex]);

  const addAlbumToQueue = useCallback((album: Album) => {
    const items = convertAlbumToQueueItems(album);
    addToQueue(items);
  }, [addToQueue]);

  const jumpToQueueIndex = useCallback((index: number) => {
    if (index < 0 || index >= queue.length) return;
    setActiveItemId(queue[index].id);
    setIsPlaying(true);
  }, [queue, setIsPlaying]);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    // Normal case
    if (queueIndex + 1 < queue.length) {
      setActiveItemId(queue[queueIndex + 1].id);
      setIsPlaying(true);
      return;
    }

    // Auto-play logic (Collection)
    const lastItem = queue[queue.length - 1];
    const currentAlbumIndex = albums.findIndex(a => a.id === lastItem.albumId);

    if (currentAlbumIndex !== -1 && currentAlbumIndex + 1 < albums.length) {
      const nextAlbum = albums[currentAlbumIndex + 1];
      const nextItems = convertAlbumToQueueItems(nextAlbum);
      
      if (nextItems.length > 0) {
        setQueue(prev => [...prev, ...nextItems]);
        setActiveItemId(nextItems[0].id);
        setIsPlaying(true);
        return;
      }
    }

    // End of line
    setIsPlaying(false);
  }, [queue, queueIndex, albums, setIsPlaying]);

  const prevTrack = useCallback(() => {
    if (queue.length === 0) return;

    if (queueIndex > 0) {
      setActiveItemId(queue[queueIndex - 1].id);
      setIsPlaying(true);
    } else {
      // Restart current (handled by Seek in AudioContext usually, but here we just ensure playing)
      setIsPlaying(true);
    }
  }, [queue, queueIndex, setIsPlaying]);

  const removeFromQueue = useCallback((index: number) => {
    setQueue(prev => {
      const itemToRemove = prev[index];
      if (!itemToRemove) return prev;

      // If removing current item
      if (itemToRemove.id === activeItemId) {
         // This logic is tricky. If we remove current, should we play next? 
         // For now, let's just let the UI handle it? 
         // If playing, maybe stop or move next?
         // "One off-by-one error and the player jumps to a random track."
         
         // If we remove the active item, activeItemId will be invalid (filtered out).
         // We should probably set activeItemId to the next one or null.
         // But this runs in setQueue updater... accessing activeItemId state is stale?
         // No, activeItemId is state.
         
         // Better: let the effect handle invalid ID? No, explicit is better.
         // Actually, if I remove the item that ID points to, queueIndex becomes -1.
         // I should probably proactively set activeItemId to the next track if possible.
         // BUT, I can't set activeItemId inside setQueue callback easily if it depends on the new queue structure.
         
         // Wait, I can set activeItemId in a separate setState call, but I need to know what to set it to.
         // If I remove index X, and X == currentIndex:
         // New active item should be old[X+1] (which becomes new[X]).
         
         return prev.filter((_, i) => i !== index);
      }
      return prev.filter((_, i) => i !== index);
    });
    
    // Helper to fix ID if we removed the active one
    // This is imperfect because of the closure over queue/activeItemId.
    // But since we use ID, other tracks remain valid.
    // Only if we remove the *active* track do we have an issue (music stops).
    // For now, let's accept that removing the playing track stops playback or requires manual intervention, 
    // OR we handle it.
    
    if (index === queueIndex) {
        // We are removing the currently playing track.
        // Logic: Move to next track?
        const nextItem = queue[index + 1];
        if (nextItem) {
            setActiveItemId(nextItem.id);
        } else {
             // Was last track
             setIsPlaying(false);
             setActiveItemId(null);
        }
    }
  }, [queue, activeItemId, queueIndex, setIsPlaying]);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setActiveItemId(null);
    setIsPlaying(false);
  }, [setIsPlaying]);

  const updateQueueItemTitle = useCallback((index: number, newTitle: string) => {
    setQueue(prev => {
      const newQueue = [...prev];
      if (newQueue[index]) {
        newQueue[index] = { ...newQueue[index], title: newTitle };
      }
      return newQueue;
    });
  }, []);

  return (
    <QueueContext.Provider value={{
      queue,
      activeItemId,
      currentQueueItem,
      queueIndex,
      playTrack,
      playAlbum,
      playAlbumNext,
      addAlbumToQueue,
      addToQueue,
      playNow,
      removeFromQueue,
      clearQueue,
      jumpToQueueIndex,
      nextTrack,
      prevTrack,
      updateQueueItemTitle,
      currentAlbum,
      currentVideo,
      currentTrackIndex
    }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}

