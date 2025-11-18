# Single Instance

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/single-instance) [ crates.io ](https://crates.io/crates/tauri-plugin-single-instance)

API Reference [ ](https://docs.rs/tauri-plugin-single-instance)

Ensure that a single instance of your tauri app is running at a time using the Single Instance Plugin.

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

Install the Single Instance plugin to get started.

  * [ Automatic ](#tab-panel-1438)
  * [ Manual ](#tab-panel-1439)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1432)
  * [ yarn ](#tab-panel-1433)
  * [ pnpm ](#tab-panel-1434)
  * [ deno ](#tab-panel-1435)
  * [ bun ](#tab-panel-1436)
  * [ cargo ](#tab-panel-1437)


[code] 
    npm run tauri add single-instance
[/code]
[code] 
    yarn run tauri add single-instance
[/code]
[code] 
    pnpm tauri add single-instance
[/code]
[code] 
    deno task tauri add single-instance
[/code]
[code] 
    bun tauri add single-instance
[/code]
[code] 
    cargo tauri add single-instance
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-single-instance --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
[/code]

  2. Modify `lib.rs` to initialize the plugin:

lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .setup(|app| {
         
                     #[cfg(desktop)]
         
                     app.handle().plugin(tauri_plugin_single_instance::init(|app, args, cwd| {}));
         
                     Ok(())
         
                 })
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The plugin is already installed and initialized, and it should be functioning correctly right away. Nevertheless, we can also enhance its functionality with the `init()` method.

The plugin `init()` method takes a closure that is invoked when a new app instance was started, but closed by the plugin. The closure has three arguments:

  1. **`app`:** The [AppHandle](https://docs.rs/tauri/2.0.0/tauri/struct.AppHandle.html) of the application.
  2. **`args`:** The list of arguments, that was passed by the user to initiate this new instance.
  3. **`cwd`:** The Current Working Directory denotes the directory from which the new application instance was launched.


So, the closure should look like below
[code] 
    .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
    
      // Write your code here...
    
    }))
[/code]

### [Focusing on New Instance](#focusing-on-new-instance)

[Section titled “Focusing on New Instance”](#focusing-on-new-instance)

By default, when you initiate a new instance while the application is already running, no action is taken. To focus the window of the running instance when user tries to open a new instance, alter the callback closure as follows:

src-tauri/src/lib.rs
[code]
    use tauri::{AppHandle, Manager};
    
    
    
    
    pub fn run() {
    
        let mut builder = tauri::Builder::default();
    
        #[cfg(desktop)]
    
        {
    
            builder = builder.plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
    
                let _ = app.get_webview_window("main")
    
                           .expect("no main window")
    
                           .set_focus();
    
            }));
    
        }
    
    
    
    
        builder
    
            .run(tauri::generate_context!())
    
            .expect("error while running tauri application");
    
    }
[/code]

## [Usage in Snap and Flatpak](#usage-in-snap-and-flatpak)

[Section titled “Usage in Snap and Flatpak”](#usage-in-snap-and-flatpak)

On Linux the Single Instance plugin uses DBus to ensure that there will be only one instance running. It does so by publishing a service to DBus when the first instance starts running. Then, the following instances will try to publish the same service and, if it is already published, they will send a request to the service to notify the first instance, and exit right away.

Despite this working pretty well when your app is bundled as a deb or rpm package or an AppImage, it won’t work as intended for snap or flatpak packages by default because these packages run in a constrained sandboxed environment, where most of the communication to DBus services will be blocked if not explicitly declared on the packaging manifest.

Here’s a guide that shows how to declare the needed permissions to enable the Single Instance for snap and flatpak packages:

### [Getting your app ID](#getting-your-app-id)

[Section titled “Getting your app ID”](#getting-your-app-id)

The Single Instance plugin will publish a service named `org.{id}.SingleInstance`.

`{id}` will be the `identifier` from your `tauri.conf.json` file, but with with dots (`.`) and dashes (`-`) replaced by underline (`_`).

For example, if your identifier is `net.mydomain.MyApp`:

  * `net_mydomain_MyApp` will be your app `{id}`
  * `org.net_mydomain_MyApp.SingleInstance` will be your app SingleInstance service name


You will need the service name to authorize your app to use the DBus service on snap and flatpak manifests, as seen below.

### [Snap](#snap)

[Section titled “Snap”](#snap)

In your snapcraft.yml file, declare a plug and a slot for the single instance service, and use both on your app declaration:

snapcraft.yml
[code]
    # ...
    
    slots:
    
      single-instance:
    
        interface: dbus
    
        bus: session
    
        name: org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID
    
    
    
    
    plugs:
    
      single-instance-plug:
    
        interface: dbus
    
        bus: session
    
        name: org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID
    
    
    
    
    # .....
    
    apps:
    
      my-app:
    
        # ...
    
        plugs:
    
          # ....
    
          - single-instance-plug
    
        slots:
    
          # ...
    
          - single-instance
    
    
    
    
        # ....
[/code]

This will allow your app to send and receive requests from/to the DBus service as expected by the Single Instance plugin.

### [Flatpak](#flatpak)

[Section titled “Flatpak”](#flatpak)

In your flatpak manifest file (your.app.id.yml or your.app.id.json), declare a `--talk-name` and a `--own-name` finish args with the service name:

net.mydomain.MyApp.yml
[code]
    # ...
    
    finish-args:
    
      - --socket=wayland
    
      - --socket=fallback-x11
    
      - --device=dri
    
      - --share=ipc
    
      # ....
    
      - --talk-name=org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID
    
      - --own-name=org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID
    
    # ...
[/code]

This will allow your app to send and receive requests from/to the DBus service as expected by the Single Instance plugin.

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

Because this Plugin currently does not have JavaScript APIs you do not have to configure [capabilities](/security/capabilities/) to use it.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/single-instance](https://v2.tauri.app/plugin/single-instance)