import React, { createContext, useContext, useState, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  progress: number;
  duration: number;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (time: number) => void;
  seekRequest: number | null;
  isSeeking: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekRequest, setSeekRequest] = useState<number | null>(null);
  const [isSeeking, setIsSeeking] = useState(false);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const seekTo = useCallback((time: number) => {
    setSeekRequest(time);
    setProgress(time); // Optimistic update
    setIsSeeking(true);
    
    // Reset seeking state after a short delay to allow player to catch up
    setTimeout(() => {
      setIsSeeking(false);
    }, 1000);
  }, []);

  return (
    <AudioContext.Provider value={{
      isPlaying,
      setIsPlaying,
      togglePlay,
      progress,
      duration,
      setProgress,
      setDuration,
      seekTo,
      seekRequest,
      isSeeking
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within a AudioProvider');
  }
  return context;
}
