import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, ThumbsUp, ThumbsDown, Plus, Heart, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImportDialog } from "@/components/ImportDialog";
import { usePlayer } from "@/context/PlayerContext";
import { useData } from "@/context/DataContext";
import { MobileNav } from "./MobileNav";

export function TopBar() {
  const { 
      currentAlbum, 
      currentTrackIndex,
      isPlaying, 
      togglePlay, 
      nextTrack, 
      prevTrack, 
      isPlayerOpen,
      togglePlayerOverlay,
      queue,
      queueIndex,
      currentVideo,
      progress,
      duration,
      seekTo
  } = usePlayer();

  const { albums, toggleVideoLike } = useData();
  
  // Local state for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Get the latest album data from DataContext to ensure we have up-to-date interactions
  const latestAlbum = currentAlbum ? albums.find(a => a.id === currentAlbum.id) : null;
  const albumToUse = latestAlbum || currentAlbum;

  const videoInteraction = albumToUse?.user_interactions?.find(
    i => i.video_index === currentTrackIndex &&
    (i.interaction_type === 'liked' || i.interaction_type === 'disliked')
  );
  const isLiked = videoInteraction?.interaction_type === 'liked';
  const isDisliked = videoInteraction?.interaction_type === 'disliked';

  // Calculate display percentage: use drag value if dragging, otherwise use actual player progress
  const currentProgress = isDragging ? dragProgress : progress;
  const progressPercentage = duration > 0 ? (currentProgress / duration) * 100 : 0;

  const calculateProgress = (clientX: number) => {
    if (!progressBarRef.current || !duration) return 0;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    return percentage * duration;
  };

  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    setIsDragging(true);
    const newProgress = calculateProgress(e.clientX);
    setDragProgress(newProgress);
  };

  // Handle global mouse up/move for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newProgress = calculateProgress(e.clientX);
      setDragProgress(newProgress);
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      const finalProgress = calculateProgress(e.clientX);
      seekTo(finalProgress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, seekTo]);

  return (
    <div className="min-h-14 md:min-h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-2 md:px-4 select-none drag-region relative group pt-safe pb-1">
      
      {/* Left: Track Info (tap to expand) */}
      <div className="flex items-center justify-start gap-2 md:gap-8 min-w-0 flex-1">
        <div className="font-bold text-xl tracking-tight shrink-0 hidden xl:block">Discogs Player</div>
        
        {albumToUse && (
           <div 
             className="flex items-center gap-2 md:gap-3 overflow-hidden opacity-100 transition-opacity text-left cursor-pointer hover:opacity-80 active:opacity-60"
             onClick={togglePlayerOverlay}
           >
                <div className="h-9 w-9 md:h-10 md:w-10 bg-muted rounded-md border border-border/50 shrink-0 overflow-hidden">
                    <img src={albumToUse.image_url} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden min-w-0 max-w-[120px] md:max-w-none">
                    <span className="text-xs md:text-sm font-medium truncate" title={currentVideo?.title || albumToUse.title}>
                        {currentVideo?.title || albumToUse.title}
                    </span>
                    <span className="text-[10px] md:text-xs text-muted-foreground truncate hidden sm:block">
                      {albumToUse.artist}
                    </span>
                </div>
           </div>
        )}
      </div>

      {/* Center: Transport Controls (Always Centered) */}
      <div className="flex items-center justify-center gap-0.5 md:gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10" onClick={prevTrack} disabled={!albumToUse}>
            <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          
          <Button 
            variant="default" 
            size="icon" 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-md" 
            onClick={togglePlay}
            disabled={!albumToUse}
          >
            {isPlaying ? <Pause className="h-5 w-5 md:h-6 md:w-6" /> : <Play className="h-5 w-5 md:h-6 md:w-6 ml-0.5" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10" onClick={nextTrack} disabled={!albumToUse}>
            <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center justify-end gap-1 md:gap-4 min-w-0 flex-1">
        
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4">
            {/* Feedback - Hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-0.5 md:gap-1">
              <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 md:h-9 md:w-9 transition-colors ${isDisliked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
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
                  className={`h-8 w-8 md:h-9 md:w-9 transition-colors ${isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
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

            {/* Queue & Expand */}
            <div className="flex items-center">
                {queue.length > 0 && (
                    <span className="text-xs font-mono text-muted-foreground mr-2 hidden xl:block whitespace-nowrap">
                        {queueIndex + 1} / {queue.length}
                    </span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9"
                  onClick={togglePlayerOverlay}
                  disabled={!albumToUse}
                >
                  {isPlayerOpen ? (
                      <ChevronUp className="h-4 w-4" />
                  ) : (
                      <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
            </div>
        </div>

        <div className="flex items-center gap-0.5 md:gap-1">
            <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />
            
            {/* Extra Actions - Import hidden on mobile */}
            <div className="hidden md:block">
              <ImportDialog 
                trigger={
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Plus className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
            <Link to="/settings" className="hidden lg:block">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            
            {/* Mobile Navigation */}
            <MobileNav />
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        ref={progressBarRef}
        className="absolute bottom-0 left-0 right-0 h-[3px] group-hover:h-[6px] transition-all duration-200 cursor-pointer z-10"
        onMouseDown={handleSeekStart}
      >
        {/* Background Track */}
        <div className="absolute inset-0 bg-muted/20 group-hover:bg-muted/40 transition-colors" /> 
        
        {/* Progress Fill */}
        <div 
          className={`h-full bg-primary/80 group-hover:bg-primary relative ${isDragging ? 'transition-none' : 'transition-all duration-300 ease-linear'}`}
          style={{ width: `${progressPercentage}%` }}
        >
           {/* Scrubber Handle (Only visible on hover or dragging) */}
           <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-md transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        </div>
      </div>
    </div>
  );
}
