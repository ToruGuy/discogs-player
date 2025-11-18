# Websocket

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/websocket) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-websocket) [ crates.io ](https://crates.io/crates/tauri-plugin-websocket)

API Reference [ ](/reference/javascript/websocket/) [ ](https://docs.rs/tauri-plugin-websocket)

Open a WebSocket connection using a Rust client in JavaScript.

## [Supported Platforms](#supported-platforms)

[Section titled “Supported Platforms”](#supported-platforms)

_This plugin requires a Rust version of at least**1.77.2**_

Platform | Level | Notes  
---|---|---  
windows |  |   
linux |  |   
macos |  |   
android |  |   
ios |  |   
  
## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the websocket plugin to get started.

  * [ Automatic ](#tab-panel-1545)
  * [ Manual ](#tab-panel-1546)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1534)
  * [ yarn ](#tab-panel-1535)
  * [ pnpm ](#tab-panel-1536)
  * [ deno ](#tab-panel-1537)
  * [ bun ](#tab-panel-1538)
  * [ cargo ](#tab-panel-1539)


[code] 
    npm run tauri add websocket
[/code]
[code] 
    yarn run tauri add websocket
[/code]
[code] 
    pnpm tauri add websocket
[/code]
[code] 
    deno task tauri add websocket
[/code]
[code] 
    bun tauri add websocket
[/code]
[code] 
    cargo tauri add websocket
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-websocket
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_websocket::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1540)
     * [ yarn ](#tab-panel-1541)
     * [ pnpm ](#tab-panel-1542)
     * [ deno ](#tab-panel-1543)
     * [ bun ](#tab-panel-1544)
[code] npm install @tauri-apps/plugin-websocket
[/code]
[code] yarn add @tauri-apps/plugin-websocket
[/code]
[code] pnpm add @tauri-apps/plugin-websocket
[/code]
[code] deno add npm:@tauri-apps/plugin-websocket
[/code]
[code] bun add @tauri-apps/plugin-websocket
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The websocket plugin is available in JavaScript.
[code] 
    import WebSocket from '@tauri-apps/plugin-websocket';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const WebSocket = window.__TAURI__.websocket;
    
    
    
    
    const ws = await WebSocket.connect('ws://127.0.0.1:8080');
    
    
    
    
    ws.addListener((msg) => {
    
      console.log('Received Message:', msg);
    
    });
    
    
    
    
    await ws.send('Hello World!');
    
    
    
    
    await ws.disconnect();
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": ["websocket:default"]
    
    }
[/code]

## [Default Permission](#default-permission)

Allows connecting and sending data to a WebSocket server

#### This default permission set includes the following:

  * `allow-connect`
  * `allow-send`


## Permission Table

Identifier | Description  
---|---  
`websocket:allow-connect` |  Enables the connect command without any pre-configured scope.  
`websocket:deny-connect` |  Denies the connect command without any pre-configured scope.  
`websocket:allow-send` |  Enables the send command without any pre-configured scope.  
`websocket:deny-send` |  Denies the send command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/websocket](https://v2.tauri.app/plugin/websocket)