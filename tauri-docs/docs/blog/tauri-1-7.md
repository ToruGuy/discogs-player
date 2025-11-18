# Announcing Tauri 1.7.0

Jul 1, 2024 

![Lucas Nogueira](/authors/lucasfernog.jpeg)

Lucas Nogueira

Tauri Co-Founder

The Tauri team is happy to announce the 1.7 release. This version includes several bug fixes, performance improvements and features backported from the upcoming v2 release.

## [Upgrading](#upgrading)

[Section titled “Upgrading”](#upgrading)

Make sure to update both NPM and Cargo dependencies to the 1.7.0 release. You can update the dependencies with:

  * [ npm ](#tab-panel-636)
  * [ yarn ](#tab-panel-637)
  * [ pnpm ](#tab-panel-638)
  * [ cargo ](#tab-panel-639)


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

## [What’s in 1.7.0](#whats-in-170)

[Section titled “What’s in 1.7.0”](#whats-in-170)

### [Shell API performance improvement](#shell-api-performance-improvement)

[Section titled “Shell API performance improvement”](#shell-api-performance-improvement)

The shell’s `Command::execute` API has been optimized to only use the IPC a single time instead of streaming data, improving usage of verbose shell scripts.

### [Feature backport from v2](#feature-backport-from-v2)

[Section titled “Feature backport from v2”](#feature-backport-from-v2)

Thanks to community effort we have backported a few bundler features from v2 into the v1 release.

#### [Custom Windows codesign script](#custom-windows-codesign-script)

[Section titled “Custom Windows codesign script”](#custom-windows-codesign-script)

By default the Windows packaging uses [SignTool](https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool), which only works on Windows so it’s not useful when cross compiling. In this release we have backported the custom sign command feature, which allows using `osslsigncode`, `relic` and other alternatives that can run on Unix systems and support hardware tokens, Azure Key Vault and more.

#### [RPM bundle](#rpm-bundle)

[Section titled “RPM bundle”](#rpm-bundle)

RPM packaging have been available to Tauri v2 users for a while, and it is now also available on the v1 channel.

### [DMG configuration](#dmg-configuration)

[Section titled “DMG configuration”](#dmg-configuration)

DMG installers are now configurable: you can change the position of the icons and the window size to fit better within a custom background.

### [Other changes](#other-changes)

[Section titled “Other changes”](#other-changes)

Check out the entire list of changes:

  * [tauri](https://github.com/tauri-apps/tauri/releases/tag/tauri-v1.7.0)
  * [tauri-cli](https://github.com/tauri-apps/tauri/releases/tag/tauri-cli-v1.6.0)
  * [tauri-bundler](https://github.com/tauri-apps/tauri/releases/tag/tauri-bundler-v1.6.0)


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/blog/tauri-1-7](https://v2.tauri.app/blog/tauri-1-7)