import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Album, YoutubeVideo, QueueItem } from '@/types';
import { convertAlbumToQueueItems, convertTrackToQueueItem } from '@/lib/queue-helpers';
import { useData } from './DataContext';

interface PlayerContextType {
  currentAlbum: Album | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  playTrack: (album: Album, trackIndex: number) => void;
  playAlbum: (album: Album) => void;
  playAlbumNext: (album: Album) => void;
  addAlbumToQueue: (album: Album) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  jumpToQueueIndex: (index: number) => void;
  setVolume: (volume: number) => void;
  currentVideo: YoutubeVideo | null;
  queue: QueueItem[];
  queueIndex: number;
  addToQueue: (items: QueueItem[]) => void;
  playNow: (items: QueueItem[]) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  isPlayerOpen: boolean;
  togglePlayerOverlay: () => void;
  updateQueueItemTitle: (index: number, newTitle: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const QUEUE_STORAGE_KEY = 'discogs-player-queue';
const QUEUE_INDEX_STORAGE_KEY = 'discogs-player-queue-index';

// Helper to insert items at specific index
function insertAt<T>(array: T[], index: number, items: T[]): T[] {
  return [...array.slice(0, index), ...items, ...array.slice(index)];
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { albums } = useData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(33);
  const [queue, setQueue] = useState<QueueItem[]>(() => {
    const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [queueIndex, setQueueIndex] = useState(() => {
    const stored = localStorage.getItem(QUEUE_INDEX_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Persist queue to localStorage
  useEffect(() => {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  }, [queue]);

  // Persist queueIndex to localStorage
  useEffect(() => {
    localStorage.setItem(QUEUE_INDEX_STORAGE_KEY, queueIndex.toString());
  }, [queueIndex]);

  // Derive currentVideo and currentAlbum from queue
  const { currentVideo, currentAlbum, currentTrackIndex } = useMemo(() => {
    if (queue.length === 0 || queueIndex < 0 || queueIndex >= queue.length) {
      return { currentVideo: null, currentAlbum: null, currentTrackIndex: 0 };
    }

    const currentItem = queue[queueIndex];
    const album = albums.find(a => a.id === currentItem.albumId);
    
    if (!album || !album.youtube_videos) {
      return { currentVideo: null, currentAlbum: null, currentTrackIndex: 0 };
    }

    const video = album.youtube_videos.find(
      v => v.youtube_video_id === currentItem.videoId
    );

    return {
      currentVideo: video || null,
      currentAlbum: album,
      currentTrackIndex: currentItem.trackIndex
    };
  }, [queue, queueIndex, albums]);

  // Case 2: Play Track (Single Interrupt)
  const playTrack = (album: Album, trackIndex: number) => {
    if (!album.youtube_videos || trackIndex < 0 || trackIndex >= album.youtube_videos.length) {
      return;
    }

    const item = convertTrackToQueueItem(album, trackIndex);
    if (!item) return;

    // If queue is empty, just add it
    if (queue.length === 0) {
      setQueue([item]);
      setQueueIndex(0);
    } else {
      // Insert AFTER current track
      const insertIndex = queueIndex + 1;
      setQueue(prev => insertAt(prev, insertIndex, [item]));
      setQueueIndex(insertIndex); // Jump to it
    }
    setIsPlaying(true);
  };

  // Case 1: Play Album (Interrupt / Play Now)
  const playAlbum = (album: Album) => {
    if (!album.youtube_videos || album.youtube_videos.length === 0) return;

    const items = convertAlbumToQueueItems(album);
    if (items.length === 0) return;

    // If queue is empty, just add it
    if (queue.length === 0) {
      setQueue(items);
      setQueueIndex(0);
    } else {
      // Insert AFTER current track
      const insertIndex = queueIndex + 1;
      setQueue(prev => insertAt(prev, insertIndex, items));
      setQueueIndex(insertIndex); // Jump to start of inserted album
    }
    setIsPlaying(true);
  };

  // Case 4: Play Next (Insert Album)
  const playAlbumNext = (album: Album) => {
    if (!album.youtube_videos || album.youtube_videos.length === 0) return;

    const items = convertAlbumToQueueItems(album);
    if (items.length === 0) return;

    // Insert AFTER current track, but DON'T jump
    const insertIndex = queueIndex + 1;
    setQueue(prev => insertAt(prev, insertIndex, items));
    // queueIndex remains same, so we finish current track first
  };

  // Case 3: Add Album to Queue (Append)
  const addAlbumToQueue = (album: Album) => {
    if (!album.youtube_videos || album.youtube_videos.length === 0) return;

    const items = convertAlbumToQueueItems(album);
    if (items.length === 0) return;

    // Append to end of queue
    setQueue(prev => [...prev, ...items]);
  };

  const togglePlay = () => {
    if (queue.length === 0 || queueIndex < 0 || queueIndex >= queue.length) return;
    setIsPlaying(!isPlaying);
  };

  // Case 5: Queue Exhaustion (Collection Auto-Play)
  const nextTrack = () => {
    if (queue.length === 0) return;

    // Normal case: Next item exists in queue
    if (queueIndex + 1 < queue.length) {
      setQueueIndex(prev => prev + 1);
      setIsPlaying(true);
      return;
    }

    // Queue Exhausted: Try to find next album in collection
    const lastItem = queue[queueIndex];
    
    // Find current album index in the main collection
    const currentAlbumIndex = albums.findIndex(a => a.id === lastItem.albumId);
    
    if (currentAlbumIndex !== -1 && currentAlbumIndex + 1 < albums.length) {
       const nextAlbum = albums[currentAlbumIndex + 1];
       const nextItems = convertAlbumToQueueItems(nextAlbum);
       
       if (nextItems.length > 0) {
         // Append next album
         setQueue(prev => [...prev, ...nextItems]);
         // Advance to it
         setQueueIndex(prev => prev + 1);
         setIsPlaying(true);
         return;
       }
    }

    // If we are here, we really ran out of music
    setIsPlaying(false);
  };

  const prevTrack = () => {
    if (queue.length === 0) return;

    if (queueIndex > 0) {
      setQueueIndex(prev => prev - 1);
      setIsPlaying(true);
    } else {
      // Already at start - restart current track
      setIsPlaying(true);
    }
  };

  const jumpToQueueIndex = (index: number) => {
    if (index < 0 || index >= queue.length) return;
    setQueueIndex(index);
    setIsPlaying(true);
  };

  const addToQueue = (items: QueueItem[]) => {
    setQueue(prev => [...prev, ...items]);
  };

  const playNow = (items: QueueItem[]) => {
    // Insert items immediately after current track
    const insertIndex = queueIndex + 1;
    setQueue(prev => insertAt(prev, insertIndex, items));
    setQueueIndex(insertIndex); // Jump to it
    setIsPlaying(true);
  };

  const removeFromQueue = (index: number) => {
    setQueue(prev => {
      const newQueue = prev.filter((_, i) => i !== index);
      // Adjust queueIndex if needed
      if (index <= queueIndex && queueIndex > 0) {
        setQueueIndex(prev => prev - 1);
      }
      return newQueue;
    });
  };

  const clearQueue = () => {
    setQueue([]);
    setQueueIndex(0);
    setIsPlaying(false);
  };

  const togglePlayerOverlay = () => {
    setIsPlayerOpen(prev => !prev);
  };

  const updateQueueItemTitle = (index: number, newTitle: string) => {
    setQueue(prev => {
      const newQueue = [...prev];
      if (newQueue[index]) {
        newQueue[index] = { ...newQueue[index], title: newTitle };
      }
      return newQueue;
    });
  };

  return (
    <PlayerContext.Provider value={{
      currentAlbum,
      currentTrackIndex,
      isPlaying,
      volume,
      playTrack,
      playAlbum,
      playAlbumNext,
      addAlbumToQueue,
      togglePlay,
      nextTrack,
      prevTrack,
      jumpToQueueIndex,
      setVolume,
      currentVideo,
      queue,
      queueIndex,
      addToQueue,
      playNow,
      removeFromQueue,
      clearQueue,
      isPlayerOpen,
      togglePlayerOverlay,
      updateQueueItemTitle
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
