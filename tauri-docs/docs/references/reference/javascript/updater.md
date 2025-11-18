# @tauri-apps/plugin-updater

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Update](#update)

[Section titled “Update”](#update)

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * `Resource`


#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new Update()](#new-update)

[Section titled “new Update()”](#new-update)
[code] 
    new Update(metadata): Update
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`metadata`| `UpdateMetadata`  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Update`](/reference/javascript/updater/#update)

###### [Overrides](#overrides)

[Section titled “Overrides”](#overrides)

`Resource.constructor`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L69>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
~~`available`~~| `boolean`| **Deprecated** This is always true, check if the return value is `null` instead when using [`check`](/reference/javascript/updater/#check)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L61>  
`body?`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L65>  
`currentVersion`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L62>  
`date?`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L64>  
`rawJson`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `unknown`>| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L66>  
`version`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L63>  
  
#### [Accessors](#accessors)

[Section titled “Accessors”](#accessors)

##### [rid](#rid)

[Section titled “rid”](#rid)
[code] 
    get rid(): number
[/code]

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

`number`

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

`Resource.rid`

**Source** : undefined

#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Destroys and cleans up this resource from memory. **You should not call any method on this object anymore and should drop any reference to it.**

###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Overrides](#overrides-1)

[Section titled “Overrides”](#overrides-1)

`Resource.close`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L129>

##### [download()](#download)

[Section titled “download()”](#download)
[code] 
    download(onEvent?, options?): Promise<void>
[/code]

Download the updater package

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`onEvent`?| (`progress`) => `void`  
`options`?| [`DownloadOptions`](/reference/javascript/updater/#downloadoptions)  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L80>

##### [downloadAndInstall()](#downloadandinstall)

[Section titled “downloadAndInstall()”](#downloadandinstall)
[code] 
    downloadAndInstall(onEvent?, options?): Promise<void>
[/code]

Downloads the updater package and installs it

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`onEvent`?| (`progress`) => `void`  
`options`?| [`DownloadOptions`](/reference/javascript/updater/#downloadoptions)  
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L113>

##### [install()](#install)

[Section titled “install()”](#install)
[code] 
    install(): Promise<void>
[/code]

Install downloaded updater package

###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L98>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [CheckOptions](#checkoptions)

[Section titled “CheckOptions”](#checkoptions)

Options used when checking for updates

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`allowDowngrades?`| `boolean`| Allow downgrades to previous versions by not checking if the current version is greater than the available version.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L28>  
`headers?`| `HeadersInit`| Request headers| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L12>  
`proxy?`| `string`| A proxy url to be used when checking and downloading updates.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L20>  
`target?`| `string`| Target identifier for the running application. This is sent to the backend.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L24>  
`timeout?`| `number`| Timeout in milliseconds| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L16>  
  
* * *

### [DownloadOptions](#downloadoptions)

[Section titled “DownloadOptions”](#downloadoptions)

Options used when downloading an update

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Description| Defined in  
---|---|---|---  
`headers?`| `HeadersInit`| Request headers| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L36>  
`timeout?`| `number`| Timeout in milliseconds| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L40>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [DownloadEvent](#downloadevent)

[Section titled “DownloadEvent”](#downloadevent)
[code] 
    type DownloadEvent: object | object | object;
[/code]

Updater download event

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L53>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [check()](#check)

[Section titled “check()”](#check)
[code] 
    function check(options?): Promise<Update | null>
[/code]

Check for updates, resolves to `null` if no updates are available

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`options`?| [`CheckOptions`](/reference/javascript/updater/#checkoptions)  
  
#### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Update`](/reference/javascript/updater/#update) | `null`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/guest-js/index.ts#L136>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/updater](https://v2.tauri.app/reference/javascript/updater)