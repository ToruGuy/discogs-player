# webviewWindow

## [References](#references)

[Section titled “References”](#references)

### [Color](#color)

[Section titled “Color”](#color)

Re-exports [Color](/reference/javascript/api/namespacewebview/#color)

### [DragDropEvent](#dragdropevent)

[Section titled “DragDropEvent”](#dragdropevent)

Re-exports [DragDropEvent](/reference/javascript/api/namespacewebview/#dragdropevent)

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [WebviewWindow](#webviewwindow)

[Section titled “WebviewWindow”](#webviewwindow)

Create new webview or get a handle to an existing one.

Webviews are identified by a _label_ a unique identifier that can be used to reference it later. It may only contain alphanumeric characters `a-zA-Z` plus the following special characters `-`, `/`, `:` and `_`.

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { Window } from "@tauri-apps/api/window"
    
    import { Webview } from "@tauri-apps/api/webview"
    
    
    
    
    const appWindow = new Window('uniqueLabel');
    
    
    
    
    appWindow.once('tauri://created', async function () {
    
      // `new Webview` Should be called after the window is successfully created,
    
      // or webview may not be attached to the window since window is not created yet.
    
    
    
    
      // loading embedded asset:
    
      const webview = new Webview(appWindow, 'theUniqueLabel', {
    
        url: 'path/to/page.html',
    
    
    
    
        // create a webview with specific logical position and size
    
        x: 0,
    
        y: 0,
    
        width: 800,
    
        height: 600,
    
      });
    
      // alternatively, load a remote URL:
    
      const webview = new Webview(appWindow, 'theUniqueLabel', {
    
        url: 'https://github.com/tauri-apps/tauri',
    
    
    
    
        // create a webview with specific logical position and size
    
        x: 0,
    
        y: 0,
    
        width: 800,
    
        height: 600,
    
      });
    
    
    
    
      webview.once('tauri://created', function () {
    
        // webview successfully created
    
      });
    
      webview.once('tauri://error', function (e) {
    
        // an error happened creating the webview
    
      });
    
    
    
    
      // emit an event to the backend
    
      await webview.emit("some-event", "data");
    
      // listen to an event from the backend
    
      const unlisten = await webview.listen("event-name", e => { });
    
      unlisten();
    
    });
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * [`Webview`](/reference/javascript/api/namespacewebview/#webview).[`Window`](/reference/javascript/api/namespacewindow/#window)


#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new WebviewWindow()](#new-webviewwindow)

[Section titled “new WebviewWindow()”](#new-webviewwindow)
[code] 
    new WebviewWindow(label, options): WebviewWindow
[/code]

Creates a new [Window](/reference/javascript/api/namespacewindow/#window) hosting a [Webview](/reference/javascript/api/namespacewebview/#webview).

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`label`| `string`| The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.  
`options`| [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)<[`WebviewOptions`](/reference/javascript/api/namespacewebview/#webviewoptions), `"x"` | `"y"` | `"width"` | `"height"`> & [`WindowOptions`](/reference/javascript/api/namespacewindow/#windowoptions)| -  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)

The [WebviewWindow](/reference/javascript/api/namespacewebviewwindow/#webviewwindow) instance to communicate with the window and webview.

###### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
    
    const webview = new WebviewWindow('my-label', {
    
      url: 'https://github.com/tauri-apps/tauri'
    
    });
    
    webview.once('tauri://created', function () {
    
     // webview successfully created
    
    });
    
    webview.once('tauri://error', function (e) {
    
     // an error happened creating the webview
    
    });
[/code]

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`constructor`](/reference/javascript/api/namespacewindow/#constructors-1)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L75>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Inherited from| Defined in  
---|---|---|---|---  
`label`| `string`| The webview label. It is a unique identifier for the webview, can be used to reference it later.| [`Window`](/reference/javascript/api/namespacewindow/#window).[`label`](/reference/javascript/api/namespacewindow/#label)| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L51>  
`listeners`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`any`>[]>| Local event listeners.| [`Window`](/reference/javascript/api/namespacewindow/#window).[`listeners`](/reference/javascript/api/namespacewindow/#listeners)| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L54>  
`window`| [`Window`](/reference/javascript/api/namespacewindow/#window)| The window hosting this webview.| [`Webview`](/reference/javascript/api/namespacewebview/#webview).[`window`](/reference/javascript/api/namespacewebview/#window)| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L157>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [center()](#center)

[Section titled “center()”](#center)
[code] 
    center(): Promise<void>
[/code]

Centers the window.

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().center();
[/code]

###### [Inherited from](#inherited-from-1)

[Section titled “Inherited from”](#inherited-from-1)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`center`](/reference/javascript/api/namespacewindow/#center)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L835>

##### [clearAllBrowsingData()](#clearallbrowsingdata)

[Section titled “clearAllBrowsingData()”](#clearallbrowsingdata)
[code] 
    clearAllBrowsingData(): Promise<void>
[/code]

Clears all browsing data for this webview.

###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().clearAllBrowsingData();
[/code]

###### [Inherited from](#inherited-from-2)

[Section titled “Inherited from”](#inherited-from-2)

[`Webview`](/reference/javascript/api/namespacewebview/#webview).[`clearAllBrowsingData`](/reference/javascript/api/namespacewebview/#clearallbrowsingdata)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L589>

##### [clearEffects()](#cleareffects)

[Section titled “clearEffects()”](#cleareffects)
[code] 
    clearEffects(): Promise<void>
[/code]

Clear any applied effects if possible.

###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Inherited from](#inherited-from-3)

[Section titled “Inherited from”](#inherited-from-3)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`clearEffects`](/reference/javascript/api/namespacewindow/#cleareffects)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1223>

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Closes the webview.

###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().close();
[/code]

###### [Inherited from](#inherited-from-4)

[Section titled “Inherited from”](#inherited-from-4)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`close`](/reference/javascript/api/namespacewindow/#close)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L436>

##### [destroy()](#destroy)

[Section titled “destroy()”](#destroy)
[code] 
    destroy(): Promise<void>
[/code]

Destroys the window. Behaves like [Window.close](/reference/javascript/api/namespacewindow/#close) but forces the window close instead of emitting a closeRequested event.

###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().destroy();
[/code]

###### [Inherited from](#inherited-from-5)

[Section titled “Inherited from”](#inherited-from-5)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`destroy`](/reference/javascript/api/namespacewindow/#destroy)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1160>

##### [emit()](#emit)

[Section titled “emit()”](#emit)
[code] 
    emit<T>(event, payload?): Promise<void>
[/code]

Emits an event to all [targets](/reference/javascript/api/namespaceevent/#eventtarget).

###### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`event`| `string`| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`payload`?| `T`| Event payload.  
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().emit('webview-loaded', { loggedIn: true, token: 'authToken' });
[/code]

###### [Inherited from](#inherited-from-6)

[Section titled “Inherited from”](#inherited-from-6)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`emit`](/reference/javascript/api/namespacewindow/#emit)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L325>

##### [emitTo()](#emitto)

[Section titled “emitTo()”](#emitto)
[code] 
    emitTo<T>(
    
       target,
    
       event,
    
    payload?): Promise<void>
[/code]

Emits an event to all [targets](/reference/javascript/api/namespaceevent/#eventtarget) matching the given target.

###### [Type Parameters](#type-parameters-1)

[Section titled “Type Parameters”](#type-parameters-1)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`target`| `string` | [`EventTarget`](/reference/javascript/api/namespaceevent/#eventtarget)| Label of the target Window/Webview/WebviewWindow or raw [EventTarget](/reference/javascript/api/namespaceevent/#eventtarget) object.  
`event`| `string`| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`payload`?| `T`| Event payload.  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().emitTo('main', 'webview-loaded', { loggedIn: true, token: 'authToken' });
[/code]

###### [Inherited from](#inherited-from-7)

[Section titled “Inherited from”](#inherited-from-7)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`emitTo`](/reference/javascript/api/namespacewindow/#emitto)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L353>

##### [hide()](#hide)

[Section titled “hide()”](#hide)
[code] 
    hide(): Promise<void>
[/code]

Hide the webview.

###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-8)

[Section titled “Example”](#example-8)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().hide();
[/code]

###### [Inherited from](#inherited-from-8)

[Section titled “Inherited from”](#inherited-from-8)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`hide`](/reference/javascript/api/namespacewindow/#hide)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L523>

##### [innerPosition()](#innerposition)

[Section titled “innerPosition()”](#innerposition)
[code] 
    innerPosition(): Promise<PhysicalPosition>
[/code]

The position of the top-left hand corner of the window’s client area relative to the top-left hand corner of the desktop.

###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

The window’s inner position.

###### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const position = await getCurrentWindow().innerPosition();
[/code]

###### [Inherited from](#inherited-from-9)

[Section titled “Inherited from”](#inherited-from-9)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`innerPosition`](/reference/javascript/api/namespacewindow/#innerposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L537>

##### [innerSize()](#innersize)

[Section titled “innerSize()”](#innersize)
[code] 
    innerSize(): Promise<PhysicalSize>
[/code]

The physical size of the window’s client area. The client area is the content of the window, excluding the title bar and borders.

###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>

The window’s inner size.

###### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const size = await getCurrentWindow().innerSize();
[/code]

###### [Inherited from](#inherited-from-10)

[Section titled “Inherited from”](#inherited-from-10)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`innerSize`](/reference/javascript/api/namespacewindow/#innersize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L570>

##### [isAlwaysOnTop()](#isalwaysontop)

[Section titled “isAlwaysOnTop()”](#isalwaysontop)
[code] 
    isAlwaysOnTop(): Promise<boolean>
[/code]

Whether the window is configured to be always on top of other windows or not.

###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is visible or not.

###### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const alwaysOnTop = await getCurrentWindow().isAlwaysOnTop();
[/code]

###### [Inherited from](#inherited-from-11)

[Section titled “Inherited from”](#inherited-from-11)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isAlwaysOnTop`](/reference/javascript/api/namespacewindow/#isalwaysontop)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L817>

##### [isClosable()](#isclosable)

[Section titled “isClosable()”](#isclosable)
[code] 
    isClosable(): Promise<boolean>
[/code]

Gets the window’s native close button state.

Platform-specific

  * **iOS / Android:** Unsupported.


###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window’s native close button is enabled or not.

###### [Example](#example-12)

[Section titled “Example”](#example-12)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const closable = await getCurrentWindow().isClosable();
[/code]

###### [Inherited from](#inherited-from-12)

[Section titled “Inherited from”](#inherited-from-12)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isClosable`](/reference/javascript/api/namespacewindow/#isclosable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L750>

##### [isDecorated()](#isdecorated)

[Section titled “isDecorated()”](#isdecorated)
[code] 
    isDecorated(): Promise<boolean>
[/code]

Gets the window’s current decorated state.

###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is decorated or not.

###### [Example](#example-13)

[Section titled “Example”](#example-13)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const decorated = await getCurrentWindow().isDecorated();
[/code]

###### [Inherited from](#inherited-from-13)

[Section titled “Inherited from”](#inherited-from-13)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isDecorated`](/reference/javascript/api/namespacewindow/#isdecorated)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L671>

##### [isEnabled()](#isenabled)

[Section titled “isEnabled()”](#isenabled)
[code] 
    isEnabled(): Promise<boolean>
[/code]

Whether the window is enabled or disabled.

###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

A promise indicating the success or failure of the operation.

###### [Example](#example-14)

[Section titled “Example”](#example-14)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setEnabled(false);
[/code]

###### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

###### [Inherited from](#inherited-from-14)

[Section titled “Inherited from”](#inherited-from-14)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isEnabled`](/reference/javascript/api/namespacewindow/#isenabled)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L927>

##### [isFocused()](#isfocused)

[Section titled “isFocused()”](#isfocused)
[code] 
    isFocused(): Promise<boolean>
[/code]

Gets the window’s current focus state.

###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is focused or not.

###### [Example](#example-15)

[Section titled “Example”](#example-15)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const focused = await getCurrentWindow().isFocused();
[/code]

###### [Inherited from](#inherited-from-15)

[Section titled “Inherited from”](#inherited-from-15)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isFocused`](/reference/javascript/api/namespacewindow/#isfocused)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L655>

##### [isFullscreen()](#isfullscreen)

[Section titled “isFullscreen()”](#isfullscreen)
[code] 
    isFullscreen(): Promise<boolean>
[/code]

Gets the window’s current fullscreen state.

###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is in fullscreen mode or not.

###### [Example](#example-16)

[Section titled “Example”](#example-16)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const fullscreen = await getCurrentWindow().isFullscreen();
[/code]

###### [Inherited from](#inherited-from-16)

[Section titled “Inherited from”](#inherited-from-16)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isFullscreen`](/reference/javascript/api/namespacewindow/#isfullscreen)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L609>

##### [isMaximizable()](#ismaximizable)

[Section titled “isMaximizable()”](#ismaximizable)
[code] 
    isMaximizable(): Promise<boolean>
[/code]

Gets the window’s native maximize button state.

Platform-specific

  * **Linux / iOS / Android:** Unsupported.


###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window’s native maximize button is enabled or not.

###### [Example](#example-17)

[Section titled “Example”](#example-17)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const maximizable = await getCurrentWindow().isMaximizable();
[/code]

###### [Inherited from](#inherited-from-17)

[Section titled “Inherited from”](#inherited-from-17)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isMaximizable`](/reference/javascript/api/namespacewindow/#ismaximizable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L708>

##### [isMaximized()](#ismaximized)

[Section titled “isMaximized()”](#ismaximized)
[code] 
    isMaximized(): Promise<boolean>
[/code]

Gets the window’s current maximized state.

###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is maximized or not.

###### [Example](#example-18)

[Section titled “Example”](#example-18)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const maximized = await getCurrentWindow().isMaximized();
[/code]

###### [Inherited from](#inherited-from-18)

[Section titled “Inherited from”](#inherited-from-18)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isMaximized`](/reference/javascript/api/namespacewindow/#ismaximized)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L639>

##### [isMinimizable()](#isminimizable)

[Section titled “isMinimizable()”](#isminimizable)
[code] 
    isMinimizable(): Promise<boolean>
[/code]

Gets the window’s native minimize button state.

Platform-specific

  * **Linux / iOS / Android:** Unsupported.


###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window’s native minimize button is enabled or not.

###### [Example](#example-19)

[Section titled “Example”](#example-19)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const minimizable = await getCurrentWindow().isMinimizable();
[/code]

###### [Inherited from](#inherited-from-19)

[Section titled “Inherited from”](#inherited-from-19)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isMinimizable`](/reference/javascript/api/namespacewindow/#isminimizable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L729>

##### [isMinimized()](#isminimized)

[Section titled “isMinimized()”](#isminimized)
[code] 
    isMinimized(): Promise<boolean>
[/code]

Gets the window’s current minimized state.

###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Example](#example-20)

[Section titled “Example”](#example-20)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const minimized = await getCurrentWindow().isMinimized();
[/code]

###### [Inherited from](#inherited-from-20)

[Section titled “Inherited from”](#inherited-from-20)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isMinimized`](/reference/javascript/api/namespacewindow/#isminimized)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L623>

##### [isResizable()](#isresizable)

[Section titled “isResizable()”](#isresizable)
[code] 
    isResizable(): Promise<boolean>
[/code]

Gets the window’s current resizable state.

###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is resizable or not.

###### [Example](#example-21)

[Section titled “Example”](#example-21)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const resizable = await getCurrentWindow().isResizable();
[/code]

###### [Inherited from](#inherited-from-21)

[Section titled “Inherited from”](#inherited-from-21)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isResizable`](/reference/javascript/api/namespacewindow/#isresizable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L687>

##### [isVisible()](#isvisible)

[Section titled “isVisible()”](#isvisible)
[code] 
    isVisible(): Promise<boolean>
[/code]

Gets the window’s current visible state.

###### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is visible or not.

###### [Example](#example-22)

[Section titled “Example”](#example-22)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const visible = await getCurrentWindow().isVisible();
[/code]

###### [Inherited from](#inherited-from-22)

[Section titled “Inherited from”](#inherited-from-22)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`isVisible`](/reference/javascript/api/namespacewindow/#isvisible)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L766>

##### [listen()](#listen)

[Section titled “listen()”](#listen)
[code] 
    listen<T>(event, handler): Promise<UnlistenFn>
[/code]

Listen to an emitted event on this webview window.

###### [Type Parameters](#type-parameters-2)

[Section titled “Type Parameters”](#type-parameters-2)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler.  
  
###### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-23)

[Section titled “Example”](#example-23)
[code] 
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    
    const unlisten = await WebviewWindow.getCurrent().listen<string>('state-changed', (event) => {
    
      console.log(`Got error: ${payload}`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-23)

[Section titled “Inherited from”](#inherited-from-23)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`listen`](/reference/javascript/api/namespacewindow/#listen)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L155>

##### [maximize()](#maximize)

[Section titled “maximize()”](#maximize)
[code] 
    maximize(): Promise<void>
[/code]

Maximizes the window.

###### [Returns](#returns-24)

[Section titled “Returns”](#returns-24)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-24)

[Section titled “Example”](#example-24)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().maximize();
[/code]

###### [Inherited from](#inherited-from-24)

[Section titled “Inherited from”](#inherited-from-24)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`maximize`](/reference/javascript/api/namespacewindow/#maximize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1030>

##### [minimize()](#minimize)

[Section titled “minimize()”](#minimize)
[code] 
    minimize(): Promise<void>
[/code]

Minimizes the window.

###### [Returns](#returns-25)

[Section titled “Returns”](#returns-25)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-25)

[Section titled “Example”](#example-25)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().minimize();
[/code]

###### [Inherited from](#inherited-from-25)

[Section titled “Inherited from”](#inherited-from-25)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`minimize`](/reference/javascript/api/namespacewindow/#minimize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1078>

##### [onCloseRequested()](#oncloserequested)

[Section titled “onCloseRequested()”](#oncloserequested)
[code] 
    onCloseRequested(handler): Promise<UnlistenFn>
[/code]

Listen to window close requested. Emitted when the user requests to closes the window.

###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`handler`| (`event`) => `void` | [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>  
  
###### [Returns](#returns-26)

[Section titled “Returns”](#returns-26)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-26)

[Section titled “Example”](#example-26)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    import { confirm } from '@tauri-apps/api/dialog';
    
    const unlisten = await getCurrentWindow().onCloseRequested(async (event) => {
    
      const confirmed = await confirm('Are you sure?');
    
      if (!confirmed) {
    
        // user did not confirm closing the window; let's prevent it
    
        event.preventDefault();
    
      }
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-26)

[Section titled “Inherited from”](#inherited-from-26)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onCloseRequested`](/reference/javascript/api/namespacewindow/#oncloserequested)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1885>

##### [onDragDropEvent()](#ondragdropevent)

[Section titled “onDragDropEvent()”](#ondragdropevent)
[code] 
    onDragDropEvent(handler): Promise<UnlistenFn>
[/code]

Listen to a file drop event. The listener is triggered when the user hovers the selected files on the webview, drops the files or cancels the operation.

###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`DragDropEvent`](/reference/javascript/api/namespacewebview/#dragdropevent)>  
  
###### [Returns](#returns-27)

[Section titled “Returns”](#returns-27)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-27)

[Section titled “Example”](#example-27)
[code] 
    import { getCurrentWebview } from "@tauri-apps/api/webview";
    
    const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
    
     if (event.payload.type === 'over') {
    
       console.log('User hovering', event.payload.position);
    
     } else if (event.payload.type === 'drop') {
    
       console.log('User dropped', event.payload.paths);
    
     } else {
    
       console.log('File drop cancelled');
    
     }
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

When the debugger panel is open, the drop position of this event may be inaccurate due to a known limitation. To retrieve the correct drop position, please detach the debugger.

###### [Inherited from](#inherited-from-27)

[Section titled “Inherited from”](#inherited-from-27)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onDragDropEvent`](/reference/javascript/api/namespacewindow/#ondragdropevent)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L641>

##### [onFocusChanged()](#onfocuschanged)

[Section titled “onFocusChanged()”](#onfocuschanged)
[code] 
    onFocusChanged(handler): Promise<UnlistenFn>
[/code]

Listen to window focus change.

###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`boolean`>  
  
###### [Returns](#returns-28)

[Section titled “Returns”](#returns-28)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-28)

[Section titled “Example”](#example-28)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
    
     console.log('Focus changed, window is focused? ' + focused);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-28)

[Section titled “Inherited from”](#inherited-from-28)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onFocusChanged`](/reference/javascript/api/namespacewindow/#onfocuschanged)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2001>

##### [onMoved()](#onmoved)

[Section titled “onMoved()”](#onmoved)
[code] 
    onMoved(handler): Promise<UnlistenFn>
[/code]

Listen to window move.

###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>  
  
###### [Returns](#returns-29)

[Section titled “Returns”](#returns-29)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-29)

[Section titled “Example”](#example-29)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onMoved(({ payload: position }) => {
    
     console.log('Window moved', position);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-29)

[Section titled “Inherited from”](#inherited-from-29)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onMoved`](/reference/javascript/api/namespacewindow/#onmoved)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1856>

##### [onResized()](#onresized)

[Section titled “onResized()”](#onresized)
[code] 
    onResized(handler): Promise<UnlistenFn>
[/code]

Listen to window resize.

###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>  
  
###### [Returns](#returns-30)

[Section titled “Returns”](#returns-30)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-30)

[Section titled “Example”](#example-30)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onResized(({ payload: size }) => {
    
     console.log('Window resized', size);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-30)

[Section titled “Inherited from”](#inherited-from-30)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onResized`](/reference/javascript/api/namespacewindow/#onresized)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1832>

##### [onScaleChanged()](#onscalechanged)

[Section titled “onScaleChanged()”](#onscalechanged)
[code] 
    onScaleChanged(handler): Promise<UnlistenFn>
[/code]

Listen to window scale change. Emitted when the window’s scale factor has changed. The following user actions can cause DPI changes:

  * Changing the display’s resolution.
  * Changing the display’s scale factor (e.g. in Control Panel on Windows).
  * Moving the window to a display with a different scale factor.


###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`ScaleFactorChanged`](/reference/javascript/api/namespacewindow/#scalefactorchanged)>  
  
###### [Returns](#returns-31)

[Section titled “Returns”](#returns-31)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-31)

[Section titled “Example”](#example-31)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onScaleChanged(({ payload }) => {
    
     console.log('Scale changed', payload.scaleFactor, payload.size);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-31)

[Section titled “Inherited from”](#inherited-from-31)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onScaleChanged`](/reference/javascript/api/namespacewindow/#onscalechanged)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2041>

##### [onThemeChanged()](#onthemechanged)

[Section titled “onThemeChanged()”](#onthemechanged)
[code] 
    onThemeChanged(handler): Promise<UnlistenFn>
[/code]

Listen to the system theme change.

###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`Theme`](/reference/javascript/api/namespacewindow/#theme-2)>  
  
###### [Returns](#returns-32)

[Section titled “Returns”](#returns-32)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-32)

[Section titled “Example”](#example-32)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
    
     console.log('New theme: ' + theme);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-32)

[Section titled “Inherited from”](#inherited-from-32)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`onThemeChanged`](/reference/javascript/api/namespacewindow/#onthemechanged)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2067>

##### [once()](#once)

[Section titled “once()”](#once)
[code] 
    once<T>(event, handler): Promise<UnlistenFn>
[/code]

Listen to an emitted event on this webview window only once.

###### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler.  
  
###### [Returns](#returns-33)

[Section titled “Returns”](#returns-33)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-33)

[Section titled “Example”](#example-33)
[code] 
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    
    const unlisten = await WebviewWindow.getCurrent().once<null>('initialized', (event) => {
    
      console.log(`Webview initialized!`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

###### [Inherited from](#inherited-from-33)

[Section titled “Inherited from”](#inherited-from-33)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`once`](/reference/javascript/api/namespacewindow/#once)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L190>

##### [outerPosition()](#outerposition)

[Section titled “outerPosition()”](#outerposition)
[code] 
    outerPosition(): Promise<PhysicalPosition>
[/code]

The position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.

###### [Returns](#returns-34)

[Section titled “Returns”](#returns-34)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

The window’s outer position.

###### [Example](#example-34)

[Section titled “Example”](#example-34)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const position = await getCurrentWindow().outerPosition();
[/code]

###### [Inherited from](#inherited-from-34)

[Section titled “Inherited from”](#inherited-from-34)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`outerPosition`](/reference/javascript/api/namespacewindow/#outerposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L553>

##### [outerSize()](#outersize)

[Section titled “outerSize()”](#outersize)
[code] 
    outerSize(): Promise<PhysicalSize>
[/code]

The physical size of the entire window. These dimensions include the title bar and borders. If you don’t want that (and you usually don’t), use inner_size instead.

###### [Returns](#returns-35)

[Section titled “Returns”](#returns-35)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>

The window’s outer size.

###### [Example](#example-35)

[Section titled “Example”](#example-35)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const size = await getCurrentWindow().outerSize();
[/code]

###### [Inherited from](#inherited-from-35)

[Section titled “Inherited from”](#inherited-from-35)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`outerSize`](/reference/javascript/api/namespacewindow/#outersize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L590>

##### [position()](#position)

[Section titled “position()”](#position)
[code] 
    position(): Promise<PhysicalPosition>
[/code]

The position of the top-left hand corner of the webview’s client area relative to the top-left hand corner of the desktop.

###### [Returns](#returns-36)

[Section titled “Returns”](#returns-36)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

The webview’s position.

###### [Example](#example-36)

[Section titled “Example”](#example-36)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    const position = await getCurrentWebview().position();
[/code]

###### [Inherited from](#inherited-from-36)

[Section titled “Inherited from”](#inherited-from-36)

[`Webview`](/reference/javascript/api/namespacewebview/#webview).[`position`](/reference/javascript/api/namespacewebview/#position)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L398>

##### [reparent()](#reparent)

[Section titled “reparent()”](#reparent)
[code] 
    reparent(window): Promise<void>
[/code]

Moves this webview to the given label.

###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type  
---|---  
`window`| `string` | [`Window`](/reference/javascript/api/namespacewindow/#window) | [`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)  
  
###### [Returns](#returns-37)

[Section titled “Returns”](#returns-37)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-37)

[Section titled “Example”](#example-37)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().reparent('other-window');
[/code]

###### [Inherited from](#inherited-from-37)

[Section titled “Inherited from”](#inherited-from-37)

[`Webview`](/reference/javascript/api/namespacewebview/#webview).[`reparent`](/reference/javascript/api/namespacewebview/#reparent)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L572>

##### [requestUserAttention()](#requestuserattention)

[Section titled “requestUserAttention()”](#requestuserattention)
[code] 
    requestUserAttention(requestType): Promise<void>
[/code]

Requests user attention to the window, this has no effect if the application is already focused. How requesting for user attention manifests is platform dependent, see `UserAttentionType` for details.

Providing `null` will unset the request for user attention. Unsetting the request for user attention might not be done automatically by the WM when the window receives input.

Platform-specific

  * **macOS:** `null` has no effect.
  * **Linux:** Urgency levels have the same effect.


###### [Parameters](#parameters-13)

[Section titled “Parameters”](#parameters-13)

Parameter| Type  
---|---  
`requestType`| `null` | [`UserAttentionType`](/reference/javascript/api/namespacewindow/#userattentiontype)  
  
###### [Returns](#returns-38)

[Section titled “Returns”](#returns-38)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-38)

[Section titled “Example”](#example-38)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().requestUserAttention();
[/code]

###### [Inherited from](#inherited-from-38)

[Section titled “Inherited from”](#inherited-from-38)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`requestUserAttention`](/reference/javascript/api/namespacewindow/#requestuserattention)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L861>

##### [scaleFactor()](#scalefactor)

[Section titled “scaleFactor()”](#scalefactor)
[code] 
    scaleFactor(): Promise<number>
[/code]

The scale factor that can be used to map physical pixels to logical pixels.

###### [Returns](#returns-39)

[Section titled “Returns”](#returns-39)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`number`>

The window’s monitor scale factor.

###### [Example](#example-39)

[Section titled “Example”](#example-39)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const factor = await getCurrentWindow().scaleFactor();
[/code]

###### [Inherited from](#inherited-from-39)

[Section titled “Inherited from”](#inherited-from-39)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`scaleFactor`](/reference/javascript/api/namespacewindow/#scalefactor)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L521>

##### [setAlwaysOnBottom()](#setalwaysonbottom)

[Section titled “setAlwaysOnBottom()”](#setalwaysonbottom)
[code] 
    setAlwaysOnBottom(alwaysOnBottom): Promise<void>
[/code]

Whether the window should always be below other windows.

###### [Parameters](#parameters-14)

[Section titled “Parameters”](#parameters-14)

Parameter| Type| Description  
---|---|---  
`alwaysOnBottom`| `boolean`| Whether the window should always be below other windows or not.  
  
###### [Returns](#returns-40)

[Section titled “Returns”](#returns-40)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-40)

[Section titled “Example”](#example-40)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setAlwaysOnBottom(true);
[/code]

###### [Inherited from](#inherited-from-40)

[Section titled “Inherited from”](#inherited-from-40)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setAlwaysOnBottom`](/reference/javascript/api/namespacewindow/#setalwaysonbottom)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1259>

##### [setAlwaysOnTop()](#setalwaysontop)

[Section titled “setAlwaysOnTop()”](#setalwaysontop)
[code] 
    setAlwaysOnTop(alwaysOnTop): Promise<void>
[/code]

Whether the window should always be on top of other windows.

###### [Parameters](#parameters-15)

[Section titled “Parameters”](#parameters-15)

Parameter| Type| Description  
---|---|---  
`alwaysOnTop`| `boolean`| Whether the window should always be on top of other windows or not.  
  
###### [Returns](#returns-41)

[Section titled “Returns”](#returns-41)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-41)

[Section titled “Example”](#example-41)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setAlwaysOnTop(true);
[/code]

###### [Inherited from](#inherited-from-41)

[Section titled “Inherited from”](#inherited-from-41)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setAlwaysOnTop`](/reference/javascript/api/namespacewindow/#setalwaysontop)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1241>

##### [setAutoResize()](#setautoresize)

[Section titled “setAutoResize()”](#setautoresize)
[code] 
    setAutoResize(autoResize): Promise<void>
[/code]

Sets whether the webview should automatically grow and shrink its size and position when the parent window resizes.

###### [Parameters](#parameters-16)

[Section titled “Parameters”](#parameters-16)

Parameter| Type  
---|---  
`autoResize`| `boolean`  
  
###### [Returns](#returns-42)

[Section titled “Returns”](#returns-42)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-42)

[Section titled “Example”](#example-42)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setAutoResize(true);
[/code]

###### [Inherited from](#inherited-from-42)

[Section titled “Inherited from”](#inherited-from-42)

[`Webview`](/reference/javascript/api/namespacewebview/#webview).[`setAutoResize`](/reference/javascript/api/namespacewebview/#setautoresize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L506>

##### [setBackgroundColor()](#setbackgroundcolor)

[Section titled “setBackgroundColor()”](#setbackgroundcolor)
[code] 
    setBackgroundColor(color): Promise<void>
[/code]

Set the window and webview background color.

Platform-specific:

  * **Android / iOS:** Unsupported for the window layer.
  * **macOS / iOS** : Not implemented for the webview layer.
  * **Windows** : 
    * alpha channel is ignored for the window layer.
    * On Windows 7, alpha channel is ignored for the webview layer.
    * On Windows 8 and newer, if alpha channel is not `0`, it will be ignored.


###### [Parameters](#parameters-17)

[Section titled “Parameters”](#parameters-17)

Parameter| Type  
---|---  
`color`| [`Color`](/reference/javascript/api/namespacewebview/#color)  
  
###### [Returns](#returns-43)

[Section titled “Returns”](#returns-43)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Since](#since-2)

[Section titled “Since”](#since-2)

2.1.0

###### [Inherited from](#inherited-from-43)

[Section titled “Inherited from”](#inherited-from-43)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setBackgroundColor`](/reference/javascript/api/namespacewindow/#setbackgroundcolor)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L222>

##### [setBadgeCount()](#setbadgecount)

[Section titled “setBadgeCount()”](#setbadgecount)
[code] 
    setBadgeCount(count?): Promise<void>
[/code]

Sets the badge count. It is app wide and not specific to this window.

Platform-specific

  * **Windows** : Unsupported. Use @{linkcode Window.setOverlayIcon} instead.


###### [Parameters](#parameters-18)

[Section titled “Parameters”](#parameters-18)

Parameter| Type| Description  
---|---|---  
`count`?| `number`| The badge count. Use `undefined` to remove the badge.  
  
###### [Returns](#returns-44)

[Section titled “Returns”](#returns-44)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-43)

[Section titled “Example”](#example-43)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setBadgeCount(5);
[/code]

###### [Inherited from](#inherited-from-44)

[Section titled “Inherited from”](#inherited-from-44)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setBadgeCount`](/reference/javascript/api/namespacewindow/#setbadgecount)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1685>

##### [setBadgeLabel()](#setbadgelabel)

[Section titled “setBadgeLabel()”](#setbadgelabel)
[code] 
    setBadgeLabel(label?): Promise<void>
[/code]

Sets the badge cont **macOS only**.

###### [Parameters](#parameters-19)

[Section titled “Parameters”](#parameters-19)

Parameter| Type| Description  
---|---|---  
`label`?| `string`| The badge label. Use `undefined` to remove the badge.  
  
###### [Returns](#returns-45)

[Section titled “Returns”](#returns-45)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-44)

[Section titled “Example”](#example-44)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setBadgeLabel("Hello");
[/code]

###### [Inherited from](#inherited-from-45)

[Section titled “Inherited from”](#inherited-from-45)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setBadgeLabel`](/reference/javascript/api/namespacewindow/#setbadgelabel)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1704>

##### [setClosable()](#setclosable)

[Section titled “setClosable()”](#setclosable)
[code] 
    setClosable(closable): Promise<void>
[/code]

Sets whether the window’s native close button is enabled or not.

Platform-specific

  * **Linux:** GTK+ will do its best to convince the window manager not to show a close button. Depending on the system, this function may not have any effect when called on a window that is already visible
  * **iOS / Android:** Unsupported.


###### [Parameters](#parameters-20)

[Section titled “Parameters”](#parameters-20)

Parameter| Type  
---|---  
`closable`| `boolean`  
  
###### [Returns](#returns-46)

[Section titled “Returns”](#returns-46)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-45)

[Section titled “Example”](#example-45)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setClosable(false);
[/code]

###### [Inherited from](#inherited-from-46)

[Section titled “Inherited from”](#inherited-from-46)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setClosable`](/reference/javascript/api/namespacewindow/#setclosable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L995>

##### [setContentProtected()](#setcontentprotected)

[Section titled “setContentProtected()”](#setcontentprotected)
[code] 
    setContentProtected(protected_): Promise<void>
[/code]

Prevents the window contents from being captured by other apps.

###### [Parameters](#parameters-21)

[Section titled “Parameters”](#parameters-21)

Parameter| Type  
---|---  
`protected_`| `boolean`  
  
###### [Returns](#returns-47)

[Section titled “Returns”](#returns-47)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-46)

[Section titled “Example”](#example-46)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setContentProtected(true);
[/code]

###### [Inherited from](#inherited-from-47)

[Section titled “Inherited from”](#inherited-from-47)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setContentProtected`](/reference/javascript/api/namespacewindow/#setcontentprotected)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1276>

##### [setCursorGrab()](#setcursorgrab)

[Section titled “setCursorGrab()”](#setcursorgrab)
[code] 
    setCursorGrab(grab): Promise<void>
[/code]

Grabs the cursor, preventing it from leaving the window.

There’s no guarantee that the cursor will be hidden. You should hide it by yourself if you want so.

Platform-specific

  * **Linux:** Unsupported.
  * **macOS:** This locks the cursor in a fixed location, which looks visually awkward.


###### [Parameters](#parameters-22)

[Section titled “Parameters”](#parameters-22)

Parameter| Type| Description  
---|---|---  
`grab`| `boolean`| `true` to grab the cursor icon, `false` to release it.  
  
###### [Returns](#returns-48)

[Section titled “Returns”](#returns-48)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-47)

[Section titled “Example”](#example-47)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorGrab(true);
[/code]

###### [Inherited from](#inherited-from-48)

[Section titled “Inherited from”](#inherited-from-48)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setCursorGrab`](/reference/javascript/api/namespacewindow/#setcursorgrab)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1532>

##### [setCursorIcon()](#setcursoricon)

[Section titled “setCursorIcon()”](#setcursoricon)
[code] 
    setCursorIcon(icon): Promise<void>
[/code]

Modifies the cursor icon of the window.

###### [Parameters](#parameters-23)

[Section titled “Parameters”](#parameters-23)

Parameter| Type| Description  
---|---|---  
`icon`| [`CursorIcon`](/reference/javascript/api/namespacewindow/#cursoricon)| The new cursor icon.  
  
###### [Returns](#returns-49)

[Section titled “Returns”](#returns-49)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-48)

[Section titled “Example”](#example-48)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorIcon('help');
[/code]

###### [Inherited from](#inherited-from-49)

[Section titled “Inherited from”](#inherited-from-49)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setCursorIcon`](/reference/javascript/api/namespacewindow/#setcursoricon)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1574>

##### [setCursorPosition()](#setcursorposition)

[Section titled “setCursorPosition()”](#setcursorposition)
[code] 
    setCursorPosition(position): Promise<void>
[/code]

Changes the position of the cursor in window coordinates.

###### [Parameters](#parameters-24)

[Section titled “Parameters”](#parameters-24)

Parameter| Type| Description  
---|---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition) | [`Position`](/reference/javascript/api/namespacedpi/#position)| The new cursor position.  
  
###### [Returns](#returns-50)

[Section titled “Returns”](#returns-50)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-49)

[Section titled “Example”](#example-49)
[code] 
    import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorPosition(new LogicalPosition(600, 300));
[/code]

###### [Inherited from](#inherited-from-50)

[Section titled “Inherited from”](#inherited-from-50)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setCursorPosition`](/reference/javascript/api/namespacewindow/#setcursorposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1608>

##### [setCursorVisible()](#setcursorvisible)

[Section titled “setCursorVisible()”](#setcursorvisible)
[code] 
    setCursorVisible(visible): Promise<void>
[/code]

Modifies the cursor’s visibility.

Platform-specific

  * **Windows:** The cursor is only hidden within the confines of the window.
  * **macOS:** The cursor is hidden as long as the window has input focus, even if the cursor is outside of the window.


###### [Parameters](#parameters-25)

[Section titled “Parameters”](#parameters-25)

Parameter| Type| Description  
---|---|---  
`visible`| `boolean`| If `false`, this will hide the cursor. If `true`, this will show the cursor.  
  
###### [Returns](#returns-51)

[Section titled “Returns”](#returns-51)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-50)

[Section titled “Example”](#example-50)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorVisible(false);
[/code]

###### [Inherited from](#inherited-from-51)

[Section titled “Inherited from”](#inherited-from-51)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setCursorVisible`](/reference/javascript/api/namespacewindow/#setcursorvisible)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1556>

##### [setDecorations()](#setdecorations)

[Section titled “setDecorations()”](#setdecorations)
[code] 
    setDecorations(decorations): Promise<void>
[/code]

Whether the window should have borders and bars.

###### [Parameters](#parameters-26)

[Section titled “Parameters”](#parameters-26)

Parameter| Type| Description  
---|---|---  
`decorations`| `boolean`| Whether the window should have borders and bars.  
  
###### [Returns](#returns-52)

[Section titled “Returns”](#returns-52)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-51)

[Section titled “Example”](#example-51)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setDecorations(false);
[/code]

###### [Inherited from](#inherited-from-52)

[Section titled “Inherited from”](#inherited-from-52)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setDecorations`](/reference/javascript/api/namespacewindow/#setdecorations)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1177>

##### [setEffects()](#seteffects)

[Section titled “setEffects()”](#seteffects)
[code] 
    setEffects(effects): Promise<void>
[/code]

Set window effects.

###### [Parameters](#parameters-27)

[Section titled “Parameters”](#parameters-27)

Parameter| Type  
---|---  
`effects`| [`Effects`](/reference/javascript/api/namespacewindow/#effects)  
  
###### [Returns](#returns-53)

[Section titled “Returns”](#returns-53)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Inherited from](#inherited-from-53)

[Section titled “Inherited from”](#inherited-from-53)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setEffects`](/reference/javascript/api/namespacewindow/#seteffects)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1213>

##### [setEnabled()](#setenabled)

[Section titled “setEnabled()”](#setenabled)
[code] 
    setEnabled(enabled): Promise<void>
[/code]

Enable or disable the window.

###### [Parameters](#parameters-28)

[Section titled “Parameters”](#parameters-28)

Parameter| Type  
---|---  
`enabled`| `boolean`  
  
###### [Returns](#returns-54)

[Section titled “Returns”](#returns-54)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-52)

[Section titled “Example”](#example-52)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setEnabled(false);
[/code]

###### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

###### [Inherited from](#inherited-from-54)

[Section titled “Inherited from”](#inherited-from-54)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setEnabled`](/reference/javascript/api/namespacewindow/#setenabled)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L908>

##### [setFocus()](#setfocus)

[Section titled “setFocus()”](#setfocus)
[code] 
    setFocus(): Promise<void>
[/code]

Bring the webview to front and focus.

###### [Returns](#returns-55)

[Section titled “Returns”](#returns-55)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-53)

[Section titled “Example”](#example-53)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setFocus();
[/code]

###### [Inherited from](#inherited-from-55)

[Section titled “Inherited from”](#inherited-from-55)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setFocus`](/reference/javascript/api/namespacewindow/#setfocus)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L490>

##### [setFocusable()](#setfocusable)

[Section titled “setFocusable()”](#setfocusable)
[code] 
    setFocusable(focusable): Promise<void>
[/code]

Sets whether the window can be focused.

Platform-specific

  * **macOS** : If the window is already focused, it is not possible to unfocus it after calling `set_focusable(false)`. In this case, you might consider calling [Window.setFocus](/reference/javascript/api/namespacewindow/#setfocus) but it will move the window to the back i.e. at the bottom in terms of z-order.


###### [Parameters](#parameters-29)

[Section titled “Parameters”](#parameters-29)

Parameter| Type| Description  
---|---|---  
`focusable`| `boolean`| Whether the window can be focused.  
  
###### [Returns](#returns-56)

[Section titled “Returns”](#returns-56)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-54)

[Section titled “Example”](#example-54)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setFocusable(true);
[/code]

###### [Inherited from](#inherited-from-56)

[Section titled “Inherited from”](#inherited-from-56)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setFocusable`](/reference/javascript/api/namespacewindow/#setfocusable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1457>

##### [setFullscreen()](#setfullscreen)

[Section titled “setFullscreen()”](#setfullscreen)
[code] 
    setFullscreen(fullscreen): Promise<void>
[/code]

Sets the window fullscreen state.

###### [Parameters](#parameters-30)

[Section titled “Parameters”](#parameters-30)

Parameter| Type| Description  
---|---|---  
`fullscreen`| `boolean`| Whether the window should go to fullscreen or not.  
  
###### [Returns](#returns-57)

[Section titled “Returns”](#returns-57)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-55)

[Section titled “Example”](#example-55)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setFullscreen(true);
[/code]

###### [Inherited from](#inherited-from-57)

[Section titled “Inherited from”](#inherited-from-57)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setFullscreen`](/reference/javascript/api/namespacewindow/#setfullscreen)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1401>

##### [setIcon()](#seticon)

[Section titled “setIcon()”](#seticon)
[code] 
    setIcon(icon): Promise<void>
[/code]

Sets the window icon.

###### [Parameters](#parameters-31)

[Section titled “Parameters”](#parameters-31)

Parameter| Type| Description  
---|---|---  
`icon`| | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)| Icon bytes or path to the icon file.  
  
###### [Returns](#returns-58)

[Section titled “Returns”](#returns-58)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-56)

[Section titled “Example”](#example-56)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setIcon('/tauri/awesome.png');
[/code]

Note that you may need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file:
[code] 
    [dependencies]
    
    tauri = { version = "...", features = ["...", "image-png"] }
[/code]

###### [Inherited from](#inherited-from-58)

[Section titled “Inherited from”](#inherited-from-58)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setIcon`](/reference/javascript/api/namespacewindow/#seticon)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1482>

##### [setIgnoreCursorEvents()](#setignorecursorevents)

[Section titled “setIgnoreCursorEvents()”](#setignorecursorevents)
[code] 
    setIgnoreCursorEvents(ignore): Promise<void>
[/code]

Changes the cursor events behavior.

###### [Parameters](#parameters-32)

[Section titled “Parameters”](#parameters-32)

Parameter| Type| Description  
---|---|---  
`ignore`| `boolean`| `true` to ignore the cursor events; `false` to process them as usual.  
  
###### [Returns](#returns-59)

[Section titled “Returns”](#returns-59)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-57)

[Section titled “Example”](#example-57)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setIgnoreCursorEvents(true);
[/code]

###### [Inherited from](#inherited-from-59)

[Section titled “Inherited from”](#inherited-from-59)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setIgnoreCursorEvents`](/reference/javascript/api/namespacewindow/#setignorecursorevents)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1629>

##### [setMaxSize()](#setmaxsize)

[Section titled “setMaxSize()”](#setmaxsize)
[code] 
    setMaxSize(size): Promise<void>
[/code]

Sets the window maximum inner size. If the `size` argument is undefined, the constraint is unset.

###### [Parameters](#parameters-33)

[Section titled “Parameters”](#parameters-33)

Parameter| Type| Description  
---|---|---  
`size`| | `undefined` | `null` | [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical inner size, or `null` to unset the constraint.  
  
###### [Returns](#returns-60)

[Section titled “Returns”](#returns-60)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-58)

[Section titled “Example”](#example-58)
[code] 
    import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMaxSize(new LogicalSize(600, 500));
[/code]

###### [Inherited from](#inherited-from-60)

[Section titled “Inherited from”](#inherited-from-60)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setMaxSize`](/reference/javascript/api/namespacewindow/#setmaxsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1332>

##### [setMaximizable()](#setmaximizable)

[Section titled “setMaximizable()”](#setmaximizable)
[code] 
    setMaximizable(maximizable): Promise<void>
[/code]

Sets whether the window’s native maximize button is enabled or not. If resizable is set to false, this setting is ignored.

Platform-specific

  * **macOS:** Disables the “zoom” button in the window titlebar, which is also used to enter fullscreen mode.
  * **Linux / iOS / Android:** Unsupported.


###### [Parameters](#parameters-34)

[Section titled “Parameters”](#parameters-34)

Parameter| Type  
---|---  
`maximizable`| `boolean`  
  
###### [Returns](#returns-61)

[Section titled “Returns”](#returns-61)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-59)

[Section titled “Example”](#example-59)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMaximizable(false);
[/code]

###### [Inherited from](#inherited-from-61)

[Section titled “Inherited from”](#inherited-from-61)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setMaximizable`](/reference/javascript/api/namespacewindow/#setmaximizable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L950>

##### [setMinSize()](#setminsize)

[Section titled “setMinSize()”](#setminsize)
[code] 
    setMinSize(size): Promise<void>
[/code]

Sets the window minimum inner size. If the `size` argument is not provided, the constraint is unset.

###### [Parameters](#parameters-35)

[Section titled “Parameters”](#parameters-35)

Parameter| Type| Description  
---|---|---  
`size`| | `undefined` | `null` | [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical inner size, or `null` to unset the constraint.  
  
###### [Returns](#returns-62)

[Section titled “Returns”](#returns-62)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-60)

[Section titled “Example”](#example-60)
[code] 
    import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMinSize(new PhysicalSize(600, 500));
[/code]

###### [Inherited from](#inherited-from-62)

[Section titled “Inherited from”](#inherited-from-62)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setMinSize`](/reference/javascript/api/namespacewindow/#setminsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1312>

##### [setMinimizable()](#setminimizable)

[Section titled “setMinimizable()”](#setminimizable)
[code] 
    setMinimizable(minimizable): Promise<void>
[/code]

Sets whether the window’s native minimize button is enabled or not.

Platform-specific

  * **Linux / iOS / Android:** Unsupported.


###### [Parameters](#parameters-36)

[Section titled “Parameters”](#parameters-36)

Parameter| Type  
---|---  
`minimizable`| `boolean`  
  
###### [Returns](#returns-63)

[Section titled “Returns”](#returns-63)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-61)

[Section titled “Example”](#example-61)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMinimizable(false);
[/code]

###### [Inherited from](#inherited-from-63)

[Section titled “Inherited from”](#inherited-from-63)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setMinimizable`](/reference/javascript/api/namespacewindow/#setminimizable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L972>

##### [setOverlayIcon()](#setoverlayicon)

[Section titled “setOverlayIcon()”](#setoverlayicon)
[code] 
    setOverlayIcon(icon?): Promise<void>
[/code]

Sets the overlay icon. **Windows only** The overlay icon can be set for every window.

Note that you may need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file:
[code] 
    [dependencies]
    
    tauri = { version = "...", features = ["...", "image-png"] }
[/code]

###### [Parameters](#parameters-37)

[Section titled “Parameters”](#parameters-37)

Parameter| Type| Description  
---|---|---  
`icon`?| | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)| Icon bytes or path to the icon file. Use `undefined` to remove the overlay icon.  
  
###### [Returns](#returns-64)

[Section titled “Returns”](#returns-64)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-62)

[Section titled “Example”](#example-62)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setOverlayIcon("/tauri/awesome.png");
[/code]

###### [Inherited from](#inherited-from-64)

[Section titled “Inherited from”](#inherited-from-64)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setOverlayIcon`](/reference/javascript/api/namespacewindow/#setoverlayicon)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1733>

##### [setPosition()](#setposition)

[Section titled “setPosition()”](#setposition)
[code] 
    setPosition(position): Promise<void>
[/code]

Sets the webview position.

###### [Parameters](#parameters-38)

[Section titled “Parameters”](#parameters-38)

Parameter| Type| Description  
---|---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition) | [`Position`](/reference/javascript/api/namespacedpi/#position)| The new position, in logical or physical pixels.  
  
###### [Returns](#returns-65)

[Section titled “Returns”](#returns-65)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-63)

[Section titled “Example”](#example-63)
[code] 
    import { getCurrent, LogicalPosition } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setPosition(new LogicalPosition(600, 500));
[/code]

###### [Inherited from](#inherited-from-65)

[Section titled “Inherited from”](#inherited-from-65)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setPosition`](/reference/javascript/api/namespacewindow/#setposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L471>

##### [setProgressBar()](#setprogressbar)

[Section titled “setProgressBar()”](#setprogressbar)
[code] 
    setProgressBar(state): Promise<void>
[/code]

Sets the taskbar progress state.

Platform-specific

  * **Linux / macOS** : Progress bar is app-wide and not specific to this window.
  * **Linux** : Only supported desktop environments with `libunity` (e.g. GNOME).


###### [Parameters](#parameters-39)

[Section titled “Parameters”](#parameters-39)

Parameter| Type  
---|---  
`state`| [`ProgressBarState`](/reference/javascript/api/namespacewindow/#progressbarstate)  
  
###### [Returns](#returns-66)

[Section titled “Returns”](#returns-66)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-64)

[Section titled “Example”](#example-64)
[code] 
    import { getCurrentWindow, ProgressBarStatus } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setProgressBar({
    
      status: ProgressBarStatus.Normal,
    
      progress: 50,
    
    });
[/code]

###### [Inherited from](#inherited-from-66)

[Section titled “Inherited from”](#inherited-from-66)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setProgressBar`](/reference/javascript/api/namespacewindow/#setprogressbar)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1761>

##### [setResizable()](#setresizable)

[Section titled “setResizable()”](#setresizable)
[code] 
    setResizable(resizable): Promise<void>
[/code]

Updates the window resizable flag.

###### [Parameters](#parameters-40)

[Section titled “Parameters”](#parameters-40)

Parameter| Type  
---|---  
`resizable`| `boolean`  
  
###### [Returns](#returns-67)

[Section titled “Returns”](#returns-67)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-65)

[Section titled “Example”](#example-65)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setResizable(false);
[/code]

###### [Inherited from](#inherited-from-67)

[Section titled “Inherited from”](#inherited-from-67)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setResizable`](/reference/javascript/api/namespacewindow/#setresizable)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L889>

##### [setShadow()](#setshadow)

[Section titled “setShadow()”](#setshadow)
[code] 
    setShadow(enable): Promise<void>
[/code]

Whether or not the window should have shadow.

Platform-specific

  * **Windows:**
    * `false` has no effect on decorated window, shadows are always ON.
    * `true` will make undecorated window have a 1px white border, and on Windows 11, it will have a rounded corners.
  * **Linux:** Unsupported.


###### [Parameters](#parameters-41)

[Section titled “Parameters”](#parameters-41)

Parameter| Type  
---|---  
`enable`| `boolean`  
  
###### [Returns](#returns-68)

[Section titled “Returns”](#returns-68)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-66)

[Section titled “Example”](#example-66)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setShadow(false);
[/code]

###### [Inherited from](#inherited-from-68)

[Section titled “Inherited from”](#inherited-from-68)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setShadow`](/reference/javascript/api/namespacewindow/#setshadow)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1203>

##### [setSimpleFullscreen()](#setsimplefullscreen)

[Section titled “setSimpleFullscreen()”](#setsimplefullscreen)
[code] 
    setSimpleFullscreen(fullscreen): Promise<void>
[/code]

On macOS, Toggles a fullscreen mode that doesn’t require a new macOS space. Returns a boolean indicating whether the transition was successful (this won’t work if the window was already in the native fullscreen). This is how fullscreen used to work on macOS in versions before Lion. And allows the user to have a fullscreen window without using another space or taking control over the entire monitor.

On other platforms, this is the same as [Window.setFullscreen](/reference/javascript/api/namespacewindow/#setfullscreen).

###### [Parameters](#parameters-42)

[Section titled “Parameters”](#parameters-42)

Parameter| Type| Description  
---|---|---  
`fullscreen`| `boolean`| Whether the window should go to simple fullscreen or not.  
  
###### [Returns](#returns-69)

[Section titled “Returns”](#returns-69)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Inherited from](#inherited-from-69)

[Section titled “Inherited from”](#inherited-from-69)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setSimpleFullscreen`](/reference/javascript/api/namespacewindow/#setsimplefullscreen)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1417>

##### [setSize()](#setsize)

[Section titled “setSize()”](#setsize)
[code] 
    setSize(size): Promise<void>
[/code]

Resizes the webview.

###### [Parameters](#parameters-43)

[Section titled “Parameters”](#parameters-43)

Parameter| Type| Description  
---|---|---  
`size`| [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical size.  
  
###### [Returns](#returns-70)

[Section titled “Returns”](#returns-70)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-67)

[Section titled “Example”](#example-67)
[code] 
    import { getCurrent, LogicalSize } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setSize(new LogicalSize(600, 500));
[/code]

###### [Inherited from](#inherited-from-70)

[Section titled “Inherited from”](#inherited-from-70)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setSize`](/reference/javascript/api/namespacewindow/#setsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L453>

##### [setSizeConstraints()](#setsizeconstraints)

[Section titled “setSizeConstraints()”](#setsizeconstraints)
[code] 
    setSizeConstraints(constraints): Promise<void>
[/code]

Sets the window inner size constraints.

###### [Parameters](#parameters-44)

[Section titled “Parameters”](#parameters-44)

Parameter| Type| Description  
---|---|---  
`constraints`| `undefined` | `null` | [`WindowSizeConstraints`](/reference/javascript/api/namespacewindow/#windowsizeconstraints)| The logical or physical inner size, or `null` to unset the constraint.  
  
###### [Returns](#returns-71)

[Section titled “Returns”](#returns-71)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-68)

[Section titled “Example”](#example-68)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setSizeConstraints({ minWidth: 300 });
[/code]

###### [Inherited from](#inherited-from-71)

[Section titled “Inherited from”](#inherited-from-71)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setSizeConstraints`](/reference/javascript/api/namespacewindow/#setsizeconstraints)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1352>

##### [setSkipTaskbar()](#setskiptaskbar)

[Section titled “setSkipTaskbar()”](#setskiptaskbar)
[code] 
    setSkipTaskbar(skip): Promise<void>
[/code]

Whether the window icon should be hidden from the taskbar or not.

Platform-specific

  * **macOS:** Unsupported.


###### [Parameters](#parameters-45)

[Section titled “Parameters”](#parameters-45)

Parameter| Type| Description  
---|---|---  
`skip`| `boolean`| true to hide window icon, false to show it.  
  
###### [Returns](#returns-72)

[Section titled “Returns”](#returns-72)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-69)

[Section titled “Example”](#example-69)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setSkipTaskbar(true);
[/code]

###### [Inherited from](#inherited-from-72)

[Section titled “Inherited from”](#inherited-from-72)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setSkipTaskbar`](/reference/javascript/api/namespacewindow/#setskiptaskbar)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1506>

##### [setTheme()](#settheme)

[Section titled “setTheme()”](#settheme)
[code] 
    setTheme(theme?): Promise<void>
[/code]

Set window theme, pass in `null` or `undefined` to follow system theme

Platform-specific

  * **Linux / macOS** : Theme is app-wide and not specific to this window.
  * **iOS / Android:** Unsupported.


###### [Parameters](#parameters-46)

[Section titled “Parameters”](#parameters-46)

Parameter| Type  
---|---  
`theme`?| `null` | [`Theme`](/reference/javascript/api/namespacewindow/#theme-2)  
  
###### [Returns](#returns-73)

[Section titled “Returns”](#returns-73)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

###### [Inherited from](#inherited-from-73)

[Section titled “Inherited from”](#inherited-from-73)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setTheme`](/reference/javascript/api/namespacewindow/#settheme)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1806>

##### [setTitle()](#settitle)

[Section titled “setTitle()”](#settitle)
[code] 
    setTitle(title): Promise<void>
[/code]

Sets the window title.

###### [Parameters](#parameters-47)

[Section titled “Parameters”](#parameters-47)

Parameter| Type| Description  
---|---|---  
`title`| `string`| The new title  
  
###### [Returns](#returns-74)

[Section titled “Returns”](#returns-74)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-70)

[Section titled “Example”](#example-70)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setTitle('Tauri');
[/code]

###### [Inherited from](#inherited-from-74)

[Section titled “Inherited from”](#inherited-from-74)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setTitle`](/reference/javascript/api/namespacewindow/#settitle)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1013>

##### [setTitleBarStyle()](#settitlebarstyle)

[Section titled “setTitleBarStyle()”](#settitlebarstyle)
[code] 
    setTitleBarStyle(style): Promise<void>
[/code]

Sets the title bar style. **macOS only**.

###### [Parameters](#parameters-48)

[Section titled “Parameters”](#parameters-48)

Parameter| Type  
---|---  
`style`| [`TitleBarStyle`](/reference/javascript/api/namespacewindow/#titlebarstyle-1)  
  
###### [Returns](#returns-75)

[Section titled “Returns”](#returns-75)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

###### [Inherited from](#inherited-from-75)

[Section titled “Inherited from”](#inherited-from-75)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setTitleBarStyle`](/reference/javascript/api/namespacewindow/#settitlebarstyle)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1789>

##### [setVisibleOnAllWorkspaces()](#setvisibleonallworkspaces)

[Section titled “setVisibleOnAllWorkspaces()”](#setvisibleonallworkspaces)
[code] 
    setVisibleOnAllWorkspaces(visible): Promise<void>
[/code]

Sets whether the window should be visible on all workspaces or virtual desktops.

Platform-specific

  * **Windows / iOS / Android:** Unsupported.


###### [Parameters](#parameters-49)

[Section titled “Parameters”](#parameters-49)

Parameter| Type  
---|---  
`visible`| `boolean`  
  
###### [Returns](#returns-76)

[Section titled “Returns”](#returns-76)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since-6)

[Section titled “Since”](#since-6)

2.0.0

###### [Inherited from](#inherited-from-76)

[Section titled “Inherited from”](#inherited-from-76)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`setVisibleOnAllWorkspaces`](/reference/javascript/api/namespacewindow/#setvisibleonallworkspaces)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1777>

##### [setZoom()](#setzoom)

[Section titled “setZoom()”](#setzoom)
[code] 
    setZoom(scaleFactor): Promise<void>
[/code]

Set webview zoom level.

###### [Parameters](#parameters-50)

[Section titled “Parameters”](#parameters-50)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-77)

[Section titled “Returns”](#returns-77)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-71)

[Section titled “Example”](#example-71)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setZoom(1.5);
[/code]

###### [Inherited from](#inherited-from-77)

[Section titled “Inherited from”](#inherited-from-77)

[`Webview`](/reference/javascript/api/namespacewebview/#webview).[`setZoom`](/reference/javascript/api/namespacewebview/#setzoom)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L555>

##### [show()](#show)

[Section titled “show()”](#show)
[code] 
    show(): Promise<void>
[/code]

Show the webview.

###### [Returns](#returns-78)

[Section titled “Returns”](#returns-78)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-72)

[Section titled “Example”](#example-72)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().show();
[/code]

###### [Inherited from](#inherited-from-78)

[Section titled “Inherited from”](#inherited-from-78)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`show`](/reference/javascript/api/namespacewindow/#show)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L539>

##### [size()](#size)

[Section titled “size()”](#size)
[code] 
    size(): Promise<PhysicalSize>
[/code]

The physical size of the webview’s client area. The client area is the content of the webview, excluding the title bar and borders.

###### [Returns](#returns-79)

[Section titled “Returns”](#returns-79)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>

The webview’s size.

###### [Example](#example-73)

[Section titled “Example”](#example-73)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    const size = await getCurrentWebview().size();
[/code]

###### [Inherited from](#inherited-from-79)

[Section titled “Inherited from”](#inherited-from-79)

[`Webview`](/reference/javascript/api/namespacewebview/#webview).[`size`](/reference/javascript/api/namespacewebview/#size)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L415>

##### [startDragging()](#startdragging)

[Section titled “startDragging()”](#startdragging)
[code] 
    startDragging(): Promise<void>
[/code]

Starts dragging the window.

###### [Returns](#returns-80)

[Section titled “Returns”](#returns-80)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-74)

[Section titled “Example”](#example-74)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().startDragging();
[/code]

###### [Inherited from](#inherited-from-80)

[Section titled “Inherited from”](#inherited-from-80)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`startDragging`](/reference/javascript/api/namespacewindow/#startdragging)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1646>

##### [startResizeDragging()](#startresizedragging)

[Section titled “startResizeDragging()”](#startresizedragging)
[code] 
    startResizeDragging(direction): Promise<void>
[/code]

Starts resize-dragging the window.

###### [Parameters](#parameters-51)

[Section titled “Parameters”](#parameters-51)

Parameter| Type  
---|---  
`direction`| `ResizeDirection`  
  
###### [Returns](#returns-81)

[Section titled “Returns”](#returns-81)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-75)

[Section titled “Example”](#example-75)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().startResizeDragging();
[/code]

###### [Inherited from](#inherited-from-81)

[Section titled “Inherited from”](#inherited-from-81)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`startResizeDragging`](/reference/javascript/api/namespacewindow/#startresizedragging)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1662>

##### [theme()](#theme)

[Section titled “theme()”](#theme)
[code] 
    theme(): Promise<null | Theme>
[/code]

Gets the window’s current theme.

Platform-specific

  * **macOS:** Theme was introduced on macOS 10.14. Returns `light` on macOS 10.13 and below.


###### [Returns](#returns-82)

[Section titled “Returns”](#returns-82)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Theme`](/reference/javascript/api/namespacewindow/#theme-2)>

The window theme.

###### [Example](#example-76)

[Section titled “Example”](#example-76)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const theme = await getCurrentWindow().theme();
[/code]

###### [Inherited from](#inherited-from-82)

[Section titled “Inherited from”](#inherited-from-82)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`theme`](/reference/javascript/api/namespacewindow/#theme)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L801>

##### [title()](#title)

[Section titled “title()”](#title)
[code] 
    title(): Promise<string>
[/code]

Gets the window’s current title.

###### [Returns](#returns-83)

[Section titled “Returns”](#returns-83)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

###### [Example](#example-77)

[Section titled “Example”](#example-77)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const title = await getCurrentWindow().title();
[/code]

###### [Inherited from](#inherited-from-83)

[Section titled “Inherited from”](#inherited-from-83)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`title`](/reference/javascript/api/namespacewindow/#title)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L780>

##### [toggleMaximize()](#togglemaximize)

[Section titled “toggleMaximize()”](#togglemaximize)
[code] 
    toggleMaximize(): Promise<void>
[/code]

Toggles the window maximized state.

###### [Returns](#returns-84)

[Section titled “Returns”](#returns-84)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-78)

[Section titled “Example”](#example-78)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().toggleMaximize();
[/code]

###### [Inherited from](#inherited-from-84)

[Section titled “Inherited from”](#inherited-from-84)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`toggleMaximize`](/reference/javascript/api/namespacewindow/#togglemaximize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1062>

##### [unmaximize()](#unmaximize)

[Section titled “unmaximize()”](#unmaximize)
[code] 
    unmaximize(): Promise<void>
[/code]

Unmaximizes the window.

###### [Returns](#returns-85)

[Section titled “Returns”](#returns-85)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-79)

[Section titled “Example”](#example-79)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().unmaximize();
[/code]

###### [Inherited from](#inherited-from-85)

[Section titled “Inherited from”](#inherited-from-85)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`unmaximize`](/reference/javascript/api/namespacewindow/#unmaximize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1046>

##### [unminimize()](#unminimize)

[Section titled “unminimize()”](#unminimize)
[code] 
    unminimize(): Promise<void>
[/code]

Unminimizes the window.

###### [Returns](#returns-86)

[Section titled “Returns”](#returns-86)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-80)

[Section titled “Example”](#example-80)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().unminimize();
[/code]

###### [Inherited from](#inherited-from-86)

[Section titled “Inherited from”](#inherited-from-86)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`unminimize`](/reference/javascript/api/namespacewindow/#unminimize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1094>

##### [getAll()](#getall)

[Section titled “getAll()”](#getall)
[code] 
    static getAll(): Promise<WebviewWindow[]>
[/code]

Gets a list of instances of `Webview` for all available webviews.

###### [Returns](#returns-87)

[Section titled “Returns”](#returns-87)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)[]>

###### [Inherited from](#inherited-from-87)

[Section titled “Inherited from”](#inherited-from-87)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`getAll`](/reference/javascript/api/namespacewindow/#getall)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L132>

##### [getByLabel()](#getbylabel)

[Section titled “getByLabel()”](#getbylabel)
[code] 
    static getByLabel(label): Promise<null | WebviewWindow>
[/code]

Gets the Webview for the webview associated with the given label.

###### [Parameters](#parameters-52)

[Section titled “Parameters”](#parameters-52)

Parameter| Type| Description  
---|---|---  
`label`| `string`| The webview label.  
  
###### [Returns](#returns-88)

[Section titled “Returns”](#returns-88)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)>

The Webview instance to communicate with the webview or null if the webview doesn’t exist.

###### [Example](#example-81)

[Section titled “Example”](#example-81)
[code] 
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    
    const mainWebview = WebviewWindow.getByLabel('main');
[/code]

###### [Inherited from](#inherited-from-88)

[Section titled “Inherited from”](#inherited-from-88)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`getByLabel`](/reference/javascript/api/namespacewindow/#getbylabel)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L112>

##### [getCurrent()](#getcurrent)

[Section titled “getCurrent()”](#getcurrent)
[code] 
    static getCurrent(): WebviewWindow
[/code]

Get an instance of `Webview` for the current webview.

###### [Returns](#returns-89)

[Section titled “Returns”](#returns-89)

[`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)

###### [Inherited from](#inherited-from-89)

[Section titled “Inherited from”](#inherited-from-89)

[`Window`](/reference/javascript/api/namespacewindow/#window).[`getCurrent`](/reference/javascript/api/namespacewindow/#getcurrent)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L125>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [getAllWebviewWindows()](#getallwebviewwindows)

[Section titled “getAllWebviewWindows()”](#getallwebviewwindows)
[code] 
    function getAllWebviewWindows(): Promise<WebviewWindow[]>
[/code]

Gets a list of instances of `Webview` for all available webview windows.

#### [Returns](#returns-90)

[Section titled “Returns”](#returns-90)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)[]>

#### [Since](#since-7)

[Section titled “Since”](#since-7)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L34>

* * *

### [getCurrentWebviewWindow()](#getcurrentwebviewwindow)

[Section titled “getCurrentWebviewWindow()”](#getcurrentwebviewwindow)
[code] 
    function getCurrentWebviewWindow(): WebviewWindow
[/code]

Get an instance of `Webview` for the current webview window.

#### [Returns](#returns-91)

[Section titled “Returns”](#returns-91)

[`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)

#### [Since](#since-8)

[Section titled “Since”](#since-8)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webviewWindow.ts#L23>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacewebviewwindow](https://v2.tauri.app/reference/javascript/api/namespacewebviewwindow)