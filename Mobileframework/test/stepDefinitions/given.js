// this file contains step definitions for both ios and android
// logic related to platform switch is handled in the respective utils file, please refer the utils file for more information.

const { Given } = require('@cucumber/cucumber');
const deviceFunctions = require('../../utils/actionUtils/deviceFunctions');
const mobileAction = require('../../utils/mobileGestureUtils/mobileElementActions');
const writeInTestData = require('../../utils/assertionUtils/writeInTestData');
const actionUtils = require('../../utils/actionUtils/index');

Given(/^I "([^"]*)" alerts$/, async (input) => {
  await deviceFunctions.accepAlertIniOS(input)
})

Given(/^I launch BGM app and send data via bluetooth$/, async () => {
  bgmActionsUtils.testRun();
})

Given(/^I goto device time settings$/, async () => {
  await deviceFunctions.gotoDeviceTimeSettings()
});

// I set device time to "7:00 AM"
Given(/I set device time to "([^"]*)"$/, async (timeInput) => {
  await deviceFunctions.changeDeviceTime(timeInput)
});

Given(
  /^I turn "([^"]*)" the bluetooth$/,
  mobileAction.toggleBluetooth,
);

// Given(
//   /^I set device date to "([^"]*)" in android$/,
//   deviceFunctions.changeDeviceDateInAndroid,
// )

Given(
  /^I unpair a device from bluetooth in android$/,
  deviceFunctions.unpairDevice,
);

Given(/^I wait for "([^"]*)" seconds/, async (time) => {
  await deviceFunctions.waitForTime(time);
});

Given(
  /^I set the "([^"]*)" test data to "([^"]*)"$/,
  writeInTestData.setValueInTestData,
);

// sdk squire

Given(/^I log "([^"]*)" auto-injector event/, { timeout: 10 * 60 * 1000 }, async (doseType) => {
  await autoLog(doseType);
});