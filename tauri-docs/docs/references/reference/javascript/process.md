# @tauri-apps/plugin-process

Perform operations on the current process.

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [exit()](#exit)

[Section titled “exit()”](#exit)
[code] 
    function exit(code): Promise<void>
[/code]

Exits immediately with the given `exitCode`.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Default value| Description  
---|---|---|---  
`code`| `number`| `0`| The exit code to use.  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { exit } from '@tauri-apps/plugin-process';
    
    await exit(1);
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/process/guest-js/index.ts#L25>

* * *

### [relaunch()](#relaunch)

[Section titled “relaunch()”](#relaunch)
[code] 
    function relaunch(): Promise<void>
[/code]

Exits the current instance of the app then relaunches it.

#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { relaunch } from '@tauri-apps/plugin-process';
    
    await relaunch();
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/process/guest-js/index.ts#L41>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/process](https://v2.tauri.app/reference/javascript/process)