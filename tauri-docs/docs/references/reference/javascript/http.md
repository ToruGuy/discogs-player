# @tauri-apps/plugin-http

Make HTTP requests with the Rust backend.

## [Security](#security)

[Section titled “Security”](#security)

This API has a scope configuration that forces you to restrict the URLs that can be accessed using glob patterns.

For instance, this scope configuration only allows making HTTP requests to all subdomains for `tauri.app` except for `https://private.tauri.app`:
[code] 
    {
    
      "permissions": [
    
        {
    
          "identifier": "http:default",
    
          "allow": [{ "url": "https://*.tauri.app" }],
    
          "deny": [{ "url": "https://private.tauri.app" }]
    
        }
    
      ]
    
    }
[/code]

Trying to execute any API with a URL not configured on the scope results in a promise rejection due to denied access.

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [ClientOptions](#clientoptions)

[Section titled “ClientOptions”](#clientoptions)

Options to configure the Rust client used to make fetch requests

#### [Since](#since)

[Section titled “Since”](#since)

2.0.0

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Description| Defined in  
---|---|---|---  
`connectTimeout?`| `number`| Timeout in milliseconds| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L82>  
`danger?`| [`DangerousSettings`](/reference/javascript/http/#dangeroussettings)| Configuration for dangerous settings on the client such as disabling SSL verification.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L90>  
`maxRedirections?`| `number`| Defines the maximum number of redirects the client should follow. If set to 0, no redirects will be followed.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L80>  
`proxy?`| [`Proxy`](/reference/javascript/http/#proxy-1)| Configuration of a proxy that a Client should pass requests to.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L86>  
  
* * *

### [DangerousSettings](#dangeroussettings)

[Section titled “DangerousSettings”](#dangeroussettings)

Configuration for dangerous settings on the client such as disabling SSL verification.

#### [Since](#since-1)

[Section titled “Since”](#since-1)

2.3.0

#### [Properties](#properties-1)

[Section titled “Properties”](#properties-1)

Property| Type| Description| Defined in  
---|---|---|---  
`acceptInvalidCerts?`| `boolean`| Disables SSL verification.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L102>  
`acceptInvalidHostnames?`| `boolean`| Disables hostname verification.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L106>  
  
* * *

### [Proxy](#proxy)

[Section titled “Proxy”](#proxy)

Configuration of a proxy that a Client should pass requests to.

#### [Since](#since-2)

[Section titled “Since”](#since-2)

2.0.0

#### [Properties](#properties-2)

[Section titled “Properties”](#properties-2)

Property| Type| Description| Defined in  
---|---|---|---  
`all?`| `string` | [`ProxyConfig`](/reference/javascript/http/#proxyconfig)| Proxy all traffic to the passed URL.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L40>  
`http?`| `string` | [`ProxyConfig`](/reference/javascript/http/#proxyconfig)| Proxy all HTTP traffic to the passed URL.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L44>  
`https?`| `string` | [`ProxyConfig`](/reference/javascript/http/#proxyconfig)| Proxy all HTTPS traffic to the passed URL.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L48>  
  
* * *

### [ProxyConfig](#proxyconfig)

[Section titled “ProxyConfig”](#proxyconfig)

#### [Properties](#properties-3)

[Section titled “Properties”](#properties-3)

Property| Type| Description| Defined in  
---|---|---|---  
`basicAuth?`| `object`| Set the `Proxy-Authorization` header using Basic auth.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L59>  
`basicAuth.password`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L61>  
`basicAuth.username`| `string`| -| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L60>  
`noProxy?`| `string`| A configuration for filtering out requests that shouldn’t be proxied. Entries are expected to be comma-separated (whitespace between entries is ignored)| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L67>  
`url`| `string`| The URL of the proxy server.| **Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L55>  
  
## [Functions](#functions)

[Section titled “Functions”](#functions)

### [fetch()](#fetch)

[Section titled “fetch()”](#fetch)
[code] 
    function fetch(input, init?): Promise<Response>
[/code]

Fetch a resource from the network. It returns a `Promise` that resolves to the `Response` to that `Request`, whether it is successful or not.

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type  
---|---  
`input`| `string` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) | [`Request`](https://developer.mozilla.org/docs/Web/API/Request)  
`init`?| `RequestInit` & [`ClientOptions`](/reference/javascript/http/#clientoptions)  
  
#### [Returns](#returns)

[Section titled “Returns”](#returns)

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)>

#### [Example](#example)

[Section titled “Example”](#example)
[code] 
    const response = await fetch("http://my.json.host/data.json");
    
    console.log(response.status);  // e.g. 200
    
    console.log(response.statusText); // e.g. "OK"
    
    const jsonData = await response.json();
[/code]

#### [Since](#since-3)

[Section titled “Since”](#since-3)

2.0.0

**Source** : <https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/http/guest-js/index.ts#L125>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/http](https://v2.tauri.app/reference/javascript/http)