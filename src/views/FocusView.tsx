import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { usePlayer } from "@/context/PlayerContext";
import type { Album, YoutubeVideo } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, ExternalLink, Pause, Disc, Clock, ThumbsUp, ThumbsDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { openExternalLink } from "@/lib/external-links";

export function FocusView() {
  const { id } = useParams();
  const location = useLocation();
  const { albums, toggleVideoLike } = useData();
  const { 
    playTrack,
    playAlbum, 
    playAlbumNext,
    addAlbumToQueue,
    currentAlbum, 
    isPlaying, 
    togglePlay, 
    currentVideo 
  } = usePlayer();
  
  const [viewAlbum, setViewAlbum] = useState<Album | null>(null);

  // Resolve which album to show
  useEffect(() => {
      if (id) {
          const found = albums.find(a => a.id === Number(id));
          if (found) setViewAlbum(found);
      } else if (location.state?.albumId) {
          const found = albums.find(a => a.id === Number(location.state.albumId));
          if (found) setViewAlbum(found);
      } else if (currentAlbum) {
          setViewAlbum(currentAlbum);
      }
  }, [id, location.state, albums, currentAlbum]);

  if (!viewAlbum) {
      return <div className="flex items-center justify-center h-full text-muted-foreground">No record selected.</div>;
  }

  // Check if album has any liked/disliked tracks
  const hasLikedTracks = viewAlbum.user_interactions?.some(i => 
    (i.interaction_type === 'liked' || i.interaction_type === 'disliked') && i.video_index !== undefined
  );
  const isCurrentlyPlayingAlbum = currentAlbum?.id === viewAlbum.id;
  const hasVideos = viewAlbum.youtube_videos && viewAlbum.youtube_videos.length > 0;

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden">
       {/* Left Panel: Art & Meta */}
       <div className="w-full lg:w-[400px] p-4 md:p-6 border-b lg:border-b-0 lg:border-r bg-background/50 overflow-y-auto">
           <div className="aspect-square w-full max-w-[280px] md:max-w-none mx-auto bg-muted rounded-lg overflow-hidden mb-4 md:mb-6 shadow-xl group relative">
               <img src={viewAlbum.image_url} alt={viewAlbum.title} className="w-full h-full object-cover" />
               
                {/* Big Play Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
                    isCurrentlyPlayingAlbum && isPlaying ? "opacity-0 hover:opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                     <Button 
                        size="icon" 
                        className="h-20 w-20 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform"
                        onClick={() => isCurrentlyPlayingAlbum ? togglePlay() : (hasVideos ? playAlbum(viewAlbum) : toast.error("No audio"))}
                    >
                        {isCurrentlyPlayingAlbum && isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-2" />}
                    </Button>
                </div>
           </div>

           <div className="flex flex-col gap-2 mb-4 md:mb-6">
               <Button 
                    className="w-full h-11 md:h-12 text-base" 
                    size="lg"
                    disabled={!hasVideos}
                    onClick={() => isCurrentlyPlayingAlbum ? togglePlay() : playAlbum(viewAlbum)}
                >
                   {isCurrentlyPlayingAlbum && isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                   {isCurrentlyPlayingAlbum && isPlaying ? "Pause" : "Play Album"}
               </Button>
               <div className="flex gap-2">
                   <Button 
                        variant="outline"
                        className="flex-1 h-10" 
                        size="sm"
                        disabled={!hasVideos}
                        onClick={() => playAlbumNext(viewAlbum)}
                    >
                       <Play className="mr-1.5 h-4 w-4" />
                       <span className="hidden xs:inline">Play </span>Next
                   </Button>
                   <Button 
                        variant="outline"
                        className="flex-1 h-10" 
                        size="sm"
                        disabled={!hasVideos}
                        onClick={() => addAlbumToQueue(viewAlbum)}
                    >
                       <Plus className="mr-1.5 h-4 w-4" />
                       <span className="hidden xs:inline">Add to </span>Queue
                   </Button>
               </div>
           </div>
           
           {hasLikedTracks && (
               <div className="mb-4 p-3 rounded-md bg-primary/10 border border-primary/20">
                   <p className="text-xs text-muted-foreground">
                       This album has tracks in your bag
                   </p>
               </div>
           )}

           <div className="space-y-3 md:space-y-4">
               <div>
                   <h1 className="text-xl md:text-2xl font-bold leading-tight">{viewAlbum.title}</h1>
                   <h2 className="text-lg md:text-xl text-muted-foreground">{viewAlbum.artist}</h2>
               </div>

               {/* Genres & Styles */}
               <div className="space-y-2">
                   {viewAlbum.genres && viewAlbum.genres.length > 0 && (
                       <div className="flex flex-wrap gap-2">
                           {viewAlbum.genres.map(g => (
                               <Badge key={g} variant="default" className="text-xs">{g}</Badge>
                           ))}
                       </div>
                   )}
                   {viewAlbum.styles && viewAlbum.styles.length > 0 && (
                       <div className="flex flex-wrap gap-2">
                           {viewAlbum.styles.map(s => (
                               <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                           ))}
                       </div>
                   )}
               </div>

               <Separator />

               {/* Pressing Info Section */}
               <div>
                   <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3 flex items-center gap-2">
                       <Disc className="h-4 w-4" /> Pressing Info
                   </h3>
                   <div className="grid grid-cols-2 gap-4 text-sm">
                       <div className="min-w-0">
                           <span className="text-muted-foreground block">Label</span>
                           <span className="font-medium truncate block">{viewAlbum.label}</span>
                       </div>
                       <div className="min-w-0">
                           <span className="text-muted-foreground block">Format</span>
                           <span className="font-medium truncate block">{viewAlbum.format || "Vinyl"}</span>
                       </div>
                       <div className="min-w-0">
                           <span className="text-muted-foreground block">Released</span>
                           <span className="font-medium truncate block">{viewAlbum.released_year || "Unknown"}</span>
                       </div>
                       <div className="min-w-0">
                           <span className="text-muted-foreground block">Country</span>
                           <span className="font-medium truncate block">{viewAlbum.country}</span>
                       </div>
                       <div className="min-w-0 col-span-2">
                           <span className="text-muted-foreground block">Catalog #</span>
                           <span className="font-medium break-words">{viewAlbum.catalog_number}</span>
                       </div>
                       <div className="min-w-0 col-span-2">
                           <span className="text-muted-foreground block">Rating</span>
                           <span className="font-medium">★ {viewAlbum.avg_rating} ({viewAlbum.ratings_count})</span>
                       </div>
                   </div>
               </div>
               
               <Separator />

               {/* Market Data Section */}
               <div>
                   <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3">
                       Market Data
                   </h3>
                   <div className="space-y-3">
                       <div className="flex justify-between text-xs font-mono border rounded p-3 bg-muted/30">
                           <div className="flex flex-col items-center">
                               <span className="text-[10px] text-muted-foreground mb-1">Low</span>
                               <span>€{viewAlbum.price_low?.toFixed(2) || "--"}</span>
                           </div>
                           <div className="flex flex-col items-center border-x px-4">
                               <span className="text-[10px] text-muted-foreground mb-1">Median</span>
                               <span className="font-bold">€{viewAlbum.price_median?.toFixed(2) || "--"}</span>
                           </div>
                           <div className="flex flex-col items-center">
                               <span className="text-[10px] text-muted-foreground mb-1">High</span>
                               <span>€{viewAlbum.price_high?.toFixed(2) || "--"}</span>
                           </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 text-sm">
                           <div>
                               <span className="text-muted-foreground block text-xs">Have / Want</span>
                               <span className="font-mono font-medium">{viewAlbum.have_count} / {viewAlbum.want_count}</span>
                           </div>
                           <div>
                               <span className="text-muted-foreground block text-xs">Last Sold</span>
                               <span className="font-mono font-medium">{viewAlbum.last_sold_date || "N/A"}</span>
                           </div>
                       </div>
                   </div>
               </div>
                
                <div className="pt-4">
                     <Button 
                        variant="outline" 
                        className="w-full flex items-center gap-2"
                        onClick={() => openExternalLink(viewAlbum.release_url)}
                     >
                        View on Discogs <ExternalLink className="h-4 w-4" />
                     </Button>
                </div>
           </div>
       </div>

       {/* Right Panel: Content */}
       <div className="flex-1 bg-muted/10 flex flex-col h-full overflow-hidden">
            <ScrollArea className="flex-1 p-6 pb-safe">
                <div className="max-w-3xl mx-auto space-y-8 pb-4">
                    
                    {/* Tracks Section */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Tracklist ({viewAlbum.tracklist.length})
                        </h3>
                        <div className="space-y-1">
                            {viewAlbum.tracklist.map((track, idx) => (
                                <div 
                                    key={idx}
                                    className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors"
                                >
                                    <div className="w-8 text-center text-sm font-mono text-muted-foreground">
                                        {track.position}
                                    </div>
                                    <div className="flex-1 font-medium text-sm">
                                        {track.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                                        {track.duration && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {track.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Videos Section */}
                    {hasVideos && (
                        <div>
                            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                                <Play className="h-4 w-4" /> Videos ({viewAlbum.youtube_videos.length})
                            </h3>
                            <div className="space-y-1">
                                {viewAlbum.youtube_videos.map((video: YoutubeVideo, idx: number) => {
                                    const isPlayingVideo = isCurrentlyPlayingAlbum && currentVideo?.youtube_video_id === video.youtube_video_id;
                                    const videoInteraction = viewAlbum.user_interactions?.find(
                                        i => i.video_index === idx && (i.interaction_type === 'liked' || i.interaction_type === 'disliked')
                                    );
                                    const isLiked = videoInteraction?.interaction_type === 'liked';
                                    const isDisliked = videoInteraction?.interaction_type === 'disliked';
                                    
                                    return (
                                        <div 
                                            key={video.youtube_video_id}
                                            className={cn(
                                                "flex items-center gap-4 p-3 rounded-md transition-colors cursor-pointer hover:bg-muted",
                                                isPlayingVideo && "bg-primary/10"
                                            )}
                                            onClick={() => playTrack(viewAlbum, idx)}
                                        >
                                            <div className="w-8 text-center text-sm font-mono text-muted-foreground">
                                                {isPlayingVideo ? <Play className="h-4 w-4 animate-pulse text-primary" /> : (idx + 1)}
                                            </div>
                                            <div className="flex-1 font-medium text-sm">
                                                {video.title || `Video ${idx + 1}`}
                                            </div>
                                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleVideoLike(viewAlbum.id, idx, 'like');
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded hover:bg-muted transition-colors",
                                                        isLiked && "text-primary"
                                                    )}
                                                    title="Like track"
                                                >
                                                    <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-current")} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleVideoLike(viewAlbum.id, idx, 'dislike');
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded hover:bg-muted transition-colors",
                                                        isDisliked && "text-destructive"
                                                    )}
                                                    title="Dislike track"
                                                >
                                                    <ThumbsDown className={cn("h-4 w-4", isDisliked && "fill-current")} />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openExternalLink(video.youtube_url);
                                                    }}
                                                    className="p-2 rounded hover:bg-muted hover:text-primary transition-colors"
                                                    title="Watch on YouTube"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}


                    {/* User History Section */}
                    {viewAlbum.user_interactions && viewAlbum.user_interactions.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4">
                                Your History
                            </h3>
                            <div className="space-y-2">
                                {viewAlbum.user_interactions.map((interaction, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "capitalize font-medium",
                                                interaction.interaction_type === 'liked' && "text-primary",
                                                interaction.interaction_type === 'disliked' && "text-destructive",
                                                interaction.interaction_type === 'played' && "text-muted-foreground"
                                            )}>
                                                {interaction.interaction_type}
                                            </span>
                                            {interaction.video_index !== undefined && (
                                                <Badge variant="outline" className="text-xs">
                                                    Track {interaction.video_index + 1}
                                                </Badge>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {new Date(interaction.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Collection Items / Marketplace */}
                    {viewAlbum.collection_items && viewAlbum.collection_items.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4">
                                Available Listings ({viewAlbum.collection_items.length})
                            </h3>
                                    <div className="grid gap-3">
                                        {viewAlbum.collection_items.map((item, idx) => (
                                            <div key={idx} className="p-4 border rounded-lg bg-background hover:border-primary/50 transition-colors shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={item.is_new === 1 ? "default" : "secondary"}>
                                                            {item.is_new === 1 ? 'New Arrival' : 'In Stock'}
                                                        </Badge>
                                                        {item.seller_condition && (
                                                            <Badge variant="outline" className="font-mono text-xs">
                                                                {item.seller_condition}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-lg font-bold">€{item.seller_price?.toFixed(2) || "--"}</div>
                                                </div>
                                                {item.seller_notes && (
                                                    <p className="text-xs text-muted-foreground mb-3">{item.seller_notes}</p>
                                                )}
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="w-full gap-2"
                                                    disabled={!item.item_url}
                                                    onClick={() => openExternalLink(item.item_url)}
                                                >
                                                    <ExternalLink className="h-3 w-3" /> View on Discogs
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                        </div>
                    )}

                </div>
            </ScrollArea>
       </div>
    </div>
  );
}
