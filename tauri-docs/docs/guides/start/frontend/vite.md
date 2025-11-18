# Vite

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. This guide is accurate as of Vite 5.4.8.

## [Checklist](#checklist)

[Section titled “Checklist”](#checklist)

  * Use `../dist` as `frontendDist` in `src-tauri/tauri.conf.json`.
  * Use `process.env.TAURI_DEV_HOST` as the development server host IP when set to run on iOS physical devices.


## [Example configuration](#example-configuration)

[Section titled “Example configuration”](#example-configuration)

  1. ##### [Update Tauri configuration](#update-tauri-configuration)

[Section titled “Update Tauri configuration”](#update-tauri-configuration)

Assuming you have the following `dev` and `build` scripts in your `package.json`:
[code] {
         
           "scripts": {
         
             "dev": "vite",
         
             "build": "tsc && vite build",
         
             "preview": "vite preview",
         
             "tauri": "tauri"
         
           }
         
         }
[/code]

You can configure the Tauri CLI to use your Vite development server and dist folder along with the hooks to automatically run the Vite scripts:

     * [ npm ](#tab-panel-2895)
     * [ yarn ](#tab-panel-2896)
     * [ pnpm ](#tab-panel-2897)
     * [ deno ](#tab-panel-2898)

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "npm run dev",
    
        "beforeBuildCommand": "npm run build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "yarn dev",
    
        "beforeBuildCommand": "yarn build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "pnpm dev",
    
        "beforeBuildCommand": "pnpm build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "deno task dev",
    
        "beforeBuildCommand": "deno task build",
    
        "devUrl": "http://localhost:5173",
    
        "frontendDist": "../dist"
    
      }
    
    }
[/code]

  2. ##### [Update Vite configuration:](#update-vite-configuration)

[Section titled “Update Vite configuration:”](#update-vite-configuration)

vite.config.js
[code]import { defineConfig } from 'vite';
         
         
         
         
         const host = process.env.TAURI_DEV_HOST;
         
         
         
         
         export default defineConfig({
         
           // prevent vite from obscuring rust errors
         
           clearScreen: false,
         
           server: {
         
             // make sure this port matches the devUrl port in tauri.conf.json file
         
             port: 5173,
         
             // Tauri expects a fixed port, fail if that port is not available
         
             strictPort: true,
         
             // if the host Tauri is expecting is set, use it
         
             host: host || false,
         
             hmr: host
         
               ? {
         
                   protocol: 'ws',
         
                   host,
         
                   port: 1421,
         
                 }
         
               : undefined,
         
         
         
         
             watch: {
         
               // tell vite to ignore watching `src-tauri`
         
               ignored: ['**/src-tauri/**'],
         
             },
         
           },
         
           // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
         
           envPrefix: ['VITE_', 'TAURI_ENV_*'],
         
           build: {
         
             // Tauri uses Chromium on Windows and WebKit on macOS and Linux
         
             target:
         
               process.env.TAURI_ENV_PLATFORM == 'windows'
         
                 ? 'chrome105'
         
                 : 'safari13',
         
             // don't minify for debug builds
         
             minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
         
             // produce sourcemaps for debug builds
         
             sourcemap: !!process.env.TAURI_ENV_DEBUG,
         
           },
         
         });
[/code]


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend/vite](https://v2.tauri.app/start/frontend/vite)