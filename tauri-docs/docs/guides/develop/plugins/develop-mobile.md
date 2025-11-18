# Mobile Plugin Development

Plugins can run native mobile code written in Kotlin (or Java) and Swift. The default plugin template includes an Android library project using Kotlin and a Swift package including an example mobile command showing how to trigger its execution from Rust code.

## [Initialize Plugin Project](#initialize-plugin-project)

[Section titled “Initialize Plugin Project”](#initialize-plugin-project)

Follow the steps in the [Plugin Development guide](/develop/plugins/#initialize-plugin-project) to initialize a new plugin project.

If you have an existing plugin and would like to add Android or iOS capabilities to it, you can use `plugin android init` and `plugin ios init` to bootstrap the mobile library projects and guide you through the changes needed.

The default plugin template splits the plugin’s implementation into two separate modules: `desktop.rs` and `mobile.rs`.

The desktop implementation uses Rust code to implement a functionality, while the mobile implementation sends a message to the native mobile code to execute a function and get a result back. If shared logic is needed across both implementations, it can be defined in `lib.rs`:

src/lib.rs
[code]
    use tauri::Runtime;
    
    
    
    
    impl<R: Runtime> <plugin-name><R> {
    
      pub fn do_something(&self) {
    
        // do something that is a shared implementation between desktop and mobile
    
      }
    
    }
[/code]

This implementation simplifies the process of sharing an API that can be used both by commands and Rust code.

### [Develop an Android Plugin](#develop-an-android-plugin)

[Section titled “Develop an Android Plugin”](#develop-an-android-plugin)

A Tauri plugin for Android is defined as a Kotlin class that extends `app.tauri.plugin.Plugin` and is annotated with `app.tauri.annotation.TauriPlugin`. Each method annotated with `app.tauri.annotation.Command` can be called by Rust or JavaScript.

Tauri uses Kotlin by default for the Android plugin implementation, but you can switch to Java if you prefer. After generating a plugin, right click the Kotlin plugin class in Android Studio and select the “Convert Kotlin file to Java file” option from the menu. Android Studio will guide you through the project migration to Java.

### [Develop an iOS Plugin](#develop-an-ios-plugin)

[Section titled “Develop an iOS Plugin”](#develop-an-ios-plugin)

A Tauri plugin for iOS is defined as a Swift class that extends the `Plugin` class from the `Tauri` package. Each function with the `@objc` attribute and the `(_ invoke: Invoke)` parameter (for example `@objc private func download(_ invoke: Invoke) { }`) can be called by Rust or JavaScript.

The plugin is defined as a [Swift package](https://www.swift.org/package-manager/) so that you can use its package manager to manage dependencies.

## [Plugin Configuration](#plugin-configuration)

[Section titled “Plugin Configuration”](#plugin-configuration)

Refer to the [Plugin Configuration section](/develop/plugins/#plugin-configuration) of the Plugin Development guide for more details on developing plugin configurations.

The plugin instance on mobile has a getter for the plugin configuration:

  * [ Android ](#tab-panel-1638)
  * [ iOS ](#tab-panel-1639)


[code] 
    import android.app.Activity
    
    import android.webkit.WebView
    
    import app.tauri.annotation.TauriPlugin
    
    import app.tauri.annotation.InvokeArg
    
    
    
    
    @InvokeArg
    
    class Config {
    
        var timeout: Int? = 3000
    
    }
    
    
    
    
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
      private var timeout: Int? = 3000
    
    
    
    
      override fun load(webView: WebView) {
    
        getConfig(Config::class.java).let {
    
           this.timeout = it.timeout
    
        }
    
      }
    
    }
[/code]
[code] 
    struct Config: Decodable {
    
      let timeout: Int?
    
    }
    
    
    
    
    class ExamplePlugin: Plugin {
    
      var timeout: Int? = 3000
    
    
    
    
      @objc public override func load(webview: WKWebView) {
    
        do {
    
          let config = try parseConfig(Config.self)
    
          self.timeout = config.timeout
    
        } catch {}
    
      }
    
    }
[/code]

## [Lifecycle Events](#lifecycle-events)

[Section titled “Lifecycle Events”](#lifecycle-events)

Plugins can hook into several lifecycle events:

  * [load](#load): When the plugin is loaded into the web view
  * [onNewIntent](#onnewintent): Android only, when the activity is re-launched


There are also the additional [lifecycle events for plugins](/develop/plugins/#lifecycle-events) in the Plugin Development guide.

### [load](#load)

[Section titled “load”](#load)

  * **When** : When the plugin is loaded into the web view
  * **Why** : Execute plugin initialization code


  * [ Android ](#tab-panel-1640)
  * [ iOS ](#tab-panel-1641)


[code] 
    import android.app.Activity
    
    import android.webkit.WebView
    
    import app.tauri.annotation.TauriPlugin
    
    
    
    
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
      override fun load(webView: WebView) {
    
        // perform plugin setup here
    
      }
    
    }
[/code]
[code] 
    class ExamplePlugin: Plugin {
    
      @objc public override func load(webview: WKWebView) {
    
        let timeout = self.config["timeout"] as? Int ?? 30
    
      }
    
    }
[/code]

### [onNewIntent](#onnewintent)

[Section titled “onNewIntent”](#onnewintent)

**Note** : This is only available on Android.

  * **When** : When the activity is re-launched. See [Activity#onNewIntent](https://developer.android.com/reference/android/app/Activity#onNewIntent\(android.content.Intent\)) for more information.
  * **Why** : Handle application re-launch such as when a notification is clicked or a deep link is accessed.


[code] 
    import android.app.Activity
    
    import android.content.Intent
    
    import app.tauri.annotation.TauriPlugin
    
    
    
    
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
      override fun onNewIntent(intent: Intent) {
    
        // handle new intent event
    
      }
    
    }
[/code]

## [Adding Mobile Commands](#adding-mobile-commands)

[Section titled “Adding Mobile Commands”](#adding-mobile-commands)

There is a plugin class inside the respective mobile projects where commands can be defined that can be called by the Rust code:

  * [ Android ](#tab-panel-1642)
  * [ iOS ](#tab-panel-1643)


[code] 
    import android.app.Activity
    
    import app.tauri.annotation.Command
    
    import app.tauri.annotation.TauriPlugin
    
    
    
    
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
      @Command
    
      fun openCamera(invoke: Invoke) {
    
        val ret = JSObject()
    
        ret.put("path", "/path/to/photo.jpg")
    
        invoke.resolve(ret)
    
      }
    
    }
[/code]

If you want to use a Kotlin `suspend` function, you need to use a custom coroutine scope
[code]
    import android.app.Activity
    
    import app.tauri.annotation.Command
    
    import app.tauri.annotation.TauriPlugin
    
    
    
    
    // Change to Dispatchers.IO if it is intended for fetching data
    
    val scope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    
    
    
    
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
      @Command
    
      fun openCamera(invoke: Invoke) {
    
        scope.launch {
    
          openCameraInner(invoke)
    
        }
    
      }
    
    
    
    
      private suspend fun openCameraInner(invoke: Invoke) {
    
        val ret = JSObject()
    
        ret.put("path", "/path/to/photo.jpg")
    
        invoke.resolve(ret)
    
      }
    
    }
[/code]
[code] 
    class ExamplePlugin: Plugin {
    
      @objc public func openCamera(_ invoke: Invoke) throws {
    
        invoke.resolve(["path": "/path/to/photo.jpg"])
    
      }
    
    }
[/code]

Use the [`tauri::plugin::PluginHandle`](https://docs.rs/tauri/2.0.0/tauri/plugin/struct.PluginHandle.html) to call a mobile command from Rust:
[code] 
    use std::path::PathBuf;
    
    use serde::{Deserialize, Serialize};
    
    use tauri::Runtime;
    
    
    
    
    #[derive(Serialize)]
    
    #[serde(rename_all = "camelCase")]
    
    pub struct CameraRequest {
    
      quality: usize,
    
      allow_edit: bool,
    
    }
    
    
    
    
    #[derive(Deserialize)]
    
    pub struct Photo {
    
      path: PathBuf,
    
    }
    
    
    
    
    
    
    
    impl<R: Runtime> <plugin-name;pascal-case><R> {
    
      pub fn open_camera(&self, payload: CameraRequest) -> crate::Result<Photo> {
    
        self
    
          .0
    
          .run_mobile_plugin("openCamera", payload)
    
          .map_err(Into::into)
    
      }
    
    }
[/code]

## [Command Arguments](#command-arguments)

[Section titled “Command Arguments”](#command-arguments)

Arguments are serialized to commands and can be parsed on the mobile plugin with the `Invoke::parseArgs` function, taking a class describing the argument object.

### [Android](#android)

[Section titled “Android”](#android)

On Android, the arguments are defined as a class annotated with `@app.tauri.annotation.InvokeArg`. Inner objects must also be annotated:
[code] 
    import android.app.Activity
    
    import android.webkit.WebView
    
    import app.tauri.annotation.Command
    
    import app.tauri.annotation.InvokeArg
    
    import app.tauri.annotation.TauriPlugin
    
    
    
    
    @InvokeArg
    
    internal class OpenAppArgs {
    
      lateinit var name: String
    
      var timeout: Int? = null
    
    }
    
    
    
    
    @InvokeArg
    
    internal class OpenArgs {
    
      lateinit var requiredArg: String
    
      var allowEdit: Boolean = false
    
      var quality: Int = 100
    
      var app: OpenAppArgs? = null
    
    }
    
    
    
    
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
      @Command
    
      fun openCamera(invoke: Invoke) {
    
        val args = invoke.parseArgs(OpenArgs::class.java)
    
      }
    
    }
[/code]

### [iOS](#ios)

[Section titled “iOS”](#ios)

On iOS, the arguments are defined as a class that inherits `Decodable`. Inner objects must also inherit the Decodable protocol:
[code] 
    class OpenAppArgs: Decodable {
    
      let name: String
    
      var timeout: Int?
    
    }
    
    
    
    
    class OpenArgs: Decodable {
    
      let requiredArg: String
    
      var allowEdit: Bool?
    
      var quality: UInt8?
    
      var app: OpenAppArgs?
    
    }
    
    
    
    
    class ExamplePlugin: Plugin {
    
      @objc public func openCamera(_ invoke: Invoke) throws {
    
        let args = try invoke.parseArgs(OpenArgs.self)
    
    
    
    
        invoke.resolve(["path": "/path/to/photo.jpg"])
    
      }
    
    }
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

If a plugin requires permissions from the end user, Tauri simplifies the process of checking and requesting permissions.

  * [ Android ](#tab-panel-1644)
  * [ iOS ](#tab-panel-1645)


First define the list of permissions needed and an alias to identify each group in code. This is done inside the `TauriPlugin` annotation:
[code]
    @TauriPlugin(
    
      permissions = [
    
        Permission(strings = [Manifest.permission.POST_NOTIFICATIONS], alias = "postNotification")
    
      ]
    
    )
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) { }
[/code]

First override the `checkPermissions` and `requestPermissions` functions:
[code]
    class ExamplePlugin: Plugin {
    
      @objc open func checkPermissions(_ invoke: Invoke) {
    
        invoke.resolve(["postNotification": "prompt"])
    
      }
    
    
    
    
      @objc public override func requestPermissions(_ invoke: Invoke) {
    
        // request permissions here
    
        // then resolve the request
    
        invoke.resolve(["postNotification": "granted"])
    
      }
    
    }
[/code]

Tauri automatically implements two commands for the plugin: `checkPermissions` and `requestPermissions`. Those commands can be directly called from JavaScript or Rust:

  * [ JavaScript ](#tab-panel-1646)
  * [ Rust ](#tab-panel-1647)


[code] 
    import { invoke, PermissionState } from '@tauri-apps/api/core'
    
    
    
    
    interface Permissions {
    
      postNotification: PermissionState
    
    }
    
    
    
    
    // check permission state
    
    const permission = await invoke<Permissions>('plugin:<plugin-name>|checkPermissions')
    
    
    
    
    if (permission.postNotification === 'prompt-with-rationale') {
    
      // show information to the user about why permission is needed
    
    }
    
    
    
    
    // request permission
    
    if (permission.postNotification.startsWith('prompt')) {
    
      const state = await invoke<Permissions>('plugin:<plugin-name>|requestPermissions', { permissions: ['postNotification'] })
    
    }
[/code]
[code] 
    use serde::{Serialize, Deserialize};
    
    use tauri::{plugin::PermissionState, Runtime};
    
    
    
    
    #[derive(Deserialize)]
    
    #[serde(rename_all = "camelCase")]
    
    struct PermissionResponse {
    
      pub post_notification: PermissionState,
    
    }
    
    
    
    
    #[derive(Serialize)]
    
    #[serde(rename_all = "camelCase")]
    
    struct RequestPermission {
    
      post_notification: bool,
    
    }
    
    
    
    
    impl<R: Runtime> Notification<R> {
    
      pub fn request_post_notification_permission(&self) -> crate::Result<PermissionState> {
    
        self.0
    
          .run_mobile_plugin::<PermissionResponse>("requestPermissions", RequestPermission { post_notification: true })
    
          .map(|r| r.post_notification)
    
          .map_err(Into::into)
    
      }
    
    
    
    
      pub fn check_permissions(&self) -> crate::Result<PermissionResponse> {
    
        self.0
    
          .run_mobile_plugin::<PermissionResponse>("checkPermissions", ())
    
          .map_err(Into::into)
    
      }
    
    }
[/code]

## [Plugin Events](#plugin-events)

[Section titled “Plugin Events”](#plugin-events)

Plugins can emit events at any point of time using the `trigger` function:

  * [ Android ](#tab-panel-1648)
  * [ iOS ](#tab-panel-1649)


[code] 
    @TauriPlugin
    
    class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    
        override fun load(webView: WebView) {
    
          trigger("load", JSObject())
    
        }
    
    
    
    
        override fun onNewIntent(intent: Intent) {
    
          // handle new intent event
    
          if (intent.action == Intent.ACTION_VIEW) {
    
            val data = intent.data.toString()
    
            val event = JSObject()
    
            event.put("data", data)
    
            trigger("newIntent", event)
    
          }
    
        }
    
    
    
    
        @Command
    
        fun openCamera(invoke: Invoke) {
    
          val payload = JSObject()
    
          payload.put("open", true)
    
          trigger("camera", payload)
    
        }
    
    }
[/code]
[code] 
    class ExamplePlugin: Plugin {
    
      @objc public override func load(webview: WKWebView) {
    
        trigger("load", data: [:])
    
      }
    
    
    
    
      @objc public func openCamera(_ invoke: Invoke) {
    
        trigger("camera", data: ["open": true])
    
      }
    
    }
[/code]

The helper functions can then be called from the NPM package by using the [`addPluginListener`](/reference/javascript/api/namespacecore/#addpluginlistener) helper function:
[code] 
    import { addPluginListener, PluginListener } from '@tauri-apps/api/core';
    
    
    
    
    export async function onRequest(
    
      handler: (url: string) => void
    
    ): Promise<PluginListener> {
    
      return await addPluginListener(
    
        '<plugin-name>',
    
        'event-name',
    
        handler
    
      );
    
    }
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/develop/plugins/develop-mobile](https://v2.tauri.app/develop/plugins/develop-mobile)