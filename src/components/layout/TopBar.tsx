import { Play, Pause, SkipBack, SkipForward, ThumbsUp, ThumbsDown, Plus, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ImportDialog } from "@/components/ImportDialog";
import { usePlayer } from "@/context/PlayerContext";
import { useData } from "@/context/DataContext";

export function TopBar() {
  const { 
      currentAlbum, 
      currentTrackIndex,
      isPlaying, 
      togglePlay, 
      nextTrack, 
      prevTrack, 
      volume, 
      setVolume,
      isPlayerOpen,
      togglePlayerOverlay,
      queue,
      queueIndex,
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

  return (
    <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 grid grid-cols-3 items-center px-4 select-none drag-region">
      
      {/* Left: App Title & Track Info */}
      <div className="flex items-center justify-start gap-8 pr-6 relative min-w-0">
        <div className="font-bold text-xl tracking-tight shrink-0 hidden xl:block">Discogs Player</div>
        
        {albumToUse && (
           <div className="flex items-center gap-3 overflow-hidden opacity-100 transition-opacity text-left">
                <div className="h-10 w-10 bg-muted rounded-md border border-border/50 shrink-0 overflow-hidden">
                    <img src={albumToUse.image_url} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden min-w-0">
                    <span className="text-sm font-medium truncate" title={currentVideo?.title || albumToUse.title}>
                        {currentVideo?.title || albumToUse.title}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {albumToUse.artist} • {albumToUse.title}
                    </span>
                </div>
           </div>
        )}
      </div>

      {/* Center: Transport Controls (Always Centered) */}
      <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={prevTrack} disabled={!albumToUse}>
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="default" 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-md" 
            onClick={togglePlay}
            disabled={!albumToUse}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={nextTrack} disabled={!albumToUse}>
            <SkipForward className="h-5 w-5" />
          </Button>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center justify-end gap-4 pl-6 min-w-0">
        
        <div className="flex items-center gap-2 lg:gap-4">
            {/* Feedback (Moved to right) */}
            <div className="flex items-center gap-1">
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

            {/* Volume */}
            <div className="w-24 hidden lg:block group">
            <Slider 
                value={[volume]} 
                onValueChange={(val) => setVolume(val[0])} 
                max={100} 
                step={1} 
                className="w-full" 
                />
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
                className="h-9 w-9"
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

        <div className="flex items-center gap-1">
            <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />
            
            {/* Extra Actions */}
            <ImportDialog 
              trigger={
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Plus className="h-4 w-4" />
                </Button>
              }
            />
             <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hidden md:flex">
              <Heart className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}
