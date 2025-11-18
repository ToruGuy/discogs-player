# core

Invoke your custom commands.

This package is also accessible with `window.__TAURI__.core` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Channel<T>](#channelt)

[Section titled “Channel<T>”](#channelt)

#### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter| Default type  
---|---  
`T`| `unknown`  
  
#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new Channel()](#new-channel)

[Section titled “new Channel()”](#new-channel)
[code] 
    new Channel<T>(onmessage?): Channel<T>
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`onmessage`?| (`response`) => `void`  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Channel`](/reference/javascript/api/namespacecore/#channelt)<`T`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L87>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`id`| `number`| The callback id returned from [`transformCallback`](/reference/javascript/api/namespacecore/#transformcallback)| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L79>  
  
#### [Accessors](#accessors)

[Section titled “Accessors”](#accessors)

##### [onmessage](#onmessage)

[Section titled “onmessage”](#onmessage)
[code] 
    get onmessage(): (response) => void
[/code]
[code] 
    set onmessage(handler): void
[/code]

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`handler`| (`response`) => `void`  
  
###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

`Function`

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`response`| `T`  
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

`void`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L142>

#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__)
[code] 
    __TAURI_TO_IPC_KEY__(): string
[/code]

###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

`string`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L146>

##### [toJSON()](#tojson)

[Section titled “toJSON()”](#tojson)
[code] 
    toJSON(): string
[/code]

###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

`string`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L150>

* * *

### [PluginListener](#pluginlistener)

[Section titled “PluginListener”](#pluginlistener)

#### [Constructors](#constructors-1)

[Section titled “Constructors”](#constructors-1)

##### [new PluginListener()](#new-pluginlistener)

[Section titled “new PluginListener()”](#new-pluginlistener)
[code] 
    new PluginListener(
    
       plugin,
    
       event,
    
       channelId): PluginListener
[/code]

###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`plugin`| `string`  
`event`| `string`  
`channelId`| `number`  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`PluginListener`](/reference/javascript/api/namespacecore/#pluginlistener)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L161>

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Defined in  
---|---|---  
`channelId`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L159>  
`event`| `string`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L158>  
`plugin`| `string`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L157>  
  
#### [Methods](#methods-1)

[Section titled “Methods”](#methods-1)

##### [unregister()](#unregister)

[Section titled “unregister()”](#unregister)
[code] 
    unregister(): Promise<void>
[/code]

###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L167>

* * *

### [Resource](#resource)

[Section titled “Resource”](#resource)

A rust-backed resource stored through `tauri::Manager::resources_table` API.

The resource lives in the main process and does not exist in the Javascript world, and thus will not be cleaned up automatically except on application exit. If you want to clean it up early, call [`Resource.close`](/reference/javascript/api/namespacecore/#close)

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { Resource, invoke } from '@tauri-apps/api/core';
    
    export class DatabaseHandle extends Resource {
    
      static async open(path: string): Promise<DatabaseHandle> {
    
        const rid: number = await invoke('open_db', { path });
    
        return new DatabaseHandle(rid);
    
      }
    
    
    
    
      async execute(sql: string): Promise<void> {
    
        await invoke('execute_sql', { rid: this.rid, sql });
    
      }
    
    }
[/code]

#### [Extended by](#extended-by)

[Section titled “Extended by”](#extended-by)

  * [`Image`](/reference/javascript/api/namespaceimage/#image)
  * [`TrayIcon`](/reference/javascript/api/namespacetray/#trayicon)


#### [Constructors](#constructors-2)

[Section titled “Constructors”](#constructors-2)

##### [new Resource()](#new-resource)

[Section titled “new Resource()”](#new-resource)
[code] 
    new Resource(rid): Resource
[/code]

###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`rid`| `number`  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Resource`](/reference/javascript/api/namespacecore/#resource)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L322>

#### [Accessors](#accessors-1)

[Section titled “Accessors”](#accessors-1)

##### [rid](#rid)

[Section titled “rid”](#rid)
[code] 
    get rid(): number
[/code]

###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

`number`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L318>

#### [Methods](#methods-2)

[Section titled “Methods”](#methods-2)

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Destroys and cleans up this resource from memory. **You should not call any method on this object anymore and should drop any reference to it.**

###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L330>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [InvokeOptions](#invokeoptions)

[Section titled “InvokeOptions”](#invokeoptions)

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Defined in  
---|---|---  
`headers`| `HeadersInit`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L233>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [InvokeArgs](#invokeargs)

[Section titled “InvokeArgs”](#invokeargs)
[code] 
    type InvokeArgs: Record<string, unknown> | number[] | ArrayBuffer | Uint8Array;
[/code]

Command arguments.

#### [Since](#since-1)

[Section titled “Since”](#since-1)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L227>

* * *

### [PermissionState](#permissionstate)

[Section titled “PermissionState”](#permissionstate)
[code] 
    type PermissionState: "granted" | "denied" | "prompt" | "prompt-with-rationale";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L202>

## [Variables](#variables)

[Section titled “Variables”](#variables)

### [SERIALIZE_TO_IPC_FN](#serialize_to_ipc_fn)

[Section titled “SERIALIZE_TO_IPC_FN”](#serialize_to_ipc_fn)
[code] 
    const SERIALIZE_TO_IPC_FN: "__TAURI_TO_IPC_KEY__" = '__TAURI_TO_IPC_KEY__';
[/code]

A key to be used to implement a special function on your types that define how your type should be serialized when passing across the IPC.

#### [Example](#example-1)

[Section titled “Example”](#example-1)

Given a type in Rust that looks like this
[code] 
    #[derive(serde::Serialize, serde::Deserialize)
    
    enum UserId {
    
      String(String),
    
      Number(u32),
    
    }
[/code]

`UserId::String("id")` would be serialized into `{ String: "id" }` and so we need to pass the same structure back to Rust
[code] 
    import { SERIALIZE_TO_IPC_FN } from "@tauri-apps/api/core"
    
    
    
    
    class UserIdString {
    
      id
    
      constructor(id) {
    
        this.id = id
    
      }
    
    
    
    
      [SERIALIZE_TO_IPC_FN]() {
    
        return { String: this.id }
    
      }
    
    }
    
    
    
    
    class UserIdNumber {
    
      id
    
      constructor(id) {
    
        this.id = id
    
      }
    
    
    
    
      [SERIALIZE_TO_IPC_FN]() {
    
        return { Number: this.id }
    
      }
    
    }
    
    
    
    
    type UserId = UserIdString | UserIdNumber
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L59>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [addPluginListener()](#addpluginlistener)

[Section titled “addPluginListener()”](#addpluginlistener)
[code] 
    function addPluginListener<T>(
    
       plugin,
    
       event,
    
    cb): Promise<PluginListener>
[/code]

Adds a listener to a plugin event.

#### [Type Parameters](#type-parameters-1)

[Section titled “Type Parameters”](#type-parameters-1)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`plugin`| `string`  
`event`| `string`  
`cb`| (`payload`) => `void`  
  
#### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PluginListener`](/reference/javascript/api/namespacecore/#pluginlistener)>

The listener object to stop listening to the events.

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L182>

* * *

### [checkPermissions()](#checkpermissions)

[Section titled “checkPermissions()”](#checkpermissions)
[code] 
    function checkPermissions<T>(plugin): Promise<T>
[/code]

Get permission state for a plugin.

This should be used by plugin authors to wrap their actual implementation.

#### [Type Parameters](#type-parameters-2)

[Section titled “Type Parameters”](#type-parameters-2)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`plugin`| `string`  
  
#### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`T`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L209>

* * *

### [convertFileSrc()](#convertfilesrc)

[Section titled “convertFileSrc()”](#convertfilesrc)
[code] 
    function convertFileSrc(filePath, protocol): string
[/code]

Convert a device file path to an URL that can be loaded by the webview. Note that `asset:` and `http://asset.localhost` must be added to [`app.security.csp`](https://v2.tauri.app/reference/config/#csp-1) in `tauri.conf.json`. Example CSP value: `"csp": "default-src 'self' ipc: http://ipc.localhost; img-src 'self' asset: http://asset.localhost"` to use the asset protocol on image sources.

Additionally, `"enable" : "true"` must be added to [`app.security.assetProtocol`](https://v2.tauri.app/reference/config/#assetprotocolconfig) in `tauri.conf.json` and its access scope must be defined on the `scope` array on the same `assetProtocol` object.

#### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type| Default value| Description  
---|---|---|---  
`filePath`| `string`| `undefined`| The file path.  
`protocol`| `string`| `'asset'`| The protocol to use. Defaults to `asset`. You only need to set this when using a custom protocol.  
  
#### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

`string`

the URL that can be used as source on the webview.

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { appDataDir, join } from '@tauri-apps/api/path';
    
    import { convertFileSrc } from '@tauri-apps/api/core';
    
    const appDataDirPath = await appDataDir();
    
    const filePath = await join(appDataDirPath, 'assets/video.mp4');
    
    const assetUrl = convertFileSrc(filePath);
    
    
    
    
    const video = document.getElementById('my-video');
    
    const source = document.createElement('source');
    
    source.type = 'video/mp4';
    
    source.src = assetUrl;
    
    video.appendChild(source);
    
    video.load();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L289>

* * *

### [invoke()](#invoke)

[Section titled “invoke()”](#invoke)
[code] 
    function invoke<T>(
    
       cmd,
    
       args,
    
    options?): Promise<T>
[/code]

Sends a message to the backend.

#### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type| Description  
---|---|---  
`cmd`| `string`| The command name.  
`args`| [`InvokeArgs`](/reference/javascript/api/namespacecore/#invokeargs)| The optional arguments to pass to the command.  
`options`?| [`InvokeOptions`](/reference/javascript/api/namespacecore/#invokeoptions)| The request options.  
  
#### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`T`>

A promise resolving or rejecting to the backend response.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { invoke } from '@tauri-apps/api/core';
    
    await invoke('login', { user: 'tauri', password: 'poiwe3h4r5ip3yrhtew9ty' });
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L251>

* * *

### [isTauri()](#istauri)

[Section titled “isTauri()”](#istauri)
[code] 
    function isTauri(): boolean
[/code]

#### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

`boolean`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L337>

* * *

### [requestPermissions()](#requestpermissions)

[Section titled “requestPermissions()”](#requestpermissions)
[code] 
    function requestPermissions<T>(plugin): Promise<T>
[/code]

Request permissions.

This should be used by plugin authors to wrap their actual implementation.

#### [Type Parameters](#type-parameters-4)

[Section titled “Type Parameters”](#type-parameters-4)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`plugin`| `string`  
  
#### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`T`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L218>

* * *

### [transformCallback()](#transformcallback)

[Section titled “transformCallback()”](#transformcallback)
[code] 
    function transformCallback<T>(callback?, once?): number
[/code]

Stores the callback in a known location, and returns an identifier that can be passed to the backend. The backend uses the identifier to `eval()` the callback.

#### [Type Parameters](#type-parameters-5)

[Section titled “Type Parameters”](#type-parameters-5)

Type Parameter| Default type  
---|---  
`T`| `unknown`  
  
#### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type| Default value  
---|---|---  
`callback`?| (`response`) => `void`| `undefined`  
`once`?| `boolean`| `false`  
  
#### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

`number`

An unique identifier associated with the callback function.

#### [Since](#since-5)

[Section titled “Since”](#since-5)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L69>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacecore](https://v2.tauri.app/reference/javascript/api/namespacecore)