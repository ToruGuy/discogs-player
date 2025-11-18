# Barcode Scanner

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/barcode-scanner) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-barcode-scanner) [ crates.io ](https://crates.io/crates/tauri-plugin-barcode-scanner)

API Reference [ ](/reference/javascript/barcode-scanner/) [ ](https://docs.rs/tauri-plugin-barcode-scanner)

Allows your mobile application to use the camera to scan QR codes, EAN-13 and other kinds of barcodes.

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

Install the barcode-scanner plugin to get started.

  * [ Automatic ](#tab-panel-1158)
  * [ Manual ](#tab-panel-1159)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1147)
  * [ yarn ](#tab-panel-1148)
  * [ pnpm ](#tab-panel-1149)
  * [ deno ](#tab-panel-1150)
  * [ bun ](#tab-panel-1151)
  * [ cargo ](#tab-panel-1152)


[code] 
    npm run tauri add barcode-scanner
[/code]
[code] 
    yarn run tauri add barcode-scanner
[/code]
[code] 
    pnpm tauri add barcode-scanner
[/code]
[code] 
    deno task tauri add barcode-scanner
[/code]
[code] 
    bun tauri add barcode-scanner
[/code]
[code] 
    cargo tauri add barcode-scanner
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-barcode-scanner --target 'cfg(any(target_os = "android", target_os = "ios"))'
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .setup(|app| {
         
                     #[cfg(mobile)]
         
                     app.handle().plugin(tauri_plugin_barcode_scanner::init());
         
                     Ok(())
         
                 })
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1153)
     * [ yarn ](#tab-panel-1154)
     * [ pnpm ](#tab-panel-1155)
     * [ deno ](#tab-panel-1156)
     * [ bun ](#tab-panel-1157)
[code] npm install @tauri-apps/plugin-barcode-scanner
[/code]
[code] yarn add @tauri-apps/plugin-barcode-scanner
[/code]
[code] pnpm add @tauri-apps/plugin-barcode-scanner
[/code]
[code] deno add npm:@tauri-apps/plugin-barcode-scanner
[/code]
[code] bun add @tauri-apps/plugin-barcode-scanner
[/code]


## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

On iOS the barcode scanner plugin requires the `NSCameraUsageDescription` information property list value, which should describe why your app needs to use the camera.

In the `src-tauri/Info.ios.plist` file, add the following snippet:

src-tauri/Info.ios.plist
[code]
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    
    <plist version="1.0">
    
      <dict>
    
        <key>NSCameraUsageDescription</key>
    
        <string>Read QR codes</string>
    
      </dict>
    
    </plist>
[/code]

## [Usage](#usage)

[Section titled “Usage”](#usage)

The barcode scanner plugin is available in JavaScript.
[code] 
    import { scan, Format } from '@tauri-apps/plugin-barcode-scanner';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { scan, Format } = window.__TAURI__.barcodeScanner;
    
    
    
    
    // `windowed: true` actually sets the webview to transparent
    
    // instead of opening a separate view for the camera
    
    // make sure your user interface is ready to show what is underneath with a transparent element
    
    scan({ windowed: true, formats: [Format.QRCode] });
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/mobile.json
[code]
    {
    
      "$schema": "../gen/schemas/mobile-schema.json",
    
      "identifier": "mobile-capability",
    
      "windows": ["main"],
    
      "platforms": ["iOS", "android"],
    
      "permissions": ["barcode-scanner:allow-scan", "barcode-scanner:allow-cancel"]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures which barcode scanning features are by default exposed.

#### [Granted Permissions](#granted-permissions)

It allows all barcode related features.

#### This default permission set includes the following:

  * `allow-cancel`
  * `allow-check-permissions`
  * `allow-open-app-settings`
  * `allow-request-permissions`
  * `allow-scan`
  * `allow-vibrate`


## Permission Table

Identifier | Description  
---|---  
`barcode-scanner:allow-cancel` |  Enables the cancel command without any pre-configured scope.  
`barcode-scanner:deny-cancel` |  Denies the cancel command without any pre-configured scope.  
`barcode-scanner:allow-check-permissions` |  Enables the check_permissions command without any pre-configured scope.  
`barcode-scanner:deny-check-permissions` |  Denies the check_permissions command without any pre-configured scope.  
`barcode-scanner:allow-open-app-settings` |  Enables the open_app_settings command without any pre-configured scope.  
`barcode-scanner:deny-open-app-settings` |  Denies the open_app_settings command without any pre-configured scope.  
`barcode-scanner:allow-request-permissions` |  Enables the request_permissions command without any pre-configured scope.  
`barcode-scanner:deny-request-permissions` |  Denies the request_permissions command without any pre-configured scope.  
`barcode-scanner:allow-scan` |  Enables the scan command without any pre-configured scope.  
`barcode-scanner:deny-scan` |  Denies the scan command without any pre-configured scope.  
`barcode-scanner:allow-vibrate` |  Enables the vibrate command without any pre-configured scope.  
`barcode-scanner:deny-vibrate` |  Denies the vibrate command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/barcode-scanner](https://v2.tauri.app/plugin/barcode-scanner)