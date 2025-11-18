# webview

Provides APIs to create webviews, communicate with other webviews and manipulate the current webview.

#### [Webview events](#webview-events)

[Section titled “Webview events”](#webview-events)

Events can be listened to using [Webview.listen](/reference/javascript/api/namespacewebview/#listen):
[code] 
    import { getCurrentWebview } from "@tauri-apps/api/webview";
    
    getCurrentWebview().listen("my-webview-event", ({ event, payload }) => { });
[/code]

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Webview](#webview)

[Section titled “Webview”](#webview)

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

#### [Extended by](#extended-by)

[Section titled “Extended by”](#extended-by)

  * [`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)


#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new Webview()](#new-webview)

[Section titled “new Webview()”](#new-webview)
[code] 
    new Webview(
    
       window,
    
       label,
    
       options): Webview
[/code]

Creates a new Webview.

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`window`| [`Window`](/reference/javascript/api/namespacewindow/#window)| the window to add this webview to.  
`label`| `string`| The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.  
`options`| [`WebviewOptions`](/reference/javascript/api/namespacewebview/#webviewoptions)| -  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Webview`](/reference/javascript/api/namespacewebview/#webview)

The [Webview](/reference/javascript/api/namespacewebview/#webview) instance to communicate with the webview.

###### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { Window } from '@tauri-apps/api/window'
    
    import { Webview } from '@tauri-apps/api/webview'
    
    const appWindow = new Window('my-label')
    
    
    
    
    appWindow.once('tauri://created', async function() {
    
      const webview = new Webview(appWindow, 'my-label', {
    
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
    
    });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L194>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`label`| `string`| The webview label. It is a unique identifier for the webview, can be used to reference it later.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L155>  
`listeners`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`any`>[]>| Local event listeners.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L160>  
`window`| [`Window`](/reference/javascript/api/namespacewindow/#window)| The window hosting this webview.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L157>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [clearAllBrowsingData()](#clearallbrowsingdata)

[Section titled “clearAllBrowsingData()”](#clearallbrowsingdata)
[code] 
    clearAllBrowsingData(): Promise<void>
[/code]

Clears all browsing data for this webview.

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().clearAllBrowsingData();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L589>

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Closes the webview.

###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().close();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L436>

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
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().emit('webview-loaded', { loggedIn: true, token: 'authToken' });
[/code]

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
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().emitTo('main', 'webview-loaded', { loggedIn: true, token: 'authToken' });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L353>

##### [hide()](#hide)

[Section titled “hide()”](#hide)
[code] 
    hide(): Promise<void>
[/code]

Hide the webview.

###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().hide();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L523>

##### [listen()](#listen)

[Section titled “listen()”](#listen)
[code] 
    listen<T>(event, handler): Promise<UnlistenFn>
[/code]

Listen to an emitted event on this webview.

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
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    const unlisten = await getCurrentWebview().listen<string>('state-changed', (event) => {
    
      console.log(`Got error: ${payload}`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L262>

##### [onDragDropEvent()](#ondragdropevent)

[Section titled “onDragDropEvent()”](#ondragdropevent)
[code] 
    onDragDropEvent(handler): Promise<UnlistenFn>
[/code]

Listen to a file drop event. The listener is triggered when the user hovers the selected files on the webview, drops the files or cancels the operation.

###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`DragDropEvent`](/reference/javascript/api/namespacewebview/#dragdropevent)>  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-8)

[Section titled “Example”](#example-8)
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

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L641>

##### [once()](#once)

[Section titled “once()”](#once)
[code] 
    once<T>(event, handler): Promise<UnlistenFn>
[/code]

Listen to an emitted event on this webview only once.

###### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler.  
  
###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    const unlisten = await getCurrent().once<null>('initialized', (event) => {
    
      console.log(`Webview initialized!`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L297>

##### [position()](#position)

[Section titled “position()”](#position)
[code] 
    position(): Promise<PhysicalPosition>
[/code]

The position of the top-left hand corner of the webview’s client area relative to the top-left hand corner of the desktop.

###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

The webview’s position.

###### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    const position = await getCurrentWebview().position();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L398>

##### [reparent()](#reparent)

[Section titled “reparent()”](#reparent)
[code] 
    reparent(window): Promise<void>
[/code]

Moves this webview to the given label.

###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`window`| `string` | [`Window`](/reference/javascript/api/namespacewindow/#window) | [`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)  
  
###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().reparent('other-window');
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L572>

##### [setAutoResize()](#setautoresize)

[Section titled “setAutoResize()”](#setautoresize)
[code] 
    setAutoResize(autoResize): Promise<void>
[/code]

Sets whether the webview should automatically grow and shrink its size and position when the parent window resizes.

###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`autoResize`| `boolean`  
  
###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-12)

[Section titled “Example”](#example-12)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setAutoResize(true);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L506>

##### [setBackgroundColor()](#setbackgroundcolor)

[Section titled “setBackgroundColor()”](#setbackgroundcolor)
[code] 
    setBackgroundColor(color): Promise<void>
[/code]

Specify the webview background color.

#### [Platfrom-specific:](#platfrom-specific)

[Section titled “Platfrom-specific:”](#platfrom-specific)

  * **macOS / iOS** : Not implemented.
  * **Windows** : 
    * On Windows 7, transparency is not supported and the alpha value will be ignored.
    * On Windows higher than 7: translucent colors are not supported so any alpha value other than `0` will be replaced by `255`


###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`color`| `null` | [`Color`](/reference/javascript/api/namespacewebview/#color)  
  
###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Since](#since-1)

[Section titled “Since”](#since-1)

2.1.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L607>

##### [setFocus()](#setfocus)

[Section titled “setFocus()”](#setfocus)
[code] 
    setFocus(): Promise<void>
[/code]

Bring the webview to front and focus.

###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-13)

[Section titled “Example”](#example-13)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setFocus();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L490>

##### [setPosition()](#setposition)

[Section titled “setPosition()”](#setposition)
[code] 
    setPosition(position): Promise<void>
[/code]

Sets the webview position.

###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type| Description  
---|---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition) | [`Position`](/reference/javascript/api/namespacedpi/#position)| The new position, in logical or physical pixels.  
  
###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-14)

[Section titled “Example”](#example-14)
[code] 
    import { getCurrent, LogicalPosition } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setPosition(new LogicalPosition(600, 500));
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L471>

##### [setSize()](#setsize)

[Section titled “setSize()”](#setsize)
[code] 
    setSize(size): Promise<void>
[/code]

Resizes the webview.

###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type| Description  
---|---|---  
`size`| [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical size.  
  
###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-15)

[Section titled “Example”](#example-15)
[code] 
    import { getCurrent, LogicalSize } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setSize(new LogicalSize(600, 500));
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L453>

##### [setZoom()](#setzoom)

[Section titled “setZoom()”](#setzoom)
[code] 
    setZoom(scaleFactor): Promise<void>
[/code]

Set webview zoom level.

###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-16)

[Section titled “Example”](#example-16)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().setZoom(1.5);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L555>

##### [show()](#show)

[Section titled “show()”](#show)
[code] 
    show(): Promise<void>
[/code]

Show the webview.

###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-17)

[Section titled “Example”](#example-17)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    await getCurrentWebview().show();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L539>

##### [size()](#size)

[Section titled “size()”](#size)
[code] 
    size(): Promise<PhysicalSize>
[/code]

The physical size of the webview’s client area. The client area is the content of the webview, excluding the title bar and borders.

###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>

The webview’s size.

###### [Example](#example-18)

[Section titled “Example”](#example-18)
[code] 
    import { getCurrentWebview } from '@tauri-apps/api/webview';
    
    const size = await getCurrentWebview().size();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L415>

##### [getAll()](#getall)

[Section titled “getAll()”](#getall)
[code] 
    static getAll(): Promise<Webview[]>
[/code]

Gets a list of instances of `Webview` for all available webviews.

###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Webview`](/reference/javascript/api/namespacewebview/#webview)[]>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L239>

##### [getByLabel()](#getbylabel)

[Section titled “getByLabel()”](#getbylabel)
[code] 
    static getByLabel(label): Promise<null | Webview>
[/code]

Gets the Webview for the webview associated with the given label.

###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type| Description  
---|---|---  
`label`| `string`| The webview label.  
  
###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Webview`](/reference/javascript/api/namespacewebview/#webview)>

The Webview instance to communicate with the webview or null if the webview doesn’t exist.

###### [Example](#example-19)

[Section titled “Example”](#example-19)
[code] 
    import { Webview } from '@tauri-apps/api/webview';
    
    const mainWebview = Webview.getByLabel('main');
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L225>

##### [getCurrent()](#getcurrent)

[Section titled “getCurrent()”](#getcurrent)
[code] 
    static getCurrent(): Webview
[/code]

Get an instance of `Webview` for the current webview.

###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

[`Webview`](/reference/javascript/api/namespacewebview/#webview)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L232>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [WebviewOptions](#webviewoptions)

[Section titled “WebviewOptions”](#webviewoptions)

Configuration for the webview to create.

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`acceptFirstMouse?`| `boolean`| Whether clicking an inactive webview also clicks through to the webview on macOS.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L746>  
`allowLinkPreview?`| `boolean`| on macOS and iOS there is a link preview on long pressing links, this is enabled by default. see <https://docs.rs/objc2-web-kit/latest/objc2_web_kit/struct.WKWebView.html#method.allowsLinkPreview>| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L850>  
`backgroundColor?`| [`Color`](/reference/javascript/api/namespacewebview/#color)| Set the window and webview background color. Platform-specific: - **macOS / iOS** : Not implemented. - **Windows** : - On Windows 7, alpha channel is ignored. - On Windows 8 and newer, if alpha channel is not `0`, it will be ignored. **Since** 2.1.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L822>  
`backgroundThrottling?`| [`BackgroundThrottlingPolicy`](/reference/javascript/api/namespacewindow/#backgroundthrottlingpolicy)| Change the default background throttling behaviour. By default, browsers use a suspend policy that will throttle timers and even unload the whole tab (view) to free resources after roughly 5 minutes when a view became minimized or hidden. This will pause all tasks until the documents visibility state changes back from hidden to visible by bringing the view back to the foreground. ## Platform-specific - **Linux / Windows / Android** : Unsupported. Workarounds like a pending WebLock transaction might suffice. - **iOS** : Supported since version 17.0+. - **macOS** : Supported since version 14.0+. see <https://github.com/tauri-apps/tauri/issues/5250#issuecomment-2569380578> **Since** 2.3.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L841>  
`dataDirectory?`| `string`| Set a custom path for the webview’s data directory (localStorage, cache, etc.) **relative to [`appDataDir()`]/${label}**. For security reasons, paths outside of that location can only be configured on the Rust side. Platform-specific: - **Windows** : WebViews with different values for settings like `additionalBrowserArgs`, `browserExtensionsEnabled` or `scrollBarStyle` must have different data directories. - **macOS / iOS** : Unsupported, use `dataStoreIdentifier` instead. - **Android** : Unsupported. **Since** 2.9.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L870>  
`dataStoreIdentifier?`| `number`[]| Initialize the WebView with a custom data store identifier. This can be seen as a replacement for `dataDirectory` which is unavailable in WKWebView. See <https://developer.apple.com/documentation/webkit/wkwebsitedatastore/init(foridentifier:)?language=objc> The array must contain 16 u8 numbers. Platform-specific: - **macOS / iOS** : Available on macOS >= 14 and iOS >= 17 - **Windows / Linux / Android** : Unsupported. **Since** 2.9.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L884>  
`devtools?`| `boolean`| Whether web inspector, which is usually called browser devtools, is enabled or not. Enabled by default. This API works in **debug** builds, but requires `devtools` feature flag to enable it in **release** builds. Platform-specific - macOS: This will call private functions on **macOS**. - Android: Open `chrome://inspect/#devices` in Chrome to get the devtools window. Wry’s `WebView` devtools API isn’t supported on Android. - iOS: Open Safari > Develop > [Your Device Name] > [Your WebView] to get the devtools window. **Since** 2.1.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L809>  
`disableInputAccessoryView?`| `boolean`| Allows disabling the input accessory view on iOS. The accessory view is the view that appears above the keyboard when a text input element is focused. It usually displays a view with “Done”, “Next” buttons.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L857>  
`dragDropEnabled?`| `boolean`| Whether the drag and drop is enabled or not on the webview. By default it is enabled. Disabling it is required to use HTML5 drag and drop on the frontend on Windows.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L742>  
`focus?`| `boolean`| Whether the webview should have focus or not **Since** 2.1.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L736>  
`height`| `number`| The initial height.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L724>  
`incognito?`| `boolean`| Whether or not the webview should be launched in incognito mode. Platform-specific - **Android:** Unsupported.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L758>  
`javascriptDisabled?`| `boolean`| Whether we should disable JavaScript code execution on the webview or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L845>  
`proxyUrl?`| `string`| The proxy URL for the WebView for all network requests. Must be either a `http://` or a `socks5://` URL. Platform-specific - **macOS** : Requires the `macos-proxy` feature flag and only compiles for macOS 14+.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L768>  
`scrollBarStyle?`| [`ScrollBarStyle`](/reference/javascript/api/namespacewindow/#scrollbarstyle)| Specifies the native scrollbar style to use with the webview. CSS styles that modify the scrollbar are applied on top of the native appearance configured here. Defaults to `default`, which is the browser default. ## Platform-specific - **Windows** : - `fluentOverlay` requires WebView2 Runtime version 125.0.2535.41 or higher, and does nothing on older versions. - This option must be given the same value for all webviews. - **Linux / Android / iOS / macOS** : Unsupported. Only supports `Default` and performs no operation.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L899>  
`transparent?`| `boolean`| Whether the webview is transparent or not. Note that on `macOS` this requires the `macos-private-api` feature flag, enabled under `tauri.conf.json > app > macOSPrivateApi`. WARNING: Using private APIs on `macOS` prevents your application from being accepted to the `App Store`.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L730>  
`url?`| `string`| Remote URL or local file path to open. - URL such as `https://github.com/tauri-apps` is opened directly on a Tauri webview. - data: URL such as `data:text/html,<html>...` is only supported with the `webview-data-url` Cargo feature for the `tauri` dependency. - local file path or route such as `/path/to/page.html` or `/users` is appended to the application URL (the devServer URL on development, or `tauri://localhost/` and `https://tauri.localhost/` on production).| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L716>  
`useHttpsScheme?`| `boolean`| Sets whether the custom protocols should use `https://<scheme>.localhost` instead of the default `http://<scheme>.localhost` on Windows and Android. Defaults to `false`. #### Note Using a `https` scheme will NOT allow mixed content when trying to fetch `http` endpoints and therefore will not match the behavior of the `<scheme>://localhost` protocols used on macOS and Linux. #### Warning Changing this value between releases will change the IndexedDB, cookies and localstorage location and your app will not be able to access them. **Since** 2.1.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L795>  
`userAgent?`| `string`| The user agent for the webview.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L750>  
`width`| `number`| The initial width.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L722>  
`x`| `number`| The initial vertical position.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L718>  
`y`| `number`| The initial horizontal position.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L720>  
`zoomHotkeysEnabled?`| `boolean`| Whether page zooming by hotkeys is enabled Platform-specific: - **Windows** : Controls WebView2’s [`IsZoomControlEnabled`](https://learn.microsoft.com/en-us/microsoft-edge/webview2/reference/winrt/microsoft_web_webview2_core/corewebview2settings?view=webview2-winrt-1.0.2420.47#iszoomcontrolenabled) setting. - **MacOS / Linux** : Injects a polyfill that zooms in and out with `ctrl/command` \+ `-/=`, 20% in each step, ranging from 20% to 1000%. Requires `webview:allow-set-webview-zoom` permission - **Android / iOS** : Unsupported.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L780>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [Color](#color)

[Section titled “Color”](#color)
[code] 
    type Color: [number, number, number] | [number, number, number, number] | object | string;
[/code]

An RGBA color. Each value has minimum of 0 and maximum of 255.

It can be either a string `#ffffff`, an array of 3 or 4 elements or an object.

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2079>

* * *

### [DragDropEvent](#dragdropevent)

[Section titled “DragDropEvent”](#dragdropevent)
[code] 
    type DragDropEvent: object | object | object | object;
[/code]

The drag and drop event types.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L43>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [getAllWebviews()](#getallwebviews)

[Section titled “getAllWebviews()”](#getallwebviews)
[code] 
    function getAllWebviews(): Promise<Webview[]>
[/code]

Gets a list of instances of `Webview` for all available webviews.

#### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Webview`](/reference/javascript/api/namespacewebview/#webview)[]>

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L70>

* * *

### [getCurrentWebview()](#getcurrentwebview)

[Section titled “getCurrentWebview()”](#getcurrentwebview)
[code] 
    function getCurrentWebview(): Webview
[/code]

Get an instance of `Webview` for the current webview.

#### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`Webview`](/reference/javascript/api/namespacewebview/#webview)

#### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/webview.ts#L54>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacewebview](https://v2.tauri.app/reference/javascript/api/namespacewebview)