import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
// remove type import if it causes issues, or keep if resolved
// import type { YouTubeProps } from 'react-youtube'; 
import { usePlayer } from '@/context/PlayerContext';

export function YoutubePlayer() {
  const { currentVideo, isPlaying, nextTrack } = usePlayer();
  const playerRef = useRef<any>(null);

  // Sync play/pause state
  // MOVED UP: Hooks must be called unconditionally
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  if (!currentVideo) return null;

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onPlayerStateChange = (event: any) => {
    // State 0 is ended
    if (event.data === 0) {
      console.log("Track ended, playing next...");
      nextTrack();
    }
  };

  const opts: any = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 1,
      modestbranding: 1,
      origin: window.location.origin, // Important for API access
    },
  };

  return (
    <div className="w-full h-full bg-black">
      <YouTube
        key={currentVideo.youtube_video_id} // Force remount on video change to ensure clean state
        videoId={currentVideo.youtube_video_id}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
}
