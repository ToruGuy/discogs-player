import { useState, useMemo } from "react";
import { useData } from "@/context/DataContext";
import { AlbumGrid } from "@/components/album/AlbumGrid";
import { Badge } from "@/components/ui/badge";

export function DiggingView() {
  const { albums, isLoading } = useData();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Extract unique genres from albums
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    albums.forEach(album => {
        album.styles?.forEach(style => genres.add(style));
        // Also add main genres
        album.genres?.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort().slice(0, 10); // Limit to top 10 for UI
  }, [albums]);

  const filteredAlbums = useMemo(() => {
      if (!selectedGenre) return albums;
      return albums.filter(album => 
          album.styles?.includes(selectedGenre) || album.genres?.includes(selectedGenre)
      );
  }, [albums, selectedGenre]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold tracking-tight">New Arrivals</h1>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Badge 
                variant={selectedGenre === null ? "secondary" : "outline"} 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedGenre(null)}
            >
                All Genres
            </Badge>
            {allGenres.map(genre => (
                <Badge 
                    key={genre}
                    variant={selectedGenre === genre ? "secondary" : "outline"} 
                    className="cursor-pointer whitespace-nowrap"
                    onClick={() => setSelectedGenre(genre)}
                >
                    {genre}
                </Badge>
            ))}
        </div>
      </div>

      <AlbumGrid albums={filteredAlbums} isLoading={isLoading} />
    </div>
  );
}
