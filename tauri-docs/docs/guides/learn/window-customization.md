# Window Customization

Tauri provides lots of options for customizing the look and feel of your app’s window. You can create custom titlebars, have transparent windows, enforce size constraints, and more.

## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

There are three ways to change the window configuration:

  * [Through tauri.conf.json](/reference/config/#windowconfig)
  * [Through the JavaScript API](/reference/javascript/api/namespacewindow/#window)
  * [Through the Window in Rust](https://docs.rs/tauri/2.0.0/tauri/window/struct.Window.html)


## [Usage](#usage)

[Section titled “Usage”](#usage)

  * [Creating a Custom Titlebar](#creating-a-custom-titlebar)
  * [(macOS) Transparent Titlebar with Custom Window Background Color](#macos-transparent-titlebar-with-custom-window-background-color)


### [Creating a Custom Titlebar](#creating-a-custom-titlebar)

[Section titled “Creating a Custom Titlebar”](#creating-a-custom-titlebar)

A common use of these window features is creating a custom titlebar. This short tutorial will guide you through that process.

#### [tauri.conf.json](#tauriconfjson)

[Section titled “tauri.conf.json”](#tauriconfjson)

Set `decorations` to `false` in your `tauri.conf.json`:

tauri.conf.json
[code]
    "tauri": {
    
      "windows": [
    
        {
    
          "decorations": false
    
        }
    
      ]
    
    }
[/code]

#### [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

Add window permissions in capability file.

By default, all plugin commands are blocked and cannot be accessed. You must define a list of permissions in your `capabilities` configuration.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": ["core:window:default", "core:window:allow-start-dragging"]
    
    }
[/code]

Permission| Description  
---|---  
`core:window:default`| Default permissions for the plugin. Except `window:allow-start-dragging`.  
`core:window:allow-close`| Enables the close command without any pre-configured scope.  
`core:window:allow-minimize`| Enables the minimize command without any pre-configured scope.  
`core:window:allow-start-dragging`| Enables the start_dragging command without any pre-configured scope.  
`core:window:allow-toggle-maximize`| Enables the toggle_maximize command without any pre-configured scope.  
`core:window:allow-internal-toggle-maximize`| Enables the internal_toggle_maximize command without any pre-configured scope.  
  
#### [CSS](#css)

[Section titled “CSS”](#css)

Add this CSS sample to keep it at the top of the screen and style the buttons:
[code] 
    .titlebar {
    
      height: 30px;
    
      background: #329ea3;
    
      user-select: none;
    
      display: grid;
    
      grid-template-columns: auto max-content;
    
      position: fixed;
    
      top: 0;
    
      left: 0;
    
      right: 0;
    
    }
    
    .titlebar > .controls {
    
      display: flex;
    
    }
    
    .titlebar button {
    
      appearance: none;
    
      padding: 0;
    
      margin: 0;
    
      border: none;
    
      display: inline-flex;
    
      justify-content: center;
    
      align-items: center;
    
      width: 30px;
    
      background-color: transparent;
    
    }
    
    .titlebar button:hover {
    
      background: #5bbec3;
    
    }
[/code]

#### [HTML](#html)

[Section titled “HTML”](#html)

Put this at the top of your `<body>` tag:
[code] 
    <div class="titlebar">
    
      <div data-tauri-drag-region></div>
    
      <div class="controls">
    
        <button id="titlebar-minimize" title="minimize">
    
          <!-- https://api.iconify.design/mdi:window-minimize.svg -->
    
          <svg
    
            xmlns="http://www.w3.org/2000/svg"
    
            width="24"
    
            height="24"
    
            viewBox="0 0 24 24"
    
          >
    
            <path fill="currentColor" d="M19 13H5v-2h14z" />
    
          </svg>
    
        </button>
    
        <button id="titlebar-maximize" title="maximize">
    
          <!-- https://api.iconify.design/mdi:window-maximize.svg -->
    
          <svg
    
            xmlns="http://www.w3.org/2000/svg"
    
            width="24"
    
            height="24"
    
            viewBox="0 0 24 24"
    
          >
    
            <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
    
          </svg>
    
        </button>
    
        <button id="titlebar-close" title="close">
    
          <!-- https://api.iconify.design/mdi:close.svg -->
    
          <svg
    
            xmlns="http://www.w3.org/2000/svg"
    
            width="24"
    
            height="24"
    
            viewBox="0 0 24 24"
    
          >
    
            <path
    
              fill="currentColor"
    
              d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
    
            />
    
          </svg>
    
        </button>
    
      </div>
    
    </div>
[/code]

Note that you may need to move the rest of your content down so that the titlebar doesn’t cover it.

#### [JavaScript](#javascript)

[Section titled “JavaScript”](#javascript)

Use this code snippet to make the buttons work:
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    
    
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { getCurrentWindow } = window.__TAURI__.window;
    
    
    
    
    const appWindow = getCurrentWindow();
    
    
    
    
    document
    
      .getElementById('titlebar-minimize')
    
      ?.addEventListener('click', () => appWindow.minimize());
    
    document
    
      .getElementById('titlebar-maximize')
    
      ?.addEventListener('click', () => appWindow.toggleMaximize());
    
    document
    
      .getElementById('titlebar-close')
    
      ?.addEventListener('click', () => appWindow.close());
[/code]

Note that if you are using a Rust-based frontend, you can copy the code above into a `<script>` element in your `index.html` file.

### [Manual Implementation of `data-tauri-drag-region`](#manual-implementation-of-data-tauri-drag-region)

[Section titled “Manual Implementation of data-tauri-drag-region”](#manual-implementation-of-data-tauri-drag-region)

For use cases where you customize the drag behavior, you can manually add an event listener with `window.startDragging` instead of using `data-tauri-drag-region`.

#### [HTML](#html-1)

[Section titled “HTML”](#html-1)

From the code in the previous section, we remove `data-tauri-drag-region` and add an `id`:
[code] 
    <div data-tauri-drag-region class="titlebar">
    
      <div id="titlebar" class="titlebar">
    
        <!-- ... -->
    
      </div>
    
    </div>
[/code]

#### [Javascript](#javascript-1)

[Section titled “Javascript”](#javascript-1)

Add an event listener to the titlebar element:
[code] 
    // ...
    
    document.getElementById('titlebar')?.addEventListener('mousedown', (e) => {
    
      if (e.buttons === 1) {
    
        // Primary (left) button
    
        e.detail === 2
    
          ? appWindow.toggleMaximize() // Maximize on double click
    
          : appWindow.startDragging(); // Else start dragging
    
      }
    
    });
[/code]

### [(macOS) Transparent Titlebar with Custom Window Background Color](#macos-transparent-titlebar-with-custom-window-background-color)

[Section titled “(macOS) Transparent Titlebar with Custom Window Background Color”](#macos-transparent-titlebar-with-custom-window-background-color)

We are going to create the main window and change its background color from the Rust side.

Remove the main window from the `tauri.conf.json` file:

tauri.conf.json
[code]
    "tauri": {
    
      "windows": [
    
        {
    
          "title": "Transparent Titlebar Window",
    
          "width": 800,
    
          "height": 600
    
        }
    
      ],
    
    }
[/code]

Add `cocoa` crate to dependencies so that we can use it to call the macOS native API:

src-tauri/Cargo.toml
[code]
    [target."cfg(target_os = \"macos\")".dependencies]
    
    cocoa = "0.26"
[/code]

Create the main window and change its background color:

src-tauri/src/lib.rs
[code]
    use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};
    
    
    
    
    pub fn run() {
    
      tauri::Builder::default()
    
        .setup(|app| {
    
          let win_builder =
    
            WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
    
              .title("Transparent Titlebar Window")
    
              .inner_size(800.0, 600.0);
    
    
    
    
          // set transparent title bar only when building for macOS
    
          #[cfg(target_os = "macos")]
    
          let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);
    
    
    
    
          let window = win_builder.build().unwrap();
    
    
    
    
          // set background color only when building for macOS
    
          #[cfg(target_os = "macos")]
    
          {
    
            use cocoa::appkit::{NSColor, NSWindow};
    
            use cocoa::base::{id, nil};
    
    
    
    
            let ns_window = window.ns_window().unwrap() as id;
    
            unsafe {
    
              let bg_color = NSColor::colorWithRed_green_blue_alpha_(
    
                  nil,
    
                  50.0 / 255.0,
    
                  158.0 / 255.0,
    
                  163.5 / 255.0,
    
                  1.0,
    
              );
    
              ns_window.setBackgroundColor_(bg_color);
    
            }
    
          }
    
    
    
    
          Ok(())
    
        })
    
        .run(tauri::generate_context!())
    
        .expect("error while running tauri application");
    
    }
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/learn/window-customization](https://v2.tauri.app/learn/window-customization)