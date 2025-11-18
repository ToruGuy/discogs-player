# @tauri-apps/plugin-notification

Send toast notifications (brief auto-expiring OS window element) to your user. Can also be used with the Notification Web API.

## [Enumerations](#enumerations)

[Section titled “Enumerations”](#enumerations)

### [Importance](#importance)

[Section titled “Importance”](#importance)

#### [Enumeration Members](#enumeration-members)

[Section titled “Enumeration Members”](#enumeration-members)

##### [Default](#default)

[Section titled “Default”](#default)
[code] 
    Default: 3;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L293>

##### [High](#high)

[Section titled “High”](#high)
[code] 
    High: 4;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L294>

##### [Low](#low)

[Section titled “Low”](#low)
[code] 
    Low: 2;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L292>

##### [Min](#min)

[Section titled “Min”](#min)
[code] 
    Min: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L291>

##### [None](#none)

[Section titled “None”](#none)
[code] 
    None: 0;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L290>

* * *

### [ScheduleEvery](#scheduleevery)

[Section titled “ScheduleEvery”](#scheduleevery)

#### [Enumeration Members](#enumeration-members-1)

[Section titled “Enumeration Members”](#enumeration-members-1)

##### [Day](#day)

[Section titled “Day”](#day)
[code] 
    Day: "day";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L165>

##### [Hour](#hour)

[Section titled “Hour”](#hour)
[code] 
    Hour: "hour";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L166>

##### [Minute](#minute)

[Section titled “Minute”](#minute)
[code] 
    Minute: "minute";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L167>

##### [Month](#month)

[Section titled “Month”](#month)
[code] 
    Month: "month";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L162>

##### [Second](#second)

[Section titled “Second”](#second)
[code] 
    Second: "second";
[/code]

Not supported on iOS.

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L171>

##### [TwoWeeks](#twoweeks)

[Section titled “TwoWeeks”](#twoweeks)
[code] 
    TwoWeeks: "twoWeeks";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L163>

##### [Week](#week)

[Section titled “Week”](#week)
[code] 
    Week: "week";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L164>

##### [Year](#year)

[Section titled “Year”](#year)
[code] 
    Year: "year";
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L161>

* * *

### [Visibility](#visibility)

[Section titled “Visibility”](#visibility)

#### [Enumeration Members](#enumeration-members-2)

[Section titled “Enumeration Members”](#enumeration-members-2)

##### [Private](#private)

[Section titled “Private”](#private)
[code] 
    Private: 0;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L299>

##### [Public](#public)

[Section titled “Public”](#public)
[code] 
    Public: 1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L300>

##### [Secret](#secret)

[Section titled “Secret”](#secret)
[code] 
    Secret: -1;
[/code]

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L298>

## [Classes](#classes)

[Section titled “Classes”](#classes)

### [Schedule](#schedule)

[Section titled “Schedule”](#schedule)

#### [Constructors](#constructors)

[Section titled “Constructors”](#constructors)

##### [new Schedule()](#new-schedule)

[Section titled “new Schedule()”](#new-schedule)
[code] 
    new Schedule(): Schedule
[/code]

###### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Schedule`](/reference/javascript/notification/#schedule)

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`at`| `undefined` | `object`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L175>  
`every`| `undefined` | `object`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L190>  
`interval`| `undefined` | `object`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L183>  
  
#### [Methods](#methods)

[Section titled “Methods”](#methods)

##### [at()](#at)

[Section titled “at()”](#at)
[code] 
    static at(
    
       date,
    
       repeating,
    
       allowWhileIdle): Schedule
[/code]

###### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Default value  
---|---|---  
`date`| [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)| `undefined`  
`repeating`| `boolean`| `false`  
`allowWhileIdle`| `boolean`| `false`  
  
###### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

[`Schedule`](/reference/javascript/notification/#schedule)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L198>

##### [every()](#every)

[Section titled “every()”](#every)
[code] 
    static every(
    
       kind,
    
       count,
    
       allowWhileIdle): Schedule
[/code]

###### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type| Default value  
---|---|---  
`kind`| [`ScheduleEvery`](/reference/javascript/notification/#scheduleevery)| `undefined`  
`count`| `number`| `undefined`  
`allowWhileIdle`| `boolean`| `false`  
  
###### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

[`Schedule`](/reference/javascript/notification/#schedule)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L217>

##### [interval()](#interval)

[Section titled “interval()”](#interval)
[code] 
    static interval(interval, allowWhileIdle): Schedule
[/code]

###### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Default value  
---|---|---  
`interval`| [`ScheduleInterval`](/reference/javascript/notification/#scheduleinterval)| `undefined`  
`allowWhileIdle`| `boolean`| `false`  
  
###### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

[`Schedule`](/reference/javascript/notification/#schedule)

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L206>

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [Action](#action)

[Section titled “Action”](#action)

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Defined in  
---|---|---  
`destructive?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L245>  
`foreground?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L244>  
`id`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L241>  
`input?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L246>  
`inputButtonTitle?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L247>  
`inputPlaceholder?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L248>  
`requiresAuthentication?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L243>  
`title`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L242>  
  
* * *

### [ActionType](#actiontype)

[Section titled “ActionType”](#actiontype)

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Description| Defined in  
---|---|---|---  
`actions`| [`Action`](/reference/javascript/notification/#action)[]| The list of associated actions| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L259>  
`allowInCarPlay?`| `boolean`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L262>  
`customDismissAction?`| `boolean`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L261>  
`hiddenPreviewsBodyPlaceholder?`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L260>  
`hiddenPreviewsShowSubtitle?`| `boolean`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L264>  
`hiddenPreviewsShowTitle?`| `boolean`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L263>  
`id`| `string`| The identifier of this action type| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L255>  
  
* * *

### [ActiveNotification](#activenotification)

[Section titled “ActiveNotification”](#activenotification)

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Defined in  
---|---|---  
`actionTypeId?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L284>  
`attachments`| [`Attachment`](/reference/javascript/notification/#attachment)[]| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L283>  
`body?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L278>  
`data`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `string`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L281>  
`extra`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `unknown`>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L282>  
`group?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L279>  
`groupSummary`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L280>  
`id`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L275>  
`schedule?`| [`Schedule`](/reference/javascript/notification/#schedule)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L285>  
`sound?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L286>  
`tag?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L276>  
`title?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L277>  
  
* * *

### [Attachment](#attachment)

[Section titled “Attachment”](#attachment)

Attachment of a notification.

#### [Properties](#properties-4)

[Section titled “Properties”](#properties-4)

Property| Type| Description| Defined in  
---|---|---|---  
`id`| `string`| Attachment identifier.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L235>  
`url`| `string`| Attachment URL. Accepts the `asset` and `file` protocols.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L237>  
  
* * *

### [Channel](#channel)

[Section titled “Channel”](#channel)

#### [Properties](#properties-5)

[Section titled “Properties”](#properties-5)

Property| Type| Defined in  
---|---|---  
`description?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L306>  
`id`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L304>  
`importance?`| [`Importance`](/reference/javascript/notification/#importance)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L311>  
`lightColor?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L309>  
`lights?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L308>  
`name`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L305>  
`sound?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L307>  
`vibration?`| `boolean`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L310>  
`visibility?`| [`Visibility`](/reference/javascript/notification/#visibility)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L312>  
  
* * *

### [Options](#options)

[Section titled “Options”](#options)

Options to send a notification.

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Properties](#properties-6)

[Section titled “Properties”](#properties-6)

Property| Type| Description| Defined in  
---|---|---|---  
`actionTypeId?`| `string`| Defines an action type for this notification.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L62>  
`attachments?`| [`Attachment`](/reference/javascript/notification/#attachment)[]| Notification attachments.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L110>  
`autoCancel?`| `boolean`| Automatically cancel the notification when the user clicks on it.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L126>  
`body?`| `string`| Optional notification body.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L44>  
`channelId?`| `string`| Identifier of the [Channel](/reference/javascript/notification/#channel) that deliveres this notification. If the channel does not exist, the notification won’t fire. Make sure the channel exists with listChannels and [createChannel](/reference/javascript/notification/#createchannel).| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L36>  
`extra?`| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)<`string`, `unknown`>| Extra payload to store in the notification.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L114>  
`group?`| `string`| Identifier used to group multiple notifications. <https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent/1649872-threadidentifier>| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L68>  
`groupSummary?`| `boolean`| Instructs the system that this notification is the summary of a group on Android.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L72>  
`icon?`| `string`| Notification icon. On Android the icon must be placed in the app’s `res/drawable` folder.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L96>  
`iconColor?`| `string`| Icon color on Android.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L106>  
`id?`| `number`| The notification identifier to reference this object later. Must be a 32-bit integer.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L29>  
`inboxLines?`| `string`[]| List of lines to add to the notification. Changes the notification style to inbox. Cannot be used with `largeBody`. Only supports up to 5 lines.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L90>  
`largeBody?`| `string`| Multiline text. Changes the notification style to big text. Cannot be used with `inboxLines`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L54>  
`largeIcon?`| `string`| Notification large icon (Android). The icon must be placed in the app’s `res/drawable` folder.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L102>  
`number?`| `number`| Sets the number of items this notification represents on Android.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L138>  
`ongoing?`| `boolean`| If true, the notification cannot be dismissed by the user on Android. An application service must manage the dismissal of the notification. It is typically used to indicate a background task that is pending (e.g. a file download) or the user is engaged with (e.g. playing music).| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L122>  
`schedule?`| [`Schedule`](/reference/javascript/notification/#schedule)| Schedule this notification to fire on a later time or a fixed interval.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L48>  
`silent?`| `boolean`| Changes the notification presentation to be silent on iOS (no badge, no sound, not listed).| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L130>  
`sound?`| `string`| The sound resource name or file path for the notification. Platform specific behavior: - On macOS: use system sounds (e.g., “Ping”, “Blow”) or sound files in the app bundle - On Linux: use XDG theme sounds (e.g., “message-new-instant”) or file paths - On Windows: use file paths to sound files (.wav format) - On Mobile: use resource names| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L82>  
`summary?`| `string`| Detail text for the notification with `largeBody`, `inboxLines` or `groupSummary`.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L58>  
`title`| `string`| Notification title.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L40>  
`visibility?`| [`Visibility`](/reference/javascript/notification/#visibility)| Notification visibility.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L134>  
  
* * *

### [PendingNotification](#pendingnotification)

[Section titled “PendingNotification”](#pendingnotification)

#### [Properties](#properties-7)

[Section titled “Properties”](#properties-7)

Property| Type| Defined in  
---|---|---  
`body?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L270>  
`id`| `number`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L268>  
`schedule`| [`Schedule`](/reference/javascript/notification/#schedule)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L271>  
`title?`| `string`| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L269>  
  
* * *

### [ScheduleInterval](#scheduleinterval)

[Section titled “ScheduleInterval”](#scheduleinterval)

#### [Properties](#properties-8)

[Section titled “Properties”](#properties-8)

Property| Type| Description| Defined in  
---|---|---|---  
`day?`| `number`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L144>  
`hour?`| `number`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L155>  
`minute?`| `number`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L156>  
`month?`| `number`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L143>  
`second?`| `number`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L157>  
`weekday?`| `number`| 1 - Sunday 2 - Monday 3 - Tuesday 4 - Wednesday 5 - Thursday 6 - Friday 7 - Saturday| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L154>  
`year?`| `number`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L142>  
  
## [Type Aliases](#type-aliases)

[Section titled “Type Aliases”](#type-aliases)

### [PermissionState](#permissionstate)

[Section titled “PermissionState”](#permissionstate)
[code] 
    type PermissionState: "granted" | "denied" | "prompt" | "prompt-with-rationale";
[/code]

**Source** : undefined

## [Functions](#functions)

[Section titled “Functions”](#functions)

### [active()](#active)

[Section titled “active()”](#active)
[code] 
    function active(): Promise<ActiveNotification[]>
[/code]

Retrieves the list of active notifications.

#### [Returns](#returns-4)

[Section titled “Returns”](#returns-4)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`ActiveNotification`](/reference/javascript/notification/#activenotification)[]>

A promise resolving to the list of active notifications.

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { active } from '@tauri-apps/plugin-notification';
    
    const activeNotifications = await active();
[/code]

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L465>

* * *

### [cancel()](#cancel)

[Section titled “cancel()”](#cancel)
[code] 
    function cancel(notifications): Promise<void>
[/code]

Cancels the pending notifications with the given list of identifiers.

#### [Parameters](#parameters-3)

[Section titled “Parameters”](#parameters-3)

Parameter| Type  
---|---  
`notifications`| `number`[]  
  
#### [Returns](#returns-5)

[Section titled “Returns”](#returns-5)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { cancel } from '@tauri-apps/plugin-notification';
    
    await cancel([-34234, 23432, 4311]);
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L431>

* * *

### [cancelAll()](#cancelall)

[Section titled “cancelAll()”](#cancelall)
[code] 
    function cancelAll(): Promise<void>
[/code]

Cancels all pending notifications.

#### [Returns](#returns-6)

[Section titled “Returns”](#returns-6)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-2)

[Section titled “Example”](#example-2)
[code] 
    import { cancelAll } from '@tauri-apps/plugin-notification';
    
    await cancelAll();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L448>

* * *

### [channels()](#channels)

[Section titled “channels()”](#channels)
[code] 
    function channels(): Promise<Channel[]>
[/code]

Retrieves the list of notification channels.

#### [Returns](#returns-7)

[Section titled “Returns”](#returns-7)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Channel`](/reference/javascript/notification/#channel)[]>

A promise resolving to the list of notification channels.

#### [Example](#example-3)

[Section titled “Example”](#example-3)
[code] 
    import { channels } from '@tauri-apps/plugin-notification';
    
    const notificationChannels = await channels();
[/code]

#### [Since](#since-4)

[Section titled “Since”](#since-4)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L559>

* * *

### [createChannel()](#createchannel)

[Section titled “createChannel()”](#createchannel)
[code] 
    function createChannel(channel): Promise<void>
[/code]

Creates a notification channel.

#### [Parameters](#parameters-4)

[Section titled “Parameters”](#parameters-4)

Parameter| Type  
---|---  
`channel`| [`Channel`](/reference/javascript/notification/#channel)  
  
#### [Returns](#returns-8)

[Section titled “Returns”](#returns-8)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-4)

[Section titled “Example”](#example-4)
[code] 
    import { createChannel, Importance, Visibility } from '@tauri-apps/plugin-notification';
    
    await createChannel({
    
      id: 'new-messages',
    
      name: 'New Messages',
    
      lights: true,
    
      vibration: true,
    
      importance: Importance.Default,
    
      visibility: Visibility.Private
    
    });
[/code]

#### [Since](#since-5)

[Section titled “Since”](#since-5)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L525>

* * *

### [isPermissionGranted()](#ispermissiongranted)

[Section titled “isPermissionGranted()”](#ispermissiongranted)
[code] 
    function isPermissionGranted(): Promise<boolean>
[/code]

Checks if the permission to send notifications is granted.

#### [Returns](#returns-9)

[Section titled “Returns”](#returns-9)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`boolean`>

#### [Example](#example-5)

[Section titled “Example”](#example-5)
[code] 
    import { isPermissionGranted } from '@tauri-apps/plugin-notification';
    
    const permissionGranted = await isPermissionGranted();
[/code]

#### [Since](#since-6)

[Section titled “Since”](#since-6)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L325>

* * *

### [onAction()](#onaction)

[Section titled “onAction()”](#onaction)
[code] 
    function onAction(cb): Promise<PluginListener>
[/code]

#### [Parameters](#parameters-5)

[Section titled “Parameters”](#parameters-5)

Parameter| Type  
---|---  
`cb`| (`notification`) => `void`  
  
#### [Returns](#returns-10)

[Section titled “Returns”](#returns-10)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`PluginListener`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L569>

* * *

### [onNotificationReceived()](#onnotificationreceived)

[Section titled “onNotificationReceived()”](#onnotificationreceived)
[code] 
    function onNotificationReceived(cb): Promise<PluginListener>
[/code]

#### [Parameters](#parameters-6)

[Section titled “Parameters”](#parameters-6)

Parameter| Type  
---|---  
`cb`| (`notification`) => `void`  
  
#### [Returns](#returns-11)

[Section titled “Returns”](#returns-11)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`PluginListener`>

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L563>

* * *

### [pending()](#pending)

[Section titled “pending()”](#pending)
[code] 
    function pending(): Promise<PendingNotification[]>
[/code]

Retrieves the list of pending notifications.

#### [Returns](#returns-12)

[Section titled “Returns”](#returns-12)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`PendingNotification`](/reference/javascript/notification/#pendingnotification)[]>

A promise resolving to the list of pending notifications.

#### [Example](#example-6)

[Section titled “Example”](#example-6)
[code] 
    import { pending } from '@tauri-apps/plugin-notification';
    
    const pendingNotifications = await pending();
[/code]

#### [Since](#since-7)

[Section titled “Since”](#since-7)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L414>

* * *

### [registerActionTypes()](#registeractiontypes)

[Section titled “registerActionTypes()”](#registeractiontypes)
[code] 
    function registerActionTypes(types): Promise<void>
[/code]

Register actions that are performed when the user clicks on the notification.

#### [Parameters](#parameters-7)

[Section titled “Parameters”](#parameters-7)

Parameter| Type  
---|---  
`types`| [`ActionType`](/reference/javascript/notification/#actiontype)[]  
  
#### [Returns](#returns-13)

[Section titled “Returns”](#returns-13)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-7)

[Section titled “Example”](#example-7)
[code] 
    import { registerActionTypes } from '@tauri-apps/plugin-notification';
    
    await registerActionTypes([{
    
      id: 'tauri',
    
      actions: [{
    
        id: 'my-action',
    
        title: 'Settings'
    
      }]
    
    }])
[/code]

#### [Since](#since-8)

[Section titled “Since”](#since-8)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L397>

* * *

### [removeActive()](#removeactive)

[Section titled “removeActive()”](#removeactive)
[code] 
    function removeActive(notifications): Promise<void>
[/code]

Removes the active notifications with the given list of identifiers.

#### [Parameters](#parameters-8)

[Section titled “Parameters”](#parameters-8)

Parameter| Type  
---|---  
`notifications`| `object`[]  
  
#### [Returns](#returns-14)

[Section titled “Returns”](#returns-14)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-8)

[Section titled “Example”](#example-8)
[code] 
    import { cancel } from '@tauri-apps/plugin-notification';
    
    await cancel([-34234, 23432, 4311])
[/code]

#### [Since](#since-9)

[Section titled “Since”](#since-9)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L482>

* * *

### [removeAllActive()](#removeallactive)

[Section titled “removeAllActive()”](#removeallactive)
[code] 
    function removeAllActive(): Promise<void>
[/code]

Removes all active notifications.

#### [Returns](#returns-15)

[Section titled “Returns”](#returns-15)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-9)

[Section titled “Example”](#example-9)
[code] 
    import { removeAllActive } from '@tauri-apps/plugin-notification';
    
    await removeAllActive()
[/code]

#### [Since](#since-10)

[Section titled “Since”](#since-10)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L501>

* * *

### [removeChannel()](#removechannel)

[Section titled “removeChannel()”](#removechannel)
[code] 
    function removeChannel(id): Promise<void>
[/code]

Removes the channel with the given identifier.

#### [Parameters](#parameters-9)

[Section titled “Parameters”](#parameters-9)

Parameter| Type  
---|---  
`id`| `string`  
  
#### [Returns](#returns-16)

[Section titled “Returns”](#returns-16)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

A promise indicating the success or failure of the operation.

#### [Example](#example-10)

[Section titled “Example”](#example-10)
[code] 
    import { removeChannel } from '@tauri-apps/plugin-notification';
    
    await removeChannel();
[/code]

#### [Since](#since-11)

[Section titled “Since”](#since-11)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L542>

* * *

### [requestPermission()](#requestpermission)

[Section titled “requestPermission()”](#requestpermission)
[code] 
    function requestPermission(): Promise<NotificationPermission>
[/code]

Requests the permission to send notifications.

#### [Returns](#returns-17)

[Section titled “Returns”](#returns-17)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`NotificationPermission`>

A promise resolving to whether the user granted the permission or not.

#### [Example](#example-11)

[Section titled “Example”](#example-11)
[code] 
    import { isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';
    
    let permissionGranted = await isPermissionGranted();
    
    if (!permissionGranted) {
    
      const permission = await requestPermission();
    
      permissionGranted = permission === 'granted';
    
    }
[/code]

#### [Since](#since-12)

[Section titled “Since”](#since-12)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L348>

* * *

### [sendNotification()](#sendnotification)

[Section titled “sendNotification()”](#sendnotification)
[code] 
    function sendNotification(options): void
[/code]

Sends a notification to the user.

#### [Parameters](#parameters-10)

[Section titled “Parameters”](#parameters-10)

Parameter| Type  
---|---  
`options`| `string` | [`Options`](/reference/javascript/notification/#options)  
  
#### [Returns](#returns-18)

[Section titled “Returns”](#returns-18)

`void`

#### [Example](#example-12)

[Section titled “Example”](#example-12)
[code] 
    import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
    
    let permissionGranted = await isPermissionGranted();
    
    if (!permissionGranted) {
    
      const permission = await requestPermission();
    
      permissionGranted = permission === 'granted';
    
    }
    
    if (permissionGranted) {
    
      sendNotification('Tauri is awesome!');
    
      sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
    
    }
[/code]

#### [Since](#since-13)

[Section titled “Since”](#since-13)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/notification/guest-js/index.ts#L370>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/notification](https://v2.tauri.app/reference/javascript/notification)