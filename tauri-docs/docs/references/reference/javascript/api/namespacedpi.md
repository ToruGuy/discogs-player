# dpi

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [LogicalPosition](#logicalposition)

[Section titled “LogicalPosition”](#logicalposition)

A position represented in logical pixels. For an explanation of what logical pixels are, see description of [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize).

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new LogicalPosition()](#new-logicalposition)

[Section titled “new LogicalPosition()”](#new-logicalposition)
[code] 
    new LogicalPosition(x, y): LogicalPosition
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`x`| `number`  
`y`| `number`  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L219>

##### [new LogicalPosition()](#new-logicalposition-1)

[Section titled “new LogicalPosition()”](#new-logicalposition-1)
[code] 
    new LogicalPosition(object): LogicalPosition
[/code]

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`object`| `object`  
`object.Logical`| `object`  
`object.Logical.x`| `number`  
`object.Logical.y`| `number`  
  
###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L220>

##### [new LogicalPosition()](#new-logicalposition-2)

[Section titled “new LogicalPosition()”](#new-logicalposition-2)
[code] 
    new LogicalPosition(object): LogicalPosition
[/code]

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`object`| `object`  
`object.x`| `number`  
`object.y`| `number`  
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L221>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Modifier| Type| Default value| Defined in  
---|---|---|---|---  
`type`| `readonly`| `"Logical"`| `'Logical'`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L215>  
`x`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L216>  
`y`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L217>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__)
[code] 
    __TAURI_TO_IPC_KEY__(): object
[/code]

###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

`object`

Name| Type| Defined in  
---|---|---  
`x`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L263>  
`y`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L264>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L261>

##### [toJSON()](#tojson)

[Section titled “toJSON()”](#tojson)
[code] 
    toJSON(): object
[/code]

###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

`object`

Name| Type| Defined in  
---|---|---  
`x`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L263>  
`y`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L264>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L268>

##### [toPhysical()](#tophysical)

[Section titled “toPhysical()”](#tophysical)
[code] 
    toPhysical(scaleFactor): PhysicalPosition
[/code]

Converts the logical position to a physical one.

###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)

###### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { LogicalPosition } from '@tauri-apps/api/dpi';
    
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    
    
    
    const appWindow = getCurrentWindow();
    
    const factor = await appWindow.scaleFactor();
    
    const position = new LogicalPosition(400, 500);
    
    const physical = position.toPhysical(factor);
[/code]

###### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L257>

* * *

### [LogicalSize](#logicalsize)

[Section titled “LogicalSize”](#logicalsize)

A size represented in logical pixels. Logical pixels are scaled according to the window’s DPI scale. Most browser APIs (i.e. `MouseEvent`’s `clientX`) will return logical pixels.

For logical-pixel-based position, see [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition).

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

#### [Constructors](#constructors-1)

[Section titled “Constructors”](#constructors-1)

##### [new LogicalSize()](#new-logicalsize)

[Section titled “new LogicalSize()”](#new-logicalsize)
[code] 
    new LogicalSize(width, height): LogicalSize
[/code]

###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`width`| `number`  
`height`| `number`  
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L21>

##### [new LogicalSize()](#new-logicalsize-1)

[Section titled “new LogicalSize()”](#new-logicalsize-1)
[code] 
    new LogicalSize(object): LogicalSize
[/code]

###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`object`| `object`  
`object.Logical`| `object`  
`object.Logical.height`| `number`  
`object.Logical.width`| `number`  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L22>

##### [new LogicalSize()](#new-logicalsize-2)

[Section titled “new LogicalSize()”](#new-logicalsize-2)
[code] 
    new LogicalSize(object): LogicalSize
[/code]

###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`object`| `object`  
`object.height`| `number`  
`object.width`| `number`  
  
###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L23>

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Modifier| Type| Default value| Defined in  
---|---|---|---|---  
`height`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L19>  
`type`| `readonly`| `"Logical"`| `'Logical'`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L17>  
`width`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L18>  
  
#### [Methods](#methods-1)

[Section titled “Methods”](#methods-1)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__-1)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__-1)
[code] 
    __TAURI_TO_IPC_KEY__(): object
[/code]

###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

`object`

Name| Type| Defined in  
---|---|---  
`height`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L66>  
`width`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L65>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L63>

##### [toJSON()](#tojson-1)

[Section titled “toJSON()”](#tojson-1)
[code] 
    toJSON(): object
[/code]

###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

`object`

Name| Type| Defined in  
---|---|---  
`height`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L66>  
`width`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L65>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L70>

##### [toPhysical()](#tophysical-1)

[Section titled “toPhysical()”](#tophysical-1)
[code] 
    toPhysical(scaleFactor): PhysicalSize
[/code]

Converts the logical size to a physical one.

###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)

###### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { LogicalSize } from '@tauri-apps/api/dpi';
    
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    
    
    
    const appWindow = getCurrentWindow();
    
    const factor = await appWindow.scaleFactor();
    
    const size = new LogicalSize(400, 500);
    
    const physical = size.toPhysical(factor);
[/code]

###### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L59>

* * *

### [PhysicalPosition](#physicalposition)

[Section titled “PhysicalPosition”](#physicalposition)

A position represented in physical pixels.

For an explanation of what physical pixels are, see description of [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize).

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

#### [Constructors](#constructors-2)

[Section titled “Constructors”](#constructors-2)

##### [new PhysicalPosition()](#new-physicalposition)

[Section titled “new PhysicalPosition()”](#new-physicalposition)
[code] 
    new PhysicalPosition(x, y): PhysicalPosition
[/code]

###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`x`| `number`  
`y`| `number`  
  
###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L286>

##### [new PhysicalPosition()](#new-physicalposition-1)

[Section titled “new PhysicalPosition()”](#new-physicalposition-1)
[code] 
    new PhysicalPosition(object): PhysicalPosition
[/code]

###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`object`| `object`  
`object.Physical`| `object`  
`object.Physical.x`| `number`  
`object.Physical.y`| `number`  
  
###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L287>

##### [new PhysicalPosition()](#new-physicalposition-2)

[Section titled “new PhysicalPosition()”](#new-physicalposition-2)
[code] 
    new PhysicalPosition(object): PhysicalPosition
[/code]

###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`object`| `object`  
`object.x`| `number`  
`object.y`| `number`  
  
###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L288>

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Modifier| Type| Default value| Defined in  
---|---|---|---|---  
`type`| `readonly`| `"Physical"`| `'Physical'`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L282>  
`x`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L283>  
`y`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L284>  
  
#### [Methods](#methods-2)

[Section titled “Methods”](#methods-2)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__-2)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__-2)
[code] 
    __TAURI_TO_IPC_KEY__(): object
[/code]

###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

`object`

Name| Type| Defined in  
---|---|---  
`x`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L330>  
`y`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L331>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L328>

##### [toJSON()](#tojson-2)

[Section titled “toJSON()”](#tojson-2)
[code] 
    toJSON(): object
[/code]

###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

`object`

Name| Type| Defined in  
---|---|---  
`x`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L330>  
`y`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L331>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L335>

##### [toLogical()](#tological)

[Section titled “toLogical()”](#tological)
[code] 
    toLogical(scaleFactor): LogicalPosition
[/code]

Converts the physical position to a logical one.

###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition)

###### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { PhysicalPosition } from '@tauri-apps/api/dpi';
    
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    
    
    
    const appWindow = getCurrentWindow();
    
    const factor = await appWindow.scaleFactor();
    
    const position = new PhysicalPosition(400, 500);
    
    const physical = position.toLogical(factor);
[/code]

###### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L324>

* * *

### [PhysicalSize](#physicalsize)

[Section titled “PhysicalSize”](#physicalsize)

A size represented in physical pixels.

Physical pixels represent actual screen pixels, and are DPI-independent. For high-DPI windows, this means that any point in the window on the screen will have a different position in logical pixels [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize).

For physical-pixel-based position, see [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition).

#### [Since](#since-6)

[Section titled “Since”](#since-6)

2.0.0

#### [Constructors](#constructors-3)

[Section titled “Constructors”](#constructors-3)

##### [new PhysicalSize()](#new-physicalsize)

[Section titled “new PhysicalSize()”](#new-physicalsize)
[code] 
    new PhysicalSize(width, height): PhysicalSize
[/code]

###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type  
---|---  
`width`| `number`  
`height`| `number`  
  
###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L92>

##### [new PhysicalSize()](#new-physicalsize-1)

[Section titled “new PhysicalSize()”](#new-physicalsize-1)
[code] 
    new PhysicalSize(object): PhysicalSize
[/code]

###### [Parameters](#parameters-13)

[Section titled “Parameters”](#parameters-13)

Parameter| Type  
---|---  
`object`| `object`  
`object.Physical`| `object`  
`object.Physical.height`| `number`  
`object.Physical.width`| `number`  
  
###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L93>

##### [new PhysicalSize()](#new-physicalsize-2)

[Section titled “new PhysicalSize()”](#new-physicalsize-2)
[code] 
    new PhysicalSize(object): PhysicalSize
[/code]

###### [Parameters](#parameters-14)

[Section titled “Parameters”](#parameters-14)

Parameter| Type  
---|---  
`object`| `object`  
`object.height`| `number`  
`object.width`| `number`  
  
###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L94>

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Modifier| Type| Default value| Defined in  
---|---|---|---|---  
`height`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L90>  
`type`| `readonly`| `"Physical"`| `'Physical'`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L88>  
`width`| `public`| `number`| `undefined`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L89>  
  
#### [Methods](#methods-3)

[Section titled “Methods”](#methods-3)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__-3)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__-3)
[code] 
    __TAURI_TO_IPC_KEY__(): object
[/code]

###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

`object`

Name| Type| Defined in  
---|---|---  
`height`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L133>  
`width`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L132>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L130>

##### [toJSON()](#tojson-3)

[Section titled “toJSON()”](#tojson-3)
[code] 
    toJSON(): object
[/code]

###### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

`object`

Name| Type| Defined in  
---|---|---  
`height`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L133>  
`width`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L132>  
  
**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L137>

##### [toLogical()](#tological-1)

[Section titled “toLogical()”](#tological-1)
[code] 
    toLogical(scaleFactor): LogicalSize
[/code]

Converts the physical size to a logical one.

###### [Parameters](#parameters-15)

[Section titled “Parameters”](#parameters-15)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize)

###### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { getCurrentWindow } from '@tauri-apps/api/window';
    
    const appWindow = getCurrentWindow();
    
    const factor = await appWindow.scaleFactor();
    
    const size = await appWindow.innerSize(); // PhysicalSize
    
    const logical = size.toLogical(factor);
[/code]

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L126>

* * *

### [Position](#position)

[Section titled “Position”](#position)

A position represented either in physical or in logical pixels.

This type is basically a union type of [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) and [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) but comes in handy when using `tauri::Position` in Rust as an argument to a command, as this class automatically serializes into a valid format so it can be deserialized correctly into `tauri::Position`

So instead of
[code] 
    import { invoke } from '@tauri-apps/api/core';
    
    import { LogicalPosition, PhysicalPosition } from '@tauri-apps/api/dpi';
    
    
    
    
    const position: LogicalPosition | PhysicalPosition = someFunction(); // where someFunction returns either LogicalPosition or PhysicalPosition
    
    const validPosition = position instanceof LogicalPosition
    
      ? { Logical: { x: position.x, y: position.y } }
    
      : { Physical: { x: position.x, y: position.y } }
    
    await invoke("do_something_with_position", { position: validPosition });
[/code]

You can just use [`Position`](/reference/javascript/api/namespacedpi/#position)
[code] 
    import { invoke } from '@tauri-apps/api/core';
    
    import { LogicalPosition, PhysicalPosition, Position } from '@tauri-apps/api/dpi';
    
    
    
    
    const position: LogicalPosition | PhysicalPosition = someFunction(); // where someFunction returns either LogicalPosition or PhysicalPosition
    
    const validPosition = new Position(position);
    
    await invoke("do_something_with_position", { position: validPosition });
[/code]

#### [Since](#since-7)

[Section titled “Since”](#since-7)

2.1.0

#### [Constructors](#constructors-4)

[Section titled “Constructors”](#constructors-4)

##### [new Position()](#new-position)

[Section titled “new Position()”](#new-position)
[code] 
    new Position(position): Position
[/code]

###### [Parameters](#parameters-16)

[Section titled “Parameters”](#parameters-16)

Parameter| Type  
---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)  
  
###### [Returns](#returns-24)

[Section titled “Returns”](#returns-24)

[`Position`](/reference/javascript/api/namespacedpi/#position)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L375>

#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Defined in  
---|---|---  
`position`| [`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition) | [`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L373>  
  
#### [Methods](#methods-4)

[Section titled “Methods”](#methods-4)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__-4)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__-4)
[code] 
    __TAURI_TO_IPC_KEY__(): object
[/code]

###### [Returns](#returns-25)

[Section titled “Returns”](#returns-25)

`object`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L391>

##### [toJSON()](#tojson-4)

[Section titled “toJSON()”](#tojson-4)
[code] 
    toJSON(): object
[/code]

###### [Returns](#returns-26)

[Section titled “Returns”](#returns-26)

`object`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L400>

##### [toLogical()](#tological-2)

[Section titled “toLogical()”](#tological-2)
[code] 
    toLogical(scaleFactor): LogicalPosition
[/code]

###### [Parameters](#parameters-17)

[Section titled “Parameters”](#parameters-17)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-27)

[Section titled “Returns”](#returns-27)

[`LogicalPosition`](/reference/javascript/api/namespacedpi/#logicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L379>

##### [toPhysical()](#tophysical-2)

[Section titled “toPhysical()”](#tophysical-2)
[code] 
    toPhysical(scaleFactor): PhysicalPosition
[/code]

###### [Parameters](#parameters-18)

[Section titled “Parameters”](#parameters-18)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-28)

[Section titled “Returns”](#returns-28)

[`PhysicalPosition`](/reference/javascript/api/namespacedpi/#physicalposition)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L385>

* * *

### [Size](#size)

[Section titled “Size”](#size)

A size represented either in physical or in logical pixels.

This type is basically a union type of [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) and [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize) but comes in handy when using `tauri::Size` in Rust as an argument to a command, as this class automatically serializes into a valid format so it can be deserialized correctly into `tauri::Size`

So instead of
[code] 
    import { invoke } from '@tauri-apps/api/core';
    
    import { LogicalSize, PhysicalSize } from '@tauri-apps/api/dpi';
    
    
    
    
    const size: LogicalSize | PhysicalSize = someFunction(); // where someFunction returns either LogicalSize or PhysicalSize
    
    const validSize = size instanceof LogicalSize
    
      ? { Logical: { width: size.width, height: size.height } }
    
      : { Physical: { width: size.width, height: size.height } }
    
    await invoke("do_something_with_size", { size: validSize });
[/code]

You can just use [`Size`](/reference/javascript/api/namespacedpi/#size)
[code] 
    import { invoke } from '@tauri-apps/api/core';
    
    import { LogicalSize, PhysicalSize, Size } from '@tauri-apps/api/dpi';
    
    
    
    
    const size: LogicalSize | PhysicalSize = someFunction(); // where someFunction returns either LogicalSize or PhysicalSize
    
    const validSize = new Size(size);
    
    await invoke("do_something_with_size", { size: validSize });
[/code]

#### [Since](#since-8)

[Section titled “Since”](#since-8)

2.1.0

#### [Constructors](#constructors-5)

[Section titled “Constructors”](#constructors-5)

##### [new Size()](#new-size)

[Section titled “new Size()”](#new-size)
[code] 
    new Size(size): Size
[/code]

###### [Parameters](#parameters-19)

[Section titled “Parameters”](#parameters-19)

Parameter| Type  
---|---  
`size`| [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)  
  
###### [Returns](#returns-29)

[Section titled “Returns”](#returns-29)

[`Size`](/reference/javascript/api/namespacedpi/#size)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L177>

#### [Properties](#properties-5)

[Section titled “Properties”](#properties-5)

Property| Type| Defined in  
---|---|---  
`size`| [`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize) | [`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L175>  
  
#### [Methods](#methods-5)

[Section titled “Methods”](#methods-5)

##### [__TAURI_TO_IPC_KEY__()](#__tauri_to_ipc_key__-5)

[Section titled “__TAURI_TO_IPC_KEY__()”](#__tauri_to_ipc_key__-5)
[code] 
    __TAURI_TO_IPC_KEY__(): object
[/code]

###### [Returns](#returns-30)

[Section titled “Returns”](#returns-30)

`object`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L193>

##### [toJSON()](#tojson-5)

[Section titled “toJSON()”](#tojson-5)
[code] 
    toJSON(): object
[/code]

###### [Returns](#returns-31)

[Section titled “Returns”](#returns-31)

`object`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L202>

##### [toLogical()](#tological-3)

[Section titled “toLogical()”](#tological-3)
[code] 
    toLogical(scaleFactor): LogicalSize
[/code]

###### [Parameters](#parameters-20)

[Section titled “Parameters”](#parameters-20)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-32)

[Section titled “Returns”](#returns-32)

[`LogicalSize`](/reference/javascript/api/namespacedpi/#logicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L181>

##### [toPhysical()](#tophysical-3)

[Section titled “toPhysical()”](#tophysical-3)
[code] 
    toPhysical(scaleFactor): PhysicalSize
[/code]

###### [Parameters](#parameters-21)

[Section titled “Parameters”](#parameters-21)

Parameter| Type  
---|---  
`scaleFactor`| `number`  
  
###### [Returns](#returns-33)

[Section titled “Returns”](#returns-33)

[`PhysicalSize`](/reference/javascript/api/namespacedpi/#physicalsize)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/dpi.ts#L187>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacedpi](https://v2.tauri.app/reference/javascript/api/namespacedpi)