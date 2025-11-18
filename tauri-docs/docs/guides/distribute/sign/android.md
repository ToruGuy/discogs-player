# Android Code Signing

To publish on the Play Store, you need to sign your app with a digital certificate.

Android App Bundles and APKs must be signed before being uploaded for distribution.

Google also provides an additional signing mechanism for Android App Bundles distributed in the Play Store. See the [official Play App Signing documentation](https://support.google.com/googleplay/android-developer/answer/9842756?hl=en&visit_id=638549803861403647-3347771264&rd=1) for more information.

## [Creating a keystore and upload key](#creating-a-keystore-and-upload-key)

[Section titled “Creating a keystore and upload key”](#creating-a-keystore-and-upload-key)

Android signing requires a Java Keystore file that can be generated using the official `keytool` CLI:

  * [ macOS/Linux ](#tab-panel-1651)
  * [ Windows ](#tab-panel-1652)


[code] 
    keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
[/code]
[code] 
    keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias upload
[/code]

This command stores the `upload-keystore.jks` file in your home directory. If you want to store it elsewhere, change the argument you pass to the `-keystore` parameter.

See the [official documentation](https://developer.android.com/studio/publish/app-signing#generate-key) for more information.

## [Configure the signing key](#configure-the-signing-key)

[Section titled “Configure the signing key”](#configure-the-signing-key)

Create a file named `[project]/src-tauri/gen/android/keystore.properties` that contains a reference to your keystore:
[code] 
    password=<password defined when keytool was executed>
    
    keyAlias=upload
    
    storeFile=<location of the key store file, such as /Users/<user name>/upload-keystore.jks or C:\\Users\\<user name>\\upload-keystore.jks>
[/code]

You will usually generate this file in your CI/CD platform. The following snippet contains an example job step for GitHub Actions:
[code] 
    - name: setup Android signing
    
      run: |
    
        cd src-tauri/gen/android
    
        echo "keyAlias=${{ secrets.ANDROID_KEY_ALIAS }}" > keystore.properties
    
        echo "password=${{ secrets.ANDROID_KEY_PASSWORD }}" >> keystore.properties
    
        base64 -d <<< "${{ secrets.ANDROID_KEY_BASE64 }}" > $RUNNER_TEMP/keystore.jks
    
        echo "storeFile=$RUNNER_TEMP/keystore.jks" >> keystore.properties
[/code]

In this example the keystore was exported to base64 with `base64 -i /path/to/keystore.jks` and set as the `ANDROID_KEY_BASE64` secret.

### [Configure Gradle to use the signing key](#configure-gradle-to-use-the-signing-key)

[Section titled “Configure Gradle to use the signing key”](#configure-gradle-to-use-the-signing-key)

Configure gradle to use your upload key when building your app in release mode by editing the `[project]/src-tauri/gen/android/app/build.gradle.kts` file.

  1. Add the needed import at the beginning of the file:
[code] import java.io.FileInputStream
[/code]

  2. Add the `release` signing config before the `buildTypes` block:
[code] signingConfigs {
         
             create("release") {
         
                 val keystorePropertiesFile = rootProject.file("keystore.properties")
         
                 val keystoreProperties = Properties()
         
                 if (keystorePropertiesFile.exists()) {
         
                     keystoreProperties.load(FileInputStream(keystorePropertiesFile))
         
                 }
         
         
         
         
                 keyAlias = keystoreProperties["keyAlias"] as String
         
                 keyPassword = keystoreProperties["password"] as String
         
                 storeFile = file(keystoreProperties["storeFile"] as String)
         
                 storePassword = keystoreProperties["password"] as String
         
             }
         
         }
         
         
         
         
         buildTypes {
         
             ...
         
         }
[/code]

  3. Use the new `release` signing config in the `release` config in `buildTypes` block:
[code] buildTypes {
         
             getByName("release") {
         
                 signingConfig = signingConfigs.getByName("release")
         
             }
         
         }
[/code]


Release builds of your app will now be signed automatically.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/sign/android](https://v2.tauri.app/distribute/sign/android)