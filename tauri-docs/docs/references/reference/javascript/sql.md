# @tauri-apps/plugin-sql

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [default](#default)

[Section titled “default”](#default)

**Database**

The `Database` class serves as the primary interface for communicating with the rust side of the sql plugin.

#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new default()](#new-default)

[Section titled “new default()”](#new-default)
[code] 
    new default(path): default
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`path`| `string`  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`default`](/reference/javascript/sql/#default)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L29>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`path`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L28>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(db?): Promise<boolean>
[/code]

**close**

Closes the database connection pool.

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`db`?| `string`| Optionally state the name of a database if you are managing more than one. Otherwise, all database pools will be in scope.  
  
###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Example](#example)

[Section titled “Example”](#example)
[code] 
    const success = await db.close()
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L162>

##### [execute()](#execute)

[Section titled “execute()”](#execute)
[code] 
    execute(query, bindValues?): Promise<QueryResult>
[/code]

**execute**

Passes a SQL expression to the database for execution.

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`query`| `string`  
`bindValues`?| `unknown`[]  
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`QueryResult`](/reference/javascript/sql/#queryresult)>

###### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    // for sqlite & postgres
    
    // INSERT example
    
    const result = await db.execute(
    
       "INSERT into todos (id, title, status) VALUES ($1, $2, $3)",
    
       [ todos.id, todos.title, todos.status ]
    
    );
    
    // UPDATE example
    
    const result = await db.execute(
    
       "UPDATE todos SET title = $1, completed = $2 WHERE id = $3",
    
       [ todos.title, todos.status, todos.id ]
    
    );
    
    
    
    
    // for mysql
    
    // INSERT example
    
    const result = await db.execute(
    
       "INSERT into todos (id, title, status) VALUES (?, ?, ?)",
    
       [ todos.id, todos.title, todos.status ]
    
    );
    
    // UPDATE example
    
    const result = await db.execute(
    
       "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    
       [ todos.title, todos.status, todos.id ]
    
    );
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L108>

##### [select()](#select)

[Section titled “select()”](#select)
[code] 
    select<T>(query, bindValues?): Promise<T>
[/code]

**select**

Passes in a SELECT query to the database for execution.

###### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`query`| `string`  
`bindValues`?| `unknown`[]  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`T`>

###### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    // for sqlite & postgres
    
    const result = await db.select(
    
       "SELECT * from todos WHERE id = $1", [ id ]
    
    );
    
    
    
    
    // for mysql
    
    const result = await db.select(
    
       "SELECT * from todos WHERE id = ?", [ id ]
    
    );
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L141>

##### [get()](#get)

[Section titled “get()”](#get)
[code] 
    static get(path): default
[/code]

**get**

A static initializer which synchronously returns an instance of the Database class while deferring the actual database connection until the first invocation or selection on the database.

# [Sqlite](#sqlite)

[Section titled “Sqlite”](#sqlite)

The path is relative to `tauri::path::BaseDirectory::App` and must start with `sqlite:`.

###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`path`| `string`  
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`default`](/reference/javascript/sql/#default)

###### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    const db = Database.get("sqlite:test.db");
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L72>

##### [load()](#load)

[Section titled “load()”](#load)
[code] 
    static load(path): Promise<default>
[/code]

**load**

A static initializer which connects to the underlying database and returns a `Database` instance once a connection to the database is established.

# [Sqlite](#sqlite-1)

[Section titled “Sqlite”](#sqlite-1)

The path is relative to `tauri::path::BaseDirectory::App` and must start with `sqlite:`.

###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`path`| `string`  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`default`](/reference/javascript/sql/#default)>

###### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    const db = await Database.load("sqlite:test.db");
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L48>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [QueryResult](#queryresult)

[Section titled “QueryResult”](#queryresult)

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`lastInsertId?`| `number`| The last inserted `id`. This value is not set for Postgres databases. If the last inserted id is required on Postgres, the `select` function must be used, with a `RETURNING` clause (`INSERT INTO todos (title) VALUES ($1) RETURNING id`).| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L18>  
`rowsAffected`| `number`| The number of rows affected by the query.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/sql/guest-js/index.ts#L9>  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/sql](https://v2.tauri.app/reference/javascript/sql)