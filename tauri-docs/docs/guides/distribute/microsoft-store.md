# Microsoft Store

Microsoft Store is the Windows app store operated by Microsoft.

This guide only covers details for distributing Windows Apps directly to the Microsoft Store. See the [Windows Installer guide](/distribute/windows-installer/) for more information on Windows installer distribution options and configurations.

## [Requirements](#requirements)

[Section titled “Requirements”](#requirements)

To publish apps on the Microsoft Store you must have a Microsoft account and [enroll](https://learn.microsoft.com/en-us/windows/apps/get-started/sign-up) as a developer either as an individual or as a company.

## [Changing App Icon](#changing-app-icon)

[Section titled “Changing App Icon”](#changing-app-icon)

The Tauri CLI can generate all icons your app needs, including Microsoft Store icons. Use the `tauri icon` command to generate app icons from a single PNG or SVG source:

  * [ npm ](#tab-panel-804)
  * [ yarn ](#tab-panel-805)
  * [ pnpm ](#tab-panel-806)
  * [ deno ](#tab-panel-807)
  * [ bun ](#tab-panel-808)
  * [ cargo ](#tab-panel-809)


[code] 
    npm run tauri icon /path/to/app-icon.png
[/code]
[code] 
    yarn tauri icon /path/to/app-icon.png
[/code]
[code] 
    pnpm tauri icon /path/to/app-icon.png
[/code]
[code] 
    deno task tauri icon /path/to/app-icon.png
[/code]
[code] 
    bun tauri icon /path/to/app-icon.png
[/code]
[code] 
    cargo tauri icon /path/to/app-icon.png
[/code]

## [Setting up](#setting-up)

[Section titled “Setting up”](#setting-up)

After you have enrolled as a developer with your Microsoft account you need to register your app in the [Apps and Games](https://partner.microsoft.com/en-us/dashboard/apps-and-games/overview) page. Click `New Product`, select `EXE or MSI app` and reserve a unique name for your app.

## [Build and upload](#build-and-upload)

[Section titled “Build and upload”](#build-and-upload)

Currently Tauri only generates [EXE and MSI](/distribute/windows-installer/) installers, so you must create a Microsoft Store application that only links to the unpacked application. The installer linked in the Microsoft Installer must be offline, [handle auto-updates](/plugin/updater/) and be [code signed](/distribute/sign/windows/).

See the [official publish documentation](https://learn.microsoft.com/en-us/windows/apps/publish/) for more information.

### [Offline Installer](#offline-installer)

[Section titled “Offline Installer”](#offline-installer)

The Windows installer distributed through the Microsoft Store must use the [Offline Installer](/distribute/windows-installer/#offline-installer) Webview2 installation option.

To only apply this installer configuration when bundling for Microsoft Store, you can define a separate Tauri configuration file:

"src-tauri/tauri.microsoftstore.conf.json
[code]
    {
    
      "bundle": {
    
        "windows": {
    
          "webviewInstallMode": {
    
            "type": "offlineInstaller"
    
          }
    
        }
    
      }
    
    }
[/code]

Then merge that config file with the main one when bundling your Tauri app for Microsoft Store:

  * [ npm ](#tab-panel-810)
  * [ yarn ](#tab-panel-811)
  * [ pnpm ](#tab-panel-812)
  * [ deno ](#tab-panel-813)
  * [ bun ](#tab-panel-814)
  * [ cargo ](#tab-panel-815)


[code] 
    npm run tauri build -- --no-bundle
    
    npm run tauri bundle -- --config src-tauri/tauri.microsoftstore.conf.json
[/code]
[code] 
    yarn tauri build --no-bundle
    
    yarn tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
[/code]
[code] 
    pnpm tauri build --no-bundle
    
    pnpm tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
[/code]
[code] 
    deno task tauri build --no-bundle
    
    deno task tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
[/code]
[code] 
    bun tauri build --no-bundle
    
    bun tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
[/code]
[code] 
    cargo tauri build --no-bundle
    
    cargo tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
[/code]

This is particularly useful when setting up your CI/CD to upload your app to the Microsoft Store while having a separate configuration for the Windows installer you distribute outside the app store.

### [Publisher](#publisher)

[Section titled “Publisher”](#publisher)

Your application [publisher](/reference/config/#publisher) name cannot match the application product name.

If the publisher configuration value is not set, Tauri derives it from the second part of your bundle identifier. Since the publisher name cannot match the product name, the following configuration is invalid:

tauri.conf.json
[code]
    {
    
      "productName": "Example",
    
      "identifier": "com.example.app"
    
    }
[/code]

In this case you can define the [publisher](/reference/config/#publisher) value separately to fix this conflict:

tauri.conf.json
[code]
    {
    
      "productName": "Example",
    
      "identifier": "com.example.app",
    
      "bundle": {
    
        "publisher": "Example Inc."
    
      }
    
    }
[/code]

### [Upload](#upload)

[Section titled “Upload”](#upload)

After building the Windows installer for Microsoft Store, you can upload it to the distribution service of your choice and link it in your application page in the Microsoft Store website.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/microsoft-store](https://v2.tauri.app/distribute/microsoft-store)