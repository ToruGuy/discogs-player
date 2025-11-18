# Opener

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/opener) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-opener) [ crates.io ](https://crates.io/crates/tauri-plugin-opener)

API Reference [ ](/reference/javascript/opener/) [ ](https://docs.rs/tauri-plugin-opener)

This plugin allows you to open files and URLs in a specified, or the default, application. It also supports “revealing” files in the system’s file explorer.

## [Supported Platforms](#supported-platforms)

[Section titled “Supported Platforms”](#supported-platforms)

_This plugin requires a Rust version of at least**1.77.2**_

Platform | Level | Notes  
---|---|---  
windows |  |   
linux |  |   
macos |  |   
android |  |  Only allows to open URLs via `open`  
ios |  |  Only allows to open URLs via `open`  
  
## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the opener plugin to get started.

  * [ Automatic ](#tab-panel-1364)
  * [ Manual ](#tab-panel-1365)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1353)
  * [ yarn ](#tab-panel-1354)
  * [ pnpm ](#tab-panel-1355)
  * [ deno ](#tab-panel-1356)
  * [ bun ](#tab-panel-1357)
  * [ cargo ](#tab-panel-1358)


[code] 
    npm run tauri add opener
[/code]
[code] 
    yarn run tauri add opener
[/code]
[code] 
    pnpm tauri add opener
[/code]
[code] 
    deno task tauri add opener
[/code]
[code] 
    bun tauri add opener
[/code]
[code] 
    cargo tauri add opener
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-opener
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_opener::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1359)
     * [ yarn ](#tab-panel-1360)
     * [ pnpm ](#tab-panel-1361)
     * [ deno ](#tab-panel-1362)
     * [ bun ](#tab-panel-1363)
[code] npm install @tauri-apps/plugin-opener
[/code]
[code] yarn add @tauri-apps/plugin-opener
[/code]
[code] pnpm add @tauri-apps/plugin-opener
[/code]
[code] deno add npm:@tauri-apps/plugin-opener
[/code]
[code] bun add @tauri-apps/plugin-opener
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The opener plugin is available in both JavaScript and Rust.

  * [ JavaScript ](#tab-panel-1351)
  * [ Rust ](#tab-panel-1352)


[code] 
    import { openPath, openUrl } from '@tauri-apps/plugin-opener';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { openPath } = window.__TAURI__.opener;
    
    
    
    
    // opens a file using the default program:
    
    await openPath('/path/to/file');
    
    // opens a file using `vlc` command on Windows:
    
    await openPath('C:/path/to/file', 'vlc');
    
    // opens a URL using the default program:
    
    await openURL('https://tauri.app');
[/code]

Note that `app` is an instance of `App` or [`AppHandle`](https://docs.rs/tauri/2.0.0/tauri/struct.AppHandle.html).
[code]
    use tauri_plugin_opener::OpenerExt;
    
    
    
    
    // opens a file using the default program:
    
    app.opener().open_path("/path/to/file", None::<&str>);
    
    // opens a file using `vlc` command on Windows:
    
    app.opener().open_path("C:/path/to/file", Some("vlc"));
    
    // opens a URL using the default program:
    
    app.opener().open_url("https://tauri.app", None::<&str>);
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

Below are two example scope configurations. Both `path` and `url` use the [glob pattern syntax](https://docs.rs/glob/latest/glob/struct.Pattern.html) to define allowed file paths and URLs.

First, an example on how to add permissions to specific paths for the `openPath()` function:

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": [
    
        {
    
          "identifier": "opener:allow-open-path",
    
          "allow": [
    
            {
    
              "path": "/path/to/file"
    
            },
    
            {
    
              "path": "$APPDATA/file"
    
            }
    
          ]
    
        }
    
      ]
    
    }
[/code]

Lastly, an example on how to add permissions for the exact `https://tauri.app` URL and all URLs on a custom protocol (must be known to the OS) for the `openUrl()` function:

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": [
    
        {
    
          "identifier": "opener:allow-open-url",
    
          "allow": [
    
            {
    
              "url": "https://tauri.app"
    
            },
    
            {
    
              "url": "custom:*"
    
            }
    
          ]
    
        }
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set allows opening `mailto:`, `tel:`, `https://` and `http://` urls using their default application as well as reveal file in directories using default file explorer

#### This default permission set includes the following:

  * `allow-open-url`
  * `allow-reveal-item-in-dir`
  * `allow-default-urls`


## Permission Table

Identifier | Description  
---|---  
`opener:allow-default-urls` |  This enables opening `mailto:`, `tel:`, `https://` and `http://` urls using their default application.  
`opener:allow-open-path` |  Enables the open_path command without any pre-configured scope.  
`opener:deny-open-path` |  Denies the open_path command without any pre-configured scope.  
`opener:allow-open-url` |  Enables the open_url command without any pre-configured scope.  
`opener:deny-open-url` |  Denies the open_url command without any pre-configured scope.  
`opener:allow-reveal-item-in-dir` |  Enables the reveal_item_in_dir command without any pre-configured scope.  
`opener:deny-reveal-item-in-dir` |  Denies the reveal_item_in_dir command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/opener](https://v2.tauri.app/plugin/opener)