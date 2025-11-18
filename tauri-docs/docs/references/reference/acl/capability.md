# Capability

A grouping and boundary mechanism developers can use to isolate access to the IPC layer.

It controls application windows’ and webviews’ fine grained access to the Tauri core, application, or plugin commands. If a webview or its window is not matching any capability then it has no access to the IPC layer at all.

This can be done to create groups of windows, based on their required system access, which can reduce impact of frontend vulnerabilities in less privileged windows. Windows can be added to a capability by exact name (e.g. `main-window`) or glob patterns like `*` or `admin-*`. A Window can have none, one, or multiple associated capabilities.

### [Example](#example)

[Section titled “Example”](#example)
[code] 
    {
    
      "identifier": "main-user-files-write",
    
      "description": "This capability allows the `main` window on macOS and Windows access to `filesystem` write related commands and `dialog` commands to enable programmatic access to files selected by the user.",
    
      "windows": [
    
        "main"
    
      ],
    
      "permissions": [
    
        "core:default",
    
        "dialog:open",
    
        {
    
          "identifier": "fs:allow-write-text-file",
    
          "allow": [{ "path": "$HOME/test.txt" }]
    
        },
    
      ],
    
      "platforms": ["macOS","windows"]
    
    }
[/code]

**Object Properties** :

  * description
  * identifier (required)
  * local
  * permissions (required)
  * platforms
  * remote
  * webviews
  * windows


### [description](#description)

[Section titled “description”](#description)

`string`

Description of what the capability is intended to allow on associated windows.

It should contain a description of what the grouped permissions should allow.

#### [Example](#example-1)

[Section titled “Example”](#example-1)

This capability allows the `main` window access to `filesystem` write related commands and `dialog` commands to enable programmatic access to files selected by the user.

### [identifier](#identifier)

[Section titled “identifier”](#identifier)

`string`

Identifier of the capability.

#### [Example](#example-2)

[Section titled “Example”](#example-2)

`main-user-files-write`

### [local](#local)

[Section titled “local”](#local)

`boolean`

Whether this capability is enabled for local app URLs or not. Defaults to `true`.

**Default** : `true`

### [permissions](#permissions)

[Section titled “permissions”](#permissions)

[`PermissionEntry`](#permissionentry)[] each item must be unique

List of permissions attached to this capability.

Must include the plugin name as prefix in the form of `${plugin-name}:${permission-name}`. For commands directly implemented in the application itself only `${permission-name}` is required.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    [
    
      "core:default",
    
      "shell:allow-open",
    
      "dialog:open",
    
      {
    
        "identifier": "fs:allow-write-text-file",
    
        "allow": [{ "path": "$HOME/test.txt" }]
    
      }
    
    ]
[/code]

### [platforms](#platforms)

[Section titled “platforms”](#platforms)

[`Target`](#target)[] | `null`

Limit which target platforms this capability applies to.

By default all platforms are targeted.

#### [Example](#example-4)

[Section titled “Example”](#example-4)

`["macOS","windows"]`

### [remote](#remote)

[Section titled “remote”](#remote)

[`CapabilityRemote`](#capabilityremote) | `null`

Configure remote URLs that can use the capability permissions.

This setting is optional and defaults to not being set, as our default use case is that the content is served from our local application.

#### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    {
    
      "urls": ["https://*.mydomain.dev"]
    
    }
[/code]

### [webviews](#webviews)

[Section titled “webviews”](#webviews)

`string`[]

List of webviews that are affected by this capability. Can be a glob pattern.

The capability will be enabled on all the webviews whose label matches any of the patterns in this list, regardless of whether the webview’s window label matches a pattern in [`Self::windows`].

#### [Example](#example-6)

[Section titled “Example”](#example-6)

`["sub-webview-one", "sub-webview-two"]`

### [windows](#windows)

[Section titled “windows”](#windows)

`string`[]

List of windows that are affected by this capability. Can be a glob pattern.

If a window label matches any of the patterns in this list, the capability will be enabled on all the webviews of that window, regardless of the value of [`Self::webviews`].

On multiwebview windows, prefer specifying [`Self::webviews`] and omitting [`Self::windows`] for a fine grained access control.

#### [Example](#example-7)

[Section titled “Example”](#example-7)

`["main"]`

## [Definitions](#definitions)

[Section titled “Definitions”](#definitions)

### [CapabilityRemote](#capabilityremote)

[Section titled “CapabilityRemote”](#capabilityremote)

Configuration for remote URLs that are associated with the capability.

**Object Properties** :

  * urls (required)


##### [urls](#urls)

[Section titled “urls”](#urls)

`string`[]

Remote domains this capability refers to using the [URLPattern standard](https://urlpattern.spec.whatwg.org/).

###### [Examples](#examples)

[Section titled “Examples”](#examples)

  * “https://*.mydomain.dev”: allows subdomains of mydomain.dev
  * “<https://mydomain.dev/api/>*”: allows any subpath of mydomain.dev/api


### [Identifier](#identifier-1)

[Section titled “Identifier”](#identifier-1)

`string`

### [Number](#number)

[Section titled “Number”](#number)

**Any of the following** :

  * `integer` formatted as `int64` Represents an [`i64`].
  * `number` formatted as `double` Represents a [`f64`].


A valid ACL number.

### [PermissionEntry](#permissionentry)

[Section titled “PermissionEntry”](#permissionentry)

**Any of the following** :

  * [`Identifier`](#identifier) Reference a permission or permission set by identifier.
  * Reference a permission or permission set by identifier and extends its scope. **Object Properties** : - allow - deny - identifier (required) ##### allow [`Value`](#value)[] | `null` Data that defines what is allowed by the scope. ##### deny [`Value`](#value)[] | `null` Data that defines what is denied by the scope. This should be prioritized by validation logic. ##### identifier [`Identifier`](#identifier) Identifier of the permission or permission set.


An entry for a permission value in a [`Capability`] can be either a raw permission [`Identifier`] or an object that references a permission and extends its scope.

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

**Source:** [https://v2.tauri.app/reference/acl/capability](https://v2.tauri.app/reference/acl/capability)