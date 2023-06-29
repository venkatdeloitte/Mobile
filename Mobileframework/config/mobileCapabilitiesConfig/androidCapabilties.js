const androidRealDeviceCaps = {

  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME,
  'appium:modelNo': process.env.ANDROID_MODEL_NAME,
  'appium:platformName': 'android',
  'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION,
  'appium:app': process.env.ANDROID_APK_PATH,
  'appium:appVersion': process.env.APP_VERSION,
  'appium:newCommandTimeout': '12000',
  'appium:allowTestPackages': true,
  'appium:autoGrantPermissions': false,
  'appium:appActivity': process.env.ANDROID_APP_ACTIVITY,
  'appium:appPackage': process.env.ANDROID_APP_PACKAGE,
  'appium:noReset': process.env.NO_RESET || false,
  'appium:dontStopAppOnReset': process.env.DONT_STOP_APP_ON_RESET || false,
  maxInstances: 1,

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
androidRealDeviceCaps['cjson:metadata'].device = androidRealDeviceCaps['appium:modelNo'];
androidRealDeviceCaps['cjson:metadata'].app.name = process.env.APP_NAME;
androidRealDeviceCaps['cjson:metadata'].app.version = process.env.APP_VERSION;
androidRealDeviceCaps['cjson:metadata'].platform.name = androidRealDeviceCaps['appium:platformName'];
androidRealDeviceCaps['cjson:metadata'].platform.version = androidRealDeviceCaps['appium:platformVersion'];

module.exports = { androidRealDeviceCaps };
