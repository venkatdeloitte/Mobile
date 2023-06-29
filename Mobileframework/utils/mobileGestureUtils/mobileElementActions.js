// this file contains mobile actions related functions.

const assert = require('assert');

const platform = browser.config.platformIs;
const actionUtils = require('../actionUtils/index');
const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');
const swipeUtils = require('../actionUtils/Slide');

let msg = '';

const openNotifications = async () => {
  switch (platform) {
    case 'ios':
      await actionUtils.swipeForNotifications().then(() => {
        logger.info('Pass : Swiped down to see notifications')
      }).catch((err) => {
        msg = `Fail : Error in opening the notifications and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      });
      break;

    case 'android':
      await browser.openNotifications().then(() => {
        logger.info('Pass : Swiped down to see notifications')
      }).catch((err) => {
        msg = `Fail : Error in opening the notifications and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}
const androidNativeBack = async (ele) => {
  switch (platform) {
    case 'ios':
      await browser.$(allPageObjects.allPageiOS[ele]).then(async (value) => {
        await browser.waitUntil(async () => await value.isDisplayed() === true, elementTimeOut).then(async (isDis) => {
          if (isDis === true) {
            await value.click().then(async () => {
              // SS assert that the element is not displayed after tapping on it
              //  if it is displayed, log a warning stating please verify if it is the right behaviour
              if (await value.isDisplayed() === true) {
                logger.warn(`${ele} is still displayed after back action. Please verify if this behaviour is expected.`)
              }
              logger.info('Pass : successfully clicked on ', ele, 'to mimic back action in ios')
            }).catch((err) => {
              msg = `Fail : Cannot click on ${ele} to mimic back action in ios and error is ${err}`;
              logger.error(msg);
              assert.fail(msg);
            })
          } else {
            msg = `Fail : Cannot click on ${ele} to mimic back action in ios because its not displayed and error is ${err}`;
            logger.error(msg);
            assert.fail(msg)
          }
        }).catch((err) => {
          msg = `Fail : Cannot click on ${ele} to mimic back action in ios and error is ${err}`;
          logger.error(msg);
          assert.fail(msg)
        })
      }).catch((err) => {
        logger.fatal(`The element ${err} is not visible after waiting for ${elementTimeOut}`)
      })

      break;

    case 'android':

      await browser.back().then(async () => {
        await browser.pause(2000)
        logger.info('PASS : Successfully performed android native back button action')
      }).catch((err) => {
        msg = `FAIL: Cannot perform native back action and the error is ${err}`;
        logger.error(msg);
        assert.fail(msg);
      })
      break;
  }
}

const reOpenApp = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':

      await browser.execute('mobile: launchApp', { bundleId: browser.capabilities.bundleId }).then(() => {
        logger.info('Pass : app successfully relaunched')
      }).catch((err) => {
        msg = `Fail : Error in relaunching the app and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })
      break;

    case 'android':

      await browser.activateApp(browser.capabilities.appPackage).then(() => {
        logger.info('Pass : app successfully relaunched')
      }).catch((err) => {
        msg = `Fail : Error in relaunching the app and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const openSettings = async () => {
  skipScreenshotForTheStep = true;
  try {
    switch (platform) {
      case 'ios':

        await browser.execute('mobile: launchApp', { bundleId: 'com.apple.Preferences' }).then(() => {
          logger.info('Pass : Device setting lauched successfully')
        }).catch((err) => {
          msg = `Fail : Cannot launch Settings and error is ${err}`;
          logger.error(msg);
          assert.fail(msg);
        }).catch((err1) => {
          msg = `Fail : Error in finding the Settings ${err1}`;
          logger.error(msg);
          assert.fail(msg);
        })

        break;

      case 'android':

        await browser.startActivity('com.android.settings', 'com.android.settings.Settings').then(() => {
          logger.info('Pass : Device setting lauched successfully')
        }).catch((err) => {
          msg = `Fail : Cannot launch Settings and error is ${err}`;
          logger.error(msg);
          assert.fail(msg);
        }).catch((err) => {
          msg = `Fail : Error in finding the Settings ${err1}`;
          logger.error(msg);
          assert.fail(msg);
        })
        break;

      default:
        logger.fatal('platform specified doesnt match with ios or android');
        break;
    }
  } catch (err) {
    msg = `Fail : Cannot launch Settings and error is ${err}`;
    logger.error(msg);
    assert.fail(msg);
  }
}

const tapOutsideTheElement = async (ele) => {
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
  await $(locator).then(async (screen) => {
    await browser.waitUntil(async () => await screen.isDisplayed() === true, elementTimeOut).then(async () => {
      await browser.touchAction({

        // Please change the co-ordinates x to 300 and y to 100 if tap outside is not working
        // OR Please change the co-ordinates x to 300 and y to 1500 if tap outside is not working for big screen devices
        // OR  For iOS change x to 15 and y to 100.
        action: 'tap', x: 15, y: 100, element: screen.ELEMENT,
      }).then(() => {
        logger.info('Pass : tapped outside the element ', ele)
      }).catch((err) => {
        logger.error('error in tapping outside the element ', err);
        assert.fail('error in tapping outside the element ', err)
      })
    }).catch((er) => {
      logger.error(`The element ${ele} is not visible after waiting for ${elementTimeOut}`)
      assert.fail(`The element ${ele} is not visible after waiting for ${elementTimeOut}`)
    })
  }).catch((er) => {
    logger.fatal(`The element ${ele} is not found and the error is: ${er}`)
    assert.fail(`The element ${ele} is not found and the error is: ${er}`)
  })
}

const TurnOnOffInternet = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':

      await browser.$(allPageObjects.allPageiOS.wiFi).then(async (ele) => {
        // SS wait untill on ele
        await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
          await ele.click().then(async () => {
            await browser.$(allPageObjects.allPageiOS.wiFiOnOff).then(async (elem) => {
              // SS wait untill on ele and change the variable name
              await browser.waitUntil(async () => await elem.isDisplayed() === true, elementTimeOut).then(async () => {
                await elem.click().then(async () => {
                  // SS assert that the elemnt is not displayed after tapping on it
                  //  if it is displayed, log a warning stating please verify if it is the right behaviour
                  await browser.waitUntil(async () => await elem.isDisplayed() === true, elementTimeOut).then(async () => {
                    logger.info('Pass : Turned off WiFi')
                  }).catch((err) => {
                    msg = `Fail: Cannot turn off WiFi and error is ${err}`;
                    logger.error(msg);
                    assert.fail(msg)
                  })
                })
              }).catch((err) => {
                msg = `Fail: Cannot turn off WiFi and error is ${err}`;
                logger.error(msg);
                assert.fail(msg)
              })
            }).catch((err1) => {
              msg = `Fail: Cannot turn off WiFi and error is ${err1}`;
              logger.error(msg);
              assert.fail(msg)
            })
          }).catch((err1) => {
            msg = `Fail: Cannot toggle WiFi and error is ${err1}`;
            logger.error(msg);
            assert.fail(msg)
          })
        }).catch((errTimeOut2) => {
          msg = `Fail: Cannot toggle WiFi and error is 2 ${errTimeOut2}`;
          logger.error(msg);
          assert.fail(msg)
        })
      }).catch((err2) => {
        msg = `Fail: Cannot toggle WiFi and error is ${err2}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;
    case 'android':

      await browser.toggleWiFi().then(async () => {
        logger.info('Pass : Turned off WiFi')
      }).catch((err) => {
        msg = `Fail: Cannot toggle WiFi and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;
    default:
      logger.fatal(`The element ${ele1} is not visible after waiting for ${elementTimeOut}`)
      break;
  }
}

const clearNotification = async (count, ele1) => {
  count = count.toLowerCase();
  let isAll = false;
  let elementFound;

  switch (count) {
    case 'single':
      isAll = false;
      break;

    case 'all':
      isAll = true;
      break;
  }

  if (platform === 'ios') {
    locator = allPageObjects.allPageiOS[ele1]
  } else if (platform === 'android') {
    locator = allPageObjects.allPageAndroid[ele1];
  }

  await $(locator).then(async (elem) => {
    await browser.waitUntil(async () => await elem.isDisplayed() === true, elementTimeOut).then(async () => {
      elementFound = elem;
    }).catch((err) => {
      msg = `Fail : Error in finding the element ${ele1} after waiting for ${elementTimeOut} ms`;
      logger.error(msg);
      assert.fail(msg);
    })
  }).catch((err) => {
    msg = `Fail : Could not find the element and error is ${err}`;
    logger.error(msg);
    assert.fail(msg);
  });

  if (isAll === true) {
    await elementFound.click().then(() => {
      logger.info('Pass : cleared all notifications')
    })
  } else if (isAll === false) {
    switch (platform) {
      case 'ios':
        await swipeUtils.SwipeLeftOnElementByCoordinates(elementFound).then(async () => {
          await browser.$(allPageObjects.allPageiOS.clear).then(async (ele) => {
            // SS wait untill on ele
            await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
              ele.click().then(async () => {
                logger.info('Pass : Cleared push notification successfully')
                // SS assert that the elemnt is not displayed after tapping on it
                //  if it is displayed, log a warning stating please verify if it is the right behaviour
                if (await elementFound.isDisplayed() === true) {
                  logger.warn(`${ele1} is still displayed after clearing notification. Please verify if this behaviour is expected.`)
                }
              }).catch((err1) => {
                msg = `Fail : cannot tap on clear ${ele1} and the error is ${err1}`;
                logger.error(msg);
                assert.fail(msg)
              })
            }).catch((err2) => {
              msg = `Fail : cannot clear ${ele1} and the error is ${err2}`;
              logger.error(msg);
              assert.fail(msg)
            })
          }).catch((err3) => {
            msg = `Fail : cannot clear ${ele1} and the error is ${err3}`;
            logger.error(msg);
            assert.fail(msg)
          })
        }).catch((err4) => {
          msg = `Fail : cannot clear ${ele1} and the error is ${err4}`;
          logger.error(msg);
          assert.fail(msg)
        })
        break;

      case 'android':
        await swipeUtils.SlideOnElement(ele1, 'left').then(async () => {
          logger.info('Pass : Cleared push notification successfully')
        }).catch((err) => {
          msg = `Fail : cannot tap on clear ${ele1} and the error is ${err}`;
          logger.error(msg);
          assert.fail(msg)
        })
        break;

      default:
        logger.fatal('platform specified doesnt match with ios or android');
        break;
    }
  }
}

const toggleBluetooth = async (action) => {
  skipScreenshotForTheStep = true;
  action = action.toLowerCase()
  let cmd;
  let msg;
  switch (platform) {
    case 'ios':
      openSettings();
      await browser.$(allPageObjects.allPageiOS.deviceBluetooth).then(async (element1) => {
        // SS wait untill on element1
        await browser.waitUntil(async () => await element1.isDisplayed() === true, elementTimeOut).then(async () => {
          await element1.click().then(async () => {
            await browser.$(allPageObjects.allPageiOS.bluetoothOnOff).then(async (element2) => {
            // SS wait untill on element2
              await browser.waitUntil(async () => await element2.isDisplayed() === true, elementTimeOut).then(async () => {
                await element2.getAttribute('value').then(async (value) => {
                  switch (action) {
                    case 'on':
                      if (value === '1') {
                        logger.debug('Bluetooth is already turned on!!')
                      } else {
                        await element2.click().then(async () => {
                          // SS assert that the elemnt is not displayed after tapping on it
                          // also verify the attributeValue is toggled from what it was before
                          await browser.waitUntil(async () => await element2.isDisplayed() === true, elementTimeOut).then(async () => {
                            await browser.waitUntil(async () => await element2.getAttribute('value') === '1', elementTimeOut).then(async () => {
                              logger.info(`Pass : Turned ${action} bluetooth`)
                            }).catch((e) => {
                              logger.error(`Fail : Cannot toggle bluetooth and error is ${err}`)
                              assert.fail(`Fail : Cannot toggle bluetooth and error is ${err}`);
                            })
                          }).catch((err) => {
                            msg = `Fail: Cannot toggle bluetooth and error is ${err}`;
                            logger.error(msg);
                            assert.fail(msg);
                          })
                        }).catch((err) => {
                          msg = `Fail: Cannot toggle bluetooth and error is ${err}`;
                          logger.error(msg);
                          assert.fail(msg);
                        })
                      }
                      break;
                    case 'off':
                      if (value === '0') {
                        logger.debug('Bluetooth is already turned off!!')
                      } else {
                        await element2.click().then(async () => {
                          // SS assert that the elemnt is not displayed after tapping on it
                          // also verify the attributeValue is toggled from what it was before
                          await browser.waitUntil(async () => await element2.isDisplayed() === true, elementTimeOut).then(async () => {
                            await browser.waitUntil(async () => await element2.getAttribute('value') === '0', elementTimeOut).then(async () => {
                              logger.info(`Pass : Turned ${action} bluetooth`)
                            }).catch((e) => {
                              logger.error(`Fail : Cannot toggle bluetooth and error is ${err}`)
                              assert.fail(`Fail : Cannot toggle bluetooth and error is ${err}`);
                            })
                          }).catch((err) => {
                            msg = `Fail: Cannot toggle bluetooth and error is ${err}`;
                            logger.error(msg);
                            assert.fail(msg)
                          })
                        }).catch((err) => {
                          msg = `Fail: Cannot toggle bluetooth and error is ${err}`;
                          logger.error(msg);
                          assert.fail(msg)
                        })
                      }
                      break;
                    default: logger.fatal('Please give correct bluetooth action')
                      break;
                  }
                })
              }).catch((er) => {
                msg = `Fail: Cannot find bluetooth toggle button and error is ${er}`
                assert.fail(msg)
              })
            }).catch((er) => {
              msg = `Fail: Cannot find bluetooth toggle button and error is ${er}`
              assert.fail(msg)
            })
          }).catch((err1) => {
            msg = `Fail: Cannot tap on bluetooth settings and error is ${err1}`
            logger.error(msg);
            assert.fail(msg)
          })
        }).catch((timeOutErEle1) => {
          msg = `Fail: Cannot find bluetooth settings and error is ${timeOutErEle1}`
          assert.fail(msg)
        })
      }).catch((err) => {
        msg = `Fail: Cannot find bluetooth settings and error is ${err}`
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    case 'android':
      if (action !== 'on' && action !== 'off') {
        logger.error('Fail : The bluetooth action should be either on or off')
      } else {
        if (action === 'on') {
          cmd = 'am start -a android.bluetooth.adapter.action.REQUEST_ENABLE'
          msg = 'Enabled'
        } else if (action === 'off') {
          cmd = 'am start -a android.bluetooth.adapter.action.REQUEST_DISABLE'
          msg = 'Disabled'
        }

        await browser.execute('mobile: shell', { command: cmd }).then(async () => {
          logger.info(`Pass : ${msg}  bluetooth in the device`)
          await browser.$(allPageObjects.allPageAndroid.allowBluetooth).then(async (ele) => {
            // SS wait untill on ele
            await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
              logger.info('Pass : allowBluetooth element popup displayed');
              await ele.click().then(async () => {
                logger.info('Pass : Clicked on allow button for bluetooth pop-up');
                // SS assert that the elemnt is not displayed after tapping on it
                // if it is displayed, log a warning stating please verify if it is the right behaviour
                if (await ele.isDisplayed() === true) {
                  logger.warn('Bluetooth pop up is still displayed after toggling bluetooth. Please verify if this behaviour is expected.')
                }
              }).catch((err1) => {
                logger.error(`Fail : Cannot click on pop-up and error is ${err1}`);
                assert.fail(`Fail : Cannot click on pop-up and error is ${err1}`)
              })
            }).catch((timeOutErr) => {
              logger.error(`Fail : allowBluetooth element popup is not displayed and error is ${timeOutErr}`);
              assert.fail(`Fail : allowBluetooth element popup is not displayed and error is ${timeOutErr}`)
            })
          }).catch((err2) => {
            logger.error(`Fail : allowBluetooth element popup is not displayed and error is ${err2}`);
            assert.fail(`Fail : allowBluetooth element popup is not displayed and error is ${err2}`)
          })
        }).catch((err) => {
          logger.error(`Fail : Bluetooth cannot be ${msg} and error is ${err}`);
          assert.fail(`Fail : Bluetooth cannot be ${msg} and error is ${err}`)
        })
      }

      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const toggleLocationAndroid = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':

      break;

    case 'android':
      await browser.toggleLocationServices().then(() => {
        logger.info('Pass : Toggled location')
      }).catch((err) => {
        msg = `Fail: Cannot toggle and error is ${err}`
        assert.fail(msg)
      })

      break;

    default:
      break;
  }
}

module.exports = {
  openNotifications,
  androidNativeBack,
  openSettings,
  reOpenApp,
  tapOutsideTheElement,
  TurnOnOffInternet,
  clearNotification,
  toggleBluetooth,
  toggleLocationAndroid,
}
