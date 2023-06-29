/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs-extra');
const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const cucumberJson = require('wdio-cucumberjs-json-reporter').default
const moment = require('moment')
const assert = require('assert');
const sharp = require('sharp');
const { logger } = require('../mobileCapabilitiesConfig/log4js.conf');

let names = [];
let endTime = '';
let screenshotPerScenario = {
  afterStep: false,
  afterScenario: false,
  noScreenshot: false,
};

const DotEnvProperties = require('../../utils/DotEnvProperties');

const dotEnvProperties = new DotEnvProperties();
exports.config = {

  // ------------------------------
  // Custom variables for execution
  // ------------------------------
  // Specify the Platform for execution and whether the device is Real or Simulator/Emulator.

  // platformIs: 'ios',
  // isSimulator: false,
  currentTimeStamp: new Date().getTime(),
  platformIs: dotEnvProperties.platform.toLowerCase(),
  isSimulator: dotEnvProperties.isSimulator,
  specs: dotEnvProperties.specName.split(','),

  // --------------------------
  // Default Testrunner options
  // --------------------------

  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  params: {},
  async: true,
  startTime: moment().format('MMMM DD yyyy hh:mm:ss a').toString(),
  maxInstances: 5,
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: dotEnvProperties.logLevel,
  logOutput: './test/testResults/cucumber-json/',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  count: 0,
  screenshotPath: './test/testResults/errorShots/',

  // Default timeout for all waitFor* commands.
  waitforTimeout: 240000,

  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 240000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  services: ['chromedriver', 'selenium-standalone', 'appium',

  ],
  framework: 'cucumber',

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: ['./test/stepDefinitions/given.js', './test/stepDefinitions/when.js',
      './test/stepDefinitions/then.js'], // <string[]> (file/dir) require files before executing features
    backtrace: true, // <boolean> show full backtrace for errors
    // requireModule: [],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    compiler: [],
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: false, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: true, // <boolean> fail if there are any undefined or pending steps
    tagExpression: dotEnvProperties.tagExpression(),
    // tagExpression: 'not @android', // <string> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 1000 * 120, // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    failAmbiguousDefinitions: true,
    tagsInTitle: true,
    snippetSyntax: undefined,
  },

  reporters: [
    // Like this with the default options, see the options below
    // 'cucumberjs-json',

    // OR like this if you want to set the folder and the language
    ['cucumberjs-json', {
      jsonFolder: './test/testResults/json/',
      language: 'en',
    },
    ],
  ],

  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
  onPrepare: (config) => {
    // Remove the `.tmp/` folder that holds the json and report files
    removeSync('./test/testResults/');
    console.log('Starting Connected Logbook Test');

    // this.config.startTime = moment().format('MMMM,MM ddd hh:mm:ss a').toString();
  },
  /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
  async beforeSession(config, capabilities, specs) {
    // ---------------------------------------
    // Custom global variables for screenshots
    // ---------------------------------------
    global.skipScreenshotForTheStep = false;

    // -------------------------------------
    // Custom global variables for execution
    // -------------------------------------
    global.logger = logger;
    // await getConfig();
    global.elementTimeOut = 240000;
  },
  /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */

  async before(capabilities, specs) {
    // await visualTestConfiguration();
  },
  /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
  beforeCommand(commandName, args) {
  },
  /**
     * Runs before a Cucumber feature
     */
  async beforeFeature(uri, feature) {
    // -----------------------------------------------
  // Custom 'before-feature' variables for execution
  // -----------------------------------------------
    const executionPlatform = this.platformIs.toLowerCase().trim();
    logger.debug(`Platform of execution - ${executionPlatform}`);
    const testName = uri.split('/').pop().split('.')[0];
    logger.info(`Applitools Test feature file name - ${testName}`);
    for (let i = 0; i < feature.children.length; i++) {
      const currentScenario = feature.children[i];
      if (currentScenario.scenario.tags) {
        const scenarioTags = await currentScenario.scenario.tags.map((tag) => tag.name.toLowerCase().replace(/@/g, ''));
        if ((!scenarioTags.includes('android') && !scenarioTags.includes('ios')) || (scenarioTags.includes(executionPlatform))) {
          names.push(currentScenario.scenario.steps.map((text) => text.text.replace(/\s/g, '_')));
        }
      }
    }
    names = names.flat(1);
    logger.debug(`Features to be tested in Applitools - ${names}`);
    await visualTestConfiguration(testName);
    let msg;
    await browser.getWindowSize().then(async (val) => {
      global.wid = val.width;
      global.hgt = val.height;
      if (global.wid > 240 || global.hgt > 520) {
        global.wid = 240;
        global.hgt = 520;
      }
    }).catch((err) => {
      msg = `Fail : Error in getting the element's size and error is ${err}`;
      logger.error(msg);
      assert.fail(msg);
    });
  },
  /**
     * Runs before a Cucumber scenario
     */
  beforeScenario(world, context) {
    const tagsArray = world.pickle.tags.filter((tagsObjectArray) => tagsObjectArray.name.toLowerCase().includes('screenshot')).map((singleTagObject) => singleTagObject.name.toLowerCase());
    if (tagsArray.length > 1) {
      logger.error(`Multiple Screenshot tags are provided - ${tagsArray}; Only the first tag will be considered for execution`);
    }
    const screenshotTagName = tagsArray[0];
    logger.info(`Screenshot chosen for the scenario - ${screenshotTagName}`);
    switch (screenshotTagName) {
      case '@afterscenarioscreenshot': {
        screenshotPerScenario = {
          afterScenario: true,
          afterStep: false,
          noScreenshot: false,
        };
        break;
      }
      case '@noscreenshot': {
        screenshotPerScenario = {
          afterScenario: false,
          afterStep: false,
          noScreenshot: true,
        };
        break;
      }
      default: {
        logger.info('Valid Screenshot tag is not provided; Defaulting to Step Screenshot');
        screenshotPerScenario = {
          afterScenario: false,
          afterStep: true,
          noScreenshot: false,
        };
        break;
      }
    }
  },
  /**
     * Runs before a Cucumber step
     */

  async beforeStep({ uri, feature, step }, context) {
    skipScreenshotForTheStep = false
  },
  /**
     * Runs after a Cucumber step
     */
  async afterStep(uri, feature, {
    error, result, duration, passed,
  }, stepData, context) {
    if (dotEnvProperties.captureScreenshot && screenshotPerScenario.afterStep) {
      await browser.takeScreenshot().then(async (val) => {
        const img = Buffer.from(val, 'base64');
        await sharp(img).resize(global.wid, global.hgt).toBuffer().then(async (data) => {
          const screen = data.toString('base64');
          cucumberJson.attach(screen, 'image/png');
        })
          .catch((error) => {
            logger.info('error in Resize and compression ', error);
          });
      })
        .catch((err) => {
          logger.info('error in take screenshots ', err);
        });
    }
    await checkMobileAppWindow(names[this.count]);
    this.count += 1;
  },
  /**
     * Runs after a Cucumber scenario
     */
  async afterScenario(uri, feature, scenario, result, sourceLocation) {
    if (dotEnvProperties.captureScreenshot && screenshotPerScenario.afterScenario) {
      await browser.takeScreenshot()
        .then(async (val) => {
          const img = Buffer.from(val, 'base64');
          await sharp(img).resize(global.wid, global.hgt).toBuffer()
            .then(async (data) => {
              const screen = data.toString('base64');
              cucumberJson.attach(screen, 'image/png');
            })
            .catch((error) => {
              logger.info('error in Resize and compression ', error);
            });
        })
        .catch((err) => {
          logger.info('error in take screenshots ', err);
        });
    }
  },
  /**
     * Runs after a Cucumber feature
     */
  // afterFeature(uri, feature, scenarios) {
  // },

  /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
  // afterCommand(commandName, args, result, error) {
  // },
  /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
  // async after(result, capabilities, specs) {
  //   await closeTest();
  //   // await afterSauce();
  // },
  // /**
  //    * Gets executed right after terminating the webdriver session.
  //    * @param {Object} config wdio configuration object
  //    * @param {Array.<Object>} capabilities list of capabilities details
  //    * @param {Array.<String>} specs List of spec file paths that ran
  //    */
  // afterSession(config, capabilities, specs) {
  // },
  /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
  onComplete: (exitCode, config, capabilities, results) => {
    // -----------------------------------------------
    // Custom variables for zipping and saving reports
    // -----------------------------------------------
    let filePath;
    const path = config.specs[0];
    const extension = '~/Reports'
    let destPath;

    // Generate the report when all tests are done
    endTime = moment().format('MMMM,Do ddd hh:mm:ss a').toString();

    // ---------------------------------------
    // Multiple-cucumber-html-reporter options
    // ---------------------------------------
    generate({
      // Required
      // This part needs to be the same path where you store the JSON files
      // default = '.tmp/json/'
      theme: 'bootstrap',
      jsonDir: './test/testResults/json/',
      reportPath: `./test/testResults/${dotEnvProperties.featureFileName()}/`,
      // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
      openReportInBrowser: true,
      disableLog: false,
      displayDuration: true,
      saveCollectedJSON: true,
      reportName: '<div style="font:bold 2.2rem Helvetica Neue;color: #074848;">Report</div>',
      pageTitle: dotEnvProperties.appName,
      customData: {
        title: 'Run info',
        data: [
          { label: 'Project', value: dotEnvProperties.appName },
          { label: 'Release', value: dotEnvProperties.releaseVersion },
          { label: 'Execution Start Time', value: this.config.startTime },
          { label: 'Execution End Time', value: endTime },
        ],
      },

      // ... other options, see Options

    });

    const renameTestResultsDirectory = () => {
      try {
        const testResultsDirBasePath = `${process.cwd()}/test/testResults`;
        const jsonDirPath = `${testResultsDirBasePath}/json`;
        const reportsDirPath = `${testResultsDirBasePath}/${dotEnvProperties.featureFileName()}`;
        const featureHtmlDirPath = `${testResultsDirBasePath}/${dotEnvProperties.featureFileName()}/features`;
        // Deletes the JSON Folder
        fs.removeSync(jsonDirPath);
        logger.debug('Deleted JSON Folder from Test Results');
        // Fetches the HTML file name
        const featureHtmlFileName = fs.readdirSync(featureHtmlDirPath);
        // Updates the name to Feature file Name
        const fileNameToUpdate = 'execution.html';
        fs.renameSync(`${featureHtmlDirPath}/${featureHtmlFileName}`, `${featureHtmlDirPath}/${fileNameToUpdate}`);
        // // Reads the index.html file
        const htmlString = fs.readFileSync(`${reportsDirPath}/index.html`, { encoding: 'utf-8', flag: 'r' });
        const testing = htmlString.replace(featureHtmlFileName[0], fileNameToUpdate);
        fs.writeFileSync(`${reportsDirPath}/index.html`, testing, { encoding: 'utf-8', flag: 'w' });
      } catch (error) {
        logger.fatal(`Failed in renaming the Test Results folder - ${error}`);
        throw new Error(error);
      }
    };
    renameTestResultsDirectory();
  },
  /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
  // onReload: function(oldSessionId, newSessionId) {
  // }

}
