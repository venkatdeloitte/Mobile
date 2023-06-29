const assert = require('assert')
const isDisplayedUtil = require('./isDisplayed');
const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');

const platform = browser.config.platformIs;
const testData = require('../assertionUtils/writeInTestData')

// Required when device settings object needs to be added
//  const devicesetting = require('../../test/AppScreensObjectRepo/DeviceSetting.js');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');

let msg = '';

const sendText = async (value, element) => {
  let valueToEnter;
  if (testData.readFromTestData(value) !== undefined) { valueToEnter = testData.readFromTestData(value); } else if (browser.config.params[value] !== undefined) { valueToEnter = browser.config.params[value]; } else { valueToEnter = value }
  let locator;
  switch (platform) {
    case 'ios':
      locator = allPageObjects.allPageiOS[element];
      break;

    case 'android':
      locator = allPageObjects.allPageAndroid[element];
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }

  await $(locator).then(async (ele) => {
    await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
      if (valueToEnter !== undefined) {
        await ele.setValue(valueToEnter).then(async () => {
          logger.info(`Pass : Entered ${valueToEnter} to ${element} field`);
        }).catch((err) => {
          msg = `Couldnt enter ${valueToEnter} to ${element} field and error is ${err}`;
          logger.error(msg);
          assert.fail(msg)
        })
      } else {
        msg = `Couldnt enter ${valueToEnter} to ${element} field and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      }
    }).catch((er) => {
      logger.fatal(`The element ${element} is not visible after waiting for ${elementTimeOut}`)
      assert.fail(`The element ${element} is not visible after waiting for ${elementTimeOut}`);
    })
  }).catch((er) => {
    logger.fatal(`The element ${element} is not visible and error is: ${er}`)
    assert.fail(`The element ${element} is not visible and error is: ${er}`);
  })
}

const selectDate = async (textBox, value, action) => {
  const valueArray = [];

  let swipeDirection = '';
  if (action === 'next') { swipeDirection = 'up'; } else if (action === 'previous') { swipeDirection = 'down'; }

  switch (platform) {
    case 'ios':

      await browser.$(allPageObjects.allPageiOS[textBox]).then(async (ele) => {
        await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
          let i = 0;
          for (i = 0; i < value; i += 1) {
            await browser.execute('mobile: selectPickerWheelValue', { element: ele, order: action, offset: 0.15 }).then(async () => {

            }).catch((err) => {
              msg = `Fail : Cannot set up Date or Time and the error is ${err}`;
              logger.error(msg);
              assert.fail(msg);
            })
          }
          //  Fetching the Date field and  storing inside an array

          await ele.getText().then((val) => {
            logger.debug('The text from Date field is ', val)
          }).catch((er) => {
            logger.debug('error in finding element for get Tex ', er)
            assert.fail(`error in finding element for get Text ${er}`);
          })

          if (i === Number(value)) { logger.info(`Pass : ${textBox} is set to ${value} units ${action}`); }
        }).catch((err) => {
          msg = `Fail :  error in checking visibility of element and error is ${err}`;
          logger.error(msg);
          assert.fail(msg);
        })
      }).catch((e) => {
        msg = `Fail : Cannot find the element and the error is ${e}`;
        logger.error(msg);
        assert.fail(msg);
      })

      break;

    case 'android':

      let element1;
      await browser.$(allPageObjects.allPageAndroid[textBox]).then(async (ele) => {
        await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
          let wid; let hgt; let x1; let
            y1;
          element1 = ele;

          // get window size of the device

          await browser.getWindowSize().then(async (val) => {
            wid = val.width
            hgt = val.height
            // get element location
            await ele.getLocation().then(async (loc) => {
              x1 = Number(loc.x)
              y1 = Number(loc.y)
              // swipe up or down
              if (swipeDirection === 'up') {
                x2 = x1
                y2 = y1 - 200
              } else if (swipeDirection === 'down') {
                x2 = x1
                y2 = y1 + 200
              }
              for (let i = 0; i < value;) {
                await browser.touchAction([
                  { action: 'press', x: x1, y: y1 },
                  { action: 'wait', ms: 1000 },
                  { action: 'moveTo', x: x2, y: y2 },
                  { action: 'release' },
                ]).then(async () => {
                  i += 1
                }).catch((err) => {
                  msg = `Fail : Error in sliding the ${element} and error is ${err}`;
                  logger.error(msg);
                  assert.fail(msg);
                })

                if (i === Number(value)) { logger.info(`Pass : ${textBox} is set to ${value} units ${action}`); }
              }
            }).catch((err) => {
              msg = `Fail : Error in getting the ${textBox} location and error is ${err}`;
              logger.error(msg);
              assert.fail(msg)
            })
          }).catch((err) => {
            msg = `Fail : Error in getting the ${textBox} size and error is ${err}`;
            logger.error(msg);
            assert.fail(msg)
          });
        }).catch((e) => {
          msg = `Fail : Cannot find the element and the error is ${e}`;
          logger.error(msg);
          assert.fail(msg);
        })
      }).catch((err) => {
        logger.error(`Fail : couldnt find the element to set value ${textBox}`);
        assert.fail(`Fail : couldnt find the element to set value ${textBox}`)
      })

      //  Fetching the Date field and  storing inside an array
      await element1.getText().then(async (val) => {
        logger.trace('The text from Date field is ', val)
      }).catch((er) => {
        logger.debug('error in finding element for get Tex ', er)
        assert.fail(`error in finding element for get Text ${er}`);
      })

      break;

    default:
      break;
  }
}

const clearText = async (ele) => {
  let loc;

  switch (platform) {
    case 'ios':
      loc = allPageObjects.allPageiOS[ele];
      break;

    case 'android':
      loc = allPageObjects.allPageAndroid[ele];
      break;

    default:
      break;
  }

  await $(loc).then(async (element) => {
    await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
      await element.clearValue().then(async () => {
        logger.debug('The textbox from ', ele, ' is cleared')
      }).catch((err) => {
        logger.error(`error in clearing the text of the element ${ele}, ${err}`);
        assert.fail(`error in clearing the text of the element ${ele}, ${err}`)
      })
    }).catch((err) => {
      logger.fatal(`The element ${ele} is not visible after waiting for ${elementTimeOut} : ${ele}`)
      assert.fail(`The element ${ele} is not visible after waiting for ${elementTimeOut} : ${ele}`)
    })
  })
}

module.exports = {
  sendText,
  selectDate,
  clearText,
}
