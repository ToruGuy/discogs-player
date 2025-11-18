# image

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Image](#image)

[Section titled “Image”](#image)

An RGBA Image in row-major order from top to bottom.

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * [`Resource`](/reference/javascript/api/namespacecore/#resource)


#### [Accessors](#accessors)

[Section titled “Accessors”](#accessors)

##### [rid](#rid)

[Section titled “rid”](#rid)
[code] 
    get rid(): number
[/code]

###### [Returns](#returns)

[Section titled “Returns”](#returns)

`number`

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

[`Resource`](/reference/javascript/api/namespacecore/#resource).[`rid`](/reference/javascript/api/namespacecore/#rid)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L318>

#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Destroys and cleans up this resource from memory. **You should not call any method on this object anymore and should drop any reference to it.**

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Inherited from](#inherited-from-1)

[Section titled “Inherited from”](#inherited-from-1)

[`Resource`](/reference/javascript/api/namespacecore/#resource).[`close`](/reference/javascript/api/namespacecore/#close)

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/core.ts#L330>

##### [rgba()](#rgba)

[Section titled “rgba()”](#rgba)
[code] 
    rgba(): Promise<Uint8Array>
[/code]

Returns the RGBA data for this image, in row-major order from top to bottom.

###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L89>

##### [size()](#size)

[Section titled “size()”](#size)
[code] 
    size(): Promise<ImageSize>
[/code]

Returns the size of this image.

###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`ImageSize`](/reference/javascript/api/namespaceimage/#imagesize)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L96>

##### [fromBytes()](#frombytes)

[Section titled “fromBytes()”](#frombytes)
[code] 
    static fromBytes(bytes): Promise<Image>
[/code]

Creates a new image using the provided bytes by inferring the file format. If the format is known, prefer [@link Image.fromPngBytes] or [@link Image.fromIcoBytes].

Only `ico` and `png` are supported (based on activated feature flag).

Note that you need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file:
[code] 
    [dependencies]
    
    tauri = { version = "...", features = ["...", "image-png"] }
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`bytes`| [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)  
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Image`](/reference/javascript/api/namespaceimage/#image)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L62>

##### [fromPath()](#frompath)

[Section titled “fromPath()”](#frompath)
[code] 
    static fromPath(path): Promise<Image>
[/code]

Creates a new image using the provided path.

Only `ico` and `png` are supported (based on activated feature flag).

Note that you need the `image-ico` or `image-png` Cargo features to use this API. To enable it, change your Cargo.toml file:
[code] 
    [dependencies]
    
    tauri = { version = "...", features = ["...", "image-png"] }
[/code]

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`path`| `string`  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Image`](/reference/javascript/api/namespaceimage/#image)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L82>

##### [new()](#new)

[Section titled “new()”](#new)
[code] 
    static new(
    
       rgba,
    
       width,
    
    height): Promise<Image>
[/code]

Creates a new Image using RGBA data, in row-major order from top to bottom, and with specified width and height.

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`rgba`| [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)  
`width`| `number`  
`height`| `number`  
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Image`](/reference/javascript/api/namespaceimage/#image)>

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L37>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ImageSize](#imagesize)

[Section titled “ImageSize”](#imagesize)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`height`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L13>  
`width`| `number`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L11>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [MenuIcon](#menuicon)

[Section titled “MenuIcon”](#menuicon)
[code] 
    type MenuIcon:
    
      | NativeIcon
    
      | string
    
      | Image
    
      | Uint8Array
    
      | ArrayBuffer
    
      | number[];
[/code]

A type that represents an icon that can be used in menu items.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L17>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [transformImage()](#transformimage)

[Section titled “transformImage()”](#transformimage)
[code] 
    function transformImage<T>(image): T
[/code]

Transforms image from various types into a type acceptable by Rust.

See [tauri::image::JsImage](https://docs.rs/tauri/2/tauri/image/enum.JsImage.html) for more information. Note the API signature is not stable and might change.

#### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T`  
  
#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`image`| | `null` | `string` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | `number`[] | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [`Image`](/reference/javascript/api/namespaceimage/#image)  
  
#### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

`T`

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/image.ts#L107>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespaceimage](https://v2.tauri.app/reference/javascript/api/namespaceimage)