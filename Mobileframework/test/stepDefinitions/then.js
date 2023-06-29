// this file contains step definitions for both ios and android
// logic related to platform switch is handled in the respective utils file, please refer the utils file for more information.

const { Then } = require('@cucumber/cucumber');
const actionUtils = require('../../utils/actionUtils/index')
const assertionUtils = require('../../utils/assertionUtils/writeInTestData');
const deviceFunctions = require('../../utils/actionUtils/deviceFunctions');

Then(/^I should see "([^"]*)" (?:screen|title|button|view|header|subheader|label|menu|icon|dot|section|alert|card|image|link|text|slider|field|image|chevron|error|textbox|notification|bar|pop-up|CTA)$/,
  actionUtils.isDisplayed);

Then(/^I should see "([^"]*)" text inside "([^"]*)" (?:screen|title|button|view|header|subheader|label|menu|icon|dot|section|alert|card|image|link|text|slider|field|image)$/,
  actionUtils.isDisplayedInside);

Then(/^I should see "([^"]*)" for "([^"]*)" (?:tabs|factor|fields|texts|date)$/,
  actionUtils.isDisplayedWith);

Then(/^I should see "([^"]*)" (?:screens|buttons|views|headers|subheaders|labels|menus|icons|dots|sections|alerts|cards|images|links|messages|texts|textboxes|pop-ups|CTAs|contents|chevrons|notifications|fields)$/,
  actionUtils.allElementsDisplayed);

Then(/^"([^"]*)" should not be enabled$/,
  actionUtils.isNotEnabled);

Then(/^"([^"]*)" should be enabled$/,
  actionUtils.isEnabled);

Then(/^I should not see "([^"]*)" (?:screen|title|button|view|header|subheader|label|menu|icon|dot|section|alert|card|image|link|text|slider|field|image|message|bar|CTA)$/,
  actionUtils.isNotDisplayed);

Then(/^I compare "([^"]*)" value from the app with the expected value from test data$/,
  assertionUtils.compareValues);

Then(/^I should see right order of "([^"]*)" (?:notifications|values) based upon "([^"]*)"$/,
  assertionUtils.verifyOrder);

Then(/^I observe "([^"]*)" value from the app contains "([^"]*)" expected values$/,
  assertionUtils.containsValues);

Then(/^I should see date from app "([^"]*)" in expected format "([^"]*)"$/,
  assertionUtils.dateValidate);

Then(/^I should see the notifications are "([^"]*)" for "([^"]*)" app in ios$/,
  deviceFunctions.isNotificationEnabledOrDisabled);

Then(/^I verify bluetooth is "([^"]*)" for "([^"]*)" app in ios$/,
  deviceFunctions.isBluetoothEnabledOrDisabled);

Then(/^I should see native keyboard$/,
  actionUtils.isKeyboardDisplayed);

Then(/^I compare "([^"]*)" value from the app with "([^"]*)" value from simulator app$/,
  assertionUtils.compareBDValues);

Then(/^"([^"]*)" should be "([^"]*)"$/,
  actionUtils.isSelected);

Then(/^"([^"]*)" should be converted to "([^"]*)" when the timezone is changed$/,
  assertionUtils.verifyChangedTimeFromApp)

Then(/^"([^"]*)" should reflect the correct date when "([^"]*)" is converted on changing the timezone$/,
  assertionUtils.verifyHeaderChangedDate)
