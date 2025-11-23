import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Album, YoutubeVideo } from '@/types';

interface PlayerContextType {
  currentAlbum: Album | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  playAlbum: (album: Album, trackIndex?: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  currentVideo: YoutubeVideo | null;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(33);

  const currentVideo = currentAlbum?.youtube_videos?.[currentTrackIndex] || null;

  const playAlbum = (album: Album, trackIndex = 0) => {
    if (!album.youtube_videos || album.youtube_videos.length === 0) return;
    
    setCurrentAlbum(album);
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentAlbum) return;
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!currentAlbum || !currentAlbum.youtube_videos) return;
    
    if (currentTrackIndex < currentAlbum.youtube_videos.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    } else {
        // Loop or stop? For now, let's stop or loop back to start of album?
        // Let's just loop to 0 for now
        setCurrentTrackIndex(0);
    }
  };

  const prevTrack = () => {
     if (!currentAlbum || !currentAlbum.youtube_videos) return;

     if (currentTrackIndex > 0) {
         setCurrentTrackIndex(prev => prev - 1);
     } else {
         setCurrentTrackIndex(0);
     }
  };

  return (
    <PlayerContext.Provider value={{
      currentAlbum,
      currentTrackIndex,
      isPlaying,
      volume,
      playAlbum,
      togglePlay,
      nextTrack,
      prevTrack,
      setVolume,
      currentVideo
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

