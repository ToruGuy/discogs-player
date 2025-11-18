# Announcing Tauri 1.6.0

Feb 19, 2024 

![Lucas Nogueira](/authors/lucasfernog.jpeg)

Lucas Nogueira

Tauri Co-Founder

The Tauri team is happy to announce the 1.6 release. This version includes several new features and important bug fixes such as improved code signing on macOS, updater enhancements and an event loop crash on all platforms.

## [Upgrading](#upgrading)

[Section titled “Upgrading”](#upgrading)

Make sure to update both NPM and Cargo dependencies to the 1.6.0 release. You can update the dependencies with:

  * [ npm ](#tab-panel-628)
  * [ yarn ](#tab-panel-629)
  * [ pnpm ](#tab-panel-630)
  * [ cargo ](#tab-panel-631)


[code] 
    npm install @tauri-apps/cli@latest @tauri-apps/api@latest
[/code]
[code] 
    yarn upgrade @tauri-apps/cli @tauri-apps/api --latest
[/code]
[code] 
    pnpm update @tauri-apps/cli @tauri-apps/api --latest
[/code]
[code] 
    cargo update
[/code]

## [What’s in 1.6.0](#whats-in-160)

[Section titled “What’s in 1.6.0”](#whats-in-160)

### [Event loop crash](#event-loop-crash)

[Section titled “Event loop crash”](#event-loop-crash)

We finally got a good stack trace and got a fix for a long standing crash on all platforms. This crash was a challenge to fix since it only happened when the application is running for a long time, so we thank everyone that made sure the fix works.

### [Code signing improvements](#code-signing-improvements)

[Section titled “Code signing improvements”](#code-signing-improvements)

Tauri now detects nested dylib, app, xpc and frameworks inside your macOS app bundle and codesigns each of them. This ensures your app can use some external libraries and be codesigned and notarized.

### [Updater enhancement](#updater-enhancement)

[Section titled “Updater enhancement”](#updater-enhancement)

The auto updater now keeps the command line arguments on Windows.

### [Other changes](#other-changes)

[Section titled “Other changes”](#other-changes)

Check out the entire list of changes:

  * [tauri](https://github.com/tauri-apps/tauri/releases/tag/tauri-v1.6.0)
  * [tauri-cli](https://github.com/tauri-apps/tauri/releases/tag/tauri-cli-v1.5.10)
  * [tauri-bundler](https://github.com/tauri-apps/tauri/releases/tag/tauri-bundler-v1.5.0)


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/blog/tauri-1-6](https://v2.tauri.app/blog/tauri-1-6)