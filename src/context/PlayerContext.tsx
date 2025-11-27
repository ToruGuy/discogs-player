import React from 'react';
import { AudioProvider, useAudio } from './AudioContext';
import { QueueProvider, useQueue } from './QueueContext';
import { PlayerUIProvider, usePlayerUI } from './PlayerUIContext';

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <QueueProvider>
        <PlayerUIProvider>
          {children}
        </PlayerUIProvider>
      </QueueProvider>
    </AudioProvider>
  );
}

export function usePlayer() {
  const audio = useAudio();
  const queue = useQueue();
  const ui = usePlayerUI();

  return {
    ...audio,
    ...queue,
    ...ui
  };
}
