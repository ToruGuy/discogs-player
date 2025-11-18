# Positioner

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/positioner) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-positioner) [ crates.io ](https://crates.io/crates/tauri-plugin-positioner)

API Reference [ ](/reference/javascript/positioner/) [ ](https://docs.rs/tauri-plugin-positioner)

Position your windows at well-known locations.

This plugin is a port of [electron-positioner](https://github.com/jenslind/electron-positioner) for Tauri.

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

Install the positioner plugin to get started.

  * [ Automatic ](#tab-panel-1400)
  * [ Manual ](#tab-panel-1401)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1389)
  * [ yarn ](#tab-panel-1390)
  * [ pnpm ](#tab-panel-1391)
  * [ deno ](#tab-panel-1392)
  * [ bun ](#tab-panel-1393)
  * [ cargo ](#tab-panel-1394)


[code] 
    npm run tauri add positioner
[/code]
[code] 
    yarn run tauri add positioner
[/code]
[code] 
    pnpm tauri add positioner
[/code]
[code] 
    deno task tauri add positioner
[/code]
[code] 
    bun tauri add positioner
[/code]
[code] 
    cargo tauri add positioner
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-positioner --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .setup(|app| {
         
                     #[cfg(desktop)]
         
                     app.handle().plugin(tauri_plugin_positioner::init());
         
                     Ok(())
         
                 })
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1395)
     * [ yarn ](#tab-panel-1396)
     * [ pnpm ](#tab-panel-1397)
     * [ deno ](#tab-panel-1398)
     * [ bun ](#tab-panel-1399)
[code] npm install @tauri-apps/plugin-positioner
[/code]
[code] yarn add @tauri-apps/plugin-positioner
[/code]
[code] pnpm add @tauri-apps/plugin-positioner
[/code]
[code] deno add npm:@tauri-apps/plugin-positioner
[/code]
[code] bun add @tauri-apps/plugin-positioner
[/code]


Additional setup is required to get tray-relative positions to work.

  1. Add `tray-icon` feature to your `Cargo.toml` file:

src-tauri/Cargo.toml
[code][dependencies]
         
         tauri-plugin-positioner = { version = "2.0.0", features = ["tray-icon"] }
[/code]

  2. Setup `on_tray_event` for positioner plugin:

src-tauri/src/lib.rs
[code]pub fn run() {
         
           tauri::Builder::default()
         
             // This is required to get tray-relative positions to work
         
             .setup(|app| {
         
                 #[cfg(desktop)]
         
                 {
         
                   app.handle().plugin(tauri_plugin_positioner::init());
         
                     tauri::tray::TrayIconBuilder::new()
         
                       .on_tray_icon_event(|tray_handle, event| {
         
                         tauri_plugin_positioner::on_tray_event(tray_handle.app_handle(), &event);
         
                       })
         
                       .build(app)?;
         
                 }
         
               Ok(())
         
             })
         
             .run(tauri::generate_context!())
         
             .expect("error while running tauri application");
         
         }
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The plugin’s APIs are available through the JavaScript guest bindings:
[code] 
    import { moveWindow, Position } from '@tauri-apps/plugin-positioner';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { moveWindow, Position } = window.__TAURI__.positioner;
    
    
    
    
    moveWindow(Position.TopRight);
[/code]

You can import and use the Window trait extension directly through Rust:
[code] 
    use tauri_plugin_positioner::{WindowExt, Position};
    
    
    
    
    let mut win = app.get_webview_window("main").unwrap();
    
    let _ = win.as_ref().window().move_window(Position::TopRight);
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
    
        "positioner:default",
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

Allows the moveWindow and handleIconState APIs

#### This default permission set includes the following:

  * `allow-move-window`
  * `allow-move-window-constrained`
  * `allow-set-tray-icon-state`


## Permission Table

Identifier | Description  
---|---  
`positioner:allow-move-window` |  Enables the move_window command without any pre-configured scope.  
`positioner:deny-move-window` |  Denies the move_window command without any pre-configured scope.  
`positioner:allow-move-window-constrained` |  Enables the move_window_constrained command without any pre-configured scope.  
`positioner:deny-move-window-constrained` |  Denies the move_window_constrained command without any pre-configured scope.  
`positioner:allow-set-tray-icon-state` |  Enables the set_tray_icon_state command without any pre-configured scope.  
`positioner:deny-set-tray-icon-state` |  Denies the set_tray_icon_state command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/positioner](https://v2.tauri.app/plugin/positioner)