use std::thread;
use tiny_http::{Server, Response};

const PLAYER_HTML: &str = r#"
<!DOCTYPE html>
<html>
<head>
    <title>Discogs Player</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
        #player { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="player"></div>
    <script>
        // --- YouTube API Boilerplate ---
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        var playerReady = false;
        var currentVideoId = null;
        var progressInterval = null;

        function onYouTubeIframeAPIReady() {
            // Notify parent we are ready to mount, though we wait for loadVideo command really
            window.parent.postMessage({ type: 'API_READY' }, '*');
        }

        function createPlayer(videoId, startSeconds) {
            if (player) {
                player.loadVideoById({ videoId: videoId, startSeconds: startSeconds || 0 });
                return;
            }

            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'autoplay': 1,
                    'controls': 1,
                    'disablekb': 0,
                    'fs': 0,
                    'modestbranding': 1,
                    'rel': 0,
                    'origin': 'http://localhost:4567'
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            });
        }

        function onPlayerReady(event) {
            playerReady = true;
            window.parent.postMessage({ type: 'PLAYER_READY' }, '*');
        }

        function onPlayerStateChange(event) {
            // YT.PlayerState.ENDED = 0
            // YT.PlayerState.PLAYING = 1
            // YT.PlayerState.PAUSED = 2
            // YT.PlayerState.BUFFERING = 3
            // YT.PlayerState.CUED = 5

            window.parent.postMessage({ type: 'STATE_CHANGE', data: event.data }, '*');
            
            if (event.data === YT.PlayerState.PLAYING) {
                startProgressTracking();
                
                // Fetch title if available
                try {
                    var data = event.target.getVideoData();
                    if (data && data.title) {
                         window.parent.postMessage({ type: 'TITLE_UPDATE', title: data.title }, '*');
                    }
                } catch(e) {}

            } else {
                stopProgressTracking();
            }
        }

        function onPlayerError(event) {
            window.parent.postMessage({ type: 'ERROR', data: event.data }, '*');
        }

        function startProgressTracking() {
            stopProgressTracking();
            progressInterval = setInterval(function() {
                if (player && player.getCurrentTime) {
                    var time = player.getCurrentTime();
                    var duration = player.getDuration();
                    window.parent.postMessage({ 
                        type: 'PROGRESS', 
                        currentTime: time,
                        duration: duration 
                    }, '*');
                }
            }, 250);
        }

        function stopProgressTracking() {
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
        }

        // --- Message Handling from Parent ---
        window.addEventListener('message', function(event) {
            var msg = event.data;
            
            if (!msg) return;

            switch(msg.command) {
                case 'loadVideo':
                    currentVideoId = msg.videoId;
                    createPlayer(msg.videoId, msg.startSeconds);
                    break;
                
                case 'play':
                    if (player && player.playVideo) player.playVideo();
                    break;
                
                case 'pause':
                    if (player && player.pauseVideo) player.pauseVideo();
                    break;
                    
                case 'seek':
                    if (player && player.seekTo) player.seekTo(msg.time, true);
                    break;
                    
                case 'setVolume':
                    if (player && player.setVolume) player.setVolume(msg.volume);
                    break;
            }
        });
    </script>
</body>
</html>
"#;

pub fn start() {
    thread::spawn(move || {
        // Use a fixed port for now. 
        // In a robust app, we might want to find a free port and communicate it back, 
        // but 4567 is a decent obscure choice for a player sidecar.
        let server = match Server::http("127.0.0.1:4567") {
            Ok(s) => s,
            Err(e) => {
                eprintln!("Failed to start player server: {}", e);
                return;
            }
        };

        println!("Sidecar Player Server running on http://127.0.0.1:4567");

        for request in server.incoming_requests() {
            // Simple router: serve the player HTML for any request (or specific path)
            // This handles / and /index.html etc.
            
            let response = Response::from_string(PLAYER_HTML)
                .with_header(tiny_http::Header::from_bytes(&b"Content-Type"[..], &b"text/html"[..]).unwrap())
                .with_header(tiny_http::Header::from_bytes(&b"Access-Control-Allow-Origin"[..], &b"*"[..]).unwrap()); // Allow embedding

            let _ = request.respond(response);
        }
    });
}

