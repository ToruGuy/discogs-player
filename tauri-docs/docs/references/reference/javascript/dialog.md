# @tauri-apps/plugin-dialog

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ConfirmDialogOptions](#confirmdialogoptions)

[Section titled “ConfirmDialogOptions”](#confirmdialogoptions)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`cancelLabel?`| `string`| The label of the cancel button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L224>  
`kind?`| `"info"` | `"warning"` | `"error"`| The kind of the dialog. Defaults to `info`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L220>  
`okLabel?`| `string`| The label of the confirm button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L222>  
`title?`| `string`| The title of the dialog. Defaults to the app name.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L218>  
  
* * *

### [DialogFilter](#dialogfilter)

[Section titled “DialogFilter”](#dialogfilter)

Extension filters for the file dialog.

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`extensions`| `string`[]| Extensions to filter, without a `.` prefix. **Example** `extensions: ['svg', 'png']`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L22>  
`name`| `string`| Filter name.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L14>  
  
* * *

### [MessageDialogOptions](#messagedialogoptions)

[Section titled “MessageDialogOptions”](#messagedialogoptions)

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Description| Defined in  
---|---|---|---  
`buttons?`| [`MessageDialogButtons`](/reference/javascript/dialog/#messagedialogbuttons)| The buttons of the dialog. **Example** `// Use system default buttons texts await message('Hello World!', { buttons: 'Ok' }) await message('Hello World!', { buttons: 'OkCancel' }) // Or with custom button texts await message('Hello World!', { buttons: { ok: 'Yes!' } }) await message('Take on the task?', { buttons: { ok: 'Accept', cancel: 'Cancel' } }) await message('Show the file content?', { buttons: { yes: 'Show content', no: 'Show in folder', cancel: 'Cancel' } })` **Since** 2.4.0| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L190>  
`kind?`| `"info"` | `"warning"` | `"error"`| The kind of the dialog. Defaults to `info`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L161>  
~~`okLabel?`~~| `string`| The label of the Ok button. **Deprecated** Use [`MessageDialogOptions.buttons`](/reference/javascript/dialog/#buttons) instead.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L167>  
`title?`| `string`| The title of the dialog. Defaults to the app name.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L159>  
  
* * *

### [OpenDialogOptions](#opendialogoptions)

[Section titled “OpenDialogOptions”](#opendialogoptions)

Options for the open dialog.

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Description| Defined in  
---|---|---|---  
`canCreateDirectories?`| `boolean`| Whether to allow creating directories in the dialog. Enabled by default. **macOS Only**| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L54>  
`defaultPath?`| `string`| Initial directory or file path. If it’s a directory path, the dialog interface will change to that folder. If it’s not an existing directory, the file name will be set to the dialog’s file name input and the dialog will be set to the parent folder. On mobile the file name is always used on the dialog’s file name input. If not provided, Android uses `(invalid).txt` as default file name.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L43>  
`directory?`| `boolean`| Whether the dialog is a directory selection or not.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L47>  
`filters?`| [`DialogFilter`](/reference/javascript/dialog/#dialogfilter)[]| The filters of the dialog.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L34>  
`multiple?`| `boolean`| Whether the dialog allows multiple selection or not.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L45>  
`recursive?`| `boolean`| If `directory` is true, indicates that it will be read recursively later. Defines whether subdirectories will be allowed on the scope or not.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L52>  
`title?`| `string`| The title of the dialog window (desktop only).| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L32>  
  
* * *

### [SaveDialogOptions](#savedialogoptions)

[Section titled “SaveDialogOptions”](#savedialogoptions)

Options for the save dialog.

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Description| Defined in  
---|---|---|---  
`canCreateDirectories?`| `boolean`| Whether to allow creating directories in the dialog. Enabled by default. **macOS Only**| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L77>  
`defaultPath?`| `string`| Initial directory or file path. If it’s a directory path, the dialog interface will change to that folder. If it’s not an existing directory, the file name will be set to the dialog’s file name input and the dialog will be set to the parent folder. On mobile the file name is always used on the dialog’s file name input. If not provided, Android uses `(invalid).txt` as default file name.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L75>  
`filters?`| [`DialogFilter`](/reference/javascript/dialog/#dialogfilter)[]| The filters of the dialog.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L66>  
`title?`| `string`| The title of the dialog window (desktop only).| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L64>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [MessageDialogButtons](#messagedialogbuttons)

[Section titled “MessageDialogButtons”](#messagedialogbuttons)
[code] 
    type MessageDialogButtons: MessageDialogDefaultButtons | MessageDialogCustomButtons;
[/code]

The buttons of a message dialog.

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L150>

* * *

### [MessageDialogButtonsOk](#messagedialogbuttonsok)

[Section titled “MessageDialogButtonsOk”](#messagedialogbuttonsok)
[code] 
    type MessageDialogButtonsOk: object & BanExcept<"ok">;
[/code]

The Ok button of a message dialog.

#### [Type declaration](#type-declaration)

[Section titled “Type declaration”](#type-declaration)

Name| Type| Description| Defined in  
---|---|---|---  
`ok`| `string`| The Ok button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L132>  
  
#### [Since](#since-5)

[Section titled “Since”](#since-5)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L130>

* * *

### [MessageDialogButtonsOkCancel](#messagedialogbuttonsokcancel)

[Section titled “MessageDialogButtonsOkCancel”](#messagedialogbuttonsokcancel)
[code] 
    type MessageDialogButtonsOkCancel: object & BanExcept<"ok" | "cancel">;
[/code]

The Ok and Cancel buttons of a message dialog.

#### [Type declaration](#type-declaration-1)

[Section titled “Type declaration”](#type-declaration-1)

Name| Type| Description| Defined in  
---|---|---|---  
`cancel`| `string`| The Cancel button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L122>  
`ok`| `string`| The Ok button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L120>  
  
#### [Since](#since-6)

[Section titled “Since”](#since-6)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L118>

* * *

### [MessageDialogButtonsYesNoCancel](#messagedialogbuttonsyesnocancel)

[Section titled “MessageDialogButtonsYesNoCancel”](#messagedialogbuttonsyesnocancel)
[code] 
    type MessageDialogButtonsYesNoCancel: object & BanExcept<"yes" | "no" | "cancel">;
[/code]

The Yes, No and Cancel buttons of a message dialog.

#### [Type declaration](#type-declaration-2)

[Section titled “Type declaration”](#type-declaration-2)

Name| Type| Description| Defined in  
---|---|---|---  
`cancel`| `string`| The Cancel button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L110>  
`no`| `string`| The No button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L108>  
`yes`| `string`| The Yes button.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L106>  
  
#### [Since](#since-7)

[Section titled “Since”](#since-7)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L104>

* * *

### [MessageDialogCustomButtons](#messagedialogcustombuttons)

[Section titled “MessageDialogCustomButtons”](#messagedialogcustombuttons)
[code] 
    type MessageDialogCustomButtons: MessageDialogButtonsYesNoCancel | MessageDialogButtonsOkCancel | MessageDialogButtonsOk;
[/code]

Custom buttons for a message dialog.

#### [Since](#since-8)

[Section titled “Since”](#since-8)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L140>

* * *

### [MessageDialogDefaultButtons](#messagedialogdefaultbuttons)

[Section titled “MessageDialogDefaultButtons”](#messagedialogdefaultbuttons)
[code] 
    type MessageDialogDefaultButtons: "Ok" | "OkCancel" | "YesNo" | "YesNoCancel";
[/code]

Default buttons for a message dialog.

#### [Since](#since-9)

[Section titled “Since”](#since-9)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L85>

* * *

### [MessageDialogResult](#messagedialogresult)

[Section titled “MessageDialogResult”](#messagedialogresult)
[code] 
    type MessageDialogResult:
    
      | "Yes"
    
      | "No"
    
      | "Ok"
    
      | "Cancel"
    
      | string & object;
[/code]

The result of a message dialog.

The result is a string if the dialog has custom buttons, otherwise it is one of the default buttons.

#### [Since](#since-10)

[Section titled “Since”](#since-10)

2.4.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L337>

* * *

### [OpenDialogReturn<T>](#opendialogreturnt)

[Section titled “OpenDialogReturn<T>”](#opendialogreturnt)
[code] 
    type OpenDialogReturn<T>: T["directory"] extends true ? T["multiple"] extends true ? string[] | null : string | null : T["multiple"] extends true ? string[] | null : string | null;
[/code]

#### [Type Parameters](#type-parameters)

[Section titled “Type Parameters”](#type-parameters)

Type Parameter  
---  
`T` _extends_ [`OpenDialogOptions`](/reference/javascript/dialog/#opendialogoptions)  
  
**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L227>

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [ask()](#ask)

[Section titled “ask()”](#ask)
[code] 
    function ask(message, options?): Promise<boolean>
[/code]

Shows a question dialog with `Yes` and `No` buttons.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`message`| `string`| The message to show.  
`options`?| `string` | [`ConfirmDialogOptions`](/reference/javascript/dialog/#confirmdialogoptions)| The dialog’s options. If a string, it represents the dialog title.  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

A promise resolving to a boolean indicating whether `Yes` was clicked or not.

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { ask } from '@tauri-apps/plugin-dialog';
    
    const yes = await ask('Are you sure?', 'Tauri');
    
    const yes2 = await ask('This action cannot be reverted. Are you sure?', { title: 'Tauri', kind: 'warning' });
[/code]

#### [Since](#since-11)

[Section titled “Since”](#since-11)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L387>

* * *

### [confirm()](#confirm)

[Section titled “confirm()”](#confirm)
[code] 
    function confirm(message, options?): Promise<boolean>
[/code]

Shows a question dialog with `Ok` and `Cancel` buttons.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Description  
---|---|---  
`message`| `string`| The message to show.  
`options`?| `string` | [`ConfirmDialogOptions`](/reference/javascript/dialog/#confirmdialogoptions)| The dialog’s options. If a string, it represents the dialog title.  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

A promise resolving to a boolean indicating whether `Ok` was clicked or not.

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { confirm } from '@tauri-apps/plugin-dialog';
    
    const confirmed = await confirm('Are you sure?', 'Tauri');
    
    const confirmed2 = await confirm('This action cannot be reverted. Are you sure?', { title: 'Tauri', kind: 'warning' });
[/code]

#### [Since](#since-12)

[Section titled “Since”](#since-12)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L417>

* * *

### [message()](#message)

[Section titled “message()”](#message)
[code] 
    function message(message, options?): Promise<MessageDialogResult>
[/code]

Shows a message dialog with an `Ok` button.

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`message`| `string`| The message to show.  
`options`?| `string` | [`MessageDialogOptions`](/reference/javascript/dialog/#messagedialogoptions)| The dialog’s options. If a string, it represents the dialog title.  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`MessageDialogResult`](/reference/javascript/dialog/#messagedialogresult)>

A promise indicating the success or failure of the operation.

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { message } from '@tauri-apps/plugin-dialog';
    
    await message('Tauri is awesome', 'Tauri');
    
    await message('File not found', { title: 'Tauri', kind: 'error' });
[/code]

#### [Since](#since-13)

[Section titled “Since”](#since-13)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L356>

* * *

### [open()](#open)

[Section titled “open()”](#open)
[code] 
    function open<T>(options): Promise<OpenDialogReturn<T>>
[/code]

Open a file/directory selection dialog.

The selected paths are added to the filesystem and asset protocol scopes. When security is more important than the easy of use of this API, prefer writing a dedicated command instead.

Note that the scope change is not persisted, so the values are cleared when the application is restarted. You can save it to the filesystem using [tauri-plugin-persisted-scope](https://github.com/tauri-apps/tauri-plugin-persisted-scope).

#### [Type Parameters](#type-parameters-1)

[Section titled “Type Parameters”](#type-parameters-1)

Type Parameter  
---  
`T` _extends_ [`OpenDialogOptions`](/reference/javascript/dialog/#opendialogoptions)  
  
#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`options`| `T`  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`OpenDialogReturn`](/reference/javascript/dialog/#opendialogreturnt)<`T`>>

A promise resolving to the selected path(s)

#### [Examples](#examples)

[Section titled “Examples”](#examples)
[code] 
    import { open } from '@tauri-apps/plugin-dialog';
    
    // Open a selection dialog for image files
    
    const selected = await open({
    
      multiple: true,
    
      filters: [{
    
        name: 'Image',
    
        extensions: ['png', 'jpeg']
    
      }]
    
    });
    
    if (Array.isArray(selected)) {
    
      // user selected multiple files
    
    } else if (selected === null) {
    
      // user cancelled the selection
    
    } else {
    
      // user selected a single file
    
    }
[/code]
[code] 
    import { open } from '@tauri-apps/plugin-dialog';
    
    import { appDir } from '@tauri-apps/api/path';
    
    // Open a selection dialog for directories
    
    const selected = await open({
    
      directory: true,
    
      multiple: true,
    
      defaultPath: await appDir(),
    
    });
    
    if (Array.isArray(selected)) {
    
      // user selected multiple directories
    
    } else if (selected === null) {
    
      // user cancelled the selection
    
    } else {
    
      // user selected a single directory
    
    }
[/code]

#### [Since](#since-14)

[Section titled “Since”](#since-14)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L287>

* * *

### [save()](#save)

[Section titled “save()”](#save)
[code] 
    function save(options): Promise<string | null>
[/code]

Open a file/directory save dialog.

The selected path is added to the filesystem and asset protocol scopes. When security is more important than the easy of use of this API, prefer writing a dedicated command instead.

Note that the scope change is not persisted, so the values are cleared when the application is restarted. You can save it to the filesystem using [tauri-plugin-persisted-scope](https://github.com/tauri-apps/tauri-plugin-persisted-scope).

#### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`options`| [`SaveDialogOptions`](/reference/javascript/dialog/#savedialogoptions)  
  
#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`string` | `null`>

A promise resolving to the selected path.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { save } from '@tauri-apps/plugin-dialog';
    
    const filePath = await save({
    
      filters: [{
    
        name: 'Image',
    
        extensions: ['png', 'jpeg']
    
      }]
    
    });
[/code]

#### [Since](#since-15)

[Section titled “Since”](#since-15)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/guest-js/index.ts#L321>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/dialog](https://v2.tauri.app/reference/javascript/dialog)