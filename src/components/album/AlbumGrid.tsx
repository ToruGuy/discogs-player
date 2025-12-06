import { useCallback, useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Album } from "@/types";
import { AlbumCard } from "./AlbumCard";
import { usePlayer } from "@/context/PlayerContext";

interface AlbumGridProps {
    albums: Album[];
    isLoading?: boolean;
    emptyMessage?: string;
}

// Grid configuration
const COLUMN_COUNTS = { sm: 2, md: 3, lg: 4, xl: 5 };

function useGridConfig() {
    // Simple responsive grid config based on window width
    if (typeof window === 'undefined') {
        return { columnCount: COLUMN_COUNTS.xl, gap: 24, rowHeight: 380 };
    }
    const width = window.innerWidth;
    const isMobile = width < 768;
    
    let columnCount: number;
    if (width >= 1280) columnCount = COLUMN_COUNTS.xl;
    else if (width >= 1024) columnCount = COLUMN_COUNTS.lg;
    else if (width >= 768) columnCount = COLUMN_COUNTS.md;
    else columnCount = COLUMN_COUNTS.sm;
    
    // Responsive gap: 12px on mobile, 24px on desktop
    const gap = isMobile ? 12 : 24;
    // Responsive row height: smaller on mobile due to tighter layout
    const rowHeight = isMobile ? 320 : 380;
    
    return { columnCount, gap, rowHeight };
}

export function AlbumGrid({ albums, isLoading, emptyMessage = "No records found." }: AlbumGridProps) {
    const parentRef = useRef<HTMLDivElement>(null);
    const { columnCount, gap, rowHeight } = useGridConfig();
    
    const { 
        currentAlbum, 
        isPlaying, 
        playAlbum, 
        playAlbumNext, 
        addAlbumToQueue, 
        togglePlay 
    } = usePlayer();

    // Stable callback references for memoized children
    const handlePlay = useCallback((album: Album) => {
        playAlbum(album);
    }, [playAlbum]);

    const handlePlayNext = useCallback((album: Album) => {
        playAlbumNext(album);
    }, [playAlbumNext]);

    const handleAddToQueue = useCallback((album: Album) => {
        addAlbumToQueue(album);
    }, [addAlbumToQueue]);

    const handleTogglePlay = useCallback(() => {
        togglePlay();
    }, [togglePlay]);

    // Calculate rows for virtualization
    const rowCount = useMemo(() => Math.ceil(albums.length / columnCount), [albums.length, columnCount]);

    const virtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => rowHeight + gap,
        overscan: 2, // Render 2 extra rows above/below viewport
    });

    const virtualRows = virtualizer.getVirtualItems();
    
    if (isLoading) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">Loading crate...</div>;
    }

    if (albums.length === 0) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">{emptyMessage}</div>;
    }

    return (
        <div 
            ref={parentRef}
            className="h-full overflow-auto"
            style={{ contain: 'strict' }}
        >
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {virtualRows.map((virtualRow) => {
                    const rowStartIndex = virtualRow.index * columnCount;
                    const rowAlbums = albums.slice(rowStartIndex, rowStartIndex + columnCount);

                    return (
                        <div
                            key={virtualRow.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                                {rowAlbums.map((album) => (
                                    <AlbumCard 
                                        key={album.id} 
                                        album={album}
                                        isCurrentAlbum={currentAlbum?.id === album.id}
                                        isPlaying={isPlaying && currentAlbum?.id === album.id}
                                        onPlay={handlePlay}
                                        onPlayNext={handlePlayNext}
                                        onAddToQueue={handleAddToQueue}
                                        onTogglePlay={handleTogglePlay}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

