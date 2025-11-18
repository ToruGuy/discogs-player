# Runtime Authority

The runtime authority is part of the Tauri Core. It holds all permissions, capabilities and scopes at runtime to enforce which window can access which command and passes scopes to commands.

Whenever a Tauri command is invoked from the webview the runtime authority receives the invoke request, makes sure that the origin is allowed to actually use the requested command, checks if the origin is part of capabilities and if scopes are defined for the command and applicable then they are injected into the invoke request, which is then passed to the proper Tauri command.

If the origin is not allowed to call the command, the runtime authority will deny the request and the Tauri command is never invoked.

![IPC Diagram](/_astro/runtime-authority.97JqQbdT_2vKIw0.svg)

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/security/runtime-authority](https://v2.tauri.app/security/runtime-authority)