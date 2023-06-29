// this file contains step definitions for both ios and android
// logic related to platform switch is handled in the respective utils file, please refer the utils file for more information.

const { When } = require('@cucumber/cucumber')
const actionUtils = require('../../utils/actionUtils/index');
const deviceUtils = require('../../utils/actionUtils/deviceFunctions');
const mobileAction = require('../../utils/mobileGestureUtils/mobileElementActions')

When(/^I tap "([^"]*)" (?:button|link|header|field|tab|date|label|card|menu|dropdown|comparison|chevron|icon|text)$/,
  actionUtils.TapOnElement);

When(/^I enter "([^"]*)" in "([^"]*)" field$/,
  actionUtils.sendText);

When(/^I press and hold on "([^"]*)" button$/,
  actionUtils.longPressOnElement);

When(/^I tap on "([^"]*)" (?:card|button) from "([^"]*)"$/,
  actionUtils.TapElementFromList);

When(/^I slide the "([^"]*)" towards "([^"]*)"$/,
  actionUtils.SlideOnElement);

When(/^I swipe "([^"]*)"$/,
  actionUtils.swipeScreen);

When(/^I set "([^"]*)" to "([^"]*)" units "([^"]*)" value$/,
  actionUtils.selectDate);

When(/^I tap android native back and "([^"]*)" for mimicking the same action on iOS$/,
  mobileAction.androidNativeBack);

When(/^I tap outside the "([^"]*)" (?:button|link|header|field|tab|date|label|card|menu|dropdown|text)$/,
  mobileAction.tapOutsideTheElement);

When(/^I launch device settings$/,
  mobileAction.openSettings);

When(/^I fetch "([^"]*)" (?:details|detail) and save as "([^"]*)" inside test data$/,
  actionUtils.getTextAndStoreTheValue);

When(/^I fetch "([^"]*)" attribute (?:details|detail) of "([^"]*)" and save as "([^"]*)" inside test data$/,
  actionUtils.getAttributeAndStoreTheValue);

When(/^I access device notifications$/,
  mobileAction.openNotifications);

When(/^I reinstall connectedLogbook app$/,
  deviceUtils.reinstallApp);

When(/^I kill connectedLogbook app$/,
  deviceUtils.killApp);

When(/^I uninstall connectedLogbook app$/,
  deviceUtils.uninstallApp);

When(/^I put the connectedLogbook App in background$/,
  deviceUtils.putAppInBackground);

When(/^I turn (?:on|off) the internet$/,
  mobileAction.TurnOnOffInternet);

When(/^I clear "([^"]*)" (?:notification|notifications) displayed as "([^"]*)"$/,
  mobileAction.clearNotification);

When(/^I clear text from "([^"]*)" (?:header|field|label|card|textbox)$/,
  actionUtils.clearText);

When(/^I press the home button$/,
  deviceUtils.pressHomeButton);

When(/^I kill device settings app$/,
  deviceUtils.killSettingsApp);

When(/^I "([^"]*)" device notifications$/,
  deviceUtils.toggleNotification);

When(/^I fetch "([^"]*)" element from "([^"]*)" and save as "([^"]*)" inside test data$/,
  actionUtils.fetchElementFromList);

When(/^I turn (?:on|off) location in android$/,
  mobileAction.toggleLocationAndroid);

When(/^I relaunch connectedLogbook app$/,
  mobileAction.reOpenApp);

When(/^I navigate from "([^"]*)" to see "([^"]*)" (?:screen|title|button|view|header|subheader|label|menu|icon|dot|section|alert|card|image|link|text|slider|field|image|chevron|error|textbox|notification|bar|pop-up|CTA)$/,
  actionUtils.tapMultipleElements);

When(/^I change the device time zone to "([^"]*)"$/,
  deviceUtils.changeTimezone);

When(/^I allow app permissions "([^"]*)" in settings$/,
  deviceUtils.allowPermission);

  When(/^I tap keyboard button "([^"]*)"$/,
    deviceUtils.tapKeyboardButton);
