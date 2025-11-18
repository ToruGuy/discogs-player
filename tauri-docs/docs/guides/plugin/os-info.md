# OS Information

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/os) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-os) [ crates.io ](https://crates.io/crates/tauri-plugin-os)

API Reference [ ](/reference/javascript/os/) [ ](https://docs.rs/tauri-plugin-os)

Read information about the operating system using the OS Information plugin.

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

Install the OS Information plugin to get started.

  * [ Automatic ](#tab-panel-1379)
  * [ Manual ](#tab-panel-1380)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1368)
  * [ yarn ](#tab-panel-1369)
  * [ pnpm ](#tab-panel-1370)
  * [ deno ](#tab-panel-1371)
  * [ bun ](#tab-panel-1372)
  * [ cargo ](#tab-panel-1373)


[code] 
    npm run tauri add os
[/code]
[code] 
    yarn run tauri add os
[/code]
[code] 
    pnpm tauri add os
[/code]
[code] 
    deno task tauri add os
[/code]
[code] 
    bun tauri add os
[/code]
[code] 
    cargo tauri add os
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-os
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_os::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. If you’d like to use in JavaScript then install the npm package as well:

     * [ npm ](#tab-panel-1374)
     * [ yarn ](#tab-panel-1375)
     * [ pnpm ](#tab-panel-1376)
     * [ deno ](#tab-panel-1377)
     * [ bun ](#tab-panel-1378)
[code] npm install @tauri-apps/plugin-os
[/code]
[code] yarn add @tauri-apps/plugin-os
[/code]
[code] pnpm add @tauri-apps/plugin-os
[/code]
[code] deno add npm:@tauri-apps/plugin-os
[/code]
[code] bun add @tauri-apps/plugin-os
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

With this plugin you can query multiple information from current operational system. See all available functions in the [JavaScript API](/reference/javascript/os/) or [Rust API](https://docs.rs/tauri-plugin-os/) references.

#### [Example: OS Platform](#example-os-platform)

[Section titled “Example: OS Platform”](#example-os-platform)

`platform` returns a string describing the specific operating system in use. The value is set at compile time. Possible values are `linux`, `macos`, `ios`, `freebsd`, `dragonfly`, `netbsd`, `openbsd`, `solaris`, `android`, `windows`.

  * [ JavaScript ](#tab-panel-1366)
  * [ Rust ](#tab-panel-1367)


[code] 
    import { platform } from '@tauri-apps/plugin-os';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { platform } = window.__TAURI__.os;
    
    
    
    
    const currentPlatform = platform();
    
    console.log(currentPlatform);
    
    // Prints "windows" to the console
[/code]
[code] 
    let platform = tauri_plugin_os::platform();
    
    println!("Platform: {}", platform);
    
    // Prints "windows" to the terminal
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
    
        "os:default"
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures which operating system information are available to gather from the frontend.

#### [Granted Permissions](#granted-permissions)

All information except the host name are available.

#### This default permission set includes the following:

  * `allow-arch`
  * `allow-exe-extension`
  * `allow-family`
  * `allow-locale`
  * `allow-os-type`
  * `allow-platform`
  * `allow-version`


## Permission Table

Identifier | Description  
---|---  
`os:allow-arch` |  Enables the arch command without any pre-configured scope.  
`os:deny-arch` |  Denies the arch command without any pre-configured scope.  
`os:allow-exe-extension` |  Enables the exe_extension command without any pre-configured scope.  
`os:deny-exe-extension` |  Denies the exe_extension command without any pre-configured scope.  
`os:allow-family` |  Enables the family command without any pre-configured scope.  
`os:deny-family` |  Denies the family command without any pre-configured scope.  
`os:allow-hostname` |  Enables the hostname command without any pre-configured scope.  
`os:deny-hostname` |  Denies the hostname command without any pre-configured scope.  
`os:allow-locale` |  Enables the locale command without any pre-configured scope.  
`os:deny-locale` |  Denies the locale command without any pre-configured scope.  
`os:allow-os-type` |  Enables the os_type command without any pre-configured scope.  
`os:deny-os-type` |  Denies the os_type command without any pre-configured scope.  
`os:allow-platform` |  Enables the platform command without any pre-configured scope.  
`os:deny-platform` |  Denies the platform command without any pre-configured scope.  
`os:allow-version` |  Enables the version command without any pre-configured scope.  
`os:deny-version` |  Denies the version command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/os-info](https://v2.tauri.app/plugin/os-info)