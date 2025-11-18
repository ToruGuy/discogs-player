# Linux Code Signing

This guide provides information on code signing for Linux packages. While artifact signing is not required for your application to be deployed on Linux, it can be used to increase trust into your deployed application. Signing the binaries allows your end user to verify that these are genuine and have not been modified by another untrusted entity.

## [Signing for AppImages](#signing-for-appimages)

[Section titled “Signing for AppImages”](#signing-for-appimages)

The AppImage can be signed using either gpg or gpg2.

### [Prerequisites](#prerequisites)

[Section titled “Prerequisites”](#prerequisites)

A key for signing must be prepared. A new one can be generated using:

Terminal window
[code]
    gpg2 --full-gen-key
[/code]

Please refer to the gpg or gpg2 documentation for additional information. You should take additional care to back up your private and public keys in a secure location.

### [Signing](#signing)

[Section titled “Signing”](#signing)

You can embed a signature in the AppImage by setting the following environment variables:

  * **SIGN** : set to `1` to sign the AppImage.
  * **SIGN_KEY** : optional variable to use a specific GPG Key ID for signing.
  * **APPIMAGETOOL_SIGN_PASSPHRASE** : the signing key password. If unset, gpg shows a dialog so you can input it. You must set this when building in CI/CD platforms.
  * **APPIMAGETOOL_FORCE_SIGN** : by default the AppImage is generated even if signing fails. To exit on errors, you can set this variable to `1`.


You can display the signature embedded in the AppImage by running the following command:

Terminal window
[code]
    ./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
[/code]

Note that you need to change the $APPNAME and $VERSION values with the correct ones based on your configuration.

### [Validate the signature](#validate-the-signature)

[Section titled “Validate the signature”](#validate-the-signature)

The AppImage validate tool can be downloaded from [here](https://github.com/AppImageCommunity/AppImageUpdate/releases/tag/continuous). Select one of the `validate-$PLATFORM.AppImage` files.

Run the following command to validate the signature:

Terminal window
[code]
    chmod +x validate-$PLATFORM.AppImage
    
    ./validate-$PLATFORM.AppImage $TAURI_OUTPUT.AppImage
[/code]

If the signature is valid, the output will be:
[code] 
    Validation result: validation successful
    
    Signatures found with key fingerprints: $KEY_ID
    
    ====================
    
    Validator report:
    
    Signature checked for key with fingerprint $KEY_ID:
    
    Validation successful
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/sign/linux](https://v2.tauri.app/distribute/sign/linux)