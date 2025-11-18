# Leptos

Leptos is a Rust based web framework. You can read more about Leptos on their [official website](https://leptos.dev/). This guide is accurate as of Leptos version 0.6.

## [Checklist](#checklist)

[Section titled “Checklist”](#checklist)

  * Use SSG, Tauri doesn’t officially support server based solutions.
  * Use `serve.ws_protocol = "ws"` so that the hot-reload websocket can connect properly for mobile development.
  * Enable `withGlobalTauri` to ensure that Tauri APIs are available in the `window.__TAURI__` variable and can be imported using `wasm-bindgen`.


## [Example Configuration](#example-configuration)

[Section titled “Example Configuration”](#example-configuration)

  1. ##### [Update Tauri configuration](#update-tauri-configuration)

[Section titled “Update Tauri configuration”](#update-tauri-configuration)

src-tauri/tauri.conf.json
[code]{
         
           "build": {
         
             "beforeDevCommand": "trunk serve",
         
             "devUrl": "http://localhost:1420",
         
             "beforeBuildCommand": "trunk build",
         
             "frontendDist": "../dist"
         
           },
         
           "app": {
         
             "withGlobalTauri": true
         
           }
         
         }
[/code]

  2. ##### [Update Trunk configuration](#update-trunk-configuration)

[Section titled “Update Trunk configuration”](#update-trunk-configuration)

Trunk.toml
[code][build]
         
         target = "./index.html"
         
         
         
         
         [watch]
         
         ignore = ["./src-tauri"]
         
         
         
         
         [serve]
         
         port = 1420
         
         open = false
         
         ws_protocol = "ws"
[/code]


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend/leptos](https://v2.tauri.app/start/frontend/leptos)