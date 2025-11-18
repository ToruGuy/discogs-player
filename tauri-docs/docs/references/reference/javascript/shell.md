# @tauri-apps/plugin-shell

Access the system shell. Allows you to spawn child processes and manage files and URLs using their default application.

## [Security](#security)

[Section titled “Security”](#security)

This API has a scope configuration that forces you to restrict the programs and arguments that can be used.

### [Restricting access to the ](#restricting-access-to-the-open-api)[`open`](/reference/javascript/shell/#open) API

[Section titled “Restricting access to the open API”](#restricting-access-to-the-open-api)

On the configuration object, `open: true` means that the [open](/reference/javascript/shell/#open) API can be used with any URL, as the argument is validated with the `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+` regex. You can change that regex by changing the boolean value to a string, e.g. `open: ^https://github.com/`.

### [Restricting access to the ](#restricting-access-to-the-command-apis)[`Command`](/reference/javascript/shell/#commando) APIs

[Section titled “Restricting access to the Command APIs”](#restricting-access-to-the-command-apis)

The plugin permissions object has a `scope` field that defines an array of CLIs that can be used. Each CLI is a configuration object `{ name: string, cmd: string, sidecar?: bool, args?: boolean | Arg[] }`.

  * `name`: the unique identifier of the command, passed to the [Command.create function](/reference/javascript/shell/#create). If it’s a sidecar, this must be the value defined on `tauri.conf.json > bundle > externalBin`.
  * `cmd`: the program that is executed on this configuration. If it’s a sidecar, this value is ignored.
  * `sidecar`: whether the object configures a sidecar or a system program.
  * `args`: the arguments that can be passed to the program. By default no arguments are allowed. 
    * `true` means that any argument list is allowed.
    * `false` means that no arguments are allowed.
    * otherwise an array can be configured. Each item is either a string representing the fixed argument value or a `{ validator: string }` that defines a regex validating the argument value.


#### [Example scope configuration](#example-scope-configuration)

[Section titled “Example scope configuration”](#example-scope-configuration)

CLI: `git commit -m "the commit message"`

Capability:
[code] 
    {
    
      "permissions": [
    
        {
    
          "identifier": "shell:allow-execute",
    
          "allow": [
    
            {
    
              "name": "run-git-commit",
    
              "cmd": "git",
    
              "args": ["commit", "-m", { "validator": "\\S+" }]
    
            }
    
          ]
    
        }
    
      ]
    
    }
[/code]

Usage:
[code] 
    import { Command } from '@tauri-apps/plugin-shell'
    
    Command.create('run-git-commit', ['commit', '-m', 'the commit message'])
[/code]

Trying to execute any API with a program not configured on the scope results in a promise rejection due to denied access.

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Child](#child)

[Section titled “Child”](#child)

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new Child()](#new-child)

[Section titled “new Child()”](#new-child)
[code] 
    new Child(pid): Child
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`pid`| `number`  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Child`](/reference/javascript/shell/#child)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L301>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`pid`| `number`| The child process `pid`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L299>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [kill()](#kill)

[Section titled “kill()”](#kill)
[code] 
    kill(): Promise<void>
[/code]

Kills the child process.

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L336>

##### [write()](#write)

[Section titled “write()”](#write)
[code] 
    write(data): Promise<void>
[/code]

Writes `data` to the `stdin`.

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`data`| [`IOPayload`](/reference/javascript/shell/#iopayload) | `number`[]| The message to write, either a string or a byte array.  
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

###### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.create('node');
    
    const child = await command.spawn();
    
    await child.write('message');
    
    await child.write([0, 1, 2, 3, 4, 5]);
[/code]

###### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L322>

* * *

### [Command<O>](#commando)

[Section titled “Command<O>”](#commando)

The entry point for spawning child processes. It emits the `close` and `error` events.

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.create('node');
    
    command.on('close', data => {
    
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    
    });
    
    command.on('error', error => console.error(`command error: "${error}"`));
    
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
    
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
    
    
    
    
    const child = await command.spawn();
    
    console.log('pid:', child.pid);
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * [`EventEmitter`](/reference/javascript/shell/#eventemittere)<[`CommandEvents`](/reference/javascript/shell/#commandevents)>


#### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`O` _extends_ [`IOPayload`](/reference/javascript/shell/#iopayload)  
  
#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Modifier| Type| Description| Defined in  
---|---|---|---|---  
`stderr`| `readonly`| [`EventEmitter`](/reference/javascript/shell/#eventemittere)<[`OutputEvents`](/reference/javascript/shell/#outputeventso)<`O`>>| Event emitter for the `stderr`. Emits the `data` event.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L384>  
`stdout`| `readonly`| [`EventEmitter`](/reference/javascript/shell/#eventemittere)<[`OutputEvents`](/reference/javascript/shell/#outputeventso)<`O`>>| Event emitter for the `stdout`. Emits the `data` event.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L382>  
  
#### [Methods](#methods-1)

[Section titled “Methods”](#methods-1)

##### [addListener()](#addlistener)

[Section titled “addListener()”](#addlistener)
[code] 
    addListener<N>(eventName, listener): this
[/code]

Alias for `emitter.on(eventName, listener)`.

###### [Type Parameters](#type-parameters-1)

[Section titled “Type Parameters”](#type-parameters-1)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

`this`

###### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`addListener`](/reference/javascript/shell/#addlistener-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L118>

##### [execute()](#execute)

[Section titled “execute()”](#execute)
[code] 
    execute(): Promise<ChildProcess<O>>
[/code]

Executes the command as a child process, waiting for it to finish and collecting all of its output.

###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`ChildProcess`](/reference/javascript/shell/#childprocesso)<`O`>>

A promise resolving to the child process output.

###### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const output = await Command.create('echo', 'message').execute();
    
    assert(output.code === 0);
    
    assert(output.signal === null);
    
    assert(output.stdout === 'message');
    
    assert(output.stderr === '');
[/code]

###### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L530>

##### [listenerCount()](#listenercount)

[Section titled “listenerCount()”](#listenercount)
[code] 
    listenerCount<N>(eventName): number
[/code]

Returns the number of listeners listening to the event named `eventName`.

###### [Type Parameters](#type-parameters-2)

[Section titled “Type Parameters”](#type-parameters-2)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`eventName`| `N`  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

`number`

###### [Since](#since-6)

[Section titled “Since”](#since-6)

2.0.0

###### [Inherited from](#inherited-from-1)

[Section titled “Inherited from”](#inherited-from-1)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`listenerCount`](/reference/javascript/shell/#listenercount-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L241>

##### [off()](#off)

[Section titled “off()”](#off)
[code] 
    off<N>(eventName, listener): this
[/code]

Removes the all specified listener from the listener array for the event eventName Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

`this`

###### [Since](#since-7)

[Section titled “Since”](#since-7)

2.0.0

###### [Inherited from](#inherited-from-2)

[Section titled “Inherited from”](#inherited-from-2)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`off`](/reference/javascript/shell/#off-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L186>

##### [on()](#on)

[Section titled “on()”](#on)
[code] 
    on<N>(eventName, listener): this
[/code]

Adds the `listener` function to the end of the listeners array for the event named `eventName`. No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple times.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-4)

[Section titled “Type Parameters”](#type-parameters-4)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

`this`

###### [Since](#since-8)

[Section titled “Since”](#since-8)

2.0.0

###### [Inherited from](#inherited-from-3)

[Section titled “Inherited from”](#inherited-from-3)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`on`](/reference/javascript/shell/#on-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L147>

##### [once()](#once)

[Section titled “once()”](#once)
[code] 
    once<N>(eventName, listener): this
[/code]

Adds a **one-time**`listener` function for the event named `eventName`. The next time `eventName` is triggered, this listener is removed and then invoked.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-5)

[Section titled “Type Parameters”](#type-parameters-5)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

`this`

###### [Since](#since-9)

[Section titled “Since”](#since-9)

2.0.0

###### [Inherited from](#inherited-from-4)

[Section titled “Inherited from”](#inherited-from-4)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`once`](/reference/javascript/shell/#once-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L169>

##### [prependListener()](#prependlistener)

[Section titled “prependListener()”](#prependlistener)
[code] 
    prependListener<N>(eventName, listener): this
[/code]

Adds the `listener` function to the _beginning_ of the listeners array for the event named `eventName`. No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple times.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-6)

[Section titled “Type Parameters”](#type-parameters-6)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

`this`

###### [Since](#since-10)

[Section titled “Since”](#since-10)

2.0.0

###### [Inherited from](#inherited-from-5)

[Section titled “Inherited from”](#inherited-from-5)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`prependListener`](/reference/javascript/shell/#prependlistener-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L258>

##### [prependOnceListener()](#prependoncelistener)

[Section titled “prependOnceListener()”](#prependoncelistener)
[code] 
    prependOnceListener<N>(eventName, listener): this
[/code]

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this listener is removed, and then invoked.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-7)

[Section titled “Type Parameters”](#type-parameters-7)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

`this`

###### [Since](#since-11)

[Section titled “Since”](#since-11)

2.0.0

###### [Inherited from](#inherited-from-6)

[Section titled “Inherited from”](#inherited-from-6)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`prependOnceListener`](/reference/javascript/shell/#prependoncelistener-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L280>

##### [removeAllListeners()](#removealllisteners)

[Section titled “removeAllListeners()”](#removealllisteners)
[code] 
    removeAllListeners<N>(event?): this
[/code]

Removes all listeners, or those of the specified eventName.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-8)

[Section titled “Type Parameters”](#type-parameters-8)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`event`?| `N`  
  
###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

`this`

###### [Since](#since-12)

[Section titled “Since”](#since-12)

2.0.0

###### [Inherited from](#inherited-from-7)

[Section titled “Inherited from”](#inherited-from-7)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`removeAllListeners`](/reference/javascript/shell/#removealllisteners-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L206>

##### [removeListener()](#removelistener)

[Section titled “removeListener()”](#removelistener)
[code] 
    removeListener<N>(eventName, listener): this
[/code]

Alias for `emitter.off(eventName, listener)`.

###### [Type Parameters](#type-parameters-9)

[Section titled “Type Parameters”](#type-parameters-9)

Type Parameter  
---  
`N` _extends_ keyof [`CommandEvents`](/reference/javascript/shell/#commandevents)  
  
###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

`this`

###### [Since](#since-13)

[Section titled “Since”](#since-13)

2.0.0

###### [Inherited from](#inherited-from-8)

[Section titled “Inherited from”](#inherited-from-8)

[`EventEmitter`](/reference/javascript/shell/#eventemittere).[`removeListener`](/reference/javascript/shell/#removelistener-1)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L130>

##### [spawn()](#spawn)

[Section titled “spawn()”](#spawn)
[code] 
    spawn(): Promise<Child>
[/code]

Executes the command as a child process, returning a handle to it.

###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Child`](/reference/javascript/shell/#child)>

A promise resolving to the child process handle.

###### [Since](#since-14)

[Section titled “Since”](#since-14)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L479>

##### [create()](#create)

[Section titled “create()”](#create)

Creates a command to execute the given program.

###### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.create('my-app', ['run', 'tauri']);
    
    const output = await command.execute();
[/code]

###### [Param](#param)

[Section titled “Param”](#param)

The program to execute. It must be configured in your project’s capabilities.

###### [create(program, args)](#createprogram-args)

[Section titled “create(program, args)”](#createprogram-args)
[code] 
    static create(program, args?): Command<string>
[/code]

Creates a command to execute the given program.

###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type  
---|---  
`program`| `string`  
`args`?| `string` | `string`[]  
  
###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Command`](/reference/javascript/shell/#commando)<`string`>

###### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.create('my-app', ['run', 'tauri']);
    
    const output = await command.execute();
[/code]

###### [Param](#param-1)

[Section titled “Param”](#param-1)

The program to execute. It must be configured in your project’s capabilities.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L406>

###### [create(program, args, options)](#createprogram-args-options)

[Section titled “create(program, args, options)”](#createprogram-args-options)
[code] 
    static create(
    
       program,
    
       args?,
    
    options?): Command<Uint8Array>
[/code]

Creates a command to execute the given program.

###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type  
---|---  
`program`| `string`  
`args`?| `string` | `string`[]  
`options`?| [`SpawnOptions`](/reference/javascript/shell/#spawnoptions) & `object`  
  
###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Command`](/reference/javascript/shell/#commando)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

###### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.create('my-app', ['run', 'tauri']);
    
    const output = await command.execute();
[/code]

###### [Param](#param-2)

[Section titled “Param”](#param-2)

The program to execute. It must be configured in your project’s capabilities.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L407>

###### [create(program, args, options)](#createprogram-args-options-1)

[Section titled “create(program, args, options)”](#createprogram-args-options-1)
[code] 
    static create(
    
       program,
    
       args?,
    
    options?): Command<string>
[/code]

Creates a command to execute the given program.

###### [Parameters](#parameters-13)

[Section titled “Parameters”](#parameters-13)

Parameter| Type  
---|---  
`program`| `string`  
`args`?| `string` | `string`[]  
`options`?| [`SpawnOptions`](/reference/javascript/shell/#spawnoptions)  
  
###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Command`](/reference/javascript/shell/#commando)<`string`>

###### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.create('my-app', ['run', 'tauri']);
    
    const output = await command.execute();
[/code]

###### [Param](#param-3)

[Section titled “Param”](#param-3)

The program to execute. It must be configured in your project’s capabilities.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L412>

##### [sidecar()](#sidecar)

[Section titled “sidecar()”](#sidecar)

Creates a command to execute the given sidecar program.

###### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.sidecar('my-sidecar');
    
    const output = await command.execute();
[/code]

###### [Param](#param-4)

[Section titled “Param”](#param-4)

The program to execute. It must be configured in your project’s capabilities.

###### [sidecar(program, args)](#sidecarprogram-args)

[Section titled “sidecar(program, args)”](#sidecarprogram-args)
[code] 
    static sidecar(program, args?): Command<string>
[/code]

Creates a command to execute the given sidecar program.

###### [Parameters](#parameters-14)

[Section titled “Parameters”](#parameters-14)

Parameter| Type  
---|---  
`program`| `string`  
`args`?| `string` | `string`[]  
  
###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Command`](/reference/javascript/shell/#commando)<`string`>

###### [Example](#example-8)

[Section titled “Example”](#example-8)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.sidecar('my-sidecar');
    
    const output = await command.execute();
[/code]

###### [Param](#param-5)

[Section titled “Param”](#param-5)

The program to execute. It must be configured in your project’s capabilities.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L438>

###### [sidecar(program, args, options)](#sidecarprogram-args-options)

[Section titled “sidecar(program, args, options)”](#sidecarprogram-args-options)
[code] 
    static sidecar(
    
       program,
    
       args?,
    
    options?): Command<Uint8Array>
[/code]

Creates a command to execute the given sidecar program.

###### [Parameters](#parameters-15)

[Section titled “Parameters”](#parameters-15)

Parameter| Type  
---|---  
`program`| `string`  
`args`?| `string` | `string`[]  
`options`?| [`SpawnOptions`](/reference/javascript/shell/#spawnoptions) & `object`  
  
###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Command`](/reference/javascript/shell/#commando)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

###### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.sidecar('my-sidecar');
    
    const output = await command.execute();
[/code]

###### [Param](#param-6)

[Section titled “Param”](#param-6)

The program to execute. It must be configured in your project’s capabilities.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L439>

###### [sidecar(program, args, options)](#sidecarprogram-args-options-1)

[Section titled “sidecar(program, args, options)”](#sidecarprogram-args-options-1)
[code] 
    static sidecar(
    
       program,
    
       args?,
    
    options?): Command<string>
[/code]

Creates a command to execute the given sidecar program.

###### [Parameters](#parameters-16)

[Section titled “Parameters”](#parameters-16)

Parameter| Type  
---|---  
`program`| `string`  
`args`?| `string` | `string`[]  
`options`?| [`SpawnOptions`](/reference/javascript/shell/#spawnoptions)  
  
###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Command`](/reference/javascript/shell/#commando)<`string`>

###### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { Command } from '@tauri-apps/plugin-shell';
    
    const command = Command.sidecar('my-sidecar');
    
    const output = await command.execute();
[/code]

###### [Param](#param-7)

[Section titled “Param”](#param-7)

The program to execute. It must be configured in your project’s capabilities.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L444>

* * *

### [EventEmitter<E>](#eventemittere)

[Section titled “EventEmitter<E>”](#eventemittere)

#### [Since](#since-15)

[Section titled “Since”](#since-15)

2.0.0

#### [Extended by](#extended-by)

[Section titled “Extended by”](#extended-by)

  * [`Command`](/reference/javascript/shell/#commando)


#### [Type Parameters](#type-parameters-10)

[Section titled “Type Parameters”](#type-parameters-10)

Type Parameter  
---  
`E` _extends_ [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `any`>  
  
#### [Constructors](#constructors-1)

[Section titled “Constructors”](#constructors-1)

##### [new EventEmitter()](#new-eventemitter)

[Section titled “new EventEmitter()”](#new-eventemitter)
[code] 
    new EventEmitter<E>(): EventEmitter<E>
[/code]

###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`EventEmitter`](/reference/javascript/shell/#eventemittere)<`E`>

#### [Methods](#methods-2)

[Section titled “Methods”](#methods-2)

##### [addListener()](#addlistener-1)

[Section titled “addListener()”](#addlistener-1)
[code] 
    addListener<N>(eventName, listener): this
[/code]

Alias for `emitter.on(eventName, listener)`.

###### [Type Parameters](#type-parameters-11)

[Section titled “Type Parameters”](#type-parameters-11)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-17)

[Section titled “Parameters”](#parameters-17)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

`this`

###### [Since](#since-16)

[Section titled “Since”](#since-16)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L118>

##### [listenerCount()](#listenercount-1)

[Section titled “listenerCount()”](#listenercount-1)
[code] 
    listenerCount<N>(eventName): number
[/code]

Returns the number of listeners listening to the event named `eventName`.

###### [Type Parameters](#type-parameters-12)

[Section titled “Type Parameters”](#type-parameters-12)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-18)

[Section titled “Parameters”](#parameters-18)

Parameter| Type  
---|---  
`eventName`| `N`  
  
###### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

`number`

###### [Since](#since-17)

[Section titled “Since”](#since-17)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L241>

##### [off()](#off-1)

[Section titled “off()”](#off-1)
[code] 
    off<N>(eventName, listener): this
[/code]

Removes the all specified listener from the listener array for the event eventName Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-13)

[Section titled “Type Parameters”](#type-parameters-13)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-19)

[Section titled “Parameters”](#parameters-19)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

`this`

###### [Since](#since-18)

[Section titled “Since”](#since-18)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L186>

##### [on()](#on-1)

[Section titled “on()”](#on-1)
[code] 
    on<N>(eventName, listener): this
[/code]

Adds the `listener` function to the end of the listeners array for the event named `eventName`. No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple times.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-14)

[Section titled “Type Parameters”](#type-parameters-14)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-20)

[Section titled “Parameters”](#parameters-20)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-24)

[Section titled “Returns”](#returns-24)

`this`

###### [Since](#since-19)

[Section titled “Since”](#since-19)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L147>

##### [once()](#once-1)

[Section titled “once()”](#once-1)
[code] 
    once<N>(eventName, listener): this
[/code]

Adds a **one-time**`listener` function for the event named `eventName`. The next time `eventName` is triggered, this listener is removed and then invoked.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-15)

[Section titled “Type Parameters”](#type-parameters-15)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-21)

[Section titled “Parameters”](#parameters-21)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-25)

[Section titled “Returns”](#returns-25)

`this`

###### [Since](#since-20)

[Section titled “Since”](#since-20)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L169>

##### [prependListener()](#prependlistener-1)

[Section titled “prependListener()”](#prependlistener-1)
[code] 
    prependListener<N>(eventName, listener): this
[/code]

Adds the `listener` function to the _beginning_ of the listeners array for the event named `eventName`. No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple times.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-16)

[Section titled “Type Parameters”](#type-parameters-16)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-22)

[Section titled “Parameters”](#parameters-22)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-26)

[Section titled “Returns”](#returns-26)

`this`

###### [Since](#since-21)

[Section titled “Since”](#since-21)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L258>

##### [prependOnceListener()](#prependoncelistener-1)

[Section titled “prependOnceListener()”](#prependoncelistener-1)
[code] 
    prependOnceListener<N>(eventName, listener): this
[/code]

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this listener is removed, and then invoked.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-17)

[Section titled “Type Parameters”](#type-parameters-17)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-23)

[Section titled “Parameters”](#parameters-23)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-27)

[Section titled “Returns”](#returns-27)

`this`

###### [Since](#since-22)

[Section titled “Since”](#since-22)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L280>

##### [removeAllListeners()](#removealllisteners-1)

[Section titled “removeAllListeners()”](#removealllisteners-1)
[code] 
    removeAllListeners<N>(event?): this
[/code]

Removes all listeners, or those of the specified eventName.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### [Type Parameters](#type-parameters-18)

[Section titled “Type Parameters”](#type-parameters-18)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-24)

[Section titled “Parameters”](#parameters-24)

Parameter| Type  
---|---  
`event`?| `N`  
  
###### [Returns](#returns-28)

[Section titled “Returns”](#returns-28)

`this`

###### [Since](#since-23)

[Section titled “Since”](#since-23)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L206>

##### [removeListener()](#removelistener-1)

[Section titled “removeListener()”](#removelistener-1)
[code] 
    removeListener<N>(eventName, listener): this
[/code]

Alias for `emitter.off(eventName, listener)`.

###### [Type Parameters](#type-parameters-19)

[Section titled “Type Parameters”](#type-parameters-19)

Type Parameter  
---  
`N` _extends_ `string` | `number` | `symbol`  
  
###### [Parameters](#parameters-25)

[Section titled “Parameters”](#parameters-25)

Parameter| Type  
---|---  
`eventName`| `N`  
`listener`| (`arg`) => `void`  
  
###### [Returns](#returns-29)

[Section titled “Returns”](#returns-29)

`this`

###### [Since](#since-24)

[Section titled “Since”](#since-24)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L130>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ChildProcess<O>](#childprocesso)

[Section titled “ChildProcess<O>”](#childprocesso)

#### [Since](#since-25)

[Section titled “Since”](#since-25)

2.0.0

#### [Type Parameters](#type-parameters-20)

[Section titled “Type Parameters”](#type-parameters-20)

Type Parameter  
---  
`O` _extends_ [`IOPayload`](/reference/javascript/shell/#iopayload)  
  
#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Description| Defined in  
---|---|---|---  
`code`| `null` | `number`| Exit code of the process. `null` if the process was terminated by a signal on Unix.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L94>  
`signal`| `null` | `number`| If the process was terminated by a signal, represents that signal.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L96>  
`stderr`| `O`| The data that the process wrote to `stderr`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L100>  
`stdout`| `O`| The data that the process wrote to `stdout`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L98>  
  
* * *

### [CommandEvents](#commandevents)

[Section titled “CommandEvents”](#commandevents)

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Defined in  
---|---|---  
`close`| [`TerminatedPayload`](/reference/javascript/shell/#terminatedpayload)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L345>  
`error`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L346>  
  
* * *

### [OutputEvents<O>](#outputeventso)

[Section titled “OutputEvents<O>”](#outputeventso)

#### [Type Parameters](#type-parameters-21)

[Section titled “Type Parameters”](#type-parameters-21)

Type Parameter  
---  
`O` _extends_ [`IOPayload`](/reference/javascript/shell/#iopayload)  
  
#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Defined in  
---|---|---  
`data`| `O`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L350>  
  
* * *

### [SpawnOptions](#spawnoptions)

[Section titled “SpawnOptions”](#spawnoptions)

#### [Since](#since-26)

[Section titled “Since”](#since-26)

2.0.0

#### [Properties](#properties-5)

[Section titled “Properties”](#properties-5)

Property| Type| Description| Defined in  
---|---|---|---  
`cwd?`| `string`| Current working directory.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L73>  
`encoding?`| `string`| Character encoding for stdout/stderr **Since** 2.0.0| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L81>  
`env?`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `string`>| Environment variables. set to `null` to clear the process env.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L75>  
  
* * *

### [TerminatedPayload](#terminatedpayload)

[Section titled “TerminatedPayload”](#terminatedpayload)

Payload for the `Terminated` command event.

#### [Properties](#properties-6)

[Section titled “Properties”](#properties-6)

Property| Type| Description| Defined in  
---|---|---|---  
`code`| `null` | `number`| Exit code of the process. `null` if the process was terminated by a signal on Unix.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L560>  
`signal`| `null` | `number`| If the process was terminated by a signal, represents that signal.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L562>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [IOPayload](#iopayload)

[Section titled “IOPayload”](#iopayload)
[code] 
    type IOPayload: string | Uint8Array;
[/code]

Event payload type

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L566>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [open()](#open)

[Section titled “open()”](#open)
[code] 
    function open(path, openWith?): Promise<void>
[/code]

Opens a path or URL with the system’s default app, or the one specified with `openWith`.

The `openWith` value must be one of `firefox`, `google chrome`, `chromium` `safari`, `open`, `start`, `xdg-open`, `gio`, `gnome-open`, `kde-open` or `wslview`.

#### [Parameters](#parameters-26)

[Section titled “Parameters”](#parameters-26)

Parameter| Type| Description  
---|---|---  
`path`| `string`| The path or URL to open. This value is matched against the string regex defined on `tauri.conf.json > plugins > shell > open`, which defaults to `^((mailto:\w+)  
`openWith`?| `string`| The app to open the file or URL with. Defaults to the system default application for the specified path type.  
  
#### [Returns](#returns-30)

[Section titled “Returns”](#returns-30)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { open } from '@tauri-apps/plugin-shell';
    
    // opens the given URL on the default browser:
    
    await open('https://github.com/tauri-apps/tauri');
    
    // opens the given URL using `firefox`:
    
    await open('https://github.com/tauri-apps/tauri', 'firefox');
    
    // opens a file using the default program:
    
    await open('/path/to/file');
[/code]

#### [Since](#since-27)

[Section titled “Since”](#since-27)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/shell/guest-js/index.ts#L601>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/shell](https://v2.tauri.app/reference/javascript/shell)