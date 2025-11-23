export type Track = {
  duration?: string;
  position: string;
  side: string;
  title: string;
  type?: string;
};

export type YoutubeVideo = {
  youtube_url: string;
  youtube_video_id: string;
  order_index: number;
  title?: string;
};

export type CollectionItem = {
  item_url: string;
  seller_price: number;
  seller_condition: string | null;
  seller_notes: string | null;
  is_new: number;
  is_available: number;
  collection_id: number;
};

export type UserInteraction = {
  interaction_type: 'played' | 'liked' | 'disliked';
  track_index?: number; // Index in tracklist array
  video_index?: number; // Deprecated, kept for backwards compatibility
  created_at: string;
};

export type Album = {
  id: number;
  discogs_release_id: string;
  artist: string;
  title: string;
  label: string;
  catalog_number: string;
  format: string;
  country: string;
  released_year: number | null;
  genres: string[];
  styles: string[] | null;
  tracklist: Track[];
  have_count: number;
  want_count: number;
  avg_rating: number;
  ratings_count: number;
  last_sold_date: string | null;
  price_low: number | null;
  price_median: number | null;
  price_high: number | null;
  release_url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  youtube_videos: YoutubeVideo[];
  collection_items: CollectionItem[];
  user_interactions: UserInteraction[];
};
