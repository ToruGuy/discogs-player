import { Play, Pause, SkipBack, SkipForward, ThumbsUp, ThumbsDown, Plus, Heart } from "lucide-react";
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
      setVolume
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
    <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 justify-between select-none drag-region">
      {/* Left: App Title / Home */}
      <div className="flex items-center gap-2 w-64">
        <div className="font-bold text-xl tracking-tight">Discogs Player</div>
      </div>

      {/* Center: Player Controls (The Deck) */}
      <div className="flex-1 flex items-center justify-center gap-6">
        
        {/* Track Info (Mini) */}
        <div className="flex items-center gap-3 w-64 justify-end text-right hidden md:flex opacity-100 transition-opacity">
           {albumToUse ? (
               <>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{albumToUse.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{albumToUse.artist}</span>
                </div>
                <div className="h-10 w-10 bg-muted rounded-md border border-border/50 overflow-hidden">
                    <img src={albumToUse.image_url} alt="Cover" className="w-full h-full object-cover" />
                </div>
               </>
           ) : (
               <span className="text-xs text-muted-foreground">Select a record...</span>
           )}
        </div>

        {/* Transport */}
        <div className="flex items-center gap-2">
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

        {/* Feedback */}
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

        {/* Volume Scrubber */}
        <div className="w-24 hidden lg:block group">
           <Slider 
              value={[volume]} 
              onValueChange={(val) => setVolume(val[0])} 
              max={100} 
              step={1} 
              className="w-full" 
            />
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2 w-64 justify-end">
        <ImportDialog 
          trigger={
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
        <Separator orientation="vertical" className="h-6 mx-1" />
         <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
