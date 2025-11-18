# Window State

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/window-state) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-window-state) [ crates.io ](https://crates.io/crates/tauri-plugin-window-state)

API Reference [ ](/reference/javascript/window-state/) [ ](https://docs.rs/tauri-plugin-window-state)

Save window positions and sizes and restore them when the app is reopened.

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

Install the window-state plugin to get started.

  * [ Automatic ](#tab-panel-1558)
  * [ Manual ](#tab-panel-1559)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1547)
  * [ yarn ](#tab-panel-1548)
  * [ pnpm ](#tab-panel-1549)
  * [ deno ](#tab-panel-1550)
  * [ bun ](#tab-panel-1551)
  * [ cargo ](#tab-panel-1552)


[code] 
    npm run tauri add window-state
[/code]
[code] 
    yarn run tauri add window-state
[/code]
[code] 
    pnpm tauri add window-state
[/code]
[code] 
    deno task tauri add window-state
[/code]
[code] 
    bun tauri add window-state
[/code]
[code] 
    cargo tauri add window-state
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-window-state --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .setup(|app| {
         
                     #[cfg(desktop)]
         
                     app.handle().plugin(tauri_plugin_window_state::Builder::default().build());
         
                     Ok(())
         
                 })
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1553)
     * [ yarn ](#tab-panel-1554)
     * [ pnpm ](#tab-panel-1555)
     * [ deno ](#tab-panel-1556)
     * [ bun ](#tab-panel-1557)
[code] npm install @tauri-apps/plugin-window-state
[/code]
[code] yarn add @tauri-apps/plugin-window-state
[/code]
[code] pnpm add @tauri-apps/plugin-window-state
[/code]
[code] deno add npm:@tauri-apps/plugin-window-state
[/code]
[code] bun add @tauri-apps/plugin-window-state
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

After adding the window-state plugin, all windows will remember their state when the app is being closed and will restore to their previous state on the next launch.

You can also access the window-state plugin in both JavaScript and Rust.

### [JavaScript](#javascript)

[Section titled “JavaScript”](#javascript)

You can use `saveWindowState` to manually save the window state:
[code] 
    import { saveWindowState, StateFlags } from '@tauri-apps/plugin-window-state';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { saveWindowState, StateFlags } = window.__TAURI__.windowState;
    
    
    
    
    saveWindowState(StateFlags.ALL);
[/code]

Similarly you can manually restore a window’s state from disk:
[code] 
    import {
    
      restoreStateCurrent,
    
      StateFlags,
    
    } from '@tauri-apps/plugin-window-state';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { restoreStateCurrent, StateFlags } = window.__TAURI__.windowState;
    
    
    
    
    restoreStateCurrent(StateFlags.ALL);
[/code]

### [Rust](#rust)

[Section titled “Rust”](#rust)

You can use the `save_window_state()` method exposed by the `AppHandleExt` trait:
[code] 
    use tauri_plugin_window_state::{AppHandleExt, StateFlags};
    
    
    
    
    // `tauri::AppHandle` now has the following additional method
    
    app.save_window_state(StateFlags::all()); // will save the state of all open windows to disk
[/code]

Similarly you can manually restore a window’s state from disk using the `restore_state()` method exposed by the `WindowExt` trait:
[code] 
    use tauri_plugin_window_state::{WindowExt, StateFlags};
    
    
    
    
    // all `Window` types now have the following additional method
    
    window.restore_state(StateFlags::all()); // will restore the window's state from disk
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
    
        "window-state:default",
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures what kind of operations are available from the window state plugin.

#### [Granted Permissions](#granted-permissions)

All operations are enabled by default.

#### This default permission set includes the following:

  * `allow-filename`
  * `allow-restore-state`
  * `allow-save-window-state`


## Permission Table

Identifier | Description  
---|---  
`window-state:allow-filename` |  Enables the filename command without any pre-configured scope.  
`window-state:deny-filename` |  Denies the filename command without any pre-configured scope.  
`window-state:allow-restore-state` |  Enables the restore_state command without any pre-configured scope.  
`window-state:deny-restore-state` |  Denies the restore_state command without any pre-configured scope.  
`window-state:allow-save-window-state` |  Enables the save_window_state command without any pre-configured scope.  
`window-state:deny-save-window-state` |  Denies the save_window_state command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/window-state](https://v2.tauri.app/plugin/window-state)