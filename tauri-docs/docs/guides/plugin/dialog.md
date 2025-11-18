# Dialog

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/dialog) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-dialog) [ crates.io ](https://crates.io/crates/tauri-plugin-dialog)

API Reference [ ](/reference/javascript/dialog/) [ ](https://docs.rs/tauri-plugin-dialog)

Native system dialogs for opening and saving files along with message dialogs.

## [Supported Platforms](#supported-platforms)

[Section titled “Supported Platforms”](#supported-platforms)

_This plugin requires a Rust version of at least**1.77.2**_

Platform | Level | Notes  
---|---|---  
windows |  |   
linux |  |   
macos |  |   
android |  |  Does not support folder picker  
ios |  |  Does not support folder picker  
  
## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the dialog plugin to get started.

  * [ Automatic ](#tab-panel-1248)
  * [ Manual ](#tab-panel-1249)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1237)
  * [ yarn ](#tab-panel-1238)
  * [ pnpm ](#tab-panel-1239)
  * [ deno ](#tab-panel-1240)
  * [ bun ](#tab-panel-1241)
  * [ cargo ](#tab-panel-1242)


[code] 
    npm run tauri add dialog
[/code]
[code] 
    yarn run tauri add dialog
[/code]
[code] 
    pnpm tauri add dialog
[/code]
[code] 
    deno task tauri add dialog
[/code]
[code] 
    bun tauri add dialog
[/code]
[code] 
    cargo tauri add dialog
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-dialog
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_dialog::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. If you’d like create dialogs in JavaScript, install the npm package as well:

     * [ npm ](#tab-panel-1243)
     * [ yarn ](#tab-panel-1244)
     * [ pnpm ](#tab-panel-1245)
     * [ deno ](#tab-panel-1246)
     * [ bun ](#tab-panel-1247)
[code] npm install @tauri-apps/plugin-dialog
[/code]
[code] yarn add @tauri-apps/plugin-dialog
[/code]
[code] pnpm add @tauri-apps/plugin-dialog
[/code]
[code] deno add npm:@tauri-apps/plugin-dialog
[/code]
[code] bun add @tauri-apps/plugin-dialog
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The dialog plugin is available in both JavaScript and Rust. Here’s how you can use it:

in JavaScript:

  * [Create Yes/No Dialog](#create-yesno-dialog)
  * [Create Ok/Cancel Dialog](#create-okcancel-dialog)
  * [Create Message Dialog](#create-message-dialog)
  * [Open a File Selector Dialog](#open-a-file-selector-dialog)
  * [Save to File Dialog](#save-to-file-dialog)


in Rust:

  * [Build an Ask Dialog](#build-an-ask-dialog)
  * [Build a Message Dialog](#build-a-message-dialog)
  * [Build a File Selector Dialog](#build-a-file-selector-dialog)


### [JavaScript](#javascript)

[Section titled “JavaScript”](#javascript)

See all [Dialog Options](/reference/javascript/dialog/) at the JavaScript API reference.

#### [Create Yes/No Dialog](#create-yesno-dialog)

[Section titled “Create Yes/No Dialog”](#create-yesno-dialog)

Shows a question dialog with `Yes` and `No` buttons.
[code] 
    import { ask } from '@tauri-apps/plugin-dialog';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { ask } = window.__TAURI__.dialog;
    
    
    
    
    // Create a Yes/No dialog
    
    const answer = await ask('This action cannot be reverted. Are you sure?', {
    
      title: 'Tauri',
    
      kind: 'warning',
    
    });
    
    
    
    
    console.log(answer);
    
    // Prints boolean to the console
[/code]

#### [Create Ok/Cancel Dialog](#create-okcancel-dialog)

[Section titled “Create Ok/Cancel Dialog”](#create-okcancel-dialog)

Shows a question dialog with `Ok` and `Cancel` buttons.
[code] 
    import { confirm } from '@tauri-apps/plugin-dialog';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { confirm } = window.__TAURI__.dialog;
    
    
    
    
    // Creates a confirmation Ok/Cancel dialog
    
    const confirmation = await confirm(
    
      'This action cannot be reverted. Are you sure?',
    
      { title: 'Tauri', kind: 'warning' }
    
    );
    
    
    
    
    console.log(confirmation);
    
    // Prints boolean to the console
[/code]

#### [Create Message Dialog](#create-message-dialog)

[Section titled “Create Message Dialog”](#create-message-dialog)

Shows a message dialog with an `Ok` button. Keep in mind that if the user closes the dialog it will return `false`.
[code] 
    import { message } from '@tauri-apps/plugin-dialog';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { message } = window.__TAURI__.dialog;
    
    
    
    
    // Shows message
    
    await message('File not found', { title: 'Tauri', kind: 'error' });
[/code]

#### [Open a File Selector Dialog](#open-a-file-selector-dialog)

[Section titled “Open a File Selector Dialog”](#open-a-file-selector-dialog)

Open a file/directory selection dialog.

The `multiple` option controls whether the dialog allows multiple selection or not, while the `directory`, whether is a directory selection or not.
[code] 
    import { open } from '@tauri-apps/plugin-dialog';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { open } = window.__TAURI__.dialog;
    
    
    
    
    // Open a dialog
    
    const file = await open({
    
      multiple: false,
    
      directory: false,
    
    });
    
    console.log(file);
    
    // Prints file path or URI
[/code]

#### [Save to File Dialog](#save-to-file-dialog)

[Section titled “Save to File Dialog”](#save-to-file-dialog)

Open a file/directory save dialog.
[code] 
    import { save } from '@tauri-apps/plugin-dialog';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { save } = window.__TAURI__.dialog;
    
    
    
    
    // Prompt to save a 'My Filter' with extension .png or .jpeg
    
    const path = await save({
    
      filters: [
    
        {
    
          name: 'My Filter',
    
          extensions: ['png', 'jpeg'],
    
        },
    
      ],
    
    });
    
    console.log(path);
    
    // Prints the chosen path
[/code]

* * *

### [Rust](#rust)

[Section titled “Rust”](#rust)

Refer to the [Rust API reference](https://docs.rs/tauri-plugin-dialog/) to see all available options.

#### [Build an Ask Dialog](#build-an-ask-dialog)

[Section titled “Build an Ask Dialog”](#build-an-ask-dialog)

Shows a question dialog with `Absolutely` and `Totally` buttons.
[code] 
    use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};
    
    
    
    
    let answer = app.dialog()
    
            .message("Tauri is Awesome")
    
            .title("Tauri is Awesome")
    
            .buttons(MessageDialogButtons::OkCancelCustom("Absolutely", "Totally"))
    
            .blocking_show();
[/code]

If you need a non blocking operation you can use `show()` instead:
[code] 
    use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};
    
    
    
    
    app.dialog()
    
        .message("Tauri is Awesome")
    
        .title("Tauri is Awesome")
    
       .buttons(MessageDialogButtons::OkCancelCustom("Absolutely", "Totally"))
    
        .show(|result| match result {
    
            true => // do something,
    
            false =>// do something,
    
        });
[/code]

#### [Build a Message Dialog](#build-a-message-dialog)

[Section titled “Build a Message Dialog”](#build-a-message-dialog)

Shows a message dialog with an `Ok` button. Keep in mind that if the user closes the dialog it will return `false`.
[code] 
    use tauri_plugin_dialog::{DialogExt, MessageDialogKind};
    
    
    
    
    let ans = app.dialog()
    
        .message("File not found")
    
        .kind(MessageDialogKind::Error)
    
        .title("Warning")
    
        .blocking_show();
[/code]

If you need a non blocking operation you can use `show()` instead:
[code] 
    use tauri_plugin_dialog::{DialogExt, MessageDialogButtons, MessageDialogKind};
    
    
    
    
    app.dialog()
    
        .message("Tauri is Awesome")
    
        .kind(MessageDialogKind::Info)
    
        .title("Information")
    
        .buttons(MessageDialogButtons::OkCustom("Absolutely"))
    
        .show(|result| match result {
    
            true => // do something,
    
            false => // do something,
    
        });
[/code]

#### [Build a File Selector Dialog](#build-a-file-selector-dialog)

[Section titled “Build a File Selector Dialog”](#build-a-file-selector-dialog)

#### [Pick Files](#pick-files)

[Section titled “Pick Files”](#pick-files)
[code] 
    use tauri_plugin_dialog::DialogExt;
    
    
    
    
    let file_path = app.dialog().file().blocking_pick_file();
    
    // return a file_path `Option`, or `None` if the user closes the dialog
[/code]

If you need a non blocking operation you can use `pick_file()` instead:
[code] 
    use tauri_plugin_dialog::DialogExt;
    
    
    
    
    app.dialog().file().pick_file(|file_path| {
    
        // return a file_path `Option`, or `None` if the user closes the dialog
    
        })
[/code]

#### [Save Files](#save-files)

[Section titled “Save Files”](#save-files)
[code] 
    use tauri_plugin_dialog::DialogExt;
    
    
    
    
    let file_path = app
    
        .dialog()
    
        .file()
    
        .add_filter("My Filter", &["png", "jpeg"])
    
        .blocking_save_file();
    
        // do something with the optional file path here
    
        // the file path is `None` if the user closed the dialog
[/code]

or, alternatively:
[code] 
    use tauri_plugin_dialog::DialogExt;
    
    
    
    
    app.dialog()
    
        .file()
    
        .add_filter("My Filter", &["png", "jpeg"])
    
        .pick_file(|file_path| {
    
            // return a file_path `Option`, or `None` if the user closes the dialog
    
        });
[/code]

## [Default Permission](#default-permission)

This permission set configures the types of dialogs available from the dialog plugin.

#### [Granted Permissions](#granted-permissions)

All dialog types are enabled.

#### This default permission set includes the following:

  * `allow-ask`
  * `allow-confirm`
  * `allow-message`
  * `allow-save`
  * `allow-open`


## Permission Table

Identifier | Description  
---|---  
`dialog:allow-ask` |  Enables the ask command without any pre-configured scope.  
`dialog:deny-ask` |  Denies the ask command without any pre-configured scope.  
`dialog:allow-confirm` |  Enables the confirm command without any pre-configured scope.  
`dialog:deny-confirm` |  Denies the confirm command without any pre-configured scope.  
`dialog:allow-message` |  Enables the message command without any pre-configured scope.  
`dialog:deny-message` |  Denies the message command without any pre-configured scope.  
`dialog:allow-open` |  Enables the open command without any pre-configured scope.  
`dialog:deny-open` |  Denies the open command without any pre-configured scope.  
`dialog:allow-save` |  Enables the save command without any pre-configured scope.  
`dialog:deny-save` |  Denies the save command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/dialog](https://v2.tauri.app/plugin/dialog)