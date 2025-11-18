# Scope

An argument for fine grained behavior control of Tauri commands.

It can be of any serde serializable type and is used to allow or prevent certain actions inside a Tauri command. The configured scope is passed to the command and will be enforced by the command implementation.

### [Example](#example)

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


### [allow](#allow)

[Section titled “allow”](#allow)

[`Value`](#value)[] | `null`

Data that defines what is allowed by the scope.

### [deny](#deny)

[Section titled “deny”](#deny)

[`Value`](#value)[] | `null`

Data that defines what is denied by the scope. This should be prioritized by validation logic.

## [Definitions](#definitions)

[Section titled “Definitions”](#definitions)

### [Number](#number)

[Section titled “Number”](#number)

**Any of the following** :

  * `integer` formatted as `int64` Represents an [`i64`].
  * `number` formatted as `double` Represents a [`f64`].


A valid ACL number.

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

**Source:** [https://v2.tauri.app/reference/acl/scope](https://v2.tauri.app/reference/acl/scope)