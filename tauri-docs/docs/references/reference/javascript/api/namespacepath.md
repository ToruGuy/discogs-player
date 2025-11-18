# path

The path module provides utilities for working with file and directory paths.

This package is also accessible with `window.__TAURI__.path` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.

It is recommended to allowlist only the APIs you use for optimal bundle size and security.

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [BaseDirectory](#basedirectory)

[Section titled “BaseDirectory”](#basedirectory)

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [AppCache](#appcache)

[Section titled “AppCache”](#appcache)
[code] 
    AppCache: 16;
[/code]

###### [See](#see)

[Section titled “See”](#see)

[appCacheDir](/reference/javascript/api/namespacepath/#appcachedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L83>

##### [AppConfig](#appconfig)

[Section titled “AppConfig”](#appconfig)
[code] 
    AppConfig: 13;
[/code]

###### [See](#see-1)

[Section titled “See”](#see-1)

[appConfigDir](/reference/javascript/api/namespacepath/#appconfigdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L71>

##### [AppData](#appdata)

[Section titled “AppData”](#appdata)
[code] 
    AppData: 14;
[/code]

###### [See](#see-2)

[Section titled “See”](#see-2)

[appDataDir](/reference/javascript/api/namespacepath/#appdatadir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L75>

##### [AppLocalData](#applocaldata)

[Section titled “AppLocalData”](#applocaldata)
[code] 
    AppLocalData: 15;
[/code]

###### [See](#see-3)

[Section titled “See”](#see-3)

[appLocalDataDir](/reference/javascript/api/namespacepath/#applocaldatadir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L79>

##### [AppLog](#applog)

[Section titled “AppLog”](#applog)
[code] 
    AppLog: 17;
[/code]

###### [See](#see-4)

[Section titled “See”](#see-4)

[appLogDir](/reference/javascript/api/namespacepath/#applogdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L87>

##### [Audio](#audio)

[Section titled “Audio”](#audio)
[code] 
    Audio: 1;
[/code]

###### [See](#see-5)

[Section titled “See”](#see-5)

[audioDir](/reference/javascript/api/namespacepath/#audiodir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L23>

##### [Cache](#cache)

[Section titled “Cache”](#cache)
[code] 
    Cache: 2;
[/code]

###### [See](#see-6)

[Section titled “See”](#see-6)

[cacheDir](/reference/javascript/api/namespacepath/#cachedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L27>

##### [Config](#config)

[Section titled “Config”](#config)
[code] 
    Config: 3;
[/code]

###### [See](#see-7)

[Section titled “See”](#see-7)

[configDir](/reference/javascript/api/namespacepath/#configdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L31>

##### [Data](#data)

[Section titled “Data”](#data)
[code] 
    Data: 4;
[/code]

###### [See](#see-8)

[Section titled “See”](#see-8)

[dataDir](/reference/javascript/api/namespacepath/#datadir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L35>

##### [Desktop](#desktop)

[Section titled “Desktop”](#desktop)
[code] 
    Desktop: 18;
[/code]

###### [See](#see-9)

[Section titled “See”](#see-9)

[desktopDir](/reference/javascript/api/namespacepath/#desktopdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L91>

##### [Document](#document)

[Section titled “Document”](#document)
[code] 
    Document: 6;
[/code]

###### [See](#see-10)

[Section titled “See”](#see-10)

[documentDir](/reference/javascript/api/namespacepath/#documentdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L43>

##### [Download](#download)

[Section titled “Download”](#download)
[code] 
    Download: 7;
[/code]

###### [See](#see-11)

[Section titled “See”](#see-11)

[downloadDir](/reference/javascript/api/namespacepath/#downloaddir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L47>

##### [Executable](#executable)

[Section titled “Executable”](#executable)
[code] 
    Executable: 19;
[/code]

###### [See](#see-12)

[Section titled “See”](#see-12)

[executableDir](/reference/javascript/api/namespacepath/#executabledir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L95>

##### [Font](#font)

[Section titled “Font”](#font)
[code] 
    Font: 20;
[/code]

###### [See](#see-13)

[Section titled “See”](#see-13)

[fontDir](/reference/javascript/api/namespacepath/#fontdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L99>

##### [Home](#home)

[Section titled “Home”](#home)
[code] 
    Home: 21;
[/code]

###### [See](#see-14)

[Section titled “See”](#see-14)

[homeDir](/reference/javascript/api/namespacepath/#homedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L103>

##### [LocalData](#localdata)

[Section titled “LocalData”](#localdata)
[code] 
    LocalData: 5;
[/code]

###### [See](#see-15)

[Section titled “See”](#see-15)

[localDataDir](/reference/javascript/api/namespacepath/#localdatadir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L39>

##### [Picture](#picture)

[Section titled “Picture”](#picture)
[code] 
    Picture: 8;
[/code]

###### [See](#see-16)

[Section titled “See”](#see-16)

[pictureDir](/reference/javascript/api/namespacepath/#picturedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L51>

##### [Public](#public)

[Section titled “Public”](#public)
[code] 
    Public: 9;
[/code]

###### [See](#see-17)

[Section titled “See”](#see-17)

[publicDir](/reference/javascript/api/namespacepath/#publicdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L55>

##### [Resource](#resource)

[Section titled “Resource”](#resource)
[code] 
    Resource: 11;
[/code]

###### [See](#see-18)

[Section titled “See”](#see-18)

[resourceDir](/reference/javascript/api/namespacepath/#resourcedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L63>

##### [Runtime](#runtime)

[Section titled “Runtime”](#runtime)
[code] 
    Runtime: 22;
[/code]

###### [See](#see-19)

[Section titled “See”](#see-19)

[runtimeDir](/reference/javascript/api/namespacepath/#runtimedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L107>

##### [Temp](#temp)

[Section titled “Temp”](#temp)
[code] 
    Temp: 12;
[/code]

###### [See](#see-20)

[Section titled “See”](#see-20)

[tempDir](/reference/javascript/api/namespacepath/#tempdir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L67>

##### [Template](#template)

[Section titled “Template”](#template)
[code] 
    Template: 23;
[/code]

###### [See](#see-21)

[Section titled “See”](#see-21)

[templateDir](/reference/javascript/api/namespacepath/#templatedir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L111>

##### [Video](#video)

[Section titled “Video”](#video)
[code] 
    Video: 10;
[/code]

###### [See](#see-22)

[Section titled “See”](#see-22)

[videoDir](/reference/javascript/api/namespacepath/#videodir) for more information.

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L59>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [appCacheDir()](#appcachedir)

[Section titled “appCacheDir()”](#appcachedir)
[code] 
    function appCacheDir(): Promise<string>
[/code]

Returns the path to the suggested directory for your app’s cache files. Resolves to `${cacheDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { appCacheDir } from '@tauri-apps/api/path';
    
    const appCacheDirPath = await appCacheDir();
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L176>

* * *

### [appConfigDir()](#appconfigdir)

[Section titled “appConfigDir()”](#appconfigdir)
[code] 
    function appConfigDir(): Promise<string>
[/code]

Returns the path to the suggested directory for your app’s config files. Resolves to `${configDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.

#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { appConfigDir } from '@tauri-apps/api/path';
    
    const appConfigDirPath = await appConfigDir();
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L125>

* * *

### [appDataDir()](#appdatadir)

[Section titled “appDataDir()”](#appdatadir)
[code] 
    function appDataDir(): Promise<string>
[/code]

Returns the path to the suggested directory for your app’s data files. Resolves to `${dataDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.

#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { appDataDir } from '@tauri-apps/api/path';
    
    const appDataDirPath = await appDataDir();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L142>

* * *

### [appLocalDataDir()](#applocaldatadir)

[Section titled “appLocalDataDir()”](#applocaldatadir)
[code] 
    function appLocalDataDir(): Promise<string>
[/code]

Returns the path to the suggested directory for your app’s local data files. Resolves to `${localDataDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.

#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { appLocalDataDir } from '@tauri-apps/api/path';
    
    const appLocalDataDirPath = await appLocalDataDir();
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L159>

* * *

### [appLogDir()](#applogdir)

[Section titled “appLogDir()”](#applogdir)
[code] 
    function appLogDir(): Promise<string>
[/code]

Returns the path to the suggested directory for your app’s log files.

Platform-specific

  * **Linux:** Resolves to `${configDir}/${bundleIdentifier}/logs`.
  * **macOS:** Resolves to `${homeDir}/Library/Logs/{bundleIdentifier}`
  * **Windows:** Resolves to `${configDir}/${bundleIdentifier}/logs`.


#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { appLogDir } from '@tauri-apps/api/path';
    
    const appLogDirPath = await appLogDir();
[/code]

#### [Since](#since-5)

[Section titled “Since”](#since-5)

1.2.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L604>

* * *

### [audioDir()](#audiodir)

[Section titled “audioDir()”](#audiodir)
[code] 
    function audioDir(): Promise<string>
[/code]

Returns the path to the user’s audio directory.

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_MUSIC_DIR`.
  * **macOS:** Resolves to `$HOME/Music`.
  * **Windows:** Resolves to `{FOLDERID_Music}`.


#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { audioDir } from '@tauri-apps/api/path';
    
    const audioDirPath = await audioDir();
[/code]

#### [Since](#since-6)

[Section titled “Since”](#since-6)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L198>

* * *

### [basename()](#basename)

[Section titled “basename()”](#basename)
[code] 
    function basename(path, ext?): Promise<string>
[/code]

Returns the last portion of a `path`. Trailing directory separators are ignored.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`path`| `string`| -  
`ext`?| `string`| An optional file extension to be removed from the returned path.  
  
#### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { basename } from '@tauri-apps/api/path';
    
    const base = await basename('path/to/app.conf');
    
    assert(base === 'app.conf');
[/code]

#### [Since](#since-7)

[Section titled “Since”](#since-7)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L734>

* * *

### [cacheDir()](#cachedir)

[Section titled “cacheDir()”](#cachedir)
[code] 
    function cacheDir(): Promise<string>
[/code]

Returns the path to the user’s cache directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_CACHE_HOME` or `$HOME/.cache`.
  * **macOS:** Resolves to `$HOME/Library/Caches`.
  * **Windows:** Resolves to `{FOLDERID_LocalAppData}`.


#### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { cacheDir } from '@tauri-apps/api/path';
    
    const cacheDirPath = await cacheDir();
[/code]

#### [Since](#since-8)

[Section titled “Since”](#since-8)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L220>

* * *

### [configDir()](#configdir)

[Section titled “configDir()”](#configdir)
[code] 
    function configDir(): Promise<string>
[/code]

Returns the path to the user’s config directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_CONFIG_HOME` or `$HOME/.config`.
  * **macOS:** Resolves to `$HOME/Library/Application Support`.
  * **Windows:** Resolves to `{FOLDERID_RoamingAppData}`.


#### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-8)

[Section titled “Example”](#example-8)
[code] 
    import { configDir } from '@tauri-apps/api/path';
    
    const configDirPath = await configDir();
[/code]

#### [Since](#since-9)

[Section titled “Since”](#since-9)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L242>

* * *

### [dataDir()](#datadir)

[Section titled “dataDir()”](#datadir)
[code] 
    function dataDir(): Promise<string>
[/code]

Returns the path to the user’s data directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_DATA_HOME` or `$HOME/.local/share`.
  * **macOS:** Resolves to `$HOME/Library/Application Support`.
  * **Windows:** Resolves to `{FOLDERID_RoamingAppData}`.


#### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { dataDir } from '@tauri-apps/api/path';
    
    const dataDirPath = await dataDir();
[/code]

#### [Since](#since-10)

[Section titled “Since”](#since-10)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L264>

* * *

### [delimiter()](#delimiter)

[Section titled “delimiter()”](#delimiter)
[code] 
    function delimiter(): string
[/code]

Returns the platform-specific path segment delimiter:

  * `;` on Windows
  * `:` on POSIX


#### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

`string`

#### [Since](#since-11)

[Section titled “Since”](#since-11)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L644>

* * *

### [desktopDir()](#desktopdir)

[Section titled “desktopDir()”](#desktopdir)
[code] 
    function desktopDir(): Promise<string>
[/code]

Returns the path to the user’s desktop directory.

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_DESKTOP_DIR`.
  * **macOS:** Resolves to `$HOME/Desktop`.
  * **Windows:** Resolves to `{FOLDERID_Desktop}`.


#### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { desktopDir } from '@tauri-apps/api/path';
    
    const desktopPath = await desktopDir();
[/code]

#### [Since](#since-12)

[Section titled “Since”](#since-12)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L286>

* * *

### [dirname()](#dirname)

[Section titled “dirname()”](#dirname)
[code] 
    function dirname(path): Promise<string>
[/code]

Returns the parent directory of a given `path`. Trailing directory separators are ignored.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`path`| `string`  
  
#### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { dirname } from '@tauri-apps/api/path';
    
    const dir = await dirname('/path/to/somedir/');
    
    assert(dir === '/path/to');
[/code]

#### [Since](#since-13)

[Section titled “Since”](#since-13)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L703>

* * *

### [documentDir()](#documentdir)

[Section titled “documentDir()”](#documentdir)
[code] 
    function documentDir(): Promise<string>
[/code]

Returns the path to the user’s document directory.

#### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-12)

[Section titled “Example”](#example-12)
[code] 
    import { documentDir } from '@tauri-apps/api/path';
    
    const documentDirPath = await documentDir();
[/code]

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_DOCUMENTS_DIR`.
  * **macOS:** Resolves to `$HOME/Documents`.
  * **Windows:** Resolves to `{FOLDERID_Documents}`.


#### [Since](#since-14)

[Section titled “Since”](#since-14)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L308>

* * *

### [downloadDir()](#downloaddir)

[Section titled “downloadDir()”](#downloaddir)
[code] 
    function downloadDir(): Promise<string>
[/code]

Returns the path to the user’s download directory.

Platform-specific

  * **Linux** : Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_DOWNLOAD_DIR`.
  * **macOS** : Resolves to `$HOME/Downloads`.
  * **Windows** : Resolves to `{FOLDERID_Downloads}`.


#### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-13)

[Section titled “Example”](#example-13)
[code] 
    import { downloadDir } from '@tauri-apps/api/path';
    
    const downloadDirPath = await downloadDir();
[/code]

#### [Since](#since-15)

[Section titled “Since”](#since-15)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L330>

* * *

### [executableDir()](#executabledir)

[Section titled “executableDir()”](#executabledir)
[code] 
    function executableDir(): Promise<string>
[/code]

Returns the path to the user’s executable directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_BIN_HOME/../bin` or `$XDG_DATA_HOME/../bin` or `$HOME/.local/bin`.
  * **macOS:** Not supported.
  * **Windows:** Not supported.


#### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-14)

[Section titled “Example”](#example-14)
[code] 
    import { executableDir } from '@tauri-apps/api/path';
    
    const executableDirPath = await executableDir();
[/code]

#### [Since](#since-16)

[Section titled “Since”](#since-16)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L352>

* * *

### [extname()](#extname)

[Section titled “extname()”](#extname)
[code] 
    function extname(path): Promise<string>
[/code]

Returns the extension of the `path`.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type  
---|---  
`path`| `string`  
  
#### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-15)

[Section titled “Example”](#example-15)
[code] 
    import { extname } from '@tauri-apps/api/path';
    
    const ext = await extname('/path/to/file.html');
    
    assert(ext === 'html');
[/code]

#### [Since](#since-17)

[Section titled “Since”](#since-17)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L718>

* * *

### [fontDir()](#fontdir)

[Section titled “fontDir()”](#fontdir)
[code] 
    function fontDir(): Promise<string>
[/code]

Returns the path to the user’s font directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_DATA_HOME/fonts` or `$HOME/.local/share/fonts`.
  * **macOS:** Resolves to `$HOME/Library/Fonts`.
  * **Windows:** Not supported.


#### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-16)

[Section titled “Example”](#example-16)
[code] 
    import { fontDir } from '@tauri-apps/api/path';
    
    const fontDirPath = await fontDir();
[/code]

#### [Since](#since-18)

[Section titled “Since”](#since-18)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L374>

* * *

### [homeDir()](#homedir)

[Section titled “homeDir()”](#homedir)
[code] 
    function homeDir(): Promise<string>
[/code]

Returns the path to the user’s home directory.

Platform-specific

  * **Linux:** Resolves to `$HOME`.
  * **macOS:** Resolves to `$HOME`.
  * **Windows:** Resolves to `{FOLDERID_Profile}`.


#### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-17)

[Section titled “Example”](#example-17)
[code] 
    import { homeDir } from '@tauri-apps/api/path';
    
    const homeDirPath = await homeDir();
[/code]

#### [Since](#since-19)

[Section titled “Since”](#since-19)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L396>

* * *

### [isAbsolute()](#isabsolute)

[Section titled “isAbsolute()”](#isabsolute)
[code] 
    function isAbsolute(path): Promise<boolean>
[/code]

Returns whether the path is absolute or not.

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`path`| `string`  
  
#### [Returns](#returns-19)

[Section titled “Returns”](#returns-19)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

#### [Example](#example-18)

[Section titled “Example”](#example-18)
[code] 
    import { isAbsolute } from '@tauri-apps/api/path';
    
    assert(await isAbsolute('/home/tauri'));
[/code]

#### [Since](#since-20)

[Section titled “Since”](#since-20)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L748>

* * *

### [join()](#join)

[Section titled “join()”](#join)
[code] 
    function join(...paths): Promise<string>
[/code]

Joins all given `path` segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

#### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
…`paths`| `string`[]  
  
#### [Returns](#returns-20)

[Section titled “Returns”](#returns-20)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-19)

[Section titled “Example”](#example-19)
[code] 
    import { join, appDataDir } from '@tauri-apps/api/path';
    
    const appDataDirPath = await appDataDir();
    
    const path = await join(appDataDirPath, 'users', 'tauri', 'avatar.png');
[/code]

#### [Since](#since-21)

[Section titled “Since”](#since-21)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L688>

* * *

### [localDataDir()](#localdatadir)

[Section titled “localDataDir()”](#localdatadir)
[code] 
    function localDataDir(): Promise<string>
[/code]

Returns the path to the user’s local data directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_DATA_HOME` or `$HOME/.local/share`.
  * **macOS:** Resolves to `$HOME/Library/Application Support`.
  * **Windows:** Resolves to `{FOLDERID_LocalAppData}`.


#### [Returns](#returns-21)

[Section titled “Returns”](#returns-21)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-20)

[Section titled “Example”](#example-20)
[code] 
    import { localDataDir } from '@tauri-apps/api/path';
    
    const localDataDirPath = await localDataDir();
[/code]

#### [Since](#since-22)

[Section titled “Since”](#since-22)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L418>

* * *

### [normalize()](#normalize)

[Section titled “normalize()”](#normalize)
[code] 
    function normalize(path): Promise<string>
[/code]

Normalizes the given `path`, resolving `'..'` and `'.'` segments and resolve symbolic links.

#### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`path`| `string`  
  
#### [Returns](#returns-22)

[Section titled “Returns”](#returns-22)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-21)

[Section titled “Example”](#example-21)
[code] 
    import { normalize, appDataDir } from '@tauri-apps/api/path';
    
    const appDataDirPath = await appDataDir();
    
    const path = await normalize(`${appDataDirPath}/../users/tauri/avatar.png`);
[/code]

#### [Since](#since-23)

[Section titled “Since”](#since-23)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L673>

* * *

### [pictureDir()](#picturedir)

[Section titled “pictureDir()”](#picturedir)
[code] 
    function pictureDir(): Promise<string>
[/code]

Returns the path to the user’s picture directory.

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_PICTURES_DIR`.
  * **macOS:** Resolves to `$HOME/Pictures`.
  * **Windows:** Resolves to `{FOLDERID_Pictures}`.


#### [Returns](#returns-23)

[Section titled “Returns”](#returns-23)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-22)

[Section titled “Example”](#example-22)
[code] 
    import { pictureDir } from '@tauri-apps/api/path';
    
    const pictureDirPath = await pictureDir();
[/code]

#### [Since](#since-24)

[Section titled “Since”](#since-24)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L440>

* * *

### [publicDir()](#publicdir)

[Section titled “publicDir()”](#publicdir)
[code] 
    function publicDir(): Promise<string>
[/code]

Returns the path to the user’s public directory.

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_PUBLICSHARE_DIR`.
  * **macOS:** Resolves to `$HOME/Public`.
  * **Windows:** Resolves to `{FOLDERID_Public}`.


#### [Returns](#returns-24)

[Section titled “Returns”](#returns-24)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-23)

[Section titled “Example”](#example-23)
[code] 
    import { publicDir } from '@tauri-apps/api/path';
    
    const publicDirPath = await publicDir();
[/code]

#### [Since](#since-25)

[Section titled “Since”](#since-25)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L462>

* * *

### [resolve()](#resolve)

[Section titled “resolve()”](#resolve)
[code] 
    function resolve(...paths): Promise<string>
[/code]

Resolves a sequence of `paths` or `path` segments into an absolute path.

#### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
…`paths`| `string`[]  
  
#### [Returns](#returns-25)

[Section titled “Returns”](#returns-25)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-24)

[Section titled “Example”](#example-24)
[code] 
    import { resolve, appDataDir } from '@tauri-apps/api/path';
    
    const appDataDirPath = await appDataDir();
    
    const path = await resolve(appDataDirPath, '..', 'users', 'tauri', 'avatar.png');
[/code]

#### [Since](#since-26)

[Section titled “Since”](#since-26)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L658>

* * *

### [resolveResource()](#resolveresource)

[Section titled “resolveResource()”](#resolveresource)
[code] 
    function resolveResource(resourcePath): Promise<string>
[/code]

Resolve the path to a resource file.

#### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type| Description  
---|---|---  
`resourcePath`| `string`| The path to the resource. Must follow the same syntax as defined in `tauri.conf.json > bundle > resources`, i.e. keeping subfolders and parent dir components (`../`).  
  
#### [Returns](#returns-26)

[Section titled “Returns”](#returns-26)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

The full path to the resource.

#### [Example](#example-25)

[Section titled “Example”](#example-25)
[code] 
    import { resolveResource } from '@tauri-apps/api/path';
    
    const resourcePath = await resolveResource('script.sh');
[/code]

#### [Since](#since-27)

[Section titled “Since”](#since-27)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L515>

* * *

### [resourceDir()](#resourcedir)

[Section titled “resourceDir()”](#resourcedir)
[code] 
    function resourceDir(): Promise<string>
[/code]

Returns the path to the application’s resource directory. To resolve a resource path, see [`resolveResource`](/reference/javascript/api/namespacepath/#resolveresource).

## [Platform-specific](#platform-specific)

[Section titled “Platform-specific”](#platform-specific)

Although we provide the exact path where this function resolves to, this is not a contract and things might change in the future

  * **Windows:** Resolves to the directory that contains the main executable.
  * **Linux:** When running in an AppImage, the `APPDIR` variable will be set to the mounted location of the app, and the resource dir will be `${APPDIR}/usr/lib/${exe_name}`. If not running in an AppImage, the path is `/usr/lib/${exe_name}`. When running the app from `src-tauri/target/(debug|release)/`, the path is `${exe_dir}/../lib/${exe_name}`.
  * **macOS:** Resolves to `${exe_dir}/../Resources` (inside .app).
  * **iOS:** Resolves to `${exe_dir}/assets`.
  * **Android:** Currently the resources are stored in the APK as assets so it’s not a normal file system path, we return a special URI prefix `asset://localhost/` here that can be used with the [file system plugin](https://tauri.app/plugin/file-system/),


#### [Returns](#returns-27)

[Section titled “Returns”](#returns-27)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-26)

[Section titled “Example”](#example-26)
[code] 
    import { resourceDir } from '@tauri-apps/api/path';
    
    const resourceDirPath = await resourceDir();
[/code]

#### [Since](#since-28)

[Section titled “Since”](#since-28)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L495>

* * *

### [runtimeDir()](#runtimedir)

[Section titled “runtimeDir()”](#runtimedir)
[code] 
    function runtimeDir(): Promise<string>
[/code]

Returns the path to the user’s runtime directory.

Platform-specific

  * **Linux:** Resolves to `$XDG_RUNTIME_DIR`.
  * **macOS:** Not supported.
  * **Windows:** Not supported.


#### [Returns](#returns-28)

[Section titled “Returns”](#returns-28)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-27)

[Section titled “Example”](#example-27)
[code] 
    import { runtimeDir } from '@tauri-apps/api/path';
    
    const runtimeDirPath = await runtimeDir();
[/code]

#### [Since](#since-29)

[Section titled “Since”](#since-29)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L538>

* * *

### [sep()](#sep)

[Section titled “sep()”](#sep)
[code] 
    function sep(): string
[/code]

Returns the platform-specific path segment separator:

  * `\` on Windows
  * `/` on POSIX


#### [Returns](#returns-29)

[Section titled “Returns”](#returns-29)

`string`

#### [Since](#since-30)

[Section titled “Since”](#since-30)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L633>

* * *

### [tempDir()](#tempdir)

[Section titled “tempDir()”](#tempdir)
[code] 
    function tempDir(): Promise<string>
[/code]

Returns a temporary directory.

#### [Returns](#returns-30)

[Section titled “Returns”](#returns-30)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-28)

[Section titled “Example”](#example-28)
[code] 
    import { tempDir } from '@tauri-apps/api/path';
    
    const temp = await tempDir();
[/code]

#### [Since](#since-31)

[Section titled “Since”](#since-31)

2.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L620>

* * *

### [templateDir()](#templatedir)

[Section titled “templateDir()”](#templatedir)
[code] 
    function templateDir(): Promise<string>
[/code]

Returns the path to the user’s template directory.

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_TEMPLATES_DIR`.
  * **macOS:** Not supported.
  * **Windows:** Resolves to `{FOLDERID_Templates}`.


#### [Returns](#returns-31)

[Section titled “Returns”](#returns-31)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-29)

[Section titled “Example”](#example-29)
[code] 
    import { templateDir } from '@tauri-apps/api/path';
    
    const templateDirPath = await templateDir();
[/code]

#### [Since](#since-32)

[Section titled “Since”](#since-32)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L560>

* * *

### [videoDir()](#videodir)

[Section titled “videoDir()”](#videodir)
[code] 
    function videoDir(): Promise<string>
[/code]

Returns the path to the user’s video directory.

Platform-specific

  * **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)’ `XDG_VIDEOS_DIR`.
  * **macOS:** Resolves to `$HOME/Movies`.
  * **Windows:** Resolves to `{FOLDERID_Videos}`.


#### [Returns](#returns-32)

[Section titled “Returns”](#returns-32)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string`>

#### [Example](#example-30)

[Section titled “Example”](#example-30)
[code] 
    import { videoDir } from '@tauri-apps/api/path';
    
    const videoDirPath = await videoDir();
[/code]

#### [Since](#since-33)

[Section titled “Since”](#since-33)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/path.ts#L582>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacepath](https://v2.tauri.app/reference/javascript/api/namespacepath)