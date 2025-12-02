import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Album } from '@/types';

export type SortField = 'added' | 'year' | 'price' | 'rating' | 'artist' | 'title' | 'want';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  genres: string[];
  styles: string[];
  yearRange: [number | null, number | null];
  priceRange: [number | null, number | null];
  minRating: number | null;
  countries: string[];
  conditions: string[];
  hasAudio: boolean | null;
  hasBeenPlayed: boolean | null;
  hasLikedTracks: boolean | null;
  isNew: boolean | null;
  sortField: SortField;
  sortDirection: SortDirection;
}

const defaultFilters: FilterState = {
  search: '',
  genres: [],
  styles: [],
  yearRange: [null, null],
  priceRange: [null, null],
  minRating: null,
  countries: [],
  conditions: [],
  hasAudio: null,
  hasBeenPlayed: null,
  hasLikedTracks: null,
  isNew: null,
  sortField: 'added',
  sortDirection: 'desc',
};

export interface FilterOptions {
  genres: string[];
  styles: string[];
  countries: string[];
  conditions: string[];
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
}

export function useAlbumFilters(albums: Album[], storageKey?: string) {
  const [filters, setFilters] = useState<FilterState>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          return { ...defaultFilters, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse saved filters', e);
        }
      }
    }
    return defaultFilters;
  });

  // Persist filters when they change
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(filters));
    }
  }, [filters, storageKey]);

  // Extract all available filter options from albums
  const filterOptions = useMemo<FilterOptions>(() => {
    const genres = new Set<string>();
    const styles = new Set<string>();
    const countries = new Set<string>();
    const conditions = new Set<string>();
    let yearMin = Infinity;
    let yearMax = -Infinity;
    let priceMin = Infinity;
    let priceMax = -Infinity;

    albums.forEach(album => {
      album.genres?.forEach(g => genres.add(g));
      album.styles?.forEach(s => styles.add(s));
      if (album.country) countries.add(album.country);
      
      album.collection_items?.forEach(item => {
        if (item.seller_condition) {
          // Extract short condition (VG, VG+, etc.)
          const match = item.seller_condition.match(/\(([^)]+)\)/);
          if (match) conditions.add(match[1]);
        }
      });

      if (album.released_year) {
        yearMin = Math.min(yearMin, album.released_year);
        yearMax = Math.max(yearMax, album.released_year);
      }

      if (album.price_median !== null) {
        priceMin = Math.min(priceMin, album.price_median);
        priceMax = Math.max(priceMax, album.price_median);
      }
    });

    return {
      genres: Array.from(genres).sort(),
      styles: Array.from(styles).sort(),
      countries: Array.from(countries).sort(),
      conditions: Array.from(conditions).sort(),
      yearMin: yearMin === Infinity ? 1950 : yearMin,
      yearMax: yearMax === -Infinity ? new Date().getFullYear() : yearMax,
      priceMin: priceMin === Infinity ? 0 : Math.floor(priceMin),
      priceMax: priceMax === -Infinity ? 100 : Math.ceil(priceMax),
    };
  }, [albums]);

  // Filter and sort albums
  const filteredAlbums = useMemo(() => {
    let result = albums.filter(album => {
      // Search filter (artist, title, label, catalog)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          album.artist?.toLowerCase().includes(searchLower) ||
          album.title?.toLowerCase().includes(searchLower) ||
          album.label?.toLowerCase().includes(searchLower) ||
          album.catalog_number?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Genre filter
      if (filters.genres.length > 0) {
        const hasGenre = filters.genres.some(g => album.genres?.includes(g));
        if (!hasGenre) return false;
      }

      // Style filter
      if (filters.styles.length > 0) {
        const hasStyle = filters.styles.some(s => album.styles?.includes(s));
        if (!hasStyle) return false;
      }

      // Year range filter
      if (filters.yearRange[0] !== null && album.released_year !== null) {
        if (album.released_year < filters.yearRange[0]) return false;
      }
      if (filters.yearRange[1] !== null && album.released_year !== null) {
        if (album.released_year > filters.yearRange[1]) return false;
      }

      // Price range filter
      if (filters.priceRange[0] !== null && album.price_median !== null) {
        if (album.price_median < filters.priceRange[0]) return false;
      }
      if (filters.priceRange[1] !== null && album.price_median !== null) {
        if (album.price_median > filters.priceRange[1]) return false;
      }

      // Rating filter
      if (filters.minRating !== null) {
        if (album.avg_rating < filters.minRating) return false;
      }

      // Country filter
      if (filters.countries.length > 0) {
        if (!filters.countries.includes(album.country)) return false;
      }

      // Condition filter
      if (filters.conditions.length > 0) {
        const albumConditions = album.collection_items?.map(item => {
          const match = item.seller_condition?.match(/\(([^)]+)\)/);
          return match ? match[1] : null;
        }).filter(Boolean) || [];
        
        const hasCondition = filters.conditions.some(c => albumConditions.includes(c));
        if (!hasCondition) return false;
      }

      // Has audio filter
      if (filters.hasAudio === true) {
        if (!album.youtube_videos || album.youtube_videos.length === 0) return false;
      } else if (filters.hasAudio === false) {
        if (album.youtube_videos && album.youtube_videos.length > 0) return false;
      }

      // Has been played filter
      if (filters.hasBeenPlayed === true) {
        const played = album.user_interactions?.some(i => i.interaction_type === 'played');
        if (!played) return false;
      } else if (filters.hasBeenPlayed === false) {
        const played = album.user_interactions?.some(i => i.interaction_type === 'played');
        if (played) return false;
      }

      // Has liked tracks filter
      if (filters.hasLikedTracks === true) {
        const liked = album.user_interactions?.some(
          i => i.interaction_type === 'liked' && i.video_index !== undefined
        );
        if (!liked) return false;
      } else if (filters.hasLikedTracks === false) {
        const liked = album.user_interactions?.some(
          i => i.interaction_type === 'liked' && i.video_index !== undefined
        );
        if (liked) return false;
      }

      // Is new filter (simplified - checks if added recently)
      if (filters.isNew === true) {
        // Check if created in last 7 days
        const createdDate = new Date(album.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (createdDate < weekAgo) return false;
      }

      return true;
    });

    // Sort
    result = [...result].sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortField) {
        case 'added':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'year':
          comparison = (a.released_year || 0) - (b.released_year || 0);
          break;
        case 'price':
          comparison = (a.price_median || 0) - (b.price_median || 0);
          break;
        case 'rating':
          comparison = (a.avg_rating || 0) - (b.avg_rating || 0);
          break;
        case 'artist':
          comparison = (a.artist || '').localeCompare(b.artist || '');
          break;
        case 'title':
          comparison = (a.title || '').localeCompare(b.title || '');
          break;
        case 'want':
          comparison = (a.want_count || 0) - (b.want_count || 0);
          break;
      }

      return filters.sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [albums, filters]);

  // Update helpers
  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setGenres = useCallback((genres: string[]) => {
    setFilters(prev => ({ ...prev, genres }));
  }, []);

  const setStyles = useCallback((styles: string[]) => {
    setFilters(prev => ({ ...prev, styles }));
  }, []);

  const setYearRange = useCallback((yearRange: [number | null, number | null]) => {
    setFilters(prev => ({ ...prev, yearRange }));
  }, []);

  const setPriceRange = useCallback((priceRange: [number | null, number | null]) => {
    setFilters(prev => ({ ...prev, priceRange }));
  }, []);

  const setMinRating = useCallback((minRating: number | null) => {
    setFilters(prev => ({ ...prev, minRating }));
  }, []);

  const setCountries = useCallback((countries: string[]) => {
    setFilters(prev => ({ ...prev, countries }));
  }, []);

  const setConditions = useCallback((conditions: string[]) => {
    setFilters(prev => ({ ...prev, conditions }));
  }, []);

  const setHasAudio = useCallback((hasAudio: boolean | null) => {
    setFilters(prev => ({ ...prev, hasAudio }));
  }, []);

  const setHasBeenPlayed = useCallback((hasBeenPlayed: boolean | null) => {
    setFilters(prev => ({ ...prev, hasBeenPlayed }));
  }, []);

  const setHasLikedTracks = useCallback((hasLikedTracks: boolean | null) => {
    setFilters(prev => ({ ...prev, hasLikedTracks }));
  }, []);

  const setIsNew = useCallback((isNew: boolean | null) => {
    setFilters(prev => ({ ...prev, isNew }));
  }, []);

  const setSort = useCallback((sortField: SortField, sortDirection: SortDirection) => {
    setFilters(prev => ({ ...prev, sortField, sortDirection }));
  }, []);

  const toggleSortDirection = useCallback(() => {
    setFilters(prev => ({ 
      ...prev, 
      sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc' 
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.genres.length > 0) count++;
    if (filters.styles.length > 0) count++;
    if (filters.yearRange[0] !== null || filters.yearRange[1] !== null) count++;
    if (filters.priceRange[0] !== null || filters.priceRange[1] !== null) count++;
    if (filters.minRating !== null) count++;
    if (filters.countries.length > 0) count++;
    if (filters.conditions.length > 0) count++;
    if (filters.hasAudio !== null) count++;
    if (filters.hasBeenPlayed !== null) count++;
    if (filters.hasLikedTracks !== null) count++;
    if (filters.isNew !== null) count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    filteredAlbums,
    filterOptions,
    activeFilterCount,
    // Individual setters
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
    toggleSortDirection,
    resetFilters,
  };
}

