# Tauri Architecture

## [Introduction](#introduction)

[Section titled “Introduction”](#introduction)

Tauri is a polyglot and generic toolkit that is very composable and allows engineers to make a wide variety of applications. It is used for building applications for desktop computers using a combination of Rust tools and HTML rendered in a Webview. Apps built with Tauri can ship with any number of pieces of an optional JS API and Rust API so that webviews can control the system via message passing. Developers can extend the default API with their own functionality and bridge the Webview and Rust-based backend easily.

Tauri apps can have [tray-type interfaces](/learn/system-tray/). They can be [updated](/plugin/updater/) and are managed by the user’s operating system as expected. They are very small because they use the OS’s webview. They do not ship a runtime since the final binary is compiled from Rust. This makes the [reversing of Tauri apps not a trivial task](/security/).

### [What Tauri is Not](#what-tauri-is-not)

[Section titled “What Tauri is Not”](#what-tauri-is-not)

Tauri is not a lightweight kernel wrapper. Instead, it directly uses [WRY](#wry) and [TAO](#tao) to do the heavy lifting in making system calls to the OS.

Tauri is not a VM or virtualized environment. Instead, it is an application toolkit that allows making Webview OS applications.

## [Core Ecosystem](#core-ecosystem)

[Section titled “Core Ecosystem”](#core-ecosystem)

![Diagram](/d2/docs/concept/architecture-0.svg)Simplified representation of the Tauri architecture.

### [tauri](#tauri)

[Section titled “tauri”](#tauri)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri)

This is the major crate that holds everything together. It brings the runtimes, macros, utilities and API into one final product. It reads the [`tauri.conf.json`](/reference/config/) file at compile time to bring in features and undertake the actual configuration of the app (and even the `Cargo.toml` file in the project’s folder). It handles script injection (for polyfills / prototype revision) at runtime, hosts the API for systems interaction, and even manages the updating process.

### [tauri-runtime](#tauri-runtime)

[Section titled “tauri-runtime”](#tauri-runtime)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-runtime)

The glue layer between Tauri itself and lower-level webview libraries.

### [tauri-macros](#tauri-macros)

[Section titled “tauri-macros”](#tauri-macros)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-macros)

Creates macros for the context, handler, and commands by leveraging the [`tauri-codegen`](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-codegen) crate.

### [tauri-utils](#tauri-utils)

[Section titled “tauri-utils”](#tauri-utils)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-utils)

Common code that is reused in many places and offers useful utilities like parsing configuration files, detecting platform triples, injecting the CSP, and managing assets.

### [tauri-build](#tauri-build)

[Section titled “tauri-build”](#tauri-build)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-build)

Applies the macros at build-time to rig some special features needed by `cargo`.

### [tauri-codegen](#tauri-codegen)

[Section titled “tauri-codegen”](#tauri-codegen)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-codegen)

Embeds, hashes, and compresses assets, including icons for the app as well as the system tray. Parses [`tauri.conf.json`](/reference/config/) at compile time and generates the Config struct.

### [tauri-runtime-wry](#tauri-runtime-wry)

[Section titled “tauri-runtime-wry”](#tauri-runtime-wry)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-runtime-wry)

This crate opens up direct systems-level interactions specifically for WRY, such as printing, monitor detection, and other windowing-related tasks.

## [Tauri Tooling](#tauri-tooling)

[Section titled “Tauri Tooling”](#tauri-tooling)

### [API (JavaScript / TypeScript)](#api-javascript--typescript)

[Section titled “API (JavaScript / TypeScript)”](#api-javascript--typescript)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/packages/api)

A typescript library that creates `cjs` and `esm` JavaScript endpoints for you to import into your frontend framework so that the Webview can call and listen to backend activity. Also ships in pure typescript, because for some frameworks this is more optimal. It uses the message passing of webviews to their hosts.

### [Bundler (Rust / Shell)](#bundler-rust--shell)

[Section titled “Bundler (Rust / Shell)”](#bundler-rust--shell)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-bundler)

A library that builds a Tauri app for the platform it detects or is told. Currently supports macOS, Windows and Linux - but in the near future will support mobile platforms as well. May be used outside of Tauri projects.

### [cli.rs (Rust)](#clirs-rust)

[Section titled “cli.rs (Rust)”](#clirs-rust)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-cli)

This Rust executable provides the full interface to all of the required activities for which the CLI is required. It runs on macOS, Windows, and Linux.

### [cli.js (JavaScript)](#clijs-javascript)

[Section titled “cli.js (JavaScript)”](#clijs-javascript)

[View on GitHub](https://github.com/tauri-apps/tauri/tree/dev/packages/cli)

Wrapper around [`cli.rs`](https://github.com/tauri-apps/tauri/blob/dev/crates/tauri-cli) using [`napi-rs`](https://github.com/napi-rs/napi-rs) to produce npm packages for each platform.

### [create-tauri-app (JavaScript)](#create-tauri-app-javascript)

[Section titled “create-tauri-app (JavaScript)”](#create-tauri-app-javascript)

[View on GitHub](https://github.com/tauri-apps/create-tauri-app)

A toolkit that will enable engineering teams to rapidly scaffold out a new `tauri-apps` project using the frontend framework of their choice (as long as it has been configured).

## [Upstream Crates](#upstream-crates)

[Section titled “Upstream Crates”](#upstream-crates)

The Tauri-Apps organization maintains two “upstream” crates from Tauri, namely TAO for creating and managing application windows, and WRY for interfacing with the Webview that lives within the window.

### [TAO](#tao)

[Section titled “TAO”](#tao)

[View on GitHub](https://github.com/tauri-apps/tao)

Cross-platform application window creation library in Rust that supports all major platforms like Windows, macOS, Linux, iOS and Android. Written in Rust, it is a fork of [winit](https://github.com/rust-windowing/winit) that we have extended for our own needs - like menu bar and system tray.

### [WRY](#wry)

[Section titled “WRY”](#wry)

[View on GitHub](https://github.com/tauri-apps/wry)

WRY is a cross-platform WebView rendering library in Rust that supports all major desktop platforms like Windows, macOS, and Linux. Tauri uses WRY as the abstract layer responsible to determine which webview is used (and how interactions are made).

## [Additional Tooling](#additional-tooling)

[Section titled “Additional Tooling”](#additional-tooling)

### [tauri-action](#tauri-action)

[Section titled “tauri-action”](#tauri-action)

[View on GitHub](https://github.com/tauri-apps/tauri-action)

GitHub workflow that builds Tauri binaries for all platforms. Even allows creating a (very basic) Tauri app even if Tauri is not set up.

### [tauri-vscode](#tauri-vscode)

[Section titled “tauri-vscode”](#tauri-vscode)

[View on GitHub](https://github.com/tauri-apps/tauri-vscode)

This project enhances the Visual Studio Code interface with several nice-to-have features.

### [vue-cli-plugin-tauri](#vue-cli-plugin-tauri)

[Section titled “vue-cli-plugin-tauri”](#vue-cli-plugin-tauri)

[View on GitHub](https://github.com/tauri-apps/vue-cli-plugin-tauri)

Allows you to very quickly install Tauri in a vue-cli project.

## [Plugins](#plugins)

[Section titled “Plugins”](#plugins)

[Tauri Plugin Guide](/develop/plugins/)

Generally speaking, plugins are authored by third parties (even though there may be official, supported plugins). A plugin generally does 3 things:

  1. Enables Rust code to do “something”.
  2. Provides interface glue to make it easy to integrate into an app.
  3. Provides a JavaScript API for interfacing with the Rust code.


Here are some examples of Tauri Plugins:

  * [tauri-plugin-fs](https://github.com/tauri-apps/tauri-plugin-fs)
  * [tauri-plugin-sql](https://github.com/tauri-apps/tauri-plugin-sql)
  * [tauri-plugin-stronghold](https://github.com/tauri-apps/tauri-plugin-stronghold)


## [License](#license)

[Section titled “License”](#license)

Tauri itself is licensed under MIT or Apache-2.0. If you repackage it and modify any source code, it is your responsibility to verify that you are complying with all upstream licenses. Tauri is provided AS-IS with no explicit claim for suitability for any purpose.

Here you may peruse our [Software Bill of Materials](https://app.fossa.com/projects/git%2Bgithub.com%2Ftauri-apps%2Ftauri).

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/concept/architecture](https://v2.tauri.app/concept/architecture)