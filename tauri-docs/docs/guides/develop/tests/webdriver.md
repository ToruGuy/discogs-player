# WebDriver

[WebDriver](https://www.w3.org/TR/webdriver/) is a standardized interface to interact with web documents primarily intended for automated testing. Tauri supports the [WebDriver](https://www.w3.org/TR/webdriver/) interface by leveraging the native platform’s [WebDriver](https://www.w3.org/TR/webdriver/) server underneath a cross-platform wrapper [`tauri-driver`](https://crates.io/crates/tauri-driver). On desktop, only Windows and Linux are supported due to macOS not having a WKWebView driver tool available. iOS and Android work through Appium 2, but the process is not currently streamlined.

## [System Dependencies](#system-dependencies)

[Section titled “System Dependencies”](#system-dependencies)

Install the latest [`tauri-driver`](https://crates.io/crates/tauri-driver) or update an existing installation by running:

Terminal window
[code]
    cargo install tauri-driver --locked
[/code]

Because we currently utilize the platform’s native [WebDriver](https://www.w3.org/TR/webdriver/) server, there are some requirements for running [`tauri-driver`](https://crates.io/crates/tauri-driver) on supported platforms.

### [Linux](#linux)

[Section titled “Linux”](#linux)

We use `WebKitWebDriver` on Linux platforms. Check if this binary exists already by running the `which WebKitWebDriver` command as some distributions bundle it with the regular WebKit package. Other platforms may have a separate package for them, such as `webkit2gtk-driver` on Debian-based distributions.

### [Windows](#windows)

[Section titled “Windows”](#windows)

Make sure to grab the version of [Microsoft Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) that matches your Windows Edge version that the application is being built and tested on. This should almost always be the latest stable version on up-to-date Windows installs. If the two versions do not match, you may experience your WebDriver testing suite hanging while trying to connect.

You can use the [msedgedriver-tool](https://github.com/chippers/msedgedriver-tool) to download the appropriate Microsoft Edge Driver:

Terminal window
[code]
    cargo install --git https://github.com/chippers/msedgedriver-tool
    
    & "$HOME/.cargo/bin/msedgedriver-tool.exe"
[/code]

The download contains a binary called `msedgedriver.exe`. [`tauri-driver`](https://crates.io/crates/tauri-driver) looks for that binary in the `$PATH` so make sure it’s either available on the path or use the `--native-driver` option on [`tauri-driver`](https://crates.io/crates/tauri-driver). You may want to download this automatically as part of the CI setup process to ensure the Edge, and Edge Driver versions stay in sync on Windows CI machines. A guide on how to do this may be added at a later date.

## [Example Applications](#example-applications)

[Section titled “Example Applications”](#example-applications)

Below are step-by-step guides to show how to create a minimal example application that is tested with WebDriver.

If you prefer to see the result of the guide and look over a finished minimal codebase that utilizes it, you can look at <https://github.com/tauri-apps/webdriver-example>.

[ Selenium ](/develop/tests/webdriver/example/selenium/)

[ WebdriverIO ](/develop/tests/webdriver/example/webdriverio/)

## [Continuous Integration (CI)](#continuous-integration-ci)

[Section titled “Continuous Integration (CI)”](#continuous-integration-ci)

The above examples also comes with a CI script to test with GitHub Actions, but you may still be interested in the below WebDriver CI guide as it explains the concept a bit more.

[ Continuous Integration (CI) ](/develop/tests/webdriver/ci/)

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/develop/tests/webdriver](https://v2.tauri.app/develop/tests/webdriver)