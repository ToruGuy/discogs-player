# App Store

The [Apple App Store](https://www.apple.com/store) is the app marketplace maintained by Apple. You can distribute your Tauri app targeting macOS and iOS via this App Store.

This guide only covers details for distributing apps directly to the App Store. See the general [App Bundle](/distribute/macos-application-bundle/) for more information on macOS distribution options and configurations.

## [Requirements](#requirements)

[Section titled “Requirements”](#requirements)

Distributing iOS and macOS apps requires enrolling to the [Apple Developer](https://developer.apple.com) program.

Additionally, you must setup code signing for [macOS](/distribute/sign/macos/) and [iOS](/distribute/sign/ios/).

## [Changing App Icon](#changing-app-icon)

[Section titled “Changing App Icon”](#changing-app-icon)

After running `tauri ios init` to setup the Xcode project, you can use the `tauri icon` command to update the app icons.

  * [ npm ](#tab-panel-714)
  * [ yarn ](#tab-panel-715)
  * [ pnpm ](#tab-panel-716)
  * [ deno ](#tab-panel-717)
  * [ bun ](#tab-panel-718)
  * [ cargo ](#tab-panel-719)


[code] 
    npm run tauri icon /path/to/app-icon.png -- --ios-color #fff
[/code]
[code] 
    yarn tauri icon /path/to/app-icon.png --ios-color #fff
[/code]
[code] 
    pnpm tauri icon /path/to/app-icon.png --ios-color #fff
[/code]
[code] 
    deno task tauri icon /path/to/app-icon.png --ios-color #fff
[/code]
[code] 
    bun tauri icon /path/to/app-icon.png --ios-color #fff
[/code]
[code] 
    cargo tauri icon /path/to/app-icon.png --ios-color #fff
[/code]

The `--ios-color` argument defines the background color for the iOS icons.

## [Setting up](#setting-up)

[Section titled “Setting up”](#setting-up)

After enrolling to the Apple Developer program, the first step to distribute your Tauri app in the App Store is to register your app in the [App Store Connect](https://appstoreconnect.apple.com/apps).

## [Build and upload](#build-and-upload)

[Section titled “Build and upload”](#build-and-upload)

The Tauri CLI can package your app for macOS and iOS. Running on a macOS machine is a requirement.

Tauri derives the [`CFBundleVersion`](https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundleversion) from the value defined in [`tauri.conf.json > version`]. You can set a custom bundle version in the [`tauri.conf.json > bundle > iOS > bundleVersion`] or [`tauri.conf.json > bundle > macOS > bundleVersion`] configuration if you need a different bundle version scheme e.g. sequential codes:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "iOS": {
    
          "bundleVersion": "100"
    
        }
    
      }
    
    }
[/code]

Note that Tauri leverages Xcode for the iOS app so you can use Xcode to archive and distribute for iOS instead of the Tauri CLI. To open the iOS project in Xcode for building you must run the following command:

  * [ npm ](#tab-panel-720)
  * [ yarn ](#tab-panel-721)
  * [ pnpm ](#tab-panel-722)
  * [ deno ](#tab-panel-723)
  * [ bun ](#tab-panel-724)
  * [ cargo ](#tab-panel-725)


[code] 
    npm run tauri ios build -- --open
[/code]
[code] 
    yarn tauri ios build --open
[/code]
[code] 
    pnpm tauri ios build --open
[/code]
[code] 
    deno task tauri ios build --open
[/code]
[code] 
    bun tauri ios build --open
[/code]
[code] 
    cargo tauri ios build --open
[/code]

### [macOS](#macos)

[Section titled “macOS”](#macos)

To upload your app to the App Store, first you must ensure all required configuration options are set so you can package the App Bundle, create a signed `.pkg` file and upload it.

The following sections will guide you through the process.

#### [Setup](#setup)

[Section titled “Setup”](#setup)

Your app must include some configurations to be accepted by the App Store verification system.

  * Category


Your app must define its [`tauri.conf.json > bundle > category`](/reference/config/#category) to be displayed in the App Store:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "category": "Utility"
    
      }
    
    }
[/code]

  * Provisioning profile


You must also create a provisioning profile for your app to be accepted by Apple.

In the [Identifiers](https://developer.apple.com/account/resources/identifiers/list) page, create a new App ID and make sure its “Bundle ID” value matches the identifier set in [`tauri.conf.json > identifier`](/reference/config/#identifier).

Navigate to the [Profiles](https://developer.apple.com/account/resources/profiles/list) page to create a new provisioning profile. For App Store macOS distribution, it must be a “Mac App Store Connect” profile. Select the appropriate App ID and link the certificate you are using for code signing.

After creating the provisioning profile, download it and save it to a known location and configure Tauri to include it in your app bundle:

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "macOS": {
    
          "files": {
    
            "embedded.provisionprofile": "path/to/profile-name.provisionprofile"
    
          }
    
        }
    
      }
    
    }
[/code]

  * Info.plist


Your app must comply with encryption export regulations. See the [official documentation](https://developer.apple.com/documentation/security/complying-with-encryption-export-regulations?language=objc) for more information.

Create a Info.plist file in the src-tauri folder:
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    
    <plist version="1.0">
    
    <dict>
    
      <key>ITSAppUsesNonExemptEncryption</key>
    
      <false/> # or `true` if your app uses encryption
    
    </dict>
    
    </plist>
[/code]

  * Entitlements


Your app must include the App Sandbox capability to be distributed in the App Store. Additionally, you must also set your App ID and Team ID in the code signing entitlements.

Create a `Entitlements.plist` file in the `src-tauri` folder:
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    
    <plist version="1.0">
    
    <dict>
    
        <key>com.apple.security.app-sandbox</key>
    
        <true/>
    
        <key>com.apple.application-identifier</key>
    
        <string>$TEAM_ID.$IDENTIFIER</string>
    
        <key>com.apple.developer.team-identifier</key>
    
        <string>$TEAM_ID</string>
    
    </dict>
    
    </plist>
[/code]

Note that you must replace `$IDENTIFIER` with the [`tauri.conf.json > identifier`](/reference/config/#identifier) value and `$TEAM_ID` with your Apple Developer team ID, which can be found in the `App ID Prefix` section in the [Identifier](https://developer.apple.com/account/resources/identifiers/list) you created for the provisioning profile.

And reference that file in the macOS bundle configuration [`tauri.conf.json > bundle > macOS > entitlements`](/reference/config/#entitlements):

tauri.conf.json
[code]
    {
    
      "bundle": {
    
        "macOS": {
    
          "entitlements": "./Entitlements.plist"
    
        }
    
      }
    
    }
[/code]

You now must build your application with code signing enabled for the entitlements to apply.

Make sure your app works when running in an App Sandbox context.

#### [Build](#build)

[Section titled “Build”](#build)

You must upload your macOS application as a `.pkg` file to the App Store. Run the following command to package your app as a macOS App Bundle (`.app` extension):
[code] 
    tauri build --bundles app --target universal-apple-darwin
[/code]

See the [App Bundle distribution guide](/distribute/macos-application-bundle/) for more information on configuration options.

To generate a signed `.pkg` from your app bundle, run the following command:
[code] 
    xcrun productbuild --sign "<certificate signing identity>" --component "target/universal-apple-darwin/release/bundle/macos/$APPNAME.app" /Applications "$APPNAME.pkg"
[/code]

Note that you must replace _$APPNAME_ with your app name.

#### [Upload](#upload)

[Section titled “Upload”](#upload)

Now you can use the [`altool`](https://help.apple.com/itc/apploader/#/apdATD1E53-D1E1A1303-D1E53A1126) CLI to upload your app PKG to the App Store:
[code] 
    xcrun altool --upload-app --type macos --file "$APPNAME.pkg" --apiKey $APPLE_API_KEY_ID --apiIssuer $APPLE_API_ISSUER
[/code]

Note that `altool` requires an App Store Connect API key to upload your app. See the [authentication section](#authentication) for more information.

Your app will then be validated by Apple and available in TestFlight if approved.

### [iOS](#ios)

[Section titled “iOS”](#ios)

To build your iOS app, run the `tauri ios build` command:

  * [ npm ](#tab-panel-732)
  * [ yarn ](#tab-panel-733)
  * [ pnpm ](#tab-panel-734)
  * [ deno ](#tab-panel-735)
  * [ bun ](#tab-panel-736)
  * [ cargo ](#tab-panel-737)


[code] 
    npm run tauri ios build -- --export-method app-store-connect
[/code]
[code] 
    yarn tauri ios build --export-method app-store-connect
[/code]
[code] 
    pnpm tauri ios build --export-method app-store-connect
[/code]
[code] 
    deno task tauri ios build --export-method app-store-connect
[/code]
[code] 
    bun tauri ios build --export-method app-store-connect
[/code]
[code] 
    cargo tauri ios build --export-method app-store-connect
[/code]

The generated IPA file can be found in `src-tauri/gen/apple/build/arm64/$APPNAME.ipa`.

Note that you must replace _$APPNAME_ with your app name.

Now you can use the `altool` CLI to upload your iOS app to the App Store:
[code] 
    xcrun altool --upload-app --type ios --file "src-tauri/gen/apple/build/arm64/$APPNAME.ipa" --apiKey $APPLE_API_KEY_ID --apiIssuer $APPLE_API_ISSUER
[/code]

Note that `altool` requires an App Store Connect API key to upload your app. See the [authentication section](#authentication) for more information.

Your app will then be validated by Apple and available in TestFlight if approved.

### [Authentication](#authentication)

[Section titled “Authentication”](#authentication)

The iOS and macOS apps are uploaded using `altool`, which uses an App Store Connect API key to authenticate.

To create a new API key, open the [App Store Connect’s Users and Access page](https://appstoreconnect.apple.com/access/users), select the Integrations > Individual Keys tab, click on the Add button and select a name and the Developer access. The `APPLE_API_ISSUER` (Issuer ID) is presented above the keys table, and the `APPLE_API_KEY_ID` is the value on the Key ID column on that table. You also need to download the private key, which can only be done once and is only visible after a page reload (the button is shown on the table row for the newly created key). The private key file path must be saved as `AuthKey\_<APPLE_API_KEY_ID>.p8` in one of these directories:`<current-working-directory>/private_keys`, `~/private_keys`, `~/.private_keys`or`~/.appstoreconnect/private_keys`.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/app-store](https://v2.tauri.app/distribute/app-store)