# app

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [BundleType](#bundletype)

[Section titled “BundleType”](#bundletype)

Bundle type of the current application.

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [App](#app)

[Section titled “App”](#app)
[code] 
    App: "app";
[/code]

macOS app bundle

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L48>

##### [AppImage](#appimage)

[Section titled “AppImage”](#appimage)
[code] 
    AppImage: "appimage";
[/code]

Linux AppImage

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L46>

##### [Deb](#deb)

[Section titled “Deb”](#deb)
[code] 
    Deb: "deb";
[/code]

Linux Debian package

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L42>

##### [Msi](#msi)

[Section titled “Msi”](#msi)
[code] 
    Msi: "msi";
[/code]

Windows MSI

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L40>

##### [Nsis](#nsis)

[Section titled “Nsis”](#nsis)
[code] 
    Nsis: "nsis";
[/code]

Windows NSIS

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L38>

##### [Rpm](#rpm)

[Section titled “Rpm”](#rpm)
[code] 
    Rpm: "rpm";
[/code]

Linux RPM

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L44>

## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [DataStoreIdentifier](#datastoreidentifier)

[Section titled “DataStoreIdentifier”](#datastoreidentifier)
[code] 
    type DataStoreIdentifier: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
[/code]

Identifier type used for data stores on macOS and iOS.

Represents a 128-bit identifier, commonly expressed as a 16-byte UUID.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L14>

* * *

### [OnBackButtonPressPayload](#onbackbuttonpresspayload)

[Section titled “OnBackButtonPressPayload”](#onbackbuttonpresspayload)
[code] 
    type OnBackButtonPressPayload: object;
[/code]

Payload for the onBackButtonPress event.

#### [Type declaration](#type-declaration)

[Section titled “Type declaration”](#type-declaration)

Name| Type| Description| Defined in  
---|---|---|---  
`canGoBack`| `boolean`| Whether the webview canGoBack property is true.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L260>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L258>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [defaultWindowIcon()](#defaultwindowicon)

[Section titled “defaultWindowIcon()”](#defaultwindowicon)
[code] 
    function defaultWindowIcon(): Promise<Image | null>
[/code]

Gets the default window icon.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Image`](/reference/javascript/api/namespaceimage/#image) | `null`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { defaultWindowIcon } from '@tauri-apps/api/app';
    
    const icon = await defaultWindowIcon();
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L197>

* * *

### [fetchDataStoreIdentifiers()](#fetchdatastoreidentifiers)

[Section titled “fetchDataStoreIdentifiers()”](#fetchdatastoreidentifiers)
[code] 
    function fetchDataStoreIdentifiers(): Promise<DataStoreIdentifier[]>
[/code]

Fetches the data store identifiers on macOS and iOS.

See <https://developer.apple.com/documentation/webkit/wkwebsitedatastore> for more information.

#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`DataStoreIdentifier`](/reference/javascript/api/namespaceapp/#datastoreidentifier)[]>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { fetchDataStoreIdentifiers } from '@tauri-apps/api/app';
    
    const ids = await fetchDataStoreIdentifiers();
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.4.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L160>

* * *

### [getBundleType()](#getbundletype)

[Section titled “getBundleType()”](#getbundletype)
[code] 
    function getBundleType(): Promise<BundleType>
[/code]

Gets the application bundle type.

#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`BundleType`](/reference/javascript/api/namespaceapp/#bundletype)>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { getBundleType } from '@tauri-apps/api/app';
    
    const type = await getBundleType();
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.5.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L251>

* * *

### [getIdentifier()](#getidentifier)

[Section titled “getIdentifier()”](#getidentifier)
[code] 
    function getIdentifier(): Promise<string>
[/code]

Gets the application identifier.

#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

The application identifier as configured in `tauri.conf.json`.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { getIdentifier } from '@tauri-apps/api/app';
    
    const identifier = await getIdentifier();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.4.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L112>

* * *

### [getName()](#getname)

[Section titled “getName()”](#getname)
[code] 
    function getName(): Promise<string>
[/code]

Gets the application name.

#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { getName } from '@tauri-apps/api/app';
    
    const appName = await getName();
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L81>

* * *

### [getTauriVersion()](#gettauriversion)

[Section titled “getTauriVersion()”](#gettauriversion)
[code] 
    function getTauriVersion(): Promise<string>
[/code]

Gets the Tauri framework version used by this application.

#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { getTauriVersion } from '@tauri-apps/api/app';
    
    const tauriVersion = await getTauriVersion();
[/code]

#### [Since](#since-5)

[Section titled “Since”](#since-5)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L96>

* * *

### [getVersion()](#getversion)

[Section titled “getVersion()”](#getversion)
[code] 
    function getVersion(): Promise<string>
[/code]

Gets the application version.

#### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { getVersion } from '@tauri-apps/api/app';
    
    const appVersion = await getVersion();
[/code]

#### [Since](#since-6)

[Section titled “Since”](#since-6)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L67>

* * *

### [hide()](#hide)

[Section titled “hide()”](#hide)
[code] 
    function hide(): Promise<void>
[/code]

Hides the application on macOS.

#### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { hide } from '@tauri-apps/api/app';
    
    await hide();
[/code]

#### [Since](#since-7)

[Section titled “Since”](#since-7)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L143>

* * *

### [onBackButtonPress()](#onbackbuttonpress)

[Section titled “onBackButtonPress()”](#onbackbuttonpress)
[code] 
    function onBackButtonPress(handler): Promise<PluginListener>
[/code]

Listens to the backButton event on Android.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`handler`| (`payload`) => `void`|   
  
#### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PluginListener`](/reference/javascript/api/namespacecore/#pluginlistener)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L267>

* * *

### [removeDataStore()](#removedatastore)

[Section titled “removeDataStore()”](#removedatastore)
[code] 
    function removeDataStore(uuid): Promise<void>
[/code]

Removes the data store with the given identifier.

Note that any webview using this data store should be closed before running this API.

See <https://developer.apple.com/documentation/webkit/wkwebsitedatastore> for more information.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`uuid`| [`DataStoreIdentifier`](/reference/javascript/api/namespaceapp/#datastoreidentifier)  
  
#### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-8)

[Section titled “Example”](#example-8)
[code] 
    import { fetchDataStoreIdentifiers, removeDataStore } from '@tauri-apps/api/app';
    
    for (const id of (await fetchDataStoreIdentifiers())) {
    
      await removeDataStore(id);
    
    }
[/code]

#### [Since](#since-8)

[Section titled “Since”](#since-8)

2.4.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L181>

* * *

### [setDockVisibility()](#setdockvisibility)

[Section titled “setDockVisibility()”](#setdockvisibility)
[code] 
    function setDockVisibility(visible): Promise<void>
[/code]

Sets the dock visibility for the application on macOS.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`visible`| `boolean`| Whether the dock should be visible or not.  
  
#### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { setDockVisibility } from '@tauri-apps/api/app';
    
    await setDockVisibility(false);
[/code]

#### [Since](#since-9)

[Section titled “Since”](#since-9)

2.5.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L236>

* * *

### [setTheme()](#settheme)

[Section titled “setTheme()”](#settheme)
[code] 
    function setTheme(theme?): Promise<void>
[/code]

Sets the application’s theme. Pass in `null` or `undefined` to follow the system theme.

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`theme`?| `null` | [`Theme`](/reference/javascript/api/namespacewindow/#theme-2)  
  
#### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { setTheme } from '@tauri-apps/api/app';
    
    await setTheme('dark');
[/code]

Platform-specific

  * **iOS / Android:** Unsupported.


#### [Since](#since-10)

[Section titled “Since”](#since-10)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L219>

* * *

### [show()](#show)

[Section titled “show()”](#show)
[code] 
    function show(): Promise<void>
[/code]

Shows the application on macOS. This function does not automatically focus any specific app window.

#### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { show } from '@tauri-apps/api/app';
    
    await show();
[/code]

#### [Since](#since-11)

[Section titled “Since”](#since-11)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/app.ts#L128>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespaceapp](https://v2.tauri.app/reference/javascript/api/namespaceapp)