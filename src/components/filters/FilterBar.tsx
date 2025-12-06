import { useState } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown,
  ChevronDown,
  Check,
  Music,
  Play,
  Heart,
  Sparkles,
  Calendar,
  DollarSign,
  Star,
  Globe,
  Disc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { FilterState, FilterOptions, SortField, SortDirection } from '@/hooks/useAlbumFilters';

interface FilterBarProps {
  filters: FilterState;
  filterOptions: FilterOptions;
  activeFilterCount: number;
  totalCount: number;
  filteredCount: number;
  onSearchChange: (search: string) => void;
  onGenresChange: (genres: string[]) => void;
  onStylesChange: (styles: string[]) => void;
  onYearRangeChange: (range: [number | null, number | null]) => void;
  onPriceRangeChange: (range: [number | null, number | null]) => void;
  onMinRatingChange: (rating: number | null) => void;
  onCountriesChange: (countries: string[]) => void;
  onConditionsChange: (conditions: string[]) => void;
  onHasAudioChange: (value: boolean | null) => void;
  onHasBeenPlayedChange: (value: boolean | null) => void;
  onHasLikedTracksChange: (value: boolean | null) => void;
  onIsNewChange: (value: boolean | null) => void;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  onReset: () => void;
}

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'added', label: 'Date Added' },
  { value: 'year', label: 'Release Year' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
  { value: 'want', label: 'Wanted' },
  { value: 'artist', label: 'Artist' },
  { value: 'title', label: 'Title' },
];

// Multi-select dropdown component
function MultiSelect({
  label,
  icon: Icon,
  options,
  selected,
  onChange,
  placeholder = 'Select...',
}: {
  label: string;
  icon?: React.ElementType;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal border-dashed",
            selected.length > 0 && "border-primary/50 bg-primary/5"
          )}
        >
          {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
          <span>{label}</span>
          {selected.length > 0 && (
            <Badge variant="secondary" className="h-4 px-1 text-[10px] rounded-sm">
              {selected.length}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="p-2 border-b">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
        <div className="max-h-64 overflow-y-auto">
          <div className="p-2 space-y-1">
            {options.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2 text-center">No options available</p>
            ) : (
              options.map(option => (
                <div
                  key={option}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted/50 cursor-pointer"
                  onClick={() => toggleOption(option)}
                >
                  <Checkbox
                    id={option}
                    checked={selected.includes(option)}
                    onCheckedChange={() => toggleOption(option)}
                    className="h-3.5 w-3.5"
                  />
                  <label 
                    htmlFor={option} 
                    className="text-xs cursor-pointer flex-1 truncate"
                  >
                    {option}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
        {selected.length > 0 && (
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-7 text-xs"
              onClick={() => onChange([])}
            >
              Clear selection
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

// Range filter component
function RangeFilter({
  label,
  icon: Icon,
  min,
  max,
  value,
  onChange,
  prefix = '',
  suffix = '',
}: {
  label: string;
  icon?: React.ElementType;
  min: number;
  max: number;
  value: [number | null, number | null];
  onChange: (range: [number | null, number | null]) => void;
  prefix?: string;
  suffix?: string;
}) {
  const [open, setOpen] = useState(false);
  const [localMin, setLocalMin] = useState<string>(value[0]?.toString() || '');
  const [localMax, setLocalMax] = useState<string>(value[1]?.toString() || '');

  const hasValue = value[0] !== null || value[1] !== null;

  const handleApply = () => {
    const newMin = localMin ? Number(localMin) : null;
    const newMax = localMax ? Number(localMax) : null;
    onChange([newMin, newMax]);
    setOpen(false);
  };

  const handleClear = () => {
    setLocalMin('');
    setLocalMax('');
    onChange([null, null]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal border-dashed",
            hasValue && "border-primary/50 bg-primary/5"
          )}
        >
          {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
          <span>{label}</span>
          {hasValue && (
            <span className="text-muted-foreground">
              {prefix}{value[0] ?? min}–{value[1] ?? max}{suffix}
            </span>
          )}
          <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="start">
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label className="text-[10px] text-muted-foreground">Min</Label>
              <Input
                type="number"
                placeholder={min.toString()}
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <span className="text-muted-foreground mt-4">–</span>
            <div className="flex-1">
              <Label className="text-[10px] text-muted-foreground">Max</Label>
              <Input
                type="number"
                placeholder={max.toString()}
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 h-7 text-xs"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button 
              size="sm" 
              className="flex-1 h-7 text-xs"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Quick toggle button
function QuickToggle({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}) {
  const cycle = () => {
    if (value === null) onChange(true);
    else if (value === true) onChange(false);
    else onChange(null);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-8 gap-1.5 text-xs font-normal border-dashed",
        value === true && "border-primary bg-primary/10 text-primary",
        value === false && "border-destructive/50 bg-destructive/5 text-destructive"
      )}
      onClick={cycle}
      title={`${label}: ${value === null ? 'Any' : value ? 'Yes' : 'No'}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{label}</span>
      {value !== null && (
        <span className="text-[10px]">
          {value ? '✓' : '✗'}
        </span>
      )}
    </Button>
  );
}

// Rating filter
function RatingFilter({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ratings = [3, 3.5, 4, 4.5];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal border-dashed",
            value !== null && "border-primary/50 bg-primary/5"
          )}
        >
          <Star className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Rating</span>
          {value !== null && (
            <span className="text-muted-foreground">≥{value}</span>
          )}
          <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="start">
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted/50 cursor-pointer",
              value === null && "bg-muted"
            )}
            onClick={() => { onChange(null); setOpen(false); }}
          >
            <span className="text-xs">Any rating</span>
          </div>
          {ratings.map(r => (
            <div
              key={r}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted/50 cursor-pointer",
                value === r && "bg-muted"
              )}
              onClick={() => { onChange(r); setOpen(false); }}
            >
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span className="text-xs">{r}+ stars</span>
              {value === r && <Check className="h-3 w-3 ml-auto" />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar({
  filters,
  filterOptions,
  activeFilterCount,
  totalCount,
  filteredCount,
  onSearchChange,
  onGenresChange,
  onStylesChange,
  onYearRangeChange,
  onPriceRangeChange,
  onMinRatingChange,
  onCountriesChange,
  onConditionsChange,
  onHasAudioChange,
  onHasBeenPlayedChange,
  onHasLikedTracksChange,
  onIsNewChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="space-y-1.5 md:space-y-2">
      {/* Main filter row */}
      <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
        {/* Search */}
        <div className="relative w-full md:flex-1 md:min-w-[200px] md:max-w-[320px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artist, title, label..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 md:h-8 pl-8 pr-8 text-sm"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => onSearchChange('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Primary filters - horizontal scroll on mobile */}
        <div className="flex items-center gap-1 md:gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto scrollbar-hide">
          <MultiSelect
            label="Genre"
            icon={Music}
            options={filterOptions.genres}
            selected={filters.genres}
            onChange={onGenresChange}
          />
          <MultiSelect
            label="Style"
            icon={Disc}
            options={filterOptions.styles}
            selected={filters.styles}
            onChange={onStylesChange}
          />
          <RangeFilter
            label="Year"
            icon={Calendar}
            min={filterOptions.yearMin}
            max={filterOptions.yearMax}
            value={filters.yearRange}
            onChange={onYearRangeChange}
          />
          <RangeFilter
            label="Price"
            icon={DollarSign}
            min={filterOptions.priceMin}
            max={filterOptions.priceMax}
            value={filters.priceRange}
            onChange={onPriceRangeChange}
            prefix="€"
          />
        
          {/* More filters toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 md:gap-1.5 text-xs shrink-0"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="h-4 px-1 text-[10px] rounded-sm">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Separator orientation="vertical" className="h-6 hidden md:block shrink-0" />

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 md:gap-1.5 text-xs font-normal shrink-0">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {filters.sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuRadioGroup 
                value={filters.sortField}
                onValueChange={(value) => onSortChange(value as SortField, filters.sortDirection)}
              >
                {sortOptions.map(option => (
                  <DropdownMenuRadioItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={filters.sortDirection}
                onValueChange={(value) => onSortChange(filters.sortField, value as SortDirection)}
              >
                <DropdownMenuRadioItem value="asc" className="text-xs">
                  Ascending ↑
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc" className="text-xs">
                  Descending ↓
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Expanded filters */}
      {showMoreFilters && (
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 p-2 md:p-3 bg-muted/30 rounded-lg border border-dashed">
          <RatingFilter
            value={filters.minRating}
            onChange={onMinRatingChange}
          />
          <MultiSelect
            label="Country"
            icon={Globe}
            options={filterOptions.countries}
            selected={filters.countries}
            onChange={onCountriesChange}
          />
          <MultiSelect
            label="Condition"
            options={filterOptions.conditions}
            selected={filters.conditions}
            onChange={onConditionsChange}
          />
          
          <Separator orientation="vertical" className="h-6 hidden md:block" />

          <QuickToggle
            icon={Music}
            label="Has Audio"
            value={filters.hasAudio}
            onChange={onHasAudioChange}
          />
          <QuickToggle
            icon={Play}
            label="Played"
            value={filters.hasBeenPlayed}
            onChange={onHasBeenPlayedChange}
          />
          <QuickToggle
            icon={Heart}
            label="Liked"
            value={filters.hasLikedTracks}
            onChange={onHasLikedTracksChange}
          />
          <QuickToggle
            icon={Sparkles}
            label="New"
            value={filters.isNew}
            onChange={onIsNewChange}
          />
        </div>
      )}

      {/* Results count and clear */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {filteredCount} records
        </span>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs text-muted-foreground hover:text-foreground -mr-2"
            onClick={onReset}
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
