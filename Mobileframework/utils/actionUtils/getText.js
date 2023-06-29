const assert = require('assert')
const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');
const isDisplayedUtil = require('./isDisplayed');

const platform = browser.config.platformIs;
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');
const isMappedToUtil = require('../assertionUtils/mapValue');
const readFromTestDataUtil = require('../assertionUtils/writeInTestData');

const getTextOfAnElement = async (ele) => {
  let textFromApp;
  let locator;
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[ele];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[ele];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  await $(locator).then(async (element) => {
    await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
      await element.getText().then((val) => {
        logger.info('The text from ', ele, ' is ', val)
        textFromApp = val;
      }).catch((err) => {
        logger.error(`error in getting text of the element ${ele}, ${err}`);
        assert.fail(`FAIL: error in getting text of the element ${ele}, ${err}`)
      })
    }).catch((er) => {
      logger.error(`error in finding element for get Text after waiting for ${elementTimeOut}: ${er}`);
      assert.fail(`FAIL: error in finding element for get Text after waiting for ${elementTimeOut}: ${er}`);
    })
  }).catch((er) => {
    logger.error(`error in finding element for get Text ${er}`);
    assert.fail(`FAIL: error in finding element for get Text ${er}`);
  })
  return textFromApp;
}

const getTextAndStoreTheValue = async (ele, key) => {
  let keyArray = [];
  let eleArray = [];

  let isMultipleElements = false;
  let isMultipleKeys = false;
  const elementLocator = [];

  // store element and data key in the elementArrays and keyArrays
  if (key.includes(',')) {
    isMultipleKeys = true;
    keyArray = key.split(',');
  } else {
    keyArray.push(key);
  }

  if (ele.includes(',')) {
    isMultipleElements = true;
    eleArray = ele.split(',');
  } else {
    eleArray.push(ele);
  }

  // store elementLocators from elementNames based upon platform
  switch (platform) {
    case 'ios':

      for (let i = 0; i < eleArray.length; i += 1) {
        elementLocator.push(allPageObjects.allPageiOS[eleArray[i]]);
      }
      break;

    case 'android':
      for (let i = 0; i < eleArray.length; i += 1) {
        elementLocator.push(allPageObjects.allPageAndroid[eleArray[i]]);
      }
      break;

    default:
      logger.fatal(`Fail : invalid key for locator is provided ${ele}`);
      assert.fail(`Fail : invalid key for locator is provided ${ele}`);
  }
  for (let i = 0; i < eleArray.length; i += 1) {
    logger.trace('eleArray[i]', eleArray[i]);
    await $(elementLocator[i]).then(async (element) => {
      await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
        await element.getText().then((val) => {
          if (isMultipleElements === false && isMultipleKeys === false) {
            logger.trace(key, val);
            browser.config.params[key] = val;
          } else if (isMultipleElements === true && isMultipleKeys === true) {
            logger.trace(keyArray[i], val);
            browser.config.params[keyArray[i]] = val;
          } else if (isMultipleElements === false && isMultipleKeys === true) {
            let valuesArray = [];
            if (val.includes(',')) {
              valuesArray = val.split(',');
              for (let i = 0; i < keyArray.length; i += 1) {
                browser.config.params[keyArray[i]] = valuesArray[i];
              }
            } else {
              logger.error(`Fail: ${val} doesnt contain "," for splitting`)
              assert.fail(`Fail: ${val} doesnt contain "," for splitting`)
            }
          } else if (isMultipleElements === true && isMultipleKeys === false) {
            logger.error('Fail : Invalid no. of arguments are given in getTextAndStore gherkin')
            assert.fail('Fail : Invalid no. of arguments are given in getTextAndStore gherkin')
          }
        }).catch((er) => {
          logger.error(`Fail : error in getting text of the element ${eleArray[i]}, ${err}`)
          assert.fail(`Fail : error in getting text of the element ${eleArray[i]}, ${err}`)
        })
      }).catch((er) => {
        logger.error(`The element ${eleArray[i]} is not visible after waiting for ${elementTimeOut}: ${er}`);
        assert.fail(`The element ${eleArray[i]} is not visible after waiting for ${elementTimeOut} : ${er}`)
      })
    }).catch((er) => {
      logger.fatal(`The element ${eleArray[i]} could not be found and error is: ${er}`);
      assert.fail(`The element ${eleArray[i]} could not be found and error is: ${er}`)
    })
  }
}

const getAttributeAndStoreTheValue = async (attributeName, ele, key) => {
  let keyArray = [];
  let eleArray = [];

  let isMultipleElements = false;
  let isMultipleKeys = false;
  const elementLocator = [];

  // store element and data key in the elementArrays and keyArrays
  if (key.includes(',')) {
    isMultipleKeys = true;
    keyArray = key.split(',');
  } else {
    keyArray.push(key);
  }

  if (ele.includes(',')) {
    isMultipleElements = true;
    eleArray = ele.split(',');
  } else {
    eleArray.push(ele);
  }

  // store elementLocators from elementNames based upon platform
  switch (platform) {
    case 'ios':

      for (let i = 0; i < eleArray.length; i += 1) {
        elementLocator.push(allPageObjects.allPageiOS[eleArray[i]]);
      }
      break;

    case 'android':
      for (let i = 0; i < eleArray.length; i += 1) {
        elementLocator.push(allPageObjects.allPageAndroid[eleArray[i]]);
      }
      break;

    default:
      logger.fatal(`Fail : invalid key for locator is provided ${ele}`);
      assert.fail(`Fail : invalid key for locator is provided ${ele}`);
  }

  for (let i = 0; i < eleArray.length; i += 1) {
    await $(elementLocator[i]).then(async (element) => {
      await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
        await element.getAttribute(attributeName).then(async (val) => {
          if (isMultipleElements === false && isMultipleKeys === false) {
            logger.trace(key, val);
            browser.config.params[key] = val;
          } else if (isMultipleElements === true && isMultipleKeys === true) {
            logger.trace(keyArray[i], val);
            browser.config.params[keyArray[i]] = val;
          } else if (isMultipleElements === false && isMultipleKeys === true) {
            let valuesArray = [];
            if (val.includes(',')) {
              valuesArray = val.split(',');
              for (let i = 0; i < keyArray.length; i += 1) {
                browser.config.params[keyArray[i]] = valuesArray[i];
              }
            } else {
              logger.error(`Fail: ${val} doesnt contain "," for splitting`);
              assert.fail(`Fail: ${val} doesnt contain "," for splitting`)
            }
          } else if (isMultipleElements === true && isMultipleKeys === false) {
            logger.error('Fail : Invalid no. of arguments are given in getTextAndStore gherkin');
            assert.fail('Fail : Invalid no. of arguments are given in getTextAndStore gherkin')
          }
        }).catch((err) => {
          logger.error(`Fail : error in getting attribute value of the element ${eleArray[i]}, ${err}`)
          assert.fail(`Fail : error in getting attribute value of the element ${eleArray[i]}, ${err}`)
        })
      }).catch((er) => {
        logger.error(`Fail : The element ${eleArray[i]} is not visible after waiting for ${elementTimeOut} s`)
        assert.fail(`Fail : The element ${eleArray[i]} is not visible after waiting for ${elementTimeOut} s`)
      })
    }).catch((er) => {
      logger.fatal(`The element ${eleArray[i]} could not be found and error is: ${er}`);
      assert.fail(`The element ${eleArray[i]} could not be found and error is: ${er}`)
    })
  }
}

const fetchElementFromList = async (value, ele, key) => {
  let locator;
  const size = 0;
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[ele];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[ele];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }

  await browser.waitUntil(async () => await $(locator).then(async (element) => element.isDisplayed()) === true, elementTimeOut).then(async () => {
    await browser.$$(locator).then(async (elements) => {
      const index = isMappedToUtil.isMappedToValue(value);
      if (typeof index !== 'undefined' && index <= elements.length) {
        const a = elements[index - 1]
        await a.getText().then(async (val) => {
          readFromTestDataUtil.writeInTestData(key, val)
        })
      } else if (index > elements.length) {
        logger.fatal(`FAIL: ${value} is not displayed in the list, index exceeds the number of elements in the list`);
        assert.fail(`FAIL: ${value} is not displayed in the list, index exceeds the number of elements in the list`);
      }
    })
  }).catch((er) => {
    logger.fatal(`The element ${ele} is not visible after waiting for ${elementTimeOut}`)
    assert.fail(`The element ${ele} is not visible after waiting for ${elementTimeOut}`);
  })
}

module.exports = {
  getTextOfAnElement,
  getTextAndStoreTheValue,
  getAttributeAndStoreTheValue,
  fetchElementFromList,
}
