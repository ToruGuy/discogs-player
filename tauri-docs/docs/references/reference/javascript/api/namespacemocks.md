# mocks

## [Interfaces](#interfaces)

[Section titled “Interfaces”](#interfaces)

### [MockIPCOptions](#mockipcoptions)

[Section titled “MockIPCOptions”](#mockipcoptions)

Options for `mockIPC`.

# [Options](#options)

[Section titled “Options”](#options)

`shouldMockEvents`: If true, the `listen` and `emit` functions will be mocked, allowing you to test event handling without a real backend. **This will consume any events emitted with the`plugin:event` prefix.**

#### [Since](#since)

[Section titled “Since”](#since)

2.7.0

#### [Properties](#properties)

[Section titled “Properties”](#properties)

Property| Type| Defined in  
---|---|---  
`shouldMockEvents?`| `boolean`| **Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/mocks.ts#L24>  
  
## [Functions](#functions)

[Section titled “Functions”](#functions)

### [clearMocks()](#clearmocks)

[Section titled “clearMocks()”](#clearmocks)
[code] 
    function clearMocks(): void
[/code]

Clears mocked functions/data injected by the other functions in this module. When using a test runner that doesn’t provide a fresh window object for each test, calling this function will reset tauri specific properties.

# [Example](#example)

[Section titled “Example”](#example)
[code] 
    import { mockWindows, clearMocks } from "@tauri-apps/api/mocks"
    
    
    
    
    afterEach(() => {
    
       clearMocks()
    
    })
    
    
    
    
    test("mocked windows", () => {
    
       mockWindows("main", "second", "third");
    
    
    
    
       expect(window.__TAURI_INTERNALS__).toHaveProperty("metadata")
    
    })
    
    
    
    
    test("no mocked windows", () => {
    
       expect(window.__TAURI_INTERNALS__).not.toHaveProperty("metadata")
    
    })
[/code]

#### [Returns](#returns)

[Section titled “Returns”](#returns)

`void`

#### [Since](#since-1)

[Section titled “Since”](#since-1)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/mocks.ts#L316>

* * *

### [mockConvertFileSrc()](#mockconvertfilesrc)

[Section titled “mockConvertFileSrc()”](#mockconvertfilesrc)
[code] 
    function mockConvertFileSrc(osName): void
[/code]

Mock `convertFileSrc` function

#### [Parameters](#parameters)

[Section titled “Parameters”](#parameters)

Parameter| Type| Description  
---|---|---  
`osName`| `string`| The operating system to mock, can be one of linux, macos, or windows  
  
#### [Returns](#returns-1)

[Section titled “Returns”](#returns-1)

`void`

#### [Example](#example-1)

[Section titled “Example”](#example-1)
[code] 
    import { mockConvertFileSrc } from "@tauri-apps/api/mocks";
    
    import { convertFileSrc } from "@tauri-apps/api/core";
    
    
    
    
    mockConvertFileSrc("windows")
    
    
    
    
    const url = convertFileSrc("C:\\Users\\user\\file.txt")
[/code]

#### [Since](#since-2)

[Section titled “Since”](#since-2)

1.6.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/mocks.ts#L277>

* * *

### [mockIPC()](#mockipc)

[Section titled “mockIPC()”](#mockipc)
[code] 
    function mockIPC(cb, options?): void
[/code]

Intercepts all IPC requests with the given mock handler.

This function can be used when testing tauri frontend applications or when running the frontend in a Node.js context during static site generation.

# [Examples](#examples)

[Section titled “Examples”](#examples)

Testing setup using Vitest:
[code] 
    import { mockIPC, clearMocks } from "@tauri-apps/api/mocks"
    
    import { invoke } from "@tauri-apps/api/core"
    
    
    
    
    afterEach(() => {
    
       clearMocks()
    
    })
    
    
    
    
    test("mocked command", () => {
    
     mockIPC((cmd, payload) => {
    
      switch (cmd) {
    
        case "add":
    
          return (payload.a as number) + (payload.b as number);
    
        default:
    
          break;
    
        }
    
     });
    
    
    
    
     expect(invoke('add', { a: 12, b: 15 })).resolves.toBe(27);
    
    })
[/code]

The callback function can also return a Promise:
[code] 
    import { mockIPC, clearMocks } from "@tauri-apps/api/mocks"
    
    import { invoke } from "@tauri-apps/api/core"
    
    
    
    
    afterEach(() => {
    
       clearMocks()
    
    })
    
    
    
    
    test("mocked command", () => {
    
     mockIPC((cmd, payload) => {
    
      if(cmd === "get_data") {
    
       return fetch("https://example.com/data.json")
    
         .then((response) => response.json())
    
      }
    
     });
    
    
    
    
     expect(invoke('get_data')).resolves.toBe({ foo: 'bar' });
    
    })
[/code]

`listen` can also be mocked with direct calls to the `emit` function. This functionality is opt-in via the `shouldMockEvents` option:
[code] 
    import { mockIPC, clearMocks } from "@tauri-apps/api/mocks"
    
    import { emit, listen } from "@tauri-apps/api/event"
    
    
    
    
    afterEach(() => {
    
       clearMocks()
    
    })
    
    
    
    
    test("mocked event", () => {
    
     mockIPC(() => {}, { shouldMockEvents: true }); // enable event mocking
    
    
    
    
     const eventHandler = vi.fn();
    
     listen('test-event', eventHandler); // typically in component setup or similar
    
    
    
    
     emit('test-event', { foo: 'bar' });
    
     expect(eventHandler).toHaveBeenCalledWith({
    
       event: 'test-event',
    
       payload: { foo: 'bar' }
    
     });
    
    })
[/code]

`emitTo` is currently **not** supported by this mock implementation.

#### [Parameters](#parameters-1)

[Section titled “Parameters”](#parameters-1)

Parameter| Type  
---|---  
`cb`| (`cmd`, `payload`?) => `unknown`  
`options`?| [`MockIPCOptions`](/reference/javascript/api/namespacemocks/#mockipcoptions)  
  
#### [Returns](#returns-2)

[Section titled “Returns”](#returns-2)

`void`

#### [Since](#since-3)

[Section titled “Since”](#since-3)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/mocks.ts#L104>

* * *

### [mockWindows()](#mockwindows)

[Section titled “mockWindows()”](#mockwindows)
[code] 
    function mockWindows(current, ..._additionalWindows): void
[/code]

Mocks one or many window labels. In non-tauri context it is required to call this function _before_ using the `@tauri-apps/api/window` module.

This function only mocks the _presence_ of windows, window properties (e.g. width and height) can be mocked like regular IPC calls using the `mockIPC` function.

# [Examples](#examples-1)

[Section titled “Examples”](#examples-1)
[code] 
    import { mockWindows } from "@tauri-apps/api/mocks";
    
    import { getCurrentWindow } from "@tauri-apps/api/window";
    
    
    
    
    mockWindows("main", "second", "third");
    
    
    
    
    const win = getCurrentWindow();
    
    
    
    
    win.label // "main"
[/code]
[code] 
    import { mockWindows } from "@tauri-apps/api/mocks";
    
    
    
    
    mockWindows("main", "second", "third");
    
    
    
    
    mockIPC((cmd, args) => {
    
     if (cmd === "plugin:event|emit") {
    
       console.log('emit event', args?.event, args?.payload);
    
     }
    
    });
    
    
    
    
    const { emit } = await import("@tauri-apps/api/event");
    
    await emit('loaded'); // this will cause the mocked IPC handler to log to the console.
[/code]

#### [Parameters](#parameters-2)

[Section titled “Parameters”](#parameters-2)

Parameter| Type| Description  
---|---|---  
`current`| `string`| Label of window this JavaScript context is running in.  
…`_additionalWindows`| `string`[]| -  
  
#### [Returns](#returns-3)

[Section titled “Returns”](#returns-3)

`void`

#### [Since](#since-4)

[Section titled “Since”](#since-4)

1.0.0

**Source** : <https://github.com/tauri-apps/tauri/blob/dev/packages/api/src/mocks.ts#L248>

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/reference/javascript/api/namespacemocks](https://v2.tauri.app/reference/javascript/api/namespacemocks)