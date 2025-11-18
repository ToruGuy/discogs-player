# window

Provides APIs to create windows, communicate with other windows and manipulate the current window.

#### [Window events](#window-events)

[Section titled “Window events”](#window-events)

Events can be listened to using [Window.listen](/reference/javascript/api/namespacewindow/#listen):
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    getCurrentWindow().listen("my-window-event", ({ event, payload }) => { });
[/code]

## [References](#references)

[Section titled “References”](#references)

### [Color](#color)

[Section titled “Color”](#color)

Re-exports [Color](/reference/javascript/api/namespacewebview/#color)

### [DragDropEvent](#dragdropevent)

[Section titled “DragDropEvent”](#dragdropevent)

Re-exports [DragDropEvent](/reference/javascript/api/namespacewebview/#dragdropevent)

### [LogicalPosition](#logicalposition)

[Section titled “LogicalPosition”](#logicalposition)

Re-exports [LogicalPosition](/reference/javascript/api/namespacedpi/#logicalposition)

### [LogicalSize](#logicalsize)

[Section titled “LogicalSize”](#logicalsize)

Re-exports [LogicalSize](/reference/javascript/api/namespacedpi/#logicalsize)

### [PhysicalPosition](#physicalposition)

[Section titled “PhysicalPosition”](#physicalposition)

Re-exports [PhysicalPosition](/reference/javascript/api/namespacedpi/#physicalposition)

### [PhysicalSize](#physicalsize)

[Section titled “PhysicalSize”](#physicalsize)

Re-exports [PhysicalSize](/reference/javascript/api/namespacedpi/#physicalsize)

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [BackgroundThrottlingPolicy](#backgroundthrottlingpolicy)

[Section titled “BackgroundThrottlingPolicy”](#backgroundthrottlingpolicy)

Background throttling policy

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [Disabled](#disabled)

[Section titled “Disabled”](#disabled)
[code] 
    Disabled: "disabled";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2091>

##### [Suspend](#suspend)

[Section titled “Suspend”](#suspend)
[code] 
    Suspend: "suspend";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2093>

##### [Throttle](#throttle)

[Section titled “Throttle”](#throttle)
[code] 
    Throttle: "throttle";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2092>

* * *

### [Effect](#effect)

[Section titled “Effect”](#effect)

Platform-specific window effects

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

#### [Enumeration Members](#enumeration-members-1)

[Section titled “Enumeration Members”](#enumeration-members-1)

##### [Acrylic](#acrylic)

[Section titled “Acrylic”](#acrylic)
[code] 
    Acrylic: "acrylic";
[/code]

**Windows 10/11**

#### [Notes](#notes)

[Section titled “Notes”](#notes)

This effect has bad performance when resizing/dragging the window on Windows 10 v1903+ and Windows 11 build 22000.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2230>

##### [~~AppearanceBased~~](#appearancebased)

[ Section titled “AppearanceBased”](#appearancebased)
[code] 
    AppearanceBased: "appearanceBased";
[/code]

A default material appropriate for the view’s effectiveAppearance. **macOS 10.14-**

###### [Deprecated](#deprecated)

[Section titled “Deprecated”](#deprecated)

since macOS 10.14. You should instead choose an appropriate semantic material.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2130>

##### [Blur](#blur)

[Section titled “Blur”](#blur)
[code] 
    Blur: "blur";
[/code]

**Windows 7/10/11(22H1) Only**

#### [Notes](#notes-1)

[Section titled “Notes”](#notes-1)

This effect has bad performance when resizing/dragging the window on Windows 11 build 22621.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2222>

##### [ContentBackground](#contentbackground)

[Section titled “ContentBackground”](#contentbackground)
[code] 
    ContentBackground: "contentBackground";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2202>

##### [~~Dark~~](#dark)

[ Section titled “Dark”](#dark)
[code] 
    Dark: "dark";
[/code]

**macOS 10.14-**

###### [Deprecated](#deprecated-1)

[Section titled “Deprecated”](#deprecated-1)

since macOS 10.14. Use a semantic material instead.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2142>

##### [FullScreenUI](#fullscreenui)

[Section titled “FullScreenUI”](#fullscreenui)
[code] 
    FullScreenUI: "fullScreenUI";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2194>

##### [HeaderView](#headerview)

[Section titled “HeaderView”](#headerview)
[code] 
    HeaderView: "headerView";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2178>

##### [HudWindow](#hudwindow)

[Section titled “HudWindow”](#hudwindow)
[code] 
    HudWindow: "hudWindow";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2190>

##### [~~Light~~](#light)

[ Section titled “Light”](#light)
[code] 
    Light: "light";
[/code]

**macOS 10.14-**

###### [Deprecated](#deprecated-2)

[Section titled “Deprecated”](#deprecated-2)

since macOS 10.14. Use a semantic material instead.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2136>

##### [~~MediumLight~~](#mediumlight)

[ Section titled “MediumLight”](#mediumlight)
[code] 
    MediumLight: "mediumLight";
[/code]

**macOS 10.14-**

###### [Deprecated](#deprecated-3)

[Section titled “Deprecated”](#deprecated-3)

since macOS 10.14. Use a semantic material instead.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2148>

##### [Menu](#menu)

[Section titled “Menu”](#menu)
[code] 
    Menu: "menu";
[/code]

**macOS 10.11+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2166>

##### [Mica](#mica)

[Section titled “Mica”](#mica)
[code] 
    Mica: "mica";
[/code]

**Windows 11 Only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2214>

##### [Popover](#popover)

[Section titled “Popover”](#popover)
[code] 
    Popover: "popover";
[/code]

**macOS 10.11+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2170>

##### [Selection](#selection)

[Section titled “Selection”](#selection)
[code] 
    Selection: "selection";
[/code]

**macOS 10.10+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2162>

##### [Sheet](#sheet)

[Section titled “Sheet”](#sheet)
[code] 
    Sheet: "sheet";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2182>

##### [Sidebar](#sidebar)

[Section titled “Sidebar”](#sidebar)
[code] 
    Sidebar: "sidebar";
[/code]

**macOS 10.11+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2174>

##### [Tabbed](#tabbed)

[Section titled “Tabbed”](#tabbed)
[code] 
    Tabbed: "tabbed";
[/code]

Tabbed effect that matches the system dark preference **Windows 11 Only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2234>

##### [TabbedDark](#tabbeddark)

[Section titled “TabbedDark”](#tabbeddark)
[code] 
    TabbedDark: "tabbedDark";
[/code]

Tabbed effect with dark mode but only if dark mode is enabled on the system **Windows 11 Only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2238>

##### [TabbedLight](#tabbedlight)

[Section titled “TabbedLight”](#tabbedlight)
[code] 
    TabbedLight: "tabbedLight";
[/code]

Tabbed effect with light mode **Windows 11 Only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2242>

##### [Titlebar](#titlebar)

[Section titled “Titlebar”](#titlebar)
[code] 
    Titlebar: "titlebar";
[/code]

**macOS 10.10+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2158>

##### [Tooltip](#tooltip)

[Section titled “Tooltip”](#tooltip)
[code] 
    Tooltip: "tooltip";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2198>

##### [~~UltraDark~~](#ultradark)

[ Section titled “UltraDark”](#ultradark)
[code] 
    UltraDark: "ultraDark";
[/code]

**macOS 10.14-**

###### [Deprecated](#deprecated-4)

[Section titled “Deprecated”](#deprecated-4)

since macOS 10.14. Use a semantic material instead.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2154>

##### [UnderPageBackground](#underpagebackground)

[Section titled “UnderPageBackground”](#underpagebackground)
[code] 
    UnderPageBackground: "underPageBackground";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2210>

##### [UnderWindowBackground](#underwindowbackground)

[Section titled “UnderWindowBackground”](#underwindowbackground)
[code] 
    UnderWindowBackground: "underWindowBackground";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2206>

##### [WindowBackground](#windowbackground)

[Section titled “WindowBackground”](#windowbackground)
[code] 
    WindowBackground: "windowBackground";
[/code]

**macOS 10.14+**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2186>

* * *

### [EffectState](#effectstate)

[Section titled “EffectState”](#effectstate)

Window effect state **macOS only**

#### [See](#see)

[Section titled “See”](#see)

<https://developer.apple.com/documentation/appkit/nsvisualeffectview/state>

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

#### [Enumeration Members](#enumeration-members-2)

[Section titled “Enumeration Members”](#enumeration-members-2)

##### [Active](#active)

[Section titled “Active”](#active)
[code] 
    Active: "active";
[/code]

Make window effect state always active **macOS only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2260>

##### [FollowsWindowActiveState](#followswindowactivestate)

[Section titled “FollowsWindowActiveState”](#followswindowactivestate)
[code] 
    FollowsWindowActiveState: "followsWindowActiveState";
[/code]

Make window effect state follow the window’s active state **macOS only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2256>

##### [Inactive](#inactive)

[Section titled “Inactive”](#inactive)
[code] 
    Inactive: "inactive";
[/code]

Make window effect state always inactive **macOS only**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2264>

* * *

### [ProgressBarStatus](#progressbarstatus)

[Section titled “ProgressBarStatus”](#progressbarstatus)

#### [Enumeration Members](#enumeration-members-3)

[Section titled “Enumeration Members”](#enumeration-members-3)

##### [Error](#error)

[Section titled “Error”](#error)
[code] 
    Error: "error";
[/code]

Error state. **Treated as Normal on linux**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L190>

##### [Indeterminate](#indeterminate)

[Section titled “Indeterminate”](#indeterminate)
[code] 
    Indeterminate: "indeterminate";
[/code]

Indeterminate state. **Treated as Normal on Linux and macOS**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L182>

##### [None](#none)

[Section titled “None”](#none)
[code] 
    None: "none";
[/code]

Hide progress bar.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L174>

##### [Normal](#normal)

[Section titled “Normal”](#normal)
[code] 
    Normal: "normal";
[/code]

Normal state.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L178>

##### [Paused](#paused)

[Section titled “Paused”](#paused)
[code] 
    Paused: "paused";
[/code]

Paused state. **Treated as Normal on Linux**

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L186>

* * *

### [ScrollBarStyle](#scrollbarstyle)

[Section titled “ScrollBarStyle”](#scrollbarstyle)

The scrollbar style to use in the webview.

## [Platform-specific](#platform-specific)

[Section titled “Platform-specific”](#platform-specific)

**Windows** : This option must be given the same value for all webviews.

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.8.0

#### [Enumeration Members](#enumeration-members-4)

[Section titled “Enumeration Members”](#enumeration-members-4)

##### [Default](#default)

[Section titled “Default”](#default)
[code] 
    Default: "default";
[/code]

The default scrollbar style for the webview.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2109>

##### [FluentOverlay](#fluentoverlay)

[Section titled “FluentOverlay”](#fluentoverlay)
[code] 
    FluentOverlay: "fluentOverlay";
[/code]

Fluent UI style overlay scrollbars. **Windows Only**

Requires WebView2 Runtime version 125.0.2535.41 or higher, does nothing on older versions, see <https://learn.microsoft.com/en-us/microsoft-edge/webview2/release-notes/?tabs=dotnetcsharp#10253541>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2116>

* * *

### [UserAttentionType](#userattentiontype)

[Section titled “UserAttentionType”](#userattentiontype)

Attention type to request on a window.

#### [Since](#since-4)

[Section titled “Since”](#since-4)

1.0.0

#### [Enumeration Members](#enumeration-members-5)

[Section titled “Enumeration Members”](#enumeration-members-5)

##### [Critical](#critical)

[Section titled “Critical”](#critical)
[code] 
    Critical: 1;
[/code]

Platform-specific

  * **macOS:** Bounces the dock icon until the application is in focus.
  * **Windows:** Flashes both the window and the taskbar button until the application is in focus.


**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L99>

##### [Informational](#informational)

[Section titled “Informational”](#informational)
[code] 
    Informational: 2;
[/code]

Platform-specific

  * **macOS:** Bounces the dock icon once.
  * **Windows:** Flashes the taskbar button until the application is in focus.


**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L105>

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [CloseRequestedEvent](#closerequestedevent)

[Section titled “CloseRequestedEvent”](#closerequestedevent)

#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new CloseRequestedEvent()](#new-closerequestedevent)

[Section titled “new CloseRequestedEvent()”](#new-closerequestedevent)
[code] 
    new CloseRequestedEvent(event): CloseRequestedEvent
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`event`| [`Event`](/reference/javascript/api/namespaceevent/#eventt)<`unknown`>  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`CloseRequestedEvent`](/reference/javascript/api/namespacewindow/#closerequestedevent)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L115>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L110>  
`id`| `number`| Event identifier used to unlisten| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L112>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [isPreventDefault()](#ispreventdefault)

[Section titled “isPreventDefault()”](#ispreventdefault)
[code] 
    isPreventDefault(): boolean
[/code]

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

`boolean`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L124>

##### [preventDefault()](#preventdefault)

[Section titled “preventDefault()”](#preventdefault)
[code] 
    preventDefault(): void
[/code]

###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

`void`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L120>

* * *

### [Window](#window)

[Section titled “Window”](#window)

Create new window or get a handle to an existing one.

Windows are identified by a _label_ a unique identifier that can be used to reference it later. It may only contain alphanumeric characters `a-zA-Z` plus the following special characters `-`, `/`, `:` and `_`.

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { Window } from "@tauri-apps/api/window"
    
    
    
    
    const appWindow = new Window('theUniqueLabel');
    
    
    
    
    appWindow.once('tauri://created', function () {
    
     // window successfully created
    
    });
    
    appWindow.once('tauri://error', function (e) {
    
     // an error happened creating the window
    
    });
    
    
    
    
    // emit an event to the backend
    
    await appWindow.emit("some-event", "data");
    
    // listen to an event from the backend
    
    const unlisten = await appWindow.listen("event-name", e => {});
    
    unlisten();
[/code]

#### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

#### [Extended by](#extended-by)

[Section titled “Extended by”](#extended-by)

  * [`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)


#### [Constructors](#constructors-1)

[Section titled “Constructors”](#constructors-1)

##### [new Window()](#new-window)

[Section titled “new Window()”](#new-window)
[code] 
    new Window(label, options): Window
[/code]

Creates a new Window.

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`label`| `string`| The unique window label. Must be alphanumeric: `a-zA-Z-/:_`.  
`options`| [`WindowOptions`](/reference/javascript/api/namespacewindow/#windowoptions)| -  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Window`](/reference/javascript/api/namespacewindow/#window)

The [Window](/reference/javascript/api/namespacewindow/#window) instance to communicate with the window.

###### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { Window } from '@tauri-apps/api/window';
    
    const appWindow = new Window('my-label');
    
    appWindow.once('tauri://created', function () {
    
     // window successfully created
    
    });
    
    appWindow.once('tauri://error', function (e) {
    
     // an error happened creating the window
    
    });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L298>

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`label`| `string`| The window label. It is a unique identifier for the window, can be used to reference it later.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L276>  
`listeners`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`any`>[]>| Local event listeners.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L279>  
  
#### [Methods](#methods-1)

[Section titled “Methods”](#methods-1)

##### [center()](#center)

[Section titled “center()”](#center)
[code] 
    center(): Promise<void>
[/code]

Centers the window.

###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().center();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L835>

##### [clearEffects()](#cleareffects)

[Section titled “clearEffects()”](#cleareffects)
[code] 
    clearEffects(): Promise<void>
[/code]

Clear any applied effects if possible.

###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1223>

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Closes the window.

Note this emits a closeRequested event so you can intercept it. To force window close, use [Window.destroy](/reference/javascript/api/namespacewindow/#destroy).

###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().close();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1144>

##### [destroy()](#destroy)

[Section titled “destroy()”](#destroy)
[code] 
    destroy(): Promise<void>
[/code]

Destroys the window. Behaves like [Window.close](/reference/javascript/api/namespacewindow/#close) but forces the window close instead of emitting a closeRequested event.

###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().destroy();
[/code]

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
  
###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`event`| `string`| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`payload`?| `T`| Event payload.  
  
###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().emit('window-loaded', { loggedIn: true, token: 'authToken' });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L449>

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
  
###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type| Description  
---|---|---  
`target`| `string` | [`EventTarget`](/reference/javascript/api/namespaceevent/#eventtarget)| Label of the target Window/Webview/WebviewWindow or raw [EventTarget](/reference/javascript/api/namespaceevent/#eventtarget) object.  
`event`| `string`| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`payload`?| `T`| Event payload.  
  
###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().emit('main', 'window-loaded', { loggedIn: true, token: 'authToken' });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L476>

##### [hide()](#hide)

[Section titled “hide()”](#hide)
[code] 
    hide(): Promise<void>
[/code]

Sets the window visibility to false.

###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().hide();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1126>

##### [innerPosition()](#innerposition)

[Section titled “innerPosition()”](#innerposition)
[code] 
    innerPosition(): Promise<PhysicalPosition>
[/code]

The position of the top-left hand corner of the window’s client area relative to the top-left hand corner of the desktop.

###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

The window’s inner position.

###### [Example](#example-8)

[Section titled “Example”](#example-8)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const position = await getCurrentWindow().innerPosition();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L537>

##### [innerSize()](#innersize)

[Section titled “innerSize()”](#innersize)
[code] 
    innerSize(): Promise<PhysicalSize>
[/code]

The physical size of the window’s client area. The client area is the content of the window, excluding the title bar and borders.

###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>

The window’s inner size.

###### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const size = await getCurrentWindow().innerSize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L570>

##### [isAlwaysOnTop()](#isalwaysontop)

[Section titled “isAlwaysOnTop()”](#isalwaysontop)
[code] 
    isAlwaysOnTop(): Promise<boolean>
[/code]

Whether the window is configured to be always on top of other windows or not.

###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is visible or not.

###### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const alwaysOnTop = await getCurrentWindow().isAlwaysOnTop();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L817>

##### [isClosable()](#isclosable)

[Section titled “isClosable()”](#isclosable)
[code] 
    isClosable(): Promise<boolean>
[/code]

Gets the window’s native close button state.

Platform-specific

  * **iOS / Android:** Unsupported.


###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window’s native close button is enabled or not.

###### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const closable = await getCurrentWindow().isClosable();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L750>

##### [isDecorated()](#isdecorated)

[Section titled “isDecorated()”](#isdecorated)
[code] 
    isDecorated(): Promise<boolean>
[/code]

Gets the window’s current decorated state.

###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is decorated or not.

###### [Example](#example-12)

[Section titled “Example”](#example-12)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const decorated = await getCurrentWindow().isDecorated();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L671>

##### [isEnabled()](#isenabled)

[Section titled “isEnabled()”](#isenabled)
[code] 
    isEnabled(): Promise<boolean>
[/code]

Whether the window is enabled or disabled.

###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

A promise indicating the success or failure of the operation.

###### [Example](#example-13)

[Section titled “Example”](#example-13)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setEnabled(false);
[/code]

###### [Since](#since-6)

[Section titled “Since”](#since-6)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L927>

##### [isFocused()](#isfocused)

[Section titled “isFocused()”](#isfocused)
[code] 
    isFocused(): Promise<boolean>
[/code]

Gets the window’s current focus state.

###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is focused or not.

###### [Example](#example-14)

[Section titled “Example”](#example-14)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const focused = await getCurrentWindow().isFocused();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L655>

##### [isFullscreen()](#isfullscreen)

[Section titled “isFullscreen()”](#isfullscreen)
[code] 
    isFullscreen(): Promise<boolean>
[/code]

Gets the window’s current fullscreen state.

###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is in fullscreen mode or not.

###### [Example](#example-15)

[Section titled “Example”](#example-15)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const fullscreen = await getCurrentWindow().isFullscreen();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L609>

##### [isMaximizable()](#ismaximizable)

[Section titled “isMaximizable()”](#ismaximizable)
[code] 
    isMaximizable(): Promise<boolean>
[/code]

Gets the window’s native maximize button state.

Platform-specific

  * **Linux / iOS / Android:** Unsupported.


###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window’s native maximize button is enabled or not.

###### [Example](#example-16)

[Section titled “Example”](#example-16)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const maximizable = await getCurrentWindow().isMaximizable();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L708>

##### [isMaximized()](#ismaximized)

[Section titled “isMaximized()”](#ismaximized)
[code] 
    isMaximized(): Promise<boolean>
[/code]

Gets the window’s current maximized state.

###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is maximized or not.

###### [Example](#example-17)

[Section titled “Example”](#example-17)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const maximized = await getCurrentWindow().isMaximized();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L639>

##### [isMinimizable()](#isminimizable)

[Section titled “isMinimizable()”](#isminimizable)
[code] 
    isMinimizable(): Promise<boolean>
[/code]

Gets the window’s native minimize button state.

Platform-specific

  * **Linux / iOS / Android:** Unsupported.


###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window’s native minimize button is enabled or not.

###### [Example](#example-18)

[Section titled “Example”](#example-18)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const minimizable = await getCurrentWindow().isMinimizable();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L729>

##### [isMinimized()](#isminimized)

[Section titled “isMinimized()”](#isminimized)
[code] 
    isMinimized(): Promise<boolean>
[/code]

Gets the window’s current minimized state.

###### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Example](#example-19)

[Section titled “Example”](#example-19)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const minimized = await getCurrentWindow().isMinimized();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L623>

##### [isResizable()](#isresizable)

[Section titled “isResizable()”](#isresizable)
[code] 
    isResizable(): Promise<boolean>
[/code]

Gets the window’s current resizable state.

###### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is resizable or not.

###### [Example](#example-20)

[Section titled “Example”](#example-20)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const resizable = await getCurrentWindow().isResizable();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L687>

##### [isVisible()](#isvisible)

[Section titled “isVisible()”](#isvisible)
[code] 
    isVisible(): Promise<boolean>
[/code]

Gets the window’s current visible state.

###### [Returns](#returns-24)

[Section titled “Returns”](#returns-24)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

Whether the window is visible or not.

###### [Example](#example-21)

[Section titled “Example”](#example-21)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const visible = await getCurrentWindow().isVisible();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L766>

##### [listen()](#listen)

[Section titled “listen()”](#listen)
[code] 
    listen<T>(event, handler): Promise<UnlistenFn>
[/code]

Listen to an emitted event on this window.

###### [Type Parameters](#type-parameters-2)

[Section titled “Type Parameters”](#type-parameters-2)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler.  
  
###### [Returns](#returns-25)

[Section titled “Returns”](#returns-25)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-22)

[Section titled “Example”](#example-22)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const unlisten = await getCurrentWindow().listen<string>('state-changed', (event) => {
    
      console.log(`Got error: ${payload}`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L387>

##### [maximize()](#maximize)

[Section titled “maximize()”](#maximize)
[code] 
    maximize(): Promise<void>
[/code]

Maximizes the window.

###### [Returns](#returns-26)

[Section titled “Returns”](#returns-26)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-23)

[Section titled “Example”](#example-23)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().maximize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1030>

##### [minimize()](#minimize)

[Section titled “minimize()”](#minimize)
[code] 
    minimize(): Promise<void>
[/code]

Minimizes the window.

###### [Returns](#returns-27)

[Section titled “Returns”](#returns-27)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-24)

[Section titled “Example”](#example-24)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().minimize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1078>

##### [onCloseRequested()](#oncloserequested)

[Section titled “onCloseRequested()”](#oncloserequested)
[code] 
    onCloseRequested(handler): Promise<UnlistenFn>
[/code]

Listen to window close requested. Emitted when the user requests to closes the window.

###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`handler`| (`event`) => `void` | [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>  
  
###### [Returns](#returns-28)

[Section titled “Returns”](#returns-28)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-25)

[Section titled “Example”](#example-25)
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

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1885>

##### [onDragDropEvent()](#ondragdropevent)

[Section titled “onDragDropEvent()”](#ondragdropevent)
[code] 
    onDragDropEvent(handler): Promise<UnlistenFn>
[/code]

Listen to a file drop event. The listener is triggered when the user hovers the selected files on the webview, drops the files or cancels the operation.

###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`DragDropEvent`](/reference/javascript/api/namespacewebview/#dragdropevent)>  
  
###### [Returns](#returns-29)

[Section titled “Returns”](#returns-29)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-26)

[Section titled “Example”](#example-26)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/webview";
    
    const unlisten = await getCurrentWindow().onDragDropEvent((event) => {
    
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

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1923>

##### [onFocusChanged()](#onfocuschanged)

[Section titled “onFocusChanged()”](#onfocuschanged)
[code] 
    onFocusChanged(handler): Promise<UnlistenFn>
[/code]

Listen to window focus change.

###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`boolean`>  
  
###### [Returns](#returns-30)

[Section titled “Returns”](#returns-30)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-27)

[Section titled “Example”](#example-27)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
    
     console.log('Focus changed, window is focused? ' + focused);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2001>

##### [onMoved()](#onmoved)

[Section titled “onMoved()”](#onmoved)
[code] 
    onMoved(handler): Promise<UnlistenFn>
[/code]

Listen to window move.

###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>  
  
###### [Returns](#returns-31)

[Section titled “Returns”](#returns-31)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-28)

[Section titled “Example”](#example-28)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onMoved(({ payload: position }) => {
    
     console.log('Window moved', position);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1856>

##### [onResized()](#onresized)

[Section titled “onResized()”](#onresized)
[code] 
    onResized(handler): Promise<UnlistenFn>
[/code]

Listen to window resize.

###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>  
  
###### [Returns](#returns-32)

[Section titled “Returns”](#returns-32)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-29)

[Section titled “Example”](#example-29)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onResized(({ payload: size }) => {
    
     console.log('Window resized', size);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

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


###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`ScaleFactorChanged`](/reference/javascript/api/namespacewindow/#scalefactorchanged)>  
  
###### [Returns](#returns-33)

[Section titled “Returns”](#returns-33)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-30)

[Section titled “Example”](#example-30)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onScaleChanged(({ payload }) => {
    
     console.log('Scale changed', payload.scaleFactor, payload.size);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2041>

##### [onThemeChanged()](#onthemechanged)

[Section titled “onThemeChanged()”](#onthemechanged)
[code] 
    onThemeChanged(handler): Promise<UnlistenFn>
[/code]

Listen to the system theme change.

###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type  
---|---  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<[`Theme`](/reference/javascript/api/namespacewindow/#theme-2)>  
  
###### [Returns](#returns-34)

[Section titled “Returns”](#returns-34)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-31)

[Section titled “Example”](#example-31)
[code] 
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    const unlisten = await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
    
     console.log('New theme: ' + theme);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2067>

##### [once()](#once)

[Section titled “once()”](#once)
[code] 
    once<T>(event, handler): Promise<UnlistenFn>
[/code]

Listen to an emitted event on this window only once.

###### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type| Description  
---|---|---  
`event`| [`EventName`](/reference/javascript/api/namespaceevent/#eventname)| Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.  
`handler`| [`EventCallback`](/reference/javascript/api/namespaceevent/#eventcallbackt)<`T`>| Event handler.  
  
###### [Returns](#returns-35)

[Section titled “Returns”](#returns-35)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`UnlistenFn`](/reference/javascript/api/namespaceevent/#unlistenfn)>

A promise resolving to a function to unlisten to the event. Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.

###### [Example](#example-32)

[Section titled “Example”](#example-32)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const unlisten = await getCurrentWindow().once<null>('initialized', (event) => {
    
      console.log(`Window initialized!`);
    
    });
    
    
    
    
    // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
    
    unlisten();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L422>

##### [outerPosition()](#outerposition)

[Section titled “outerPosition()”](#outerposition)
[code] 
    outerPosition(): Promise<PhysicalPosition>
[/code]

The position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.

###### [Returns](#returns-36)

[Section titled “Returns”](#returns-36)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

The window’s outer position.

###### [Example](#example-33)

[Section titled “Example”](#example-33)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const position = await getCurrentWindow().outerPosition();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L553>

##### [outerSize()](#outersize)

[Section titled “outerSize()”](#outersize)
[code] 
    outerSize(): Promise<PhysicalSize>
[/code]

The physical size of the entire window. These dimensions include the title bar and borders. If you don’t want that (and you usually don’t), use inner_size instead.

###### [Returns](#returns-37)

[Section titled “Returns”](#returns-37)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)>

The window’s outer size.

###### [Example](#example-34)

[Section titled “Example”](#example-34)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const size = await getCurrentWindow().outerSize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L590>

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

###### [Example](#example-35)

[Section titled “Example”](#example-35)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().requestUserAttention();
[/code]

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

###### [Example](#example-36)

[Section titled “Example”](#example-36)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const factor = await getCurrentWindow().scaleFactor();
[/code]

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

###### [Example](#example-37)

[Section titled “Example”](#example-37)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setAlwaysOnBottom(true);
[/code]

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

###### [Example](#example-38)

[Section titled “Example”](#example-38)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setAlwaysOnTop(true);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1241>

##### [setBackgroundColor()](#setbackgroundcolor)

[Section titled “setBackgroundColor()”](#setbackgroundcolor)
[code] 
    setBackgroundColor(color): Promise<void>
[/code]

Sets the window background color.

Platform-specific:

  * **Windows:** alpha channel is ignored.
  * **iOS / Android:** Unsupported.


###### [Parameters](#parameters-16)

[Section titled “Parameters”](#parameters-16)

Parameter| Type  
---|---  
`color`| [`Color`](/reference/javascript/api/namespacewebview/#color)  
  
###### [Returns](#returns-42)

[Section titled “Returns”](#returns-42)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Since](#since-7)

[Section titled “Since”](#since-7)

2.1.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1593>

##### [setBadgeCount()](#setbadgecount)

[Section titled “setBadgeCount()”](#setbadgecount)
[code] 
    setBadgeCount(count?): Promise<void>
[/code]

Sets the badge count. It is app wide and not specific to this window.

Platform-specific

  * **Windows** : Unsupported. Use @{linkcode Window.setOverlayIcon} instead.


###### [Parameters](#parameters-17)

[Section titled “Parameters”](#parameters-17)

Parameter| Type| Description  
---|---|---  
`count`?| `number`| The badge count. Use `undefined` to remove the badge.  
  
###### [Returns](#returns-43)

[Section titled “Returns”](#returns-43)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-39)

[Section titled “Example”](#example-39)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setBadgeCount(5);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1685>

##### [setBadgeLabel()](#setbadgelabel)

[Section titled “setBadgeLabel()”](#setbadgelabel)
[code] 
    setBadgeLabel(label?): Promise<void>
[/code]

Sets the badge cont **macOS only**.

###### [Parameters](#parameters-18)

[Section titled “Parameters”](#parameters-18)

Parameter| Type| Description  
---|---|---  
`label`?| `string`| The badge label. Use `undefined` to remove the badge.  
  
###### [Returns](#returns-44)

[Section titled “Returns”](#returns-44)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-40)

[Section titled “Example”](#example-40)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setBadgeLabel("Hello");
[/code]

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


###### [Parameters](#parameters-19)

[Section titled “Parameters”](#parameters-19)

Parameter| Type  
---|---  
`closable`| `boolean`  
  
###### [Returns](#returns-45)

[Section titled “Returns”](#returns-45)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-41)

[Section titled “Example”](#example-41)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setClosable(false);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L995>

##### [setContentProtected()](#setcontentprotected)

[Section titled “setContentProtected()”](#setcontentprotected)
[code] 
    setContentProtected(protected_): Promise<void>
[/code]

Prevents the window contents from being captured by other apps.

###### [Parameters](#parameters-20)

[Section titled “Parameters”](#parameters-20)

Parameter| Type  
---|---  
`protected_`| `boolean`  
  
###### [Returns](#returns-46)

[Section titled “Returns”](#returns-46)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-42)

[Section titled “Example”](#example-42)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setContentProtected(true);
[/code]

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


###### [Parameters](#parameters-21)

[Section titled “Parameters”](#parameters-21)

Parameter| Type| Description  
---|---|---  
`grab`| `boolean`| `true` to grab the cursor icon, `false` to release it.  
  
###### [Returns](#returns-47)

[Section titled “Returns”](#returns-47)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-43)

[Section titled “Example”](#example-43)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorGrab(true);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1532>

##### [setCursorIcon()](#setcursoricon)

[Section titled “setCursorIcon()”](#setcursoricon)
[code] 
    setCursorIcon(icon): Promise<void>
[/code]

Modifies the cursor icon of the window.

###### [Parameters](#parameters-22)

[Section titled “Parameters”](#parameters-22)

Parameter| Type| Description  
---|---|---  
`icon`| [`CursorIcon`](/reference/javascript/api/namespacewindow/#cursoricon)| The new cursor icon.  
  
###### [Returns](#returns-48)

[Section titled “Returns”](#returns-48)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-44)

[Section titled “Example”](#example-44)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorIcon('help');
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1574>

##### [setCursorPosition()](#setcursorposition)

[Section titled “setCursorPosition()”](#setcursorposition)
[code] 
    setCursorPosition(position): Promise<void>
[/code]

Changes the position of the cursor in window coordinates.

###### [Parameters](#parameters-23)

[Section titled “Parameters”](#parameters-23)

Parameter| Type| Description  
---|---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition) | [`Position`](/reference/javascript/api/namespacedpi/#position)| The new cursor position.  
  
###### [Returns](#returns-49)

[Section titled “Returns”](#returns-49)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-45)

[Section titled “Example”](#example-45)
[code] 
    import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorPosition(new LogicalPosition(600, 300));
[/code]

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


###### [Parameters](#parameters-24)

[Section titled “Parameters”](#parameters-24)

Parameter| Type| Description  
---|---|---  
`visible`| `boolean`| If `false`, this will hide the cursor. If `true`, this will show the cursor.  
  
###### [Returns](#returns-50)

[Section titled “Returns”](#returns-50)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-46)

[Section titled “Example”](#example-46)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setCursorVisible(false);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1556>

##### [setDecorations()](#setdecorations)

[Section titled “setDecorations()”](#setdecorations)
[code] 
    setDecorations(decorations): Promise<void>
[/code]

Whether the window should have borders and bars.

###### [Parameters](#parameters-25)

[Section titled “Parameters”](#parameters-25)

Parameter| Type| Description  
---|---|---  
`decorations`| `boolean`| Whether the window should have borders and bars.  
  
###### [Returns](#returns-51)

[Section titled “Returns”](#returns-51)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-47)

[Section titled “Example”](#example-47)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setDecorations(false);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1177>

##### [setEffects()](#seteffects)

[Section titled “setEffects()”](#seteffects)
[code] 
    setEffects(effects): Promise<void>
[/code]

Set window effects.

###### [Parameters](#parameters-26)

[Section titled “Parameters”](#parameters-26)

Parameter| Type  
---|---  
`effects`| [`Effects`](/reference/javascript/api/namespacewindow/#effects)  
  
###### [Returns](#returns-52)

[Section titled “Returns”](#returns-52)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1213>

##### [setEnabled()](#setenabled)

[Section titled “setEnabled()”](#setenabled)
[code] 
    setEnabled(enabled): Promise<void>
[/code]

Enable or disable the window.

###### [Parameters](#parameters-27)

[Section titled “Parameters”](#parameters-27)

Parameter| Type  
---|---  
`enabled`| `boolean`  
  
###### [Returns](#returns-53)

[Section titled “Returns”](#returns-53)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-48)

[Section titled “Example”](#example-48)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setEnabled(false);
[/code]

###### [Since](#since-8)

[Section titled “Since”](#since-8)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L908>

##### [setFocus()](#setfocus)

[Section titled “setFocus()”](#setfocus)
[code] 
    setFocus(): Promise<void>
[/code]

Bring the window to front and focus.

###### [Returns](#returns-54)

[Section titled “Returns”](#returns-54)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-49)

[Section titled “Example”](#example-49)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setFocus();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1434>

##### [setFocusable()](#setfocusable)

[Section titled “setFocusable()”](#setfocusable)
[code] 
    setFocusable(focusable): Promise<void>
[/code]

Sets whether the window can be focused.

Platform-specific

  * **macOS** : If the window is already focused, it is not possible to unfocus it after calling `set_focusable(false)`. In this case, you might consider calling [Window.setFocus](/reference/javascript/api/namespacewindow/#setfocus) but it will move the window to the back i.e. at the bottom in terms of z-order.


###### [Parameters](#parameters-28)

[Section titled “Parameters”](#parameters-28)

Parameter| Type| Description  
---|---|---  
`focusable`| `boolean`| Whether the window can be focused.  
  
###### [Returns](#returns-55)

[Section titled “Returns”](#returns-55)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-50)

[Section titled “Example”](#example-50)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setFocusable(true);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1457>

##### [setFullscreen()](#setfullscreen)

[Section titled “setFullscreen()”](#setfullscreen)
[code] 
    setFullscreen(fullscreen): Promise<void>
[/code]

Sets the window fullscreen state.

###### [Parameters](#parameters-29)

[Section titled “Parameters”](#parameters-29)

Parameter| Type| Description  
---|---|---  
`fullscreen`| `boolean`| Whether the window should go to fullscreen or not.  
  
###### [Returns](#returns-56)

[Section titled “Returns”](#returns-56)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-51)

[Section titled “Example”](#example-51)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setFullscreen(true);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1401>

##### [setIcon()](#seticon)

[Section titled “setIcon()”](#seticon)
[code] 
    setIcon(icon): Promise<void>
[/code]

Sets the window icon.

###### [Parameters](#parameters-30)

[Section titled “Parameters”](#parameters-30)

Parameter| Type| Description  
---|---|---  
`icon`| | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)| Icon bytes or path to the icon file.  
  
###### [Returns](#returns-57)

[Section titled “Returns”](#returns-57)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-52)

[Section titled “Example”](#example-52)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setIcon('/tauri/awesome.png');
[/code]

Note that you may need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file:
[code] 
    [dependencies]
    
    tauri = { version = "...", features = ["...", "image-png"] }
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1482>

##### [setIgnoreCursorEvents()](#setignorecursorevents)

[Section titled “setIgnoreCursorEvents()”](#setignorecursorevents)
[code] 
    setIgnoreCursorEvents(ignore): Promise<void>
[/code]

Changes the cursor events behavior.

###### [Parameters](#parameters-31)

[Section titled “Parameters”](#parameters-31)

Parameter| Type| Description  
---|---|---  
`ignore`| `boolean`| `true` to ignore the cursor events; `false` to process them as usual.  
  
###### [Returns](#returns-58)

[Section titled “Returns”](#returns-58)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-53)

[Section titled “Example”](#example-53)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setIgnoreCursorEvents(true);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1629>

##### [setMaxSize()](#setmaxsize)

[Section titled “setMaxSize()”](#setmaxsize)
[code] 
    setMaxSize(size): Promise<void>
[/code]

Sets the window maximum inner size. If the `size` argument is undefined, the constraint is unset.

###### [Parameters](#parameters-32)

[Section titled “Parameters”](#parameters-32)

Parameter| Type| Description  
---|---|---  
`size`| | `undefined` | `null` | [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical inner size, or `null` to unset the constraint.  
  
###### [Returns](#returns-59)

[Section titled “Returns”](#returns-59)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-54)

[Section titled “Example”](#example-54)
[code] 
    import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMaxSize(new LogicalSize(600, 500));
[/code]

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


###### [Parameters](#parameters-33)

[Section titled “Parameters”](#parameters-33)

Parameter| Type  
---|---  
`maximizable`| `boolean`  
  
###### [Returns](#returns-60)

[Section titled “Returns”](#returns-60)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-55)

[Section titled “Example”](#example-55)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMaximizable(false);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L950>

##### [setMinSize()](#setminsize)

[Section titled “setMinSize()”](#setminsize)
[code] 
    setMinSize(size): Promise<void>
[/code]

Sets the window minimum inner size. If the `size` argument is not provided, the constraint is unset.

###### [Parameters](#parameters-34)

[Section titled “Parameters”](#parameters-34)

Parameter| Type| Description  
---|---|---  
`size`| | `undefined` | `null` | [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical inner size, or `null` to unset the constraint.  
  
###### [Returns](#returns-61)

[Section titled “Returns”](#returns-61)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-56)

[Section titled “Example”](#example-56)
[code] 
    import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMinSize(new PhysicalSize(600, 500));
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1312>

##### [setMinimizable()](#setminimizable)

[Section titled “setMinimizable()”](#setminimizable)
[code] 
    setMinimizable(minimizable): Promise<void>
[/code]

Sets whether the window’s native minimize button is enabled or not.

Platform-specific

  * **Linux / iOS / Android:** Unsupported.


###### [Parameters](#parameters-35)

[Section titled “Parameters”](#parameters-35)

Parameter| Type  
---|---  
`minimizable`| `boolean`  
  
###### [Returns](#returns-62)

[Section titled “Returns”](#returns-62)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-57)

[Section titled “Example”](#example-57)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setMinimizable(false);
[/code]

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

###### [Parameters](#parameters-36)

[Section titled “Parameters”](#parameters-36)

Parameter| Type| Description  
---|---|---  
`icon`?| | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)| Icon bytes or path to the icon file. Use `undefined` to remove the overlay icon.  
  
###### [Returns](#returns-63)

[Section titled “Returns”](#returns-63)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-58)

[Section titled “Example”](#example-58)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setOverlayIcon("/tauri/awesome.png");
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1733>

##### [setPosition()](#setposition)

[Section titled “setPosition()”](#setposition)
[code] 
    setPosition(position): Promise<void>
[/code]

Sets the window outer position.

###### [Parameters](#parameters-37)

[Section titled “Parameters”](#parameters-37)

Parameter| Type| Description  
---|---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition) | [`Position`](/reference/javascript/api/namespacedpi/#position)| The new position, in logical or physical pixels.  
  
###### [Returns](#returns-64)

[Section titled “Returns”](#returns-64)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-59)

[Section titled “Example”](#example-59)
[code] 
    import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setPosition(new LogicalPosition(600, 500));
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1381>

##### [setProgressBar()](#setprogressbar)

[Section titled “setProgressBar()”](#setprogressbar)
[code] 
    setProgressBar(state): Promise<void>
[/code]

Sets the taskbar progress state.

Platform-specific

  * **Linux / macOS** : Progress bar is app-wide and not specific to this window.
  * **Linux** : Only supported desktop environments with `libunity` (e.g. GNOME).


###### [Parameters](#parameters-38)

[Section titled “Parameters”](#parameters-38)

Parameter| Type  
---|---  
`state`| [`ProgressBarState`](/reference/javascript/api/namespacewindow/#progressbarstate)  
  
###### [Returns](#returns-65)

[Section titled “Returns”](#returns-65)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-60)

[Section titled “Example”](#example-60)
[code] 
    import { getCurrentWindow, ProgressBarStatus } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setProgressBar({
    
      status: ProgressBarStatus.Normal,
    
      progress: 50,
    
    });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1761>

##### [setResizable()](#setresizable)

[Section titled “setResizable()”](#setresizable)
[code] 
    setResizable(resizable): Promise<void>
[/code]

Updates the window resizable flag.

###### [Parameters](#parameters-39)

[Section titled “Parameters”](#parameters-39)

Parameter| Type  
---|---  
`resizable`| `boolean`  
  
###### [Returns](#returns-66)

[Section titled “Returns”](#returns-66)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-61)

[Section titled “Example”](#example-61)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setResizable(false);
[/code]

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


###### [Parameters](#parameters-40)

[Section titled “Parameters”](#parameters-40)

Parameter| Type  
---|---  
`enable`| `boolean`  
  
###### [Returns](#returns-67)

[Section titled “Returns”](#returns-67)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-62)

[Section titled “Example”](#example-62)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setShadow(false);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1203>

##### [setSimpleFullscreen()](#setsimplefullscreen)

[Section titled “setSimpleFullscreen()”](#setsimplefullscreen)
[code] 
    setSimpleFullscreen(fullscreen): Promise<void>
[/code]

On macOS, Toggles a fullscreen mode that doesn’t require a new macOS space. Returns a boolean indicating whether the transition was successful (this won’t work if the window was already in the native fullscreen). This is how fullscreen used to work on macOS in versions before Lion. And allows the user to have a fullscreen window without using another space or taking control over the entire monitor.

On other platforms, this is the same as [Window.setFullscreen](/reference/javascript/api/namespacewindow/#setfullscreen).

###### [Parameters](#parameters-41)

[Section titled “Parameters”](#parameters-41)

Parameter| Type| Description  
---|---|---  
`fullscreen`| `boolean`| Whether the window should go to simple fullscreen or not.  
  
###### [Returns](#returns-68)

[Section titled “Returns”](#returns-68)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1417>

##### [setSize()](#setsize)

[Section titled “setSize()”](#setsize)
[code] 
    setSize(size): Promise<void>
[/code]

Resizes the window with a new inner size.

###### [Parameters](#parameters-42)

[Section titled “Parameters”](#parameters-42)

Parameter| Type| Description  
---|---|---  
`size`| [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) | [`Size`](/reference/javascript/api/namespacedpi/#size)| The logical or physical inner size.  
  
###### [Returns](#returns-69)

[Section titled “Returns”](#returns-69)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-63)

[Section titled “Example”](#example-63)
[code] 
    import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setSize(new LogicalSize(600, 500));
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1294>

##### [setSizeConstraints()](#setsizeconstraints)

[Section titled “setSizeConstraints()”](#setsizeconstraints)
[code] 
    setSizeConstraints(constraints): Promise<void>
[/code]

Sets the window inner size constraints.

###### [Parameters](#parameters-43)

[Section titled “Parameters”](#parameters-43)

Parameter| Type| Description  
---|---|---  
`constraints`| `undefined` | `null` | [`WindowSizeConstraints`](/reference/javascript/api/namespacewindow/#windowsizeconstraints)| The logical or physical inner size, or `null` to unset the constraint.  
  
###### [Returns](#returns-70)

[Section titled “Returns”](#returns-70)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-64)

[Section titled “Example”](#example-64)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setSizeConstraints({ minWidth: 300 });
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1352>

##### [setSkipTaskbar()](#setskiptaskbar)

[Section titled “setSkipTaskbar()”](#setskiptaskbar)
[code] 
    setSkipTaskbar(skip): Promise<void>
[/code]

Whether the window icon should be hidden from the taskbar or not.

Platform-specific

  * **macOS:** Unsupported.


###### [Parameters](#parameters-44)

[Section titled “Parameters”](#parameters-44)

Parameter| Type| Description  
---|---|---  
`skip`| `boolean`| true to hide window icon, false to show it.  
  
###### [Returns](#returns-71)

[Section titled “Returns”](#returns-71)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-65)

[Section titled “Example”](#example-65)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setSkipTaskbar(true);
[/code]

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


###### [Parameters](#parameters-45)

[Section titled “Parameters”](#parameters-45)

Parameter| Type  
---|---  
`theme`?| `null` | [`Theme`](/reference/javascript/api/namespacewindow/#theme-2)  
  
###### [Returns](#returns-72)

[Section titled “Returns”](#returns-72)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since-9)

[Section titled “Since”](#since-9)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1806>

##### [setTitle()](#settitle)

[Section titled “setTitle()”](#settitle)
[code] 
    setTitle(title): Promise<void>
[/code]

Sets the window title.

###### [Parameters](#parameters-46)

[Section titled “Parameters”](#parameters-46)

Parameter| Type| Description  
---|---|---  
`title`| `string`| The new title  
  
###### [Returns](#returns-73)

[Section titled “Returns”](#returns-73)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-66)

[Section titled “Example”](#example-66)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().setTitle('Tauri');
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1013>

##### [setTitleBarStyle()](#settitlebarstyle)

[Section titled “setTitleBarStyle()”](#settitlebarstyle)
[code] 
    setTitleBarStyle(style): Promise<void>
[/code]

Sets the title bar style. **macOS only**.

###### [Parameters](#parameters-47)

[Section titled “Parameters”](#parameters-47)

Parameter| Type  
---|---  
`style`| [`TitleBarStyle`](/reference/javascript/api/namespacewindow/#titlebarstyle-1)  
  
###### [Returns](#returns-74)

[Section titled “Returns”](#returns-74)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since-10)

[Section titled “Since”](#since-10)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1789>

##### [setVisibleOnAllWorkspaces()](#setvisibleonallworkspaces)

[Section titled “setVisibleOnAllWorkspaces()”](#setvisibleonallworkspaces)
[code] 
    setVisibleOnAllWorkspaces(visible): Promise<void>
[/code]

Sets whether the window should be visible on all workspaces or virtual desktops.

Platform-specific

  * **Windows / iOS / Android:** Unsupported.


###### [Parameters](#parameters-48)

[Section titled “Parameters”](#parameters-48)

Parameter| Type  
---|---  
`visible`| `boolean`  
  
###### [Returns](#returns-75)

[Section titled “Returns”](#returns-75)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Since](#since-11)

[Section titled “Since”](#since-11)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1777>

##### [show()](#show)

[Section titled “show()”](#show)
[code] 
    show(): Promise<void>
[/code]

Sets the window visibility to true.

###### [Returns](#returns-76)

[Section titled “Returns”](#returns-76)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-67)

[Section titled “Example”](#example-67)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().show();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1110>

##### [startDragging()](#startdragging)

[Section titled “startDragging()”](#startdragging)
[code] 
    startDragging(): Promise<void>
[/code]

Starts dragging the window.

###### [Returns](#returns-77)

[Section titled “Returns”](#returns-77)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-68)

[Section titled “Example”](#example-68)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().startDragging();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1646>

##### [startResizeDragging()](#startresizedragging)

[Section titled “startResizeDragging()”](#startresizedragging)
[code] 
    startResizeDragging(direction): Promise<void>
[/code]

Starts resize-dragging the window.

###### [Parameters](#parameters-49)

[Section titled “Parameters”](#parameters-49)

Parameter| Type  
---|---  
`direction`| `ResizeDirection`  
  
###### [Returns](#returns-78)

[Section titled “Returns”](#returns-78)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-69)

[Section titled “Example”](#example-69)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().startResizeDragging();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1662>

##### [theme()](#theme)

[Section titled “theme()”](#theme)
[code] 
    theme(): Promise<null | Theme>
[/code]

Gets the window’s current theme.

Platform-specific

  * **macOS:** Theme was introduced on macOS 10.14. Returns `light` on macOS 10.13 and below.


###### [Returns](#returns-79)

[Section titled “Returns”](#returns-79)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Theme`](/reference/javascript/api/namespacewindow/#theme-2)>

The window theme.

###### [Example](#example-70)

[Section titled “Example”](#example-70)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const theme = await getCurrentWindow().theme();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L801>

##### [title()](#title)

[Section titled “title()”](#title)
[code] 
    title(): Promise<string>
[/code]

Gets the window’s current title.

###### [Returns](#returns-80)

[Section titled “Returns”](#returns-80)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

###### [Example](#example-71)

[Section titled “Example”](#example-71)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const title = await getCurrentWindow().title();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L780>

##### [toggleMaximize()](#togglemaximize)

[Section titled “toggleMaximize()”](#togglemaximize)
[code] 
    toggleMaximize(): Promise<void>
[/code]

Toggles the window maximized state.

###### [Returns](#returns-81)

[Section titled “Returns”](#returns-81)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-72)

[Section titled “Example”](#example-72)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().toggleMaximize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1062>

##### [unmaximize()](#unmaximize)

[Section titled “unmaximize()”](#unmaximize)
[code] 
    unmaximize(): Promise<void>
[/code]

Unmaximizes the window.

###### [Returns](#returns-82)

[Section titled “Returns”](#returns-82)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-73)

[Section titled “Example”](#example-73)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().unmaximize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1046>

##### [unminimize()](#unminimize)

[Section titled “unminimize()”](#unminimize)
[code] 
    unminimize(): Promise<void>
[/code]

Unminimizes the window.

###### [Returns](#returns-83)

[Section titled “Returns”](#returns-83)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example-74)

[Section titled “Example”](#example-74)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    await getCurrentWindow().unminimize();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L1094>

##### [getAll()](#getall)

[Section titled “getAll()”](#getall)
[code] 
    static getAll(): Promise<Window[]>
[/code]

Gets a list of instances of `Window` for all available windows.

###### [Returns](#returns-84)

[Section titled “Returns”](#returns-84)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Window`](/reference/javascript/api/namespacewindow/#window)[]>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L345>

##### [getByLabel()](#getbylabel)

[Section titled “getByLabel()”](#getbylabel)
[code] 
    static getByLabel(label): Promise<null | Window>
[/code]

Gets the Window associated with the given label.

###### [Parameters](#parameters-50)

[Section titled “Parameters”](#parameters-50)

Parameter| Type| Description  
---|---|---  
`label`| `string`| The window label.  
  
###### [Returns](#returns-85)

[Section titled “Returns”](#returns-85)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Window`](/reference/javascript/api/namespacewindow/#window)>

The Window instance to communicate with the window or null if the window doesn’t exist.

###### [Example](#example-75)

[Section titled “Example”](#example-75)
[code] 
    import { Window } from '@tauri-apps/api/window';
    
    const mainWindow = Window.getByLabel('main');
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L331>

##### [getCurrent()](#getcurrent)

[Section titled “getCurrent()”](#getcurrent)
[code] 
    static getCurrent(): Window
[/code]

Get an instance of `Window` for the current window.

###### [Returns](#returns-86)

[Section titled “Returns”](#returns-86)

[`Window`](/reference/javascript/api/namespacewindow/#window)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L338>

##### [getFocusedWindow()](#getfocusedwindow)

[Section titled “getFocusedWindow()”](#getfocusedwindow)
[code] 
    static getFocusedWindow(): Promise<null | Window>
[/code]

Gets the focused window.

###### [Returns](#returns-87)

[Section titled “Returns”](#returns-87)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Window`](/reference/javascript/api/namespacewindow/#window)>

The Window instance or `undefined` if there is not any focused window.

###### [Example](#example-76)

[Section titled “Example”](#example-76)
[code] 
    import { Window } from '@tauri-apps/api/window';
    
    const focusedWindow = Window.getFocusedWindow();
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L359>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [Effects](#effects)

[Section titled “Effects”](#effects)

The window effects configuration object

#### [Since](#since-12)

[Section titled “Since”](#since-12)

2.0.0

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Description| Defined in  
---|---|---|---  
`color?`| [`Color`](/reference/javascript/api/namespacewebview/#color)| Window effect color. Affects [Effect.Blur](/reference/javascript/api/namespacewindow/#blur) and [Effect.Acrylic](/reference/javascript/api/namespacewindow/#acrylic) only on Windows 10 v1903+. Doesn’t have any effect on Windows 7 or Windows 11.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2289>  
`effects`| [`Effect`](/reference/javascript/api/namespacewindow/#effect)[]| List of Window effects to apply to the Window. Conflicting effects will apply the first one and ignore the rest.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2276>  
`radius?`| `number`| Window effect corner radius **macOS Only**| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2284>  
`state?`| [`EffectState`](/reference/javascript/api/namespacewindow/#effectstate)| Window effect state **macOS Only**| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2280>  
  
* * *

### [Monitor](#monitor)

[Section titled “Monitor”](#monitor)

Allows you to retrieve information about a given monitor.

#### [Since](#since-13)

[Section titled “Since”](#since-13)

1.0.0

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Description| Defined in  
---|---|---|---  
`name`| `null` | `string`| Human-readable name of the monitor| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L49>  
`position`| [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)| the Top-left corner position of the monitor relative to the larger full screen area.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L53>  
`scaleFactor`| `number`| The scale factor that can be used to map physical pixels to logical pixels.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L60>  
`size`| [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)| The monitor’s resolution.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L51>  
`workArea`| `object`| The monitor’s work area.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L55>  
`workArea.position`| [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)| -| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L56>  
`workArea.size`| [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)| -| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L57>  
  
* * *

### [ProgressBarState](#progressbarstate)

[Section titled “ProgressBarState”](#progressbarstate)

#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Description| Defined in  
---|---|---|---  
`progress?`| `number`| The progress bar progress. This can be a value ranging from `0` to `100`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L208>  
`status?`| [`ProgressBarStatus`](/reference/javascript/api/namespacewindow/#progressbarstatus)| The progress bar status.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L204>  
  
* * *

### [ScaleFactorChanged](#scalefactorchanged)

[Section titled “ScaleFactorChanged”](#scalefactorchanged)

The payload for the `scaleChange` event.

#### [Since](#since-14)

[Section titled “Since”](#since-14)

1.0.2

#### [Properties](#properties-5)

[Section titled “Properties”](#properties-5)

Property| Type| Description| Defined in  
---|---|---|---  
`scaleFactor`| `number`| The new window scale factor.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L83>  
`size`| [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)| The new window size| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L85>  
  
* * *

### [WindowOptions](#windowoptions)

[Section titled “WindowOptions”](#windowoptions)

Configuration for the window to create.

#### [Since](#since-15)

[Section titled “Since”](#since-15)

1.0.0

#### [Properties](#properties-6)

[Section titled “Properties”](#properties-6)

Property| Type| Description| Defined in  
---|---|---|---  
`allowLinkPreview?`| `boolean`| on macOS and iOS there is a link preview on long pressing links, this is enabled by default. see <https://docs.rs/objc2-web-kit/latest/objc2_web_kit/struct.WKWebView.html#method.allowsLinkPreview>| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2491>  
`alwaysOnBottom?`| `boolean`| Whether the window should always be below other windows.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2364>  
`alwaysOnTop?`| `boolean`| Whether the window should always be on top of other windows or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2362>  
`backgroundColor?`| [`Color`](/reference/javascript/api/namespacewebview/#color)| Set the window background color. Platform-specific: - **Android / iOS:** Unsupported. - **Windows** : alpha channel is ignored. **Since** 2.1.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2468>  
`backgroundThrottling?`| [`BackgroundThrottlingPolicy`](/reference/javascript/api/namespacewindow/#backgroundthrottlingpolicy)| Change the default background throttling behaviour. ## Platform-specific - **Linux / Windows / Android** : Unsupported. Workarounds like a pending WebLock transaction might suffice. - **iOS** : Supported since version 17.0+. - **macOS** : Supported since version 14.0+. see <https://github.com/tauri-apps/tauri/issues/5250#issuecomment-2569380578> **Since** 2.3.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2482>  
`center?`| `boolean`| Show window in the center of the screen..| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2307>  
`closable?`| `boolean`| Whether the window’s native close button is enabled or not. Defaults to `true`.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2423>  
`contentProtected?`| `boolean`| Prevents the window contents from being captured by other apps.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2366>  
`decorations?`| `boolean`| Whether the window should have borders and bars or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2360>  
`disableInputAccessoryView?`| `boolean`| Allows disabling the input accessory view on iOS. The accessory view is the view that appears above the keyboard when a text input element is focused. It usually displays a view with “Done”, “Next” buttons.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2498>  
`focus?`| `boolean`| Whether the window will be initially focused or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2346>  
`focusable?`| `boolean`| Whether the window can be focused or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2348>  
`fullscreen?`| `boolean`| Whether the window is in fullscreen mode or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2344>  
`height?`| `number`| The initial height.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2315>  
`hiddenTitle?`| `boolean`| If `true`, sets the window title to be hidden on macOS.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2404>  
`javascriptDisabled?`| `boolean`| Whether we should disable JavaScript code execution on the webview or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2486>  
`maxHeight?`| `number`| The maximum height. Only applies if `maxWidth` is also set.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2323>  
`maxWidth?`| `number`| The maximum width. Only applies if `maxHeight` is also set.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2321>  
`maximizable?`| `boolean`| Whether the window’s native maximize button is enabled or not. Defaults to `true`.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2415>  
`maximized?`| `boolean`| Whether the window should be maximized upon creation or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2356>  
`minHeight?`| `number`| The minimum height. Only applies if `minWidth` is also set.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2319>  
`minWidth?`| `number`| The minimum width. Only applies if `minHeight` is also set.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2317>  
`minimizable?`| `boolean`| Whether the window’s native minimize button is enabled or not. Defaults to `true`.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2419>  
`parent?`| `string` | [`Window`](/reference/javascript/api/namespacewindow/#window) | [`WebviewWindow`](/reference/javascript/api/namespacewebviewwindow/#webviewwindow)| Sets a parent to the window to be created. Can be either a [`Window`](/reference/javascript/api/namespacewindow/#window) or a label of the window. Platform-specific - **Windows** : This sets the passed parent as an owner window to the window to be created. From [MSDN owned windows docs](https://docs.microsoft.com/en-us/windows/win32/winmsg/window-features#owned-windows): - An owned window is always above its owner in the z-order. - The system automatically destroys an owned window when its owner is destroyed. - An owned window is hidden when its owner is minimized. - **Linux** : This makes the new window transient for parent, see <https://docs.gtk.org/gtk3/method.Window.set_transient_for.html> \- **macOS** : This adds the window as a child of parent, see <https://developer.apple.com/documentation/appkit/nswindow/1419152-addchildwindow?language=objc>| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2437>  
`preventOverflow?`| `boolean` | `PreventOverflowMargin`| Prevent the window from overflowing the working area (e.g. monitor size - taskbar size) on creation, which means the window size will be limited to `monitor size - taskbar size` Can either be set to `true` or to a PreventOverflowMargin object to set an additional margin that should be considered to determine the working area (in this case the window size will be limited to `monitor size - taskbar size - margin`) **NOTE** : The overflow check is only performed on window creation, resizes can still overflow Platform-specific - **iOS / Android:** Unsupported.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2338>  
`resizable?`| `boolean`| Whether the window is resizable or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2340>  
`scrollBarStyle?`| [`ScrollBarStyle`](/reference/javascript/api/namespacewindow/#scrollbarstyle)| Specifies the native scrollbar style to use with the webview. CSS styles that modify the scrollbar are applied on top of the native appearance configured here. Defaults to `default`, which is the browser default. ## Platform-specific - **Windows** : - `fluentOverlay` requires WebView2 Runtime version 125.0.2535.41 or higher, and does nothing on older versions. - This option must be given the same value for all webviews. - **Linux / Android / iOS / macOS** : Unsupported. Only supports `Default` and performs no operation.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2513>  
`shadow?`| `boolean`| Whether or not the window has shadow. Platform-specific - **Windows:** \- `false` has no effect on decorated window, shadows are always ON. - `true` will make undecorated window have a 1px white border, and on Windows 11, it will have a rounded corners. - **Linux:** Unsupported. **Since** 2.0.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2382>  
`skipTaskbar?`| `boolean`| Whether or not the window icon should be added to the taskbar.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2368>  
`tabbingIdentifier?`| `string`| Defines the window [tabbing identifier](https://developer.apple.com/documentation/appkit/nswindow/1644704-tabbingidentifier) on macOS. Windows with the same tabbing identifier will be grouped together. If the tabbing identifier is not set, automatic tabbing will be disabled.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2411>  
`theme?`| [`Theme`](/reference/javascript/api/namespacewindow/#theme-2)| The initial window theme. Defaults to the system theme. Only implemented on Windows and macOS 10.14+.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2388>  
`title?`| `string`| Window title.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2342>  
`titleBarStyle?`| [`TitleBarStyle`](/reference/javascript/api/namespacewindow/#titlebarstyle-1)| The style of the macOS title bar.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2392>  
`trafficLightPosition?`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition)| The position of the window controls on macOS. Requires `titleBarStyle: 'overlay'` and `decorations: true`. **Since** 2.4.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2400>  
`transparent?`| `boolean`| Whether the window is transparent or not. Note that on `macOS` this requires the `macos-private-api` feature flag, enabled under `tauri.conf.json > app > macOSPrivateApi`. WARNING: Using private APIs on `macOS` prevents your application from being accepted to the `App Store`.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2354>  
`visible?`| `boolean`| Whether the window should be immediately visible upon creation or not.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2358>  
`visibleOnAllWorkspaces?`| `boolean`| Whether the window should be visible on all workspaces or virtual desktops. Platform-specific - **Windows / iOS / Android:** Unsupported. **Since** 2.0.0| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2446>  
`width?`| `number`| The initial width.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2313>  
`windowEffects?`| [`Effects`](/reference/javascript/api/namespacewindow/#effects)| Window effects. Requires the window to be transparent. Platform-specific: - **Windows** : If using decorations or shadows, you may want to try this workaround <https://github.com/tauri-apps/tao/issues/72#issuecomment-975607891> \- **Linux** : Unsupported| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2457>  
`x?`| `number`| The initial vertical position. Only applies if `y` is also set.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2309>  
`y?`| `number`| The initial horizontal position. Only applies if `x` is also set.| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2311>  
  
* * *

### [WindowSizeConstraints](#windowsizeconstraints)

[Section titled “WindowSizeConstraints”](#windowsizeconstraints)

#### [Properties](#properties-7)

[Section titled “Properties”](#properties-7)

Property| Type| Defined in  
---|---|---  
`maxHeight?`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L197>  
`maxWidth?`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L196>  
`minHeight?`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L195>  
`minWidth?`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L194>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [CursorIcon](#cursoricon)

[Section titled “CursorIcon”](#cursoricon)
[code] 
    type CursorIcon:
    
      | "default"
    
      | "crosshair"
    
      | "hand"
    
      | "arrow"
    
      | "move"
    
      | "text"
    
      | "wait"
    
      | "help"
    
      | "progress"
    
      | "notAllowed"
    
      | "contextMenu"
    
      | "cell"
    
      | "verticalText"
    
      | "alias"
    
      | "copy"
    
      | "noDrop"
    
      | "grab"
    
      | "grabbing"
    
      | "allScroll"
    
      | "zoomIn"
    
      | "zoomOut"
    
      | "eResize"
    
      | "nResize"
    
      | "neResize"
    
      | "nwResize"
    
      | "sResize"
    
      | "seResize"
    
      | "swResize"
    
      | "wResize"
    
      | "ewResize"
    
      | "nsResize"
    
      | "neswResize"
    
      | "nwseResize"
    
      | "colResize"
    
      | "rowResize";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L129>

* * *

### [Theme](#theme-1)

[Section titled “Theme”](#theme-1)
[code] 
    type Theme: "light" | "dark";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L63>

* * *

### [TitleBarStyle](#titlebarstyle)

[Section titled “TitleBarStyle”](#titlebarstyle)
[code] 
    type TitleBarStyle: "visible" | "transparent" | "overlay";
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L64>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [availableMonitors()](#availablemonitors)

[Section titled “availableMonitors()”](#availablemonitors)
[code] 
    function availableMonitors(): Promise<Monitor[]>
[/code]

Returns the list of all the monitors available on the system.

#### [Returns](#returns-88)

[Section titled “Returns”](#returns-88)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Monitor`](/reference/javascript/api/namespacewindow/#monitor)[]>

#### [Example](#example-77)

[Section titled “Example”](#example-77)
[code] 
    import { availableMonitors } from '@tauri-apps/api/window';
    
    const monitors = await availableMonitors();
[/code]

#### [Since](#since-16)

[Section titled “Since”](#since-16)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2592>

* * *

### [currentMonitor()](#currentmonitor)

[Section titled “currentMonitor()”](#currentmonitor)
[code] 
    function currentMonitor(): Promise<Monitor | null>
[/code]

Returns the monitor on which the window currently resides. Returns `null` if current monitor can’t be detected.

#### [Returns](#returns-89)

[Section titled “Returns”](#returns-89)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Monitor`](/reference/javascript/api/namespacewindow/#monitor) | `null`>

#### [Example](#example-78)

[Section titled “Example”](#example-78)
[code] 
    import { currentMonitor } from '@tauri-apps/api/window';
    
    const monitor = await currentMonitor();
[/code]

#### [Since](#since-17)

[Section titled “Since”](#since-17)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2542>

* * *

### [cursorPosition()](#cursorposition)

[Section titled “cursorPosition()”](#cursorposition)
[code] 
    function cursorPosition(): Promise<PhysicalPosition>
[/code]

Get the cursor position relative to the top-left hand corner of the desktop.

Note that the top-left hand corner of the desktop is not necessarily the same as the screen. If the user uses a desktop with multiple monitors, the top-left hand corner of the desktop is the top-left hand corner of the main monitor on Windows and macOS or the top-left of the leftmost monitor on X11.

The coordinates can be negative if the top-left hand corner of the window is outside of the visible screen region.

#### [Returns](#returns-90)

[Section titled “Returns”](#returns-90)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2608>

* * *

### [getAllWindows()](#getallwindows)

[Section titled “getAllWindows()”](#getallwindows)
[code] 
    function getAllWindows(): Promise<Window[]>
[/code]

Gets a list of instances of `Window` for all available windows.

#### [Returns](#returns-91)

[Section titled “Returns”](#returns-91)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Window`](/reference/javascript/api/namespacewindow/#window)[]>

#### [Since](#since-18)

[Section titled “Since”](#since-18)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L228>

* * *

### [getCurrentWindow()](#getcurrentwindow)

[Section titled “getCurrentWindow()”](#getcurrentwindow)
[code] 
    function getCurrentWindow(): Window
[/code]

Get an instance of `Window` for the current window.

#### [Returns](#returns-92)

[Section titled “Returns”](#returns-92)

[`Window`](/reference/javascript/api/namespacewindow/#window)

#### [Since](#since-19)

[Section titled “Since”](#since-19)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L216>

* * *

### [monitorFromPoint()](#monitorfrompoint)

[Section titled “monitorFromPoint()”](#monitorfrompoint)
[code] 
    function monitorFromPoint(x, y): Promise<Monitor | null>
[/code]

Returns the monitor that contains the given point. Returns `null` if can’t find any.

#### [Parameters](#parameters-51)

[Section titled “Parameters”](#parameters-51)

Parameter| Type  
---|---  
`x`| `number`  
`y`| `number`  
  
#### [Returns](#returns-93)

[Section titled “Returns”](#returns-93)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Monitor`](/reference/javascript/api/namespacewindow/#monitor) | `null`>

#### [Example](#example-79)

[Section titled “Example”](#example-79)
[code] 
    import { monitorFromPoint } from '@tauri-apps/api/window';
    
    const monitor = await monitorFromPoint(100.0, 200.0);
[/code]

#### [Since](#since-20)

[Section titled “Since”](#since-20)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2575>

* * *

### [primaryMonitor()](#primarymonitor)

[Section titled “primaryMonitor()”](#primarymonitor)
[code] 
    function primaryMonitor(): Promise<Monitor | null>
[/code]

Returns the primary monitor of the system. Returns `null` if it can’t identify any monitor as a primary one.

#### [Returns](#returns-94)

[Section titled “Returns”](#returns-94)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Monitor`](/reference/javascript/api/namespacewindow/#monitor) | `null`>

#### [Example](#example-80)

[Section titled “Example”](#example-80)
[code] 
    import { primaryMonitor } from '@tauri-apps/api/window';
    
    const monitor = await primaryMonitor();
[/code]

#### [Since](#since-21)

[Section titled “Since”](#since-21)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/window.ts#L2559>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacewindow](https://v2.tauri.app/reference/javascript/api/namespacewindow)