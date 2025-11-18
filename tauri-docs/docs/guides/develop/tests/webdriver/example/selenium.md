# Selenium

This WebDriver testing example will use [Selenium](https://selenium.dev/) and a popular Node.js testing suite. You are expected to already have Node.js installed, along with `npm` or `yarn` although the [finished example project](https://github.com/tauri-apps/webdriver-example) uses `pnpm`.

## [Create a Directory for the Tests](#create-a-directory-for-the-tests)

[Section titled “Create a Directory for the Tests”](#create-a-directory-for-the-tests)

Let’s create a space to write these tests in our project. We will be using a nested directory for this example project as we will later also go over other frameworks, but typically you will only need to use one. Create the directory we will use with `mkdir -p e2e-tests`. The rest of this guide will assume you are inside the `e2e-tests` directory.

## [Initializing a Selenium Project](#initializing-a-selenium-project)

[Section titled “Initializing a Selenium Project”](#initializing-a-selenium-project)

We will be using a pre-existing `package.json` to bootstrap this test suite because we have already chosen specific dependencies to use and want to showcase a simple working solution. The bottom of this section has a collapsed guide on how to set it up from scratch.

`package.json`:
[code] 
    {
    
      "name": "selenium",
    
      "version": "1.0.0",
    
      "private": true,
    
      "type": "module",
    
      "scripts": {
    
        "test": "mocha"
    
      },
    
      "dependencies": {
    
        "chai": "^5.2.1",
    
        "mocha": "^11.7.1",
    
        "selenium-webdriver": "^4.34.0"
    
      }
    
    }
[/code]

We have a script that runs [Mocha](https://mochajs.org/) as a test framework exposed as the `test` command. We also have various dependencies that we will be using to run the tests. [Mocha](https://mochajs.org/) as the testing framework, [Chai](https://www.chaijs.com/) as the assertion library, and [`selenium-webdriver`](https://www.npmjs.com/package/selenium-webdriver) which is the Node.js [Selenium](https://selenium.dev/) package.

Click me if you want to see how to set a project up from scratch

If you want to install the dependencies from scratch, just run the following command.

  * [ npm ](#tab-panel-3347)
  * [ yarn ](#tab-panel-3348)


[code] 
    npm install mocha chai selenium-webdriver
[/code]
[code] 
    yarn add mocha chai selenium-webdriver
[/code]

I suggest also adding a `"test": "mocha"` item in the `package.json` `"scripts"` key so that running Mocha can be called simply with

  * [ npm ](#tab-panel-3349)
  * [ yarn ](#tab-panel-3350)


[code] 
    npm test
[/code]
[code] 
    yarn test
[/code]

## [Testing](#testing)

[Section titled “Testing”](#testing)

Unlike the [WebdriverIO Test Suite](/develop/tests/webdriver/example/webdriverio/#config), Selenium does not come out of the box with a Test Suite and leaves it up to the developer to build those out. We chose [Mocha](https://mochajs.org/), which is pretty neutral and not related to WebDrivers, so our script will need to do a bit of work to set up everything for us in the correct order. [Mocha](https://mochajs.org/) expects a testing file at `test/test.js` by default, so let’s create that file now.

`test/test.js`:
[code] 
    import os from 'os';
    
    import path from 'path';
    
    import { expect } from 'chai';
    
    import { spawn, spawnSync } from 'child_process';
    
    import { Builder, By, Capabilities } from 'selenium-webdriver';
    
    import { fileURLToPath } from 'url';
    
    
    
    
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    
    
    
    
    // create the path to the expected application binary
    
    const application = path.resolve(
    
      __dirname,
    
      '..',
    
      '..',
    
      'src-tauri',
    
      'target',
    
      'debug',
    
      'tauri-app'
    
    );
    
    
    
    
    // keep track of the webdriver instance we create
    
    let driver;
    
    
    
    
    // keep track of the tauri-driver process we start
    
    let tauriDriver;
    
    let exit = false;
    
    
    
    
    before(async function () {
    
      // set timeout to 2 minutes to allow the program to build if it needs to
    
      this.timeout(120000);
    
    
    
    
      // ensure the app has been built
    
      spawnSync('yarn', ['tauri', 'build', '--debug', '--no-bundle'], {
    
        cwd: path.resolve(__dirname, '../..'),
    
        stdio: 'inherit',
    
        shell: true,
    
      });
    
    
    
    
      // start tauri-driver
    
      tauriDriver = spawn(
    
        path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
    
        [],
    
        { stdio: [null, process.stdout, process.stderr] }
    
      );
    
      tauriDriver.on('error', (error) => {
    
        console.error('tauri-driver error:', error);
    
        process.exit(1);
    
      });
    
      tauriDriver.on('exit', (code) => {
    
        if (!exit) {
    
          console.error('tauri-driver exited with code:', code);
    
          process.exit(1);
    
        }
    
      });
    
    
    
    
      const capabilities = new Capabilities();
    
      capabilities.set('tauri:options', { application });
    
      capabilities.setBrowserName('wry');
    
    
    
    
      // start the webdriver client
    
      driver = await new Builder()
    
        .withCapabilities(capabilities)
    
        .usingServer('http://127.0.0.1:4444/')
    
        .build();
    
    });
    
    
    
    
    after(async function () {
    
      // stop the webdriver session
    
      await closeTauriDriver();
    
    });
    
    
    
    
    describe('Hello Tauri', () => {
    
      it('should be cordial', async () => {
    
        const text = await driver.findElement(By.css('body > h1')).getText();
    
        expect(text).to.match(/^[hH]ello/);
    
      });
    
    
    
    
      it('should be excited', async () => {
    
        const text = await driver.findElement(By.css('body > h1')).getText();
    
        expect(text).to.match(/!$/);
    
      });
    
    
    
    
      it('should be easy on the eyes', async () => {
    
        // selenium returns color css values as rgb(r, g, b)
    
        const text = await driver
    
          .findElement(By.css('body'))
    
          .getCssValue('background-color');
    
    
    
    
        const rgb = text.match(/^rgb\((?<r>\d+), (?<g>\d+), (?<b>\d+)\)$/).groups;
    
        expect(rgb).to.have.all.keys('r', 'g', 'b');
    
    
    
    
        const luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    
        expect(luma).to.be.lessThan(100);
    
      });
    
    });
    
    
    
    
    async function closeTauriDriver() {
    
      exit = true;
    
      // kill the tauri-driver process
    
      tauriDriver.kill();
    
      // stop the webdriver session
    
      await driver.quit();
    
    }
    
    
    
    
    function onShutdown(fn) {
    
      const cleanup = () => {
    
        try {
    
          fn();
    
        } finally {
    
          process.exit();
    
        }
    
      };
    
    
    
    
      process.on('exit', cleanup);
    
      process.on('SIGINT', cleanup);
    
      process.on('SIGTERM', cleanup);
    
      process.on('SIGHUP', cleanup);
    
      process.on('SIGBREAK', cleanup);
    
    }
    
    
    
    
    onShutdown(() => {
    
      closeTauriDriver();
    
    });
[/code]

If you are familiar with JS testing frameworks, `describe`, `it`, and `expect` should look familiar. We also have semi-complex `before()` and `after()` callbacks to set up and teardown mocha. Lines that are not the tests themselves have comments explaining the setup and teardown code. If you were familiar with the Spec file from the [WebdriverIO example](/develop/tests/webdriver/example/webdriverio/#spec), you notice a lot more code that isn’t tests, as we have to set up a few more WebDriver related items.

## [Running the Test Suite](#running-the-test-suite)

[Section titled “Running the Test Suite”](#running-the-test-suite)

Now that we are all set up with our dependencies and our test script, let’s run it!

  * [ npm ](#tab-panel-3351)
  * [ yarn ](#tab-panel-3352)


[code] 
    npm test
[/code]
[code] 
    yarn test
[/code]

We should see output the following output:
[code] 
    ➜  selenium git:(main) ✗ yarn test
    
    yarn run v1.22.11
    
    $ Mocha
    
    
    
    
    
    
    
      Hello Tauri
    
        ✔ should be cordial (120ms)
    
        ✔ should be excited
    
        ✔ should be easy on the eyes
    
    
    
    
    
    
    
      3 passing (588ms)
    
    
    
    
    Done in 0.93s.
[/code]

We can see that our `Hello Tauri` test suite we created with `describe` had all 3 items we created with `it` pass their tests!

With [Selenium](https://selenium.dev/) and some hooking up to a test suite, we just enabled e2e testing without modifying our Tauri application at all!

* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/develop/tests/webdriver/example/selenium](https://v2.tauri.app/develop/tests/webdriver/example/selenium)