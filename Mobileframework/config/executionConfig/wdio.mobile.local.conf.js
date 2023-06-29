const config = require('./wdio.conf').config;
const iosRealDeviceCaps = require('../mobileCapabilitiesConfig/iosRealDeviceCapabilites').iosRealDeviceCaps
// const iosSimulatorCaps = require('../mobileCapabilitiesConfig/iosSimulatorCapabilities').iosSimulatorCaps
const androidCaps = require('../mobileCapabilitiesConfig/androidCapabilties').androidRealDeviceCaps

const executionTarget = config.platformIs;
const isSimulator = config.isSimulator;

let caps = {
  deviceName: '',
  platformVersion: '',
  platformName: '',
  automationName: '',
  app: '',
  bundleId: '',
  udid: '',
  browserName: '',
  fullReset: '',
  newCommandTimeout: '',
  allowTestPackages: '',
  autoGrantPermissions: '',
  appActivity: '',
  appPackage: '',
  noReset: '',
  xcodeSigningId: '',
  xcodeOrgId: '',
  updatedWDABundleId: '',
  maxInstances: '',

}

if (executionTarget.includes('android')) {
  caps = androidCaps;
} else if (executionTarget.includes('ios') && (isSimulator === false)) {
  caps = iosRealDeviceCaps;
} else if (executionTarget.includes('ios') && (isSimulator === true)) {
  caps = iosSimulatorCaps;
}

const capsValues = [];

capsValues[0] = caps;

config.capabilities = capsValues;

config.capabilities = capsValues;
config.services = [];
config.address = '0.0.0.0';
config.port = 4723;
config.path = '/wd/hub';

// config.services = ['selenium-standalone', 'appium'];
// config.appium = {
//   args: {
//     address: '0.0.0.0',
//     commandTimeout: '120000',
//     sessionOverride: true,
//     debugLogSpacing: true,

//   },
// };
// config.port = 4723;

exports.config = config;
