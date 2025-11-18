# Logging

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/log) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-log) [ crates.io ](https://crates.io/crates/tauri-plugin-log)

API Reference [ ](/reference/javascript/log/) [ ](https://docs.rs/tauri-plugin-log)

Configurable logging for your Tauri app.

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

Install the log plugin to get started.

  * [ Automatic ](#tab-panel-1314)
  * [ Manual ](#tab-panel-1315)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1303)
  * [ yarn ](#tab-panel-1304)
  * [ pnpm ](#tab-panel-1305)
  * [ deno ](#tab-panel-1306)
  * [ bun ](#tab-panel-1307)
  * [ cargo ](#tab-panel-1308)


[code] 
    npm run tauri add log
[/code]
[code] 
    yarn run tauri add log
[/code]
[code] 
    pnpm tauri add log
[/code]
[code] 
    deno task tauri add log
[/code]
[code] 
    bun tauri add log
[/code]
[code] 
    cargo tauri add log
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-log
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_log::Builder::new().build())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1309)
     * [ yarn ](#tab-panel-1310)
     * [ pnpm ](#tab-panel-1311)
     * [ deno ](#tab-panel-1312)
     * [ bun ](#tab-panel-1313)
[code] npm install @tauri-apps/plugin-log
[/code]
[code] yarn add @tauri-apps/plugin-log
[/code]
[code] pnpm add @tauri-apps/plugin-log
[/code]
[code] deno add npm:@tauri-apps/plugin-log
[/code]
[code] bun add @tauri-apps/plugin-log
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

  1. First, you need to register the plugin with Tauri.

src-tauri/src/lib.rs
[code]use tauri_plugin_log::{Target, TargetKind};
         
         
         
         
         #[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_log::Builder::new().build())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  2. Afterwards, all the plugin’s APIs are available through the JavaScript guest bindings:
[code] import {
         
           warn,
         
           debug,
         
           trace,
         
           info,
         
           error,
         
           attachConsole,
         
           attachLogger,
         
         } from '@tauri-apps/plugin-log';
         
         // when using `"withGlobalTauri": true`, you may use
         
         // const { warn, debug, trace, info, error, attachConsole, attachLogger } = window.__TAURI__.log;
[/code]


## [Logging](#logging)

[Section titled “Logging”](#logging)

  * [ JavaScript ](#tab-panel-1301)
  * [ Rust ](#tab-panel-1302)


Use one of the plugin’s `warn`, `debug`, `trace`, `info` or `error` APIs to produce a log record from JavaScript code:
[code]
    import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';
    
    
    
    
    trace('Trace');
    
    info('Info');
    
    error('Error');
[/code]

To automatically forward all `console` messages to the log plugin you can rewrite them:
[code]
    import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';
    
    
    
    
    function forwardConsole(
    
      fnName: 'log' | 'debug' | 'info' | 'warn' | 'error',
    
      logger: (message: string) => Promise<void>
    
    ) {
    
      const original = console[fnName];
    
      console[fnName] = (message) => {
    
        original(message);
    
        logger(message);
    
      };
    
    }
    
    
    
    
    forwardConsole('log', trace);
    
    forwardConsole('debug', debug);
    
    forwardConsole('info', info);
    
    forwardConsole('warn', warn);
    
    forwardConsole('error', error);
[/code]

To create your own logs on the Rust side you can use the [`log` crate](https://crates.io/crates/log):
[code]
    log::error!("something bad happened!");
    
    log::info!("Tauri is awesome!");
[/code]

Note that the [`log` crate](https://crates.io/crates/log) must be added to your `Cargo.toml` file:
[code]
    [dependencies]
    
    log = "0.4"
[/code]

## [Log targets](#log-targets)

[Section titled “Log targets”](#log-targets)

The log plugin builder has a `targets` function that lets you configure common destination of all your application logs.

### [Printing logs to the terminal](#printing-logs-to-the-terminal)

[Section titled “Printing logs to the terminal”](#printing-logs-to-the-terminal)

To forward all your logs to the terminal, enable the `Stdout` or `Stderr` targets:
[code] 
    tauri_plugin_log::Builder::new()
    
      .target(tauri_plugin_log::Target::new(
    
        tauri_plugin_log::TargetKind::Stdout,
    
      ))
    
      .build()
[/code]

This target is enabled by default.

### [Logging to the webview console](#logging-to-the-webview-console)

[Section titled “Logging to the webview console”](#logging-to-the-webview-console)

To view all your Rust logs in the webview console, enable the `Webview` target and run `attachConsole` in your frontend:
[code] 
    tauri_plugin_log::Builder::new()
    
      .target(tauri_plugin_log::Target::new(
    
        tauri_plugin_log::TargetKind::Webview,
    
      ))
    
      .build()
[/code]
[code] 
    import { attachConsole } from '@tauri-apps/plugin-log';
    
    const detach = await attachConsole();
    
    // call detach() if you do not want to print logs to the console anymore
[/code]

### [Persisting logs](#persisting-logs)

[Section titled “Persisting logs”](#persisting-logs)

To write all logs to a file, you can use either the `LogDir` or the `Folder` targets.

  * `LogDir`:


[code] 
    tauri_plugin_log::Builder::new()
    
      .target(tauri_plugin_log::Target::new(
    
        tauri_plugin_log::TargetKind::LogDir {
    
          file_name: Some("logs".to_string()),
    
        },
    
      ))
    
      .build()
[/code]

When using the LogDir target, all logs are stored in the recommended log directory. The following table describes the location of the logs per platform:

Platform| Value| Example  
---|---|---  
Linux| `$XDG_DATA_HOME/{bundleIdentifier}/logs` or `$HOME/.local/share/{bundleIdentifier}/logs`| `/home/alice/.local/share/com.tauri.dev/logs`  
macOS| `{homeDir}/Library/Logs/{bundleIdentifier}`| `/Users/Alice/Library/Logs/com.tauri.dev`  
Windows| `{FOLDERID_LocalAppData}/{bundleIdentifier}/logs`| `C:\Users\Alice\AppData\Local\com.tauri.dev\logs`  
  
  * `Folder`:


The Folder target lets you write logs to a custom location in the filesystem.
[code] 
    tauri_plugin_log::Builder::new()
    
      .target(tauri_plugin_log::Target::new(
    
        tauri_plugin_log::TargetKind::Folder {
    
          path: std::path::PathBuf::from("/path/to/logs"),
    
          file_name: None,
    
        },
    
      ))
    
      .build()
[/code]

The default `file_name` is the application name.

#### [Configuring log file behavior](#configuring-log-file-behavior)

[Section titled “Configuring log file behavior”](#configuring-log-file-behavior)

By default the log file gets discarded when it reaches the maximum size. The maximum file size can be configured via the builder’s `max_file_size` function:
[code] 
    tauri_plugin_log::Builder::new()
    
      .max_file_size(50_000 /* bytes */)
    
      .build()
[/code]

Tauri can automatically rotate your log file when it reaches the size limit instead of discarding the previous file. This behavior can be configured using `rotation_strategy`:
[code] 
    tauri_plugin_log::Builder::new()
    
      .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
    
      .build()
[/code]

### [Filtering](#filtering)

[Section titled “Filtering”](#filtering)

By default **all** logs are processed. There are some mechanisms to reduce the amount of logs and filter only relevant information.

### [Maximum log level](#maximum-log-level)

[Section titled “Maximum log level”](#maximum-log-level)

To set a maximum log level, use the `level` function:
[code] 
    tauri_plugin_log::Builder::new()
    
      .level(log::LevelFilter::Info)
    
      .build()
[/code]

In this example, debug and trace logs are discarded as they have a lower level than _info_.

It is also possible to define separate maximum levels for individual modules:
[code] 
    tauri_plugin_log::Builder::new()
    
      .level(log::LevelFilter::Info)
    
      // verbose logs only for the commands module
    
      .level_for("my_crate_name::commands", log::LevelFilter::Trace)
    
      .build()
[/code]

Note that these APIs use the [`log` crate](https://crates.io/crates/log), which must be added to your `Cargo.toml` file:
[code] 
    [dependencies]
    
    log = "0.4"
[/code]

### [Target filter](#target-filter)

[Section titled “Target filter”](#target-filter)

A `filter` function can be defined to discard unwanted logs by checking their metadata:
[code] 
    tauri_plugin_log::Builder::new()
    
      // exclude logs with target `"hyper"`
    
      .filter(|metadata| metadata.target() != "hyper")
    
      .build()
[/code]

### [Formatting](#formatting)

[Section titled “Formatting”](#formatting)

The log plugin formats each log record as `DATE[TARGET][LEVEL] MESSAGE`. A custom format function can be provided with `format`:
[code] 
    tauri_plugin_log::Builder::new()
    
      .format(|out, message, record| {
    
        out.finish(format_args!(
    
          "[{} {}] {}",
    
          record.level(),
    
          record.target(),
    
          message
    
        ))
    
      })
    
      .build()
[/code]

#### [Log dates](#log-dates)

[Section titled “Log dates”](#log-dates)

By default the log plugin uses the UTC timezone to format dates but you can configure it to use the local timezone with `timezone_strategy`:
[code] 
    tauri_plugin_log::Builder::new()
    
      .timezone_strategy(tauri_plugin_log::TimezoneStrategy::UseLocal)
    
      .build()
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default, all plugin commands are blocked and cannot be accessed. You must define a list of permissions in your `capabilities` configuration.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": ["log:default"]
    
    }
[/code]

## [Default Permission](#default-permission)

Allows the log command

#### This default permission set includes the following:

  * `allow-log`


## Permission Table

Identifier | Description  
---|---  
`log:allow-log` |  Enables the log command without any pre-configured scope.  
`log:deny-log` |  Denies the log command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/logging](https://v2.tauri.app/plugin/logging)