const assert = require('assert')

const platform = browser.config.platformIs;
const isDisplayedUtil = require('./isDisplayed');
const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');
const swipeUtils = require('./Slide');
const isMappedToUtil = require('../assertionUtils/mapValue');
const readFromTestDataUtil = require('../assertionUtils/writeInTestData');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');

let msg = '';
const TapOnElement = async (ele1) => {
  let locator;
  if (ele1 === 'setAutomatically') {
    skipScreenshotForTheStep = true;
  }
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[ele1];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[ele1];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  await $(locator).then(async (element) => {
    await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
      await element.click().then(async () => {
        // SS assert that the elemnt is not displayed after tapping on it
        //  if it is displayed, log a warning stating please verify if it is the right behaviour
        if (ele1 === 'markPrimeTooltipLink' || ele1 === 'termsOfUseCardChevron' || ele1 === 'termsOfUseCardTitle' || ele1 === 'markPrimeTooltipGotIt') {
          await browser.pause(3000);
        }
        await checkIfSameELementIsPresentAfterClick(locator, ele1);
      }).catch((er) => {
        logger.error(`Fail : can't tap on  ${ele1} and the error is ${er}`)
        assert.fail(`Fail : can't tap on ${ele1} and the error is ${er}`)
      })
    }).catch((er) => {
      logger.error(`Fail : The element ${ele1} is not visible after waiting for ${elementTimeOut}`)
      assert.fail(`Fail : The element ${ele1} is not visible after waiting for ${elementTimeOut}`)
    })
  }).catch((er) => {
    logger.error(`Fail : error in tap on element for ${ele1} for finding the element and error is ${er}`);
    assert.fail(`Fail : error in tap on element for ${ele1} for finding the element and error is ${er}`);
  })
}

const checkIfSameELementIsPresentAfterClick = async (locator, ele1) => {
  let count = 0;
  do {
    ele = await browser.$(locator);
    count++;
  }
  while (await ele.isDisplayed() && await ele.isEnabled() && count < 3)
  if (count === 3) {
    logger.warn(`${ele1} is displayed after tap action`)
  } else {
    logger.info(`${ele1} is not displayed after tap action`)
  }
}

const TapElementFromList = async (value1, ele1) => {
  let locator;
  const size = 0;
  let isClicked = false;
  const valueFromTestData = readFromTestDataUtil.readFromTestData(value1);
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[ele1];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[ele1];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  await browser.waitUntil(async () => await $(locator).then(async (element) => element.isDisplayed()) === true, elementTimeOut).then(async () => {
    await browser.$$(locator).then(async (elements) => {
      if (valueFromTestData !== undefined) {
        const size = elements.length;
        for (let i = 0; i < size && isClicked === false; i += 1) {
          await elements[i].getText().then(async (val2) => {
            if (val2 === valueFromTestData) {
              await elements[i].click().then(async () => {
                // SS assert that the elemnt is not displayed after tapping on it
                //  if it is displayed, log a warning stating please verify if it is the right behaviour
                await checkIfSameELementIsPresentAfterClick(locator, ele1);
                isClicked = true;
              }).catch((er) => {
                logger.error(`Fail : can't tap on and the error ${ele1} error is ${er}`)
                assert.fail(`Fail : can't tap on and the error ${ele1} error is ${er}`)
              })
            }
          }).catch((er) => {
            logger.error(`Fail : can't get text of ${ele1} and error is ${er}`)
            assert.fail(`Fail : can't get text of ${ele1} and error is ${er}`)
          })
        }
      }
      if (!valueFromTestData) {
        const index = isMappedToUtil.isMappedToValue(value1);
        if (index !== undefined && index <= elements.length) {
          // SS wait untill on elements[index-1]
          await browser.waitUntil(async () => await elements[index - 1].isDisplayed() === true, elementTimeOut).then(async () => {
            await elements[index - 1].click().then(async () => {
            // SS assert that the elemnt is not displayed after tapping on it
            //  if it is displayed, log a warning stating please verify if it is the right behaviour
              await checkIfSameELementIsPresentAfterClick(locator, ele1);
            }).catch((err) => {
              msg = `FAIL :  ${value1} is not diplayed and the error is ${err}`;
              logger.error(msg);
              assert.fail(msg);
            })
          }).catch((err) => {
            msg = `FAIL : error on Tapping ${value1} element and the error is ${err}`;
            logger.error(msg);
            assert.fail(msg);
          })
        } else if (index > elements.length) {
          msg = `FAIL: ${value1} is not displayed in the list, index exceeds the number of elements in the list`;
          logger.fatal(msg);
          assert.fail(msg);
        } else if (index === undefined) {
          elements.forEach(async (element) => {
            await element.getText().then(async (val) => {
              if (val === value1) {
                await element.click().then(async () => {
                  // SS assert that the elemnt is not displayed after tapping on it
                  //  if it is displayed, log a warning stating please verify if it is the right behaviour
                  await checkIfSameELementIsPresentAfterClick(locator, ele1);
                }).catch((err) => {
                  msg = `FAIL : error on Tapping ${value1} element and the error is ${err}`;
                  logger.error(msg);
                  assert.fail(msg);
                })
              }
            })
          })
        }
      }
    }).catch((er) => {
      logger.fatal(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`)
      assert.fail(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`);
    })
  }).catch((er) => {
    logger.fatal(`The element ${ele1} is not visible after waiting for ${elementTimeOut} and error is: ${er}`)
    assert.fail(`The element ${ele1} is not visible after waiting for ${elementTimeOut} and error is: ${er}`);
  })
}

const longPressOnElement = async (ele1) => {
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[ele1];
      await $(locator).then(async (element) => {
        await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
          await swipeUtils.SwipeLeftOnElementByCoordinates(element).then(async () => {
            await browser.$(allPageObjects.allPageiOS.view).then(async (ele) => {
              // SS wait untill on ele
              await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
                await ele.click().then(async () => {
                  logger.info(`Pass : Long pressed on the element ${ele1}`)
                  // SS assert that the elemnt is not displayed after tapping on it
                  //  if it is displayed, log a warning stating please verify if it is the right behaviour
                  await checkIfSameELementIsPresentAfterClick(locator, ele1);
                }).catch((err) => {
                  msg = `Fail : cannot tap on clear ${ele1} and the error is ${err}`;
                  logger.error(msg);
                  assert.fail(msg)
                })
              }).catch((err) => {
                msg = `FAIL :  ${ele1} is not diplayed and the error is ${err}`;
                logger.error(msg);
                assert.fail(msg);
              })
            })
          }).catch((err) => {
            msg = `Fail : cannot clear ${ele1} and the error is ${err}`;
            logger.error(msg);
            assert.fail(msg)
          })
        }).catch((er) => {
          logger.error(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`);
          assert.fail(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`);
        })
      }).catch((err) => {
        msg = `Fail : cannot find ${ele1} and the error is ${err}`;
        logger.error(msg);
        assert.fail(msg);
      })
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[ele1];
      await $(locator).then(async (element) => {
        await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
          await element.getLocation().then(async (loc) => {
            x1 = Number(loc.x)
            y1 = Number(loc.y)
          }).catch((err) => {
            msg = `Count not get the ${element} location and error is ${err}`
            logger.debug(msg);
            assert.fail(msg)
          })
          await browser.getWindowSize().then(async (val) => {
            wid = val.width
            hgt = val.height
          }).catch((err) => {
            msg = `Count not get the window location and error is ${err}`;
            logger.debug(msg);
            assert.fail(msg)
          })

          await browser.touchAction([

            { action: 'press', x: wid / 2, y: y1 },
            { action: 'wait', ms: 3000 },
            { action: 'moveTo', x: wid / 2, y: y1 },
            { action: 'release' },
          ]).then(async () => {
            await browser.pause(5000);
            logger.info(`Pass : Long pressed on the element ${ele1}`)
            await checkIfSameELementIsPresentAfterClick(locator, ele1);
          }).catch((err) => {
            msg = `FAIL : cannot Long press on ${ele1} and the error is ${err}`;
            logger.error(msg);
            assert.fail(msg)
          })
        })
      }).catch((er) => {
        logger.fatal(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`)
        assert.fail(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`)
      })
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

// const tapOnArrayOfElements = async (elements, browserObj) => {
//   let arrayOfELements = [];
//   if (elements.includes(',')) { arrayOfELements = elements.split(','); } else {
//     arrayOfELements.push(elements);
//   }

//   for (let i = 0; i < arrayOfELements.length; i += 1) {
//     element1 = arrayOfELements[i];
//     obj = elementLocator[element1];
//     await browserObj.$(obj).then(async (value) => {
//       await browserObj.waitUntil(async () => await value.isDisplayed() === true, elementTimeOut).then(async () => {
//         await value.click().then(async () => {
//           logger.trace(`tapped on ${element1}`)
//           await checkIfSameELementIsPresentAfterClick(obj, element1);
//         }).catch((er) => {
//           logger.error(`cannot tap on  ${element1} and the error is : ${er}`);
//           assert.fail(`cannot tap on  ${element1} and the error is : ${er}`)
//         })
//       }).catch((er) => {
//         logger.fatal(`The element ${element1} is not visible after waiting for ${elementTimeOut}`)
//         assert.fail(`The element ${element1} is not visible after waiting for ${elementTimeOut}`)
//       })
//     })
//   }
// }

const tapMultipleElements = async (elements, ele1) => {
  let elementLocator;
  switch (platform) {
    case 'ios':
      elementLocator = allPageObjects.allPageiOS;
      break;

    case 'android':
      elementLocator = allPageObjects.allPageAndroid;
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
  const element1 = elementLocator[elements];
  await tapOnArrayOfElements(element1, browser).then(async () => {
    await isDisplayedUtil.isDisplayed(ele1).then(async () => {
      logger.info(`PASS: Successfully navigated to the screen where ${ele1} is displayed`);
    }).catch((err) => {
      msg = `FAIL: The expected element ${ele1} is not displayed and the error is ${err}`
      logger.error(msg)
      assert.fail(msg)
    })
  }).catch((er) => {
    msg = `FAIL: Error on tapping ${elements} elements and the error is ${er}`
    logger.error(msg)
    assert.fail(msg)
  })
}

const tapOnArrayOfElements = async (elements) => {
  let arrayOfELements = [];
  if (elements.includes(',')) { arrayOfELements = elements.split(','); } else {
    arrayOfELements.push(elements);
  }
  for (let i = 0; i < arrayOfELements.length; i += 1) {
    const elementKey = arrayOfELements[i];
    await TapOnElement(elementKey).then(() => {
      logger.trace(`tapped on ${elementKey}`);
    }).catch((er) => {
      logger.fatal(`The element ${elementKey} is not visible after waiting for ${elementTimeOut} - ${er}`);
      assert.fail(`The element ${elementKey} is not visible after waiting for ${elementTimeOut} - ${er}`);
    });
  }
};

module.exports = {
  TapOnElement,
  TapElementFromList,
  longPressOnElement,
  tapOnArrayOfElements,
  tapMultipleElements,
};
