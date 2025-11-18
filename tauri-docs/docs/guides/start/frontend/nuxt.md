# Nuxt

Nuxt is a meta framework for Vue. Learn more about Nuxt at <https://nuxt.com>. This guide is accurate as of Nuxt 3.17.

## [Checklist](#checklist)

[Section titled “Checklist”](#checklist)

  * Use SSG by setting `ssr: false`. Tauri doesn’t support server based solutions.
  * Use default `../dist` as `frontendDist` in `tauri.conf.json`.
  * Compile using `nuxi build`.
  * (Optional): Disable telemetry by setting `telemetry: false` in `nuxt.config.ts`.


## [Example Configuration](#example-configuration)

[Section titled “Example Configuration”](#example-configuration)

  1. ##### [Update Tauri configuration](#update-tauri-configuration)

[Section titled “Update Tauri configuration”](#update-tauri-configuration)

     * [ npm ](#tab-panel-2859)
     * [ yarn ](#tab-panel-2860)
     * [ pnpm ](#tab-panel-2861)
     * [ deno ](#tab-panel-2862)

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "npm run dev",
    
        "beforeBuildCommand": "npm run build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "yarn dev",
    
        "beforeBuildCommand": "yarn build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "pnpm dev",
    
        "beforeBuildCommand": "pnpm build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "deno task dev",
    
        "beforeBuildCommand": "deno task generate",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

  2. ##### [Update Nuxt configuration](#update-nuxt-configuration)

[Section titled “Update Nuxt configuration”](#update-nuxt-configuration)
[code] export default defineNuxtConfig({
         
           compatibilityDate: '2025-05-15',
         
           // (optional) Enable the Nuxt devtools
         
           devtools: { enabled: true },
         
           // Enable SSG
         
           ssr: false,
         
           // Enables the development server to be discoverable by other devices when running on iOS physical devices
         
           devServer: {
         
             host: '0',
         
           },
         
           vite: {
         
             // Better support for Tauri CLI output
         
             clearScreen: false,
         
             // Enable environment variables
         
             // Additional environment variables can be found at
         
             // https://v2.tauri.app/reference/environment-variables/
         
             envPrefix: ['VITE_', 'TAURI_'],
         
             server: {
         
               // Tauri requires a consistent port
         
               strictPort: true,
         
             },
         
           },
         
           // Avoids error [unhandledRejection] EMFILE: too many open files, watch
         
           ignore: ['**/src-tauri/**'],
         
         });
[/code]


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend/nuxt](https://v2.tauri.app/start/frontend/nuxt)