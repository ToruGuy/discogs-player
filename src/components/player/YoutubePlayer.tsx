import { useEffect, useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export function YoutubePlayer() {
  const { currentVideo, isPlaying, nextTrack } = usePlayer();
  const playerRef = useRef<HTMLIFrameElement>(null);

  // We need to handle the "ended" event to autoplay next track.
  // Since we can't easily capture postMessage from iframe without a library in a robust way quickly,
  // We will use a simple polling or just rely on manual for MVP if we don't want to add 'react-youtube'.
  // BUT, for a good experience, let's try to use the window.onmessage API for YouTube Iframe API.
  
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
        if (event.origin !== "https://www.youtube.com") return;
        
        try {
            const data = JSON.parse(event.data);
            // YouTube Player State Change
            // info: { playerState: 0 } -> Ended
            if (data.event === "infoDelivery" && data.info && data.info.playerState === 0) {
                console.log("Track ended, playing next...");
                nextTrack();
            }
        } catch (e) {
            // Ignore
        }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [nextTrack]);

  if (!currentVideo) return null;

  const src = `https://www.youtube.com/embed/${currentVideo.youtube_video_id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div className="hidden">
      <iframe
        ref={playerRef}
        id="youtube-player"
        width="200"
        height="200"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Youtube Player"
      />
    </div>
  );
}

