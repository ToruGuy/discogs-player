import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/context/PlayerContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { X, Trash2, Play, Pause, SkipBack, SkipForward, ThumbsUp, ThumbsDown, Disc, Album, Youtube, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { openExternalLink } from '@/lib/external-links';

export function PlayerOverlay() {
  const navigate = useNavigate();
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
    currentAlbum,
    currentTrackIndex,
    currentVideo
  } = usePlayer();

  const { albums, toggleVideoLike } = useData();

  // Get the latest album data from DataContext to ensure we have up-to-date interactions
  const latestAlbum = currentAlbum ? albums.find(a => a.id === currentAlbum.id) : null;
  const albumToUse = latestAlbum || currentAlbum;

  const videoInteraction = albumToUse?.user_interactions?.find(
    i => i.video_index === currentTrackIndex &&
    (i.interaction_type === 'liked' || i.interaction_type === 'disliked')
  );
  const isLiked = videoInteraction?.interaction_type === 'liked';
  const isDisliked = videoInteraction?.interaction_type === 'disliked';

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
              {/* Feedback Controls */}
              <div className="flex items-center gap-1 mr-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 transition-colors ${isDisliked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                  disabled={!albumToUse || currentTrackIndex === undefined}
                  onClick={() => {
                    if (albumToUse && currentTrackIndex !== undefined) {
                      toggleVideoLike(albumToUse.id, currentTrackIndex, 'dislike');
                    }
                  }}
                >
                  <ThumbsDown className={`h-4 w-4 transition-all ${isDisliked ? 'fill-current' : ''}`} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 transition-colors ${isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  disabled={!albumToUse || currentTrackIndex === undefined}
                  onClick={() => {
                    if (albumToUse && currentTrackIndex !== undefined) {
                      toggleVideoLike(albumToUse.id, currentTrackIndex, 'like');
                    }
                  }}
                >
                  <ThumbsUp className={`h-4 w-4 transition-all ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>

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
          <div className="flex-1 flex overflow-hidden min-w-0">
            {/* Left: Visuals (was YouTube Player) */}
            <div className="flex-1 min-w-0 p-4 flex flex-col items-center justify-center bg-muted/30 gap-4">
              <div className="w-full max-w-2xl aspect-square md:aspect-video flex items-center justify-center shadow-2xl rounded-lg overflow-hidden bg-black">
                 {currentAlbum ? (
                   <img 
                     src={currentAlbum.image_url} 
                     alt={currentAlbum.title} 
                     className="w-full h-full object-contain"
                   />
                 ) : (
                   <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <Disc className="h-12 w-12 opacity-20" />
                      <span>No Media Playing</span>
                   </div>
                 )}
              </div>
              
              {/* Action Buttons */}
              {currentAlbum && (
                <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-2xl">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      togglePlayerOverlay();
                      navigate(`/now-playing/${currentAlbum.id}`);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Album className="h-4 w-4" />
                    View Album
                  </Button>
                  
                  {currentVideo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const youtubeUrl = currentVideo.youtube_url || `https://www.youtube.com/watch?v=${currentVideo.youtube_video_id}`;
                        openExternalLink(youtubeUrl);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Youtube className="h-4 w-4" />
                      Go to YouTube
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openExternalLink(currentAlbum.release_url)}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Go to Discogs Release
                  </Button>
                </div>
              )}
            </div>

            {/* Right: Queue List */}
            <div className="hidden md:flex w-80 flex-shrink-0 border-l p-4 flex-col min-h-0">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Queue ({queueIndex + 1} / {queue.length})
                </h3>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                {queue.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p className="text-sm">Queue is empty</p>
                    <p className="text-xs mt-2">Add tracks to start building your queue</p>
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto space-y-2 pb-4 pr-1">
                    {queue.map((item, index) => (
                      <div
                        key={item.id}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
