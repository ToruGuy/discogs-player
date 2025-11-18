# @tauri-apps/plugin-deep-link

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [getCurrent()](#getcurrent)

[Section titled “getCurrent()”](#getcurrent)
[code] 
    function getCurrent(): Promise<string[] | null>
[/code]

Get the current URLs that triggered the deep link. Use this on app load to check whether your app was started via a deep link.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`[] | `null`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { getCurrent } from '@tauri-apps/plugin-deep-link';
    
    const urls = await getCurrent();
[/code]

#### [\- **Windows / Linux** : This function reads the command line arguments and checks if there’s only one value, which must be an URL with scheme matching one of the configured values.](#--windows--linux-this-function-reads-the-command-line-arguments-and-checks-if-theres-only-one-value-which-must-be-an-url-with-scheme-matching-one-of-the-configured-values)

[Section titled “- Windows / Linux: This function reads the command line arguments and checks if there’s only one value, which must be an URL with scheme matching one of the configured values.”](#--windows--linux-this-function-reads-the-command-line-arguments-and-checks-if-theres-only-one-value-which-must-be-an-url-with-scheme-matching-one-of-the-configured-values)

Note that you must manually check the arguments when registering deep link schemes dynamically with [`Self::register`]. Additionally, the deep link might have been provided as a CLI argument so you should check if its format matches what you expect..

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/deep-link/guest-js/index.ts#L23>

* * *

### [isRegistered()](#isregistered)

[Section titled “isRegistered()”](#isregistered)
[code] 
    function isRegistered(protocol): Promise<boolean>
[/code]

Check whether the app is the default handler for the specified protocol.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`protocol`| `string`| The name of the protocol without `://`.  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { isRegistered } from '@tauri-apps/plugin-deep-link';
    
    await isRegistered("my-scheme");
[/code]

#### [\- **macOS / Android / iOS** : Unsupported.](#--macos--android--ios-unsupported)

[Section titled “- macOS / Android / iOS: Unsupported.”](#--macos--android--ios-unsupported)

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/deep-link/guest-js/index.ts#L80>

* * *

### [onOpenUrl()](#onopenurl)

[Section titled “onOpenUrl()”](#onopenurl)
[code] 
    function onOpenUrl(handler): Promise<UnlistenFn>
[/code]

Helper function for the `deep-link://new-url` event to run a function each time the protocol is triggered while the app is running. Use `getCurrent` on app load to check whether your app was started via a deep link.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`handler`| (`urls`) => `void`  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { onOpenUrl } from '@tauri-apps/plugin-deep-link';
    
    await onOpenUrl((urls) => { console.log(urls) });
[/code]

#### [\- **Windows / Linux** : Unsupported without the single-instance plugin. The OS will spawn a new app instance passing the URL as a CLI argument.](#--windows--linux-unsupported-without-the-single-instance-plugin-the-os-will-spawn-a-new-app-instance-passing-the-url-as-a-cli-argument)

[Section titled “- Windows / Linux: Unsupported without the single-instance plugin. The OS will spawn a new app instance passing the URL as a CLI argument.”](#--windows--linux-unsupported-without-the-single-instance-plugin-the-os-will-spawn-a-new-app-instance-passing-the-url-as-a-cli-argument)

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/deep-link/guest-js/index.ts#L99>

* * *

### [register()](#register)

[Section titled “register()”](#register)
[code] 
    function register(protocol): Promise<null>
[/code]

Register the app as the default handler for the specified protocol.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`protocol`| `string`| The name of the protocol without `://`. For example, if you want your app to handle `tauri://` links, call this method with `tauri` as the protocol.  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null`>

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { register } from '@tauri-apps/plugin-deep-link';
    
    await register("my-scheme");
[/code]

#### [\- **macOS / Android / iOS** : Unsupported.](#--macos--android--ios-unsupported-1)

[Section titled “- macOS / Android / iOS: Unsupported.”](#--macos--android--ios-unsupported-1)

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/deep-link/guest-js/index.ts#L42>

* * *

### [unregister()](#unregister)

[Section titled “unregister()”](#unregister)
[code] 
    function unregister(protocol): Promise<null>
[/code]

Unregister the app as the default handler for the specified protocol.

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type| Description  
---|---|---  
`protocol`| `string`| The name of the protocol without `://`.  
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null`>

#### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { unregister } from '@tauri-apps/plugin-deep-link';
    
    await unregister("my-scheme");
[/code]

#### [\- **macOS / Linux / Android / iOS** : Unsupported.](#--macos--linux--android--ios-unsupported)

[Section titled “- macOS / Linux / Android / iOS: Unsupported.”](#--macos--linux--android--ios-unsupported)

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/deep-link/guest-js/index.ts#L61>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/deep-link](https://v2.tauri.app/reference/javascript/deep-link)