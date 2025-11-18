# @tauri-apps/plugin-nfc

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [NFCTypeNameFormat](#nfctypenameformat)

[Section titled “NFCTypeNameFormat”](#nfctypenameformat)

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [AbsoluteURI](#absoluteuri)

[Section titled “AbsoluteURI”](#absoluteuri)
[code] 
    AbsoluteURI: 3;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L84>

##### [Empty](#empty)

[Section titled “Empty”](#empty)
[code] 
    Empty: 0;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L81>

##### [Media](#media)

[Section titled “Media”](#media)
[code] 
    Media: 2;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L83>

##### [NfcExternal](#nfcexternal)

[Section titled “NfcExternal”](#nfcexternal)
[code] 
    NfcExternal: 4;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L85>

##### [NfcWellKnown](#nfcwellknown)

[Section titled “NfcWellKnown”](#nfcwellknown)
[code] 
    NfcWellKnown: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L82>

##### [Unchanged](#unchanged)

[Section titled “Unchanged”](#unchanged)
[code] 
    Unchanged: 6;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L87>

##### [Unknown](#unknown)

[Section titled “Unknown”](#unknown)
[code] 
    Unknown: 5;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L86>

* * *

### [TechKind](#techkind)

[Section titled “TechKind”](#techkind)

#### [Enumeration Members](#enumeration-members-1)

[Section titled “Enumeration Members”](#enumeration-members-1)

##### [IsoDep](#isodep)

[Section titled “IsoDep”](#isodep)
[code] 
    IsoDep: 0;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L17>

##### [MifareClassic](#mifareclassic)

[Section titled “MifareClassic”](#mifareclassic)
[code] 
    MifareClassic: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L18>

##### [MifareUltralight](#mifareultralight)

[Section titled “MifareUltralight”](#mifareultralight)
[code] 
    MifareUltralight: 2;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L19>

##### [Ndef](#ndef)

[Section titled “Ndef”](#ndef)
[code] 
    Ndef: 3;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L20>

##### [NdefFormatable](#ndefformatable)

[Section titled “NdefFormatable”](#ndefformatable)
[code] 
    NdefFormatable: 4;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L21>

##### [NfcA](#nfca)

[Section titled “NfcA”](#nfca)
[code] 
    NfcA: 5;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L22>

##### [NfcB](#nfcb)

[Section titled “NfcB”](#nfcb)
[code] 
    NfcB: 6;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L23>

##### [NfcBarcode](#nfcbarcode)

[Section titled “NfcBarcode”](#nfcbarcode)
[code] 
    NfcBarcode: 7;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L24>

##### [NfcF](#nfcf)

[Section titled “NfcF”](#nfcf)
[code] 
    NfcF: 8;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L25>

##### [NfcV](#nfcv)

[Section titled “NfcV”](#nfcv)
[code] 
    NfcV: 9;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L26>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [NFCRecord](#nfcrecord)

[Section titled “NFCRecord”](#nfcrecord)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`format`| [`NFCTypeNameFormat`](/reference/javascript/nfc/#nfctypenameformat)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L104>  
`id`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L106>  
`kind`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L105>  
`payload`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L107>  
  
* * *

### [ScanOptions](#scanoptions)

[Section titled “ScanOptions”](#scanoptions)

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`keepSessionAlive?`| `boolean`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L63>  
`message?`| `string`| Message displayed in the UI. iOS only.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L65>  
`successMessage?`| `string`| Message displayed in the UI when the message has been read. iOS only.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L67>  
  
* * *

### [Tag](#tag)

[Section titled “Tag”](#tag)

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Defined in  
---|---|---  
`id`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L98>  
`kind`| `string`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L99>  
`records`| [`TagRecord`](/reference/javascript/nfc/#tagrecord)[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L100>  
  
* * *

### [TagRecord](#tagrecord)

[Section titled “TagRecord”](#tagrecord)

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Defined in  
---|---|---  
`id`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L93>  
`kind`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L92>  
`payload`| `number`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L94>  
`tnf`| [`NFCTypeNameFormat`](/reference/javascript/nfc/#nfctypenameformat)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L91>  
  
* * *

### [UriFilter](#urifilter)

[Section titled “UriFilter”](#urifilter)

#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Defined in  
---|---|---  
`host?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L12>  
`pathPrefix?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L13>  
`scheme?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L11>  
  
* * *

### [WriteOptions](#writeoptions)

[Section titled “WriteOptions”](#writeoptions)

#### [Properties](#properties-5)

[Section titled “Properties”](#properties-5)

Property| Type| Description| Defined in  
---|---|---|---  
`kind?`| [`ScanKind`](/reference/javascript/nfc/#scankind)| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L71>  
`message?`| `string`| Message displayed in the UI when reading the tag. iOS only.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L73>  
`successMessage?`| `string`| Message displayed in the UI when the message has been written. iOS only.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L77>  
`successfulReadMessage?`| `string`| Message displayed in the UI when the tag has been read. iOS only.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L75>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [ScanKind](#scankind)

[Section titled “ScanKind”](#scankind)
[code] 
    type ScanKind: object | object;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L29>

## [Variables](#variables)

[Section titled “Variables”](#variables)

### [RTD_TEXT](#rtd_text)

[Section titled “RTD_TEXT”](#rtd_text)
[code] 
    const RTD_TEXT: number[];
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L7>

* * *

### [RTD_URI](#rtd_uri)

[Section titled “RTD_URI”](#rtd_uri)
[code] 
    const RTD_URI: number[];
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L8>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [isAvailable()](#isavailable)

[Section titled “isAvailable()”](#isavailable)
[code] 
    function isAvailable(): Promise<boolean>
[/code]

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L271>

* * *

### [record()](#record)

[Section titled “record()”](#record)
[code] 
    function record(
    
       format,
    
       kind,
    
       id,
    
       payload): NFCRecord
[/code]

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`format`| [`NFCTypeNameFormat`](/reference/javascript/nfc/#nfctypenameformat)  
`kind`| `string` | `number`[]  
`id`| `string` | `number`[]  
`payload`| `string` | `number`[]  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`NFCRecord`](/reference/javascript/nfc/#nfcrecord)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L110>

* * *

### [scan()](#scan)

[Section titled “scan()”](#scan)
[code] 
    function scan(kind, options?): Promise<Tag>
[/code]

Scans an NFC tag.
[code] 
    import { scan } from "@tauri-apps/plugin-nfc";
    
    await scan({ type: "tag" });
[/code]

See <https://developer.android.com/develop/connectivity/nfc/nfc#ndef> for more information.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`kind`| [`ScanKind`](/reference/javascript/nfc/#scankind)|   
`options`?| [`ScanOptions`](/reference/javascript/nfc/#scanoptions)|   
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Tag`](/reference/javascript/nfc/#tag)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L231>

* * *

### [textRecord()](#textrecord)

[Section titled “textRecord()”](#textrecord)
[code] 
    function textRecord(
    
       text,
    
       id?,
    
       language?): NFCRecord
[/code]

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Default value  
---|---|---  
`text`| `string`| `undefined`  
`id`?| `string` | `number`[]| `undefined`  
`language`?| `string`| `'en'`  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`NFCRecord`](/reference/javascript/nfc/#nfcrecord)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L130>

* * *

### [uriRecord()](#urirecord)

[Section titled “uriRecord()”](#urirecord)
[code] 
    function uriRecord(uri, id?): NFCRecord
[/code]

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`uri`| `string`  
`id`?| `string` | `number`[]  
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`NFCRecord`](/reference/javascript/nfc/#nfcrecord)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L203>

* * *

### [write()](#write)

[Section titled “write()”](#write)
[code] 
    function write(records, options?): Promise<void>
[/code]

Write to an NFC tag.
[code] 
    import { uriRecord, write } from "@tauri-apps/plugin-nfc";
    
    await write([uriRecord("https://tauri.app")], { kind: { type: "ndef" } });
[/code]

If you did not previously call [scan](/reference/javascript/nfc/#scan) with [ScanOptions.keepSessionAlive](/reference/javascript/nfc/#keepsessionalive) set to true, it will first scan the tag then write to it.

#### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type| Description  
---|---|---  
`records`| [`NFCRecord`](/reference/javascript/nfc/#nfcrecord)[]|   
`options`?| [`WriteOptions`](/reference/javascript/nfc/#writeoptions)|   
  
#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/nfc/guest-js/index.ts#L256>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/nfc](https://v2.tauri.app/reference/javascript/nfc)