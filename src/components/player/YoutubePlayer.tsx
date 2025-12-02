import { useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import { usePlayer } from '@/context/PlayerContext';
import { useData } from '@/context/DataContext';

export function YoutubePlayer() {
  const { 
    currentVideo, 
    isPlaying, 
    nextTrack, 
    queueIndex, 
    updateQueueItemTitle, 
    queue,
    setProgress,
    setDuration,
    seekRequest,
    isSeeking
  } = usePlayer();
  const { updateVideoTitle } = useData();
  const playerRef = useRef<any>(null);
  const lastSeekRef = useRef<number | null>(null);
  const requestRef = useRef<number>();

  // Handle seek requests
  useEffect(() => {
    if (seekRequest !== null && seekRequest !== lastSeekRef.current && playerRef.current) {
      playerRef.current.seekTo(seekRequest, true);
      lastSeekRef.current = seekRequest;
    }
  }, [seekRequest]);

  // RAF for progress
  const updateProgress = useCallback(() => {
    if (playerRef.current && isPlaying && !isSeeking) {
      try {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        if (typeof currentTime === 'number') setProgress(currentTime);
        if (typeof duration === 'number' && duration > 0) setDuration(duration);
      } catch (e) {
        // Ignore errors
      }
    }
    requestRef.current = requestAnimationFrame(updateProgress);
  }, [isPlaying, isSeeking, setProgress, setDuration]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, updateProgress]);

  // Sync play/pause state
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
        
        if (currentQueueItem && currentQueueItem.title !== realTitle) {
             // console.log(`Updating title: "${currentQueueItem.title}" -> "${realTitle}"`);
             updateQueueItemTitle(queueIndex, realTitle);
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
    checkAndUpdateTitle(event.target);
  };

  const onPlayerStateChange = (event: any) => {
    // State 1 is Playing - metadata definitely ready
    if (event.data === 1) {
      checkAndUpdateTitle(event.target);
    }

    // State 0 is ended
    if (event.data === 0) {
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
      origin: window.location.origin,
    },
  };

  return (
    <div className="w-full h-full bg-black">
      <YouTube
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
