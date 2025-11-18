# @tauri-apps/plugin-global-shortcut

Register global shortcuts.

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ShortcutEvent](#shortcutevent)

[Section titled “ShortcutEvent”](#shortcutevent)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`id`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L15>  
`shortcut`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L14>  
`state`| `"Released"` | `"Pressed"`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L16>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [ShortcutHandler()](#shortcuthandler)

[Section titled “ShortcutHandler()”](#shortcuthandler)
[code] 
    type ShortcutHandler: (event) => void;
[/code]

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`event`| [`ShortcutEvent`](/reference/javascript/global-shortcut/#shortcutevent)  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

`void`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L19>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [isRegistered()](#isregistered)

[Section titled “isRegistered()”](#isregistered)
[code] 
    function isRegistered(shortcut): Promise<boolean>
[/code]

Determines whether the given shortcut is registered by this application or not.

If the shortcut is registered by another application, it will still return `false`.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`shortcut`| `string`| shortcut definition, modifiers and key separated by ”+” e.g. CmdOrControl+Q  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { isRegistered } from '@tauri-apps/plugin-global-shortcut';
    
    const isRegistered = await isRegistered('CommandOrControl+P');
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L117>

* * *

### [register()](#register)

[Section titled “register()”](#register)
[code] 
    function register(shortcuts, handler): Promise<void>
[/code]

Register a global shortcut or a list of shortcuts.

The handler is called when any of the registered shortcuts are pressed by the user.

If the shortcut is already taken by another application, the handler will not be triggered. Make sure the shortcut is as unique as possible while still taking user experience into consideration.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`shortcuts`| `string` | `string`[]| -  
`handler`| [`ShortcutHandler`](/reference/javascript/global-shortcut/#shortcuthandler)| Shortcut handler callback - takes the triggered shortcut as argument  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { register } from '@tauri-apps/plugin-global-shortcut';
    
    
    
    
    // register a single hotkey
    
    await register('CommandOrControl+Shift+C', (event) => {
    
      if (event.state === "Pressed") {
    
          console.log('Shortcut triggered');
    
      }
    
    });
    
    
    
    
    // or register multiple hotkeys at once
    
    await register(['CommandOrControl+Shift+C', 'Alt+A'], (event) => {
    
      console.log(`Shortcut ${event.shortcut} triggered`);
    
    });
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L51>

* * *

### [unregister()](#unregister)

[Section titled “unregister()”](#unregister)
[code] 
    function unregister(shortcuts): Promise<void>
[/code]

Unregister a global shortcut or a list of shortcuts.

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`shortcuts`| `string` | `string`[]  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { unregister } from '@tauri-apps/plugin-global-shortcut';
    
    
    
    
    // unregister a single hotkey
    
    await unregister('CmdOrControl+Space');
    
    
    
    
    // or unregister multiple hotkeys at the same time
    
    await unregister(['CmdOrControl+Space', 'Alt+A']);
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L82>

* * *

### [unregisterAll()](#unregisterall)

[Section titled “unregisterAll()”](#unregisterall)
[code] 
    function unregisterAll(): Promise<void>
[/code]

Unregister all global shortcuts.

#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { unregisterAll } from '@tauri-apps/plugin-global-shortcut';
    
    await unregisterAll();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/global-shortcut/guest-js/index.ts#L98>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/global-shortcut](https://v2.tauri.app/reference/javascript/global-shortcut)