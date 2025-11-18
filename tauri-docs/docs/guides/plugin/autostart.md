# Autostart

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/autostart) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-autostart) [ crates.io ](https://crates.io/crates/tauri-plugin-autostart)

API Reference [ ](/reference/javascript/autostart/) [ ](https://docs.rs/tauri-plugin-autostart)

Automatically launch your application at system startup.

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

Install the autostart plugin to get started.

  * [ Automatic ](#tab-panel-1173)
  * [ Manual ](#tab-panel-1174)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1162)
  * [ yarn ](#tab-panel-1163)
  * [ pnpm ](#tab-panel-1164)
  * [ deno ](#tab-panel-1165)
  * [ bun ](#tab-panel-1166)
  * [ cargo ](#tab-panel-1167)


[code] 
    npm run tauri add autostart
[/code]
[code] 
    yarn run tauri add autostart
[/code]
[code] 
    pnpm tauri add autostart
[/code]
[code] 
    deno task tauri add autostart
[/code]
[code] 
    bun tauri add autostart
[/code]
[code] 
    cargo tauri add autostart
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-autostart --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .setup(|app| {
         
                     #[cfg(desktop)]
         
                     app.handle().plugin(tauri_plugin_autostart::init(tauri_plugin_autostart::MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"]) /* arbitrary number of args to pass to your app */));
         
                     Ok(())
         
                 })
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. You can install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1168)
     * [ yarn ](#tab-panel-1169)
     * [ pnpm ](#tab-panel-1170)
     * [ deno ](#tab-panel-1171)
     * [ bun ](#tab-panel-1172)
[code] npm install @tauri-apps/plugin-autostart
[/code]
[code] yarn add @tauri-apps/plugin-autostart
[/code]
[code] pnpm add @tauri-apps/plugin-autostart
[/code]
[code] deno add npm:@tauri-apps/plugin-autostart
[/code]
[code] bun add @tauri-apps/plugin-autostart
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The autostart plugin is available in both JavaScript and Rust.

  * [ JavaScript ](#tab-panel-1160)
  * [ Rust ](#tab-panel-1161)


[code] 
    import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { enable, isEnabled, disable } = window.__TAURI__.autostart;
    
    
    
    
    // Enable autostart
    
    await enable();
    
    // Check enable state
    
    console.log(`registered for autostart? ${await isEnabled()}`);
    
    // Disable autostart
    
    disable();
[/code]
[code] 
    #[cfg_attr(mobile, tauri::mobile_entry_point)]
    
    pub fn run() {
    
        tauri::Builder::default()
    
            .setup(|app| {
    
                #[cfg(desktop)]
    
                {
    
                    use tauri_plugin_autostart::MacosLauncher;
    
                    use tauri_plugin_autostart::ManagerExt;
    
    
    
    
                    app.handle().plugin(tauri_plugin_autostart::init(
    
                        MacosLauncher::LaunchAgent,
    
                        Some(vec!["--flag1", "--flag2"]),
    
                    ));
    
    
    
    
                    // Get the autostart manager
    
                    let autostart_manager = app.autolaunch();
    
                    // Enable autostart
    
                    let _ = autostart_manager.enable();
    
                    // Check enable state
    
                    println!("registered for autostart? {}", autostart_manager.is_enabled().unwrap());
    
                    // Disable autostart
    
                    let _ = autostart_manager.disable();
    
                }
    
                Ok(())
    
            })
    
            .run(tauri::generate_context!())
    
            .expect("error while running tauri application");
    
    }
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
    
        "autostart:allow-enable",
    
        "autostart:allow-disable",
    
        "autostart:allow-is-enabled"
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures if your application can enable or disable auto starting the application on boot.

#### [Granted Permissions](#granted-permissions)

It allows all to check, enable and disable the automatic start on boot.

#### This default permission set includes the following:

  * `allow-enable`
  * `allow-disable`
  * `allow-is-enabled`


## Permission Table

Identifier | Description  
---|---  
`autostart:allow-disable` |  Enables the disable command without any pre-configured scope.  
`autostart:deny-disable` |  Denies the disable command without any pre-configured scope.  
`autostart:allow-enable` |  Enables the enable command without any pre-configured scope.  
`autostart:deny-enable` |  Denies the enable command without any pre-configured scope.  
`autostart:allow-is-enabled` |  Enables the is_enabled command without any pre-configured scope.  
`autostart:deny-is-enabled` |  Denies the is_enabled command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/autostart](https://v2.tauri.app/plugin/autostart)