# Shell

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/shell) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-shell) [ crates.io ](https://crates.io/crates/tauri-plugin-shell)

API Reference [ ](/reference/javascript/shell/) [ ](https://docs.rs/tauri-plugin-shell)

Access the system shell. Allows you to spawn child processes.

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
  
## [Opener](#opener)

[Section titled “Opener”](#opener)

If you’re looking for documentation for the `shell.open` API, check out the new [Opener plugin](../opener/) instead.

## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the shell plugin to get started.

  * [ Automatic ](#tab-panel-1430)
  * [ Manual ](#tab-panel-1431)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1419)
  * [ yarn ](#tab-panel-1420)
  * [ pnpm ](#tab-panel-1421)
  * [ deno ](#tab-panel-1422)
  * [ bun ](#tab-panel-1423)
  * [ cargo ](#tab-panel-1424)


[code] 
    npm run tauri add shell
[/code]
[code] 
    yarn run tauri add shell
[/code]
[code] 
    pnpm tauri add shell
[/code]
[code] 
    deno task tauri add shell
[/code]
[code] 
    bun tauri add shell
[/code]
[code] 
    cargo tauri add shell
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-shell
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_shell::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1425)
     * [ yarn ](#tab-panel-1426)
     * [ pnpm ](#tab-panel-1427)
     * [ deno ](#tab-panel-1428)
     * [ bun ](#tab-panel-1429)
[code] npm install @tauri-apps/plugin-shell
[/code]
[code] yarn add @tauri-apps/plugin-shell
[/code]
[code] pnpm add @tauri-apps/plugin-shell
[/code]
[code] deno add npm:@tauri-apps/plugin-shell
[/code]
[code] bun add @tauri-apps/plugin-shell
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The shell plugin is available in both JavaScript and Rust.

  * [ JavaScript ](#tab-panel-1417)
  * [ Rust ](#tab-panel-1418)


[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { Command } = window.__TAURI__.shell;
    
    
    
    
    let result = await Command.create('exec-sh', [
    
      '-c',
    
      "echo 'Hello World!'",
    
    ]).execute();
    
    console.log(result);
[/code]
[code] 
    use tauri_plugin_shell::ShellExt;
    
    
    
    
    let shell = app_handle.shell();
    
    let output = tauri::async_runtime::block_on(async move {
    
        shell
    
            .command("echo")
    
            .args(["Hello from Rust!"])
    
            .output()
    
            .await
    
            .unwrap()
    
    });
    
    if output.status.success() {
    
        println!("Result: {:?}", String::from_utf8(output.stdout));
    
    } else {
    
        println!("Exit with code: {}", output.status.code().unwrap());
    
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
    
      "permissions": [
    
        {
    
          "identifier": "shell:allow-execute",
    
          "allow": [
    
            {
    
              "name": "exec-sh",
    
              "cmd": "sh",
    
              "args": [
    
                "-c",
    
                {
    
                  "validator": "\\S+"
    
                }
    
              ],
    
              "sidecar": false
    
            }
    
          ]
    
        }
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures which shell functionality is exposed by default.

#### [Granted Permissions](#granted-permissions)

It allows to use the `open` functionality with a reasonable scope pre-configured. It will allow opening `http(s)://`, `tel:` and `mailto:` links.

#### This default permission set includes the following:

  * `allow-open`


## Permission Table

Identifier | Description  
---|---  
`shell:allow-execute` |  Enables the execute command without any pre-configured scope.  
`shell:deny-execute` |  Denies the execute command without any pre-configured scope.  
`shell:allow-kill` |  Enables the kill command without any pre-configured scope.  
`shell:deny-kill` |  Denies the kill command without any pre-configured scope.  
`shell:allow-open` |  Enables the open command without any pre-configured scope.  
`shell:deny-open` |  Denies the open command without any pre-configured scope.  
`shell:allow-spawn` |  Enables the spawn command without any pre-configured scope.  
`shell:deny-spawn` |  Denies the spawn command without any pre-configured scope.  
`shell:allow-stdin-write` |  Enables the stdin_write command without any pre-configured scope.  
`shell:deny-stdin-write` |  Denies the stdin_write command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/shell](https://v2.tauri.app/plugin/shell)