# @tauri-apps/plugin-store

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [LazyStore](#lazystore)

[Section titled “LazyStore”](#lazystore)

A lazy loaded key-value store persisted by the backend layer.

#### [Implements](#implements)

[Section titled “Implements”](#implements)

  * `IStore`


#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new LazyStore()](#new-lazystore)

[Section titled “new LazyStore()”](#new-lazystore)
[code] 
    new LazyStore(path, options?): LazyStore
[/code]

Note that the options are not applied if someone else already created the store

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`path`| `string`| Path to save the store in `app_data_dir`  
`options`?| [`StoreOptions`](/reference/javascript/store/#storeoptions)| Store configuration options  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`LazyStore`](/reference/javascript/store/#lazystore)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L104>

#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [clear()](#clear)

[Section titled “clear()”](#clear)
[code] 
    clear(): Promise<void>
[/code]

Clears the store, removing all key-value pairs.

Note: To clear the storage and reset it to its `default` value, use [`reset`](/reference/javascript/store/#reset) instead.

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of)

[Section titled “Implementation of”](#implementation-of)

`IStore.clear`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L132>

##### [close()](#close)

[Section titled “close()”](#close)
[code] 
    close(): Promise<void>
[/code]

Close the store and cleans up this resource from memory. **You should not call any method on this object anymore and should drop any reference to it.**

###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-1)

[Section titled “Implementation of”](#implementation-of-1)

`IStore.close`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L177>

##### [delete()](#delete)

[Section titled “delete()”](#delete)
[code] 
    delete(key): Promise<boolean>
[/code]

Removes a key-value pair from the store.

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Implementation of](#implementation-of-2)

[Section titled “Implementation of”](#implementation-of-2)

`IStore.delete`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L128>

##### [entries()](#entries)

[Section titled “entries()”](#entries)
[code] 
    entries<T>(): Promise<[string, T][]>
[/code]

Returns a list of all entries in the store.

###### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T`  
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`string`, `T`][]>

###### [Implementation of](#implementation-of-3)

[Section titled “Implementation of”](#implementation-of-3)

`IStore.entries`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L148>

##### [get()](#get)

[Section titled “get()”](#get)
[code] 
    get<T>(key): Promise<undefined | T>
[/code]

Returns the value for the given `key` or `undefined` if the key does not exist.

###### [Type Parameters](#type-parameters-1)

[Section titled “Type Parameters”](#type-parameters-1)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`undefined` | `T`>

###### [Implementation of](#implementation-of-4)

[Section titled “Implementation of”](#implementation-of-4)

`IStore.get`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L120>

##### [has()](#has)

[Section titled “has()”](#has)
[code] 
    has(key): Promise<boolean>
[/code]

Returns `true` if the given `key` exists in the store.

###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Implementation of](#implementation-of-5)

[Section titled “Implementation of”](#implementation-of-5)

`IStore.has`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L124>

##### [init()](#init)

[Section titled “init()”](#init)
[code] 
    init(): Promise<void>
[/code]

Init/load the store if it’s not loaded already

###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L112>

##### [keys()](#keys)

[Section titled “keys()”](#keys)
[code] 
    keys(): Promise<string[]>
[/code]

Returns a list of all keys in the store.

###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`[]>

###### [Implementation of](#implementation-of-6)

[Section titled “Implementation of”](#implementation-of-6)

`IStore.keys`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L140>

##### [length()](#length)

[Section titled “length()”](#length)
[code] 
    length(): Promise<number>
[/code]

Returns the number of key-value pairs in the store.

###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`number`>

###### [Implementation of](#implementation-of-7)

[Section titled “Implementation of”](#implementation-of-7)

`IStore.length`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L152>

##### [onChange()](#onchange)

[Section titled “onChange()”](#onchange)
[code] 
    onChange<T>(cb): Promise<UnlistenFn>
[/code]

Listen to changes on the store.

###### [Type Parameters](#type-parameters-2)

[Section titled “Type Parameters”](#type-parameters-2)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type| Description  
---|---|---  
`cb`| (`key`, `value`) => `void`|   
  
###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

A promise resolving to a function to unlisten to the event.

###### [Since](#since)

[Section titled “Since”](#since)

2.0.0

###### [Implementation of](#implementation-of-8)

[Section titled “Implementation of”](#implementation-of-8)

`IStore.onChange`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L171>

##### [onKeyChange()](#onkeychange)

[Section titled “onKeyChange()”](#onkeychange)
[code] 
    onKeyChange<T>(key, cb): Promise<UnlistenFn>
[/code]

Listen to changes on a store key.

###### [Type Parameters](#type-parameters-3)

[Section titled “Type Parameters”](#type-parameters-3)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
`cb`| (`value`) => `void`|   
  
###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

A promise resolving to a function to unlisten to the event.

###### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

###### [Implementation of](#implementation-of-9)

[Section titled “Implementation of”](#implementation-of-9)

`IStore.onKeyChange`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L164>

##### [reload()](#reload)

[Section titled “reload()”](#reload)
[code] 
    reload(options?): Promise<void>
[/code]

Attempts to load the on-disk state at the store’s `path` into memory.

This method is useful if the on-disk state was edited by the user and you want to synchronize the changes.

Note:

  * This method loads the data and merges it with the current store, this behavior will be changed to resetting to default first and then merging with the on-disk state in v3, to fully match the store with the on-disk state, set [`ignoreDefaults`](/reference/javascript/store/#reloadoptions) to `true`
  * This method does not emit change events.


###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`options`?| [`ReloadOptions`](/reference/javascript/store/#reloadoptions)  
  
###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-10)

[Section titled “Implementation of”](#implementation-of-10)

`IStore.reload`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L156>

##### [reset()](#reset)

[Section titled “reset()”](#reset)
[code] 
    reset(): Promise<void>
[/code]

Resets the store to its `default` value.

If no default value has been set, this method behaves identical to [`clear`](/reference/javascript/store/#clear).

###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-11)

[Section titled “Implementation of”](#implementation-of-11)

`IStore.reset`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L136>

##### [save()](#save)

[Section titled “save()”](#save)
[code] 
    save(): Promise<void>
[/code]

Saves the store to disk at the store’s `path`.

###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-12)

[Section titled “Implementation of”](#implementation-of-12)

`IStore.save`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L160>

##### [set()](#set)

[Section titled “set()”](#set)
[code] 
    set(key, value): Promise<void>
[/code]

Inserts a key-value pair into the store.

###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
`value`| `unknown`|   
  
###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-13)

[Section titled “Implementation of”](#implementation-of-13)

`IStore.set`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L116>

##### [values()](#values)

[Section titled “values()”](#values)
[code] 
    values<T>(): Promise<T[]>
[/code]

Returns a list of all values in the store.

###### [Type Parameters](#type-parameters-4)

[Section titled “Type Parameters”](#type-parameters-4)

Type Parameter  
---  
`T`  
  
###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`T`[]>

###### [Implementation of](#implementation-of-14)

[Section titled “Implementation of”](#implementation-of-14)

`IStore.values`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L144>

* * *

### [Store](#store)

[Section titled “Store”](#store)

A key-value store persisted by the backend layer.

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * `Resource`


#### [Implements](#implements-1)

[Section titled “Implements”](#implements-1)

  * `IStore`


#### [Accessors](#accessors)

[Section titled “Accessors”](#accessors)

##### [rid](#rid)

[Section titled “rid”](#rid)
[code] 
    get rid(): number
[/code]

###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

`number`

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

`Resource.rid`

**Source** : undefined

#### [Methods](#methods-1)

[Section titled “Methods”](#methods-1)

##### [clear()](#clear-1)

[Section titled “clear()”](#clear-1)
[code] 
    clear(): Promise<void>
[/code]

Clears the store, removing all key-value pairs.

Note: To clear the storage and reset it to its `default` value, use [`reset`](/reference/javascript/store/#reset-1) instead.

###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-15)

[Section titled “Implementation of”](#implementation-of-15)

`IStore.clear`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L267>

##### [close()](#close-1)

[Section titled “close()”](#close-1)
[code] 
    close(): Promise<void>
[/code]

Destroys and cleans up this resource from memory. **You should not call any method on this object anymore and should drop any reference to it.**

###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-16)

[Section titled “Implementation of”](#implementation-of-16)

`IStore.close`

###### [Inherited from](#inherited-from-1)

[Section titled “Inherited from”](#inherited-from-1)

`Resource.close`

**Source** : undefined

##### [delete()](#delete-1)

[Section titled “delete()”](#delete-1)
[code] 
    delete(key): Promise<boolean>
[/code]

Removes a key-value pair from the store.

###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
  
###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Implementation of](#implementation-of-17)

[Section titled “Implementation of”](#implementation-of-17)

`IStore.delete`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L260>

##### [entries()](#entries-1)

[Section titled “entries()”](#entries-1)
[code] 
    entries<T>(): Promise<[string, T][]>
[/code]

Returns a list of all entries in the store.

###### [Type Parameters](#type-parameters-5)

[Section titled “Type Parameters”](#type-parameters-5)

Type Parameter  
---  
`T`  
  
###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`string`, `T`][]>

###### [Implementation of](#implementation-of-18)

[Section titled “Implementation of”](#implementation-of-18)

`IStore.entries`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L283>

##### [get()](#get-1)

[Section titled “get()”](#get-1)
[code] 
    get<T>(key): Promise<undefined | T>
[/code]

Returns the value for the given `key` or `undefined` if the key does not exist.

###### [Type Parameters](#type-parameters-6)

[Section titled “Type Parameters”](#type-parameters-6)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
  
###### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`undefined` | `T`>

###### [Implementation of](#implementation-of-19)

[Section titled “Implementation of”](#implementation-of-19)

`IStore.get`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L245>

##### [has()](#has-1)

[Section titled “has()”](#has-1)
[code] 
    has(key): Promise<boolean>
[/code]

Returns `true` if the given `key` exists in the store.

###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
  
###### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

###### [Implementation of](#implementation-of-20)

[Section titled “Implementation of”](#implementation-of-20)

`IStore.has`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L253>

##### [keys()](#keys-1)

[Section titled “keys()”](#keys-1)
[code] 
    keys(): Promise<string[]>
[/code]

Returns a list of all keys in the store.

###### [Returns](#returns-24)

[Section titled “Returns”](#returns-24)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`[]>

###### [Implementation of](#implementation-of-21)

[Section titled “Implementation of”](#implementation-of-21)

`IStore.keys`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L275>

##### [length()](#length-1)

[Section titled “length()”](#length-1)
[code] 
    length(): Promise<number>
[/code]

Returns the number of key-value pairs in the store.

###### [Returns](#returns-25)

[Section titled “Returns”](#returns-25)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`number`>

###### [Implementation of](#implementation-of-22)

[Section titled “Implementation of”](#implementation-of-22)

`IStore.length`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L287>

##### [onChange()](#onchange-1)

[Section titled “onChange()”](#onchange-1)
[code] 
    onChange<T>(cb): Promise<UnlistenFn>
[/code]

Listen to changes on the store.

###### [Type Parameters](#type-parameters-7)

[Section titled “Type Parameters”](#type-parameters-7)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type| Description  
---|---|---  
`cb`| (`key`, `value`) => `void`|   
  
###### [Returns](#returns-26)

[Section titled “Returns”](#returns-26)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

A promise resolving to a function to unlisten to the event.

###### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

###### [Implementation of](#implementation-of-23)

[Section titled “Implementation of”](#implementation-of-23)

`IStore.onChange`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L310>

##### [onKeyChange()](#onkeychange-1)

[Section titled “onKeyChange()”](#onkeychange-1)
[code] 
    onKeyChange<T>(key, cb): Promise<UnlistenFn>
[/code]

Listen to changes on a store key.

###### [Type Parameters](#type-parameters-8)

[Section titled “Type Parameters”](#type-parameters-8)

Type Parameter  
---  
`T`  
  
###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
`cb`| (`value`) => `void`|   
  
###### [Returns](#returns-27)

[Section titled “Returns”](#returns-27)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`UnlistenFn`>

A promise resolving to a function to unlisten to the event.

###### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

###### [Implementation of](#implementation-of-24)

[Section titled “Implementation of”](#implementation-of-24)

`IStore.onKeyChange`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L299>

##### [reload()](#reload-1)

[Section titled “reload()”](#reload-1)
[code] 
    reload(options?): Promise<void>
[/code]

Attempts to load the on-disk state at the store’s `path` into memory.

This method is useful if the on-disk state was edited by the user and you want to synchronize the changes.

Note:

  * This method loads the data and merges it with the current store, this behavior will be changed to resetting to default first and then merging with the on-disk state in v3, to fully match the store with the on-disk state, set [`ignoreDefaults`](/reference/javascript/store/#reloadoptions) to `true`
  * This method does not emit change events.


###### [Parameters](#parameters-13)

[Section titled “Parameters”](#parameters-13)

Parameter| Type  
---|---  
`options`?| [`ReloadOptions`](/reference/javascript/store/#reloadoptions)  
  
###### [Returns](#returns-28)

[Section titled “Returns”](#returns-28)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-25)

[Section titled “Implementation of”](#implementation-of-25)

`IStore.reload`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L291>

##### [reset()](#reset-1)

[Section titled “reset()”](#reset-1)
[code] 
    reset(): Promise<void>
[/code]

Resets the store to its `default` value.

If no default value has been set, this method behaves identical to [`clear`](/reference/javascript/store/#clear-1).

###### [Returns](#returns-29)

[Section titled “Returns”](#returns-29)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-26)

[Section titled “Implementation of”](#implementation-of-26)

`IStore.reset`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L271>

##### [save()](#save-1)

[Section titled “save()”](#save-1)
[code] 
    save(): Promise<void>
[/code]

Saves the store to disk at the store’s `path`.

###### [Returns](#returns-30)

[Section titled “Returns”](#returns-30)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-27)

[Section titled “Implementation of”](#implementation-of-27)

`IStore.save`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L295>

##### [set()](#set-1)

[Section titled “set()”](#set-1)
[code] 
    set(key, value): Promise<void>
[/code]

Inserts a key-value pair into the store.

###### [Parameters](#parameters-14)

[Section titled “Parameters”](#parameters-14)

Parameter| Type| Description  
---|---|---  
`key`| `string`|   
`value`| `unknown`|   
  
###### [Returns](#returns-31)

[Section titled “Returns”](#returns-31)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

###### [Implementation of](#implementation-of-28)

[Section titled “Implementation of”](#implementation-of-28)

`IStore.set`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L237>

##### [values()](#values-1)

[Section titled “values()”](#values-1)
[code] 
    values<T>(): Promise<T[]>
[/code]

Returns a list of all values in the store.

###### [Type Parameters](#type-parameters-9)

[Section titled “Type Parameters”](#type-parameters-9)

Type Parameter  
---  
`T`  
  
###### [Returns](#returns-32)

[Section titled “Returns”](#returns-32)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`T`[]>

###### [Implementation of](#implementation-of-29)

[Section titled “Implementation of”](#implementation-of-29)

`IStore.values`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L279>

##### [get()](#get-2)

[Section titled “get()”](#get-2)
[code] 
    static get(path): Promise<null | Store>
[/code]

Gets an already loaded store.

If the store is not loaded, returns `null`. In this case you must [load](/reference/javascript/store/#load) it.

This function is more useful when you already know the store is loaded and just need to access its instance. Prefer [Store.load](/reference/javascript/store/#load) otherwise.

###### [Parameters](#parameters-15)

[Section titled “Parameters”](#parameters-15)

Parameter| Type| Description  
---|---|---  
`path`| `string`| Path of the store.  
  
###### [Returns](#returns-33)

[Section titled “Returns”](#returns-33)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Store`](/reference/javascript/store/#store)>

###### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { Store } from '@tauri-apps/api/store';
    
    let store = await Store.get('store.json');
    
    if (!store) {
    
      store = await Store.load('store.json');
    
    }
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L231>

##### [load()](#load)

[Section titled “load()”](#load)
[code] 
    static load(path, options?): Promise<Store>
[/code]

Create a new Store or load the existing store with the path.

###### [Parameters](#parameters-16)

[Section titled “Parameters”](#parameters-16)

Parameter| Type| Description  
---|---|---  
`path`| `string`| Path to save the store in `app_data_dir`  
`options`?| [`StoreOptions`](/reference/javascript/store/#storeoptions)| Store configuration options  
  
###### [Returns](#returns-34)

[Section titled “Returns”](#returns-34)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Store`](/reference/javascript/store/#store)>

###### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { Store } from '@tauri-apps/api/store';
    
    const store = await Store.load('store.json');
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L204>

## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [ReloadOptions](#reloadoptions)

[Section titled “ReloadOptions”](#reloadoptions)
[code] 
    type ReloadOptions: object;
[/code]

Options to IStore.reload a IStore

#### [Type declaration](#type-declaration)

[Section titled “Type declaration”](#type-declaration)

Name| Type| Description| Defined in  
---|---|---|---  
`ignoreDefaults`| `boolean`| To fully match the store with the on-disk state, ignoring defaults| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L461>  
  
**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L457>

* * *

### [StoreOptions](#storeoptions)

[Section titled “StoreOptions”](#storeoptions)
[code] 
    type StoreOptions: object;
[/code]

Options to create a store

#### [Type declaration](#type-declaration-1)

[Section titled “Type declaration”](#type-declaration-1)

Name| Type| Description| Defined in  
---|---|---|---  
`autoSave`| `boolean` | `number`| Auto save on modification with debounce duration in milliseconds, it’s 100ms by default, pass in `false` to disable it| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L28>  
`createNew`| `boolean`| Force create a new store with default values even if it already exists.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L40>  
`defaults`| `object`| Default value of the store| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L24>  
`deserializeFnName`| `string`| Name of a deserialize function registered in the rust side plugin builder| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L36>  
`overrideDefaults`| `boolean`| When creating the store, override the store with the on-disk state if it exists, ignoring defaults| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L44>  
`serializeFnName`| `string`| Name of a serialize function registered in the rust side plugin builder| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L32>  
  
**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L20>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [getStore()](#getstore)

[Section titled “getStore()”](#getstore)
[code] 
    function getStore(path): Promise<Store | null>
[/code]

Gets an already loaded store.

If the store is not loaded, returns `null`. In this case you must [load](/reference/javascript/store/#load) it.

This function is more useful when you already know the store is loaded and just need to access its instance. Prefer [Store.load](/reference/javascript/store/#load) otherwise.

#### [Parameters](#parameters-17)

[Section titled “Parameters”](#parameters-17)

Parameter| Type| Description  
---|---|---  
`path`| `string`| Path of the store.  
  
#### [Returns](#returns-35)

[Section titled “Returns”](#returns-35)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Store`](/reference/javascript/store/#store) | `null`>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { getStore } from '@tauri-apps/api/store';
    
    const store = await getStore('store.json');
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L82>

* * *

### [load()](#load-1)

[Section titled “load()”](#load-1)
[code] 
    function load(path, options?): Promise<Store>
[/code]

Create a new Store or load the existing store with the path.

#### [Parameters](#parameters-18)

[Section titled “Parameters”](#parameters-18)

Parameter| Type| Description  
---|---|---  
`path`| `string`| Path to save the store in `app_data_dir`  
`options`?| [`StoreOptions`](/reference/javascript/store/#storeoptions)| Store configuration options  
  
#### [Returns](#returns-36)

[Section titled “Returns”](#returns-36)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Store`](/reference/javascript/store/#store)>

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { Store } from '@tauri-apps/api/store';
    
    const store = await Store.load('store.json');
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/store/guest-js/index.ts#L59>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/store](https://v2.tauri.app/reference/javascript/store)