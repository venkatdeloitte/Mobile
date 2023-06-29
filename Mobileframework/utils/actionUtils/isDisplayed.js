const assert = require('assert')

const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');
const { containsValues } = require('../assertionUtils/writeInTestData');
const { getTextOfAnElement } = require('./getText');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');

const platform = browser.config.platformIs;

let msg = '';
const timeOutinMs = 20000;

const isDisplayed = async (ele) => {
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
  logger.info(`Verifying if locator is displayed - ${locator}`);
  await $(locator).then(async (element) => {
    await isDisplayedAttribute(element, ele);
  })
  // const locator = elementLocator[ele];
  // await browser.waitUntil(async () => await (await $(locator)).isDisplayed() === true, elementTimeOut).then((val) => {
  //   logger.info(`Pass : ${ele} is displayed`);
  // }).catch((err) => {
  //   msg = `Fail : error in is displayed for ${ele} after waiting for ${elementTimeOut} ms is ${err}`;
  //   logger.error(msg);
  //   assert.fail(msg)
  // })
};
const isDisplayedAttribute = async (element, ele) => {
  let value = false;
  const locatorDisplayed = await element.isDisplayed();
  const locatorEnabled = await element.isEnabled();
  await browser.waitUntil(async () => (locatorDisplayed || locatorEnabled) === true, elementTimeOut).then((val) => {
    logger.info(`Pass: ${ele} is displayed - `, val);
    value = val;
  }).catch((err) => {
    msg = `Fail: ${ele} is not displayed due to ${err}`;
    logger.error(msg);
    assert.fail(msg);
  });
  return value;
};
const isDisplayedWithoutMsg = async (ele) => {
  let displayed = false;
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
  await browser.$(locator).then(async (val) => {
    await val.isDisplayed().then(async (dis) => {
      if (dis === true) { displayed = true; } else {
        await val.isEnabled().then((enb) => {
          if (enb === true) {
            displayed = true;
          } else {
            logger.debug('error in is Displayed without message');
            assert.fail('error in is Displayed without message')
          }
        }).catch((enbError) => {
          msg = `error in is enabled inside is displayed without message , ${enbError}`;
          logger.error(msg);
          assert.fail(msg)
        })
      }
    }).catch((er) => {
      msg = `cant find element , ${ele}, error is , ${er}`;
      logger.error(msg);
      assert.fail(msg)
    })
  }).catch((err) => {
    msg = `cannot locate the element, ${ele}, error is , ${err}`;
    logger.error(msg);
    assert.fail(msg)
  })
  return displayed;
}

const areDisplayed = async (elements) => {
  let areElementsDisplayed = false
  let size = 0;

  let locator;
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[elements];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[elements];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  await browser.$$(locator).then(async (elementList) => {
    size = elementList.length;
    for (let i = 0; i < size; i += 1) {
      await browser.waitUntil(async () => await elementList[i].isDisplayed() === true, elementTimeOut).then(async (val) => {
        if (val === true) {
          areElementsDisplayed = true;
          logger.info(`PASS: ${i}th element is displayed from ${elements} list`);
        } else {
          msg = `FAIL : ${i} element is not displayed from ${elements} list`;
          logger.error(msg)
          assert.fail(msg)
        }
      }).catch((err) => {
        msg = `FAIL : cannot locate the ${i}th element from ${elements} list, error is , ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })
    }
  }).catch((er) => {
    msg = `FAIL : cannot locate the element with the given locator, ${elements}, error is , ${err}`;
    logger.error(msg);
    assert.fail(msg)
  })
  return areElementsDisplayed;
}

const isDisplayedWith = async (ele1, ele2) => {
  let locator; let locator2;
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[ele1];
      locator2 = allPageObjects.allPageiOS[ele2];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[ele1];
      locator2 = allPageObjects.allPageAndroid[ele2];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  await $(locator2).then(async (element) => {
    await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
      await $(locator).then(async (ele) => {
        await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
          logger.info(`Pass : ${ele1} is displayed for ${ele2}`);
        }).catch((err) => {
          msg = `Fail : error in is displayed for ${ele1} after waiting for ${elementTimeOut} ms is ${err}`;
          logger.error(msg);
          assert.fail(msg)
        })
      }).catch((err) => {
        msg = `Fail : error in is displayed for ${ele1} and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })
    }).catch((err) => {
      msg = `Fail : error in is displayed for ${ele2} after waiting for ${elementTimeOut} ms is ${err}`;
      logger.error(msg);
      assert.fail(msg)
    })
  }).catch((err) => {
    msg = `Fail : error in is displayed for ${ele2} and error is ${err}`;
    logger.error(msg);
    assert.fail(msg)
  })
}

const allElementsDisplayed = async (elements) => {
  const displayed = false;
  const enabled = false;

  let splitted = [];

  if (elements.includes(',')) {
    splitted = [];
    splitted = elements.split(',');

    for (let i = 0; i < splitted.length; i += 1) {
      const element = splitted[i];

      if (platform === 'ios') {
        object = allPageObjects.allPageiOS[element];
      } else if (platform === 'android') {
        object = allPageObjects.allPageAndroid[element];
      } else {
        logger.fatal('platform specified doesnt match with ios or android');
      }

      await browser.$(object).then(async (val) => {
        await val.isDisplayed().then(async (dis) => {
          if (dis === true) {
            logger.info('PASS : ', element, ' is displayed')
          } else {
            await val.isEnabled().then((enb) => {
              if (enb === true) {
                logger.info('PASS : ', element, ' is displayed')
              } else {
                msg = `FAIL :  ${element} is displayed`;
                logger.error(msg);
                assert.fail(msg)
              }
            }).catch((erEnb) => {
              msg = `Fail: error in is enabled inside all elements displayed and the error is  ${erEnb}`;
              logger.error(msg);
              assert.fail(msg)
            })
          }
        }).catch((erDis) => {
          msg = `Fail: error in is Displayed inside all elements displayed ${erDis}`;
          logger.error(msg);
          assert.fail(msg);
        })
      }).catch((err) => {
        msg = `Fail: error in locating the element from all elements displayed  ${element}, ${err}`;
        logger.error(msg);
        assert.fail(msg);
      })
    }
  }
}

const isNotEnabled = async (ele) => {
  let enabled = false;

  switch (platform) {
    case 'ios':
      element = allPageObjects.allPageiOS[ele]
      break;
    case 'android':
      element = allPageObjects.allPageAndroid[ele]
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }

  enabled = await (await browser.$(element)).isEnabled().then((value) => {
    enabled = value;

    if (enabled === false) {
      logger.info(`Pass ${ele} is not enabled`);
    } else {
      msg = `Fail: ${ele} is  enabled`;
      logger.error(msg)
      assert.fail(msg)
    }
  }).catch((err) => {
    msg = `Fail: ${ele} is not enabled due to ${err}`;
    logger.error(msg)
    assert.fail(msg)
  })

  return enabled;
}

const isEnabled = async (ele) => {
  let enabled = false;
  switch (platform) {
    case 'ios':
      element = allPageObjects.allPageiOS[ele];
      break;

    case 'android':
      element = allPageObjects.allPageAndroid[ele];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }

  enabled = (await browser.$(element)).isEnabled().then((value) => {
    if (value) {
      logger.info('Pass : The element ', ele, ' is enabled')
    } else {
      msg = `FAIL : The element ${ele} is not enabled`;
      logger.error(msg)
      assert.fail(msg)
    }
  }).catch((err) => {
    msg = `FAIL : The element  ${ele} is not enabled and the error is ${err}`;
    logger.error(msg)
    assert.fail(msg)
  })

  return enabled;
}

const isDisplayedInside = async (text, ele) => {
  await getTextOfAnElement(ele).then((val) => {
    containsValues(val, text);
  })
}

const isNotDisplayed = async (ele) => {
  switch (platform) {
    case 'ios':
      element = allPageObjects.allPageiOS[ele]
      break;

    case 'android':
      element = allPageObjects.allPageAndroid[ele]
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  if (ele === 'markPrimeTooltipGotIt') {
    await browser.pause(5000);
  }
  await browser.$(element).then(async (value) => {
    await value.isDisplayed().then(async (val) => {
      if (val === false) {
        logger.info(`PASS : ${ele} is not displayed`);
      } else {
        logger.info(`FAIL : ${ele} is displayed`);
        msg = `FAIL : ${ele} is  displayed and not enabled`;
        assert.fail(msg)
      }
    }).catch((er) => {
      msg = `error in is displayed for ${ele} is ${er}`;
      logger.error(msg)
      assert.fail(msg)
    })
  }).catch((err) => {
    msg = `couldnt locate the element ${ele} error is ${err}`;
    logger.error(msg)
    assert.fail(msg)
  })
}

const isKeyboardDisplayed = async () => {
  await browser.isKeyboardShown().then(async (val) => {
    if (val === true) {
      logger.info('PASS: The keyboard is displayed')
    } else {
      assert.fail('FAIL: The keyboard is hidden')
    }
  }).catch((er) => {
    assert.fail('FAIL: The keyboard is hidden');
  })
}

const isSelected = async (ele, select) => {
  select = select.toLowerCase();
  switch (platform) {
    case 'ios':
      element = allPageObjects.allPageiOS[ele];
      break;

    case 'android':
      element = allPageObjects.allPageAndroid[ele];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }

  await browser.$(element).then(async (val) => {
    await val.isSelected().then((value) => {
      if (value === true && select === 'selected') {
        logger.info('Pass : The element ', ele, ' is selected')
      } else if (value === true && select === 'unselected') {
        msg = `FAIL : The element ${ele}  is selected`
        logger.info(msg)
        assert.fail(msg)
      } else if (value === false && select === 'unselected') {
        logger.info('PASS : The element ', ele, ' is not selected')
      } else if (value === false && select === 'selected') {
        msg = `FAIL : The element ${ele} is not selected`;
        logger.error(msg)
        assert.fail(msg)
      } else {
        msg = `FAIL : The value ${select} is invalid`;
        logger.error(msg)
        assert.fail(msg)
      }
    })
  }).catch((err) => {
    msg = `FAIL : The element  ${ele} is not found and the error is ${err}`;
    logger.error(msg)
    assert.fail(msg)
  })
}

module.exports = {
  isDisplayed,
  areDisplayed,
  isDisplayedWith,
  isDisplayedInside,
  allElementsDisplayed,
  isEnabled,
  isDisplayedWithoutMsg,
  isDisplayedAttribute,
  isNotEnabled,
  isNotDisplayed,
  isKeyboardDisplayed,
  isSelected,

};
