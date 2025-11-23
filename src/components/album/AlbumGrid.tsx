import type { Album } from "@/types";
import { AlbumCard } from "./AlbumCard";

interface AlbumGridProps {
    albums: Album[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export function AlbumGrid({ albums, isLoading, emptyMessage = "No records found." }: AlbumGridProps) {
    
    if (isLoading) {
        return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading crate...</div>;
    }

    if (albums.length === 0) {
        return <div className="flex items-center justify-center h-64 text-muted-foreground">{emptyMessage}</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    );
}

