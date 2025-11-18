# @tauri-apps/plugin-log

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [LogLevel](#loglevel)

[Section titled “LogLevel”](#loglevel)

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [Debug](#debug)

[Section titled “Debug”](#debug)
[code] 
    Debug: 2;
[/code]

The “debug” level.

Designates lower priority information.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L26>

##### [Error](#error)

[Section titled “Error”](#error)
[code] 
    Error: 5;
[/code]

The “error” level.

Designates very serious errors.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L44>

##### [Info](#info)

[Section titled “Info”](#info)
[code] 
    Info: 3;
[/code]

The “info” level.

Designates useful information.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L32>

##### [Trace](#trace)

[Section titled “Trace”](#trace)
[code] 
    Trace: 1;
[/code]

The “trace” level.

Designates very low priority, often extremely verbose, information.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L20>

##### [Warn](#warn)

[Section titled “Warn”](#warn)
[code] 
    Warn: 4;
[/code]

The “warn” level.

Designates hazardous situations.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L38>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [LogOptions](#logoptions)

[Section titled “LogOptions”](#logoptions)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`file?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L9>  
`keyValues?`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `undefined` | `string`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L11>  
`line?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L10>  
  
## [Functions](#functions)

[Section titled “Functions”](#functions)

### [attachConsole()](#attachconsole)

[Section titled “attachConsole()”](#attachconsole)
[code] 
    function attachConsole(): Promise<UnlistenFn>
[/code]

Attaches a listener that writes log entries to the console as they come in.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

a function to cancel the listener.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L277>

* * *

### [attachLogger()](#attachlogger)

[Section titled “attachLogger()”](#attachlogger)
[code] 
    function attachLogger(fn): Promise<UnlistenFn>
[/code]

Attaches a listener for the log, and calls the passed function for each log entry.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`fn`| `LoggerFn`|   
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

a function to cancel the listener.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L256>

* * *

### [debug()](#debug-1)

[Section titled “debug()”](#debug-1)
[code] 
    function debug(message, options?): Promise<void>
[/code]

Logs a message at the debug level.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`message`| `string`| # Examples `import { debug } from '@tauri-apps/plugin-log'; const pos = { x: 3.234, y: -1.223 }; debug(`New position: x: {pos.x}, y: {pos.y}`);`  
`options`?| [`LogOptions`](/reference/javascript/log/#logoptions)| -  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L214>

* * *

### [error()](#error-1)

[Section titled “error()”](#error-1)
[code] 
    function error(message, options?): Promise<void>
[/code]

Logs a message at the error level.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`message`| `string`| # Examples `import { error } from '@tauri-apps/plugin-log'; const err_info = "No connection"; const port = 22; error(`Error: ${err_info} on port ${port}`);`  
`options`?| [`LogOptions`](/reference/javascript/log/#logoptions)| -  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L148>

* * *

### [info()](#info-1)

[Section titled “info()”](#info-1)
[code] 
    function info(message, options?): Promise<void>
[/code]

Logs a message at the info level.

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type| Description  
---|---|---  
`message`| `string`| # Examples `import { info } from '@tauri-apps/plugin-log'; const conn_info = { port: 40, speed: 3.20 }; info(`Connected to port {conn_info.port} at {conn_info.speed} Mb/s`);`  
`options`?| [`LogOptions`](/reference/javascript/log/#logoptions)| -  
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L192>

* * *

### [trace()](#trace-1)

[Section titled “trace()”](#trace-1)
[code] 
    function trace(message, options?): Promise<void>
[/code]

Logs a message at the trace level.

#### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type| Description  
---|---|---  
`message`| `string`| # Examples `import { trace } from '@tauri-apps/plugin-log'; let pos = { x: 3.234, y: -1.223 }; trace(`Position is: x: {pos.x}, y: {pos.y}`);`  
`options`?| [`LogOptions`](/reference/javascript/log/#logoptions)| -  
  
#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L236>

* * *

### [warn()](#warn-1)

[Section titled “warn()”](#warn-1)
[code] 
    function warn(message, options?): Promise<void>
[/code]

Logs a message at the warn level.

#### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type| Description  
---|---|---  
`message`| `string`| # Examples `import { warn } from '@tauri-apps/plugin-log'; const warn_description = "Invalid Input"; warn(`Warning! {warn_description}!`);`  
`options`?| [`LogOptions`](/reference/javascript/log/#logoptions)| -  
  
#### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/log/guest-js/index.ts#L170>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/log](https://v2.tauri.app/reference/javascript/log)