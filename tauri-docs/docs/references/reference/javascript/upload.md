# @tauri-apps/plugin-upload

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [download()](#download)

[Section titled “download()”](#download)
[code] 
    function download(
    
       url,
    
       filePath,
    
       progressHandler?,
    
       headers?,
    
    body?): Promise<void>
[/code]

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`url`| `string`  
`filePath`| `string`  
`progressHandler`?| `ProgressHandler`  
`headers`?| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<`string`, `string`>  
`body`?| `string`  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/upload/guest-js/index.ts#L44>

* * *

### [upload()](#upload)

[Section titled “upload()”](#upload)
[code] 
    function upload(
    
       url,
    
       filePath,
    
       progressHandler?,
    
    headers?): Promise<string>
[/code]

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`url`| `string`  
`filePath`| `string`  
`progressHandler`?| `ProgressHandler`  
`headers`?| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<`string`, `string`>  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/upload/guest-js/index.ts#L16>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/upload](https://v2.tauri.app/reference/javascript/upload)