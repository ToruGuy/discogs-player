# Localhost

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/localhost) [ crates.io ](https://crates.io/crates/tauri-plugin-localhost)

API Reference [ ](https://docs.rs/tauri-plugin-localhost)

Expose your app’s assets through a localhost server instead of the default custom protocol.

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

Install the localhost plugin to get started.

  * [ Automatic ](#tab-panel-1299)
  * [ Manual ](#tab-panel-1300)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1293)
  * [ yarn ](#tab-panel-1294)
  * [ pnpm ](#tab-panel-1295)
  * [ deno ](#tab-panel-1296)
  * [ bun ](#tab-panel-1297)
  * [ cargo ](#tab-panel-1298)


[code] 
    npm run tauri add localhost
[/code]
[code] 
    yarn run tauri add localhost
[/code]
[code] 
    pnpm tauri add localhost
[/code]
[code] 
    deno task tauri add localhost
[/code]
[code] 
    bun tauri add localhost
[/code]
[code] 
    cargo tauri add localhost
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-localhost
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_localhost::Builder::new().build())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The localhost plugin is available in Rust.

src-tauri/src/lib.rs
[code]
    use tauri::{webview::WebviewWindowBuilder, WebviewUrl};
    
    
    
    
    pub fn run() {
    
      let port: u16 = 9527;
    
    
    
    
      tauri::Builder::default()
    
          .plugin(tauri_plugin_localhost::Builder::new(port).build())
    
          .setup(move |app| {
    
              let url = format!("http://localhost:{}", port).parse().unwrap();
    
              WebviewWindowBuilder::new(app, "main".to_string(), WebviewUrl::External(url))
    
                  .title("Localhost Example")
    
                  .build()?;
    
              Ok(())
    
          })
    
          .run(tauri::generate_context!())
    
          .expect("error while running tauri application");
    
    }
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/localhost](https://v2.tauri.app/plugin/localhost)