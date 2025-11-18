# Biometric

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/biometric) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-biometric) [ crates.io ](https://crates.io/crates/tauri-plugin-biometric)

API Reference [ ](/reference/javascript/biometric/) [ ](https://docs.rs/tauri-plugin-biometric)

Prompt the user for biometric authentication on Android and iOS.

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

Install the biometric plugin to get started.

  * [ Automatic ](#tab-panel-1190)
  * [ Manual ](#tab-panel-1191)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1179)
  * [ yarn ](#tab-panel-1180)
  * [ pnpm ](#tab-panel-1181)
  * [ deno ](#tab-panel-1182)
  * [ bun ](#tab-panel-1183)
  * [ cargo ](#tab-panel-1184)


[code] 
    npm run tauri add biometric
[/code]
[code] 
    yarn run tauri add biometric
[/code]
[code] 
    pnpm tauri add biometric
[/code]
[code] 
    deno task tauri add biometric
[/code]
[code] 
    bun tauri add biometric
[/code]
[code] 
    cargo tauri add biometric
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-biometric --target 'cfg(any(target_os = "android", target_os = "ios"))'
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .setup(|app| {
         
                     #[cfg(mobile)]
         
                     app.handle().plugin(tauri_plugin_biometric::Builder::new().build());
         
                     Ok(())
         
                 })
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1185)
     * [ yarn ](#tab-panel-1186)
     * [ pnpm ](#tab-panel-1187)
     * [ deno ](#tab-panel-1188)
     * [ bun ](#tab-panel-1189)
[code] npm install @tauri-apps/plugin-biometric
[/code]
[code] yarn add @tauri-apps/plugin-biometric
[/code]
[code] pnpm add @tauri-apps/plugin-biometric
[/code]
[code] deno add npm:@tauri-apps/plugin-biometric
[/code]
[code] bun add @tauri-apps/plugin-biometric
[/code]


## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

On iOS the biometric plugin requires the `NSFaceIDUsageDescription` information property list value, which should describe why your app needs to use biometric authentication.

In the `src-tauri/Info.ios.plist` file, add the following snippet:

src-tauri/Info.ios.plist
[code]
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    
    <plist version="1.0">
    
      <dict>
    
        <key>NSFaceIDUsageDescription</key>
    
        <string>Authenticate with biometric</string>
    
      </dict>
    
    </plist>
[/code]

## [Usage](#usage)

[Section titled “Usage”](#usage)

This plugin enables you to verify the availability of Biometric Authentication on a device, prompt the user for biometric authentication, and check the result to determine if the authentication was successful or not.

### [Check Status](#check-status)

[Section titled “Check Status”](#check-status)

You can check the status of Biometric Authentication, including its availability and the types of biometric authentication methods supported.

  * [ JavaScript ](#tab-panel-1175)
  * [ Rust ](#tab-panel-1176)


[code] 
    import { checkStatus } from '@tauri-apps/plugin-biometric';
    
    
    
    
    const status = await checkStatus();
    
    if (status.isAvailable) {
    
      console.log('Yes! Biometric Authentication is available');
    
    } else {
    
      console.log(
    
        'No! Biometric Authentication is not available due to ' + status.error
    
      );
    
    }
[/code]
[code] 
    use tauri_plugin_biometric::BiometricExt;
    
    
    
    
    fn check_biometric(app_handle: tauri::AppHandle) {
    
        let status = app_handle.biometric().status().unwrap();
    
        if status.is_available {
    
            println!("Yes! Biometric Authentication is available");
    
        } else {
    
            println!("No! Biometric Authentication is not available due to: {}", status.error.unwrap());
    
        }
    
    }
[/code]

### [Authenticate](#authenticate)

[Section titled “Authenticate”](#authenticate)

To prompt the user for Biometric Authentication, utilize the `authenticate()` method.

  * [ JavaScript ](#tab-panel-1177)
  * [ Rust ](#tab-panel-1178)


[code] 
    import { authenticate } from '@tauri-apps/plugin-biometric';
    
    
    
    
    const options = {
    
      // Set true if you want the user to be able to authenticate using phone password
    
      allowDeviceCredential: false,
    
      cancelTitle: "Feature won't work if Canceled",
    
    
    
    
      // iOS only feature
    
      fallbackTitle: 'Sorry, authentication failed',
    
    
    
    
      // Android only features
    
      title: 'Tauri feature',
    
      subtitle: 'Authenticate to access the locked Tauri function',
    
      confirmationRequired: true,
    
    };
    
    
    
    
    try {
    
      await authenticate('This feature is locked', options);
    
      console.log(
    
        'Hooray! Successfully Authenticated! We can now perform the locked Tauri function!'
    
      );
    
    } catch (err) {
    
      console.log('Oh no! Authentication failed because ' + err.message);
    
    }
[/code]
[code] 
    use tauri_plugin_biometric::{BiometricExt, AuthOptions};
    
    
    
    
    fn bio_auth(app_handle: tauri::AppHandle) {
    
    
    
    
        let options = AuthOptions {
    
            // Set True if you want the user to be able to authenticate using phone password
    
            allow_device_credential:false,
    
            cancel_title: Some("Feature won't work if Canceled".to_string()),
    
    
    
    
            // iOS only feature
    
            fallback_title: Some("Sorry, authentication failed".to_string()),
    
    
    
    
            // Android only features
    
            title: Some("Tauri feature".to_string()),
    
            subtitle: Some("Authenticate to access the locked Tauri function".to_string()),
    
            confirmation_required: Some(true),
    
        };
    
    
    
    
        // if the authentication was successful, the function returns Result::Ok()
    
        // otherwise returns Result::Error()
    
        match app_handle.biometric().authenticate("This feature is locked".to_string(), options) {
    
            Ok(_) => {
    
                println!("Hooray! Successfully Authenticated! We can now perform the locked Tauri function!");
    
            }
    
            Err(e) => {
    
                println!("Oh no! Authentication failed because : {e}");
    
            }
    
        }
    
    }
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": ["biometric:default"]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures which biometric features are by default exposed.

#### [Granted Permissions](#granted-permissions)

It allows acccess to all biometric commands.

#### This default permission set includes the following:

  * `allow-authenticate`
  * `allow-status`


## Permission Table

Identifier | Description  
---|---  
`biometric:allow-authenticate` |  Enables the authenticate command without any pre-configured scope.  
`biometric:deny-authenticate` |  Denies the authenticate command without any pre-configured scope.  
`biometric:allow-status` |  Enables the status command without any pre-configured scope.  
`biometric:deny-status` |  Denies the status command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/biometric](https://v2.tauri.app/plugin/biometric)