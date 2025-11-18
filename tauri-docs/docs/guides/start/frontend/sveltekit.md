# SvelteKit

SvelteKit is a meta framework for Svelte. Learn more about SvelteKit at <https://svelte.dev/>. This guide is accurate as of SvelteKit 2.20.4 / Svelte 5.25.8.

## [Checklist](#checklist)

[Section titled “Checklist”](#checklist)

  * Use [SSG](https://svelte.dev/docs/kit/adapter-static) and [SPA](https://svelte.dev/docs/kit/single-page-apps) via `static-adapter`. Tauri doesn’t support server-based solutions.
  * If using SSG **with prerendering** , be aware that `load` functions will not have access to tauri APIs during the build process of your app. Using SPA mode (without prerendering) is recommended since the load functions will only run in the webview with access to tauri APIs.
  * Use `build/` as `frontendDist` in `tauri.conf.json`.


## [Example Configuration](#example-configuration)

[Section titled “Example Configuration”](#example-configuration)

  1. ##### [Install `@sveltejs/adapter-static`](#install-sveltejsadapter-static)

[Section titled “Install @sveltejs/adapter-static”](#install-sveltejsadapter-static)

     * [ npm ](#tab-panel-2891)
     * [ yarn ](#tab-panel-2892)
     * [ pnpm ](#tab-panel-2893)
     * [ deno ](#tab-panel-2894)
[code] npm install --save-dev @sveltejs/adapter-static
[/code]
[code] yarn add -D @sveltejs/adapter-static
[/code]
[code] pnpm add -D @sveltejs/adapter-static
[/code]
[code] deno add -D npm:@sveltejs/adapter-static
[/code]

  2. ##### [Update Tauri configuration](#update-tauri-configuration)

[Section titled “Update Tauri configuration”](#update-tauri-configuration)

     * [ npm ](#tab-panel-2887)
     * [ yarn ](#tab-panel-2888)
     * [ pnpm ](#tab-panel-2889)
     * [ deno ](#tab-panel-2890)

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "npm run dev",
    
        "beforeBuildCommand": "npm run build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../build"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "yarn dev",
    
        "beforeBuildCommand": "yarn build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../build"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "pnpm dev",
    
        "beforeBuildCommand": "pnpm build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../build"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "deno task dev",
    
        "beforeBuildCommand": "deno task build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../build"
    
      }
    
    }
[/code]

  3. ##### [Update SvelteKit configuration:](#update-sveltekit-configuration)

[Section titled “Update SvelteKit configuration:”](#update-sveltekit-configuration)

svelte.config.js
[code]import adapter from '@sveltejs/adapter-static';
         
         import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
         
         
         
         
         /** @type {import('@sveltejs/kit').Config} */
         
         const config = {
         
           // Consult https://svelte.dev/docs/kit/integrations#preprocessors
         
           // for more information about preprocessors
         
           preprocess: vitePreprocess(),
         
         
         
         
           kit: {
         
             adapter: adapter({
         
               fallback: 'index.html',
         
             }),
         
           },
         
         };
         
         
         
         
         export default config;
[/code]

  4. ##### [Disable SSR](#disable-ssr)

[Section titled “Disable SSR”](#disable-ssr)

Lastly, we need to disable SSR by adding a root `+layout.ts` file (or `+layout.js` if you are not using TypeScript) with these contents:

src/routes/+layout.ts
[code]export const ssr = false;
[/code]

Note that `static-adapter` doesn’t require you to disable SSR for the whole app but it makes it possible to use APIs that depend on the global window object (like Tauri’s API) without [Client-side checks](https://svelte.dev/docs/kit/faq#how-do-i-use-x-with-sveltekit-how-do-i-use-a-client-side-only-library-that-depends-on-document-or-window).

Furthermore, if you prefer Static Site Generation (SSG) over Single-Page Application (SPA) mode, you can change the adapter configurations and `+layout.ts` according to the [adapter docs](https://svelte.dev/docs/kit/adapter-static).


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend/sveltekit](https://v2.tauri.app/start/frontend/sveltekit)