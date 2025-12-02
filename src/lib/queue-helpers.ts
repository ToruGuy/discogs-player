import type { Album, QueueItem } from '@/types';

/**
 * Converts an album to an array of QueueItems with all required fields.
 * @param album The album to convert
 * @param startIndex Optional starting track index (default: 0)
 * @param endIndex Optional ending track index (default: all tracks)
 * @returns Array of QueueItems
 */
export function convertAlbumToQueueItems(
  album: Album,
  startIndex: number = 0,
  endIndex?: number
): QueueItem[] {
  if (!album.youtube_videos || album.youtube_videos.length === 0) {
    return [];
  }

  const totalTracks = album.youtube_videos.length;
  const end = endIndex !== undefined ? Math.min(endIndex, totalTracks) : totalTracks;
  const videos = album.youtube_videos.slice(startIndex, end);

  return videos.map((video, index) => ({
    id: crypto.randomUUID(),
    videoId: video.youtube_video_id,
    title: video.title || `${album.artist} - ${album.title}`,
    artist: album.artist,
    albumId: album.id,
    albumTitle: album.title,
    albumImageUrl: album.image_url,
    trackIndex: startIndex + index, // Position in album's youtube_videos array
    totalTracksInAlbum: totalTracks,
    source: 'album' as const
  }));
}

/**
 * Converts a single track from an album to a QueueItem.
 * @param album The album containing the track
 * @param trackIndex The index of the track in the album's youtube_videos array
 * @returns QueueItem or null if track doesn't exist
 */
export function convertTrackToQueueItem(
  album: Album,
  trackIndex: number
): QueueItem | null {
  if (!album.youtube_videos || trackIndex < 0 || trackIndex >= album.youtube_videos.length) {
    return null;
  }

  const video = album.youtube_videos[trackIndex];
  return {
    id: crypto.randomUUID(),
    videoId: video.youtube_video_id,
    title: video.title || `${album.artist} - ${album.title}`,
    artist: album.artist,
    albumId: album.id,
    albumTitle: album.title,
    albumImageUrl: album.image_url,
    trackIndex: trackIndex,
    totalTracksInAlbum: album.youtube_videos.length,
    source: 'album' as const
  };
}
