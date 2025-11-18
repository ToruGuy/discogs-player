# Permission

Descriptions of explicit privileges of commands.

It can enable commands to be accessible in the frontend of the application.

If the scope is defined it can be used to fine grain control the access of individual or multiple commands.

**Object Properties** :

  * commands
  * description
  * identifier (required)
  * platforms
  * scope
  * version


### [commands](#commands)

[Section titled “commands”](#commands)

[`Commands`](#commands)

Allowed or denied commands when using this permission.

Default
[code]
    {
    
      "allow": [],
    
      "deny": []
    
    }
[/code]

### [description](#description)

[Section titled “description”](#description)

`string` | `null`

Human-readable description of what the permission does. Tauri internal convention is to use `&lt;h4&gt;` headings in markdown content for Tauri documentation generation purposes.

### [identifier](#identifier)

[Section titled “identifier”](#identifier)

`string`

A unique identifier for the permission.

### [platforms](#platforms)

[Section titled “platforms”](#platforms)

[`Target`](#target)[] | `null`

Target platforms this permission applies. By default all platforms are affected by this permission.

### [scope](#scope)

[Section titled “scope”](#scope)

[`Scopes`](#scopes)

Allowed or denied scoped when using this permission.

### [version](#version)

[Section titled “version”](#version)

`integer` | `null` minimum of `1`, formatted as `uint64`

The version of the permission.

## [Definitions](#definitions)

[Section titled “Definitions”](#definitions)

### [Commands](#commands-1)

[Section titled “Commands”](#commands-1)

Allowed and denied commands inside a permission.

If two commands clash inside of `allow` and `deny`, it should be denied by default.

**Object Properties** :

  * allow
  * deny


##### [allow](#allow)

[Section titled “allow”](#allow)

`string`[]

Allowed command.

**Default** : `[]`

##### [deny](#deny)

[Section titled “deny”](#deny)

`string`[]

Denied command, which takes priority.

**Default** : `[]`

### [Number](#number)

[Section titled “Number”](#number)

**Any of the following** :

  * `integer` formatted as `int64` Represents an [`i64`].
  * `number` formatted as `double` Represents a [`f64`].


A valid ACL number.

### [Scopes](#scopes)

[Section titled “Scopes”](#scopes)

An argument for fine grained behavior control of Tauri commands.

It can be of any serde serializable type and is used to allow or prevent certain actions inside a Tauri command. The configured scope is passed to the command and will be enforced by the command implementation.

##### [Example](#example)

[Section titled “Example”](#example)
[code] 
    {
    
      "allow": [{ "path": "$HOME/**" }],
    
      "deny": [{ "path": "$HOME/secret.txt" }]
    
    }
[/code]

**Object Properties** :

  * allow
  * deny


##### [allow](#allow-1)

[Section titled “allow”](#allow-1)

[`Value`](#value)[] | `null`

Data that defines what is allowed by the scope.

##### [deny](#deny-1)

[Section titled “deny”](#deny-1)

[`Value`](#value)[] | `null`

Data that defines what is denied by the scope. This should be prioritized by validation logic.

### [Target](#target)

[Section titled “Target”](#target)

**One of the following** :

  * `"macOS"` MacOS.
  * `"windows"` Windows.
  * `"linux"` Linux.
  * `"android"` Android.
  * `"iOS"` iOS.


Platform target.

### [Value](#value)

[Section titled “Value”](#value)

**Any of the following** :

  * `null` Represents a null JSON value.
  * `boolean` Represents a [`bool`].
  * [`Number`](#number) Represents a valid ACL [`Number`].
  * `string` Represents a [`String`].
  * [`Value`](#value)[] Represents a list of other [`Value`]s.
  * Represents a map of [`String`] keys to [`Value`]s. **Allows additional properties** : [`Value`](#value)


All supported ACL values.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/acl/permission](https://v2.tauri.app/reference/acl/permission)