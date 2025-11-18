# Stronghold

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/stronghold) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-stronghold) [ crates.io ](https://crates.io/crates/tauri-plugin-stronghold)

API Reference [ ](/reference/javascript/stronghold/) [ ](https://docs.rs/tauri-plugin-stronghold)

Store secrets and keys using the [IOTA Stronghold](https://github.com/iotaledger/stronghold.rs) secret management engine.

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

Install the stronghold plugin to get started.

  * [ Automatic ](#tab-panel-1490)
  * [ Manual ](#tab-panel-1491)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1479)
  * [ yarn ](#tab-panel-1480)
  * [ pnpm ](#tab-panel-1481)
  * [ deno ](#tab-panel-1482)
  * [ bun ](#tab-panel-1483)
  * [ cargo ](#tab-panel-1484)


[code] 
    npm run tauri add stronghold
[/code]
[code] 
    yarn run tauri add stronghold
[/code]
[code] 
    pnpm tauri add stronghold
[/code]
[code] 
    deno task tauri add stronghold
[/code]
[code] 
    bun tauri add stronghold
[/code]
[code] 
    cargo tauri add stronghold
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-stronghold
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_stronghold::Builder::new(|password| {}).build())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1485)
     * [ yarn ](#tab-panel-1486)
     * [ pnpm ](#tab-panel-1487)
     * [ deno ](#tab-panel-1488)
     * [ bun ](#tab-panel-1489)
[code] npm install @tauri-apps/plugin-stronghold
[/code]
[code] yarn add @tauri-apps/plugin-stronghold
[/code]
[code] pnpm add @tauri-apps/plugin-stronghold
[/code]
[code] deno add npm:@tauri-apps/plugin-stronghold
[/code]
[code] bun add @tauri-apps/plugin-stronghold
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

The plugin must be initialized with a password hash function, which takes the password string and must return a 32 bytes hash derived from it.

### [Initialize with argon2 password hash function](#initialize-with-argon2-password-hash-function)

[Section titled “Initialize with argon2 password hash function”](#initialize-with-argon2-password-hash-function)

The Stronghold plugin offers a default hash function using the [argon2](https://docs.rs/rust-argon2/latest/argon2/) algorithm.

src-tauri/src/lib.rs
[code]
    use tauri::Manager;
    
    
    
    
    pub fn run() {
    
        tauri::Builder::default()
    
            .setup(|app| {
    
                let salt_path = app
    
                    .path()
    
                    .app_local_data_dir()
    
                    .expect("could not resolve app local data path")
    
                    .join("salt.txt");
    
                app.handle().plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
    
                Ok(())
    
            })
    
            .run(tauri::generate_context!())
    
            .expect("error while running tauri application");
    
    }
[/code]

### [Initialize with custom password hash function](#initialize-with-custom-password-hash-function)

[Section titled “Initialize with custom password hash function”](#initialize-with-custom-password-hash-function)

Alternatively you can provide your own hash algorithm by using the `tauri_plugin_stronghold::Builder::new` constructor.

src-tauri/src/lib.rs
[code]
    pub fn run() {
    
        tauri::Builder::default()
    
            .plugin(
    
                tauri_plugin_stronghold::Builder::new(|password| {
    
                    // Hash the password here with e.g. argon2, blake2b or any other secure algorithm
    
                    // Here is an example implementation using the `rust-argon2` crate for hashing the password
    
                    use argon2::{hash_raw, Config, Variant, Version};
    
    
    
    
                    let config = Config {
    
                        lanes: 4,
    
                        mem_cost: 10_000,
    
                        time_cost: 10,
    
                        variant: Variant::Argon2id,
    
                        version: Version::Version13,
    
                        ..Default::default()
    
                    };
    
                    let salt = "your-salt".as_bytes();
    
                    let key = hash_raw(password.as_ref(), salt, &config).expect("failed to hash password");
    
    
    
    
                    key.to_vec()
    
                })
    
                .build(),
    
            )
    
            .run(tauri::generate_context!())
    
            .expect("error while running tauri application");
    
    }
[/code]

### [Usage from JavaScript](#usage-from-javascript)

[Section titled “Usage from JavaScript”](#usage-from-javascript)

The stronghold plugin is available in JavaScript.
[code] 
    import { Client, Stronghold } from '@tauri-apps/plugin-stronghold';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { Client, Stronghold } = window.__TAURI__.stronghold;
    
    import { appDataDir } from '@tauri-apps/api/path';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { appDataDir } = window.__TAURI__.path;
    
    
    
    
    const initStronghold = async () => {
    
      const vaultPath = `${await appDataDir()}/vault.hold`;
    
      const vaultPassword = 'vault password';
    
      const stronghold = await Stronghold.load(vaultPath, vaultPassword);
    
    
    
    
      let client: Client;
    
      const clientName = 'name your client';
    
      try {
    
        client = await stronghold.loadClient(clientName);
    
      } catch {
    
        client = await stronghold.createClient(clientName);
    
      }
    
    
    
    
      return {
    
        stronghold,
    
        client,
    
      };
    
    };
    
    
    
    
    // Insert a record to the store
    
    async function insertRecord(store: any, key: string, value: string) {
    
      const data = Array.from(new TextEncoder().encode(value));
    
      await store.insert(key, data);
    
    }
    
    
    
    
    // Read a record from store
    
    async function getRecord(store: any, key: string): Promise<string> {
    
      const data = await store.get(key);
    
      return new TextDecoder().decode(new Uint8Array(data));
    
    }
    
    
    
    
    const { stronghold, client } = await initStronghold();
    
    
    
    
    const store = client.getStore();
    
    const key = 'my_key';
    
    
    
    
    // Insert a record to the store
    
    insertRecord(store, key, 'secret value');
    
    
    
    
    // Read a record from store
    
    const value = await getRecord(store, key);
    
    console.log(value); // 'secret value'
    
    
    
    
    // Save your updates
    
    await stronghold.save();
    
    
    
    
    // Remove a record from store
    
    await store.remove(key);
[/code]

## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      ...,
    
      "permissions": [
    
        "stronghold:default",
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

This permission set configures what kind of operations are available from the stronghold plugin.

#### [Granted Permissions](#granted-permissions)

All non-destructive operations are enabled by default.

#### This default permission set includes the following:

  * `allow-create-client`
  * `allow-get-store-record`
  * `allow-initialize`
  * `allow-execute-procedure`
  * `allow-load-client`
  * `allow-save-secret`
  * `allow-save-store-record`
  * `allow-save`


## Permission Table

Identifier | Description  
---|---  
`stronghold:allow-create-client` |  Enables the create_client command without any pre-configured scope.  
`stronghold:deny-create-client` |  Denies the create_client command without any pre-configured scope.  
`stronghold:allow-destroy` |  Enables the destroy command without any pre-configured scope.  
`stronghold:deny-destroy` |  Denies the destroy command without any pre-configured scope.  
`stronghold:allow-execute-procedure` |  Enables the execute_procedure command without any pre-configured scope.  
`stronghold:deny-execute-procedure` |  Denies the execute_procedure command without any pre-configured scope.  
`stronghold:allow-get-store-record` |  Enables the get_store_record command without any pre-configured scope.  
`stronghold:deny-get-store-record` |  Denies the get_store_record command without any pre-configured scope.  
`stronghold:allow-initialize` |  Enables the initialize command without any pre-configured scope.  
`stronghold:deny-initialize` |  Denies the initialize command without any pre-configured scope.  
`stronghold:allow-load-client` |  Enables the load_client command without any pre-configured scope.  
`stronghold:deny-load-client` |  Denies the load_client command without any pre-configured scope.  
`stronghold:allow-remove-secret` |  Enables the remove_secret command without any pre-configured scope.  
`stronghold:deny-remove-secret` |  Denies the remove_secret command without any pre-configured scope.  
`stronghold:allow-remove-store-record` |  Enables the remove_store_record command without any pre-configured scope.  
`stronghold:deny-remove-store-record` |  Denies the remove_store_record command without any pre-configured scope.  
`stronghold:allow-save` |  Enables the save command without any pre-configured scope.  
`stronghold:deny-save` |  Denies the save command without any pre-configured scope.  
`stronghold:allow-save-secret` |  Enables the save_secret command without any pre-configured scope.  
`stronghold:deny-save-secret` |  Denies the save_secret command without any pre-configured scope.  
`stronghold:allow-save-store-record` |  Enables the save_store_record command without any pre-configured scope.  
`stronghold:deny-save-store-record` |  Denies the save_store_record command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/stronghold](https://v2.tauri.app/plugin/stronghold)