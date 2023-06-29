// this file conyains ios device capabilities

const iosRealDeviceCaps = {
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME,
  'appium:platformName': 'iOS',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION,
  'appium:udid': process.env.IOS_UDID,
  'appium:app': process.env.IOS_IPA_PATH,
  'appium:wdaLocalPort': 8100,
  'appium:noReset': process.env.NO_RESET || false,
  'appium:newCommandTimeout': 120000,
  'appium:bundleId': process.env.IOS_BUNDLE_ID,
  'appium:xcodeSigningId': process.env.IOS_XCODE_SIGNING_ID,
  'appium:xcodeOrgId': process.env.IOS_SCODE_ORG_ID,
  'appium:updatedWDABundleId': process.env.IOS_UPDATED_WDA_BUNDLE_ID,
  'appium:dontStopAppOnReset': process.env.DONT_STOP_APP_ON_RESET || false,
  'appium:derivedDataPath': process.env.IOS_DERVIVED_DATA_PATH,
  'appium:usePrebuiltWDA': process.env.IOS_USE_PREBUILT_WDA || false,
  'cjson:metadata': {
    app: {
      name: '',
      version: '',
    },
    device: '',
    platform: {
      name: '',
      version: '',
    },
  },
};

iosRealDeviceCaps['cjson:metadata'].device = iosRealDeviceCaps['appium:deviceName'];
iosRealDeviceCaps['cjson:metadata'].app.name = process.env.APP_NAME;
iosRealDeviceCaps['cjson:metadata'].app.version = process.env.APP_VERSION;
iosRealDeviceCaps['cjson:metadata'].platform.name = iosRealDeviceCaps['appium:platformName'];
iosRealDeviceCaps['cjson:metadata'].platform.version = iosRealDeviceCaps['appium:platformVersion'];

module.exports = { iosRealDeviceCaps };
