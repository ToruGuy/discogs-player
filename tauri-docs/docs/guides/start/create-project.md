# Create a Project

One thing that makes Tauri so flexible is its ability to work with virtually any frontend framework. We’ve created the [`create-tauri-app`](https://github.com/tauri-apps/create-tauri-app) utility to help you create a new Tauri project using one of the officially maintained framework templates.

`create-tauri-app` currently includes templates for vanilla (HTML, CSS and JavaScript without a framework), [Vue.js](https://vuejs.org), [Svelte](https://svelte.dev), [React](https://reactjs.org/), [SolidJS](https://www.solidjs.com/), [Angular](https://angular.io/), [Preact](https://preactjs.com/), [Yew](https://yew.rs/), [Leptos](https://github.com/leptos-rs/leptos), and [Sycamore](https://sycamore-rs.netlify.app/). You can also find or add your own community templates and frameworks in the [Awesome Tauri repo](https://github.com/tauri-apps/awesome-tauri).

Alternatively, you can [add Tauri to an existing project](#manual-setup-tauri-cli) to quickly turn your existing codebase into a Tauri app.

## [Using `create-tauri-app`](#using-create-tauri-app)

[Section titled “Using create-tauri-app”](#using-create-tauri-app)

To get started using `create-tauri-app` run one of the below commands in the folder you’d like to setup your project. If you’re not sure which command to use we recommend the Bash command on Linux and macOS and the PowerShell command on Windows.

  * [ Bash ](#tab-panel-1569)
  * [ PowerShell ](#tab-panel-1570)
  * [ Fish ](#tab-panel-1571)
  * [ npm ](#tab-panel-1572)
  * [ Yarn ](#tab-panel-1573)
  * [ pnpm ](#tab-panel-1574)
  * [ deno ](#tab-panel-1575)
  * [ bun ](#tab-panel-1576)
  * [ Cargo ](#tab-panel-1577)


[code] 
    sh <(curl https://create.tauri.app/sh)
[/code]
[code] 
    irm https://create.tauri.app/ps | iex
[/code]
[code] 
    sh (curl -sSL https://create.tauri.app/sh | psub)
[/code]
[code] 
    npm create tauri-app@latest
[/code]
[code] 
    yarn create tauri-app
[/code]
[code] 
    pnpm create tauri-app
[/code]
[code] 
    deno run -A npm:create-tauri-app
[/code]
[code] 
    bun create tauri-app
[/code]
[code] 
    cargo install create-tauri-app --locked
    
    cargo create-tauri-app
[/code]

Follow along with the prompts to choose your project name, frontend language, package manager, and frontend framework, and frontend framework options if applicable.

#### [Scaffold a new project](#scaffold-a-new-project)

[Section titled “Scaffold a new project”](#scaffold-a-new-project)

  1. Choose a name and a bundle identifier (unique-id for your app):
[code] ? Project name (tauri-app) ›
         
         ? Identifier (com.tauri-app.app) ›
[/code]

  2. Select a flavor for your frontend. First the language:
[code] ? Choose which language to use for your frontend ›
         
         Rust  (cargo)
         
         TypeScript / JavaScript  (pnpm, yarn, npm, bun)
         
         .NET  (dotnet)
[/code]

  3. Select a package manager (if there are multiple available):

Options for **TypeScript / JavaScript** :
[code] ? Choose your package manager ›
         
         pnpm
         
         yarn
         
         npm
         
         bun
[/code]

  4. Select a UI Template and flavor (if there are multiple available):

Options for **Rust** :
[code] ? Choose your UI template ›
         
         Vanilla
         
         Yew
         
         Leptos
         
         Sycamore
[/code]

Options for **TypeScript / JavaScript** :
[code] ? Choose your UI template ›
         
         Vanilla
         
         Vue
         
         Svelte
         
         React
         
         Solid
         
         Angular
         
         Preact
         
         
         
         
         ? Choose your UI flavor ›
         
         TypeScript
         
         JavaScript
[/code]

Options for **.NET** :
[code] ? Choose your UI template ›
         
         Blazor  (https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor/)
[/code]


Once completed, the utility reports that the template has been created and displays how to run it using the configured package manager. If it detects missing dependencies on your system, it prints a list of packages and prompts how to install them.

#### [Start the development server](#start-the-development-server)

[Section titled “Start the development server”](#start-the-development-server)

After `create-tauri-app` has completed, you can navigate into your project’s folder, install dependencies, and then use the [Tauri CLI](/reference/cli/) to start the development server:

  * [ npm ](#tab-panel-1578)
  * [ yarn ](#tab-panel-1579)
  * [ pnpm ](#tab-panel-1580)
  * [ deno ](#tab-panel-1581)
  * [ bun ](#tab-panel-1582)
  * [ cargo ](#tab-panel-1583)


[code] 
    cd tauri-app
    
    npm install
    
    npm run tauri dev
[/code]
[code] 
    cd tauri-app
    
    yarn install
    
    yarn tauri dev
[/code]
[code] 
    cd tauri-app
    
    pnpm install
    
    pnpm tauri dev
[/code]
[code] 
    cd tauri-app
    
    deno install
    
    deno task tauri dev
[/code]
[code] 
    cd tauri-app
    
    bun install
    
    bun tauri dev
[/code]
[code] 
    cd tauri-app
    
    cargo tauri dev
[/code]

You’ll now see a new window open with your app running.

**Congratulations!** You’ve made your Tauri app! 🚀

## [Manual Setup (Tauri CLI)](#manual-setup-tauri-cli)

[Section titled “Manual Setup (Tauri CLI)”](#manual-setup-tauri-cli)

If you already have an existing frontend or prefer to set it up yourself, you can use the Tauri CLI to initialize the backend for your project separately.

  1. Create a new directory for your project and initialize the frontend. You can use plain HTML, CSS, and JavaScript, or any framework you prefer such as Next.js, Nuxt, Svelte, Yew, or Leptos. You just need a way of serving the app in your browser. Just as an example, this is how you would setup a simple Vite app:

     * [ npm ](#tab-panel-1584)
     * [ yarn ](#tab-panel-1585)
     * [ pnpm ](#tab-panel-1586)
     * [ deno ](#tab-panel-1587)
     * [ bun ](#tab-panel-1588)
[code] mkdir tauri-app
    
    cd tauri-app
    
    npm create vite@latest .
[/code]
[code] mkdir tauri-app
    
    cd tauri-app
    
    yarn create vite .
[/code]
[code] mkdir tauri-app
    
    cd tauri-app
    
    pnpm create vite .
[/code]
[code] mkdir tauri-app
    
    cd tauri-app
    
    deno run -A npm:create-vite .
[/code]
[code] mkdir tauri-app
    
    cd tauri-app
    
    bun create vite
[/code]

  2. Then, install Tauri’s CLI tool using your package manager of choice. If you are using `cargo` to install the Tauri CLI, you will have to install it globally.

     * [ npm ](#tab-panel-1589)
     * [ yarn ](#tab-panel-1590)
     * [ pnpm ](#tab-panel-1591)
     * [ deno ](#tab-panel-1592)
     * [ bun ](#tab-panel-1593)
     * [ cargo ](#tab-panel-1594)
[code] npm install -D @tauri-apps/cli@latest
[/code]
[code] yarn add -D @tauri-apps/cli@latest
[/code]
[code] pnpm add -D @tauri-apps/cli@latest
[/code]
[code] deno add -D npm:@tauri-apps/cli@latest
[/code]
[code] bun add -D @tauri-apps/cli@latest
[/code]
[code] cargo install tauri-cli --version "^2.0.0" --locked
[/code]

  3. Determine the URL of your frontend development server. This is the URL that Tauri will use to load your content. For example, if you are using Vite, the default URL is `http://localhost:5173`.

  4. In your project directory, initialize Tauri:

     * [ npm ](#tab-panel-1595)
     * [ yarn ](#tab-panel-1596)
     * [ pnpm ](#tab-panel-1597)
     * [ deno ](#tab-panel-1598)
     * [ bun ](#tab-panel-1599)
     * [ cargo ](#tab-panel-1600)
[code] npx tauri init
[/code]
[code] yarn tauri init
[/code]
[code] pnpm tauri init
[/code]
[code] deno task tauri init
[/code]
[code] bun tauri init
[/code]
[code] cargo tauri init
[/code]

After running the command it will display a prompt asking you for different options:
[code] ✔ What is your app name? tauri-app
    
    ✔ What should the window title be? tauri-app
    
    ✔ Where are your web assets located? ..
    
    ✔ What is the url of your dev server? http://localhost:5173
    
    ✔ What is your frontend dev command? pnpm run dev
    
    ✔ What is your frontend build command? pnpm run build
[/code]

This will create a `src-tauri` directory in your project with the necessary Tauri configuration files.

  5. Verify your Tauri app is working by running the development server:

     * [ npm ](#tab-panel-1601)
     * [ yarn ](#tab-panel-1602)
     * [ pnpm ](#tab-panel-1603)
     * [ deno ](#tab-panel-1604)
     * [ bun ](#tab-panel-1605)
     * [ cargo ](#tab-panel-1606)
[code] npx tauri dev
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

This command will compile the Rust code and open a window with your web content.


**Congratulations!** You’ve created a new Tauri project using the Tauri CLI! 🚀

## [Next Steps](#next-steps)

[Section titled “Next Steps”](#next-steps)

  * [Learn about the project layout and what each file does](/start/project-structure/)
  * [Add and Configure a Frontend Framework](/start/frontend/)
  * [Tauri Command Line Interface (CLI) Reference](/reference/cli/)
  * [Learn how to develop your Tauri app](/develop/)
  * [Discover additional features to extend Tauri](/plugin/)


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/start/create-project](https://v2.tauri.app/start/create-project)