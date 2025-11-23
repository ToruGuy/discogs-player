import { MOCK_ALBUMS } from "@/lib/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trash2, Share2, ClipboardCopy, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function LikedView() {
  // Filter albums that have been liked
  const likedAlbums = MOCK_ALBUMS.filter(album => 
    album.user_interactions?.some(i => i.interaction_type === 'liked')
  );

  // If no liked albums, show the first 5 as demo
  const displayAlbums = likedAlbums.length > 0 ? likedAlbums : MOCK_ALBUMS.slice(0, 5);

  const handleExportLinks = () => {
    const youtubeLinks = displayAlbums
      .flatMap(album => album.youtube_videos?.map(v => v.youtube_url) || [])
      .join('\n');
    
    const discogsLinks = displayAlbums
      .map(album => album.release_url)
      .join('\n');

    const allLinks = `YOUTUBE LINKS:\n${youtubeLinks}\n\nDISCOGS LINKS:\n${discogsLinks}`;
    
    navigator.clipboard.writeText(allLinks);
    alert('Links copied to clipboard!');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">The Bag</h1>
           <p className="text-muted-foreground text-sm">
             {likedAlbums.length > 0 ? `${likedAlbums.length} items saved for later` : 'Demo: Showing 5 items'}
           </p>
        </div>
        
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExportLinks}>
                <ClipboardCopy className="h-4 w-4" />
                Copy All Links
            </Button>
            <Button variant="default" className="gap-2">
                <Download className="h-4 w-4" />
                Export List
            </Button>
        </div>
      </div>

      {displayAlbums.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="text-6xl mb-4">💿</div>
          <h3 className="text-xl font-semibold mb-2">Your bag is empty</h3>
          <p className="text-muted-foreground mb-6">Start liking tracks to build your collection</p>
          <Button asChild>
            <Link to="/">Browse Records</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
          {displayAlbums.map((album) => {
            const hasYoutubeVideos = album.youtube_videos && album.youtube_videos.length > 0;
            const likedInteraction = album.user_interactions?.find(i => i.interaction_type === 'liked');
            
            return (
              <Card key={album.id} className="group relative border-none bg-transparent shadow-none">
                <CardContent className="p-0 relative aspect-square overflow-hidden rounded-md bg-muted">
                  <img 
                    src={album.image_url} 
                    alt={album.title}
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <Button size="icon" variant="secondary" className="rounded-full h-12 w-12" disabled={!hasYoutubeVideos}>
                        <Play className="h-6 w-6 ml-1" />
                     </Button>
                  </div>

                  {/* Status Badges */}
                  {likedInteraction && (
                    <Badge variant="default" className="absolute top-2 left-2 text-[10px]">
                      Liked {new Date(likedInteraction.created_at).toLocaleDateString()}
                    </Badge>
                  )}
                  
                  {!hasYoutubeVideos && (
                    <Badge variant="destructive" className="absolute top-2 right-2 text-[10px]">
                      No Audio
                    </Badge>
                  )}
                </CardContent>
                
                <CardFooter className="p-2 flex flex-col items-start gap-1">
                  <Link to="/now-playing" state={{ albumId: album.id }} className="font-semibold text-sm truncate w-full hover:underline">
                    {album.title}
                  </Link>
                  <div className="flex justify-between w-full items-center">
                     <span className="text-xs text-muted-foreground truncate max-w-[120px]">{album.artist}</span>
                     <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3 w-3" />
                     </Button>
                  </div>
                  
                  {/* YouTube Video Count */}
                  {hasYoutubeVideos && (
                    <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 mt-1">
                      {album.youtube_videos.length} audio sources
                    </Badge>
                  )}
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {album.price_median ? `€${album.price_median}` : "N/A"} • {album.released_year || "Unknown"}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
