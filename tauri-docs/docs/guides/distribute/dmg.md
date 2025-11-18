# DMG

The DMG (Apple Disk Image) format is a common macOS installer file that wraps your [App Bundle](/distribute/macos-application-bundle/) in a user-friendly installation window.

The installer window includes your app icon and the Applications folder icon, where the user is expected to drag the app icon to the Applications folder icon to install it. It is the most common installation method for macOS applications distributed outside the App Store.

This guide only covers details for distributing apps outside the App Store using the DMG format. See the [App Bundle distribution guide](/distribute/macos-application-bundle/) for more information on macOS distribution options and configurations. To distribute your macOS app in the App Store, see the [App Store distribution guide](/distribute/app-store/).

To create an Apple Disk Image for your app you can use the Tauri CLI and run the `tauri build` command in a Mac computer:

  * [ npm ](#tab-panel-738)
  * [ yarn ](#tab-panel-739)
  * [ pnpm ](#tab-panel-740)
  * [ deno ](#tab-panel-741)
  * [ bun ](#tab-panel-742)
  * [ cargo ](#tab-panel-743)


[code] 
    npm run tauri build -- --bundles dmg
[/code]
[code] 
    yarn tauri build --bundles dmg
[/code]
[code] 
    pnpm tauri build --bundles dmg
[/code]
[code] 
    deno task tauri build --bundles dmg
[/code]
[code] 
    bun tauri build --bundles dmg
[/code]
[code] 
    cargo tauri build --bundles dmg
[/code]

![Standard DMG window](/_astro/standard-dmg-light.DwnO_utB_2ugiW7.webp) ![Standard DMG window](/_astro/standard-dmg-dark.DDFg0R9E_2r1rIX.webp)

## [Window background](#window-background)

[Section titled “Window background”](#window-background)

You can set a custom background image to the DMG installation window with the [`tauri.conf.json > bundle > macOS > dmg > background`] configuration option:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "macOS": {
    
          "dmg": {
    
            "background": "./images/"
    
          }
    
        }
    
      }
    
    }
[/code]

For instance your DMG background image can include an arrow to indicate to the user that it must drag the app icon to the Applications folder.

## [Window size and position](#window-size-and-position)

[Section titled “Window size and position”](#window-size-and-position)

The default window size is 660x400. If you need a different size to fit your custom background image, set the [`tauri.conf.json > bundle > macOS > dmg > windowSize`] configuration:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "macOS": {
    
          "dmg": {
    
            "windowSize": {
    
              "width": 800,
    
              "height": 600
    
            }
    
          }
    
        }
    
      }
    
    }
[/code]

Additionally you can set the initial window position via [`tauri.conf.json > bundle > macOS > dmg > windowPosition`]:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "macOS": {
    
          "dmg": {
    
            "windowPosition": {
    
              "x": 400,
    
              "y": 400
    
            }
    
          }
    
        }
    
      }
    
    }
[/code]

## [Icon position](#icon-position)

[Section titled “Icon position”](#icon-position)

You can change the app and _Applications folder_ icon position with the [appPosition](/reference/config/#appposition) and [applicationFolderPosition](/reference/config/#applicationfolderposition) configuration values respectively:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "macOS": {
    
          "dmg": {
    
            "appPosition": {
    
              "x": 180,
    
              "y": 220
    
            },
    
            "applicationFolderPosition": {
    
              "x": 480,
    
              "y": 220
    
            }
    
          }
    
        }
    
      }
    
    }
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/dmg](https://v2.tauri.app/distribute/dmg)