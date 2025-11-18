# @tauri-apps/plugin-cli

Parse arguments from your Command Line Interface.

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ArgMatch](#argmatch)

[Section titled “ArgMatch”](#argmatch)

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`occurrences`| `number`| Number of occurrences| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L26>  
`value`| `null` | `string` | `boolean` | `string`[]| string if takes value boolean if flag string[] or null if takes multiple values| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L22>  
  
* * *

### [CliMatches](#climatches)

[Section titled “CliMatches”](#climatches)

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Defined in  
---|---|---  
`args`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, [`ArgMatch`](/reference/javascript/cli/#argmatch)>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L41>  
`subcommand`| `null` | [`SubcommandMatch`](/reference/javascript/cli/#subcommandmatch)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L42>  
  
* * *

### [SubcommandMatch](#subcommandmatch)

[Section titled “SubcommandMatch”](#subcommandmatch)

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Defined in  
---|---|---  
`matches`| [`CliMatches`](/reference/javascript/cli/#climatches)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L34>  
`name`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L33>  
  
## [Functions](#functions)

[Section titled “Functions”](#functions)

### [getMatches()](#getmatches)

[Section titled “getMatches()”](#getmatches)
[code] 
    function getMatches(): Promise<CliMatches>
[/code]

Parse the arguments provided to the current process and get the matches using the configuration defined [`tauri.cli`](https://tauri.app/v1/api/config/#tauriconfig.cli) in `tauri.conf.json`

#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`CliMatches`](/reference/javascript/cli/#climatches)>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { getMatches } from '@tauri-apps/plugin-cli';
    
    const matches = await getMatches();
    
    if (matches.subcommand?.name === 'run') {
    
      // `./your-app run $ARGS` was executed
    
      const args = matches.subcommand?.matches.args
    
      if ('debug' in args) {
    
        // `./your-app run --debug` was executed
    
      }
    
    } else {
    
      const args = matches.args
    
      // `./your-app $ARGS` was executed
    
    }
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/cli/guest-js/index.ts#L66>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/cli](https://v2.tauri.app/reference/javascript/cli)