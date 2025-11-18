# Command Line Interface (CLI)

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/cli) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-cli) [ crates.io ](https://crates.io/crates/tauri-plugin-cli)

API Reference [ ](/reference/javascript/cli/) [ ](https://docs.rs/tauri-plugin-cli)

Tauri enables your app to have a CLI through [clap](https://github.com/clap-rs/clap), a robust command line argument parser. With a simple CLI definition in your `tauri.conf.json` file, you can define your interface and read its argument matches map on JavaScript and/or Rust.

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
  
  * Windows 
    * Due to an OS limitation, production apps are not able to write text back to the calling console by default. Please check out [tauri#8305](https://github.com/tauri-apps/tauri/issues/8305#issuecomment-1826871949) for a workaround.


## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the CLI plugin to get started.

  * [ Automatic ](#tab-panel-1205)
  * [ Manual ](#tab-panel-1206)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1194)
  * [ yarn ](#tab-panel-1195)
  * [ pnpm ](#tab-panel-1196)
  * [ deno ](#tab-panel-1197)
  * [ bun ](#tab-panel-1198)
  * [ cargo ](#tab-panel-1199)


[code] 
    npm run tauri add cli
[/code]
[code] 
    yarn run tauri add cli
[/code]
[code] 
    pnpm tauri add cli
[/code]
[code] 
    deno task tauri add cli
[/code]
[code] 
    bun tauri add cli
[/code]
[code] 
    cargo tauri add cli
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-cli --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
[/code]

     2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
    
    pub fn run() {
    
        tauri::Builder::default()
    
            .setup(|app| {
    
                #[cfg(desktop)]
    
                app.handle().plugin(tauri_plugin_cli::init());
    
                Ok(())
    
            })
    
            .run(tauri::generate_context!())
    
            .expect("error while running tauri application");
    
    }
[/code]

     3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1200)
     * [ yarn ](#tab-panel-1201)
     * [ pnpm ](#tab-panel-1202)
     * [ deno ](#tab-panel-1203)
     * [ bun ](#tab-panel-1204)
[code] npm install @tauri-apps/plugin-cli
[/code]
[code] yarn add @tauri-apps/plugin-cli
[/code]
[code] pnpm add @tauri-apps/plugin-cli
[/code]
[code] deno add npm:@tauri-apps/plugin-cli
[/code]
[code] bun add @tauri-apps/plugin-cli
[/code]


## [Base Configuration](#base-configuration)

[Section titled “Base Configuration”](#base-configuration)

Under `tauri.conf.json`, you have the following structure to configure the interface:

src-tauri/tauri.conf.json
[code]
    {
    
      "plugins": {
    
        "cli": {
    
          "description": "Tauri CLI Plugin Example",
    
          "args": [
    
            {
    
              "short": "v",
    
              "name": "verbose",
    
              "description": "Verbosity level"
    
            }
    
          ],
    
          "subcommands": {
    
            "run": {
    
              "description": "Run the application",
    
              "args": [
    
                {
    
                  "name": "debug",
    
                  "description": "Run application in debug mode"
    
                },
    
                {
    
                  "name": "release",
    
                  "description": "Run application in release mode"
    
                }
    
              ]
    
            }
    
          }
    
        }
    
      }
    
    }
[/code]

## [Adding Arguments](#adding-arguments)

[Section titled “Adding Arguments”](#adding-arguments)

The `args` array represents the list of arguments accepted by its command or subcommand.

### [Positional Arguments](#positional-arguments)

[Section titled “Positional Arguments”](#positional-arguments)

A positional argument is identified by its position in the list of arguments. With the following configuration:

src-tauri/tauri.conf.json
[code]
    {
    
      "args": [
    
        {
    
          "name": "source",
    
          "index": 1,
    
          "takesValue": true
    
        },
    
        {
    
          "name": "destination",
    
          "index": 2,
    
          "takesValue": true
    
        }
    
      ]
    
    }
[/code]

Users can run your app as `./app tauri.txt dest.txt` and the arg matches map will define `source` as `"tauri.txt"` and `destination` as `"dest.txt"`.

### [Named Arguments](#named-arguments)

[Section titled “Named Arguments”](#named-arguments)

A named argument is a (key, value) pair where the key identifies the value. With the following configuration:

tauri-src/tauri.conf.json
[code]
    {
    
      "args": [
    
        {
    
          "name": "type",
    
          "short": "t",
    
          "takesValue": true,
    
          "multiple": true,
    
          "possibleValues": ["foo", "bar"]
    
        }
    
      ]
    
    }
[/code]

Users can run your app as `./app --type foo bar`, `./app -t foo -t bar` or `./app --type=foo,bar` and the arg matches map will define `type` as `["foo", "bar"]`.

### [Flag Arguments](#flag-arguments)

[Section titled “Flag Arguments”](#flag-arguments)

A flag argument is a standalone key whose presence or absence provides information to your application. With the following configuration:

tauri-src/tauri.conf.json
[code]
    {
    
      "args": [
    
        {
    
          "name": "verbose",
    
          "short": "v"
    
        }
    
      ]
    
    }
[/code]

Users can run your app as `./app -v -v -v`, `./app --verbose --verbose --verbose` or `./app -vvv` and the arg matches map will define `verbose` as `true`, with `occurrences = 3`.

## [Subcommands](#subcommands)

[Section titled “Subcommands”](#subcommands)

Some CLI applications have additional interfaces as subcommands. For instance, the `git` CLI has `git branch`, `git commit` and `git push`. You can define additional nested interfaces with the `subcommands` array:

tauri-src/tauri.conf.json
[code]
    {
    
      "cli": {
    
        ...
    
        "subcommands": {
    
          "branch": {
    
            "args": []
    
          },
    
          "push": {
    
            "args": []
    
          }
    
        }
    
      }
    
    }
[/code]

Its configuration is the same as the root application configuration, with the `description`, `longDescription`, `args`, etc.

## [Usage](#usage)

[Section titled “Usage”](#usage)

The CLI plugin is available in both JavaScript and Rust.

  * [ JavaScript ](#tab-panel-1192)
  * [ Rust ](#tab-panel-1193)


[code] 
    import { getMatches } from '@tauri-apps/plugin-cli';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { getMatches } = window.__TAURI__.cli;
    
    
    
    
    const matches = await getMatches();
    
    if (matches.subcommand?.name === 'run') {
    
      // `./your-app run $ARGS` was executed
    
      const args = matches.subcommand.matches.args;
    
      if (args.debug?.value === true) {
    
        // `./your-app run --debug` was executed
    
      }
    
      if (args.release?.value === true) {
    
        // `./your-app run --release` was executed
    
      }
    
    }
[/code]

src-tauri/src/lib.rs
[code]
    use tauri_plugin_cli::CliExt;
    
    
    
    
    #[cfg_attr(mobile, tauri::mobile_entry_point)]
    
    pub fn run() {
    
       tauri::Builder::default()
    
           .plugin(tauri_plugin_cli::init())
    
           .setup(|app| {
    
               match app.cli().matches() {
    
                   // `matches` here is a Struct with { args, subcommand }.
    
                   // `args` is `HashMap<String, ArgData>` where `ArgData` is a struct with { value, occurrences }.
    
                   // `subcommand` is `Option<Box<SubcommandMatches>>` where `SubcommandMatches` is a struct with { name, matches }.
    
                   Ok(matches) => {
    
                       println!("{:?}", matches)
    
                   }
    
                   Err(_) => {}
    
               }
    
               Ok(())
    
           })
    
           .run(tauri::generate_context!())
    
           .expect("error while running tauri application");
    
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
    
      "permissions": ["cli:default"]
    
    }
[/code]

## [Default Permission](#default-permission)

Allows reading the CLI matches

#### This default permission set includes the following:

  * `allow-cli-matches`


## Permission Table

Identifier | Description  
---|---  
`cli:allow-cli-matches` |  Enables the cli_matches command without any pre-configured scope.  
`cli:deny-cli-matches` |  Denies the cli_matches command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/cli](https://v2.tauri.app/plugin/cli)