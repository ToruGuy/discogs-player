import React, { createContext, useContext, useState } from 'react';

interface PlayerUIContextType {
  isPlayerOpen: boolean;
  togglePlayerOverlay: () => void;
}

const PlayerUIContext = createContext<PlayerUIContextType | undefined>(undefined);

export function PlayerUIProvider({ children }: { children: React.ReactNode }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const togglePlayerOverlay = () => {
    setIsPlayerOpen(prev => !prev);
  };

  return (
    <PlayerUIContext.Provider value={{ isPlayerOpen, togglePlayerOverlay }}>
      {children}
    </PlayerUIContext.Provider>
  );
}

export function usePlayerUI() {
  const context = useContext(PlayerUIContext);
  if (context === undefined) {
    throw new Error('usePlayerUI must be used within a PlayerUIProvider');
  }
  return context;
}

