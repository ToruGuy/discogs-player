# HTTP Client

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/http) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-http) [ crates.io ](https://crates.io/crates/tauri-plugin-http)

API Reference [ ](/reference/javascript/http/) [ ](https://docs.rs/tauri-plugin-http)

Make HTTP requests with the http plugin.

## [Supported Platforms](#supported-platforms)

[Section titled “Supported Platforms”](#supported-platforms)

_This plugin requires a Rust version of at least**1.77.2**_

Platform | Level | Notes  
---|---|---  
windows |  |   
linux |  |   
macos |  |   
android |  |   
ios |  |   
  
## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the http plugin to get started.

  * [ Automatic ](#tab-panel-1291)
  * [ Manual ](#tab-panel-1292)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1280)
  * [ yarn ](#tab-panel-1281)
  * [ pnpm ](#tab-panel-1282)
  * [ deno ](#tab-panel-1283)
  * [ bun ](#tab-panel-1284)
  * [ cargo ](#tab-panel-1285)


[code] 
    npm run tauri add http
[/code]
[code] 
    yarn run tauri add http
[/code]
[code] 
    pnpm tauri add http
[/code]
[code] 
    deno task tauri add http
[/code]
[code] 
    bun tauri add http
[/code]
[code] 
    cargo tauri add http
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-http
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_http::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. If you’d like to make http requests in JavaScript then install the npm package as well:

     * [ npm ](#tab-panel-1286)
     * [ yarn ](#tab-panel-1287)
     * [ pnpm ](#tab-panel-1288)
     * [ deno ](#tab-panel-1289)
     * [ bun ](#tab-panel-1290)
[code] npm install @tauri-apps/plugin-http
[/code]
[code] yarn add @tauri-apps/plugin-http
[/code]
[code] pnpm add @tauri-apps/plugin-http
[/code]
[code] deno add npm:@tauri-apps/plugin-http
[/code]
[code] bun add @tauri-apps/plugin-http
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The HTTP plugin is available in both Rust as a [reqwest](https://docs.rs/reqwest/) re-export and JavaScript.

### [JavaScript](#javascript)

[Section titled “JavaScript”](#javascript)

  1. Configure the allowed URLs

src-tauri/capabilities/default.json
[code]{
         
           "permissions": [
         
             {
         
               "identifier": "http:default",
         
               "allow": [{ "url": "https://*.tauri.app" }],
         
               "deny": [{ "url": "https://private.tauri.app" }]
         
             }
         
           ]
         
         }
[/code]

For more information, please see the documentation for [Permissions Overview](/security/permissions/)

  2. Send a request

The `fetch` method tries to be as close and compliant to the [`fetch` Web API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) as possible.
[code] import { fetch } from '@tauri-apps/plugin-http';
         
         
         
         
         // Send a GET request
         
         const response = await fetch('http://test.tauri.app/data.json', {
         
           method: 'GET',
         
         });
         
         console.log(response.status); // e.g. 200
         
         console.log(response.statusText); // e.g. "OK"
[/code]


### [Rust](#rust)

[Section titled “Rust”](#rust)

In Rust you can utilize the `reqwest` crate re-exported by the plugin. For more details refer to [reqwest docs](https://docs.rs/reqwest/).
[code] 
    use tauri_plugin_http::reqwest;
    
    
    
    
    let res = reqwest::get("http://my.api.host/data.json").await;
    
    println!("{:?}", res.status()); // e.g. 200
    
    println!("{:?}", res.text().await); // e.g Ok("{ Content }")
[/code]

## [Default Permission](#default-permission)

This permission set configures what kind of fetch operations are available from the http plugin.

This enables all fetch operations but does not allow explicitly any origins to be fetched. This needs to be manually configured before usage.

#### [Granted Permissions](#granted-permissions)

All fetch operations are enabled.

#### This default permission set includes the following:

  * `allow-fetch`
  * `allow-fetch-cancel`
  * `allow-fetch-read-body`
  * `allow-fetch-send`


## Permission Table

Identifier | Description  
---|---  
`http:allow-fetch` |  Enables the fetch command without any pre-configured scope.  
`http:deny-fetch` |  Denies the fetch command without any pre-configured scope.  
`http:allow-fetch-cancel` |  Enables the fetch_cancel command without any pre-configured scope.  
`http:deny-fetch-cancel` |  Denies the fetch_cancel command without any pre-configured scope.  
`http:allow-fetch-read-body` |  Enables the fetch_read_body command without any pre-configured scope.  
`http:deny-fetch-read-body` |  Denies the fetch_read_body command without any pre-configured scope.  
`http:allow-fetch-send` |  Enables the fetch_send command without any pre-configured scope.  
`http:deny-fetch-send` |  Denies the fetch_send command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/http-client](https://v2.tauri.app/plugin/http-client)