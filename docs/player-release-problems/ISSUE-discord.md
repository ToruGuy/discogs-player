ouTube IFrame Error 153 in Production - Need Help with HTTP Origin
CJC
OP
 — 11/5/25, 11:17 AM
Hey everyone! I'm working on a Tauri v2 app that embeds YouTube videos using the IFrame Player API. Everything works perfectly in dev mode, but I'm hitting YouTube Error 153 ("Video player configuration error") in production builds.

Setup:

Tauri v2 (latest)
Using YouTube IFrame Player API (new YT.Player())
Dev mode: devUrl: "http://localhost:1430/" (Vite) - ✅
 Works perfectly
Production: Default Tauri protocol (tauri://localhost) - ❌
 YouTube Error 153
What I've Tried:

Setting referrerpolicy on iframe - No effect
withGlobalTauri: true - Doesn't help with YouTube
tauri-plugin-localhost - This fixes YouTube Error 153, but completely breaks IPC:
Used WebviewUrl::External("http://localhost:1430")
YouTube works, but all invoke() calls fail
Even with withGlobalTauri: true, IPC bridge isn't injected into external URLs
Tried dangerousRemoteDomainIpcAccess but that config doesn't exist in Tauri v2
The Problem: YouTube's IFrame API requires a valid HTTP Referer header. The tauri://localhost protocol doesn't provide this, causing Error 153. When I use the localhost plugin to serve over http://localhost/, YouTube works but Tauri treats it as an untrusted external URL and blocks IPC.

Questions:

Is there a way to make tauri://localhost provide a valid HTTP Referer for YouTube embeds?
Can I enable IPC for external URLs served by the localhost plugin?
Is there a custom protocol handler approach that could proxy YouTube with proper headers?
Any other solutions for embedding YouTube in production Tauri apps?
I need both YouTube embeds AND IPC commands to work in production. Any guidance would be greatly appreciated!
FabianLars

 — 11/5/25, 12:58 PM
Is there a way to make tauri://localhost provide a valid HTTP Referer for YouTube embeds?
I don't think, only these headers are exposed https://v2.tauri.app/reference/config/#headerconfig but maybe we can add a Referer one as well 🤔
 
Can I enable IPC for external URLs served by the localhost plugin?
https://v2.tauri.app/security/capabilities/#remote-api-access
FabianLars

 — 11/5/25, 1:28 PM
https://github.com/tauri-apps/tauri/issues/14422
CJC
OP
 — 11/5/25, 1:29 PM
yhhh sorry i just opened this issue now, shouldve linked this chat in there and vice-versa
FabianLars

 — 11/5/25, 1:29 PM
all good, nobody does that x)
CJC
OP
 — 11/5/25, 1:32 PM
regarding the Referer header is this something i'd be able to add/extend myself or would it require me to wait for an official release from the team?
FabianLars

 — 11/5/25, 1:35 PM
it requires changes in tauri, not just in your app
FabianLars

 — 11/5/25, 1:45 PM
try adding this to Cargo.toml 
[patch.crates-io]
tauri = { git = "https://github.com/tauri-apps/tauri", branch = "feat/referer-header" }
 may require running cargo update 
The follow this https://v2.tauri.app/reference/config/#headerconfig but using "Referer" as the key. Your editor will complain that the field is invalid but tauri should compile. If not, do 
cargo install tauri-cli --debug --git https://github.com/tauri-apps/tauri --branch feat/referer-header
 followed by cargo tauri build (instead of npm or whatever you're using)
CJC
OP
 — 11/5/25, 7:27 PM
I've added the patch.crates-io and run a cargo update as suggested. Also done run the cargo install command you provided for the branch but still not resolving my issue unfortunately. Not sure if it's an implementation issue on my part now

Here's my tauri.conf.json 

"security": {
            "csp": "default-src 'self'; connect-src ipc: http://ipc.localhost https://www.youtube.com https://www.youtube-nocookie.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com;",
            "headers": {
                "Access-Control-Expose-Headers": "Referer",
                "Referer": "http://localhost:1430"
            }
FabianLars

 — 11/5/25, 8:41 PM
Not sure if it's an implementation issue on my part now
Probably not. Seems like setting the Referer header there simply doesn't do the trick.
kingbotsofficial — 11/6/25, 4:18 AM
seems xss/csp error, you maybe need to update headers, before showing in the app
CJC
OP
 — 11/7/25, 1:23 PM
@FabianLars thanks again for the detailed help and for providing the feat/referer-header branch for testing.

Even with the patch and the correct configuration, setting the Referer header in tauri.conf.json  doesn't solve the issue. The iframe still results in Error 153 in a production build.

This leads me to believe the problem is deeper than just the initial request from the iframe.

@kingbotsofficial also mentioned this could be a CSP/XSS issue. I think they're on the right track that it's a header-related security policy, but my latest debugging suggests it might be a CORS policy on Google's side. It seems that even if the iframe loads, the player itself is then blocked from fetching the actual video stream because the request's origin (tauri://localhost) isn't on Google's allowlist.

This brings me back to the core architectural dilemma:

If the app is served from tauri://localhost, we get full, secure IPC, but YouTube's server policies (both for the embed Referer and for subsequent stream CORS) block the player.

If we serve the app from http://localhost, the YouTube embed works, but we lose the secure, out-of-the-box IPC bridge. Using the remote capabilities you linked seems to be the official way to bridge this, but it requires a significant change in how invoke is handled.
FabianLars

 — 11/7/25, 7:13 PM
but it requires a significant change in how invoke is handled.
what do you mean by that?
CJC
OP
 — 11/8/25, 6:57 PM
By "significant change" I meant how my frontend talks to the Rust backend.

Right now with tauri://localhost, I use the invoke function but if I switch to http://localhost I'd need to replace every invoke call with manual fetch requests to the IPC-over-HTTP (as per this section https://v2.tauri.app/security/capabilities/#remote-api-access of the docs)

So the change means replacing a clean API with manual HTTP requests everywhere. That means refactoring all my frontend data-fetching and error handling.

Does this match how remote capabilities work, or am I off track here?
FabianLars

 — 11/9/25, 2:54 PM
(as per this section https://v2.tauri.app/security/capabilities/#remote-api-access of the docs)
tbh i don't see which part of that section gives you this impression. You can keep using invoke. This is what you're enabling with the remote config.
CJC
OP
 — 11/16/25, 12:17 PM
Ohhh I've definitely messed up with my implementation then, cheers for clarifying