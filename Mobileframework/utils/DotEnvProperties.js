// ts-check

const dotenv = require('dotenv');
const fs = require('fs-extra');
const { logger } = require('../config/mobileCapabilitiesConfig/log4js.conf');

module.exports = class DotEnvProperties {
  constructor() {
    dotenv.config();

    // const locale = process.env.LOCALE;

    // Execution Configuration
    this.platform = process.env.PLATFORM;
    this.captureScreenshot = process.env.CAPTURE_SCREENSHOT;
    this.specName = process.env.SPEC_NAME;
    this.logLevel = process.env.LOG_LEVEL;
    // App Details
    this.appName = process.env.APP_NAME;
    this.appBuildNumberiOS = process.env.APP_BUILD_NUMBER_IOS;
    this.appBuildNumberAndroid = process.env.APP_BUILD_NUMBER_ANDROID;
    this.appVersion = process.env.APP_VERSION;
    // this.releaseVersion = process.env.RELEASE_VERSION;
    // Common Appium Configurations for iOS and Android
    this.dontStopAppOnReset = process.env.DONT_STOP_APP_ON_RESET;
    this.noReset = process.env.NO_RESET;
    // ANDROID CAPABILITIES
    this.androidModelName = process.env.ANDROID_MODEL_NAME;
    this.androidDeviceName = process.env.ANDROID_DEVICE_NAME;
    this.androidPlatformVersion = process.env.ANDROID_PLATFORM_VERSION;
    this.androidHardwareModel = process.env.ANDROID_HARDWARE_MODEL;
    this.androidApkPath = process.env.ANDROID_APK_PATH;
    this.androidAppActivity = process.env.ANDROID_APP_ACTIVITY;
    this.androidAppPackage = process.env.ANDROID_APP_PACKAGE;
    this.androidUnlockType = process.env.ANDROID_UNLOCK_TYPE;
    this.androidUnlockKey = process.env.ANDROID_UNLOCK_KEY;
    this.androidDeviceModel = process.env.ANDROID_DEVICE_MODEL;
    // IOS REAL DEVICE SIMULATOR COMMON CAPABILITIES
    this.iOSWDARunnerDerivedDataPath = process.env.IOS_DERVIVED_DATA_PATH;
    this.iOSUsePreBuiltWDA = process.env.IOS_USE_PREBUILT_WDA;
    // IOS REAL DEVICE CAPABILITIES
    this.iOSDeviceName = process.env.IOS_DEVICE_NAME;
    this.iOSPlatformVersion = process.env.IOS_PLATFORM_VERSION;
    this.iOSHardwareModel = process.env.IOS_HARDWARE_MODEL;
    this.iOSIpaPath = process.env.IOS_IPA_PATH;
    this.iOSUdid = process.env.IOS_UDID;
    this.iOSBundleID = process.env.IOS_BUNDLE_ID;
    this.iOSUpdatedWDABundleID = process.env.IOS_UPDATED_WDA_BUNDLE_ID;
    this.iOSDeviceModel = process.env.IOS_DEVICE_MODEL;
    this.applitoolsApiKey = process.env.APPLITOOLS_API_KEY;
    this.applitoolsServerUrl = process.env.APPLITOOLS_SERVER_URL;

    if (!this.platform) {
      throw new Error('PLATFORM is not defined in dotenv. Please define PLATFORM=<iOS or Android>');
    } else {
      this.platform = this.platform.trim().toLowerCase() === 'ios' ? 'iOS' : 'Android';
      logger.debug(`Platform - ${this.platform}`);
    }

    if (!this.specName || !fs.pathExistsSync(`${process.cwd()}/${this.specName}`)) {
      throw new Error('SPEC_NAME is not defined in dotenv or File Path is invalid. Please define SPEC_NAME=<Path of the feature file>');
    }

    if (!this.logLevel || ['trace', 'debug', 'info', 'warn', 'error'].indexOf(this.logLevel) === -1) {
      this.logLevel = 'warn';
      throw new Error('LOG_LEVEL is not defined or invalid in dotenv. Please define LOG_LEVEL=<trace | debug | info | warn  | error>; Defaulting to "warn".');
    } else {
      logger.debug(`Loglevel - ${this.logLevel}`);
    }

    this.featureFileName = () => {
      logger.debug('Feature File Name - ', this.specName.slice(this.specName.lastIndexOf('/') + 1, this.specName.lastIndexOf('.')));
      return this.specName.slice(this.specName.lastIndexOf('/') + 1, this.specName.lastIndexOf('.'));
    };

    if (!this.appName) {
      throw new Error('APP NAME is not defined in dotenv. Please define APP_NAME=<App Name>');
    } else {
      logger.debug(`App Name - ${this.appName}`);
    }

    if (!this.appVersion) {
      throw new Error('APP VERSION is not defined in dotenv. Please define APP_VERSION=<Example: 11.0.0>');
    } else {
      logger.debug(`App Name - ${this.appVersion}`);
    }

    this.tagExpression = () => {
      if (!this.isAutoInjectorEnabled) {
        return `not (@cai-on or ${this.platform.toLowerCase() === 'ios' ? ('@android' || '@Android') : ('@iOS' || '@ios')})`;
      }
      return `not ${this.platform.toLowerCase() === 'ios' ? ('@android' || '@Android') : ('@iOS' || '@ios')}`;
    };

    // Android Real Device Capabilities
    if (this.platform === 'Android' && !this.isSimulator) {
      if (!this.androidDeviceName) {
        throw new Error('ANDROID_DEVICE_NAME for Android is not mentioned in dotenv. Please define ANDROID_DEVICE_NAME=<Example: Google Pixel 3a>');
      } else {
        logger.debug(`ANDROID_DEVICE_NAME for Android - ${this.androidDeviceName}`);
      }

      if (!this.androidModelName) {
        throw new Error('ANDROID_MODEL_NAME for Android is not mentioned in dotenv. Please define ANDROID_MODEL_NAME=<Example: 94KAY0766T; Use adb devices to get Device Name>');
      } else {
        logger.debug(`ANDROID_MODEL_NAME for Android - ${this.androidModelName}`);
      }

      if (!this.androidPlatformVersion) {
        throw new Error('ANDROID_PLATFORM_VERSION for Android is not mentioned in dotenv. Please define ANDROID_PLATFORM_VERSION=<Example: 12>');
      } else {
        logger.debug(`ANDROID_PLATFORM_VERSION for Android - ${this.androidPlatformVersion}`);
      }

      if (!this.androidApkPath || !fs.pathExistsSync(`${this.androidApkPath}`)) {
        throw new Error('ANDROID_APK_PATH for Android is not mentioned or APK path is invalid in dotenv. Please define ANDROID_APK_PATH=<apk path>');
      } else {
        logger.debug(`ANDROID_APK_PATH for Android - ${this.androidApkPath}`);
      }

      if (!this.androidAppActivity) {
        throw new Error('ANDROID_APP_ACTIVITY for Android is not mentioned in dotenv. Please define ANDROID_APP_ACTIVITY=<com.orgname.MainActivity>');
      } else {
        logger.debug(`ANDROID_APP_ACTIVITY for Android - ${this.androidAppActivity}`);
      }

      if (!this.androidAppPackage) {
        throw new Error('ANDROID_APP_PACKAGE for Android is not mentioned in dotenv. Please define ANDROID_APP_PACKAGE=<com.orgname.appname>');
      } else {
        logger.debug(`ANDROID_APP_PACKAGE for Android - ${this.androidAppPackage}`);
      }
    }

    // iOS Real Device Capabilities
    if (this.platform === 'iOS' && !this.isSimulator) {

      if (!this.iOSUdid) {
        throw new Error('IOS_UDID for iOS is not mentioned in dotenv. Please define IOS_UDID=<00001234-000XXX767ABCD4>');
      } else {
        logger.debug(`IOS_UDID for iOS - ${this.iOSUdid}`);
      }

      if (!this.iOSBundleID) {
        throw new Error('IOS_BUNDLE_ID for iOS is not mentioned in dotenv. Please define IOS_BUNDLE_ID=<com.orgname.appname>');
      } else {
        logger.debug(`IOS_BUNDLE_ID for iOS - ${this.iOSBundleID}`);
      }

      if (!this.iOSUpdatedWDABundleID) {
        throw new Error('IOS_UPDATED_WDA_BUNDLE_ID for iOS is not mentioned in dotenv. Please define IOS_UPDATED_WDA_BUNDLE_ID=<com.facebook.WebDriverAgentRunner123453>');
      } else {
        logger.debug(`IOS_UPDATED_WDA_BUNDLE_ID for iOS - ${this.iOSUpdatedWDABundleID}`);
      }

      if (!this.iOSDeviceModel) {
        logger.warn('IOS_DEVICE_MODEL for iOS is not mentioned in dotenv. Please define IOS_DEVICE_MODEL=<Example: iPhone12,1>');
      } else {
        logger.debug(`IOS_DEVICE_MODEL for iOS - ${this.iOSDeviceModel}`);
      }
    }
  }
};
