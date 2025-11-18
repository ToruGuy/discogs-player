# Announcing the Tauri Mobile Alpha Release

Dec 9, 2022 

![Lucas Nogueira](/authors/lucasfernog.jpeg)

Lucas Nogueira

Tauri Co-Founder

![Tauri 2.0 Launch Hero Image](/_astro/header.DJC8YrJ3_Z2s1rCC.webp)

Tauri mobile is here! The first alpha release 2.0.0-alpha.0 has been published.

## [Updating dependencies](#updating-dependencies)

[Section titled “Updating dependencies”](#updating-dependencies)

Make sure to update both NPM and Cargo dependencies to the 2.0.0-alpha.0 release. You can update the dependencies with:

  * [ npm ](#tab-panel-657)
  * [ yarn ](#tab-panel-658)
  * [ pnpm ](#tab-panel-659)
  * [ cargo ](#tab-panel-660)


[code] 
    npm install @tauri-apps/cli@next @tauri-apps/api@next
[/code]
[code] 
    yarn upgrade @tauri-apps/cli@next @tauri-apps/api@next
[/code]
[code] 
    pnpm update @tauri-apps/cli@next @tauri-apps/api@next
[/code]
[code] 
    cargo add tauri@2.0.0-alpha.0
    
    cargo add tauri-build@2.0.0-alpha.0 --build
    
    cargo install tauri-cli --version "^2.0.0-alpha" --locked
[/code]

## [Preview](#preview)

[Section titled “Preview”](#preview)

You can adapt your existing desktop application to run on mobile or start a fresh project. Tauri runs on the connected device or starts an emulator if available.

![iOS Preview](/_astro/ios-preview.au3ri0xF_10qcS5.webp) ![Android Preview](/_astro/android-preview.nQXuMXya_ZLeOWM.webp)

* * *

## [Getting started](#getting-started)

[Section titled “Getting started”](#getting-started)

Read the complete guide on the [`next` documentation website](https://v2.tauri.app).

## [Known issues](#known-issues)

[Section titled “Known issues”](#known-issues)

  * TLS support has been moved behind a Cargo feature until we figure out how to cross compile OpenSSL on Windows.
  * Currently running on a device is not supported when using Xcode 14.


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/blog/tauri-mobile-alpha](https://v2.tauri.app/blog/tauri-mobile-alpha)