# Clipboard

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/clipboard-manager) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-clipboard-manager) [ crates.io ](https://crates.io/crates/tauri-plugin-clipboard-manager)

API Reference [ ](/reference/javascript/clipboard-manager/) [ ](https://docs.rs/tauri-plugin-clipboard-manager)

Read and write to the system clipboard using the clipboard plugin.

## [Supported Platforms](#supported-platforms)

[Section titled “Supported Platforms”](#supported-platforms)

_This plugin requires a Rust version of at least**1.77.2**_

Platform | Level | Notes  
---|---|---  
windows |  |   
linux |  |   
macos |  |   
android |  |  Only plain-text content support  
ios |  |  Only plain-text content support  
  
## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the clipboard plugin to get started.

  * [ Automatic ](#tab-panel-1220)
  * [ Manual ](#tab-panel-1221)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1209)
  * [ yarn ](#tab-panel-1210)
  * [ pnpm ](#tab-panel-1211)
  * [ deno ](#tab-panel-1212)
  * [ bun ](#tab-panel-1213)
  * [ cargo ](#tab-panel-1214)


[code] 
    npm run tauri add clipboard-manager
[/code]
[code] 
    yarn run tauri add clipboard-manager
[/code]
[code] 
    pnpm tauri add clipboard-manager
[/code]
[code] 
    deno task tauri add clipboard-manager
[/code]
[code] 
    bun tauri add clipboard-manager
[/code]
[code] 
    cargo tauri add clipboard-manager
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-clipboard-manager
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_clipboard_manager::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. If you’d like to manage the clipboard in JavaScript then install the npm package as well:

     * [ npm ](#tab-panel-1215)
     * [ yarn ](#tab-panel-1216)
     * [ pnpm ](#tab-panel-1217)
     * [ deno ](#tab-panel-1218)
     * [ bun ](#tab-panel-1219)
[code] npm install @tauri-apps/plugin-clipboard-manager
[/code]
[code] yarn add @tauri-apps/plugin-clipboard-manager
[/code]
[code] pnpm add @tauri-apps/plugin-clipboard-manager
[/code]
[code] deno add npm:@tauri-apps/plugin-clipboard-manager
[/code]
[code] bun add @tauri-apps/plugin-clipboard-manager
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The clipboard plugin is available in both JavaScript and Rust.

  * [ JavaScript ](#tab-panel-1207)
  * [ Rust ](#tab-panel-1208)


[code] 
    import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { writeText, readText } = window.__TAURI__.clipboardManager;
    
    
    
    
    // Write content to clipboard
    
    await writeText('Tauri is awesome!');
    
    
    
    
    // Read content from clipboard
    
    const content = await readText();
    
    console.log(content);
    
    // Prints "Tauri is awesome!" to the console
[/code]
[code] 
    use tauri_plugin_clipboard_manager::ClipboardExt;
    
    
    
    
    app.clipboard().write_text("Tauri is awesome!".to_string()).unwrap();
    
    
    
    
    // Read content from clipboard
    
    let content = app.clipboard().read_text();
    
    println!("{:?}", content.unwrap());
    
    // Prints "Tauri is awesome!" to the terminal
[/code]

## [Default Permission](#default-permission)

No features are enabled by default, as we believe the clipboard can be inherently dangerous and it is application specific if read and/or write access is needed.

Clipboard interaction needs to be explicitly enabled.

## Permission Table

Identifier | Description  
---|---  
`clipboard-manager:allow-clear` |  Enables the clear command without any pre-configured scope.  
`clipboard-manager:deny-clear` |  Denies the clear command without any pre-configured scope.  
`clipboard-manager:allow-read-image` |  Enables the read_image command without any pre-configured scope.  
`clipboard-manager:deny-read-image` |  Denies the read_image command without any pre-configured scope.  
`clipboard-manager:allow-read-text` |  Enables the read_text command without any pre-configured scope.  
`clipboard-manager:deny-read-text` |  Denies the read_text command without any pre-configured scope.  
`clipboard-manager:allow-write-html` |  Enables the write_html command without any pre-configured scope.  
`clipboard-manager:deny-write-html` |  Denies the write_html command without any pre-configured scope.  
`clipboard-manager:allow-write-image` |  Enables the write_image command without any pre-configured scope.  
`clipboard-manager:deny-write-image` |  Denies the write_image command without any pre-configured scope.  
`clipboard-manager:allow-write-text` |  Enables the write_text command without any pre-configured scope.  
`clipboard-manager:deny-write-text` |  Denies the write_text command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/clipboard](https://v2.tauri.app/plugin/clipboard)