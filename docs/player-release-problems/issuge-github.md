I'm building a Tauri v2 application that embeds YouTube videos using the IFrame Player API. The app works perfectly in development mode but encounters YouTube Error 153 ("Video player configuration error") in production builds due to the tauri://localhost protocol not providing a valid HTTP Referer header.

Environment
Tauri Version: 2.x (latest)
Platform: macOS (but issue affects all platforms)
Frontend: React + Vite
YouTube Integration: IFrame Player API
The Problem
Development (Works ✅)
devUrl: "http://localhost:1430" (Vite dev server)
YouTube embeds load and play correctly
All IPC commands work
Production (Fails ❌)
Default Tauri protocol: tauri://localhost
YouTube Error 153: "Video player configuration error"
YouTube's IFrame API requires a valid HTTP Referer header
The tauri:// protocol doesn't provide this
What I've Tried
Attempt 1: tauri-plugin-localhost
// lib.rs
app.handle().plugin(tauri_plugin_localhost::Builder::new(1430).build())?;

tauri::WebviewWindowBuilder::new(
    app,
    "main",
    tauri::WebviewUrl::External("http://localhost:1430".parse().unwrap())
)
Result: ✅ YouTube works, ❌ ALL IPC breaks

Even with withGlobalTauri: true in config
Tauri treats external URLs as untrusted
IPC bridge (window.__TAURI__) is not injected
All invoke() calls fail silently
Attempt 2: Configuration Options
{
  "app": {
    "withGlobalTauri": true
  }
}
Result: No effect on YouTube Error 153

Attempt 3: Origin Parameter
// Tried both approaches
playerVars: { origin: window.location.origin }  // "tauri://localhost" - fails
playerVars: { origin: 'http://localhost:1430' } // Still fails
Result: YouTube still shows Error 153

Attempt 4: Direct IFrame Embed
iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://localhost:1430`;
Result: YouTube still shows Error 153

Attempt 5: Referrer Policy
iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
Result: No effect

The Core Issue
This appears to be a fundamental incompatibility:

YouTube requires HTTP origin → Need http://localhost
Tauri uses custom protocol → Provides tauri://localhost
localhost plugin breaks IPC → External URLs are untrusted
Trade-off:

Use default Tauri protocol → IPC works, YouTube fails
Use localhost plugin → YouTube works, IPC fails
Questions
Is there a way to make tauri://localhost provide a valid HTTP Referer for YouTube embeds?

Can IPC be enabled for external URLs served by the localhost plugin?

Is there a Tauri v2 equivalent of dangerousRemoteDomainIpcAccess?
Can capabilities be configured to trust http://localhost:*?
Is there a custom protocol handler approach that could proxy YouTube requests with proper headers while maintaining IPC?

Are there any other solutions for embedding YouTube in production Tauri apps?

Workarounds Considered
yt-dlp preview download: Download video preview locally (works but slow)
External browser preview: Open YouTube in browser (poor UX)
Thumbnail-only: No preview at all (bad UX)
Ideal Solution
A way to serve the production app over http://localhost (or provide valid HTTP headers) while maintaining full IPC functionality.

Additional Context
This issue affects any Tauri app that needs to:

Embed YouTube videos
Use third-party iframes requiring HTTP origins
Maintain IPC communication with the backend
Any guidance would be greatly appreciated! Happy to provide more details or test potential solutions.

Code Snippets
Current YouTube Integration Code
// YoutubePreview.tsx
useEffect(() => {
    if (!isPreviewPlaying || !validatedYtId) return;
    if (!playerContainerRef.current) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${validatedYtId}?enablejsapi=1&autoplay=1&origin=http://localhost:1430`;
    iframe.width = '640';
    iframe.height = '385';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    playerContainerRef.current.appendChild(iframe);
}, [isPreviewPlaying, validatedYtId]);
Tauri Configuration
// tauri.conf.json
{
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "my-app",
        "width": 650,
        "height": 1000
      }
    ],
    "security": {
      "csp": null
    }
  }
}
Also being discussed here https://discord.com/channels/616186924390023171/1435573703243988992

Activity

FabianLars
mentioned this last month
[bug] Error 153 #14396

FabianLars
marked [bug] Error 153 #14396 as a duplicate of this issue last month
axy1976
axy1976 commented 3 weeks ago
axy1976
3 weeks ago
For windows it's working fine cuz the origin use by windows in production is "http://tauri.localhost" but in macos and linux the tauri architecture use "tauri://localhost" that's why youtube video player not working in these platforms.

if anybody have the answer pls do let us know...


FabianLars
added 
type: bug
 
help wanted
Help is requested to fix this issue
 
type: question
 
platform: Linux
 
platform: macOS
 3 weeks ago
JimmyLv
JimmyLv commented 3 weeks ago
JimmyLv
3 weeks ago
I've also encountered this issue and have tried many things, all of which have failed