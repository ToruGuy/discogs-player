import { useMemo } from "react";
import { useData } from "@/context/DataContext";
import { AlbumGrid } from "@/components/album/AlbumGrid";
import { FilterBar } from "@/components/filters/FilterBar";
import { useAlbumFilters } from "@/hooks/useAlbumFilters";

export function LikedView() {
  const { albums, isLoading } = useData();

  // Pre-filter to only albums with liked/disliked tracks
  const likedAlbums = useMemo(() => {
    return albums.filter(album => 
      album.user_interactions?.some(i => 
        (i.interaction_type === 'liked' || i.interaction_type === 'disliked') && 
        i.video_index !== undefined
      )
    );
  }, [albums]);

  const {
    filters,
    filteredAlbums,
    filterOptions,
    activeFilterCount,
    setSearch,
    setGenres,
    setStyles,
    setYearRange,
    setPriceRange,
    setMinRating,
    setCountries,
    setConditions,
    setHasAudio,
    setHasBeenPlayed,
    setHasLikedTracks,
    setIsNew,
    setSort,
    resetFilters,
  } = useAlbumFilters(likedAlbums, 'bag-filters');

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-3 md:px-6 pt-4 pb-2 border-b bg-background/80 backdrop-blur-md">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-3">The Bag</h1>
        
        <FilterBar
          filters={filters}
          filterOptions={filterOptions}
          activeFilterCount={activeFilterCount}
          totalCount={likedAlbums.length}
          filteredCount={filteredAlbums.length}
          onSearchChange={setSearch}
          onGenresChange={setGenres}
          onStylesChange={setStyles}
          onYearRangeChange={setYearRange}
          onPriceRangeChange={setPriceRange}
          onMinRatingChange={setMinRating}
          onCountriesChange={setCountries}
          onConditionsChange={setConditions}
          onHasAudioChange={setHasAudio}
          onHasBeenPlayedChange={setHasBeenPlayed}
          onHasLikedTracksChange={setHasLikedTracks}
          onIsNewChange={setIsNew}
          onSortChange={setSort}
          onReset={resetFilters}
        />
      </div>

      <div className="flex-1 min-h-0 px-3 pt-3 md:px-6 md:pt-6">
        <AlbumGrid 
          albums={filteredAlbums} 
          isLoading={isLoading} 
          emptyMessage="Your bag is empty. Go dig some records!" 
        />
      </div>
    </div>
  );
}
