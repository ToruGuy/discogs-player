import { useEffect, useRef, useCallback } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { useData } from '@/context/DataContext';

const SIDECAR_URL = 'http://localhost:4567';

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastVideoIdRef = useRef<string | null>(null);
  const lastSeekRef = useRef<number | null>(null);

  // Helper to send commands to the iframe
  const sendCommand = useCallback((command: string, payload: any = {}) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ command, ...payload }, '*');
    }
  }, []);

  // 1. Load Video
  useEffect(() => {
    if (currentVideo?.youtube_video_id && currentVideo.youtube_video_id !== lastVideoIdRef.current) {
      lastVideoIdRef.current = currentVideo.youtube_video_id;
      sendCommand('loadVideo', { videoId: currentVideo.youtube_video_id, startSeconds: 0 });
    }
  }, [currentVideo?.youtube_video_id, sendCommand]);

  // 2. Play/Pause Sync
  useEffect(() => {
    if (isPlaying) {
      sendCommand('play');
    } else {
      sendCommand('pause');
    }
  }, [isPlaying, sendCommand]);

  // 3. Seek Sync
  useEffect(() => {
    if (seekRequest !== null && seekRequest !== lastSeekRef.current) {
      lastSeekRef.current = seekRequest;
      sendCommand('seek', { time: seekRequest });
    }
  }, [seekRequest, sendCommand]);

  // 4. Listen for messages from Sidecar
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin if needed, but localhost:4567 is expected
      // if (event.origin !== SIDECAR_URL) return;

      const { type, data, currentTime, duration, title } = event.data;

      switch (type) {
        case 'API_READY':
        case 'PLAYER_READY':
            // Re-send load command if needed, or just ensure sync
            if (currentVideo?.youtube_video_id) {
                // If we just mounted, make sure we load the video
                sendCommand('loadVideo', { videoId: currentVideo.youtube_video_id });
                if (isPlaying) sendCommand('play');
            }
            break;

        case 'STATE_CHANGE':
             // data: 0 = ENDED
            if (data === 0) {
                nextTrack();
            }
            break;

        case 'PROGRESS':
            if (!isSeeking) {
                if (typeof currentTime === 'number') setProgress(currentTime);
                if (typeof duration === 'number' && duration > 0) setDuration(duration);
            }
            break;

        case 'TITLE_UPDATE':
            if (title && currentVideo) {
                const currentQueueItem = queue[queueIndex];
                if (currentQueueItem && currentQueueItem.title !== title) {
                    updateQueueItemTitle(queueIndex, title);
                    if (currentQueueItem.albumId) {
                        updateVideoTitle(currentQueueItem.albumId, currentVideo.youtube_video_id, title);
                    }
                }
            }
            break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentVideo, isSeeking, isPlaying, nextTrack, queueIndex, queue, setProgress, setDuration, updateQueueItemTitle, updateVideoTitle, sendCommand]);

  if (!currentVideo) return null;

  return (
    <div className="w-full h-full bg-black">
      <iframe
        ref={iframeRef}
        src={SIDECAR_URL}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
