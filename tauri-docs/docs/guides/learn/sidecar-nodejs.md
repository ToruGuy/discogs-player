# Node.js as a sidecar

In this guide we are going to package a Node.js application to a self contained binary to be used as a sidecar in a Tauri application without requiring the end user to have a Node.js installation. This example tutorial is applicable for desktop operating systems only.

We recommend reading the general [sidecar guide](/develop/sidecar/) first for a deeper understanding of how Tauri sidecars work.

## [Goals](#goals)

[Section titled “Goals”](#goals)

  * Package a Node.js application as a binary.
  * Integrate this binary as a Tauri sidecar.


## [Implementation Details](#implementation-details)

[Section titled “Implementation Details”](#implementation-details)

  * For this we use the [pkg](https://github.com/vercel/pkg) tool, but any other tool that can compile JavaScript or Typescript into a binary application will work.
  * You can also embed the Node runtime itself into your Tauri application and ship bundled JavaScript as a resource, but this will ship the JavaScript content as readable-ish files and the runtime is usually larger than a `pkg` packaged application.


In this example we will create a Node.js application that reads input from the command line [process.argv](https://nodejs.org/docs/latest/api/process.html#processargv) and writes output to stdout using [console.log](https://nodejs.org/api/console.html#consolelogdata-args).   
You can leverage alternative inter-process communication systems such as a localhost server, stdin/stdout or local sockets. Note that each has their own advantages, drawbacks and security concerns.

## [Prerequisites](#prerequisites)

[Section titled “Prerequisites”](#prerequisites)

An existing Tauri application set up with the shell plugin, that compiles and runs for you locally.

## [Guide](#guide)

[Section titled “Guide”](#guide)

  1. ##### [Initialize Sidecar Project](#initialize-sidecar-project)

[Section titled “Initialize Sidecar Project”](#initialize-sidecar-project)

Let’s create a new Node.js project to contain our sidecar implementation. Create a new directory **in your Tauri application root folder** (in this example we will call it `sidecar-app`) and run the `init` command of your preferred Node.js package manager inside the directory:

     * [ npm ](#tab-panel-894)
     * [ yarn ](#tab-panel-895)
     * [ pnpm ](#tab-panel-896)
[code] npm init
[/code]
[code] yarn init
[/code]
[code] pnpm init
[/code]

We will compile our Node.js application to a self container binary using [pkg](https://github.com/vercel/pkg) among other options. Let’s install it as a development dependency into the new `sidecar-app`:

     * [ npm ](#tab-panel-897)
     * [ yarn ](#tab-panel-898)
     * [ pnpm ](#tab-panel-899)
[code] npm add @yao-pkg/pkg --save-dev
[/code]
[code] yarn add @yao-pkg/pkg --dev
[/code]
[code] pnpm add @yao-pkg/pkg --save-dev
[/code]

  2. ##### [Write Sidecar Logic](#write-sidecar-logic)

[Section titled “Write Sidecar Logic”](#write-sidecar-logic)

Now we can start writing JavaScript code that will be executed by our Tauri application.

In this example we will process a command from the command line argmuents and write output to stdout, which means our process will be short lived and only handle a single command at a time. If your application must be long lived, consider using alternative inter-process communication systems.

Let’s create a `index.js` file in our `sidecar-app` directory and write a basic Node.js app:

sidecar-app/index.js
[code]const command = process.argv[2];
         
         
         
         
         switch (command) {
         
           case 'hello':
         
             const message = process.argv[3];
         
             console.log(`Hello ${message}!`);
         
             break;
         
           default:
         
             console.error(`unknown command ${command}`);
         
             process.exit(1);
         
         }
[/code]

  3. ##### [Package the Sidecar](#package-the-sidecar)

[Section titled “Package the Sidecar”](#package-the-sidecar)

To package our Node.js application into a self contained binary, create a script in `package.json`:

sidecar-app/package.json
[code]{
         
           "scripts": {
         
             "build": "pkg index.ts --output my-sidecar"
         
           }
         
         }
[/code]

     * [ npm ](#tab-panel-900)
     * [ yarn ](#tab-panel-901)
     * [ pnpm ](#tab-panel-902)
[code] npm run build
[/code]
[code] yarn build
[/code]
[code] pnpm build
[/code]

This will create the `sidecar-app/my-sidecar` binary on Linux and macOS, and a `sidecar-app/my-sidecar.exe` executable on Windows.

For sidecar applications, we need to ensure that the binary is named in the correct pattern, for more information read [Embedding External Binaries](https://tauri.app/develop/sidecar/) To rename this file to the expected Tauri sidecar filename and also move to our Tauri project, we can use the following Node.js script as a starting example:

sidecar-app/rename.js
[code]import { execSync } from 'child_process';
    
    import fs from 'fs';
    
    
    
    
    const ext = process.platform === 'win32' ? '.exe' : '';
    
    
    
    
    const rustInfo = execSync('rustc -vV');
    
    const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
    
    if (!targetTriple) {
    
      console.error('Failed to determine platform target triple');
    
    }
    
    // TODO: create `src-tauri/binaries` dir
    
    fs.renameSync(
    
      `my-sidecar${ext}`,
    
      `../src-tauri/binaries/my-sidecar-${targetTriple}${ext}`
    
    );
[/code]

And run `node rename.js` from the `sidecar-app` directory.

At this step the `/src-tauri/binaries` directory should contain the renamed sidecar binary.

  4. ##### [Setup plugin-shell permission](#setup-plugin-shell-permission)

[Section titled “Setup plugin-shell permission”](#setup-plugin-shell-permission)

After installing the [shell plugin](/plugin/shell/) make sure you configure the required capabilities.

Note that we use `"args": true` but you can optionally provide an array `["hello"]`, [read more](/develop/sidecar/#passing-arguments).

src-tauri/capabilities/default.json
[code]{
         
           "permissions": [
         
             "core:default",
         
             "opener:default",
         
             {
         
               "identifier": "shell:allow-execute",
         
               "allow": [
         
                 {
         
                   "args": true,
         
                   "name": "binaries/my-sidecar",
         
                   "sidecar": true
         
                 }
         
               ]
         
             }
         
           ]
         
         }
[/code]

  5. ##### [Configure the Sidecar in the Tauri Application](#configure-the-sidecar-in-the-tauri-application)

[Section titled “Configure the Sidecar in the Tauri Application”](#configure-the-sidecar-in-the-tauri-application)

Now that we have our Node.js application ready, we can connect it to our Tauri application by configuring the [`bundle > externalBin`](/reference/config/#externalbin) array:

src-tauri/tauri.conf.json
[code]{
         
           "bundle": {
         
             "externalBin": ["binaries/my-sidecar"]
         
           }
         
         }
[/code]

The Tauri CLI will handle the bundling of the sidecar binary as long as it exists as `src-tauri/binaries/my-sidecar-<target-triple>`.

  6. ##### [Execute the Sidecar](#execute-the-sidecar)

[Section titled “Execute the Sidecar”](#execute-the-sidecar)

We can run the sidecar binary either from Rust code or directly from JavaScript.

     * [ JavaScript ](#tab-panel-883)
     * [ Rust ](#tab-panel-884)

Let’s execute the `hello` command in the Node.js sidecar directly:
[code]import { Command } from '@tauri-apps/plugin-shell';
    
    
    
    
    const message = 'Tauri';
    
    
    
    
    const command = Command.sidecar('binaries/my-sidecar', ['hello', message]);
    
    const output = await command.execute();
    
    // once everything is configured it should log "Hello Tauri" in the browser console.
    
    console.log(output.stdout)
[/code]

Let’s pipe a `hello` Tauri command to the Node.js sidecar:
[code]use tauri_plugin_shell::ShellExt;
    
    
    
    
    #[tauri::command]
    
    async fn hello(app: tauri::AppHandle, cmd: String, message: String) -> String {
    
        let sidecar_command = app
    
            .shell()
    
            .sidecar("my-sidecar")
    
            .unwrap()
    
            .arg(cmd)
    
            .arg(message);
    
        let output = sidecar_command.output().await.unwrap();
    
        String::from_utf8(output.stdout).unwrap()
    
    }
[/code]

Register it in `invoke_handler` and call it in the frontend with:
[code]import { invoke } from "@tauri-apps/api/core";
    
    
    
    
    const message = "Tauri"
    
    console.log(await invoke("hello", { cmd: 'hello', message }))
[/code]

  7. ##### [Running](#running)

[Section titled “Running”](#running)

Lets test it

     * [ npm ](#tab-panel-903)
     * [ yarn ](#tab-panel-904)
     * [ pnpm ](#tab-panel-905)
     * [ deno ](#tab-panel-906)
     * [ bun ](#tab-panel-907)
     * [ cargo ](#tab-panel-908)
[code] npm run tauri dev
[/code]
[code] yarn tauri dev
[/code]
[code] pnpm tauri dev
[/code]
[code] deno task tauri dev
[/code]
[code] bun tauri dev
[/code]
[code] cargo tauri dev
[/code]

Open the DevTools with F12 (or `Cmd+Option+I` on macOS) and you should see the output of the sidecar command.

If you find any issues, please open an issue on [GitHub](https://github.com/tauri-apps/tauri-docs).


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/learn/sidecar-nodejs](https://v2.tauri.app/learn/sidecar-nodejs)