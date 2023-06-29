const mapValueUtils = require('./mapValue');
const writeInTestDataUtils = require('./writeInTestData');
const genericUtils = require('./genericutilities');

module.exports = {
  ...mapValueUtils,
  ...writeInTestDataUtils,
  ...genericUtils,
}
