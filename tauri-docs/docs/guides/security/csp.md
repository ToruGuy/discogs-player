# Content Security Policy (CSP)

Tauri restricts the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) of your HTML pages. This can be used to reduce or prevent impact of common web based vulnerabilities like cross-site-scripting (XSS).

Local scripts are hashed, styles and external scripts are referenced using a cryptographic nonce, which prevents unallowed content from being loaded.

The CSP protection is only enabled if set on the Tauri configuration file. You should make it as restricted as possible, only allowing the webview to load assets from hosts you trust, and preferably own. At compile time, Tauri appends its nonces and hashes to the relevant CSP attributes automatically to bundled code and assets, so you only need to worry about what is unique to your application.

This is an example CSP configuration taken from the [`api`](https://github.com/tauri-apps/tauri/blob/dev/examples/api/src-tauri/tauri.conf.json#L22) example of Tauri, but every application developer needs to tailor this to their own application needs.

tauri/examples/api/src-tauri/tauri.conf.json
[code]
      "csp": {
    
            "default-src": "'self' customprotocol: asset:",
    
            "connect-src": "ipc: http://ipc.localhost",
    
            "font-src": ["https://fonts.gstatic.com"],
    
            "img-src": "'self' asset: http://asset.localhost blob: data:",
    
            "style-src": "'unsafe-inline' 'self' https://fonts.googleapis.com"
    
          },
[/code]

See [`script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src), [`style-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) and [CSP Sources](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources#sources) for more information about this protection.

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/security/csp](https://v2.tauri.app/security/csp)