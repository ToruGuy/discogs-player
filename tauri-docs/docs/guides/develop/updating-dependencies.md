# Updating Dependencies

## [Update npm Packages](#update-npm-packages)

[Section titled “Update npm Packages”](#update-npm-packages)

If you are using the `tauri` package:

  * [ npm ](#tab-panel-708)
  * [ yarn ](#tab-panel-709)
  * [ pnpm ](#tab-panel-710)


[code] 
    npm install @tauri-apps/cli@latest @tauri-apps/api@latest
[/code]
[code] 
    yarn up @tauri-apps/cli @tauri-apps/api
[/code]
[code] 
    pnpm update @tauri-apps/cli @tauri-apps/api --latest
[/code]

You can also detect what the latest version of Tauri is on the command line, using:

  * [ npm ](#tab-panel-711)
  * [ yarn ](#tab-panel-712)
  * [ pnpm ](#tab-panel-713)


[code] 
    npm outdated @tauri-apps/cli
[/code]
[code] 
    yarn outdated @tauri-apps/cli
[/code]
[code] 
    pnpm outdated @tauri-apps/cli
[/code]

## [Update Cargo Packages](#update-cargo-packages)

[Section titled “Update Cargo Packages”](#update-cargo-packages)

You can check for outdated packages with [`cargo outdated`](https://github.com/kbknapp/cargo-outdated) or on the crates.io pages: [tauri](https://crates.io/crates/tauri/versions) / [tauri-build](https://crates.io/crates/tauri-build/versions).

Go to `src-tauri/Cargo.toml` and change `tauri` and `tauri-build` to
[code] 
    [build-dependencies]
    
    tauri-build = "%version%"
    
    
    
    
    [dependencies]
    
    tauri = { version = "%version%" }
[/code]

where `%version%` is the corresponding version number from above.

Then do the following:

Terminal window
[code]
    cd src-tauri
    
    cargo update
[/code]

Alternatively, you can run the `cargo upgrade` command provided by [cargo-edit](https://github.com/killercup/cargo-edit) which does all of this automatically.

## [Sync npm Packages and Cargo Crates versions](#sync-npm-packages-and-cargo-crates-versions)

[Section titled “Sync npm Packages and Cargo Crates versions”](#sync-npm-packages-and-cargo-crates-versions)

Since the JavaScript APIs rely on Rust code in the backend, adding a new feature requires upgrading both sides to ensure compatibility. Please make sure you have the same minor version of the npm package `@tauri-apps/api` and cargo crate `tauri` synced

And for the plugins, we might introduce this type of changes in patch releases, so we bump the npm package and cargo crate versions together, and you need to keep the exact versions synced, for example, you need the same version (e.g. `2.2.1`) of the npm package `@tauri-apps/plugin-fs` and cargo crate `tauri-plugin-fs`

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/develop/updating-dependencies](https://v2.tauri.app/develop/updating-dependencies)