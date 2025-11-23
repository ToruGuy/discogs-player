import type { Album } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Pause, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlayer } from "@/context/PlayerContext";
import { useData } from "@/context/DataContext";
import { cn } from "@/lib/utils";
import { openExternalLink } from "@/lib/external-links";

interface AlbumCardProps {
    album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
    const { playAlbum, currentAlbum, isPlaying, togglePlay } = usePlayer();
    
    const hasYoutubeVideos = album.youtube_videos && album.youtube_videos.length > 0;
    const mainCollectionItem = album.collection_items?.[0];
    const isNew = album.created_at.includes("2025-11-03"); // logic can be improved
    const hasBeenPlayed = album.user_interactions?.some(i => i.interaction_type === 'played');
    
    // Count liked and disliked tracks
    const likedCount = album.user_interactions?.filter(
        i => i.interaction_type === 'liked' && i.video_index !== undefined
    ).length || 0;
    const dislikedCount = album.user_interactions?.filter(
        i => i.interaction_type === 'disliked' && i.video_index !== undefined
    ).length || 0;
    
    const isCurrentAlbum = currentAlbum?.id === album.id;

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isCurrentAlbum) {
            togglePlay();
        } else {
            playAlbum(album);
        }
    };

    const handleExternalLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openExternalLink(album.release_url);
    };

    return (
    <Card className={cn("group relative border-none bg-transparent shadow-none transition-transform duration-200", isCurrentAlbum ? "scale-105" : "hover:scale-105")}>
        <CardContent className="p-0 relative aspect-square overflow-hidden rounded-md bg-muted">
        <img 
            src={album.image_url} 
            alt={album.title}
            className="object-cover w-full h-full"
            loading="lazy"
        />
        
        {/* Hover Overlay / Active State */}
        <div className={cn("absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-4", 
            isCurrentAlbum ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
            <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full h-12 w-12"
                disabled={!hasYoutubeVideos}
                onClick={handlePlayClick}
            >
                {isCurrentAlbum && isPlaying ? <Pause className="h-6 w-6 ml-1" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>
            <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full h-10 w-10"
                onClick={handleExternalLink}
            >
                <ExternalLink className="h-4 w-4" />
            </Button>
        </div>

            {/* Status Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
                <Badge className="bg-primary text-primary-foreground shadow-lg">New</Badge>
            )}
            {hasBeenPlayed && !isCurrentAlbum && (
                <Badge variant="secondary" className="shadow-lg">Played</Badge>
            )}
            {isCurrentAlbum && (
                 <Badge variant="default" className="shadow-lg animate-pulse">Playing</Badge>
            )}
            {!hasYoutubeVideos && (
                <Badge variant="destructive" className="shadow-lg text-[10px]">No Audio</Badge>
            )}
            </div>

            {/* Collection Badge */}
            {mainCollectionItem && (
            <Badge variant="outline" className="absolute bottom-2 right-2 bg-background/80 backdrop-blur text-[10px]">
                {mainCollectionItem.seller_condition || "VG"}
            </Badge>
            )}
        </CardContent>
        
        <CardFooter className="p-2 flex flex-col items-start gap-1">
        <Link to={`/now-playing/${album.id}`} className="font-semibold text-sm truncate w-full hover:underline">
            {album.title}
        </Link>
        <div className="flex justify-between w-full items-center">
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">{album.artist}</span>
            <div className="flex flex-col items-end gap-0.5">
                {likedCount > 0 && (
                    <div className="flex items-center gap-1 text-primary text-xs">
                        <ThumbsUp className="h-3 w-3" />
                        <span className="font-medium">x{likedCount}</span>
                    </div>
                )}
                {dislikedCount > 0 && (
                    <div className="flex items-center gap-1 text-destructive text-xs">
                        <ThumbsDown className="h-3 w-3" />
                        <span className="font-medium">x{dislikedCount}</span>
                    </div>
                )}
            </div>
        </div>
        
        {/* Styles */}
        {album.styles && album.styles.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-1">
            {album.styles.slice(0, 2).map((style, idx) => (
                <Badge key={idx} variant="outline" className="text-[9px] px-1 py-0 h-4">
                {style}
                </Badge>
            ))}
            </div>
        )}

        <div className="flex justify-between w-full text-xs text-muted-foreground mt-1">
            <span>{album.price_median ? `€${album.price_median}` : "N/A"}</span>
            <span>{album.released_year || "Unknown"}</span>
        </div>

        {/* Multiple collection items indicator */}
        {album.collection_items && album.collection_items.length > 1 && (
            <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 mt-1 w-fit">
            {album.collection_items.length} listings
            </Badge>
        )}
        
        </CardFooter>
    </Card>
    );
}

