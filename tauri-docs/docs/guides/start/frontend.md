# Frontend Configuration

Tauri is frontend agnostic and supports most frontend frameworks out of the box. However, sometimes a framework need a bit of extra configuration to integrate with Tauri. Below is a list of frameworks with recommended configurations.

If a framework is not listed then it may work with Tauri with no additional configuration needed or it could have not been documented yet. Any contributions to add a framework that may require additional configuration are welcome to help others in the Tauri community.

## [Configuration Checklist](#configuration-checklist)

[Section titled “Configuration Checklist”](#configuration-checklist)

Conceptually Tauri acts as a static web host. You need to provide Tauri with a folder containing some mix of HTML, CSS, Javascript and possibly WASM that can be served to the webview Tauri provides.

Below is a checklist of common scenarios needed to integrate a frontend with Tauri:

  * Use static site generation (SSG), single-page applications (SPA), or classic multi-page apps (MPA). Tauri does not natively support server based alternatives (such as SSR).
  * For mobile development, a development server of some kind is necessary that can host the frontend on your internal IP.
  * Use a proper client-server relationship between your app and your API’s (no hybrid solutions with SSR).


## [JavaScript](#javascript)

[Section titled “JavaScript”](#javascript)

For most projects we recommend [Vite](https://vitejs.dev/) for SPA frameworks such as React, Vue, Svelte, and Solid, but also for plain JavaScript or TypeScript projects. Most other guides listed here show how to use Meta-Frameworks as they are typically designed for SSR and therefore require special configuration.

[ Next.js ](/start/frontend/nextjs/)

[ Nuxt ](/start/frontend/nuxt/)

[ Qwik ](/start/frontend/qwik/)

[ SvelteKit ](/start/frontend/sveltekit/)

[ Vite (recommended) ](/start/frontend/vite/)

## [Rust](#rust)

[Section titled “Rust”](#rust)

[ Leptos ](/start/frontend/leptos/)

[ Trunk ](/start/frontend/trunk/)

  


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend](https://v2.tauri.app/start/frontend)