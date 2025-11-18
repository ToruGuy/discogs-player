# event

The event system allows you to emit events to the backend and listen to events from it.

This package is also accessible with `window.__TAURI__.event` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [TauriEvent](#taurievent)

[Section titled “TauriEvent”](#taurievent)

#### [Since](#since)

[Section titled “Since”](#since)

1.1.0

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [DRAG_DROP](#drag_drop)

[Section titled “DRAG_DROP”](#drag_drop)
[code] 
    DRAG_DROP: "tauri://drag-drop";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L71>

##### [DRAG_ENTER](#drag_enter)

[Section titled “DRAG_ENTER”](#drag_enter)
[code] 
    DRAG_ENTER: "tauri://drag-enter";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L69>

##### [DRAG_LEAVE](#drag_leave)

[Section titled “DRAG_LEAVE”](#drag_leave)
[code] 
    DRAG_LEAVE: "tauri://drag-leave";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L72>

##### [DRAG_OVER](#drag_over)

[Section titled “DRAG_OVER”](#drag_over)
[code] 
    DRAG_OVER: "tauri://drag-over";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L70>

##### [WEBVIEW_CREATED](#webview_created)

[Section titled “WEBVIEW_CREATED”](#webview_created)
[code] 
    WEBVIEW_CREATED: "tauri://webview-created";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L68>

##### [WINDOW_BLUR](#window_blur)

[Section titled “WINDOW_BLUR”](#window_blur)
[code] 
    WINDOW_BLUR: "tauri://blur";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L64>

##### [WINDOW_CLOSE_REQUESTED](#window_close_requested)

[Section titled “WINDOW_CLOSE_REQUESTED”](#window_close_requested)
[code] 
    WINDOW_CLOSE_REQUESTED: "tauri://close-requested";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L61>

##### [WINDOW_CREATED](#window_created)

[Section titled “WINDOW_CREATED”](#window_created)
[code] 
    WINDOW_CREATED: "tauri://window-created";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L67>

##### [WINDOW_DESTROYED](#window_destroyed)

[Section titled “WINDOW_DESTROYED”](#window_destroyed)
[code] 
    WINDOW_DESTROYED: "tauri://destroyed";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L62>

##### [WINDOW_FOCUS](#window_focus)

[Section titled “WINDOW_FOCUS”](#window_focus)
[code] 
    WINDOW_FOCUS: "tauri://focus";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L63>

##### [WINDOW_MOVED](#window_moved)

[Section titled “WINDOW_MOVED”](#window_moved)
[code] 
    WINDOW_MOVED: "tauri://move";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L60>

##### [WINDOW_RESIZED](#window_resized)

[Section titled “WINDOW_RESIZED”](#window_resized)
[code] 
    WINDOW_RESIZED: "tauri://resize";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L59>

##### [WINDOW_SCALE_FACTOR_CHANGED](#window_scale_factor_changed)

[Section titled “WINDOW_SCALE_FACTOR_CHANGED”](#window_scale_factor_changed)
[code] 
    WINDOW_SCALE_FACTOR_CHANGED: "tauri://scale-change";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L65>

##### [WINDOW_THEME_CHANGED](#window_theme_changed)

[Section titled “WINDOW_THEME_CHANGED”](#window_theme_changed)
[code] 
    WINDOW_THEME_CHANGED: "tauri://theme-changed";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L66>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [Event<T>](#eventt)

[Section titled “Event<T>”](#eventt)

#### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T`  
  
#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L32>  
`id`| `number`| Event identifier used to unlisten| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L34>  
`payload`| `T`| Event payload| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L36>  
  
* * *

### [Options](#options)

[Section titled “Options”](#options)

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`target?`| `string` | [`EventTarget`](/reference/javascript/api/namespaceevent/#eventtarget)| The event target to listen to, defaults to `{ kind: 'Any' }`, see [EventTarget](/reference/javascript/api/namespaceevent/#eventtarget). If a string is provided, EventTarget.AnyLabel is used.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L52>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [EventCallback()<T>](#eventcallbackt)

[Section titled “EventCallback()<T>”](#eventcallbackt)
[code] 
    type EventCallback<T>: (event) => void;
[/code]

#### [Type Parameters](#type-parameters-1)

[Section titled “Type Parameters”](#type-parameters-1)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`event`| [`Event`](/reference/javascript/api/namespaceevent/#eventt)<`T`>  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

`void`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L39>

* * *

### [EventName](#eventname)

[Section titled “EventName”](#eventname)
[code] 
    type EventName: `${TauriEvent}` | string & Record<never, never>;
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L44>

* * *

### [EventTarget](#eventtarget)

[Section titled “EventTarget”](#eventtarget)
[code] 
    type EventTarget:
    
      | object
    
      | object
    
      | object
    
      | object
    
      | object
    
      | object;
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L22>

* * *

### [UnlistenFn()](#unlistenfn)

[Section titled “UnlistenFn()”](#unlistenfn)
[code] 
    type UnlistenFn: () => void;
[/code]

#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

`void`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L42>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [emit()](#emit)

[Section titled “emit()”](#emit)
[code] 
    function emit<T>(event, payload?): Promise<void>
[/code]

Emits an event to all [targets](/reference/javascript/api/namespaceevent/#eventtarget).

#### [Type Parameters](#type-parameters-2)

[Section titled “Type Parameters”](#type-parameters-2)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`event`| `string`| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`payload`?| `T`| Event payload.  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { emit } from '@tauri-apps/api/event';
    
    await emit('frontend-loaded', { loggedIn: true, token: 'authToken' });
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L186>

* * *

### [emitTo()](#emitto)

[Section titled “emitTo()”](#emitto)
[code] 
    function emitTo<T>(
    
       target,
    
       event,
    
    payload?): Promise<void>
[/code]

Emits an event to all [targets](/reference/javascript/api/namespaceevent/#eventtarget) matching the given target.

#### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`target`| `string` | [`EventTarget`](/reference/javascript/api/namespaceevent/#eventtarget)| Label of the target Window/Webview/WebviewWindow or raw [EventTarget](/reference/javascript/api/namespaceevent/#eventtarget) object.  
`event`| `string`| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`payload`?| `T`| Event payload.  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { emitTo } from '@tauri-apps/api/event';
    
    await emitTo('main', 'frontend-loaded', { loggedIn: true, token: 'authToken' });
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L208>

* * *

### [listen()](#listen)

[Section titled “listen()”](#listen)
[code] 
    function listen<T>(
    
       event,
    
       handler,
    
    options?): Promise<UnlistenFn>
[/code]

Listen to an emitted event to any [target](/reference/javascript/api/namespaceevent/#eventtarget).

#### [Type Parameters](#type-parameters-4)

[Section titled “Type Parameters”](#type-parameters-4)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler callback.  
`options`?| [`Options`](/reference/javascript/api/namespaceevent/#options)| Event listening options.  
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { listen } from '@tauri-apps/api/event';
    
    const unlisten = await listen<string>('error', (event) => {
    
      console.log(`Got error, payload: ${event.payload}`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L113>

* * *

### [once()](#once)

[Section titled “once()”](#once)
[code] 
    function once<T>(
    
       event,
    
       handler,
    
    options?): Promise<UnlistenFn>
[/code]

Listens once to an emitted event to any [target](/reference/javascript/api/namespaceevent/#eventtarget).

#### [Type Parameters](#type-parameters-5)

[Section titled “Type Parameters”](#type-parameters-5)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler callback.  
`options`?| [`Options`](/reference/javascript/api/namespaceevent/#options)| Event listening options.  
  
#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { once } from '@tauri-apps/api/event';
    
    interface LoadedPayload {
    
      loggedIn: boolean,
    
      token: string
    
    }
    
    const unlisten = await once<LoadedPayload>('loaded', (event) => {
    
      console.log(`App is loaded, loggedIn: ${event.payload.loggedIn}, token: ${event.payload.token}`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/event.ts#L157>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespaceevent](https://v2.tauri.app/reference/javascript/api/namespaceevent)