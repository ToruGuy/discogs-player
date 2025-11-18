# @tauri-apps/plugin-clipboard-manager

Read and write to the system clipboard.

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [clear()](#clear)

[Section titled “clear()”](#clear)
[code] 
    function clear(): Promise<void>
[/code]

Clears the clipboard.

Platform-specific

  * **Android:** Only supported on SDK 28+. For older releases we write an empty string to the clipboard instead.


#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { clear } from '@tauri-apps/plugin-clipboard-manager';
    
    await clear();
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/clipboard-manager/guest-js/index.ts#L147>

* * *

### [readImage()](#readimage)

[Section titled “readImage()”](#readimage)
[code] 
    function readImage(): Promise<Image>
[/code]

Gets the clipboard content as Uint8Array image.

Platform-specific

  * **Android / iOS:** Not supported.


#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`Image`>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { readImage } from '@tauri-apps/plugin-clipboard-manager';
    
    
    
    
    const clipboardImage = await readImage();
    
    const blob = new Blob([await clipboardImage.rgba()], { type: 'image' })
    
    const url = URL.createObjectURL(blob)
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/clipboard-manager/guest-js/index.ts#L99>

* * *

### [readText()](#readtext)

[Section titled “readText()”](#readtext)
[code] 
    function readText(): Promise<string>
[/code]

Gets the clipboard content as plain text.

#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { readText } from '@tauri-apps/plugin-clipboard-manager';
    
    const clipboardText = await readText();
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/clipboard-manager/guest-js/index.ts#L46>

* * *

### [writeHtml()](#writehtml)

[Section titled “writeHtml()”](#writehtml)
[code] 
    function writeHtml(html, altText?): Promise<void>
[/code]

  * Writes HTML or fallbacks to write provided plain text to the clipboard.


Platform-specific

  * **Android / iOS:** Not supported.


#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`html`| `string`  
`altText`?| `string`  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { writeHtml } from '@tauri-apps/plugin-clipboard-manager';
    
    await writeHtml('<h1>Tauri is awesome!</h1>', 'plaintext');
    
    // The following will write "<h1>Tauri is awesome</h1>" as plain text
    
    await writeHtml('<h1>Tauri is awesome!</h1>', '<h1>Tauri is awesome</h1>');
    
    // we can read html data only as a string so there's just readText(), no readHtml()
    
    assert(await readText(), '<h1>Tauri is awesome!</h1>');
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/clipboard-manager/guest-js/index.ts#L126>

* * *

### [writeImage()](#writeimage)

[Section titled “writeImage()”](#writeimage)
[code] 
    function writeImage(image): Promise<void>
[/code]

Writes image buffer to the clipboard.

Platform-specific

  * **Android / iOS:** Not supported.


#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`image`| | `string` | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `Image`  
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { writeImage } from '@tauri-apps/plugin-clipboard-manager';
    
    const buffer = [
    
      // A red pixel
    
      255, 0, 0, 255,
    
    
    
    
     // A green pixel
    
      0, 255, 0, 255,
    
    ];
    
    await writeImage(buffer);
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/clipboard-manager/guest-js/index.ts#L74>

* * *

### [writeText()](#writetext)

[Section titled “writeText()”](#writetext)
[code] 
    function writeText(text, opts?): Promise<void>
[/code]

Writes plain text to the clipboard.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`text`| `string`  
`opts`?| `object`  
`opts.label`?| `string`  
  
#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';
    
    await writeText('Tauri is awesome!');
    
    assert(await readText(), 'Tauri is awesome!');
[/code]

#### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/clipboard-manager/guest-js/index.ts#L27>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/clipboard-manager](https://v2.tauri.app/reference/javascript/clipboard-manager)