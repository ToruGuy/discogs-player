# Distribute

Tauri provides the tooling you need to distribute your application either to the platform app stores or as platform-specific installers.

## [Building](#building)

[Section titled “Building”](#building)

Tauri builds your application directly from its CLI via the `build`, `android build` and `ios build` commands.

  * [ npm ](#tab-panel-774)
  * [ yarn ](#tab-panel-775)
  * [ pnpm ](#tab-panel-776)
  * [ deno ](#tab-panel-777)
  * [ bun ](#tab-panel-778)
  * [ cargo ](#tab-panel-779)


[code] 
    npm run tauri build
[/code]
[code] 
    yarn tauri build
[/code]
[code] 
    pnpm tauri build
[/code]
[code] 
    deno task tauri build
[/code]
[code] 
    bun tauri build
[/code]
[code] 
    cargo tauri build
[/code]

See the [distributing](#distributing) section to learn more about the configuration options available for each bundle and how to distribute them to your users.

### [Bundling](#bundling)

[Section titled “Bundling”](#bundling)

By default the `build` command automatically bundles your application for the configured formats.

If you need further customization on how the platform bundles are generated, you can split the build and bundle steps:

  * [ npm ](#tab-panel-780)
  * [ yarn ](#tab-panel-781)
  * [ pnpm ](#tab-panel-782)
  * [ deno ](#tab-panel-783)
  * [ bun ](#tab-panel-784)
  * [ cargo ](#tab-panel-785)


[code] 
    npm run tauri build -- --no-bundle
    
    # bundle for distribution outside the macOS App Store
    
    npm run tauri bundle -- --bundles app,dmg
    
    # bundle for App Store distribution
    
    npm run tauri bundle -- --bundles app --config src-tauri/tauri.appstore.conf.json
[/code]
[code] 
    yarn tauri build --no-bundle
    
    # bundle for distribution outside the macOS App Store
    
    yarn tauri bundle --bundles app,dmg
    
    # bundle for App Store distribution
    
    yarn tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
[/code]
[code] 
    pnpm tauri build --no-bundle
    
    # bundle for distribution outside the macOS App Store
    
    pnpm tauri bundle --bundles app,dmg
    
    # bundle for App Store distribution
    
    pnpm tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
[/code]
[code] 
    deno task tauri build --no-bundle
    
    # bundle for distribution outside the macOS App Store
    
    deno task tauri bundle --bundles app,dmg
    
    # bundle for App Store distribution
    
    deno task tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
[/code]
[code] 
    bun tauri build --no-bundle
    
    # bundle for distribution outside the macOS App Store
    
    bun tauri bundle --bundles app,dmg
    
    # bundle for App Store distribution
    
    bun tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
[/code]
[code] 
    cargo tauri build --no-bundle
    
    # bundle for distribution outside the macOS App Store
    
    cargo tauri bundle --bundles app,dmg
    
    # bundle for App Store distribution
    
    cargo tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
[/code]

## [Versioning](#versioning)

[Section titled “Versioning”](#versioning)

Your application version can be defined in the [`tauri.conf.json > version`](/reference/config/#version) configuration option, which is the recommended way for managing the app version. If that config value is not set, Tauri uses the `package > version` value from your `src-tauri/Cargo.toml` file instead.

## [Signing](#signing)

[Section titled “Signing”](#signing)

Code signing enhances the security of your application by applying a digital signature to your application’s executables and bundles, validating your identity of the provider of your application.

Signing is required on most platforms. See the documentation for each platform for more information.

[ macOS ](/distribute/sign/macos/) Code signing and notarization for macOS apps

[ Windows ](/distribute/sign/windows/) Code signing Windows installers

[ Linux ](/distribute/sign/linux/) Code signing Linux packages

[ Android ](/distribute/sign/android/) Code signing for Android

[ iOS ](/distribute/sign/ios/) Code signing for iOS

## [Distributing](#distributing)

[Section titled “Distributing”](#distributing)

Learn how to distribute your application for each platform.

### [Linux](#linux)

[Section titled “Linux”](#linux)

For Linux you can distribute your app using the Debian package, Snap, AppImage, Flatpak, RPM or Arch User Repository (AUR) formats.

[ AppImage ](/distribute/appimage/) Distribute as an AppImage

[ AUR ](/distribute/aur/) Publishing To The Arch User Repository

[ Debian ](/distribute/debian/) Distribute as a Debian package

[ RPM ](/distribute/rpm/) Distribute as an RPM package

[ Snapcraft ](/distribute/snapcraft/) Distribute on Snapcraft.io

[ Code signing ](/distribute/sign/linux/)

### [macOS](#macos)

[Section titled “macOS”](#macos)

For macOS you can either distribute your application directly to the App Store or ship a DMG installer as direct download. Both methods requires code signing, and distributing outside the App Store also requires notarization.

[ App Bundle ](/distribute/macos-application-bundle/) Distribute macOS apps as an App Bundle

[ App Store ](/distribute/app-store/) Distribute iOS and macOS apps to the App Store

[ DMG ](/distribute/dmg/) Distribute macOS apps as Apple Disk Images

[ Code signing and notarization ](/distribute/sign/macos/)

### [Windows](#windows)

[Section titled “Windows”](#windows)

Learn how to distribute to the Microsoft Store or configure a Windows installer.

[ Microsoft Store ](/distribute/microsoft-store/) Distribute Windows apps to the Microsoft Store

[ Windows Installer ](/distribute/windows-installer/) Distribute installers for Windows

[ Code signing ](/distribute/sign/windows/)

### [Android](#android)

[Section titled “Android”](#android)

Distribute your Android application to Google Play.

[ Google Play ](/distribute/google-play/) Distribute Android apps to Google Play

[ Code signing ](/distribute/sign/android/)

### [iOS](#ios)

[Section titled “iOS”](#ios)

Learn how to upload your application to the App Store.

[ App Store ](/distribute/app-store/) Distribute iOS and macOS apps to the App Store

[ Code signing ](/distribute/sign/ios/)

### [Cloud Services](#cloud-services)

[Section titled “Cloud Services”](#cloud-services)

Distribute your application to Cloud services that globally distribute your application and support auto updates out of the box.

[ CrabNebula Cloud ](/distribute/crabnebula-cloud/) Distribute your app using CrabNebula

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute](https://v2.tauri.app/distribute)