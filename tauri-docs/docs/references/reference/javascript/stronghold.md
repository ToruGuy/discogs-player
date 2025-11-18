# @tauri-apps/plugin-stronghold

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Client](#client)

[Section titled “Client”](#client)

#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new Client()](#new-client)

[Section titled “new Client()”](#new-client)
[code] 
    new Client(path, name): Client
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`path`| `string`  
`name`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)  
  
###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Client`](/reference/javascript/stronghold/#client)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L265>

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`name`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L263>  
`path`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L262>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [getStore()](#getstore)

[Section titled “getStore()”](#getstore)
[code] 
    getStore(): Store
[/code]

###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Store`](/reference/javascript/stronghold/#store)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L280>

##### [getVault()](#getvault)

[Section titled “getVault()”](#getvault)
[code] 
    getVault(name): Vault
[/code]

Get a vault by name.

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`name`| [`VaultPath`](/reference/javascript/stronghold/#vaultpath)|   
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Vault`](/reference/javascript/stronghold/#vault)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L276>

* * *

### [Location](#location)

[Section titled “Location”](#location)

#### [Constructors](#constructors-1)

[Section titled “Constructors”](#constructors-1)

##### [new Location()](#new-location)

[Section titled “new Location()”](#new-location)
[code] 
    new Location(type, payload): Location
[/code]

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`type`| `string`  
`payload`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `unknown`>  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Location`](/reference/javascript/stronghold/#location)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L86>

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Defined in  
---|---|---  
`payload`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `unknown`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L84>  
`type`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L83>  
  
#### [Methods](#methods-1)

[Section titled “Methods”](#methods-1)

##### [counter()](#counter)

[Section titled “counter()”](#counter)
[code] 
    static counter(vault, counter): Location
[/code]

###### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`vault`| [`VaultPath`](/reference/javascript/stronghold/#vaultpath)  
`counter`| `number`  
  
###### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Location`](/reference/javascript/stronghold/#location)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L98>

##### [generic()](#generic)

[Section titled “generic()”](#generic)
[code] 
    static generic(vault, record): Location
[/code]

###### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`vault`| [`VaultPath`](/reference/javascript/stronghold/#vaultpath)  
`record`| [`RecordPath`](/reference/javascript/stronghold/#recordpath)  
  
###### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Location`](/reference/javascript/stronghold/#location)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L91>

* * *

### [Store](#store)

[Section titled “Store”](#store)

#### [Constructors](#constructors-2)

[Section titled “Constructors”](#constructors-2)

##### [new Store()](#new-store)

[Section titled “new Store()”](#new-store)
[code] 
    new Store(path, client): Store
[/code]

###### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`path`| `string`  
`client`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)  
  
###### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Store`](/reference/javascript/stronghold/#store)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L289>

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Defined in  
---|---|---  
`client`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L287>  
`path`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L286>  
  
#### [Methods](#methods-2)

[Section titled “Methods”](#methods-2)

##### [get()](#get)

[Section titled “get()”](#get)
[code] 
    get(key): Promise<null | Uint8Array>
[/code]

###### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`key`| [`StoreKey`](/reference/javascript/stronghold/#storekey)  
  
###### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L294>

##### [insert()](#insert)

[Section titled “insert()”](#insert)
[code] 
    insert(
    
       key,
    
       value,
    
    lifetime?): Promise<void>
[/code]

###### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`key`| [`StoreKey`](/reference/javascript/stronghold/#storekey)  
`value`| `number`[]  
`lifetime`?| [`Duration`](/reference/javascript/stronghold/#duration)  
  
###### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L302>

##### [remove()](#remove)

[Section titled “remove()”](#remove)
[code] 
    remove(key): Promise<null | Uint8Array>
[/code]

###### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`key`| [`StoreKey`](/reference/javascript/stronghold/#storekey)  
  
###### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`null` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L316>

* * *

### [Stronghold](#stronghold)

[Section titled “Stronghold”](#stronghold)

A representation of an access to a stronghold.

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Defined in  
---|---|---  
`path`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L388>  
  
#### [Methods](#methods-3)

[Section titled “Methods”](#methods-3)

##### [createClient()](#createclient)

[Section titled “createClient()”](#createclient)
[code] 
    createClient(client): Promise<Client>
[/code]

###### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`client`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)  
  
###### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Client`](/reference/javascript/stronghold/#client)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L428>

##### [loadClient()](#loadclient)

[Section titled “loadClient()”](#loadclient)
[code] 
    loadClient(client): Promise<Client>
[/code]

###### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`client`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)  
  
###### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Client`](/reference/javascript/stronghold/#client)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L421>

##### [save()](#save)

[Section titled “save()”](#save)
[code] 
    save(): Promise<void>
[/code]

Persists the stronghold state to the snapshot.

###### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L439>

##### [unload()](#unload)

[Section titled “unload()”](#unload)
[code] 
    unload(): Promise<void>
[/code]

Remove this instance from the cache.

###### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L415>

##### [load()](#load)

[Section titled “load()”](#load)
[code] 
    static load(path, password): Promise<Stronghold>
[/code]

Load the snapshot if it exists (password must match), or start a fresh stronghold instance otherwise.

###### [Parameters](#parameters-11)

[Section titled “Parameters”](#parameters-11)

Parameter| Type| Description  
---|---|---  
`path`| `string`| -  
`password`| `string`|   
  
###### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Stronghold`](/reference/javascript/stronghold/#stronghold)>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L405>

* * *

### [Vault](#vault)

[Section titled “Vault”](#vault)

A key-value storage that allows create, update and delete operations. It does not allow reading the data, so one of the procedures must be used to manipulate the stored data, allowing secure storage of secrets.

#### [Extends](#extends)

[Section titled “Extends”](#extends)

  * `ProcedureExecutor`


#### [Constructors](#constructors-3)

[Section titled “Constructors”](#constructors-3)

##### [new Vault()](#new-vault)

[Section titled “new Vault()”](#new-vault)
[code] 
    new Vault(
    
       path,
    
       client,
    
       name): Vault
[/code]

###### [Parameters](#parameters-12)

[Section titled “Parameters”](#parameters-12)

Parameter| Type  
---|---  
`path`| `string`  
`client`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)  
`name`| [`VaultPath`](/reference/javascript/stronghold/#vaultpath)  
  
###### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Vault`](/reference/javascript/stronghold/#vault)

###### [Overrides](#overrides)

[Section titled “Overrides”](#overrides)

`ProcedureExecutor.constructor`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L340>

#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Description| Inherited from| Defined in  
---|---|---|---|---  
`client`| [`ClientPath`](/reference/javascript/stronghold/#clientpath)| -| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L336>  
`name`| [`VaultPath`](/reference/javascript/stronghold/#vaultpath)| The vault name.| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L338>  
`path`| `string`| The vault path.| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L335>  
`procedureArgs`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `unknown`>| -| `ProcedureExecutor.procedureArgs`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L107>  
  
#### [Methods](#methods-4)

[Section titled “Methods”](#methods-4)

##### [deriveSLIP10()](#deriveslip10)

[Section titled “deriveSLIP10()”](#deriveslip10)
[code] 
    deriveSLIP10(
    
       chain,
    
       source,
    
       sourceLocation,
    
    outputLocation): Promise<Uint8Array>
[/code]

Derive a SLIP10 private key using a seed or key.

###### [Parameters](#parameters-13)

[Section titled “Parameters”](#parameters-13)

Parameter| Type| Description  
---|---|---  
`chain`| `number`[]| The chain path.  
`source`| `"Seed"` | `"Key"`| The source type, either ‘Seed’ or ‘Key’.  
`sourceLocation`| [`Location`](/reference/javascript/stronghold/#location)| The source location, must be the `outputLocation` of a previous call to `generateSLIP10Seed` or `deriveSLIP10`.  
`outputLocation`| [`Location`](/reference/javascript/stronghold/#location)| Location of the record where the private key will be stored.  
  
###### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

###### [Inherited from](#inherited-from)

[Section titled “Inherited from”](#inherited-from)

`ProcedureExecutor.deriveSLIP10`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L145>

##### [generateBIP39()](#generatebip39)

[Section titled “generateBIP39()”](#generatebip39)
[code] 
    generateBIP39(outputLocation, passphrase?): Promise<Uint8Array>
[/code]

Generate a BIP39 seed.

###### [Parameters](#parameters-14)

[Section titled “Parameters”](#parameters-14)

Parameter| Type| Description  
---|---|---  
`outputLocation`| [`Location`](/reference/javascript/stronghold/#location)| The location of the record where the BIP39 seed will be stored.  
`passphrase`?| `string`| The optional mnemonic passphrase.  
  
###### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

###### [Inherited from](#inherited-from-1)

[Section titled “Inherited from”](#inherited-from-1)

`ProcedureExecutor.generateBIP39`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L200>

##### [generateSLIP10Seed()](#generateslip10seed)

[Section titled “generateSLIP10Seed()”](#generateslip10seed)
[code] 
    generateSLIP10Seed(outputLocation, sizeBytes?): Promise<Uint8Array>
[/code]

Generate a SLIP10 seed for the given location.

###### [Parameters](#parameters-15)

[Section titled “Parameters”](#parameters-15)

Parameter| Type| Description  
---|---|---  
`outputLocation`| [`Location`](/reference/javascript/stronghold/#location)| Location of the record where the seed will be stored.  
`sizeBytes`?| `number`| The size in bytes of the SLIP10 seed.  
  
###### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

###### [Inherited from](#inherited-from-2)

[Section titled “Inherited from”](#inherited-from-2)

`ProcedureExecutor.generateSLIP10Seed`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L120>

##### [getEd25519PublicKey()](#geted25519publickey)

[Section titled “getEd25519PublicKey()”](#geted25519publickey)
[code] 
    getEd25519PublicKey(privateKeyLocation): Promise<Uint8Array>
[/code]

Gets the Ed25519 public key of a SLIP10 private key.

###### [Parameters](#parameters-16)

[Section titled “Parameters”](#parameters-16)

Parameter| Type| Description  
---|---|---  
`privateKeyLocation`| [`Location`](/reference/javascript/stronghold/#location)| The location of the private key. Must be the `outputLocation` of a previous call to `deriveSLIP10`.  
  
###### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

A promise resolving to the public key hex string.

###### [Since](#since)

[Section titled “Since”](#since)

2.0.0

###### [Inherited from](#inherited-from-3)

[Section titled “Inherited from”](#inherited-from-3)

`ProcedureExecutor.getEd25519PublicKey`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L223>

##### [insert()](#insert-1)

[Section titled “insert()”](#insert-1)
[code] 
    insert(recordPath, secret): Promise<void>
[/code]

Insert a record to this vault.

###### [Parameters](#parameters-17)

[Section titled “Parameters”](#parameters-17)

Parameter| Type  
---|---  
`recordPath`| [`RecordPath`](/reference/javascript/stronghold/#recordpath)  
`secret`| `number`[]  
  
###### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L358>

##### [recoverBIP39()](#recoverbip39)

[Section titled “recoverBIP39()”](#recoverbip39)
[code] 
    recoverBIP39(
    
       mnemonic,
    
       outputLocation,
    
    passphrase?): Promise<Uint8Array>
[/code]

Store a BIP39 mnemonic.

###### [Parameters](#parameters-18)

[Section titled “Parameters”](#parameters-18)

Parameter| Type| Description  
---|---|---  
`mnemonic`| `string`| The mnemonic string.  
`outputLocation`| [`Location`](/reference/javascript/stronghold/#location)| The location of the record where the BIP39 mnemonic will be stored.  
`passphrase`?| `string`| The optional mnemonic passphrase.  
  
###### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

###### [Inherited from](#inherited-from-4)

[Section titled “Inherited from”](#inherited-from-4)

`ProcedureExecutor.recoverBIP39`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L175>

##### [remove()](#remove-1)

[Section titled “remove()”](#remove-1)
[code] 
    remove(location): Promise<void>
[/code]

Remove a record from the vault.

###### [Parameters](#parameters-19)

[Section titled “Parameters”](#parameters-19)

Parameter| Type| Description  
---|---|---  
`location`| [`Location`](/reference/javascript/stronghold/#location)| The record location.  
  
###### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L374>

##### [signEd25519()](#signed25519)

[Section titled “signEd25519()”](#signed25519)
[code] 
    signEd25519(privateKeyLocation, msg): Promise<Uint8Array>
[/code]

Creates a Ed25519 signature from a private key.

###### [Parameters](#parameters-20)

[Section titled “Parameters”](#parameters-20)

Parameter| Type| Description  
---|---|---  
`privateKeyLocation`| [`Location`](/reference/javascript/stronghold/#location)| The location of the record where the private key is stored. Must be the `outputLocation` of a previous call to `deriveSLIP10`.  
`msg`| `string`| The message to sign.  
  
###### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>

A promise resolving to the signature hex string.

###### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

###### [Inherited from](#inherited-from-5)

[Section titled “Inherited from”](#inherited-from-5)

`ProcedureExecutor.signEd25519`

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L244>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [AddressInfo](#addressinfo)

[Section titled “AddressInfo”](#addressinfo)

#### [Properties](#properties-5)

[Section titled “Properties”](#properties-5)

Property| Type| Defined in  
---|---|---  
`peers`| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<`string`, [`PeerAddress`](/reference/javascript/stronghold/#peeraddress)>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L43>  
`relays`| `string`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L44>  
  
* * *

### [ClientAccess](#clientaccess)

[Section titled “ClientAccess”](#clientaccess)

#### [Properties](#properties-6)

[Section titled “Properties”](#properties-6)

Property| Type| Defined in  
---|---|---  
`cloneVaultDefault?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L52>  
`cloneVaultExceptions?`| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<[`VaultPath`](/reference/javascript/stronghold/#vaultpath), `boolean`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L53>  
`readStore?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L54>  
`useVaultDefault?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L48>  
`useVaultExceptions?`| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<[`VaultPath`](/reference/javascript/stronghold/#vaultpath), `boolean`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L49>  
`writeStore?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L55>  
`writeVaultDefault?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L50>  
`writeVaultExceptions?`| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<[`VaultPath`](/reference/javascript/stronghold/#vaultpath), `boolean`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L51>  
  
* * *

### [ConnectionLimits](#connectionlimits)

[Section titled “ConnectionLimits”](#connectionlimits)

#### [Properties](#properties-7)

[Section titled “Properties”](#properties-7)

Property| Type| Defined in  
---|---|---  
`maxEstablishedIncoming?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L31>  
`maxEstablishedOutgoing?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L32>  
`maxEstablishedPerPeer?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L33>  
`maxEstablishedTotal?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L34>  
`maxPendingIncoming?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L29>  
`maxPendingOutgoing?`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L30>  
  
* * *

### [Duration](#duration)

[Section titled “Duration”](#duration)

A duration definition.

#### [Properties](#properties-8)

[Section titled “Properties”](#properties-8)

Property| Type| Description| Defined in  
---|---|---|---  
`nanos`| `number`| The fractional part of this Duration, in nanoseconds. Must be greater or equal to 0 and smaller than 1e+9 (the max number of nanoseoncds in a second)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L79>  
`secs`| `number`| The number of whole seconds contained by this Duration.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L77>  
  
* * *

### [NetworkConfig](#networkconfig)

[Section titled “NetworkConfig”](#networkconfig)

#### [Properties](#properties-9)

[Section titled “Properties”](#properties-9)

Property| Type| Defined in  
---|---|---  
`addresses?`| [`AddressInfo`](/reference/javascript/stronghold/#addressinfo)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L69>  
`connectionTimeout?`| [`Duration`](/reference/javascript/stronghold/#duration)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L65>  
`connectionsLimit?`| [`ConnectionLimits`](/reference/javascript/stronghold/#connectionlimits)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L66>  
`enableMdns?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L67>  
`enableRelay?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L68>  
`peerPermissions?`| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<`string`, [`Permissions`](/reference/javascript/stronghold/#permissions)>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L70>  
`permissionsDefault?`| [`Permissions`](/reference/javascript/stronghold/#permissions)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L71>  
`requestTimeout?`| [`Duration`](/reference/javascript/stronghold/#duration)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L64>  
  
* * *

### [PeerAddress](#peeraddress)

[Section titled “PeerAddress”](#peeraddress)

#### [Properties](#properties-10)

[Section titled “Properties”](#properties-10)

Property| Type| Defined in  
---|---|---  
`known`| `string`[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L38>  
`use_relay_fallback`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L39>  
  
* * *

### [Permissions](#permissions)

[Section titled “Permissions”](#permissions)

#### [Properties](#properties-11)

[Section titled “Properties”](#properties-11)

Property| Type| Defined in  
---|---|---  
`default?`| [`ClientAccess`](/reference/javascript/stronghold/#clientaccess)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L59>  
`exceptions?`| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<[`VaultPath`](/reference/javascript/stronghold/#vaultpath), [`ClientAccess`](/reference/javascript/stronghold/#clientaccess)>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L60>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [ClientPath](#clientpath)

[Section titled “ClientPath”](#clientpath)
[code] 
    type ClientPath: string | Iterable<number> | ArrayLike<number> | ArrayBuffer;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L7>

* * *

### [RecordPath](#recordpath)

[Section titled “RecordPath”](#recordpath)
[code] 
    type RecordPath: string | Iterable<number> | ArrayLike<number> | ArrayBuffer;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L17>

* * *

### [StoreKey](#storekey)

[Section titled “StoreKey”](#storekey)
[code] 
    type StoreKey: string | Iterable<number> | ArrayLike<number> | ArrayBuffer;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L22>

* * *

### [VaultPath](#vaultpath)

[Section titled “VaultPath”](#vaultpath)
[code] 
    type VaultPath: string | Iterable<number> | ArrayLike<number> | ArrayBuffer;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/stronghold/guest-js/index.ts#L12>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/stronghold](https://v2.tauri.app/reference/javascript/stronghold)