import { useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { YoutubePlayer } from './YoutubePlayer';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Trash2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PlayerOverlay() {
  const { 
    isPlayerOpen, 
    togglePlayerOverlay, 
    queue, 
    removeFromQueue, 
    clearQueue,
    queueIndex,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    jumpToQueueIndex,
    currentAlbum
  } = usePlayer();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextTrack();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevTrack();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextTrack, prevTrack, togglePlay]);

  return (
    <>
      {/* Overlay Backdrop */}
      {isPlayerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={togglePlayerOverlay}
        />
      )}

      {/* Slide Down Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-lg transition-transform duration-300 ease-in-out",
          isPlayerOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col h-[600px] max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Now Playing</h2>
              {currentAlbum && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="truncate max-w-[200px]">{currentAlbum.artist}</span>
                  <span>•</span>
                  <span className="truncate max-w-[200px]">{currentAlbum.title}</span>
                </div>
              )}
              <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
                <kbd className="px-2 py-1 bg-muted rounded border">←</kbd>
                <kbd className="px-2 py-1 bg-muted rounded border">→</kbd>
                <kbd className="px-2 py-1 bg-muted rounded border">Space</kbd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Playback Controls */}
              <div className="flex items-center gap-1 mr-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTrack}
                  disabled={queue.length === 0}
                  className="h-9 w-9"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  disabled={queue.length === 0}
                  className="h-9 w-9"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTrack}
                  disabled={queue.length === 0}
                  className="h-9 w-9"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              {queue.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearQueue}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Clear Queue
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayerOverlay}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: YouTube Player */}
            <div className="w-full md:w-2/3 p-4 flex items-center justify-center bg-muted/30">
              <div className="w-full max-w-2xl aspect-video">
                <YoutubePlayer />
              </div>
            </div>

            {/* Right: Queue List */}
            <div className="hidden md:block w-1/3 border-l p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Queue ({queue.length})
                </h3>
              </div>
              <ScrollArea className="h-full">
                {queue.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p className="text-sm">Queue is empty</p>
                    <p className="text-xs mt-2">Add tracks to start building your queue</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {queue.map((item, index) => (
                      <div
                        key={`${item.albumId}-${item.videoId}-${index}`}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                          index === queueIndex
                            ? "bg-primary/10 border-primary"
                            : "bg-background hover:bg-muted/50"
                        )}
                        onClick={() => jumpToQueueIndex(index)}
                      >
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.albumImageUrl}
                            alt={item.albumTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.artist} • {item.albumTitle}
                          </p>
                        </div>
                        {index === queueIndex && (
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromQueue(index);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

