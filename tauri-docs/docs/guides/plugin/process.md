# Process

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/process) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-process) [ crates.io ](https://crates.io/crates/tauri-plugin-process)

API Reference [ ](/reference/javascript/process/) [ ](https://docs.rs/tauri-plugin-process)

This plugin provides APIs to access the current process. To spawn child processes, see the [shell](/plugin/shell/) plugin.

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

Install the plugin-process to get started.

  * [ Automatic ](#tab-panel-1415)
  * [ Manual ](#tab-panel-1416)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1404)
  * [ yarn ](#tab-panel-1405)
  * [ pnpm ](#tab-panel-1406)
  * [ deno ](#tab-panel-1407)
  * [ bun ](#tab-panel-1408)
  * [ cargo ](#tab-panel-1409)


[code] 
    npm run tauri add process
[/code]
[code] 
    yarn run tauri add process
[/code]
[code] 
    pnpm tauri add process
[/code]
[code] 
    deno task tauri add process
[/code]
[code] 
    bun tauri add process
[/code]
[code] 
    cargo tauri add process
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-process
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_process::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. If you’d like to utilize the plugin in JavaScript then install the npm package as well:

     * [ npm ](#tab-panel-1410)
     * [ yarn ](#tab-panel-1411)
     * [ pnpm ](#tab-panel-1412)
     * [ deno ](#tab-panel-1413)
     * [ bun ](#tab-panel-1414)
[code] npm install @tauri-apps/plugin-process
[/code]
[code] yarn add @tauri-apps/plugin-process
[/code]
[code] pnpm add @tauri-apps/plugin-process
[/code]
[code] deno add npm:@tauri-apps/plugin-process
[/code]
[code] bun add @tauri-apps/plugin-process
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The process plugin is available in both JavaScript and Rust.

  * [ JavaScript ](#tab-panel-1402)
  * [ Rust ](#tab-panel-1403)


[code] 
    import { exit, relaunch } from '@tauri-apps/plugin-process';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { exit, relaunch } = window.__TAURI__.process;
    
    
    
    
    // exits the app with the given status code
    
    await exit(0);
    
    
    
    
    // restarts the app
    
    await relaunch();
[/code]

Note that `app` is an instance of [`AppHandle`](https://docs.rs/tauri/2.0.0/tauri/struct.AppHandle.html).
[code]
    // exits the app with the given status code
    
    app.exit(0);
    
    
    
    
    // restarts the app
    
    app.restart();
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      "permissions": [
    
        ...,
    
        "process:default",
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures which process features are by default exposed.

#### [Granted Permissions](#granted-permissions)

This enables to quit via `allow-exit` and restart via `allow-restart` the application.

#### This default permission set includes the following:

  * `allow-exit`
  * `allow-restart`


## Permission Table

Identifier | Description  
---|---  
`process:allow-exit` |  Enables the exit command without any pre-configured scope.  
`process:deny-exit` |  Denies the exit command without any pre-configured scope.  
`process:allow-restart` |  Enables the restart command without any pre-configured scope.  
`process:deny-restart` |  Denies the restart command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/process](https://v2.tauri.app/plugin/process)