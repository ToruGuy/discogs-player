# @tauri-apps/api

The Tauri API allows you to interface with the backend layer.

This module exposes all other modules as an object where the key is the module name, and the value is the module exports.

## [Examples](#examples)

[Section titled “Examples”](#examples)
[code] 
    import { event, window, path } from '@tauri-apps/api'
[/code]

### [Vanilla JS API](#vanilla-js-api)

[Section titled “Vanilla JS API”](#vanilla-js-api)

The above import syntax is for JavaScript/TypeScript with a bundler. If you’re using vanilla JavaScript, you can use the global `window.__TAURI__` object instead. It requires `app.withGlobalTauri` configuration option enabled.
[code] 
    const { event, window: tauriWindow, path } = window.__TAURI__;
[/code]

## [Namespaces](#namespaces)

[Section titled “Namespaces”](#namespaces)

  * [app](/reference/javascript/api/namespaceapp/)
  * [core](/reference/javascript/api/namespacecore/)
  * [dpi](/reference/javascript/api/namespacedpi/)
  * [event](/reference/javascript/api/namespaceevent/)
  * [image](/reference/javascript/api/namespaceimage/)
  * [menu](/reference/javascript/api/namespacemenu/)
  * [mocks](/reference/javascript/api/namespacemocks/)
  * [path](/reference/javascript/api/namespacepath/)
  * [tray](/reference/javascript/api/namespacetray/)
  * [webview](/reference/javascript/api/namespacewebview/)
  * [webviewWindow](/reference/javascript/api/namespacewebviewwindow/)
  * [window](/reference/javascript/api/namespacewindow/)


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api](https://v2.tauri.app/reference/javascript/api)