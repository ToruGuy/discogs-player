# Embedding Additional Files

You may need to include additional files in your application bundle that aren’t part of your frontend (your `frontendDist`) directly or which are too big to be inlined into the binary. We call these files `resources`.

## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

To bundle the files of your choice, add the `resources` property to the `bundle` object in your `tauri.conf.json` file.

To include a list of files:

  * [ Syntax ](#tab-panel-702)
  * [ Explanation ](#tab-panel-703)


tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "resources": [
    
          "./path/to/some-file.txt",
    
          "/absolute/path/to/textfile.txt",
    
          "../relative/path/to/jsonfile.json",
    
          "some-folder/",
    
          "resources/**/*.md"
    
        ]
    
      }
    
    }
[/code]

tauri.conf.json5
[code]
    {
    
      "bundle": {
    
        "resources": [
    
          // Will be placed to `$RESOURCE/path/to/some-file.txt`
    
          "./path/to/some-file.txt",
    
    
    
    
          // The root in an abosolute path will be replaced by `_root_`,
    
          // so `textfile.txt` will be placed to `$RESOURCE/_root_/absolute/path/to/textfile.txt`
    
          "/absolute/path/to/textfile.txt",
    
    
    
    
          // `..` in a relative path will be replaced by `_up_`,
    
          // so `jsonfile.json` will be placed to `$RESOURCE/_up_/relative/path/to/textfile.txt`,
    
          "../relative/path/to/jsonfile.json",
    
    
    
    
          // If the path is a directory, the entire directory will be copied to the `$RESOURCE` directory,
    
          // preserving the original structures, for example:
    
          //   - `some-folder/file.txt`                   -> `$RESOURCE/some-folder/file.txt`
    
          //   - `some-folder/another-folder/config.json` -> `$RESOURCE/some-folder/another-folder/config.json`
    
          // This is the same as `some-folder/**/*`
    
          "some-folder/",
    
    
    
    
          // You can also include multiple files at once through glob patterns.
    
          // All the `.md` files inside `resources` will be placed to `$RESOURCE/resources/`,
    
          // preserving their original directory structures, for example:
    
          //   - `resources/index.md`      -> `$RESOURCE/resources/index.md`
    
          //   - `resources/docs/setup.md` -> `$RESOURCE/resources/docs/setup.md`
    
          "resources/**/*.md"
    
        ]
    
      }
    
    }
[/code]

The bundled files will be in `$RESOURCES/` with the original directory structure preserved, for example: `./path/to/some-file.txt` -> `$RESOURCE/path/to/some-file.txt`

To fine control where the files will get copied to, use a map instead:

  * [ Syntax ](#tab-panel-704)
  * [ Explanation ](#tab-panel-705)


tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "resources": {
    
          "/absolute/path/to/textfile.txt": "resources/textfile.txt",
    
          "relative/path/to/jsonfile.json": "resources/jsonfile.json",
    
          "resources/": "",
    
          "docs/**/*md": "website-docs/"
    
        }
    
      }
    
    }
[/code]

tauri.conf.json5
[code]
    {
    
      "bundle": {
    
        "resources": {
    
          // `textfile.txt` will be placed to `$RESOURCE/resources/textfile.txt`
    
          "/absolute/path/to/textfile.txt": "resources/textfile.txt",
    
    
    
    
          // `jsonfile.json` will be placed to `$RESOURCE/resources/jsonfile.json`
    
          "relative/path/to/jsonfile.json": "resources/jsonfile.json",
    
    
    
    
          // Copy the entire directory to `$RESOURCE`, preserving the original structures,
    
          // the target is "" which means it will be placed directly in the resource directory `$RESOURCE`, for example:
    
          //   - `resources/file.txt`                -> `$RESOURCE/file.txt`
    
          //   - `resources/some-folder/config.json` -> `$RESOURCE/some-folder/config.json`
    
          "resources/": "",
    
    
    
    
          // When using glob patterns, the behavior is different from the list one,
    
          // all the matching files will be placed to the target directory without preserving the original file structures
    
          // for example:
    
          //   - `docs/index.md`         -> `$RESOURCE/website-docs/index.md`
    
          //   - `docs/plugins/setup.md` -> `$RESOURCE/website-docs/setup.md`
    
          "docs/**/*md": "website-docs/"
    
        }
    
      }
    
    }
[/code]

To learn about where `$RESOURCE` resolves to on each platforms, see the documentation of [`resource_dir`](https://docs.rs/tauri/latest/tauri/path/struct.PathResolver.html#method.resource_dir)

Source path syntax

In the following explanations “target resource directory” is either the value after the colon in the object notation, or a reconstruction of the original file paths in the array notation.

  * `"dir/file.txt"`: copies the `file.txt` file into the target resource directory.
  * `"dir/"`: copies all files **and directories** _recursively_ into the target resource directory. Use this if you also want to preserve the file system structure of your files and directories.
  * `"dir/*"`: copies all files in the `dir` directory _non-recursively_ (sub-directories will be ignored) into the target resource directory.
  * `"dir/**`: throws an error because `**` only matches directories and therefore no files can be found.
  * `"dir/**/*"`: copies all files in the `dir` directory _recursively_ (all files in `dir/` and all files in all sub-directories) into the target resource directory.
  * `"dir/**/**`: throws an error because `**` only matches directories and therefore no files can be found.


## [Resolve resource file paths](#resolve-resource-file-paths)

[Section titled “Resolve resource file paths”](#resolve-resource-file-paths)

To resolve the path for a resource file, instead of manually calculating the path, use the following APIs

  * [ Rust ](#tab-panel-706)
  * [ JavaScript ](#tab-panel-707)


On the Rust side, you need an instance of the [`PathResolver`](https://docs.rs/tauri/latest/tauri/path/struct.PathResolver.html) which you can get from [`App`](https://docs.rs/tauri/latest/tauri/struct.App.html) and [`AppHandle`](https://docs.rs/tauri/latest/tauri/struct.AppHandle.html), then call [`PathResolver::resolve`](https://docs.rs/tauri/latest/tauri/path/struct.PathResolver.html#method.resolve):
[code]
    tauri::Builder::default()
    
      .setup(|app| {
    
        let resource_path = app.path().resolve("lang/de.json", BaseDirectory::Resource)?;
    
        Ok(())
    
      })
[/code]

To use it in a command:
[code]
    #[tauri::command]
    
    fn hello(handle: tauri::AppHandle) {
    
      let resource_path = handle.path().resolve("lang/de.json", BaseDirectory::Resource)?;
    
    }
[/code]

To resolve the path in JavaScript, use [`resolveResource`](https://tauri.app/reference/javascript/api/namespacepath/#resolveresource):
[code]
    import { resolveResource } from '@tauri-apps/api/path';
    
    const resourcePath = await resolveResource('lang/de.json');
[/code]

### [Path syntax](#path-syntax)

[Section titled “Path syntax”](#path-syntax)

The path in the API calls can be either a normal relative path like `folder/json_file.json` that resolves to `$RESOURCE/folder/json_file.json`, or a paths like `../relative/folder/toml_file.toml` that resolves to `$RESOURCE/_up_/relative/folder/toml_file.toml`, these APIs use the same rules as you write `tauri.conf.json > bundle > resources`, for example:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "resources": ["folder/json_file.json", "../relative/folder/toml_file.toml"]
    
      }
    
    }
[/code]
[code] 
    let json_path = app.path().resolve("folder/json_file.json", BaseDirectory::Resource)?;
    
    let toml_path = app.path().resolve("../relative/folder/toml_file.toml", BaseDirectory::Resource)?;
[/code]

### [Android](#android)

[Section titled “Android”](#android)

Currently the resources are stored in the APK as assets so the return value of those APIs are not normal file system paths, we use a special URI prefix `asset://localhost/` here that can be used with the [`fs` plugin](/plugin/file-system/), with that, you can read the files through [`FsExt::fs`](https://docs.rs/tauri-plugin-fs/latest/tauri_plugin_fs/trait.FsExt.html#tymethod.fs) like this:
[code] 
    let resource_path = app.path().resolve("lang/de.json", BaseDirectory::Resource).unwrap();
    
    let json = app.fs().read_to_string(&resource_path);
[/code]

If you want or must have the resource files to be on a real file system, copy the contents out manually through the [`fs` plugin](/plugin/file-system/)

## [Reading resource files](#reading-resource-files)

[Section titled “Reading resource files”](#reading-resource-files)

In this example we want to bundle additional i18n json files like this:
[code] 
    .
    
    ├── src-tauri/
    
    │   ├── tauri.conf.json
    
    │   ├── lang/
    
    │   │   ├── de.json
    
    │   │   └── en.json
    
    │   └── ...
    
    └── ...
[/code]

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "resources": ["lang/*"]
    
      }
    
    }
[/code]

lang/de.json
[code]
    {
    
      "hello": "Guten Tag!",
    
      "bye": "Auf Wiedersehen!"
    
    }
[/code]

### [Rust](#rust)

[Section titled “Rust”](#rust)

On the Rust side, you need an instance of the [`PathResolver`](https://docs.rs/tauri/latest/tauri/path/struct.PathResolver.html) which you can get from [`App`](https://docs.rs/tauri/latest/tauri/struct.App.html) and [`AppHandle`](https://docs.rs/tauri/latest/tauri/struct.AppHandle.html):
[code] 
    tauri::Builder::default()
    
      .setup(|app| {
    
        // The path specified must follow the same syntax as defined in
    
        // `tauri.conf.json > bundle > resources`
    
        let resource_path = app.path().resolve("lang/de.json", BaseDirectory::Resource)?;
    
    
    
    
        let json = std::fs::read_to_string(&resource_path).unwrap();
    
        // Or when dealing with Android, use the file system plugin instead
    
        // let json = app.fs().read_to_string(&resource_path);
    
    
    
    
        let lang_de: serde_json::Value = serde_json::from_str(json).unwrap();
    
    
    
    
        // This will print 'Guten Tag!' to the terminal
    
        println!("{}", lang_de.get("hello").unwrap());
    
    
    
    
        Ok(())
    
      })
[/code]
[code] 
    #[tauri::command]
    
    fn hello(handle: tauri::AppHandle) -> String {
    
        let resource_path = handle.path().resolve("lang/de.json", BaseDirectory::Resource)?;
    
    
    
    
        let json = std::fs::read_to_string(&resource_path).unwrap();
    
        // Or when dealing with Android, use the file system plugin instead
    
        // let json = handle.fs().read_to_string(&resource_path);
    
    
    
    
        let lang_de: serde_json::Value = serde_json::from_str(json).unwrap();
    
    
    
    
        lang_de.get("hello").unwrap()
    
    }
[/code]

### [JavaScript](#javascript)

[Section titled “JavaScript”](#javascript)

For the JavaScript side, you can either use a command like the one above and call it through `await invoke('hello')` or access the files using the [`fs` plugin](/plugin/file-system/).

When using the [`fs` plugin](/plugin/file-system/), in addition to the [basic setup](/plugin/file-system/#setup), you’ll also need to configure the access control list to enable any plugin APIs you need as well as the permissions to access the `$RESOURCE` folder:

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": [
    
        "core:default",
    
        "fs:allow-read-text-file",
    
        "fs:allow-resource-read-recursive"
    
      ]
    
    }
[/code]
[code] 
    import { resolveResource } from '@tauri-apps/api/path';
    
    import { readTextFile } from '@tauri-apps/plugin-fs';
    
    
    
    
    const resourcePath = await resolveResource('lang/de.json');
    
    const langDe = JSON.parse(await readTextFile(resourcePath));
    
    console.log(langDe.hello); // This will print 'Guten Tag!' to the devtools console
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

Since we replace `../` to `_up_` in relative paths and the root to `_root_` in abosolute paths when using a list, those files will be in sub folders inside the resource directory, to allow those paths in Tauri’s [permission system](/security/capabilities/), use `$RESOURCE/**/*` to allow recursive access to those files

### [Examples](#examples)

[Section titled “Examples”](#examples)

With a file bundled like this:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "resources": ["../relative/path/to/jsonfile.json"]
    
      }
    
    }
[/code]

To use it with the [`fs` plugin](/plugin/file-system/):

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": [
    
        "core:default",
    
        "fs:allow-stat",
    
        "fs:allow-read-text-file",
    
        "fs:allow-resource-read-recursive",
    
        {
    
          "identifier": "fs:scope",
    
          "allow": ["$RESOURCE/**/*"],
    
          "deny": ["$RESOURCE/secret.txt"]
    
        }
    
      ]
    
    }
[/code]

To use it with the [`opener` plugin](/plugin/opener/):

src-tauri/capabilities/default.json
[code]
    {
    
      "$schema": "../gen/schemas/desktop-schema.json",
    
      "identifier": "main-capability",
    
      "description": "Capability for the main window",
    
      "windows": ["main"],
    
      "permissions": [
    
        "core:default",
    
        {
    
          "identifier": "opener:allow-open-path",
    
          "allow": [
    
            {
    
              "path": "$RESOURCE/**/*"
    
            }
    
          ]
    
        }
    
      ]
    
    }
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/develop/resources](https://v2.tauri.app/develop/resources)