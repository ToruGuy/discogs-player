import { useMemo } from "react";
import { useData } from "@/context/DataContext";
import { AlbumGrid } from "@/components/album/AlbumGrid";

export function LikedView() {
  const { albums, isLoading } = useData();

  const likedAlbums = useMemo(() => {
      return albums.filter(album => 
          album.user_interactions?.some(i => 
              (i.interaction_type === 'liked' || i.interaction_type === 'disliked') && 
              i.video_index !== undefined
          )
      );
  }, [albums]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">The Bag</h1>
        <span className="text-muted-foreground text-sm">{likedAlbums.length} items</span>
      </div>

      <AlbumGrid 
        albums={likedAlbums} 
        isLoading={isLoading} 
        emptyMessage="Your bag is empty. Go dig some records!" 
      />
    </div>
  );
}
