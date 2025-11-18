# @tauri-apps/plugin-biometric

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [BiometryType](#biometrytype)

[Section titled “BiometryType”](#biometrytype)

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [FaceID](#faceid)

[Section titled “FaceID”](#faceid)
[code] 
    FaceID: 2;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L12>

##### [Iris](#iris)

[Section titled “Iris”](#iris)
[code] 
    Iris: 3;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L14>

##### [None](#none)

[Section titled “None”](#none)
[code] 
    None: 0;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L8>

##### [TouchID](#touchid)

[Section titled “TouchID”](#touchid)
[code] 
    TouchID: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L10>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [AuthOptions](#authoptions)

[Section titled “AuthOptions”](#authoptions)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`allowDeviceCredential?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L36>  
`cancelTitle?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L37>  
`confirmationRequired?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L45>  
`fallbackTitle?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L40>  
`maxAttemps?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L46>  
`subtitle?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L44>  
`title?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L43>  
  
* * *

### [Status](#status)

[Section titled “Status”](#status)

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Defined in  
---|---|---  
`biometryType`| [`BiometryType`](/reference/javascript/biometric/#biometrytype)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L19>  
`error?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L20>  
`errorCode?`| | `"appCancel"` | `"authenticationFailed"` | `"invalidContext"` | `"notInteractive"` | `"passcodeNotSet"` | `"systemCancel"` | `"userCancel"` | `"userFallback"` | `"biometryLockout"` | `"biometryNotAvailable"` | `"biometryNotEnrolled"`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L21>  
`isAvailable`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L18>  
  
## [Functions](#functions)

[Section titled “Functions”](#functions)

### [authenticate()](#authenticate)

[Section titled “authenticate()”](#authenticate)
[code] 
    function authenticate(reason, options?): Promise<void>
[/code]

Prompts the user for authentication using the system interface (touchID, faceID or Android Iris). Rejects if the authentication fails.
[code] 
    import { authenticate } from "@tauri-apps/plugin-biometric";
    
    await authenticate('Open your wallet');
[/code]

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`reason`| `string`|   
`options`?| [`AuthOptions`](/reference/javascript/biometric/#authoptions)|   
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L69>

* * *

### [checkStatus()](#checkstatus)

[Section titled “checkStatus()”](#checkstatus)
[code] 
    function checkStatus(): Promise<Status>
[/code]

Checks if the biometric authentication is available.

#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Status`](/reference/javascript/biometric/#status)>

a promise resolving to an object containing all the information about the status of the biometry.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/biometric/guest-js/index.ts#L53>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/biometric](https://v2.tauri.app/reference/javascript/biometric)