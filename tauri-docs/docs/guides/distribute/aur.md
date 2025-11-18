# AUR

# [Publishing To The Arch User Repository](#publishing-to-the-arch-user-repository)

[Section titled “Publishing To The Arch User Repository”](#publishing-to-the-arch-user-repository)

## [Setup](#setup)

[Section titled “Setup”](#setup)

First go to `https://aur.archlinux.org` and make an account. Be sure to add the proper ssh keys. Next, clone an empty git repository using this command.

Terminal window
[code]
    git clone https://aur.archlinux.org/your-repo-name
[/code]

After completing the steps above, create a file with the name `PKGBUILD`. Once the file is created you can move onto the next step.

### [Writing a PKGBUILD file](#writing-a-pkgbuild-file)

[Section titled “Writing a PKGBUILD file”](#writing-a-pkgbuild-file)

PKGBUILD
[code]
    pkgname=<pkgname>
    
    pkgver=1.0.0
    
    pkgrel=1
    
    pkgdesc="Description of your app"
    
    arch=('x86_64' 'aarch64')
    
    url="https://github.com/<user>/<project>"
    
    license=('MIT')
    
    depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme' 'libsoup' 'pango' 'webkit2gtk-4.1')
    
    options=('!strip' '!emptydirs')
    
    install=${pkgname}.install
    
    source_x86_64=("${url}/releases/download/v${pkgver}/appname_${pkgver}_amd64.deb")
    
    source_aarch64=("${url}/releases/download/v${pkgver}/appname_"${pkgver}_arm64.deb")
[/code]

  * At the top of the file, define your package name and assign it the variable `pkgname`.
  * Set your `pkgver` variable. Typically it is best to use this variable in the source variable to increase maintainability.
  * The `pkgdesc` variable on your aur repo’s page and tells vistors what your app does.
  * The `arch` variable controls what architectures can install your package.
  * The `url` variable, while not required, helps to make your package appear more professional.
  * The `install` variable specifies the name of .install script which will be run when the package is installed, removed or upgraded.
  * The `depends` variable includes a list of items that are required to make your app run. For any Tauri app you must include all of the dependencies shown above.
  * The `source` variable is required and defines the location where your upstream package is. You can make a `source` architecture specific by adding the architecture to the end of the variable name.


### [Generating `.SRCINFO`](#generating-srcinfo)

[Section titled “Generating .SRCINFO”](#generating-srcinfo)

In order to push your repo to the aur you must generate an `.SRCINFO` file. This can be done with this command.

Terminal window
[code]
    makepkg --printsrcinfo > .SRCINFO
[/code]

### [Testing](#testing)

[Section titled “Testing”](#testing)

Testing the app is extremely simple. All you have to do is run `makepkg` within the same directory as the `PKGBUILD` file and see if it works

### [Publishing](#publishing)

[Section titled “Publishing”](#publishing)

Finally, after the testing phase is over, you can publish the application to AUR (Arch User Repository) with these commands.

Terminal window
[code]
    git add .
    
    
    
    
    git commit -m "Initial Commit"
    
    
    
    
    git push
[/code]

If all goes well, your repository should now appear on the AUR website.

## [Examples](#examples)

[Section titled “Examples”](#examples)

### [Extracting From A Debian Package](#extracting-from-a-debian-package)

[Section titled “Extracting From A Debian Package”](#extracting-from-a-debian-package)

PKGBUILD
[code]
    # Maintainer:
    
    # Contributor:
    
    pkgname=<pkgname>
    
    pkgver=1.0.0
    
    pkgrel=1
    
    pkgdesc="Description of your app"
    
    arch=('x86_64' 'aarch64')
    
    url="https://github.com/<user>/<project>"
    
    license=('MIT')
    
    depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme' 'libsoup' 'pango' 'webkit2gtk-4.1')
    
    options=('!strip' '!debug')
    
    install=${pkgname}.install
    
    source_x86_64=("${url}/releases/download/v${pkgver}/appname_${pkgver}_amd64.deb")
    
    source_aarch64=("${url}/releases/download/v${pkgver}/appname_${pkgver}_arm64.deb")
    
    sha256sums_x86_64=('ca85f11732765bed78f93f55397b4b4cbb76685088553dad612c5062e3ec651f')
    
    sha256sums_aarch64=('ed2dc3169d34d91188fb55d39867713856dd02a2360ffe0661cb2e19bd701c3c')
    
    package() {
    
      # Extract package data
    
      tar -xvf data.tar.gz -C "${pkgdir}"
    
    
    
    
    }
[/code]

my-tauri-app.install
[code]
    post_install() {
    
      gtk-update-icon-cache -q -t -f usr/share/icons/hicolor
    
      update-desktop-database -q
    
    }
    
    
    
    
    post_upgrade() {
    
      post_install
    
    }
    
    
    
    
    post_remove() {
    
      gtk-update-icon-cache -q -t -f usr/share/icons/hicolor
    
      update-desktop-database -q
    
    }
[/code]

### [Building from source](#building-from-source)

[Section titled “Building from source”](#building-from-source)

PKGBUILD
[code]
    # Maintainer:
    
    pkgname=<pkgname>-git
    
    pkgver=<pkgver>
    
    pkgrel=1
    
    pkgdesc="Description of your app"
    
    arch=('x86_64' 'aarch64')
    
    url="https://github.com/<user>/<project>"
    
    license=('MIT')
    
    depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme' 'libsoup' 'pango' 'webkit2gtk-4.1')
    
    makedepends=('git' 'openssl' 'appmenu-gtk-module' 'libappindicator-gtk3' 'librsvg' 'cargo' 'pnpm' 'nodejs')
    
    provides=('<pkgname>')
    
    conflicts=('<binname>' '<pkgname>')
    
    source=("git+${url}.git")
    
    sha256sums=('SKIP')
    
    
    
    
    pkgver() {
    
      cd <project>
    
      ( set -o pipefail
    
        git describe --long --abbrev=7 2>/dev/null | sed 's/\([^-]*-g\)/r\1/;s/-/./g' ||
    
        printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short=7 HEAD)"
    
      )
    
    }
    
    
    
    
    prepare() {
    
      cd <project>
    
      pnpm install
    
    }
    
    
    
    
    build() {
    
      cd <project>
    
      pnpm tauri build -b deb
    
    }
    
    
    
    
    package() {
    
      cp -a <project>/src-tauri/target/release/bundle/deb/<project>_${pkgver}_*/data/* "${pkgdir}"
    
    }
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/distribute/aur](https://v2.tauri.app/distribute/aur)