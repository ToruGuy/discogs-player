import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
// remove type import if it causes issues, or keep if resolved
// import type { YouTubeProps } from 'react-youtube'; 
import { usePlayer } from '@/context/PlayerContext';
import { useData } from '@/context/DataContext';

export function YoutubePlayer() {
  const { 
    currentVideo, 
    isPlaying, 
    nextTrack, 
    queueIndex, 
    updateQueueItemTitle, 
    queue 
  } = usePlayer();
  const { updateVideoTitle } = useData();
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

  const checkAndUpdateTitle = (target: any) => {
    if (!target || !target.getVideoData) return;
    
    const data = target.getVideoData();
    if (data && data.title) {
        const realTitle = data.title;
        const currentQueueItem = queue[queueIndex];
        
        // Update if title is missing or generic (fallback) or just different
        // We assume YouTube title is the source of truth
        if (currentQueueItem && currentQueueItem.title !== realTitle) {
             console.log(`Updating title: "${currentQueueItem.title}" -> "${realTitle}"`);
             
             // Update Queue (Immediate UI)
             updateQueueItemTitle(queueIndex, realTitle);
             
             // Update Data Context (Persist for session)
             if (currentQueueItem.albumId) {
                 updateVideoTitle(currentQueueItem.albumId, currentVideo.youtube_video_id, realTitle);
             }
        }
    }
  };

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    if (isPlaying) {
      event.target.playVideo();
    }
    // Try to get title on load
    checkAndUpdateTitle(event.target);
  };

  const onPlayerStateChange = (event: any) => {
    // State 1 is Playing - metadata definitely ready
    if (event.data === 1) {
      checkAndUpdateTitle(event.target);
    }

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
