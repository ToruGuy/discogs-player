# @tauri-apps/plugin-barcode-scanner

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [Format](#format)

[Section titled “Format”](#format)

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [Aztec](#aztec)

[Section titled “Aztec”](#aztec)
[code] 
    Aztec: "AZTEC";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L30>

##### [Codabar](#codabar)

[Section titled “Codabar”](#codabar)
[code] 
    Codabar: "CODABAR";
[/code]

Not supported on iOS.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L28>

##### [Code128](#code128)

[Section titled “Code128”](#code128)
[code] 
    Code128: "CODE_128";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L24>

##### [Code39](#code39)

[Section titled “Code39”](#code39)
[code] 
    Code39: "CODE_39";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L22>

##### [Code93](#code93)

[Section titled “Code93”](#code93)
[code] 
    Code93: "CODE_93";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L23>

##### [DataMatrix](#datamatrix)

[Section titled “DataMatrix”](#datamatrix)
[code] 
    DataMatrix: "DATA_MATRIX";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L31>

##### [EAN13](#ean13)

[Section titled “EAN13”](#ean13)
[code] 
    EAN13: "EAN_13";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L21>

##### [EAN8](#ean8)

[Section titled “EAN8”](#ean8)
[code] 
    EAN8: "EAN_8";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L20>

##### [GS1DataBar](#gs1databar)

[Section titled “GS1DataBar”](#gs1databar)
[code] 
    GS1DataBar: "GS1_DATA_BAR";
[/code]

Not supported on Android. Requires iOS 15.4+

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L36>

##### [GS1DataBarExpanded](#gs1databarexpanded)

[Section titled “GS1DataBarExpanded”](#gs1databarexpanded)
[code] 
    GS1DataBarExpanded: "GS1_DATA_BAR_EXPANDED";
[/code]

Not supported on Android. Requires iOS 15.4+

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L44>

##### [GS1DataBarLimited](#gs1databarlimited)

[Section titled “GS1DataBarLimited”](#gs1databarlimited)
[code] 
    GS1DataBarLimited: "GS1_DATA_BAR_LIMITED";
[/code]

Not supported on Android. Requires iOS 15.4+

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L40>

##### [ITF](#itf)

[Section titled “ITF”](#itf)
[code] 
    ITF: "ITF";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L29>

##### [PDF417](#pdf417)

[Section titled “PDF417”](#pdf417)
[code] 
    PDF417: "PDF_417";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L32>

##### [QRCode](#qrcode)

[Section titled “QRCode”](#qrcode)
[code] 
    QRCode: "QR_CODE";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L14>

##### [UPC_A](#upc_a)

[Section titled “UPC_A”](#upc_a)
[code] 
    UPC_A: "UPC_A";
[/code]

Not supported on iOS.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L18>

##### [UPC_E](#upc_e)

[Section titled “UPC_E”](#upc_e)
[code] 
    UPC_E: "UPC_E";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L19>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ScanOptions](#scanoptions)

[Section titled “ScanOptions”](#scanoptions)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`cameraDirection?`| `"back"` | `"front"`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L48>  
`formats?`| [`Format`](/reference/javascript/barcode-scanner/#format)[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L49>  
`windowed?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L50>  
  
* * *

### [Scanned](#scanned)

[Section titled “Scanned”](#scanned)

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Defined in  
---|---|---  
`bounds`| `unknown`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L56>  
`content`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L54>  
`format`| [`Format`](/reference/javascript/barcode-scanner/#format)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L55>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [PermissionState](#permissionstate)

[Section titled “PermissionState”](#permissionstate)
[code] 
    type PermissionState: "granted" | "denied" | "prompt" | "prompt-with-rationale";
[/code]

**Source** : undefined

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [cancel()](#cancel)

[Section titled “cancel()”](#cancel)
[code] 
    function cancel(): Promise<void>
[/code]

Cancel the current scan process.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L70>

* * *

### [checkPermissions()](#checkpermissions)

[Section titled “checkPermissions()”](#checkpermissions)
[code] 
    function checkPermissions(): Promise<PermissionState>
[/code]

Get permission state.

#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`PermissionState`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L77>

* * *

### [openAppSettings()](#openappsettings)

[Section titled “openAppSettings()”](#openappsettings)
[code] 
    function openAppSettings(): Promise<void>
[/code]

Open application settings. Useful if permission was denied and the user must manually enable it.

#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L95>

* * *

### [requestPermissions()](#requestpermissions)

[Section titled “requestPermissions()”](#requestpermissions)
[code] 
    function requestPermissions(): Promise<PermissionState>
[/code]

Request permissions to use the camera.

#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`PermissionState`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L86>

* * *

### [scan()](#scan)

[Section titled “scan()”](#scan)
[code] 
    function scan(options?): Promise<Scanned>
[/code]

Start scanning.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`options`?| [`ScanOptions`](/reference/javascript/barcode-scanner/#scanoptions)|   
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Scanned`](/reference/javascript/barcode-scanner/#scanned)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/barcode-scanner/guest-js/index.ts#L63>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/barcode-scanner](https://v2.tauri.app/reference/javascript/barcode-scanner)