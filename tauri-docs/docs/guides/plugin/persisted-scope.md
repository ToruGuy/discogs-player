# Persisted Scope

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/persisted-scope) [ crates.io ](https://crates.io/crates/tauri-plugin-persisted-scope)

API Reference [ ](https://docs.rs/tauri-plugin-persisted-scope)

Save filesystem and asset scopes and restore them when the app is reopened.

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

Install the persisted-scope plugin to get started.

  * [ Automatic ](#tab-panel-1387)
  * [ Manual ](#tab-panel-1388)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1381)
  * [ yarn ](#tab-panel-1382)
  * [ pnpm ](#tab-panel-1383)
  * [ deno ](#tab-panel-1384)
  * [ bun ](#tab-panel-1385)
  * [ cargo ](#tab-panel-1386)


[code] 
    npm run tauri add persisted-scope
[/code]
[code] 
    yarn run tauri add persisted-scope
[/code]
[code] 
    pnpm tauri add persisted-scope
[/code]
[code] 
    deno task tauri add persisted-scope
[/code]
[code] 
    bun tauri add persisted-scope
[/code]
[code] 
    cargo tauri add persisted-scope
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-persisted-scope
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_persisted_scope::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

After setup the plugin will automatically save and restore filesystem and asset scopes.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/persisted-scope](https://v2.tauri.app/plugin/persisted-scope)