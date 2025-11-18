# Command Line Interface

The Tauri command line interface (CLI) is the way to interact with Tauri throughout the development lifecycle.

You can add the Tauri CLI to your current project using your package manager of choice:

  * [ npm ](#tab-panel-938)
  * [ yarn ](#tab-panel-939)
  * [ pnpm ](#tab-panel-940)
  * [ deno ](#tab-panel-941)
  * [ cargo ](#tab-panel-942)


[code] 
    npm install --save-dev @tauri-apps/cli@latest
[/code]
[code] 
    yarn add -D @tauri-apps/cli@latest
[/code]
[code] 
    pnpm add -D @tauri-apps/cli@latest
[/code]
[code] 
    deno add -D npm:@tauri-apps/cli@latest
[/code]
[code] 
    cargo install tauri-cli --version "^2.0.0" --locked
[/code]

## [List of Commands](#list-of-commands)

[Section titled “List of Commands”](#list-of-commands)

Command| Description  
---|---  
[`init`](#init)| Initialize a Tauri project in an existing directory  
[`dev`](#dev)| Run your app in development mode  
[`build`](#build)| Build your app in release mode and generate bundles and installers  
[`bundle`](#bundle)| Generate bundles and installers for your app (already built by `tauri build`)  
[`android`](#android)| Android commands  
[`android init`](#android-init)| Initialize Android target in the project  
[`android dev`](#android-dev)| Run your app in development mode on Android  
[`android build`](#android-build)| Build your app in release mode for Android and generate APKs and AABs  
[`android run`](#android-run)| Run your app in production mode on Android  
[`migrate`](#migrate)| Migrate from v1 to v2  
[`info`](#info)| Show a concise list of information about the environment, Rust, Node.js and their versions as well as a few relevant project configurations  
[`add`](#add)| Add a tauri plugin to the project  
[`remove`](#remove)| Remove a tauri plugin from the project  
[`plugin`](#plugin)| Manage or create Tauri plugins  
[`plugin new`](#plugin-new)| Initializes a new Tauri plugin project  
[`plugin init`](#plugin-init)| Initialize a Tauri plugin project on an existing directory  
[`plugin android`](#plugin-android)| Manage the Android project for a Tauri plugin  
[`plugin ios`](#plugin-ios)| Manage the iOS project for a Tauri plugin  
[`plugin android init`](#plugin-android-init)| Initializes the Android project for an existing Tauri plugin  
[`plugin ios init`](#plugin-ios-init)| Initializes the iOS project for an existing Tauri plugin  
[`icon`](#icon)| Generate various icons for all major platforms  
[`signer`](#signer)| Generate signing keys for Tauri updater or sign files  
[`signer sign`](#signer-sign)| Sign a file  
[`signer generate`](#signer-generate)| Generate a new signing key to sign files  
[`completions`](#completions)| Generate Tauri CLI shell completions for Bash, Zsh, PowerShell or Fish  
[`permission`](#permission)| Manage or create permissions for your app or plugin  
[`permission new`](#permission-new)| Create a new permission file  
[`permission add`](#permission-add)| Add a permission to capabilities  
[`permission rm`](#permission-rm)| Remove a permission file, and its reference from any capability  
[`permission ls`](#permission-ls)| List permissions available to your application  
[`capability`](#capability)| Manage or create capabilities for your app  
[`capability new`](#capability-new)| Create a new permission file  
[`inspect`](#inspect)| Manage or create permissions for your app or plugin  
[`inspect wix-upgrade-code`](#inspect-wix-upgrade-code)| Print the default Upgrade Code used by MSI installer derived from productName  
  
### [`init`](#init)

[Section titled “init”](#init)

  * [ npm ](#tab-panel-943)
  * [ yarn ](#tab-panel-944)
  * [ pnpm ](#tab-panel-945)
  * [ deno ](#tab-panel-946)
  * [ bun ](#tab-panel-947)
  * [ cargo ](#tab-panel-948)


[code] 
    npm run tauri init
[/code]
[code] 
    yarn tauri init
[/code]
[code] 
    pnpm tauri init
[/code]
[code] 
    deno task tauri init
[/code]
[code] 
    bun tauri init
[/code]
[code] 
    cargo tauri init
[/code]
[code] 
    Initialize a Tauri project in an existing directory
    
    
    
    
    Usage: tauri init [OPTIONS]
    
    
    
    
    Options:
    
          --ci
    
              Skip prompting for values [env: CI=true]
    
      -v, --verbose...
    
              Enables verbose logging
    
      -f, --force
    
              Force init to overwrite the src-tauri folder
    
      -l, --log
    
              Enables logging
    
      -d, --directory <DIRECTORY>
    
              Set target directory for init [default: /opt/build/repo/packages/cli-generator]
    
      -t, --tauri-path <TAURI_PATH>
    
              Path of the Tauri project to use (relative to the cwd)
    
      -A, --app-name <APP_NAME>
    
              Name of your Tauri application
    
      -W, --window-title <WINDOW_TITLE>
    
              Window title of your Tauri application
    
      -D, --frontend-dist <FRONTEND_DIST>
    
              Web assets location, relative to <project-dir>/src-tauri
    
      -P, --dev-url <DEV_URL>
    
              Url of your dev server
    
          --before-dev-command <BEFORE_DEV_COMMAND>
    
              A shell command to run before `tauri dev` kicks in
    
          --before-build-command <BEFORE_BUILD_COMMAND>
    
              A shell command to run before `tauri build` kicks in
    
      -h, --help
    
              Print help
    
      -V, --version
    
              Print version
[/code]

### [`dev`](#dev)

[Section titled “dev”](#dev)

  * [ npm ](#tab-panel-949)
  * [ yarn ](#tab-panel-950)
  * [ pnpm ](#tab-panel-951)
  * [ deno ](#tab-panel-952)
  * [ bun ](#tab-panel-953)
  * [ cargo ](#tab-panel-954)


[code] 
    npm run tauri dev
[/code]
[code] 
    yarn tauri dev
[/code]
[code] 
    pnpm tauri dev
[/code]
[code] 
    deno task tauri dev
[/code]
[code] 
    bun tauri dev
[/code]
[code] 
    cargo tauri dev
[/code]
[code] 
    Run your app in development mode with hot-reloading for the Rust code. It makes use of the `build.devUrl` property from your `tauri.conf.json` file. It also runs your `build.beforeDevCommand` which usually starts your frontend devServer.
    
    
    
    
    Usage: tauri dev [OPTIONS] [ARGS]...
    
    
    
    
    Arguments:
    
      [ARGS]...
    
              Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. Arguments after a second `--` are passed to the application e.g. `tauri dev -- [runnerArgs] -- [appArgs]`
    
    
    
    
    Options:
    
      -r, --runner <RUNNER>
    
              Binary to use to run the application
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -t, --target <TARGET>
    
              Target triple to build against
    
    
    
    
      -f, --features [<FEATURES>...]
    
              List of cargo features to activate
    
    
    
    
      -e, --exit-on-panic
    
              Exit on panic
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
          --release
    
              Run the code in release mode
    
    
    
    
          --no-dev-server-wait
    
              Skip waiting for the frontend dev server to start before building the tauri application
    
    
    
    
              [env: TAURI_CLI_NO_DEV_SERVER_WAIT=]
    
    
    
    
          --no-watch
    
              Disable the file watcher
    
    
    
    
          --additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>
    
              Additional paths to watch for changes
    
    
    
    
          --no-dev-server
    
              Disable the built-in dev server for static files
    
    
    
    
          --port <PORT>
    
              Specify port for the built-in dev server for static files. Defaults to 1430
    
    
    
    
              [env: TAURI_CLI_PORT=]
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

### [`build`](#build)

[Section titled “build”](#build)

  * [ npm ](#tab-panel-955)
  * [ yarn ](#tab-panel-956)
  * [ pnpm ](#tab-panel-957)
  * [ deno ](#tab-panel-958)
  * [ bun ](#tab-panel-959)
  * [ cargo ](#tab-panel-960)


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
[code] 
    Build your app in release mode and generate bundles and installers. It makes use of the `build.frontendDist` property from your `tauri.conf.json` file. It also runs your `build.beforeBuildCommand` which usually builds your frontend into `build.frontendDist`. This will also run `build.beforeBundleCommand` before generating the bundles and installers of your app.
    
    
    
    
    Usage: tauri build [OPTIONS] [ARGS]...
    
    
    
    
    Arguments:
    
      [ARGS]...
    
              Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments
    
    
    
    
    Options:
    
      -r, --runner <RUNNER>
    
              Binary to use to build the application, defaults to `cargo`
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -d, --debug
    
              Builds with the debug flag
    
    
    
    
      -t, --target <TARGET>
    
              Target triple to build against.
    
    
    
    
              It must be one of the values outputted by `$rustc --print target-list` or `universal-apple-darwin` for an universal macOS application.
    
    
    
    
              Note that compiling an universal macOS application requires both `aarch64-apple-darwin` and `x86_64-apple-darwin` targets to be installed.
    
    
    
    
      -f, --features [<FEATURES>...]
    
              Space or comma separated list of features to activate
    
    
    
    
      -b, --bundles [<BUNDLES>...]
    
              Space or comma separated list of bundles to package
    
    
    
    
              [possible values: deb, rpm, appimage]
    
    
    
    
          --no-bundle
    
              Skip the bundling step even if `bundle > active` is `true` in tauri config
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
          --ci
    
              Skip prompting for values
    
    
    
    
              [env: CI=true]
    
    
    
    
          --skip-stapling
    
              Whether to wait for notarization to finish and `staple` the ticket onto the app.
    
    
    
    
              Gatekeeper will look for stapled tickets to tell whether your app was notarized without reaching out to Apple's servers which is helpful in offline environments.
    
    
    
    
              Enabling this option will also result in `tauri build` not waiting for notarization to finish which is helpful for the very first time your app is notarized as this can take multiple hours. On subsequent runs, it's recommended to disable this setting again.
    
    
    
    
          --ignore-version-mismatches
    
              Do not error out if a version mismatch is detected on a Tauri package.
    
    
    
    
              Only use this when you are sure the mismatch is incorrectly detected as version mismatched Tauri packages can lead to unknown behavior.
    
    
    
    
          --no-sign
    
              Skip code signing when bundling the app
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

### [`bundle`](#bundle)

[Section titled “bundle”](#bundle)

  * [ npm ](#tab-panel-961)
  * [ yarn ](#tab-panel-962)
  * [ pnpm ](#tab-panel-963)
  * [ deno ](#tab-panel-964)
  * [ bun ](#tab-panel-965)
  * [ cargo ](#tab-panel-966)


[code] 
    npm run tauri bundle
[/code]
[code] 
    yarn tauri bundle
[/code]
[code] 
    pnpm tauri bundle
[/code]
[code] 
    deno task tauri bundle
[/code]
[code] 
    bun tauri bundle
[/code]
[code] 
    cargo tauri bundle
[/code]
[code] 
    Generate bundles and installers for your app (already built by `tauri build`). This run `build.beforeBundleCommand` before generating the bundles and installers of your app.
    
    
    
    
    Usage: tauri bundle [OPTIONS]
    
    
    
    
    Options:
    
      -d, --debug
    
              Builds with the debug flag
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -b, --bundles [<BUNDLES>...]
    
              Space or comma separated list of bundles to package
    
    
    
    
              [possible values: deb, rpm, appimage]
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
      -f, --features [<FEATURES>...]
    
              Space or comma separated list of features, should be the same features passed to `tauri build` if any
    
    
    
    
      -t, --target <TARGET>
    
              Target triple to build against.
    
    
    
    
              It must be one of the values outputted by `$rustc --print target-list` or `universal-apple-darwin` for an universal macOS application.
    
    
    
    
              Note that compiling an universal macOS application requires both `aarch64-apple-darwin` and `x86_64-apple-darwin` targets to be installed.
    
    
    
    
          --ci
    
              Skip prompting for values
    
    
    
    
              [env: CI=true]
    
    
    
    
          --skip-stapling
    
              Whether to wait for notarization to finish and `staple` the ticket onto the app.
    
    
    
    
              Gatekeeper will look for stapled tickets to tell whether your app was notarized without reaching out to Apple's servers which is helpful in offline environments.
    
    
    
    
              Enabling this option will also result in `tauri build` not waiting for notarization to finish which is helpful for the very first time your app is notarized as this can take multiple hours. On subsequent runs, it's recommended to disable this setting again.
    
    
    
    
          --no-sign
    
              Skip code signing during the build or bundling process.
    
    
    
    
              Useful for local development and CI environments where signing certificates or environment variables are not available or not needed.
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

### [`android`](#android)

[Section titled “android”](#android)

  * [ npm ](#tab-panel-967)
  * [ yarn ](#tab-panel-968)
  * [ pnpm ](#tab-panel-969)
  * [ deno ](#tab-panel-970)
  * [ bun ](#tab-panel-971)
  * [ cargo ](#tab-panel-972)


[code] 
    npm run tauri android
[/code]
[code] 
    yarn tauri android
[/code]
[code] 
    pnpm tauri android
[/code]
[code] 
    deno task tauri android
[/code]
[code] 
    bun tauri android
[/code]
[code] 
    cargo tauri android
[/code]
[code] 
    Android commands
    
    
    
    
    Usage: tauri android [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      init   Initialize Android target in the project
    
      dev    Run your app in development mode on Android
    
      build  Build your app in release mode for Android and generate APKs and AABs
    
      run    Run your app in production mode on Android
    
      help   Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`android init`](#android-init)

[Section titled “android init”](#android-init)

  * [ npm ](#tab-panel-973)
  * [ yarn ](#tab-panel-974)
  * [ pnpm ](#tab-panel-975)
  * [ deno ](#tab-panel-976)
  * [ bun ](#tab-panel-977)
  * [ cargo ](#tab-panel-978)


[code] 
    npm run tauri android init
[/code]
[code] 
    yarn tauri android init
[/code]
[code] 
    pnpm tauri android init
[/code]
[code] 
    deno task tauri android init
[/code]
[code] 
    bun tauri android init
[/code]
[code] 
    cargo tauri android init
[/code]
[code] 
    Initialize Android target in the project
    
    
    
    
    Usage: tauri android init [OPTIONS]
    
    
    
    
    Options:
    
          --ci
    
              Skip prompting for values
    
    
    
    
              [env: CI=true]
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
          --skip-targets-install
    
              Skips installing rust toolchains via rustup
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

#### [`android dev`](#android-dev)

[Section titled “android dev”](#android-dev)

  * [ npm ](#tab-panel-979)
  * [ yarn ](#tab-panel-980)
  * [ pnpm ](#tab-panel-981)
  * [ deno ](#tab-panel-982)
  * [ bun ](#tab-panel-983)
  * [ cargo ](#tab-panel-984)


[code] 
    npm run tauri android dev
[/code]
[code] 
    yarn tauri android dev
[/code]
[code] 
    pnpm tauri android dev
[/code]
[code] 
    deno task tauri android dev
[/code]
[code] 
    bun tauri android dev
[/code]
[code] 
    cargo tauri android dev
[/code]
[code] 
    Run your app in development mode on Android with hot-reloading for the Rust code. It makes use of the `build.devUrl` property from your `tauri.conf.json` file. It also runs your `build.beforeDevCommand` which usually starts your frontend devServer.
    
    
    
    
    Usage: tauri android dev [OPTIONS] [DEVICE] [-- <ARGS>...]
    
    
    
    
    Arguments:
    
      [DEVICE]
    
              Runs on the given device name
    
    
    
    
      [ARGS]...
    
              Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. e.g. `tauri android dev -- [runnerArgs]`
    
    
    
    
    Options:
    
      -f, --features [<FEATURES>...]
    
              List of cargo features to activate
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -e, --exit-on-panic
    
              Exit on panic
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
          --release
    
              Run the code in release mode
    
    
    
    
          --no-dev-server-wait
    
              Skip waiting for the frontend dev server to start before building the tauri application
    
    
    
    
              [env: TAURI_CLI_NO_DEV_SERVER_WAIT=]
    
    
    
    
          --no-watch
    
              Disable the file watcher
    
    
    
    
          --additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>
    
              Additional paths to watch for changes
    
    
    
    
      -o, --open
    
              Open Android Studio instead of trying to run on a connected device
    
    
    
    
          --force-ip-prompt
    
              Force prompting for an IP to use to connect to the dev server on mobile
    
    
    
    
          --host [<HOST>]
    
              Use the public network address for the development server. If an actual address it provided, it is used instead of prompting to pick one.
    
    
    
    
              On Windows we use the public network address by default.
    
    
    
    
              This option is particularly useful along the `--open` flag when you intend on running on a physical device.
    
    
    
    
              This replaces the devUrl configuration value to match the public network address host, it is your responsibility to set up your development server to listen on this address by using 0.0.0.0 as host for instance.
    
    
    
    
              When this is set or when running on an iOS device the CLI sets the `TAURI_DEV_HOST` environment variable so you can check this on your framework's configuration to expose the development server on the public network address.
    
    
    
    
              [default: <none>]
    
    
    
    
          --no-dev-server
    
              Disable the built-in dev server for static files
    
    
    
    
          --port <PORT>
    
              Specify port for the built-in dev server for static files. Defaults to 1430
    
    
    
    
              [env: TAURI_CLI_PORT=]
    
    
    
    
          --root-certificate-path <ROOT_CERTIFICATE_PATH>
    
              Path to the certificate file used by your dev server. Required for mobile dev when using HTTPS
    
    
    
    
              [env: TAURI_DEV_ROOT_CERTIFICATE_PATH=]
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

#### [`android build`](#android-build)

[Section titled “android build”](#android-build)

  * [ npm ](#tab-panel-985)
  * [ yarn ](#tab-panel-986)
  * [ pnpm ](#tab-panel-987)
  * [ deno ](#tab-panel-988)
  * [ bun ](#tab-panel-989)
  * [ cargo ](#tab-panel-990)


[code] 
    npm run tauri android build
[/code]
[code] 
    yarn tauri android build
[/code]
[code] 
    pnpm tauri android build
[/code]
[code] 
    deno task tauri android build
[/code]
[code] 
    bun tauri android build
[/code]
[code] 
    cargo tauri android build
[/code]
[code] 
    Build your app in release mode for Android and generate APKs and AABs. It makes use of the `build.frontendDist` property from your `tauri.conf.json` file. It also runs your `build.beforeBuildCommand` which usually builds your frontend into `build.frontendDist`.
    
    
    
    
    Usage: tauri android build [OPTIONS] [-- <ARGS>...]
    
    
    
    
    Arguments:
    
      [ARGS]...
    
              Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. e.g. `tauri android build -- [runnerArgs]`
    
    
    
    
    Options:
    
      -d, --debug
    
              Builds with the debug flag
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -t, --target [<TARGETS>...]
    
              Which targets to build (all by default)
    
    
    
    
              [possible values: aarch64, armv7, i686, x86_64]
    
    
    
    
      -f, --features [<FEATURES>...]
    
              List of cargo features to activate
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
          --split-per-abi
    
              Whether to split the APKs and AABs per ABIs
    
    
    
    
          --apk <APK>
    
              Build APKs
    
    
    
    
              [possible values: true, false]
    
    
    
    
          --aab <AAB>
    
              Build AABs
    
    
    
    
              [possible values: true, false]
    
    
    
    
      -o, --open
    
              Open Android Studio
    
    
    
    
          --ci
    
              Skip prompting for values
    
    
    
    
              [env: CI=true]
    
    
    
    
          --ignore-version-mismatches
    
              Do not error out if a version mismatch is detected on a Tauri package.
    
    
    
    
              Only use this when you are sure the mismatch is incorrectly detected as version mismatched Tauri packages can lead to unknown behavior.
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

#### [`android run`](#android-run)

[Section titled “android run”](#android-run)

  * [ npm ](#tab-panel-991)
  * [ yarn ](#tab-panel-992)
  * [ pnpm ](#tab-panel-993)
  * [ deno ](#tab-panel-994)
  * [ bun ](#tab-panel-995)
  * [ cargo ](#tab-panel-996)


[code] 
    npm run tauri android run
[/code]
[code] 
    yarn tauri android run
[/code]
[code] 
    pnpm tauri android run
[/code]
[code] 
    deno task tauri android run
[/code]
[code] 
    bun tauri android run
[/code]
[code] 
    cargo tauri android run
[/code]
[code] 
    Run your app in production mode on Android. It makes use of the `build.frontendDist` property from your `tauri.conf.json` file. It also runs your `build.beforeBuildCommand` which usually builds your frontend into `build.frontendDist`.
    
    
    
    
    Usage: tauri android run [OPTIONS] [DEVICE] [-- <ARGS>...]
    
    
    
    
    Arguments:
    
      [DEVICE]
    
              Runs on the given device name
    
    
    
    
      [ARGS]...
    
              Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. e.g. `tauri android build -- [runnerArgs]`
    
    
    
    
    Options:
    
      -r, --release
    
              Run the app in release mode
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -f, --features [<FEATURES>...]
    
              List of cargo features to activate
    
    
    
    
      -c, --config <CONFIG>
    
              JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file
    
    
    
    
              Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.
    
    
    
    
              Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
    
    
    
    
          --no-watch
    
              Disable the file watcher
    
    
    
    
          --additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>
    
              Additional paths to watch for changes
    
    
    
    
      -o, --open
    
              Open Android Studio
    
    
    
    
          --ignore-version-mismatches
    
              Do not error out if a version mismatch is detected on a Tauri package.
    
    
    
    
              Only use this when you are sure the mismatch is incorrectly detected as version mismatched Tauri packages can lead to unknown behavior.
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

### [`migrate`](#migrate)

[Section titled “migrate”](#migrate)

  * [ npm ](#tab-panel-997)
  * [ yarn ](#tab-panel-998)
  * [ pnpm ](#tab-panel-999)
  * [ deno ](#tab-panel-1000)
  * [ bun ](#tab-panel-1001)
  * [ cargo ](#tab-panel-1002)


[code] 
    npm run tauri migrate
[/code]
[code] 
    yarn tauri migrate
[/code]
[code] 
    pnpm tauri migrate
[/code]
[code] 
    deno task tauri migrate
[/code]
[code] 
    bun tauri migrate
[/code]
[code] 
    cargo tauri migrate
[/code]
[code] 
    Migrate from v1 to v2
    
    
    
    
    Usage: tauri migrate [OPTIONS]
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

### [`info`](#info)

[Section titled “info”](#info)

  * [ npm ](#tab-panel-1003)
  * [ yarn ](#tab-panel-1004)
  * [ pnpm ](#tab-panel-1005)
  * [ deno ](#tab-panel-1006)
  * [ bun ](#tab-panel-1007)
  * [ cargo ](#tab-panel-1008)


[code] 
    npm run tauri info
[/code]
[code] 
    yarn tauri info
[/code]
[code] 
    pnpm tauri info
[/code]
[code] 
    deno task tauri info
[/code]
[code] 
    bun tauri info
[/code]
[code] 
    cargo tauri info
[/code]
[code] 
    Show a concise list of information about the environment, Rust, Node.js and their versions as well as a few relevant project configurations
    
    
    
    
    Usage: tauri info [OPTIONS]
    
    
    
    
    Options:
    
          --interactive  Interactive mode to apply automatic fixes
    
      -v, --verbose...   Enables verbose logging
    
      -h, --help         Print help
    
      -V, --version      Print version
[/code]

### [`add`](#add)

[Section titled “add”](#add)

  * [ npm ](#tab-panel-1009)
  * [ yarn ](#tab-panel-1010)
  * [ pnpm ](#tab-panel-1011)
  * [ deno ](#tab-panel-1012)
  * [ bun ](#tab-panel-1013)
  * [ cargo ](#tab-panel-1014)


[code] 
    npm run tauri add
[/code]
[code] 
    yarn tauri add
[/code]
[code] 
    pnpm tauri add
[/code]
[code] 
    deno task tauri add
[/code]
[code] 
    bun tauri add
[/code]
[code] 
    cargo tauri add
[/code]
[code] 
    Add a tauri plugin to the project
    
    
    
    
    Usage: tauri add [OPTIONS] <PLUGIN>
    
    
    
    
    Arguments:
    
      <PLUGIN>  The plugin to add
    
    
    
    
    Options:
    
      -t, --tag <TAG>        Git tag to use
    
      -v, --verbose...       Enables verbose logging
    
      -r, --rev <REV>        Git rev to use
    
      -b, --branch <BRANCH>  Git branch to use
    
          --no-fmt           Don't format code with rustfmt
    
      -h, --help             Print help
    
      -V, --version          Print version
[/code]

### [`remove`](#remove)

[Section titled “remove”](#remove)

  * [ npm ](#tab-panel-1015)
  * [ yarn ](#tab-panel-1016)
  * [ pnpm ](#tab-panel-1017)
  * [ deno ](#tab-panel-1018)
  * [ bun ](#tab-panel-1019)
  * [ cargo ](#tab-panel-1020)


[code] 
    npm run tauri remove
[/code]
[code] 
    yarn tauri remove
[/code]
[code] 
    pnpm tauri remove
[/code]
[code] 
    deno task tauri remove
[/code]
[code] 
    bun tauri remove
[/code]
[code] 
    cargo tauri remove
[/code]
[code] 
    Remove a tauri plugin from the project
    
    
    
    
    Usage: tauri remove [OPTIONS] <PLUGIN>
    
    
    
    
    Arguments:
    
      <PLUGIN>  The plugin to remove
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

### [`plugin`](#plugin)

[Section titled “plugin”](#plugin)

  * [ npm ](#tab-panel-1021)
  * [ yarn ](#tab-panel-1022)
  * [ pnpm ](#tab-panel-1023)
  * [ deno ](#tab-panel-1024)
  * [ bun ](#tab-panel-1025)
  * [ cargo ](#tab-panel-1026)


[code] 
    npm run tauri plugin
[/code]
[code] 
    yarn tauri plugin
[/code]
[code] 
    pnpm tauri plugin
[/code]
[code] 
    deno task tauri plugin
[/code]
[code] 
    bun tauri plugin
[/code]
[code] 
    cargo tauri plugin
[/code]
[code] 
    Manage or create Tauri plugins
    
    
    
    
    Usage: tauri plugin [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      new      Initializes a new Tauri plugin project
    
      init     Initialize a Tauri plugin project on an existing directory
    
      android  Manage the Android project for a Tauri plugin
    
      ios      Manage the iOS project for a Tauri plugin
    
      help     Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`plugin new`](#plugin-new)

[Section titled “plugin new”](#plugin-new)

  * [ npm ](#tab-panel-1027)
  * [ yarn ](#tab-panel-1028)
  * [ pnpm ](#tab-panel-1029)
  * [ deno ](#tab-panel-1030)
  * [ bun ](#tab-panel-1031)
  * [ cargo ](#tab-panel-1032)


[code] 
    npm run tauri plugin new
[/code]
[code] 
    yarn tauri plugin new
[/code]
[code] 
    pnpm tauri plugin new
[/code]
[code] 
    deno task tauri plugin new
[/code]
[code] 
    bun tauri plugin new
[/code]
[code] 
    cargo tauri plugin new
[/code]
[code] 
    Initializes a new Tauri plugin project
    
    
    
    
    Usage: tauri plugin new [OPTIONS] <PLUGIN_NAME>
    
    
    
    
    Arguments:
    
      <PLUGIN_NAME>
    
              Name of your Tauri plugin
    
    
    
    
    Options:
    
          --no-api
    
              Initializes a Tauri plugin without the TypeScript API
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
          --no-example
    
              Initialize without an example project
    
    
    
    
      -d, --directory <DIRECTORY>
    
              Set target directory for init
    
    
    
    
      -a, --author <AUTHOR>
    
              Author name
    
    
    
    
          --android
    
              Whether to initialize an Android project for the plugin
    
    
    
    
          --ios
    
              Whether to initialize an iOS project for the plugin
    
    
    
    
          --mobile
    
              Whether to initialize Android and iOS projects for the plugin
    
    
    
    
          --ios-framework <IOS_FRAMEWORK>
    
              Type of framework to use for the iOS project
    
    
    
    
              [default: spm]
    
    
    
    
              Possible values:
    
              - spm:   Swift Package Manager project
    
              - xcode: Xcode project
    
    
    
    
          --github-workflows
    
              Generate github workflows
    
    
    
    
      -t, --tauri-path <TAURI_PATH>
    
              Path of the Tauri project to use (relative to the cwd)
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

#### [`plugin init`](#plugin-init)

[Section titled “plugin init”](#plugin-init)

  * [ npm ](#tab-panel-1033)
  * [ yarn ](#tab-panel-1034)
  * [ pnpm ](#tab-panel-1035)
  * [ deno ](#tab-panel-1036)
  * [ bun ](#tab-panel-1037)
  * [ cargo ](#tab-panel-1038)


[code] 
    npm run tauri plugin init
[/code]
[code] 
    yarn tauri plugin init
[/code]
[code] 
    pnpm tauri plugin init
[/code]
[code] 
    deno task tauri plugin init
[/code]
[code] 
    bun tauri plugin init
[/code]
[code] 
    cargo tauri plugin init
[/code]
[code] 
    Initialize a Tauri plugin project on an existing directory
    
    
    
    
    Usage: tauri plugin init [OPTIONS] [PLUGIN_NAME]
    
    
    
    
    Arguments:
    
      [PLUGIN_NAME]
    
              Name of your Tauri plugin. If not specified, it will be inferred from the current directory
    
    
    
    
    Options:
    
          --no-api
    
              Initializes a Tauri plugin without the TypeScript API
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
          --no-example
    
              Initialize without an example project
    
    
    
    
      -d, --directory <DIRECTORY>
    
              Set target directory for init
    
    
    
    
              [default: /opt/build/repo/packages/cli-generator]
    
    
    
    
      -a, --author <AUTHOR>
    
              Author name
    
    
    
    
          --android
    
              Whether to initialize an Android project for the plugin
    
    
    
    
          --ios
    
              Whether to initialize an iOS project for the plugin
    
    
    
    
          --mobile
    
              Whether to initialize Android and iOS projects for the plugin
    
    
    
    
          --ios-framework <IOS_FRAMEWORK>
    
              Type of framework to use for the iOS project
    
    
    
    
              [default: spm]
    
    
    
    
              Possible values:
    
              - spm:   Swift Package Manager project
    
              - xcode: Xcode project
    
    
    
    
          --github-workflows
    
              Generate github workflows
    
    
    
    
      -t, --tauri-path <TAURI_PATH>
    
              Path of the Tauri project to use (relative to the cwd)
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

#### [`plugin android`](#plugin-android)

[Section titled “plugin android”](#plugin-android)

  * [ npm ](#tab-panel-1039)
  * [ yarn ](#tab-panel-1040)
  * [ pnpm ](#tab-panel-1041)
  * [ deno ](#tab-panel-1042)
  * [ bun ](#tab-panel-1043)
  * [ cargo ](#tab-panel-1044)


[code] 
    npm run tauri plugin android
[/code]
[code] 
    yarn tauri plugin android
[/code]
[code] 
    pnpm tauri plugin android
[/code]
[code] 
    deno task tauri plugin android
[/code]
[code] 
    bun tauri plugin android
[/code]
[code] 
    cargo tauri plugin android
[/code]
[code] 
    Manage the Android project for a Tauri plugin
    
    
    
    
    Usage: tauri plugin android [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      init  Initializes the Android project for an existing Tauri plugin
    
      help  Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

##### [`plugin android init`](#plugin-android-init)

[Section titled “plugin android init”](#plugin-android-init)

  * [ npm ](#tab-panel-1045)
  * [ yarn ](#tab-panel-1046)
  * [ pnpm ](#tab-panel-1047)
  * [ deno ](#tab-panel-1048)
  * [ bun ](#tab-panel-1049)
  * [ cargo ](#tab-panel-1050)


[code] 
    npm run tauri plugin android init
[/code]
[code] 
    yarn tauri plugin android init
[/code]
[code] 
    pnpm tauri plugin android init
[/code]
[code] 
    deno task tauri plugin android init
[/code]
[code] 
    bun tauri plugin android init
[/code]
[code] 
    cargo tauri plugin android init
[/code]
[code] 
    Initializes the Android project for an existing Tauri plugin
    
    
    
    
    Usage: tauri plugin android init [OPTIONS] [PLUGIN_NAME]
    
    
    
    
    Arguments:
    
      [PLUGIN_NAME]  Name of your Tauri plugin. Must match the current plugin's name. If not specified, it will be inferred from the current directory
    
    
    
    
    Options:
    
      -o, --out-dir <OUT_DIR>  The output directory [default: /opt/build/repo/packages/cli-generator]
    
      -v, --verbose...         Enables verbose logging
    
      -h, --help               Print help
    
      -V, --version            Print version
[/code]

#### [`plugin ios`](#plugin-ios)

[Section titled “plugin ios”](#plugin-ios)

  * [ npm ](#tab-panel-1051)
  * [ yarn ](#tab-panel-1052)
  * [ pnpm ](#tab-panel-1053)
  * [ deno ](#tab-panel-1054)
  * [ bun ](#tab-panel-1055)
  * [ cargo ](#tab-panel-1056)


[code] 
    npm run tauri plugin ios
[/code]
[code] 
    yarn tauri plugin ios
[/code]
[code] 
    pnpm tauri plugin ios
[/code]
[code] 
    deno task tauri plugin ios
[/code]
[code] 
    bun tauri plugin ios
[/code]
[code] 
    cargo tauri plugin ios
[/code]
[code] 
    Manage the iOS project for a Tauri plugin
    
    
    
    
    Usage: tauri plugin ios [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      init  Initializes the iOS project for an existing Tauri plugin
    
      help  Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

##### [`plugin ios init`](#plugin-ios-init)

[Section titled “plugin ios init”](#plugin-ios-init)

  * [ npm ](#tab-panel-1057)
  * [ yarn ](#tab-panel-1058)
  * [ pnpm ](#tab-panel-1059)
  * [ deno ](#tab-panel-1060)
  * [ bun ](#tab-panel-1061)
  * [ cargo ](#tab-panel-1062)


[code] 
    npm run tauri plugin ios init
[/code]
[code] 
    yarn tauri plugin ios init
[/code]
[code] 
    pnpm tauri plugin ios init
[/code]
[code] 
    deno task tauri plugin ios init
[/code]
[code] 
    bun tauri plugin ios init
[/code]
[code] 
    cargo tauri plugin ios init
[/code]
[code] 
    Initializes the iOS project for an existing Tauri plugin
    
    
    
    
    Usage: tauri plugin ios init [OPTIONS] [PLUGIN_NAME]
    
    
    
    
    Arguments:
    
      [PLUGIN_NAME]
    
              Name of your Tauri plugin. Must match the current plugin's name. If not specified, it will be inferred from the current directory
    
    
    
    
    Options:
    
      -o, --out-dir <OUT_DIR>
    
              The output directory
    
    
    
    
              [default: /opt/build/repo/packages/cli-generator]
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
          --ios-framework <IOS_FRAMEWORK>
    
              Type of framework to use for the iOS project
    
    
    
    
              [default: spm]
    
    
    
    
              Possible values:
    
              - spm:   Swift Package Manager project
    
              - xcode: Xcode project
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

### [`icon`](#icon)

[Section titled “icon”](#icon)

  * [ npm ](#tab-panel-1063)
  * [ yarn ](#tab-panel-1064)
  * [ pnpm ](#tab-panel-1065)
  * [ deno ](#tab-panel-1066)
  * [ bun ](#tab-panel-1067)
  * [ cargo ](#tab-panel-1068)


[code] 
    npm run tauri icon
[/code]
[code] 
    yarn tauri icon
[/code]
[code] 
    pnpm tauri icon
[/code]
[code] 
    deno task tauri icon
[/code]
[code] 
    bun tauri icon
[/code]
[code] 
    cargo tauri icon
[/code]
[code] 
    Generate various icons for all major platforms
    
    
    
    
    Usage: tauri icon [OPTIONS] [INPUT]
    
    
    
    
    Arguments:
    
      [INPUT]
    
              Path to the source icon (squared PNG or SVG file with transparency) or a manifest file.
    
    
    
    
              The manifest file is a JSON file with the following structure: { "default": "app-icon.png", "bg_color": "#fff", "android_bg": "app-icon-bg.png", "android_fg": "app-icon-fg.png", "android_fg_scale": 85, "android_monochrome": "app-icon-monochrome.png" }
    
    
    
    
              All file paths defined in the manifest JSON are relative to the manifest file path.
    
    
    
    
              Only the `default` manifest property is required.
    
    
    
    
              The `bg_color` manifest value overwrites the `--ios-color` option if set.
    
    
    
    
              [default: ./app-icon.png]
    
    
    
    
    Options:
    
      -o, --output <OUTPUT>
    
              Output directory. Default: 'icons' directory next to the tauri.conf.json file
    
    
    
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -p, --png <PNG>
    
              Custom PNG icon sizes to generate. When set, the default icons are not generated
    
    
    
    
          --ios-color <IOS_COLOR>
    
              The background color of the iOS icon - string as defined in the W3C's CSS Color Module Level 4 <https://www.w3.org/TR/css-color-4/>
    
    
    
    
              [default: #fff]
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

### [`signer`](#signer)

[Section titled “signer”](#signer)

  * [ npm ](#tab-panel-1069)
  * [ yarn ](#tab-panel-1070)
  * [ pnpm ](#tab-panel-1071)
  * [ deno ](#tab-panel-1072)
  * [ bun ](#tab-panel-1073)
  * [ cargo ](#tab-panel-1074)


[code] 
    npm run tauri signer
[/code]
[code] 
    yarn tauri signer
[/code]
[code] 
    pnpm tauri signer
[/code]
[code] 
    deno task tauri signer
[/code]
[code] 
    bun tauri signer
[/code]
[code] 
    cargo tauri signer
[/code]
[code] 
    Generate signing keys for Tauri updater or sign files
    
    
    
    
    Usage: tauri signer [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      sign      Sign a file
    
      generate  Generate a new signing key to sign files
    
      help      Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`signer sign`](#signer-sign)

[Section titled “signer sign”](#signer-sign)

  * [ npm ](#tab-panel-1075)
  * [ yarn ](#tab-panel-1076)
  * [ pnpm ](#tab-panel-1077)
  * [ deno ](#tab-panel-1078)
  * [ bun ](#tab-panel-1079)
  * [ cargo ](#tab-panel-1080)


[code] 
    npm run tauri signer sign
[/code]
[code] 
    yarn tauri signer sign
[/code]
[code] 
    pnpm tauri signer sign
[/code]
[code] 
    deno task tauri signer sign
[/code]
[code] 
    bun tauri signer sign
[/code]
[code] 
    cargo tauri signer sign
[/code]
[code] 
    Sign a file
    
    
    
    
    Usage: tauri signer sign [OPTIONS] <FILE>
    
    
    
    
    Arguments:
    
      <FILE>  Sign the specified file
    
    
    
    
    Options:
    
      -k, --private-key <PRIVATE_KEY>
    
              Load the private key from a string [env: TAURI_PRIVATE_KEY=]
    
      -v, --verbose...
    
              Enables verbose logging
    
      -f, --private-key-path <PRIVATE_KEY_PATH>
    
              Load the private key from a file [env: TAURI_PRIVATE_KEY_PATH=]
    
      -p, --password <PASSWORD>
    
              Set private key password when signing [env: TAURI_PRIVATE_KEY_PASSWORD=]
    
      -h, --help
    
              Print help
    
      -V, --version
    
              Print version
[/code]

#### [`signer generate`](#signer-generate)

[Section titled “signer generate”](#signer-generate)

  * [ npm ](#tab-panel-1081)
  * [ yarn ](#tab-panel-1082)
  * [ pnpm ](#tab-panel-1083)
  * [ deno ](#tab-panel-1084)
  * [ bun ](#tab-panel-1085)
  * [ cargo ](#tab-panel-1086)


[code] 
    npm run tauri signer generate
[/code]
[code] 
    yarn tauri signer generate
[/code]
[code] 
    pnpm tauri signer generate
[/code]
[code] 
    deno task tauri signer generate
[/code]
[code] 
    bun tauri signer generate
[/code]
[code] 
    cargo tauri signer generate
[/code]
[code] 
    Generate a new signing key to sign files
    
    
    
    
    Usage: tauri signer generate [OPTIONS]
    
    
    
    
    Options:
    
      -p, --password <PASSWORD>      Set private key password when signing
    
      -v, --verbose...               Enables verbose logging
    
      -w, --write-keys <WRITE_KEYS>  Write private key to a file
    
      -f, --force                    Overwrite private key even if it exists on the specified path
    
          --ci                       Skip prompting for values [env: CI=true]
    
      -h, --help                     Print help
    
      -V, --version                  Print version
[/code]

### [`completions`](#completions)

[Section titled “completions”](#completions)

  * [ npm ](#tab-panel-1087)
  * [ yarn ](#tab-panel-1088)
  * [ pnpm ](#tab-panel-1089)
  * [ deno ](#tab-panel-1090)
  * [ bun ](#tab-panel-1091)
  * [ cargo ](#tab-panel-1092)


[code] 
    npm run tauri completions
[/code]
[code] 
    yarn tauri completions
[/code]
[code] 
    pnpm tauri completions
[/code]
[code] 
    deno task tauri completions
[/code]
[code] 
    bun tauri completions
[/code]
[code] 
    cargo tauri completions
[/code]
[code] 
    Generate Tauri CLI shell completions for Bash, Zsh, PowerShell or Fish
    
    
    
    
    Usage: tauri completions [OPTIONS] --shell <SHELL>
    
    
    
    
    Options:
    
      -s, --shell <SHELL>    Shell to generate a completion script for. [possible values: bash, elvish, fish, powershell, zsh]
    
      -v, --verbose...       Enables verbose logging
    
      -o, --output <OUTPUT>  Output file for the shell completions. By default the completions are printed to stdout
    
      -h, --help             Print help
    
      -V, --version          Print version
[/code]

### [`permission`](#permission)

[Section titled “permission”](#permission)

  * [ npm ](#tab-panel-1093)
  * [ yarn ](#tab-panel-1094)
  * [ pnpm ](#tab-panel-1095)
  * [ deno ](#tab-panel-1096)
  * [ bun ](#tab-panel-1097)
  * [ cargo ](#tab-panel-1098)


[code] 
    npm run tauri permission
[/code]
[code] 
    yarn tauri permission
[/code]
[code] 
    pnpm tauri permission
[/code]
[code] 
    deno task tauri permission
[/code]
[code] 
    bun tauri permission
[/code]
[code] 
    cargo tauri permission
[/code]
[code] 
    Manage or create permissions for your app or plugin
    
    
    
    
    Usage: tauri permission [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      new   Create a new permission file
    
      add   Add a permission to capabilities
    
      rm    Remove a permission file, and its reference from any capability
    
      ls    List permissions available to your application
    
      help  Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`permission new`](#permission-new)

[Section titled “permission new”](#permission-new)

  * [ npm ](#tab-panel-1099)
  * [ yarn ](#tab-panel-1100)
  * [ pnpm ](#tab-panel-1101)
  * [ deno ](#tab-panel-1102)
  * [ bun ](#tab-panel-1103)
  * [ cargo ](#tab-panel-1104)


[code] 
    npm run tauri permission new
[/code]
[code] 
    yarn tauri permission new
[/code]
[code] 
    pnpm tauri permission new
[/code]
[code] 
    deno task tauri permission new
[/code]
[code] 
    bun tauri permission new
[/code]
[code] 
    cargo tauri permission new
[/code]
[code] 
    Create a new permission file
    
    
    
    
    Usage: tauri permission new [OPTIONS] [IDENTIFIER]
    
    
    
    
    Arguments:
    
      [IDENTIFIER]  Permission identifier
    
    
    
    
    Options:
    
          --description <DESCRIPTION>  Permission description
    
      -v, --verbose...                 Enables verbose logging
    
      -a, --allow <ALLOW>              List of commands to allow
    
      -d, --deny <DENY>                List of commands to deny
    
          --format <FORMAT>            Output file format [default: json] [possible values: json, toml]
    
      -o, --out <OUT>                  The output file
    
      -h, --help                       Print help
    
      -V, --version                    Print version
[/code]

#### [`permission add`](#permission-add)

[Section titled “permission add”](#permission-add)

  * [ npm ](#tab-panel-1105)
  * [ yarn ](#tab-panel-1106)
  * [ pnpm ](#tab-panel-1107)
  * [ deno ](#tab-panel-1108)
  * [ bun ](#tab-panel-1109)
  * [ cargo ](#tab-panel-1110)


[code] 
    npm run tauri permission add
[/code]
[code] 
    yarn tauri permission add
[/code]
[code] 
    pnpm tauri permission add
[/code]
[code] 
    deno task tauri permission add
[/code]
[code] 
    bun tauri permission add
[/code]
[code] 
    cargo tauri permission add
[/code]
[code] 
    Add a permission to capabilities
    
    
    
    
    Usage: tauri permission add [OPTIONS] <IDENTIFIER> [CAPABILITY]
    
    
    
    
    Arguments:
    
      <IDENTIFIER>  Permission to add
    
      [CAPABILITY]  Capability to add the permission to
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`permission rm`](#permission-rm)

[Section titled “permission rm”](#permission-rm)

  * [ npm ](#tab-panel-1111)
  * [ yarn ](#tab-panel-1112)
  * [ pnpm ](#tab-panel-1113)
  * [ deno ](#tab-panel-1114)
  * [ bun ](#tab-panel-1115)
  * [ cargo ](#tab-panel-1116)


[code] 
    npm run tauri permission rm
[/code]
[code] 
    yarn tauri permission rm
[/code]
[code] 
    pnpm tauri permission rm
[/code]
[code] 
    deno task tauri permission rm
[/code]
[code] 
    bun tauri permission rm
[/code]
[code] 
    cargo tauri permission rm
[/code]
[code] 
    Remove a permission file, and its reference from any capability
    
    
    
    
    Usage: tauri permission rm [OPTIONS] <IDENTIFIER>
    
    
    
    
    Arguments:
    
      <IDENTIFIER>
    
              Permission to remove.
    
    
    
    
              To remove all permissions for a given plugin, provide `<plugin-name>:*`
    
    
    
    
    Options:
    
      -v, --verbose...
    
              Enables verbose logging
    
    
    
    
      -h, --help
    
              Print help (see a summary with '-h')
    
    
    
    
      -V, --version
    
              Print version
[/code]

#### [`permission ls`](#permission-ls)

[Section titled “permission ls”](#permission-ls)

  * [ npm ](#tab-panel-1117)
  * [ yarn ](#tab-panel-1118)
  * [ pnpm ](#tab-panel-1119)
  * [ deno ](#tab-panel-1120)
  * [ bun ](#tab-panel-1121)
  * [ cargo ](#tab-panel-1122)


[code] 
    npm run tauri permission ls
[/code]
[code] 
    yarn tauri permission ls
[/code]
[code] 
    pnpm tauri permission ls
[/code]
[code] 
    deno task tauri permission ls
[/code]
[code] 
    bun tauri permission ls
[/code]
[code] 
    cargo tauri permission ls
[/code]
[code] 
    List permissions available to your application
    
    
    
    
    Usage: tauri permission ls [OPTIONS] [PLUGIN]
    
    
    
    
    Arguments:
    
      [PLUGIN]  Name of the plugin to list permissions
    
    
    
    
    Options:
    
      -f, --filter <FILTER>  Permission identifier filter
    
      -v, --verbose...       Enables verbose logging
    
      -h, --help             Print help
    
      -V, --version          Print version
[/code]

### [`capability`](#capability)

[Section titled “capability”](#capability)

  * [ npm ](#tab-panel-1123)
  * [ yarn ](#tab-panel-1124)
  * [ pnpm ](#tab-panel-1125)
  * [ deno ](#tab-panel-1126)
  * [ bun ](#tab-panel-1127)
  * [ cargo ](#tab-panel-1128)


[code] 
    npm run tauri capability
[/code]
[code] 
    yarn tauri capability
[/code]
[code] 
    pnpm tauri capability
[/code]
[code] 
    deno task tauri capability
[/code]
[code] 
    bun tauri capability
[/code]
[code] 
    cargo tauri capability
[/code]
[code] 
    Manage or create capabilities for your app
    
    
    
    
    Usage: tauri capability [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      new   Create a new permission file
    
      help  Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`capability new`](#capability-new)

[Section titled “capability new”](#capability-new)

  * [ npm ](#tab-panel-1129)
  * [ yarn ](#tab-panel-1130)
  * [ pnpm ](#tab-panel-1131)
  * [ deno ](#tab-panel-1132)
  * [ bun ](#tab-panel-1133)
  * [ cargo ](#tab-panel-1134)


[code] 
    npm run tauri capability new
[/code]
[code] 
    yarn tauri capability new
[/code]
[code] 
    pnpm tauri capability new
[/code]
[code] 
    deno task tauri capability new
[/code]
[code] 
    bun tauri capability new
[/code]
[code] 
    cargo tauri capability new
[/code]
[code] 
    Create a new permission file
    
    
    
    
    Usage: tauri capability new [OPTIONS] [IDENTIFIER]
    
    
    
    
    Arguments:
    
      [IDENTIFIER]  Capability identifier
    
    
    
    
    Options:
    
          --description <DESCRIPTION>  Capability description
    
      -v, --verbose...                 Enables verbose logging
    
          --windows <WINDOWS>          Capability windows
    
          --permission <PERMISSION>    Capability permissions
    
          --format <FORMAT>            Output file format [default: json] [possible values: json, toml]
    
      -o, --out <OUT>                  The output file
    
      -h, --help                       Print help
    
      -V, --version                    Print version
[/code]

### [`inspect`](#inspect)

[Section titled “inspect”](#inspect)

  * [ npm ](#tab-panel-1135)
  * [ yarn ](#tab-panel-1136)
  * [ pnpm ](#tab-panel-1137)
  * [ deno ](#tab-panel-1138)
  * [ bun ](#tab-panel-1139)
  * [ cargo ](#tab-panel-1140)


[code] 
    npm run tauri inspect
[/code]
[code] 
    yarn tauri inspect
[/code]
[code] 
    pnpm tauri inspect
[/code]
[code] 
    deno task tauri inspect
[/code]
[code] 
    bun tauri inspect
[/code]
[code] 
    cargo tauri inspect
[/code]
[code] 
    Manage or create permissions for your app or plugin
    
    
    
    
    Usage: tauri inspect [OPTIONS] <COMMAND>
    
    
    
    
    Commands:
    
      wix-upgrade-code  Print the default Upgrade Code used by MSI installer derived from productName
    
      help              Print this message or the help of the given subcommand(s)
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

#### [`inspect wix-upgrade-code`](#inspect-wix-upgrade-code)

[Section titled “inspect wix-upgrade-code”](#inspect-wix-upgrade-code)

  * [ npm ](#tab-panel-1141)
  * [ yarn ](#tab-panel-1142)
  * [ pnpm ](#tab-panel-1143)
  * [ deno ](#tab-panel-1144)
  * [ bun ](#tab-panel-1145)
  * [ cargo ](#tab-panel-1146)


[code] 
    npm run tauri inspect wix-upgrade-code
[/code]
[code] 
    yarn tauri inspect wix-upgrade-code
[/code]
[code] 
    pnpm tauri inspect wix-upgrade-code
[/code]
[code] 
    deno task tauri inspect wix-upgrade-code
[/code]
[code] 
    bun tauri inspect wix-upgrade-code
[/code]
[code] 
    cargo tauri inspect wix-upgrade-code
[/code]
[code] 
    Print the default Upgrade Code used by MSI installer derived from productName
    
    
    
    
    Usage: tauri inspect wix-upgrade-code [OPTIONS]
    
    
    
    
    Options:
    
      -v, --verbose...  Enables verbose logging
    
      -h, --help        Print help
    
      -V, --version     Print version
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/cli](https://v2.tauri.app/reference/cli)