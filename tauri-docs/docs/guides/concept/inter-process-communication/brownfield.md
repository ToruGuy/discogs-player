# Brownfield Pattern

_**This is the default pattern.**_

This is the simplest and most straightforward pattern to use Tauri with, because it tries to be as compatible as possible with existing frontend projects. In short, it tries to require nothing additional to what an existing web frontend might use inside a browser. Not _**everything**_ that works in existing browser applications will work out-of-the-box.

If you are unfamiliar with Brownfield software development in general, the [Brownfield Wikipedia article](https://en.wikipedia.org/wiki/Brownfield_\(software_development\)) provides a nice summary. For Tauri, the existing software is current browser support and behavior, instead of legacy systems.

## [Configuration](#configuration)

[Section titled “Configuration”](#configuration)

Because the Brownfield pattern is the default pattern, it doesn’t require a configuration option to be set. To explicitly set it, you can use the `app > security > pattern` object in the `tauri.conf.json` configuration file.
[code] 
    {
    
      "app": {
    
        "security": {
    
          "pattern": {
    
            "use": "brownfield"
    
          }
    
        }
    
      }
    
    }
[/code]

_**There are no additional configuration options for the brownfield pattern.**_

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/concept/inter-process-communication/brownfield](https://v2.tauri.app/concept/inter-process-communication/brownfield)