# @tauri-apps/plugin-positioner

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [Position](#position)

[Section titled “Position”](#position)

Well known window positions.

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [BottomCenter](#bottomcenter)

[Section titled “BottomCenter”](#bottomcenter)
[code] 
    BottomCenter: 5;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L18>

##### [BottomLeft](#bottomleft)

[Section titled “BottomLeft”](#bottomleft)
[code] 
    BottomLeft: 2;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L15>

##### [BottomRight](#bottomright)

[Section titled “BottomRight”](#bottomright)
[code] 
    BottomRight: 3;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L16>

##### [Center](#center)

[Section titled “Center”](#center)
[code] 
    Center: 8;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L21>

##### [LeftCenter](#leftcenter)

[Section titled “LeftCenter”](#leftcenter)
[code] 
    LeftCenter: 6;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L19>

##### [RightCenter](#rightcenter)

[Section titled “RightCenter”](#rightcenter)
[code] 
    RightCenter: 7;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L20>

##### [TopCenter](#topcenter)

[Section titled “TopCenter”](#topcenter)
[code] 
    TopCenter: 4;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L17>

##### [TopLeft](#topleft)

[Section titled “TopLeft”](#topleft)
[code] 
    TopLeft: 0;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L13>

##### [TopRight](#topright)

[Section titled “TopRight”](#topright)
[code] 
    TopRight: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L14>

##### [TrayBottomCenter](#traybottomcenter)

[Section titled “TrayBottomCenter”](#traybottomcenter)
[code] 
    TrayBottomCenter: 14;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L27>

##### [TrayBottomLeft](#traybottomleft)

[Section titled “TrayBottomLeft”](#traybottomleft)
[code] 
    TrayBottomLeft: 10;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L23>

##### [TrayBottomRight](#traybottomright)

[Section titled “TrayBottomRight”](#traybottomright)
[code] 
    TrayBottomRight: 12;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L25>

##### [TrayCenter](#traycenter)

[Section titled “TrayCenter”](#traycenter)
[code] 
    TrayCenter: 13;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L26>

##### [TrayLeft](#trayleft)

[Section titled “TrayLeft”](#trayleft)
[code] 
    TrayLeft: 9;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L22>

##### [TrayRight](#trayright)

[Section titled “TrayRight”](#trayright)
[code] 
    TrayRight: 11;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L24>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [handleIconState()](#handleiconstate)

[Section titled “handleIconState()”](#handleiconstate)
[code] 
    function handleIconState(event): Promise<void>
[/code]

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`event`| `TrayIconEvent`  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L55>

* * *

### [moveWindow()](#movewindow)

[Section titled “moveWindow()”](#movewindow)
[code] 
    function moveWindow(to): Promise<void>
[/code]

Moves the `Window` to the given [Position](/reference/javascript/positioner/#position) using `WindowExt.move_window()` All positions are relative to the **current** screen.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`to`| [`Position`](/reference/javascript/positioner/#position)| The [Position](/reference/javascript/positioner/#position) to move to.  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L36>

* * *

### [moveWindowConstrained()](#movewindowconstrained)

[Section titled “moveWindowConstrained()”](#movewindowconstrained)
[code] 
    function moveWindowConstrained(to): Promise<void>
[/code]

Moves the `Window` to the given [Position](/reference/javascript/positioner/#position) using `WindowExt.move_window_constrained()`

This move operation constrains the window to the screen dimensions in case of tray-icon positions.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`to`| [`Position`](/reference/javascript/positioner/#position)| The (tray) [Position](/reference/javascript/positioner/#position) to move to.  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/positioner/guest-js/index.ts#L49>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/positioner](https://v2.tauri.app/reference/javascript/positioner)