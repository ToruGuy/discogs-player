# Upload

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/upload) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-upload) [ crates.io ](https://crates.io/crates/tauri-plugin-upload)

API Reference [ ](/reference/javascript/upload/) [ ](https://docs.rs/tauri-plugin-upload)

Upload files from disk to a remote server over HTTP. Download files from a remote HTTP server to disk.

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

  * [ Automatic ](#tab-panel-1503)
  * [ Manual ](#tab-panel-1504)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1492)
  * [ yarn ](#tab-panel-1493)
  * [ pnpm ](#tab-panel-1494)
  * [ deno ](#tab-panel-1495)
  * [ bun ](#tab-panel-1496)
  * [ cargo ](#tab-panel-1497)


[code] 
    npm run tauri add upload
[/code]
[code] 
    yarn run tauri add upload
[/code]
[code] 
    pnpm tauri add upload
[/code]
[code] 
    deno task tauri add upload
[/code]
[code] 
    bun tauri add upload
[/code]
[code] 
    cargo tauri add upload
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-upload
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
           tauri::Builder::default()
         
             .plugin(tauri_plugin_upload::init())
         
               .run(tauri::generate_context!())
         
               .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1498)
     * [ yarn ](#tab-panel-1499)
     * [ pnpm ](#tab-panel-1500)
     * [ deno ](#tab-panel-1501)
     * [ bun ](#tab-panel-1502)
[code] npm install @tauri-apps/plugin-upload
[/code]
[code] yarn add @tauri-apps/plugin-upload
[/code]
[code] pnpm add @tauri-apps/plugin-upload
[/code]
[code] deno add npm:@tauri-apps/plugin-upload
[/code]
[code] bun add @tauri-apps/plugin-upload
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

Once you’ve completed the registration and setup process for the plugin, you can access all of its APIs through the JavaScript guest bindings.

Here’s an example of how you can use the plugin to upload and download files:
[code] 
    import { upload } from '@tauri-apps/plugin-upload';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { upload } = window.__TAURI__.upload;
    
    
    
    
    upload(
    
      'https://example.com/file-upload',
    
      './path/to/my/file.txt',
    
      ({ progress, total }) =>
    
        console.log(`Uploaded ${progress} of ${total} bytes`), // a callback that will be called with the upload progress
    
      { 'Content-Type': 'text/plain' } // optional headers to send with the request
    
    );
[/code]
[code] 
    import { download } from '@tauri-apps/plugin-upload';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { download } = window.__TAURI__.upload;
    
    
    
    
    download(
    
      'https://example.com/file-download-link',
    
      './path/to/save/my/file.txt',
    
      ({ progress, total }) =>
    
        console.log(`Downloaded ${progress} of ${total} bytes`), // a callback that will be called with the download progress
    
      { 'Content-Type': 'text/plain' } // optional headers to send with the request
    
    );
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
    
        "upload:default",
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures what kind of operations are available from the upload plugin.

#### [Granted Permissions](#granted-permissions)

All operations are enabled by default.

#### This default permission set includes the following:

  * `allow-upload`
  * `allow-download`


## Permission Table

Identifier | Description  
---|---  
`upload:allow-download` |  Enables the download command without any pre-configured scope.  
`upload:deny-download` |  Denies the download command without any pre-configured scope.  
`upload:allow-upload` |  Enables the upload command without any pre-configured scope.  
`upload:deny-upload` |  Denies the upload command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/upload](https://v2.tauri.app/plugin/upload)