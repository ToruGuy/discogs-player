# @tauri-apps/plugin-opener

Open files and URLs using their default application.

## [Security](#security)

[Section titled “Security”](#security)

This API has a scope configuration that forces you to restrict the files and urls to be opened.

### [Restricting access to the open | `open` API](#restricting-access-to-the-open--open-api)

[Section titled “Restricting access to the open | open API”](#restricting-access-to-the-open--open-api)

On the configuration object, `open: true` means that the open API can be used with any URL, as the argument is validated with the `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+` regex. You can change that regex by changing the boolean value to a string, e.g. `open: ^https://github.com/`.

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [openPath()](#openpath)

[Section titled “openPath()”](#openpath)
[code] 
    function openPath(path, openWith?): Promise<void>
[/code]

Opens a path with the system’s default app, or the one specified with openWith.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`path`| `string`| The path to open.  
`openWith`?| `string`| The app to open the path with. If not specified, defaults to the system default application for the specified path type.  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { openPath } from '@tauri-apps/plugin-opener';
    
    
    
    
    // opens a file using the default program:
    
    await openPath('/path/to/file');
    
    // opens a file using `vlc` command on Windows.
    
    await openPath('C:/path/to/file', 'vlc');
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/opener/guest-js/index.ts#L71>

* * *

### [openUrl()](#openurl)

[Section titled “openUrl()”](#openurl)
[code] 
    function openUrl(url, openWith?): Promise<void>
[/code]

Opens a url with the system’s default app, or the one specified with openWith.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`url`| `string` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL)| The URL to open.  
`openWith`?| `string`| The app to open the URL with. If not specified, defaults to the system default application for the specified url type. On mobile, `openWith` can be provided as `inAppBrowser` to open the URL in an in-app browser. Otherwise, it will open the URL in the system default browser.  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { openUrl } from '@tauri-apps/plugin-opener';
    
    
    
    
    // opens the given URL on the default browser:
    
    await openUrl('https://github.com/tauri-apps/tauri');
    
    // opens the given URL using `firefox`:
    
    await openUrl('https://github.com/tauri-apps/tauri', 'firefox');
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/opener/guest-js/index.ts#L42>

* * *

### [revealItemInDir()](#revealitemindir)

[Section titled “revealItemInDir()”](#revealitemindir)
[code] 
    function revealItemInDir(path): Promise<void>
[/code]

Reveal a path with the system’s default explorer.

Platform-specific:

  * **Android / iOS:** Unsupported.


#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`path`| `string` | `string`[]| The path to reveal.  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { revealItemInDir } from '@tauri-apps/plugin-opener';
    
    await revealItemInDir('/path/to/file');
    
    await revealItemInDir([ '/path/to/file', '/path/to/another/file' ]);
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/opener/guest-js/index.ts#L96>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/opener](https://v2.tauri.app/reference/javascript/opener)