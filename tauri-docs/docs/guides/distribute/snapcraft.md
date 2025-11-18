# Snapcraft

## [Prerequisites](#prerequisites)

[Section titled “Prerequisites”](#prerequisites)

**1\. Install`snap`**

  * [ Debian ](#tab-panel-816)
  * [ Arch ](#tab-panel-817)
  * [ Fedora ](#tab-panel-818)


Terminal window
[code]
    sudo apt install snapd
[/code]

Terminal window
[code]
    sudo pacman -S --needed git base-devel
    
    git clone https://aur.archlinux.org/snapd.git
    
    cd snapd
    
    makepkg -si
    
    sudo systemctl enable --now snapd.socket
    
    sudo systemctl start snapd.socket
    
    sudo systemctl enable --now snapd.apparmor.service
[/code]

Terminal window
[code]
    sudo dnf install snapd
    
    # Enable classic snap support
    
    sudo ln -s /var/lib/snapd/snap /snap
[/code]

Reboot your system afterwards.

**2\. Install a base snap**

Terminal window
[code]
    sudo snap install core22
[/code]

**3\. Install`snapcraft`**

Terminal window
[code]
    sudo snap install snapcraft --classic
[/code]

## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

  1. Create an UbuntuOne account.
  2. Go to the [Snapcraft](https://snapcraft.io) website and register an App name.
  3. Create a snapcraft.yaml file in your projects root.
  4. Adjust the names in the snapcraft.yaml file.


[code] 
    name: appname
    
    base: core22
    
    version: '0.1.0'
    
    summary: Your summary # 79 char long summary
    
    description: |
    
      Your description
    
    
    
    
    grade: stable
    
    confinement: strict
    
    
    
    
    layout:
    
      /usr/lib/$SNAPCRAFT_ARCH_TRIPLET/webkit2gtk-4.1:
    
        bind: $SNAP/usr/lib/$SNAPCRAFT_ARCH_TRIPLET/webkit2gtk-4.1
    
    
    
    
    apps:
    
      appname:
    
        command: usr/bin/appname
    
        desktop: usr/share/applications/appname.desktop
    
        extensions: [gnome]
    
        #plugs:
    
        #  - network
    
        # Add whatever plugs you need here, see https://snapcraft.io/docs/snapcraft-interfaces for more info.
    
        # The gnome extension already includes [ desktop, desktop-legacy, gsettings, opengl, wayland, x11, mount-observe, calendar-service ]
    
        #  - single-instance-plug # add this if you're using the single-instance plugin
    
        #slots:
    
        # Add the slots you need to expose to other snaps
    
        #  - single-instance-plug # add this if you're using the single-instance plugin
    
    
    
    
    # Add these lines only if you're using the single-instance plugin
    
    # Check https://v2.tauri.app/plugin/single-instance/ for details
    
    #slots:
    
    #  single-instance:
    
    #    interface: dbus
    
    #    bus: session
    
    #    name: org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID with "_" instead of "." and "-"
    
    #
    
    #plugs:
    
    #  single-instance-plug:
    
    #    interface: dbus
    
    #    bus: session
    
    #    name: org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID with "_" instead of "." and "-"
    
    
    
    
    package-repositories:
    
      - type: apt
    
        components: [main]
    
        suites: [noble]
    
        key-id: 78E1918602959B9C59103100F1831DDAFC42E99D
    
        url: http://ppa.launchpad.net/snappy-dev/snapcraft-daily/ubuntu
    
    
    
    
    parts:
    
      build-app:
    
        plugin: dump
    
        build-snaps:
    
          - node/20/stable
    
          - rustup/latest/stable
    
        build-packages:
    
          - libwebkit2gtk-4.1-dev
    
          - build-essential
    
          - curl
    
          - wget
    
          - file
    
          - libxdo-dev
    
          - libssl-dev
    
          - libayatana-appindicator3-dev
    
          - librsvg2-dev
    
          - dpkg
    
        stage-packages:
    
          - libwebkit2gtk-4.1-0
    
          - libayatana-appindicator3-1
    
        source: .
    
        override-build: |
    
          set -eu
    
          npm install
    
          npm run tauri build -- --bundles deb
    
          dpkg -x src-tauri/target/release/bundle/deb/*.deb $SNAPCRAFT_PART_INSTALL/
    
          sed -i -e "s|Icon=appname|Icon=/usr/share/icons/hicolor/32x32/apps/appname.png|g" $SNAPCRAFT_PART_INSTALL/usr/share/applications/appname.desktop
[/code]

### [Explanation](#explanation)

[Section titled “Explanation”](#explanation)

  * The `name` variable defines the name of your app and is required to be set to the name that you have registered earlier.
  * The `base` variable defines which core you are using.
  * The `version` variable defines the version, and should be updated with each change to the source repository.
  * The `apps` section allows you to expose the desktop and binary files to allow the user to run your app.
  * The `package-repositories` section allows you to add a package repository to help you satisfy your dependencies.
  * `build-packages`/`build-snaps` defines the build dependencies for your snap.
  * `stage-packages`/`stage-snaps` defines the runtime dependencies for your snap.
  * The `override-build` section runs a series of commands after the sources were pulled.


## [Building](#building)

[Section titled “Building”](#building)

Terminal window
[code]
    sudo snapcraft
[/code]

## [Testing](#testing)

[Section titled “Testing”](#testing)

Terminal window
[code]
    snap run your-app
[/code]

## [Releasing Manually](#releasing-manually)

[Section titled “Releasing Manually”](#releasing-manually)

Terminal window
[code]
    snapcraft login # Login with your UbuntuOne credentials
    
    snapcraft upload --release=stable mysnap_latest_amd64.snap
[/code]

## [Building automatically](#building-automatically)

[Section titled “Building automatically”](#building-automatically)

  1. On your apps developer page click on the `builds` tab.
  2. Click `login with github`.
  3. Enter in your repository’s details.


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/snapcraft](https://v2.tauri.app/distribute/snapcraft)