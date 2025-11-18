# @tauri-apps/plugin-window-state

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [StateFlags](#stateflags)

[Section titled “StateFlags”](#stateflags)

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [ALL](#all)

[Section titled “ALL”](#all)
[code] 
    ALL: 63;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L15>

##### [DECORATIONS](#decorations)

[Section titled “DECORATIONS”](#decorations)
[code] 
    DECORATIONS: 16;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L13>

##### [FULLSCREEN](#fullscreen)

[Section titled “FULLSCREEN”](#fullscreen)
[code] 
    FULLSCREEN: 32;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L14>

##### [MAXIMIZED](#maximized)

[Section titled “MAXIMIZED”](#maximized)
[code] 
    MAXIMIZED: 4;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L11>

##### [POSITION](#position)

[Section titled “POSITION”](#position)
[code] 
    POSITION: 2;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L10>

##### [SIZE](#size)

[Section titled “SIZE”](#size)
[code] 
    SIZE: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L9>

##### [VISIBLE](#visible)

[Section titled “VISIBLE”](#visible)
[code] 
    VISIBLE: 8;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L12>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [filename()](#filename)

[Section titled “filename()”](#filename)
[code] 
    function filename(): Promise<string>
[/code]

Get the name of the file used to store window state.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L44>

* * *

### [restoreState()](#restorestate)

[Section titled “restoreState()”](#restorestate)
[code] 
    function restoreState(label, flags?): Promise<void>
[/code]

Restore the state for the specified window from disk.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`label`| `string`  
`flags`?| [`StateFlags`](/reference/javascript/window-state/#stateflags)  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L28>

* * *

### [restoreStateCurrent()](#restorestatecurrent)

[Section titled “restoreStateCurrent()”](#restorestatecurrent)
[code] 
    function restoreStateCurrent(flags?): Promise<void>
[/code]

Restore the state for the current window from disk.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`flags`?| [`StateFlags`](/reference/javascript/window-state/#stateflags)  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L38>

* * *

### [saveWindowState()](#savewindowstate)

[Section titled “saveWindowState()”](#savewindowstate)
[code] 
    function saveWindowState(flags?): Promise<void>
[/code]

Save the state of all open windows to disk.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`flags`?| [`StateFlags`](/reference/javascript/window-state/#stateflags)  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/window-state/guest-js/index.ts#L21>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/window-state](https://v2.tauri.app/reference/javascript/window-state)