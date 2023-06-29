const tapActions = require('./Tap');
const slideActions = require('./Slide');
const isDisplayedActions = require('./isDisplayed');
const deviceActions = require('./deviceFunctions');
const enterTextActions = require('./enterText');
const getTextActions = require('./getText');

module.exports = {
  ...deviceActions,
  ...enterTextActions,
  ...getTextActions,
  ...isDisplayedActions,
  ...slideActions,
  ...tapActions,
}
