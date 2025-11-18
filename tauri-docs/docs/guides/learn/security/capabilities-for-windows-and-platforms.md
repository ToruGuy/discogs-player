# Capabilities for Different Windows and Platforms

This guide will help you customize the capabilities of your Tauri app.

## [Content of this guide](#content-of-this-guide)

[Section titled “Content of this guide”](#content-of-this-guide)

  * Create multiple windows in a Tauri app
  * Use different capabilities for different windows
  * Use platform-specific capabilities


## [Prerequisites](#prerequisites)

[Section titled “Prerequisites”](#prerequisites)

This exercise is meant to be read after completing [`Using Plugin Permissions`](/learn/security/using-plugin-permissions/).

## [Guide](#guide)

[Section titled “Guide”](#guide)

  1. ### [Create Multiple Windows in a Tauri Application](#create-multiple-windows-in-a-tauri-application)

[Section titled “Create Multiple Windows in a Tauri Application”](#create-multiple-windows-in-a-tauri-application)

Here we create an app with two windows labelled `first` and `second`. There are multiple ways to create windows in your Tauri application.

#### [Create Windows with the Tauri Configuration File](#create-windows-with-the-tauri-configuration-file)

[Section titled “Create Windows with the Tauri Configuration File”](#create-windows-with-the-tauri-configuration-file)

In the Tauri configuration file, usually named `tauri.conf.json`:

Show solution
[code] "productName": "multiwindow",
         
           ...
         
           "app": {
         
             "windows": [
         
               {
         
                 "label": "first",
         
                 "title": "First",
         
                 "width": 800,
         
                 "height": 600
         
               },
         
               {
         
                 "label": "second",
         
                 "title": "Second",
         
                 "width": 800,
         
                 "height": 600
         
               }
         
             ],
         
           },
         
           ...
         
         }
[/code]

#### [Create Windows Programmatically](#create-windows-programmatically)

[Section titled “Create Windows Programmatically”](#create-windows-programmatically)

In the Rust code to create a Tauri app:

Show solution
[code] tauri::Builder::default()
         
             .invoke_handler(tauri::generate_handler![greet])
         
             .setup(|app| {
         
                 let webview_url = tauri::WebviewUrl::App("index.html".into());
         
                 // First window
         
                 tauri::WebviewWindowBuilder::new(app, "first", webview_url.clone())
         
                     .title("First")
         
                     .build()?;
         
                 // Second window
         
                 tauri::WebviewWindowBuilder::new(app, "second", webview_url)
         
                     .title("Second")
         
                     .build()?;
         
                 Ok(())
         
             })
         
             .run(context)
         
             .expect("error while running tauri application");
[/code]

  2. ### [Apply Different Capabilities to Different Windows](#apply-different-capabilities-to-different-windows)

[Section titled “Apply Different Capabilities to Different Windows”](#apply-different-capabilities-to-different-windows)

The windows of a Tauri app can use different features or plugins of the Tauri backend. For better security it is recommended to only give the necessary capabilities to each window. We simulate a scenario where the `first` windows uses filesystem and dialog functionalities and `second` only needs dialog functionalities.

#### [Separate capability files per category](#separate-capability-files-per-category)

[Section titled “Separate capability files per category”](#separate-capability-files-per-category)

It is recommended to separate the capability files per category of actions they enable.

Show solution

JSON files in the `src-tauri/capabilities` will be taken into account for the capability system. Here we separate capabilities related to the filesystem and dialog window into `filesystem.json` and `dialog.json`.

_filetree of the Tauri project:_
[code]/src
         
         /src-tauri
         
           /capabilities
         
             filesystem.json
         
             dialog.json
         
           tauri.conf.json
         
         package.json
         
         README.md
[/code]

#### [Give filesystem capabilities to the `first` window](#give-filesystem-capabilities-to-the-first-window)

[Section titled “Give filesystem capabilities to the first window”](#give-filesystem-capabilities-to-the-first-window)

We give the `first` window the capability to have read access to the content of the `$HOME` directory.

Show solution

Use the `windows` field in a capability file with one or multiple window labels.

filesystem.json
[code]{
         
           "identifier": "fs-read-home",
         
           "description": "Allow access file access to home directory",
         
           "local": true,
         
           "windows": ["first"],
         
           "permissions": [
         
             "fs:allow-home-read",
         
           ]
         
         }
[/code]

#### [Give dialog capabilities to the `first` and `second` window](#give-dialog-capabilities-to-the-first-and-second-window)

[Section titled “Give dialog capabilities to the first and second window”](#give-dialog-capabilities-to-the-first-and-second-window)

We give to `first` and `second` windows the capability to create a “Yes/No” dialog

Show solution

Use the `windows` field in a capability file with one or multiple window labels.

dialog.json
[code]{
         
           "identifier": "dialog",
         
           "description": "Allow to open a dialog",
         
           "local": true,
         
           "windows": ["first", "second"],
         
           "permissions": ["dialog:allow-ask"]
         
         }
[/code]

  3. ### [Make Capabilities Platform Dependent](#make-capabilities-platform-dependent)

[Section titled “Make Capabilities Platform Dependent”](#make-capabilities-platform-dependent)

We now want to customize the capabilities to be active only on certain platforms. We make our filesystem capabilities only active on `linux` and `windows`.

Show solution

Use the `platforms` field in a capability file to make it platform-specific.

filesystem.json
[code]{
         
           "identifier": "fs-read-home",
         
           "description": "Allow access file access to home directory",
         
           "local": true,
         
           "windows": ["first"],
         
           "permissions": [
         
             "fs:allow-home-read",
         
           ],
         
           "platforms": ["linux", "windows"]
         
         }
[/code]

The currently available platforms are `linux`, `windows`, `macos`, `android`, and `ios`.


## [Conclusion and Resources](#conclusion-and-resources)

[Section titled “Conclusion and Resources”](#conclusion-and-resources)

We have learned how to create multiple windows in a Tauri app and give them specific capabilities. Furthermore these capabilities can also be targeted to certain platforms.

An example application that used window capabilities can be found in the [`api` example](https://github.com/tauri-apps/tauri/tree/dev/examples/api) of the [Tauri Github repository](https://github.com/tauri-apps/tauri). The fields that can be used in a capability file are listed in the [Capability](/reference/acl/capability/) reference.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/learn/security/capabilities-for-windows-and-platforms](https://v2.tauri.app/learn/security/capabilities-for-windows-and-platforms)