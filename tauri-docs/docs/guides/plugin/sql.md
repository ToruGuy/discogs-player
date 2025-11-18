# SQL

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/sql) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-sql) [ crates.io ](https://crates.io/crates/tauri-plugin-sql)

API Reference [ ](/reference/javascript/sql/) [ ](https://docs.rs/tauri-plugin-sql)

Plugin providing an interface for the frontend to communicate with SQL databases through [sqlx](https://github.com/launchbadge/sqlx). It supports the SQLite, MySQL and PostgreSQL drivers, enabled by a Cargo feature.

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

Install the SQL plugin to get started.

  * [ Automatic ](#tab-panel-1460)
  * [ Manual ](#tab-panel-1461)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1449)
  * [ yarn ](#tab-panel-1450)
  * [ pnpm ](#tab-panel-1451)
  * [ deno ](#tab-panel-1452)
  * [ bun ](#tab-panel-1453)
  * [ cargo ](#tab-panel-1454)


[code] 
    npm run tauri add sql
[/code]
[code] 
    yarn run tauri add sql
[/code]
[code] 
    pnpm tauri add sql
[/code]
[code] 
    deno task tauri add sql
[/code]
[code] 
    bun tauri add sql
[/code]
[code] 
    cargo tauri add sql
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-sql
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
             pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_sql::Builder::default().build())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. Install the JavaScript Guest bindings using your preferred JavaScript package manager:

     * [ npm ](#tab-panel-1455)
     * [ yarn ](#tab-panel-1456)
     * [ pnpm ](#tab-panel-1457)
     * [ deno ](#tab-panel-1458)
     * [ bun ](#tab-panel-1459)
[code] npm install @tauri-apps/plugin-sql
[/code]
[code] yarn add @tauri-apps/plugin-sql
[/code]
[code] pnpm add @tauri-apps/plugin-sql
[/code]
[code] deno add npm:@tauri-apps/plugin-sql
[/code]
[code] bun add @tauri-apps/plugin-sql
[/code]


After installing the plugin, you must select the supported database engine. The available engines are Sqlite, MySQL and PostgreSQL. Run the following command in the `src-tauri` folder to enable your preferred engine:

  * [ SQLite ](#tab-panel-1440)
  * [ MySQL ](#tab-panel-1441)
  * [ PostgreSQL ](#tab-panel-1442)


[code] 
    cargo add tauri-plugin-sql --features sqlite
[/code]
[code] 
    cargo add tauri-plugin-sql --features mysql
[/code]
[code] 
    cargo add tauri-plugin-sql --features postgres
[/code]

## [Usage](#usage)

[Section titled “Usage”](#usage)

All the plugin’s APIs are available through the JavaScript guest bindings:

  * [ SQLite ](#tab-panel-1443)
  * [ MySQL ](#tab-panel-1444)
  * [ PostgreSQL ](#tab-panel-1445)


The path is relative to [`tauri::api::path::BaseDirectory::AppConfig`](https://docs.rs/tauri/2.0.0/tauri/path/enum.BaseDirectory.html#variant.AppConfig).
[code]
    import Database from '@tauri-apps/plugin-sql';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const Database = window.__TAURI__.sql;
    
    
    
    
    const db = await Database.load('sqlite:test.db');
    
    await db.execute('INSERT INTO ...');
[/code]
[code] 
    import Database from '@tauri-apps/plugin-sql';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const Database = window.__TAURI__.sql;
    
    
    
    
    const db = await Database.load('mysql://user:password@host/test');
    
    await db.execute('INSERT INTO ...');
[/code]
[code] 
    import Database from '@tauri-apps/plugin-sql';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const Database = window.__TAURI__.sql;
    
    
    
    
    const db = await Database.load('postgres://user:password@host/test');
    
    await db.execute('INSERT INTO ...');
[/code]

## [Syntax](#syntax)

[Section titled “Syntax”](#syntax)

We use [sqlx](https://docs.rs/sqlx/latest/sqlx/) as the underlying library and adopt their query syntax.

  * [ SQLite ](#tab-panel-1446)
  * [ MySQL ](#tab-panel-1447)
  * [ PostgreSQL ](#tab-panel-1448)


Use the ”$#” syntax when substituting query data
[code]
    const result = await db.execute(
    
      'INSERT into todos (id, title, status) VALUES ($1, $2, $3)',
    
      [todos.id, todos.title, todos.status]
    
    );
    
    
    
    
    const result = await db.execute(
    
      'UPDATE todos SET title = $1, status = $2 WHERE id = $3',
    
      [todos.title, todos.status, todos.id]
    
    );
[/code]

Use ”?” when substituting query data
[code]
    const result = await db.execute(
    
      'INSERT into todos (id, title, status) VALUES (?, ?, ?)',
    
      [todos.id, todos.title, todos.status]
    
    );
    
    
    
    
    const result = await db.execute(
    
      'UPDATE todos SET title = ?, status = ? WHERE id = ?',
    
      [todos.title, todos.status, todos.id]
    
    );
[/code]

Use the ”$#” syntax when substituting query data
[code]
    const result = await db.execute(
    
      'INSERT into todos (id, title, status) VALUES ($1, $2, $3)',
    
      [todos.id, todos.title, todos.status]
    
    );
    
    
    
    
    const result = await db.execute(
    
      'UPDATE todos SET title = $1, status = $2 WHERE id = $3',
    
      [todos.title, todos.status, todos.id]
    
    );
[/code]

## [Migrations](#migrations)

[Section titled “Migrations”](#migrations)

This plugin supports database migrations, allowing you to manage database schema evolution over time.

### [Defining Migrations](#defining-migrations)

[Section titled “Defining Migrations”](#defining-migrations)

Migrations are defined in Rust using the [`Migration`](https://docs.rs/tauri-plugin-sql/latest/tauri_plugin_sql/struct.Migration.html) struct. Each migration should include a unique version number, a description, the SQL to be executed, and the type of migration (Up or Down).

Example of a migration:
[code] 
    use tauri_plugin_sql::{Migration, MigrationKind};
    
    
    
    
    let migration = Migration {
    
        version: 1,
    
        description: "create_initial_tables",
    
        sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
    
        kind: MigrationKind::Up,
    
    };
[/code]

Or if you want to use SQL from a file, you can include it by using `include_str!`:
[code] 
    use tauri_plugin_sql::{Migration, MigrationKind};
    
    
    
    
    let migration = Migration {
    
        version: 1,
    
        description: "create_initial_tables",
    
        sql: include_str!("../drizzle/0000_graceful_boomer.sql"),
    
        kind: MigrationKind::Up,
    
    };
[/code]

### [Adding Migrations to the Plugin Builder](#adding-migrations-to-the-plugin-builder)

[Section titled “Adding Migrations to the Plugin Builder”](#adding-migrations-to-the-plugin-builder)

Migrations are registered with the [`Builder`](https://docs.rs/tauri-plugin-sql/latest/tauri_plugin_sql/struct.Builder.html) struct provided by the plugin. Use the `add_migrations` method to add your migrations to the plugin for a specific database connection.

Example of adding migrations:

src-tauri/src/main.rs
[code]
    use tauri_plugin_sql::{Builder, Migration, MigrationKind};
    
    
    
    
    fn main() {
    
        let migrations = vec![
    
            // Define your migrations here
    
            Migration {
    
                version: 1,
    
                description: "create_initial_tables",
    
                sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
    
                kind: MigrationKind::Up,
    
            }
    
        ];
    
    
    
    
        tauri::Builder::default()
    
            .plugin(
    
                tauri_plugin_sql::Builder::default()
    
                    .add_migrations("sqlite:mydatabase.db", migrations)
    
                    .build(),
    
            )
    
            ...
    
    }
[/code]

### [Applying Migrations](#applying-migrations)

[Section titled “Applying Migrations”](#applying-migrations)

To apply the migrations when the plugin is initialized, add the connection string to the `tauri.conf.json` file:

src-tauri/tauri.conf.json
[code]
    {
    
      "plugins": {
    
        "sql": {
    
          "preload": ["sqlite:mydatabase.db"]
    
        }
    
      }
    
    }
[/code]

Alternatively, the client side `load()` also runs the migrations for a given connection string:
[code] 
    import Database from '@tauri-apps/plugin-sql';
    
    const db = await Database.load('sqlite:mydatabase.db');
[/code]

Ensure that the migrations are defined in the correct order and are safe to run multiple times.

### [Migration Management](#migration-management)

[Section titled “Migration Management”](#migration-management)

  * **Version Control** : Each migration must have a unique version number. This is crucial for ensuring the migrations are applied in the correct order.
  * **Idempotency** : Write migrations in a way that they can be safely re-run without causing errors or unintended consequences.
  * **Testing** : Thoroughly test migrations to ensure they work as expected and do not compromise the integrity of your database.


## [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](/security/capabilities/) for more information and the [step by step guide](/learn/security/using-plugin-permissions/) to use plugin permissions.

src-tauri/capabilities/default.json
[code]
    {
    
      "permissions": [
    
        ...,
    
        "sql:default",
    
        "sql:allow-execute",
    
      ]
    
    }
[/code]

## [Default Permission](#default-permission)

### [Default Permissions](#default-permissions)

This permission set configures what kind of database operations are available from the sql plugin.

### Granted Permissions

All reading related operations are enabled. Also allows to load or close a connection.

#### This default permission set includes the following:

  * `allow-close`
  * `allow-load`
  * `allow-select`


## Permission Table

Identifier | Description  
---|---  
`sql:allow-close` |  Enables the close command without any pre-configured scope.  
`sql:deny-close` |  Denies the close command without any pre-configured scope.  
`sql:allow-execute` |  Enables the execute command without any pre-configured scope.  
`sql:deny-execute` |  Denies the execute command without any pre-configured scope.  
`sql:allow-load` |  Enables the load command without any pre-configured scope.  
`sql:deny-load` |  Denies the load command without any pre-configured scope.  
`sql:allow-select` |  Enables the select command without any pre-configured scope.  
`sql:deny-select` |  Denies the select command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/sql](https://v2.tauri.app/plugin/sql)