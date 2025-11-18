# Debug in Neovim

There are many different plugins that can be used to debug Rust code in Neovim. This guide will show you how to set up `nvim-dap` and some additional plugins to debug Tauri application.

### [Prerequisites](#prerequisites)

[Section titled “Prerequisites”](#prerequisites)

`nvim-dap` extension requires `codelldb` binary. Download the version for your system from <https://github.com/vadimcn/codelldb/releases> and unzip it. We will point to it later in the `nvim-dap` configuration.

### [Configuring nvim-dap](#configuring-nvim-dap)

[Section titled “Configuring nvim-dap”](#configuring-nvim-dap)

Install [`nvim-dap`](https://github.com/mfussenegger/nvim-dap) and [`nvim-dap-ui`](https://github.com/rcarriga/nvim-dap-ui) plugins. Follow the instructions provided on their github pages or simply use your favourite plugin manager. Note that `nvim-dap-ui` requires `nvim-nio` plugin.

Next, setup the plugin in your Neovim configuration:

init.lua
[code]
    local dap = require("dap")
    
    
    
    
    dap.adapters.codelldb = {
    
      type = 'server',
    
      port = "${port}",
    
      executable = {
    
        -- Change this to your path!
    
        command = '/opt/codelldb/adapter/codelldb',
    
        args = {"--port", "${port}"},
    
      }
    
    }
    
    
    
    
    dap.configurations.rust= {
    
      {
    
        name = "Launch file",
    
        type = "codelldb",
    
        request = "launch",
    
        program = function()
    
          return vim.fn.input('Path to executable: ', vim.fn.getcwd() .. '/target/debug/', 'file')
    
        end,
    
        cwd = '${workspaceFolder}',
    
        stopOnEntry = false
    
      },
    
    }
[/code]

This setup will ask you to point to the Tauri App binary you want to debug each time you lanuch the debugger.

Optionally, you can setup `nvim-dap-ui` plugin to toggle debugger view automatically each time debugging session starts and stops:

init.lua
[code]
    local dapui = require("dapui")
    
    dapui.setup()
    
    
    
    
    dap.listeners.before.attach.dapui_config = function()
    
      dapui.open()
    
    end
    
    dap.listeners.before.launch.dapui_config = function()
    
      dapui.open()
    
    end
    
    dap.listeners.before.event_terminated.dapui_config = function()
    
      dapui.close()
    
    end
    
    dap.listeners.before.event_exited.dapui_config = function()
    
      dapui.close()
    
    end
[/code]

Lastly, you can change the default way the breakpoints are displayed in the editor:

init.lua
[code]
    vim.fn.sign_define('DapBreakpoint',{ text ='🟥', texthl ='', linehl ='', numhl =''})
    
    vim.fn.sign_define('DapStopped',{ text ='▶️', texthl ='', linehl ='', numhl =''})
[/code]

### [Starting the dev server](#starting-the-dev-server)

[Section titled “Starting the dev server”](#starting-the-dev-server)

Since we’re not using Tauri CLI to launch the app the development server will not start automatically. To control the state of development server from Neovim you can use the [overseer](https://github.com/stevearc/overseer.nvim/tree/master) plugin.

Best way to control tasks running in background is to use [VS Code style task](https://github.com/stevearc/overseer.nvim/blob/master/doc/guides.md#vs-code-tasks) configuration. To do this create a `.vscode/tasks.json` file in the projects directory.

You can find example task configuration for project using `trunk` below.

.vscode/tasks.json
[code]
    {
    
      "version": "2.0.0",
    
      "tasks": [
    
        {
    
          "type": "process",
    
          "label": "dev server",
    
          "command": "trunk",
    
          "args": ["serve"],
    
          "isBackground": true,
    
          "presentation": {
    
            "revealProblems": "onProblem"
    
          },
    
          "problemMatcher": {
    
            "pattern": {
    
              "regexp": "^error:.*",
    
              "file": 1,
    
              "line": 2
    
            },
    
            "background": {
    
              "activeOnStart": false,
    
              "beginsPattern": ".*Rebuilding.*",
    
              "endsPattern": ".*server listening at:.*"
    
            }
    
          }
    
        }
    
      ]
    
    }
[/code]

### [Example key bindings](#example-key-bindings)

[Section titled “Example key bindings”](#example-key-bindings)

Below you can find example key bindings to start and control debugging sessions.

init.lua
[code]
    vim.keymap.set('n', '<F5>', function() dap.continue() end)
    
    vim.keymap.set('n', '<F6>', function() dap.disconnect({ terminateDebuggee = true }) end)
    
    vim.keymap.set('n', '<F10>', function() dap.step_over() end)
    
    vim.keymap.set('n', '<F11>', function() dap.step_into() end)
    
    vim.keymap.set('n', '<F12>', function() dap.step_out() end)
    
    vim.keymap.set('n', '<Leader>b', function() dap.toggle_breakpoint() end)
    
    vim.keymap.set('n', '<Leader>o', function() overseer.toggle() end)
    
    vim.keymap.set('n', '<Leader>R', function() overseer.run_template() end)
[/code]

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/develop/debug/neovim](https://v2.tauri.app/develop/debug/neovim)