# tray

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [TrayIcon](#trayicon)

[Section titled “TrayIcon”](#trayicon)

Tray icon class and associated methods. This type constructor is private, instead, you should use the static method [`TrayIcon.new`](/reference/javascript/api/namespacetray/#new).

#### [Warning](#warning)

[Section titled “Warning”](#warning)

Unlike Rust, javascript does not have any way to run cleanup code when an object is being removed by garbage collection, but this tray icon will be cleaned up when the tauri app exists, however if you want to cleanup this object early, you need to call [`TrayIcon.close`](/reference/javascript/api/namespacecore/#close).

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { TrayIcon } from '@tauri-apps/api/tray';
    
    const tray = await TrayIcon.new({ tooltip: 'awesome tray tooltip' });
    
    tray.set_tooltip('new tooltip');
[/code]

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * [`Resource`](/reference/javascript/api/namespacecore/#resource)


#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Modifier| Type| Description| Defined in  
---|---|---|---|---  
`id`| `public`| `string`| The id associated with this tray icon.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L160>  
  
#### [Accessors](#accessors)

[Section titled “Accessors”](#accessors)

##### [rid](#rid)

[Section titled “rid”](#rid)
[code] 
    get rid(): number
[/code]

###### [Returns](#returns)

[Section titled “Returns”](#returns)

`number`

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

[`Resource`](/reference/javascript/api/namespacecore/#resource).[`rid`](/reference/javascript/api/namespacecore/#rid)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L318>

#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Destroys and cleans up this resource from memory. **You should not call any method on this object anymore and should drop any reference to it.**

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Inherited from](#inherited-from-1)

[Section titled “Inherited from”](#inherited-from-1)

[`Resource`](/reference/javascript/api/namespacecore/#resource).[`close`](/reference/javascript/api/namespacecore/#close)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L330>

##### [setIcon()](#seticon)

[Section titled “setIcon()”](#seticon)
[code] 
    setIcon(icon): Promise<void>
[/code]

Sets a new tray icon. If `null` is provided, it will remove the icon.

Note that you may need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file:
[code] 
    [dependencies]
    
    tauri = { version = "...", features = ["...", "image-png"] }
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`icon`| | `null` | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)  
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L224>

##### [setIconAsTemplate()](#seticonastemplate)

[Section titled “setIconAsTemplate()”](#seticonastemplate)
[code] 
    setIconAsTemplate(asTemplate): Promise<void>
[/code]

Sets the current icon as a [template](https://developer.apple.com/documentation/appkit/nsimage/1520017-template?language=objc). **macOS only**

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`asTemplate`| `boolean`  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L292>

##### [setMenu()](#setmenu)

[Section titled “setMenu()”](#setmenu)
[code] 
    setMenu(menu): Promise<void>
[/code]

Sets a new tray menu.

Platform-specific:

  * **Linux** : once a menu is set it cannot be removed so `null` has no effect


###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`menu`| `null` | [`Submenu`](/reference/javascript/api/namespacemenu/#submenu) | [`Menu`](/reference/javascript/api/namespacemenu/#menu)  
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L241>

##### [~~setMenuOnLeftClick()~~](#setmenuonleftclick)

[ Section titled “setMenuOnLeftClick()”](#setmenuonleftclick)
[code] 
    setMenuOnLeftClick(onLeft): Promise<void>
[/code]

Disable or enable showing the tray menu on left click.

Platform-specific:

  * **Linux** : Unsupported.


###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`onLeft`| `boolean`  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Deprecated](#deprecated)

[Section titled “Deprecated”](#deprecated)

use [`TrayIcon.setShowMenuOnLeftClick`](/reference/javascript/api/namespacetray/#setshowmenuonleftclick) instead.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L308>

##### [setShowMenuOnLeftClick()](#setshowmenuonleftclick)

[Section titled “setShowMenuOnLeftClick()”](#setshowmenuonleftclick)
[code] 
    setShowMenuOnLeftClick(onLeft): Promise<void>
[/code]

Disable or enable showing the tray menu on left click.

Platform-specific:

  * **Linux** : Unsupported.


###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`onLeft`| `boolean`  
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since)

[Section titled “Since”](#since)

2.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L324>

##### [setTempDirPath()](#settempdirpath)

[Section titled “setTempDirPath()”](#settempdirpath)
[code] 
    setTempDirPath(path): Promise<void>
[/code]

Sets the tray icon temp dir path. **Linux only**.

On Linux, we need to write the icon to the disk and usually it will be `$XDG_RUNTIME_DIR/tray-icon` or `$TEMP/tray-icon`.

###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`path`| `null` | `string`  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L287>

##### [setTitle()](#settitle)

[Section titled “setTitle()”](#settitle)
[code] 
    setTitle(title): Promise<void>
[/code]

Sets the tooltip for this tray icon.

Platform-specific:

  * **Linux:** The title will not be shown unless there is an icon as well. The title is useful for numerical and other frequently updated information. In general, it shouldn’t be shown unless a user requests it as it can take up a significant amount of space on the user’s panel. This may not be shown in all visualizations.
  * **Windows:** Unsupported


###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`title`| `null` | `string`  
  
###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L272>

##### [setTooltip()](#settooltip)

[Section titled “setTooltip()”](#settooltip)
[code] 
    setTooltip(tooltip): Promise<void>
[/code]

Sets the tooltip for this tray icon.

Platform-specific:

  * **Linux:** Unsupported


###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`tooltip`| `null` | `string`  
  
###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L256>

##### [setVisible()](#setvisible)

[Section titled “setVisible()”](#setvisible)
[code] 
    setVisible(visible): Promise<void>
[/code]

Show or hide this tray icon.

###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`visible`| `boolean`  
  
###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L277>

##### [getById()](#getbyid)

[Section titled “getById()”](#getbyid)
[code] 
    static getById(id): Promise<null | TrayIcon>
[/code]

Gets a tray icon using the provided id.

###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`id`| `string`  
  
###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`TrayIcon`](/reference/javascript/api/namespacetray/#trayicon)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L168>

##### [new()](#new)

[Section titled “new()”](#new)
[code] 
    static new(options?): Promise<TrayIcon>
[/code]

Creates a new [`TrayIcon`](/reference/javascript/api/namespacetray/#trayicon)

Platform-specific:

  * **Linux:** Sometimes the icon won’t be visible unless a menu is set. Setting an empty [`Menu`](/reference/javascript/api/namespacemenu/#menu) is enough.


###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`options`?| [`TrayIconOptions`](/reference/javascript/api/namespacetray/#trayiconoptions)  
  
###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`TrayIcon`](/reference/javascript/api/namespacetray/#trayicon)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L192>

##### [removeById()](#removebyid)

[Section titled “removeById()”](#removebyid)
[code] 
    static removeById(id): Promise<void>
[/code]

Removes a tray icon using the provided id from tauri’s internal state.

Note that this may cause the tray icon to disappear if it wasn’t cloned somewhere else or referenced by JS.

###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type  
---|---  
`id`| `string`  
  
###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L180>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [TrayIconOptions](#trayiconoptions)

[Section titled “TrayIconOptions”](#trayiconoptions)

[`TrayIcon`](/reference/javascript/api/namespacetray/#new) creation options

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`action?`| (`event`: [`TrayIconEvent`](/reference/javascript/api/namespacetray/#trayiconevent)) => `void`| A handler for an event on the tray icon.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L137>  
`icon?`| | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)| The tray icon which could be icon bytes or path to the icon file. Note that you may need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file: `[dependencies] tauri = { version = "...", features = ["...", "image-png"] }`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L89>  
`iconAsTemplate?`| `boolean`| Use the icon as a [template](https://developer.apple.com/documentation/appkit/nsimage/1520017-template?language=objc). **macOS only**.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L115>  
`id?`| `string`| The tray icon id. If undefined, a random one will be assigned| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L76>  
`menu?`| [`Submenu`](/reference/javascript/api/namespacemenu/#submenu) | [`Menu`](/reference/javascript/api/namespacemenu/#menu)| The tray icon menu| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L78>  
~~`menuOnLeftClick?`~~| `boolean`| Whether to show the tray menu on left click or not, default is `true`. Platform-specific: - **Linux** : Unsupported. **Deprecated** use [`TrayIconOptions.showMenuOnLeftClick`](/reference/javascript/api/namespacetray/#showmenuonleftclick) instead.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L125>  
`showMenuOnLeftClick?`| `boolean`| Whether to show the tray menu on left click or not, default is `true`. Platform-specific: - **Linux** : Unsupported. **Since** 2.2.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L135>  
`tempDirPath?`| `string`| The tray icon temp dir path. **Linux only**. On Linux, we need to write the icon to the disk and usually it will be `$XDG_RUNTIME_DIR/tray-icon` or `$TEMP/tray-icon`.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L111>  
`title?`| `string`| The tray title Platform-specific - **Linux:** The title will not be shown unless there is an icon as well. The title is useful for numerical and other frequently updated information. In general, it shouldn’t be shown unless a user requests it as it can take up a significant amount of space on the user’s panel. This may not be shown in all visualizations. - **Windows:** Unsupported.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L104>  
`tooltip?`| `string`| The tray icon tooltip| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L91>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [MouseButton](#mousebutton)

[Section titled “MouseButton”](#mousebutton)
[code] 
    type MouseButton: "Left" | "Right" | "Middle";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L11>

* * *

### [MouseButtonState](#mousebuttonstate)

[Section titled “MouseButtonState”](#mousebuttonstate)
[code] 
    type MouseButtonState: "Up" | "Down";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L10>

* * *

### [TrayIconClickEvent](#trayiconclickevent)

[Section titled “TrayIconClickEvent”](#trayiconclickevent)
[code] 
    type TrayIconClickEvent: object;
[/code]

#### [Type declaration](#type-declaration)

[Section titled “Type declaration”](#type-declaration)

Name| Type| Description| Defined in  
---|---|---|---  
`button`| [`MouseButton`](/reference/javascript/api/namespacetray/#mousebutton)| Mouse button that triggered this event.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L35>  
`buttonState`| [`MouseButtonState`](/reference/javascript/api/namespacetray/#mousebuttonstate)| Mouse button state when this event was triggered.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L37>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L33>

* * *

### [TrayIconEvent](#trayiconevent)

[Section titled “TrayIconEvent”](#trayiconevent)
[code] 
    type TrayIconEvent:
    
      | TrayIconEventBase<"Click"> & TrayIconClickEvent
    
      | TrayIconEventBase<"DoubleClick"> & Omit<TrayIconClickEvent, "buttonState">
    
      | TrayIconEventBase<"Enter">
    
      | TrayIconEventBase<"Move">
    
    | TrayIconEventBase<"Leave">;
[/code]

Describes a tray icon event.

Platform-specific:

  * **Linux** : Unsupported. The event is not emitted even though the icon is shown, the icon will still show a context menu on right click.


**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L48>

* * *

### [TrayIconEventBase<T>](#trayiconeventbaset)

[Section titled “TrayIconEventBase<T>”](#trayiconeventbaset)
[code] 
    type TrayIconEventBase<T>: object;
[/code]

#### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T` _extends_ [`TrayIconEventType`](/reference/javascript/api/namespacetray/#trayiconeventtype)  
  
#### [Type declaration](#type-declaration-1)

[Section titled “Type declaration”](#type-declaration-1)

Name| Type| Description| Defined in  
---|---|---|---  
`id`| `string`| Id of the tray icon which triggered this event.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L23>  
`position`| [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)| Physical position of the click the triggered this event.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L25>  
`rect`| `object`| Position and size of the tray icon.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L27>  
`rect.position`| [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)| -| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L28>  
`rect.size`| [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)| -| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L29>  
`type`| `T`| The tray icon event type| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L21>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L19>

* * *

### [TrayIconEventType](#trayiconeventtype)

[Section titled “TrayIconEventType”](#trayiconeventtype)
[code] 
    type TrayIconEventType:
    
      | "Click"
    
      | "DoubleClick"
    
      | "Enter"
    
      | "Move"
    
      | "Leave";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/tray.ts#L12>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacetray](https://v2.tauri.app/reference/javascript/api/namespacetray)