# @tauri-apps/plugin-os

Provides operating system-related utility methods and properties.

## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [Arch](#arch)

[Section titled “Arch”](#arch)
[code] 
    type Arch:
    
      | "x86"
    
      | "x86_64"
    
      | "arm"
    
      | "aarch64"
    
      | "mips"
    
      | "mips64"
    
      | "powerpc"
    
      | "powerpc64"
    
      | "riscv64"
    
      | "s390x"
    
      | "sparc64";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L42>

* * *

### [Family](#family)

[Section titled “Family”](#family)
[code] 
    type Family: "unix" | "windows";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L97>

* * *

### [OsType](#ostype)

[Section titled “OsType”](#ostype)
[code] 
    type OsType:
    
      | "linux"
    
      | "windows"
    
      | "macos"
    
      | "ios"
    
      | "android";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L40>

* * *

### [Platform](#platform)

[Section titled “Platform”](#platform)
[code] 
    type Platform:
    
      | "linux"
    
      | "macos"
    
      | "ios"
    
      | "freebsd"
    
      | "dragonfly"
    
      | "netbsd"
    
      | "openbsd"
    
      | "solaris"
    
      | "android"
    
      | "windows";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L28>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [arch()](#arch-1)

[Section titled “arch()”](#arch-1)
[code] 
    function arch(): Arch
[/code]

Returns the current operating system architecture. Possible values are `'x86'`, `'x86_64'`, `'arm'`, `'aarch64'`, `'mips'`, `'mips64'`, `'powerpc'`, `'powerpc64'`, `'riscv64'`, `'s390x'`, `'sparc64'`.

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Arch`](/reference/javascript/os/#arch)

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { arch } from '@tauri-apps/plugin-os';
    
    const archName = arch();
[/code]

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L138>

* * *

### [eol()](#eol)

[Section titled “eol()”](#eol)
[code] 
    function eol(): string
[/code]

Returns the operating system-specific end-of-line marker.

  * `\n` on POSIX
  * `\r\n` on Windows


#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

`string`

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L62>

* * *

### [exeExtension()](#exeextension)

[Section titled “exeExtension()”](#exeextension)
[code] 
    function exeExtension(): string
[/code]

Returns the file extension, if any, used for executable binaries on this platform. Possible values are `'exe'` and `''` (empty string).

#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

`string`

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { exeExtension } from '@tauri-apps/plugin-os';
    
    const exeExt = exeExtension();
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L152>

* * *

### [family()](#family-1)

[Section titled “family()”](#family-1)
[code] 
    function family(): Family
[/code]

Returns the current operating system family. Possible values are `'unix'`, `'windows'`.

#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Family`](/reference/javascript/os/#family)

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { family } from '@tauri-apps/plugin-os';
    
    const family = family();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L109>

* * *

### [hostname()](#hostname)

[Section titled “hostname()”](#hostname)
[code] 
    function hostname(): Promise<string | null>
[/code]

Returns the host name of the operating system.

#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string` | `null`>

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { hostname } from '@tauri-apps/plugin-os';
    
    const hostname = await hostname();
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L181>

* * *

### [locale()](#locale)

[Section titled “locale()”](#locale)
[code] 
    function locale(): Promise<string | null>
[/code]

Returns a String with a `BCP-47` language tag inside. If the locale couldn’t be obtained, `null` is returned instead.

#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string` | `null`>

#### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { locale } from '@tauri-apps/plugin-os';
    
    const locale = await locale();
    
    if (locale) {
    
       // use the locale string here
    
    }
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L169>

* * *

### [platform()](#platform-1)

[Section titled “platform()”](#platform-1)
[code] 
    function platform(): Platform
[/code]

Returns a string describing the specific operating system in use. The value is set at compile time. Possible values are `'linux'`, `'macos'`, `'ios'`, `'freebsd'`, `'dragonfly'`, `'netbsd'`, `'openbsd'`, `'solaris'`, `'android'`, `'windows'`

#### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Platform`](/reference/javascript/os/#platform)

#### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { platform } from '@tauri-apps/plugin-os';
    
    const platformName = platform();
[/code]

#### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L79>

* * *

### [type()](#type)

[Section titled “type()”](#type)
[code] 
    function type(): OsType
[/code]

Returns the current operating system type. Returns `'linux'` on Linux, `'macos'` on macOS, `'windows'` on Windows, `'ios'` on iOS and `'android'` on Android.

#### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`OsType`](/reference/javascript/os/#ostype)

#### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { type } from '@tauri-apps/plugin-os';
    
    const osType = type();
[/code]

#### [Since](#since-6)

[Section titled “Since”](#since-6)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L123>

* * *

### [version()](#version)

[Section titled “version()”](#version)
[code] 
    function version(): string
[/code]

Returns the current operating system version.

#### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

`string`

#### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { version } from '@tauri-apps/plugin-os';
    
    const osVersion = version();
[/code]

#### [Since](#since-7)

[Section titled “Since”](#since-7)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/os/guest-js/index.ts#L93>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/os](https://v2.tauri.app/reference/javascript/os)