# Using Plugin Permissions

The goal of this exercise is to get a better understanding on how plugin permissions can be enabled or disabled, where they are described and how to use default permissions of plugins.

At the end you will have the ability to find and use permissions of arbitrary plugins and understand how to custom tailor existing permissions. You will have an example Tauri application where a plugin and plugin specific permissions are used.

  1. ### [Create Tauri Application](#create-tauri-application)

[Section titled “Create Tauri Application”](#create-tauri-application)

Create your Tauri application. In our example we will facilitate [`create-tauri-app`](https://github.com/tauri-apps/create-tauri-app):

     * [ Bash ](#tab-panel-2350)
     * [ PowerShell ](#tab-panel-2351)
     * [ Fish ](#tab-panel-2352)
     * [ npm ](#tab-panel-2353)
     * [ Yarn ](#tab-panel-2354)
     * [ pnpm ](#tab-panel-2355)
     * [ deno ](#tab-panel-2356)
     * [ bun ](#tab-panel-2357)
     * [ Cargo ](#tab-panel-2358)
[code] sh <(curl https://create.tauri.app/sh)
[/code]
[code] irm https://create.tauri.app/ps | iex
[/code]
[code] sh (curl -sSL https://create.tauri.app/sh | psub)
[/code]
[code] npm create tauri-app@latest
[/code]
[code] yarn create tauri-app
[/code]
[code] pnpm create tauri-app
[/code]
[code] deno run -A npm:create-tauri-app
[/code]
[code] bun create tauri-app
[/code]
[code] cargo install create-tauri-app --locked
    
    cargo create-tauri-app
[/code]

We will proceed in this step-by-step explanation with `pnpm` but you can choose another package manager and replace it in the commands accordingly.

Show solution
[code] pnpm create tauri-app
[/code]
[code]✔ Project name · plugin-permission-demo
    
    ✔ Choose which language to use for your frontend · TypeScript / JavaScript - (pnpm, yarn, npm, bun)
    
    ✔ Choose your package manager · pnpm
    
    ✔ Choose your UI template · Vanilla
    
    ✔ Choose your UI flavor · TypeScript
    
    
    
    
    Template created! To get started run:
    
    cd plugin-permission-demo
    
    pnpm install
    
    pnpm tauri dev
[/code]

  2. ### [Add the `file-system` Plugin to Your Application](#add-the-file-system-plugin-to-your-application)

[Section titled “Add the file-system Plugin to Your Application”](#add-the-file-system-plugin-to-your-application)

To search for existing plugins you can use multiple resources.

The most straight forward way would be to check out if your plugin is already in the [Plugins](/plugin/) section of the documentation and therefore part of Tauri’s maintained plugin set. The Filesystem plugin is part of the Tauri plugin workspace and you can add it to your project by following the [instructions](/plugin/file-system/#setup).

If the plugin is part of the community effort you can most likely find it on [crates.io](https://crates.io/search?q=tauri-plugin-) when searching for `tauri-plugin-<your plugin name>`.

Show solution

If it is an existing plugin from our workspace you can use the automated way:
[code]pnpm tauri add fs
[/code]

If you have found it on [crates.io](https://crates.io/crates/tauri-plugin-fs) you need to manually add it as a dependency and modify the Tauri builder to initialize the plugin:

Terminal window
[code]cargo add tauri-plugin-fs
[/code]

Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         fn run() {
         
           tauri::Builder::default()
         
             .plugin(tauri_plugin_fs::init())
         
             .run(tauri::generate_context!())
         
             .expect("error while running tauri application");
         
         }
[/code]

  3. ### [Understand the Default Permissions of the `fs` Plugin](#understand-the-default-permissions-of-the-fs-plugin)

[Section titled “Understand the Default Permissions of the fs Plugin”](#understand-the-default-permissions-of-the-fs-plugin)

Each plugin has a `default` permission set, which contains all permissions and scopes to use the plugin out of the box with a reasonable minimal feature set.

In the case of official maintained plugins you can find a rendered description in the documentation (eg. [fs default](/plugin/file-system/#default-permission)).

In case you are figuring this out for a community plugin you need to check out the source code of the plugin. This should be defined in `your-plugin/permissions/default.toml`.

Show solution
[code] "$schema" = "schemas/schema.json"
         
         
         
         
         [default]
         
         description = """
         
         # Tauri `fs` default permissions
         
         
         
         
         This configuration file defines the default permissions granted
         
         to the filesystem.
         
         
         
         
         ### Granted Permissions
         
         
         
         
         This default permission set enables all read-related commands and
         
         allows access to the `$APP` folder and sub directories created in it.
         
         The location of the `$APP` folder depends on the operating system,
         
         where the application is run.
         
         
         
         
         In general the `$APP` folder needs to be manually created
         
         by the application at runtime, before accessing files or folders
         
         in it is possible.
         
         
         
         
         ### Denied Permissions
         
         
         
         
         This default permission set prevents access to critical components
         
         of the Tauri application by default.
         
         On Windows the webview data folder access is denied.
         
         
         
         
         """
         
         permissions = ["read-all", "scope-app-recursive", "deny-default"]
[/code]

  4. ### [Find the Right Permissions](#find-the-right-permissions)

[Section titled “Find the Right Permissions”](#find-the-right-permissions)

This step is all about finding the permissions you need to for your commands to be exposed to the frontend with the minimal access to your system.

The `fs` plugin has autogenerated permissions which will disable or enable individual commands and allow or disable global scopes.

These can be found in the [documentation](/plugin/file-system/#permission-table) or in the source code of the plugin (`fs/permissions/autogenerated`).

Let us assume we want to enable writing to a text file `test.txt` located in the users `$HOME` folder.

For this we would search in the autogenerated permissions for a permission to enable writing to text files like `allow-write-text-file` and then for a scope which would allow us to access the `$HOME/test.txt` file.

We need to add these to our `capabilities` section in our `src-tauri/tauri.conf.json` or in a file in the `src-tauri/capabilities/` folder. By default there is already a capability in `src-tauri/capabilities/default.json` we can modify.

Show solution

src-tauri/capabilities/default.json
[code]{
         
           "$schema": "../gen/schemas/desktop-schema.json",
         
           "identifier": "default",
         
           "description": "Capability for the main window",
         
           "windows": [
         
             "main"
         
           ],
         
           "permissions": [
         
             "path:default",
         
             "event:default",
         
             "window:default",
         
             "app:default",
         
             "image:default",
         
             "resources:default",
         
             "menu:default",
         
             "tray:default",
         
             "shell:allow-open",
         
             "fs:default",
         
             "fs:allow-write-text-file",
         
           ]
         
         }
[/code]

Since there are only autogenerated scopes in the `fs` plugin to access the full `$HOME` folder, we need to configure our own scope. This scope should be only enabled for the `write-text-file` command and should only expose our `test.txt` file.

Show solution

src-tauri/capabilities/default.json
[code]{
         
           "$schema": "../gen/schemas/desktop-schema.json",
         
           "identifier": "default",
         
           "description": "Capability for the main window",
         
           "windows": [
         
             "main"
         
           ],
         
           "permissions": [
         
             "path:default",
         
             "event:default",
         
             "window:default",
         
             "app:default",
         
             "image:default",
         
             "resources:default",
         
             "menu:default",
         
             "tray:default",
         
             "shell:allow-open",
         
             "fs:allow-write-text-file",
         
             {
         
               "identifier": "fs:allow-write-text-file",
         
               "allow": [{ "path": "$HOME/test.txt" }]
         
             },
         
           ]
         
         }
[/code]

  5. ### [Test Permissions in Practice](#test-permissions-in-practice)

[Section titled “Test Permissions in Practice”](#test-permissions-in-practice)

After we have added the necessary permission we want to confirm that our application can access the file and write it’s content.

Show solution

We can use this snippet in our application to write to the file:

src/main.ts
[code]import { writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
         
         
         
         
         let greetInputEl: HTMLInputElement | null;
         
         
         
         
         async function write(message: string) {
         
             await writeTextFile('test.txt', message, { baseDir: BaseDirectory.Home });
         
         }
         
         
         
         
         window.addEventListener("DOMContentLoaded", () => {
         
           greetInputEl = document.querySelector("#greet-input");
         
           document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
         
             e.preventDefault();
         
             if (!greetInputEl )
         
               return;
         
         
         
         
             write(greetInputEl.value == "" ? "No input provided": greetInputEl.value);
         
         
         
         
           });
         
         });
[/code]

Replacing the `src/main.ts` with this snippet means we do not need to modify the default `index.html`, when using the plain Vanilla+Typescript app. Entering any input into the input field of the running app will be written to the file on submit.

Let’s test now in practice:
[code]pnpm run tauri dev
[/code]

After writing into the input and clicking “Submit”, we can check via our terminal emulator or by manually opening the file in your home folder.
[code]cat $HOME/test.txt
[/code]

You should be presented with your input and finished learning about using permissions from plugins in Tauri applications. 🥳

If you encountered this error:

Terminal window
[code][Error] Unhandled Promise Rejection: fs.write_text_file not allowed. Permissions associated with this command: fs:allow-app-write, fs:allow-app-write-recursive, fs:allow-appcache-write, fs:allow-appcache-write-recursive, fs:allow-appconf...
         
         (anonymous function) (main.ts:5)
[/code]

Then you very likely did not properly follow the [previous instructions](#find-the-right-permissions).


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/learn/security/using-plugin-permissions](https://v2.tauri.app/learn/security/using-plugin-permissions)