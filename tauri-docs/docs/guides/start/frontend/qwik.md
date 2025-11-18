# Qwik

This guide will walk you through creating your Tauri app using the Qwik web framework. Learn more about Qwik at <https://qwik.dev>.

## [Checklist](#checklist)

[Section titled “Checklist”](#checklist)

  * Use [SSG](https://qwik.dev/docs/guides/static-site-generation/). Tauri doesn’t support server-based solutions.
  * Use `dist/` as `frontendDist` in `tauri.conf.json`.


## [Example Configuration](#example-configuration)

[Section titled “Example Configuration”](#example-configuration)

  1. ##### [Create a new Qwik app](#create-a-new-qwik-app)

[Section titled “Create a new Qwik app”](#create-a-new-qwik-app)

     * [ npm ](#tab-panel-2867)
     * [ yarn ](#tab-panel-2868)
     * [ pnpm ](#tab-panel-2869)
     * [ deno ](#tab-panel-2870)
[code] npm create qwik@latest
    
    cd <PROJECT>
[/code]
[code] yarn create qwik@latest
    
    cd <PROJECT>
[/code]
[code] pnpm create qwik@latest
    
    cd <PROJECT>
[/code]
[code] deno run -A npm:create-qwik@latest
    
    cd <PROJECT>
[/code]

  2. ##### [Install the `static adapter`](#install-the-static-adapter)

[Section titled “Install the static adapter”](#install-the-static-adapter)

     * [ npm ](#tab-panel-2871)
     * [ yarn ](#tab-panel-2872)
     * [ pnpm ](#tab-panel-2873)
     * [ deno ](#tab-panel-2874)
[code] npm run qwik add static
[/code]
[code] yarn qwik add static
[/code]
[code] pnpm qwik add static
[/code]
[code] deno task qwik add static
[/code]

  3. ##### [Add the Tauri CLI to your project](#add-the-tauri-cli-to-your-project)

[Section titled “Add the Tauri CLI to your project”](#add-the-tauri-cli-to-your-project)

     * [ npm ](#tab-panel-2875)
     * [ yarn ](#tab-panel-2876)
     * [ pnpm ](#tab-panel-2877)
     * [ deno ](#tab-panel-2878)
[code] npm install -D @tauri-apps/cli@latest
[/code]
[code] yarn add -D @tauri-apps/cli@latest
[/code]
[code] pnpm add -D @tauri-apps/cli@latest
[/code]
[code] deno add -D npm:@tauri-apps/cli@latest
[/code]

  4. ##### [Initiate a new Tauri project](#initiate-a-new-tauri-project)

[Section titled “Initiate a new Tauri project”](#initiate-a-new-tauri-project)

     * [ npm ](#tab-panel-2879)
     * [ yarn ](#tab-panel-2880)
     * [ pnpm ](#tab-panel-2881)
     * [ deno ](#tab-panel-2882)
[code] npm run tauri init
[/code]
[code] yarn tauri init
[/code]
[code] pnpm tauri init
[/code]
[code] deno task tauri init
[/code]

  5. ##### [Tauri configuration](#tauri-configuration)

[Section titled “Tauri configuration”](#tauri-configuration)

     * [ npm ](#tab-panel-2863)
     * [ yarn ](#tab-panel-2864)
     * [ pnpm ](#tab-panel-2865)
     * [ deno ](#tab-panel-2866)

tauri.conf.json
[code]{
    
      "build": {
    
        "devUrl": "http://localhost:5173"
    
        "frontendDist": "../dist",
    
        "beforeDevCommand": "npm run dev",
    
        "beforeBuildCommand": "npm run build"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "devUrl": "http://localhost:5173"
    
        "frontendDist": "../dist",
    
        "beforeDevCommand": "yarn dev",
    
        "beforeBuildCommand": "yarn build"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "devUrl": "http://localhost:5173"
    
        "frontendDist": "../dist",
    
        "beforeDevCommand": "pnpm dev",
    
        "beforeBuildCommand": "pnpm build"
    
      }
    
    }
[/code]

tauri.conf.json
[code]{
    
      "build": {
    
        "devUrl": "http://localhost:5173"
    
        "frontendDist": "../dist",
    
        "beforeDevCommand": "deno task dev",
    
        "beforeBuildCommand": "deno task build"
    
      }
    
    }
[/code]

  6. ##### [Start your `tauri` app](#start-your-tauri-app)

[Section titled “Start your tauri app”](#start-your-tauri-app)

     * [ npm ](#tab-panel-2883)
     * [ yarn ](#tab-panel-2884)
     * [ pnpm ](#tab-panel-2885)
     * [ deno ](#tab-panel-2886)
[code] npm run tauri dev
[/code]
[code] yarn tauri dev
[/code]
[code] pnpm tauri dev
[/code]
[code] deno task tauri dev
[/code]


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/frontend/qwik](https://v2.tauri.app/start/frontend/qwik)