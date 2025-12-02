import { useData } from "@/context/DataContext";
import { AlbumGrid } from "@/components/album/AlbumGrid";
import { FilterBar } from "@/components/filters/FilterBar";
import { useAlbumFilters } from "@/hooks/useAlbumFilters";

export function DiggingView() {
  const { albums, isLoading } = useData();
  
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
  } = useAlbumFilters(albums, 'digging-filters');

  return (
    <div className="min-h-full relative">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b px-6 py-2">
        <FilterBar
          filters={filters}
          filterOptions={filterOptions}
          activeFilterCount={activeFilterCount}
          totalCount={albums.length}
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

      <div className="p-6">
        <AlbumGrid albums={filteredAlbums} isLoading={isLoading} />
      </div>
    </div>
  );
}
