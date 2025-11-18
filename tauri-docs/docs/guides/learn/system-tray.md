# System Tray

Tauri allows you to create and customize a system tray for your application. This can enhance the user experience by providing quick access to common actions.

## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

First of all, update your `Cargo.toml` to include the necessary feature for the system tray.

src-tauri/Cargo.toml
[code]
    tauri = { version = "2.0.0", features = [ "tray-icon" ] }
[/code]

## [Usage](#usage)

[Section titled “Usage”](#usage)

The tray API is available in both JavaScript and Rust.

### [Create a Tray Icon](#create-a-tray-icon)

[Section titled “Create a Tray Icon”](#create-a-tray-icon)

  * [ JavaScript ](#tab-panel-909)
  * [ Rust ](#tab-panel-910)


Use the [`TrayIcon.new`](/reference/javascript/api/namespacetray/#new) static function to create a new tray icon:
[code]
    import { TrayIcon } from '@tauri-apps/api/tray';
    
    
    
    
    const options = {
    
      // here you can add a tray menu, title, tooltip, event handler, etc
    
    };
    
    
    
    
    const tray = await TrayIcon.new(options);
[/code]

See [`TrayIconOptions`](/reference/javascript/api/namespacetray/#trayiconoptions) for more information on the customization options.
[code] 
    use tauri::tray::TrayIconBuilder;
    
    
    
    
    tauri::Builder::default()
    
        .setup(|app| {
    
            let tray = TrayIconBuilder::new().build(app)?;
    
            Ok(())
    
        })
[/code]

See [`TrayIconBuilder`](https://docs.rs/tauri/2.0.0/tauri/tray/struct.TrayIconBuilder.html) for more information on customization options.

### [Change the Tray Icon](#change-the-tray-icon)

[Section titled “Change the Tray Icon”](#change-the-tray-icon)

When creating the tray you can use the application icon as the tray icon:

  * [ JavaScript ](#tab-panel-911)
  * [ Rust ](#tab-panel-912)


[code] 
    import { TrayIcon } from '@tauri-apps/api/tray';
    
    import { defaultWindowIcon } from '@tauri-apps/api/app';
    
    
    
    
    const options = {
    
      icon: await defaultWindowIcon(),
    
    };
    
    
    
    
    const tray = await TrayIcon.new(options);
[/code]
[code] 
    let tray = TrayIconBuilder::new()
    
      .icon(app.default_window_icon().unwrap().clone())
    
      .build(app)?;
[/code]

### [Add a Menu](#add-a-menu)

[Section titled “Add a Menu”](#add-a-menu)

To attach a menu that is displayed when the tray is clicked, you can use the `menu` option.

  * [ JavaScript ](#tab-panel-913)
  * [ Rust ](#tab-panel-914)


[code] 
    import { TrayIcon } from '@tauri-apps/api/tray';
    
    import { Menu } from '@tauri-apps/api/menu';
    
    
    
    
    const menu = await Menu.new({
    
      items: [
    
        {
    
          id: 'quit',
    
          text: 'Quit',
    
        },
    
      ],
    
    });
    
    
    
    
    const options = {
    
      menu,
    
      menuOnLeftClick: true,
    
    };
    
    
    
    
    const tray = await TrayIcon.new(options);
[/code]
[code] 
    use tauri::{
    
      menu::{Menu, MenuItem},
    
      tray::TrayIconBuilder,
    
    };
    
    
    
    
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    
    let menu = Menu::with_items(app, &[&quit_i])?;
    
    
    
    
    let tray = TrayIconBuilder::new()
    
      .menu(&menu)
    
      .menu_on_left_click(true)
    
      .build(app)?;
[/code]

#### [Listen to Menu Events](#listen-to-menu-events)

[Section titled “Listen to Menu Events”](#listen-to-menu-events)

  * [ JavaScript ](#tab-panel-915)
  * [ Rust ](#tab-panel-916)


On JavaScript you can attach a menu click event listener directly to the menu item:

  * Using a shared menu click handler
[code] import { Menu } from '@tauri-apps/api/menu';
        
        
        
        
        function onTrayMenuClick(itemId) {
        
          // itemId === 'quit'
        
        }
        
        
        
        
        const menu = await Menu.new({
        
          items: [
        
            {
        
              id: 'quit',
        
              text: 'Quit',
        
              action: onTrayMenuClick,
        
            },
        
          ],
        
        });
[/code]

  * Using a dedicated menu click handler
[code] import { Menu } from '@tauri-apps/api/menu';
        
        
        
        
        const menu = await Menu.new({
        
          items: [
        
            {
        
              id: 'quit',
        
              text: 'Quit',
        
              action: () => {
        
                console.log('quit pressed');
        
              },
        
            },
        
          ],
        
        });
[/code]


Use the [`TrayIconBuilder::on_menu_event`](https://docs.rs/tauri/2.0.0/tauri/tray/struct.TrayIconBuilder.html#method.on_menu_event) method to attach a tray menu click event listener:
[code]
    use tauri::tray::TrayIconBuilder;
    
    
    
    
    TrayIconBuilder::new()
    
      .on_menu_event(|app, event| match event.id.as_ref() {
    
        "quit" => {
    
          println!("quit menu item was clicked");
    
          app.exit(0);
    
        }
    
        _ => {
    
          println!("menu item {:?} not handled", event.id);
    
        }
    
      })
[/code]

### [Listen to Tray Events](#listen-to-tray-events)

[Section titled “Listen to Tray Events”](#listen-to-tray-events)

The tray icon emits events for the following mouse events:

  * click: triggered when the cursor receives a single left, right or middle click, including information on whether the mouse press was released or not
  * Double click: triggered when the cursor receives a double left, right or middle click
  * Enter: triggered when the cursor enters the tray icon area
  * Move: triggered when the cursor moves around the tray icon area
  * Leave: triggered when the cursor leaves the tray icon area


  * [ JavaScript ](#tab-panel-917)
  * [ Rust ](#tab-panel-918)


[code] 
    import { TrayIcon } from '@tauri-apps/api/tray';
    
    
    
    
    const options = {
    
      action: (event) => {
    
        switch (event.type) {
    
          case 'Click':
    
            console.log(
    
              `mouse ${event.button} button pressed, state: ${event.buttonState}`
    
            );
    
            break;
    
          case 'DoubleClick':
    
            console.log(`mouse ${event.button} button pressed`);
    
            break;
    
          case 'Enter':
    
            console.log(
    
              `mouse hovered tray at ${event.rect.position.x}, ${event.rect.position.y}`
    
            );
    
            break;
    
          case 'Move':
    
            console.log(
    
              `mouse moved on tray at ${event.rect.position.x}, ${event.rect.position.y}`
    
            );
    
            break;
    
          case 'Leave':
    
            console.log(
    
              `mouse left tray at ${event.rect.position.x}, ${event.rect.position.y}`
    
            );
    
            break;
    
        }
    
      },
    
    };
    
    
    
    
    const tray = await TrayIcon.new(options);
[/code]

See [`TrayIconEvent`](/reference/javascript/api/namespacetray/#trayiconevent) for more information on the event payload.
[code] 
    use tauri::{
    
        Manager,
    
        tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent}
    
    };
    
    
    
    
    TrayIconBuilder::new()
    
      .on_tray_icon_event(|tray, event| match event {
    
        TrayIconEvent::Click {
    
          button: MouseButton::Left,
    
          button_state: MouseButtonState::Up,
    
          ..
    
        } => {
    
          println!("left click pressed and released");
    
          // in this example, let's show and focus the main window when the tray is clicked
    
          let app = tray.app_handle();
    
          if let Some(window) = app.get_webview_window("main") {
    
            let _ = window.unminimize();
    
            let _ = window.show();
    
            let _ = window.set_focus();
    
          }
    
        }
    
        _ => {
    
          println!("unhandled event {event:?}");
    
        }
    
      })
[/code]

See [`TrayIconEvent`](https://docs.rs/tauri/2.0.0/tauri/tray/enum.TrayIconEvent.html) for more information on the event type.

For detailed information about creating menus, including menu items, submenus, and dynamic updates, see the [Window Menu](/learn/window-menu/) documentation.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/learn/system-tray](https://v2.tauri.app/learn/system-tray)