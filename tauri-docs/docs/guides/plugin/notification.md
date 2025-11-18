# Notifications

[ GitHub](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/notification) [ npm ](https://www.npmjs.com/package/@tauri-apps/plugin-notification) [ crates.io ](https://crates.io/crates/tauri-plugin-notification)

API Reference [ ](/reference/javascript/notification/) [ ](https://docs.rs/tauri-plugin-notification)

Send native notifications to your user using the notification plugin.

## [Supported Platforms](#supported-platforms)

[Section titled “Supported Platforms”](#supported-platforms)

_This plugin requires a Rust version of at least**1.77.2**_

Platform | Level | Notes  
---|---|---  
windows |  |  Only works for installed apps. Shows powershell name & icon in development.  
linux |  |   
macos |  |   
android |  |   
ios |  |   
  
## [Setup](#setup)

[Section titled “Setup”](#setup)

Install the notifications plugin to get started.

  * [ Automatic ](#tab-panel-1349)
  * [ Manual ](#tab-panel-1350)


Use your project’s package manager to add the dependency:

  * [ npm ](#tab-panel-1338)
  * [ yarn ](#tab-panel-1339)
  * [ pnpm ](#tab-panel-1340)
  * [ deno ](#tab-panel-1341)
  * [ bun ](#tab-panel-1342)
  * [ cargo ](#tab-panel-1343)


[code] 
    npm run tauri add notification
[/code]
[code] 
    yarn run tauri add notification
[/code]
[code] 
    pnpm tauri add notification
[/code]
[code] 
    deno task tauri add notification
[/code]
[code] 
    bun tauri add notification
[/code]
[code] 
    cargo tauri add notification
[/code]

  1. Run the following command in the `src-tauri` folder to add the plugin to the project’s dependencies in `Cargo.toml`:
[code] cargo add tauri-plugin-notification
[/code]

  2. Modify `lib.rs` to initialize the plugin:

src-tauri/src/lib.rs
[code]#[cfg_attr(mobile, tauri::mobile_entry_point)]
         
         pub fn run() {
         
             tauri::Builder::default()
         
                 .plugin(tauri_plugin_notification::init())
         
                 .run(tauri::generate_context!())
         
                 .expect("error while running tauri application");
         
         }
[/code]

  3. If you’d like to use notifications in JavaScript then install the npm package as well:

     * [ npm ](#tab-panel-1344)
     * [ yarn ](#tab-panel-1345)
     * [ pnpm ](#tab-panel-1346)
     * [ deno ](#tab-panel-1347)
     * [ bun ](#tab-panel-1348)
[code] npm install @tauri-apps/plugin-notification
[/code]
[code] yarn add @tauri-apps/plugin-notification
[/code]
[code] pnpm add @tauri-apps/plugin-notification
[/code]
[code] bun add npm:@tauri-apps/plugin-notification
[/code]
[code] bun add @tauri-apps/plugin-notification
[/code]


## [Usage](#usage)

[Section titled “Usage”](#usage)

Here are a few examples of how to use the notification plugin:

  * [Send notification to users](#send-notification)
  * [Add an action to a notification](#actions)
  * [Add an attachment to a notification](#attachments)
  * [Send a notification in a specific channel](#channels)


The notification plugin is available in both JavaScript and Rust.

### [Send Notification](#send-notification)

[Section titled “Send Notification”](#send-notification)

Follow these steps to send a notification:

  1. Check if permission is granted

  2. Request permission if not granted

  3. Send the notification


  * [ JavaScript ](#tab-panel-1336)
  * [ Rust ](#tab-panel-1337)


[code] 
    import {
    
      isPermissionGranted,
    
      requestPermission,
    
      sendNotification,
    
    } from '@tauri-apps/plugin-notification';
    
    // when using `"withGlobalTauri": true`, you may use
    
    // const { isPermissionGranted, requestPermission, sendNotification, } = window.__TAURI__.notification;
    
    
    
    
    // Do you have permission to send a notification?
    
    let permissionGranted = await isPermissionGranted();
    
    
    
    
    // If not we need to request it
    
    if (!permissionGranted) {
    
      const permission = await requestPermission();
    
      permissionGranted = permission === 'granted';
    
    }
    
    
    
    
    // Once permission has been granted we can send the notification
    
    if (permissionGranted) {
    
      sendNotification({ title: 'Tauri', body: 'Tauri is awesome!' });
    
    }
[/code]
[code] 
    tauri::Builder::default()
    
        .plugin(tauri_plugin_notification::init())
    
        .setup(|app| {
    
            use tauri_plugin_notification::NotificationExt;
    
            app.notification()
    
                .builder()
    
                .title("Tauri")
    
                .body("Tauri is awesome")
    
                .show()
    
                .unwrap();
    
    
    
    
            Ok(())
    
        })
    
        .run(tauri::generate_context!())
    
        .expect("error while running tauri application");
[/code]

### [Actions](#actions)

[Section titled “Actions”](#actions)

Actions add interactive buttons and inputs to notifications. Use them to create a responsive experience for your users.

#### [Register Action Types](#register-action-types)

[Section titled “Register Action Types”](#register-action-types)

Register action types to define interactive elements:
[code] 
    import { registerActionTypes } from '@tauri-apps/plugin-notification';
    
    
    
    
    await registerActionTypes([
    
      {
    
        id: 'messages',
    
        actions: [
    
          {
    
            id: 'reply',
    
            title: 'Reply',
    
            input: true,
    
            inputButtonTitle: 'Send',
    
            inputPlaceholder: 'Type your reply...',
    
          },
    
          {
    
            id: 'mark-read',
    
            title: 'Mark as Read',
    
            foreground: false,
    
          },
    
        ],
    
      },
    
    ]);
[/code]

#### [Action Properties](#action-properties)

[Section titled “Action Properties”](#action-properties)

Property| Description  
---|---  
`id`| Unique identifier for the action  
`title`| Display text for the action button  
`requiresAuthentication`| Requires device authentication  
`foreground`| Brings app to foreground when triggered  
`destructive`| Shows action in red on iOS  
`input`| Enables text input  
`inputButtonTitle`| Text for input submit button  
`inputPlaceholder`| Placeholder text for input field  
  
#### [Listen for Actions](#listen-for-actions)

[Section titled “Listen for Actions”](#listen-for-actions)

Listen to user interactions with notification actions:
[code] 
    import { onAction } from '@tauri-apps/plugin-notification';
    
    
    
    
    await onAction((notification) => {
    
      console.log('Action performed:', notification);
    
    });
[/code]

### [Attachments](#attachments)

[Section titled “Attachments”](#attachments)

Attachments add media content to notifications. Support varies by platform.
[code] 
    import { sendNotification } from '@tauri-apps/plugin-notification';
    
    
    
    
    sendNotification({
    
      title: 'New Image',
    
      body: 'Check out this picture',
    
      attachments: [
    
        {
    
          id: 'image-1',
    
          url: 'asset:///notification-image.jpg',
    
        },
    
      ],
    
    });
[/code]

#### [Attachment Properties](#attachment-properties)

[Section titled “Attachment Properties”](#attachment-properties)

Property| Description  
---|---  
`id`| Unique identifier  
`url`| Content URL using asset:// or file:// protocol  
  
Note: Test attachments on your target platforms to ensure compatibility.

### [Channels](#channels)

[Section titled “Channels”](#channels)

Channels organize notifications into categories with different behaviors. While primarily used on Android, they provide a consistent API across platforms.

#### [Create a Channel](#create-a-channel)

[Section titled “Create a Channel”](#create-a-channel)
[code] 
    import {
    
      createChannel,
    
      Importance,
    
      Visibility,
    
    } from '@tauri-apps/plugin-notification';
    
    
    
    
    await createChannel({
    
      id: 'messages',
    
      name: 'Messages',
    
      description: 'Notifications for new messages',
    
      importance: Importance.High,
    
      visibility: Visibility.Private,
    
      lights: true,
    
      lightColor: '#ff0000',
    
      vibration: true,
    
      sound: 'notification_sound',
    
    });
[/code]

#### [Channel Properties](#channel-properties)

[Section titled “Channel Properties”](#channel-properties)

Property| Description  
---|---  
`id`| Unique identifier  
`name`| Display name  
`description`| Purpose description  
`importance`| Priority level (None, Min, Low, Default, High)  
`visibility`| Privacy setting (Secret, Private, Public)  
`lights`| Enable notification LED (Android)  
`lightColor`| LED color (Android)  
`vibration`| Enable vibrations  
`sound`| Custom sound filename  
  
#### [Managing Channels](#managing-channels)

[Section titled “Managing Channels”](#managing-channels)

List existing channels:
[code] 
    import { channels } from '@tauri-apps/plugin-notification';
    
    
    
    
    const existingChannels = await channels();
[/code]

Remove a channel:
[code] 
    import { removeChannel } from '@tauri-apps/plugin-notification';
    
    
    
    
    await removeChannel('messages');
[/code]

#### [Using Channels](#using-channels)

[Section titled “Using Channels”](#using-channels)

Send a notification using a channel:
[code] 
    import { sendNotification } from '@tauri-apps/plugin-notification';
    
    
    
    
    sendNotification({
    
      title: 'New Message',
    
      body: 'You have a new message',
    
      channelId: 'messages',
    
    });
[/code]

Note: Create channels before sending notifications that reference them. Invalid channel IDs prevent notifications from displaying.

## [Security Considerations](#security-considerations)

[Section titled “Security Considerations”](#security-considerations)

Aside from normal sanitization procedures of user input there are currently no known security considerations.

## [Default Permission](#default-permission)

This permission set configures which notification features are by default exposed.

#### [Granted Permissions](#granted-permissions)

It allows all notification related features.

#### This default permission set includes the following:

  * `allow-is-permission-granted`
  * `allow-request-permission`
  * `allow-notify`
  * `allow-register-action-types`
  * `allow-register-listener`
  * `allow-cancel`
  * `allow-get-pending`
  * `allow-remove-active`
  * `allow-get-active`
  * `allow-check-permissions`
  * `allow-show`
  * `allow-batch`
  * `allow-list-channels`
  * `allow-delete-channel`
  * `allow-create-channel`
  * `allow-permission-state`


## Permission Table

Identifier | Description  
---|---  
`notification:allow-batch` |  Enables the batch command without any pre-configured scope.  
`notification:deny-batch` |  Denies the batch command without any pre-configured scope.  
`notification:allow-cancel` |  Enables the cancel command without any pre-configured scope.  
`notification:deny-cancel` |  Denies the cancel command without any pre-configured scope.  
`notification:allow-check-permissions` |  Enables the check_permissions command without any pre-configured scope.  
`notification:deny-check-permissions` |  Denies the check_permissions command without any pre-configured scope.  
`notification:allow-create-channel` |  Enables the create_channel command without any pre-configured scope.  
`notification:deny-create-channel` |  Denies the create_channel command without any pre-configured scope.  
`notification:allow-delete-channel` |  Enables the delete_channel command without any pre-configured scope.  
`notification:deny-delete-channel` |  Denies the delete_channel command without any pre-configured scope.  
`notification:allow-get-active` |  Enables the get_active command without any pre-configured scope.  
`notification:deny-get-active` |  Denies the get_active command without any pre-configured scope.  
`notification:allow-get-pending` |  Enables the get_pending command without any pre-configured scope.  
`notification:deny-get-pending` |  Denies the get_pending command without any pre-configured scope.  
`notification:allow-is-permission-granted` |  Enables the is_permission_granted command without any pre-configured scope.  
`notification:deny-is-permission-granted` |  Denies the is_permission_granted command without any pre-configured scope.  
`notification:allow-list-channels` |  Enables the list_channels command without any pre-configured scope.  
`notification:deny-list-channels` |  Denies the list_channels command without any pre-configured scope.  
`notification:allow-notify` |  Enables the notify command without any pre-configured scope.  
`notification:deny-notify` |  Denies the notify command without any pre-configured scope.  
`notification:allow-permission-state` |  Enables the permission_state command without any pre-configured scope.  
`notification:deny-permission-state` |  Denies the permission_state command without any pre-configured scope.  
`notification:allow-register-action-types` |  Enables the register_action_types command without any pre-configured scope.  
`notification:deny-register-action-types` |  Denies the register_action_types command without any pre-configured scope.  
`notification:allow-register-listener` |  Enables the register_listener command without any pre-configured scope.  
`notification:deny-register-listener` |  Denies the register_listener command without any pre-configured scope.  
`notification:allow-remove-active` |  Enables the remove_active command without any pre-configured scope.  
`notification:deny-remove-active` |  Denies the remove_active command without any pre-configured scope.  
`notification:allow-request-permission` |  Enables the request_permission command without any pre-configured scope.  
`notification:deny-request-permission` |  Denies the request_permission command without any pre-configured scope.  
`notification:allow-show` |  Enables the show command without any pre-configured scope.  
`notification:deny-show` |  Denies the show command without any pre-configured scope.  
  
* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/plugin/notification](https://v2.tauri.app/plugin/notification)