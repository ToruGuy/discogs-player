# Next.js

Next.js is a meta framework for React. Learn more about Next.js at <https://nextjs.org>. This guide is accurate as of Next.js 14.2.3.

## [Checklist](#checklist)

[Section titled “Checklist”](#checklist)

  * Use static exports by setting `output: 'export'`. Tauri doesn’t support server-based solutions.
  * Use the `out` directory as `frontendDist` in `tauri.conf.json`.


## [Example Configuration](#example-configuration)

[Section titled “Example Configuration”](#example-configuration)

  1. ##### [Update Tauri configuration](#update-tauri-configuration)

[Section titled “Update Tauri configuration”](#update-tauri-configuration)

     * [ npm ](#tab-panel-2855)
     * [ yarn ](#tab-panel-2856)
     * [ pnpm ](#tab-panel-2857)
     * [ deno ](#tab-panel-2858)

src-tauri/tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "npm run dev",
    
        "beforeBuildCommand": "npm run build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../out"
    
      }
    
    }
[/code]

src-tauri/tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "yarn dev",
    
        "beforeBuildCommand": "yarn build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../out"
    
      }
    
    }
[/code]

src-tauri/tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "pnpm dev",
    
        "beforeBuildCommand": "pnpm build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../out"
    
      }
    
    }
[/code]

src-tauri/tauri.conf.json
[code]{
    
      "build": {
    
        "beforeDevCommand": "deno task dev",
    
        "beforeBuildCommand": "deno task build",
    
        "devUrl": "http://localhost:3000",
    
        "frontendDist": "../out"
    
      }
    
    }
[/code]

  2. ##### [Update Next.js configuration](#update-nextjs-configuration)

[Section titled “Update Next.js configuration”](#update-nextjs-configuration)

next.conf.mjs
[code]const isProd = process.env.NODE_ENV === 'production';
         
         
         
         
         const internalHost = process.env.TAURI_DEV_HOST || 'localhost';
         
         
         
         
         /** @type {import('next').NextConfig} */
         
         const nextConfig = {
         
           // Ensure Next.js uses SSG instead of SSR
         
           // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
         
           output: 'export',
         
           // Note: This feature is required to use the Next.js Image component in SSG mode.
         
           // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
         
           images: {
         
             unoptimized: true,
         
           },
         
           // Configure assetPrefix or else the server won't properly resolve your assets.
         
           assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
         
         };
         
         
         
         
         export default nextConfig;
[/code]

  3. ##### [Update package.json configuration](#update-packagejson-configuration)

[Section titled “Update package.json configuration”](#update-packagejson-configuration)
[code] "scripts": {
         
           "dev": "next dev",
         
           "build": "next build",
         
           "start": "next start",
         
           "lint": "next lint",
         
           "tauri": "tauri"
         
         }
[/code]


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend/nextjs](https://v2.tauri.app/start/frontend/nextjs)