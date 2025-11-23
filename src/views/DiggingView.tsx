import { MOCK_ALBUMS } from "@/lib/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function DiggingView() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">New Arrivals</h1>
        <div className="flex gap-2">
            <Badge variant="secondary" className="cursor-pointer">All Genres</Badge>
            <Badge variant="outline" className="cursor-pointer">Techno</Badge>
            <Badge variant="outline" className="cursor-pointer">House</Badge>
            <Badge variant="outline" className="cursor-pointer">Ambient</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
        {MOCK_ALBUMS.map((album) => {
          const hasYoutubeVideos = album.youtube_videos && album.youtube_videos.length > 0;
          const mainCollectionItem = album.collection_items?.[0];
          const isNew = album.created_at.includes("2025-11-03");
          const hasBeenPlayed = album.user_interactions?.some(i => i.interaction_type === 'played');
          const isLiked = album.user_interactions?.some(i => i.interaction_type === 'liked');
          
          return (
            <Card key={album.id} className="group relative border-none bg-transparent shadow-none hover:scale-105 transition-transform duration-200">
              <CardContent className="p-0 relative aspect-square overflow-hidden rounded-md bg-muted">
                <img 
                  src={album.image_url} 
                  alt={album.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full h-12 w-12"
                      disabled={!hasYoutubeVideos}
                   >
                      <Play className="h-6 w-6 ml-1" />
                   </Button>
                   <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full h-10 w-10"
                      asChild
                   >
                      <a href={album.release_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                   </Button>
                </div>

                 {/* Status Badges */}
                 <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isNew && (
                      <Badge className="bg-primary text-primary-foreground shadow-lg">New</Badge>
                    )}
                    {hasBeenPlayed && (
                      <Badge variant="secondary" className="shadow-lg">Played</Badge>
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
                <Link to="/now-playing" state={{ albumId: album.id }} className="font-semibold text-sm truncate w-full hover:underline">
                  {album.title}
                </Link>
                <div className="flex justify-between w-full items-center">
                   <span className="text-xs text-muted-foreground truncate max-w-[120px]">{album.artist}</span>
                   <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-6 w-6 ${isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                   >
                      <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
                   </Button>
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
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 mt-1">
                    {album.collection_items.length} listings
                  </Badge>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
