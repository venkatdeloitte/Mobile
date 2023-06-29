/* eslint-disable no-useless-concat */
const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');

const platform = browser.config.platformIs;
const DotEnvProperties = require('../DotEnvProperties');
const dotEnvProperties = new DotEnvProperties();
const androidplatformversion = dotEnvProperties.androidPlatformVersion;
const iosplatformVersion = dotEnvProperties.iOSPlatformVersion;
const assert = require('assert')
const tapUtil = require('./Tap')
const testData = require('../assertionUtils/writeInTestData')
const jsQR = require('jsqr');
const fs = require('fs');


let msg = '';
const enterTextutil = require('./enterText')
const swipeUtil = require('./Slide');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');
const mobileActionUtil = require('../mobileGestureUtils/mobileElementActions');
const { SIGKILL } = require('constants');

const prevTimeZone = 'prevTimeZone';
const newTimeZone = 'newTimeZone';

const putAppInBackground = async () => {
  skipScreenshotForTheStep = true;
  await browser.background(5).then(async () => {
    logger.info('Pass : App in background')
  }).catch((e) => {
    msg = `Fail : Error in put the App in background and error is ${e}`;
    logger.error(msg);
    assert.fail(msg)
  })
}

const launchApp = async () => {
  switch (platform) {
    case 'ios':
      await browser.execute('mobile: launchApp', { bundleId: browser.capabilities.bundleId }).then(() => {
        logger.info('Pass : App launched successfully')
      }).catch((err) => {
        msg = `Fail : App could not be launched and err is ${err}`
        logger.error1(msg);
        assert.fail(msg)
      })

      break;

    case 'android':

      await browser.launchApp().then(async () => {
        logger.info('Pass : App launched successfully')
      }).catch((err) => {
        msg = `Fail : App could not be launched and err is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const killApp = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':

      await browser.execute('mobile: terminateApp', { bundleId: browser.capabilities.bundleId }).then(() => {
        logger.info('Pass : app killed successfully')
      }).catch((err) => {
        msg = `Fail : Error in killing app and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    case 'android':

      await browser.closeApp().then(async () => {
        logger.info('Pass : app killed successfully')
      }).catch((err) => {
        msg = `Fail : App could not be killed and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const uninstallApp = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':

      await browser.execute('mobile: removeApp', { bundleId: browser.capabilities.bundleId }).then(() => {
        logger.info('Pass : app uninstalled successfully')
      }).catch((err) => {
        msg = `Fail : App could not be uninstalled and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    case 'android':

      await browser.removeApp(browser.capabilities.appPackage).then(async () => {
        logger.info('Pass : app uninstalled successfully')
      }).catch((err) => {
        msg = `Fail : App could not be uninstalled and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    default:
      break;
  }
}

const reinstallApp = async () => {
  skipScreenshotForTheStep = true;
  await browser.installApp(browser.capabilities.app).then(() => {
    logger.info('Pass : app Reinstalled successfully')
  }).catch((err) => {
    msg = `Fail : App could not be Reinstalled ${err}`;
    logger.error(msg);
    assert.fail(msg);
  });
}

const gotoDeviceTimeSettings = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':
      await killSettingsApp();
      await mobileActionUtil.openSettings();
      await swipeUtil.swipeScreen('up');
      await browser.$(allPageObjects.allPageiOS.deviceSettingsSearch).then(async (ele) => {
        // SS wait untill on ele
        await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
          await ele.setValue('Date time').then(async () => {
            await browser.$$(allPageObjects.allPageiOS.deviceDateFields).then(async (date) => {
            // SS wait untill on date[0]
              await browser.waitUntil(async () => await date[0].isDisplayed() === true, elementTimeOut).then(async () => {
                await date[0].click().then(async () => {
                  logger.info('Pass: Navigated to device Date and Time settings')
                  elem = allPageObjects.allPageiOS.setAutomatically;
                  await browser.waitUntil(async () => await $(elem).then(async (element) => element.isDisplayed()) === true, elementTimeOut).then(async () => {
                    logger.info('Pass: navigated to date settings of the device')
                  }).catch((err) => {
                    logger.error(`Fail : cannot navigate to date settings and error is ${err}`)
                    assert.fail(`Fail : cannot navigate to date settings and error is ${err}`)
                  })
                }).catch((click) => {
                  logger.error(`Fail : cannot navigate to date settings and error is ${click}`)
                  assert.fail(`Fail : cannot navigate to date settings and error is ${click}`)
                })
              }).catch((err) => {
                logger.error(`Fail : cannot find device date field and error is ${err}`)
                assert.fail(`Fail : cannot find device date field and error is ${err}`)
              })
            }).catch((err) => {
              logger.error(`Fail : cannot find device date field and error is ${err}`)
              assert.fail(`Fail : cannot find device date field and error is ${err}`)
            })
          }).catch((er) => {
            logger.error(`Fail : cannot search for date settings and error is ${er}`);
            assert.fail(`Fail : cannot search for date settings and error is ${er}`)
          })
        }).catch((e) => {
          logger.error(`Fail : cannot find device Settings Search field and error is ${searchErr}`);
          assert.fail(`Fail : cannot find device Settings Search field and error is ${searchErr}`)
        })
      }).catch((searchErr) => {
        logger.error(`Fail : cannot find device Settings Search field and error is ${searchErr}`);
        assert.fail(`Fail : cannot find device Settings Search field and error is ${searchErr}`)
      })
      break;

    case 'android':

      const args = [
        'start',
        '-a', 'android.intent.action.QUICK_CLOCK',
      ];
      await browser.execute('mobile: shell', { command: 'am', args }).then(() => {
        logger.info('Pass : navigated to device date and time settings ')
      }).catch((err) => {
        logger.error(`Fail : cannot navigate to device date and time settings and error is ${err}`);
        assert.fail(`Fail : cannot navigate to device date and time settings and error is ${err}`)
      })

      break;

    default:
      break;
  }
}

const changeDeviceTime = async (timeInput) => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':
      await changeDeviceTimeiOS(timeInput);
      break;

    case 'android':
      await changeDeviceTimeAndroid(timeInput);
      break;
  }
}
const changeDeviceTimeAndroid = async (timeInput) => {
  let timeInputIsInvalid = false;
  let hour; let minute; let
    meridien;

  let inputHour; let inputMinute; let
    inputMeridien;

  if (timeInput.includes(' ') !== true) {
    timeInputIsInvalid = true
  } else if (timeInput.includes(':') !== true) { timeInputIsInvalid = true; }

  if (timeInputIsInvalid === false) {
    const timeInputArr = timeInput.split(' ');
    const splitted = timeInputArr[0].split(':');
    inputHour = splitted[0];
    inputMinute = splitted[1];

    inputMeridien = timeInputArr[1];
  }

  await browser.$(allPageObjects.allPageAndroid.androidSetTime).then(async (ele) => {
    // SS wait untill on ele
    await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
      await ele.click().then(() => {
        logger.debug('Navigated to date and time settings page')
      })

      // fetch hour
      await browser.$(allPageObjects.allPageAndroid.deviceTimeHour).then(async (hourVal) => {
      // SS wait untill on hourVal
        await browser.waitUntil(async () => await hourVal.isDisplayed() === true, elementTimeOut).then(async () => {
          await hourVal.getAttribute('text').then((value) => {
            const valHour = value.split(',');
            hour = valHour[0];
          })
        }).catch((err) => {
          logger.error(`Fail: Cant find deviceTimeHour in android and error is ${err}`);
          assert.fail(`Fail: Cant find deviceTimeHour in android and error is ${err}`);
        })
      })
      //  fetch minute

      await browser.$(allPageObjects.allPageAndroid.deviceTimeMinute).then(async (minuteVal) => {
      // SS wait untill on minuteVal
        await browser.waitUntil(async () => await minuteVal.isDisplayed() === true, elementTimeOut).then(async () => {
          await minuteVal.getAttribute('text').then((value) => {
            const valMinute = value.split(',');
            minute = valMinute[0];
          })
        }).catch((err) => {
          logger.error(`Fail: Cant find deviceTimeMinute in android and error is ${err}`);
          assert.fail(`Fail: Cant find deviceTimeMinute in android and error is ${err}`);
        })
      })
      // fetch meridien

      await browser.$(allPageObjects.allPageAndroid.deviceTimeMeridien).then(async (meridienVal) => {
      // SS wait untill on meridienVal
        await browser.waitUntil(async () => await meridienVal.isDisplayed() === true, elementTimeOut).then(async () => {
          await meridienVal.getAttribute('text').then((value) => {
            const valMeridien = value.split(',');
            meridien = valMeridien[0];
          })
        }).catch((err) => {
          logger.error(`Fail: Cant find deviceTimeMeridien in android and error is ${err}`);
          assert.fail(`Fail: Cant find deviceTimeMeridien in android and error is ${err}`);
        })
      })
    }).catch((err) => {
      logger.error(`Fail: Cant find androidSetTime in android and error is ${err}`);
      assert.fail(`Fail: Cant find androidSetTime in android and error is ${err}`);
    })
  }).catch((err) => {
    logger.error('Fail: Cant tap on Set Time in android');
    assert.fail('Fail: Cant tap on Set Time in android');
  })

  //  get units to scroll
  let diff = Number(hour) - Number(inputHour);
  let action;
  if (diff < 0) {
    action = 'next';
  } else if (diff > 0) {
    action = 'previous';
  }
  diff = Math.abs(diff);

  if (diff !== 0) { await enterTextutil.selectDate('deviceTimeHour', diff, action); }

  diff = Number(minute) - Number(inputMinute);
  if (diff < 0) {
    action = 'next';
  } else if (diff > 0) {
    action = 'previous';
  }
  diff = Math.abs(diff);

  await enterTextutil.selectDate('deviceTimeMinute', diff, action);

  if (inputMeridien === meridien) {
    action = 'previous';
    diff = 0;
  } else if (inputMeridien === 'AM' && meridien === 'PM') {
    action = 'previous';
    diff = 1;
  } else if (inputMeridien === 'PM' && meridien === 'AM') {
    action = 'next';
    diff = 1;
  }

  if (diff !== 0) {
    await enterTextutil.selectDate('deviceTimeMeridien', diff, action);
    await browser.$(allPageObjects.allPageAndroid.deviceTimeDone).then(async (el) => {
      // SS wait untill on el
      await browser.waitUntil(async () => await el.isDisplayed() === true, elementTimeOut).then(async () => {
        await el.click().then(() => {
          logger.trace('saved the changed time')
        })
      }).catch((err) => {
        logger.error(`Fail: Cant find deviceTimeDone in android and error is ${err}`);
        assert.fail(`Fail: Cant find deviceTimeDone in android and error is ${err}`);
      })
    })
  } else {
    await browser.$(allPageObjects.allPageAndroid.deviceTimeDone).then(async (el) => {
      // SS wait untill on el
      await browser.waitUntil(async () => await el.isDisplayed() === true, elementTimeOut).then(async () => {
        await el.click().then(() => {
          logger.trace('saved the changed time')
        })
      }).catch((err) => {
        logger.error(`Fail: Cant find deviceTimeDone in android and error is ${err}`);
        assert.fail(`Fail: Cant find deviceTimeDone in android and error is ${err}`);
      })
    })
  }
}

const changeDeviceTimeiOS = async (timeInput) => {
  //  verify timeInput syntax

  let timeInputIsInvalid = false;
  const timeInputArr = [];
  let hour; let minute; let
    meridien;

  let inputHour; let inputMinute; let
    inputMeridien;

  if (timeInput.includes(' ') !== true) {
    timeInputIsInvalid = true
  } else if (timeInput.includes(':') !== true) { timeInputIsInvalid = true; }

  if (timeInputIsInvalid === false) {
    const timeInputArr = timeInput.split(' ');
    const splitted = timeInputArr[0].split(':');
    inputHour = splitted[0];
    inputMinute = splitted[1];

    inputMeridien = timeInputArr[1];
  }

  await browser.$(allPageObjects.allPageiOS.datePicker).then(async (ele) => {
    // SS wait untill on ele
    await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
      await ele.click().then(() => {
        logger.debug('Navigated to date and time settins page')
      })
    }).catch((err) => {
      logger.error(`Fail: Cant find datePicker and error is ${err}`);
      assert.fail(`Fail: Cant find datePicker and error is ${err}`);
    })
    // fetch hour

    await browser.$(allPageObjects.allPageiOS.deviceTimeHour).then(async (hourVal) => {
      // SS wait untill on hourVal
      await browser.waitUntil(async () => await hourVal.isDisplayed() === true, elementTimeOut).then(async () => {
        await hourVal.getAttribute('value').then((value) => {
          const valHour = value.split(' ');
          hour = valHour[0];
        })
      }).catch((err) => {
        logger.error(`Fail: Cant find deviceTimeHour and error is ${err}`);
        assert.fail(`Fail: Cant find deviceTimeHour and error is ${err}`);
      })
    })
    //  fetch minute

    await browser.$(allPageObjects.allPageiOS.deviceTimeMinute).then(async (minuteVal) => {
      // SS wait untill on minuteVal
      await browser.waitUntil(async () => await minuteVal.isDisplayed() === true, elementTimeOut).then(async () => {
        await minuteVal.getAttribute('value').then((value) => {
          const valMinute = value.split(' ');
          minute = valMinute[0];
        })
      }).catch((err) => {
        logger.error(`Fail: Cant find deviceTimeMinute and error is ${err}`);
        assert.fail(`Fail: Cant find deviceTimeMinute and error is ${err}`);
      })
    })
    // fetch meridien

    await browser.$(allPageObjects.allPageiOS.deviceTimeMeridien).then(async (meridienVal) => {
      // SS wait untill on meridienVal
      await browser.waitUntil(async () => await meridienVal.isDisplayed() === true, elementTimeOut).then(async () => {
        await meridienVal.getAttribute('value').then((value) => {
          meridien = value
        })
      }).catch((err) => {
        logger.error(`Fail: Cant find deviceTimeMeridien and error is ${err}`);
        assert.fail(`Fail: Cant find deviceTimeMeridien and error is ${err}`);
      })
    })
  }).catch((err) => {
    logger.error('Fail : cant tap')
  })

  //  get units to scroll
  let diff = Number(hour) - Number(inputHour);
  let action;
  if (diff < 0) {
    action = 'next';
  } else if (diff > 0) {
    action = 'previous';
  }
  diff = Math.abs(diff);

  if (diff !== 0) { await enterTextutil.selectDate('deviceTimeHour', diff, action); }

  diff = Number(minute) - Number(inputMinute);
  if (diff < 0) {
    action = 'next';
  } else if (diff > 0) {
    action = 'previous';
  }
  diff = Math.abs(diff);

  await enterTextutil.selectDate('deviceTimeMinute', diff, action);

  if (inputMeridien === meridien) {
    action = 'previous';
    diff = 0;
  } else if (inputMeridien === 'AM' && meridien === 'PM') {
    action = 'previous';
    diff = 1;
  } else if (inputMeridien === 'PM' && meridien === 'AM') {
    action = 'next';
    diff = 1;
  }

  if (diff !== 0) { await enterTextutil.selectDate('deviceTimeMeridien', diff, action); }
}

const changeDeviceDateInAndroid = async (dateInput) => {
  let contentDesc = '';
  skipScreenshotForTheStep = true;
  const dateInputArr = dateInput.split(' ');
  const date = dateInputArr[1];
  const day = dateInputArr[0];

  await browser.$(allPageObjects.allPageAndroid.androidSetDate).then(async (ele) => {
    // SS wait untill on ele
    await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
      await ele.click().then(async () => {
        await browser.$(allPageObjects.allPageAndroid.androidDeviceCurrentDate).then(async (dateEle) => {
        // SS wait untill on dateEle
          await browser.waitUntil(async () => await dateEle.isDisplayed() === true, elementTimeOut).then(async () => {
            await dateEle.getAttribute('content-desc').then(async (val) => {
              const valArray = val.split(',');
              console.log(valArray);

              const monthFromDevice = valArray[1];

              const monthArr = monthFromDevice.split(' ');
              console.log('monthArr', monthArr)
              const month = monthArr[1];

              const year = val.split(',')[2];
              contentDesc = `${day}, ${month} ${date},${year}`;
              console.log(contentDesc);
              await browser.$(`${'//*[@content-desc=' + '\''}${contentDesc}'` + ']').then(async (newDate) => {
              // SS wait untill on newDate
                await browser.waitUntil(async () => await newDate.isDisplayed() === true, elementTimeOut).then(async () => {
                  await newDate.click().then(async () => {
                    logger.trace(`changed the date to ${date}`);
                    await browser.$(allPageObjects.allPageAndroid.deviceTimeDone).then(async (el) => {
                    // SS wait untill on el
                      await browser.waitUntil(async () => await el.isDisplayed() === true, elementTimeOut).then(async () => {
                        await el.click().then(async () => {
                          logger.trace('saved the changed date')
                          // SS assert el is not displayed again after clicking
                          await browser.waitUntil(async () => await el.isDisplayed() === false, elementTimeOut).then(async () => {
                          }).catch((err) => {
                            logger.error(`Fail: deviceTimeDone is displayed and error is ${err}`);
                            assert.fail(`Fail: deviceTimeDone is displayed and error is ${err}`);
                          })
                        })
                      }).catch((err) => {
                        logger.error(`Fail: Cant find deviceTimeDone and error is ${err}`);
                        assert.fail(`Fail: Cant find deviceTimeDone and error is ${err}`);
                      })
                    })
                  })
                }).catch((err) => {
                  logger.error(`Fail: Cant find newDate and error is ${err}`);
                  assert.fail(`Fail: Cant find newDate and error is ${err}`);
                })
              })
            })
          }).catch((err) => {
            logger.error(`Fail: Cant find androidDeviceCurrentDate and error is ${err}`);
            assert.fail(`Fail: Cant find androidDeviceCurrentDate and error is ${err}`);
          })
        })
      })
    }).catch((err) => {
      logger.error(`Fail: Cant find androidSetDate and error is ${err}`);
      assert.fail(`Fail: Cant find androidSetDate and error is ${err}`);
    })
  })
}

const unpairDevice = async () => {
  skipScreenshotForTheStep = true;
  await browser.$(allPageObjects.allPageAndroid.deviceDetails).then(async (ele) => {
    // SS wait untill on ele
    await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
      await ele.click().then(async () => {
        await browser.$(allPageObjects.allPageAndroid.deviceUnpair).then(async (ele1) => {
        // SS wait untill on ele1
          await browser.waitUntil(async () => await ele1.isDisplayed() === true, elementTimeOut).then(async () => {
            await ele1.click().then(async () => {
              logger.trace('device unpaired successfully...')
              // SS assert that ele1 is not displayed after tapping on it
              await browser.waitUntil(async () => await ele1.isDisplayed() === false, elementTimeOut).then(async () => {
              }).catch((er) => {
                logger.error(`unpair button is displayed and error is : ${er} `)
                assert.fail(`unpair button is displayed and error is : ${er} `)
              })
            }).catch((error) => {
              logger.error(`couldnt tap on unpair button and error is : ${error} `)
              assert.fail(`couldnt tap on unpair button and error is : ${error} `)
            })
          }).catch((er) => {
            logger.error(`couldnt find unpair button and error is : ${er} `)
            assert.fail(`couldnt find unpair button and error is : ${er} `)
          })
        }).catch((er) => {
          logger.error(`couldnt find unpair button and error is : ${er} `)
          assert.fail(`couldnt find unpair button and error is : ${er} `)
        })
      }).catch((err) => {
        logger.error(`couldnt tap on deviceDetails button and error is : ${err} `)
        assert.fail(`couldnt tap on deviceDetails button and error is : ${err} `)
      })
    }).catch((error1) => {
      logger.error(`couldnt find deviceDetails button and error is : ${error1} `)
      assert.fail(`couldnt find deviceDetails button and error is : ${error1} `)
    })
  }).catch((error1) => {
    logger.error(`couldnt find deviceDetails button and error is : ${error1} `)
    assert.fail(`couldnt find deviceDetails button and error is : ${error1} `)
  })
}

const pressHomeButton = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':
      await browser.execute('mobile: pressButton', { name: 'home' }).then(() => {
        logger.info('Pass: Pressed the home button successfully')
      }).catch((err) => {
        msg = `Fail : Could not press the home button and err is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;
    case 'android':
      const args = [
        'keyevent',
        ' KEYCODE_HOME',
      ];

      await browser.execute('mobile: shell', { command: 'input', args }).then(async () => {
        logger.info(' Pass: Pressed the home button successfully ');
      }).catch((error1) => {
        logger.error(`Fail: error in executing shell command and the error is  ${error1}`);
        assert.fail(`Fail: error in executing shell command and the error is  ${error1}`);
      })
  }
}

const isNotificationEnabledOrDisabled = async (state, appName) => {
  skipScreenshotForTheStep = true;
  state = state.toLowerCase();

  await browser.$(allPageObjects.allPageiOS.notifications).then(async (element) => {
    // SS wait untill on element
    await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
      await element.click().then(async () => {
        await swipeUtil.swipeScreen('down').then(async () => {
          await browser.$(allPageObjects.allPageiOS[appName]).then(async (ele) => {
          // SS wait untill on ele
            await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
              await ele.click().then(async () => {
                await browser.$(allPageObjects.allPageiOS.allowNotifications).then(async (allowNotificationsVal) => {
                  // SS wait untill on allowNotificationsVal
                  await browser.waitUntil(async () => await allowNotificationsVal.isDisplayed() === true, elementTimeOut).then(async () => {
                    await allowNotificationsVal.getAttribute('value').then((value) => {
                      if ((state === 'disabled' && value === '0') || (state === 'enabled' && value === '1')) {
                        logger.info(`Pass :  notifications are ${state} and the value attribute for allow notifications is ${value}`);
                      } else if ((state === 'disabled' && value === '1') || (state === 'enabled' && value === '0')) {
                        logger.error(`Fail : notifications are not ${state} and the value attribute for allow notifications is ${value}`);
                        assert.fail(`Fail : notifications are not ${state} and the value attribute for allow notifications is ${value}`);
                      }
                    })
                  }).catch((err) => {
                    logger.debug(`could not find the element and error is : ${err} `);
                    assert.fail(`could not find the element and error is : ${err} `)
                  })
                }).catch((err) => {
                  logger.debug(`could not find the element and error is : ${err} `);
                  assert.fail(`could not find the element and error is : ${err} `)
                })
              }).catch((error) => {
                logger.debug(`Fail : cannot navigate to app notifications and error is ${error}`);
                assert.fail(`Fail : cannot navigate to app notifications and error is ${error}`)
              })
            }).catch((err) => {
              logger.debug(`Fail : cannot find app name in app list and error is ${err}`);
              assert.fail(`Fail : cannot find app name in app list and error is ${err}`)
            })
          }).catch((err) => {
            logger.debug(`Fail : cannot find app name in app list and error is ${err}`);
            assert.fail(`Fail : cannot find app name in app list and error is ${err}`)
          })
        }).catch((swipeErr) => {
          logger.debug(`Fail : cannot swipe and error is ${swipeErr}`);
          assert.fail(`Fail : cannot swipe and error is ${swipeErr}`)
        })
      }).catch((er) => {
        logger.debug(`Fail : cannot tap on notifications and error is ${er}`);
        assert.fail(`Fail : cannot tap on notifications and error is ${er}`)
      })
    }).catch((searchErr) => {
      logger.error(`Fail : cannot find Notifications field and error is ${searchErr}`);
      assert.fail(`Fail : cannot find Notifications field and error is ${searchErr}`)
    })
  }).catch((searchErr) => {
    logger.error(`Fail : cannot find Notifications field and error is ${searchErr}`);
    assert.fail(`Fail : cannot find Notifications field and error is ${searchErr}`)
  })
}

const killSettingsApp = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':

      await browser.execute('mobile: terminateApp', { bundleId: 'com.apple.Preferences' }).then(() => {
        logger.info('Pass : Settings app killed successfully')
      }).catch((err) => {
        msg = `Fail : Error in killing Settings app and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    case 'android':

      await browser.execute('mobile: shell', { command: 'am force-stop com.android.settings' }).then(() => {
        logger.info('Pass : Settings app killed successfully')
      }).catch((err) => {
        msg = `Fail : Settings App could not be killed and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })

      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const forceCloseRecentApps = async () => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':
      break;
    case 'android':
      const args = [
        'keyevent',
        ' KEYCODE_APP_SWITCH',
      ];

      await browser.execute('mobile: shell', { command: 'input', args }).then(async () => {
        await browser.$(allPageObjects.allPageAndroid.closeAllApps).then(async (value) => {
          // SS wait untill on value
          await browser.waitUntil(async () => await value.isDisplayed() === true, elementTimeOut).then(async () => {
            await value.click().then(async () => {
            // SS assert value is not displayed after clicking on it
              await browser.waitUntil(async () => await value.isDisplayed() === false, elementTimeOut).then(async () => {
                logger.info('Pass : Closed all the recent apps');
              }).catch((er1) => {
                logger.debug(`close all button is displayed and error is ${er1}`)
                assert.fail(`close all button is displayed and error is ${er1}`);
              })
            }).catch((er1) => {
              logger.debug(`error in clicking the close all button ${er1}`)
              assert.fail(`error in clicking the close all button ${er1}`);
            })
          }).catch((err1) => {
            logger.debug(`error in finding the element ${err1}`)
            assert.fail(`error in finding the element ${err1}`);
          })
        }).catch((err1) => {
          logger.debug(`error in finding the element ${err1}`)
          assert.fail(`error in finding the element ${err1}`);
        })
      }).catch((error1) => {
        logger.error(`error in executing shell command and the error is  ${error1}`);
        assert.fail(`error in executing shell command and the error is  ${error1}`);
      })

      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const accepAlertIniOS = async (action) => {
  action = action.toLowerCase();

  switch (action) {
    case 'accept':

      await browser.acceptAlert().then(() => {
        logger.info('Pass : Alert is closed by accepting')
      }).catch((err) => {
        logger.error('couldnt accept the alert');
        assert.fail('couldnt accept the alert')
      })
      break;

    case 'dismiss':
      await browser.dismissAlert().then(() => {
        logger.info('Pass : Succesfully dismissed the alert')
      }).catch((err) => {
        logger.error('FAIL : Error in dismissing the alert');
        assert.fail('FAIL : Error in dismissing the alert')
      })
      break;

    default:

      await browser.acceptAlert().then(() => {
        logger.info('Pass : Alert is closed by accepting')
      }).catch((err) => {
        logger.error('couldnt accept the alert');
        assert.fail('couldnt accept the alert')
      })
      break;
  }
}

const isBluetoothEnabledOrDisabled = async (state, appName) => {
  skipScreenshotForTheStep = true;
  state = state.toLowerCase();

  await swipeUtil.swipeScreen('down').then(async () => {
    await swipeUtil.swipeScreen('down').then(async () => {
      await swipeUtil.swipeScreen('down').then(async () => {
        await browser.$(allPageObjects.allPageiOS[appName]).then(async (ele) => {
        // SS wait untill on ele
          await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
            await ele.click().then(async () => {
              await browser.$(allPageObjects.allPageiOS.bluetoothAccess).then(async (bluetoothVal) => {
                // SS wait untill on bluetoothVal
                await browser.waitUntil(async () => await bluetoothVal.isDisplayed() === true, elementTimeOut).then(async () => {
                  await bluetoothVal.getAttribute('value').then((value) => {
                    if ((state === 'disabled' && value === '0') || (state === 'enabled' && value === '1')) {
                      logger.info(`Pass :  bluetooth is ${state} and the value attribute for bluetooth access is ${value}`);
                    } else if ((state === 'disabled' && value === '1') || (state === 'enabled' && value === '0')) {
                      logger.error(`Fail : bluetooth is not ${state} and the value attribute for bluetooth access is ${value}`);
                      assert.fail(`Fail : bluetooth is not ${state} and the value attribute for bluetooth access is ${value}`);
                    }
                  })
                }).catch((err) => {
                  logger.debug(`could not find the element and error is : ${err} `);
                  assert.fail(`could not find the element and error is : ${err} `)
                })
              }).catch((err) => {
                logger.debug(`could not find the element and error is : ${err} `);
                assert.fail(`could not find the element and error is : ${err} `)
              })
            }).catch((error) => {
              logger.debug(`Fail : cannot navigate to app bluetooth settings and error is ${error}`);
              assert.fail(`Fail : cannot navigate to app bluetooth settings and error is ${error}`)
            })
          }).catch((err) => {
            logger.debug(`Fail : cannot find app name in app list and error is ${err}`);
            assert.fail(`Fail : cannot find app name in app list and error is ${err}`)
          })
        }).catch((err) => {
          logger.debug(`Fail : cannot find app name in app list and error is ${err}`);
          assert.fail(`Fail : cannot find app name in app list and error is ${err}`)
        })
      }).catch((swipeErr) => {
        logger.debug(`Fail : cannot swipe and error is ${swipeErr}`);
        assert.fail(`Fail : cannot swipe and error is ${swipeErr}`)
      })
    }).catch((er) => {
      logger.debug(`Fail : cannot swipe and error is ${er}`);
      assert.fail(`Fail : cannot swipe and error is ${er}`)
    })
  }).catch((er) => {
    logger.debug(`Fail : cannot swipe and error is ${er}`);
    assert.fail(`Fail : cannot swipe and error is ${er}`)
  })
}

const toggleNotification = async (action) => {
  skipScreenshotForTheStep = true;
  switch (platform) {
    case 'ios':
      await swipeUtil.swipeScreen('up');
      await browser.$(allPageObjects.allPageiOS.deviceSettingsSearch).then(async (ele) => {
        // SS wait untill on ele
        await browser.waitUntil(async () => await ele.isDisplayed() === true, elementTimeOut).then(async () => {
          await ele.setValue('myTempo').then(async () => {
            await browser.$(allPageObjects.allPageiOS.myTempo).then(async (value) => {
            // SS wait untill on value
              await browser.waitUntil(async () => await value.isDisplayed() === true, elementTimeOut).then(async () => {
                await value.click().then(async () => {
                  await browser.$(allPageObjects.allPageiOS.notificationBanner).then(async (elem) => {
                    // SS wait untill on ele and change varibale name ele to something else
                    await browser.waitUntil(async () => await elem.isDisplayed() === true, elementTimeOut).then(async () => {
                      await elem.click().then(async () => {
                        await browser.$(allPageObjects.allPageiOS.allowNotifications).then(async (val) => {
                          // SS wait untill on value
                          await browser.waitUntil(async () => await val.isDisplayed() === true, elementTimeOut).then(async () => {
                            await val.click().then(async () => {
                              // SS assert that val is not displayed after tapping on it
                              // Adding check to assert attribute value
                              if (action === 'enable') {
                                await browser.waitUntil(async () => await val.getAttribute('value') === '1', elementTimeOut).then(async () => {
                                  logger.info(`Pass: ${action} notification of  app`)
                                }).catch((err) => {
                                  logger.error(`Fail : Cannot toggle notification and error is ${err}`)
                                  assert.fail(`Fail : Cannot toggle notification and error is ${err}`);
                                })
                              } else if (action === 'disable') {
                                await browser.waitUntil(async () => await val.getAttribute('value') === '0', elementTimeOut).then(async () => {
                                  logger.info(`Pass: ${action} notification of  app`)
                                }).catch((err) => {
                                  logger.error(`Fail : Cannot toggle notification and error is ${err}`)
                                  assert.fail(`Fail : Cannot toggle notification and error is ${err}`);
                                })
                              }
                            }).catch((err) => {
                              logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
                              assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
                            })
                          }).catch((err) => {
                            logger.error(`Fail : cannot find allowNotifications and error is ${err}`);
                            assert.fail(`Fail : cannot find allowNotifications and error is ${err}`)
                          })
                        })
                      })
                    }).catch((err) => {
                      logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
                      assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
                    })
                  }).catch((err) => {
                    logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
                    assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
                  })
                }).catch((click) => {
                  logger.error(`Fail : cannot ${action} the notification and error is ${click}`);
                  assert.fail(`Fail : cannot ${action} the notification and error is ${click}`)
                })
              }).catch((err) => {
                logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
                assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
              })
            }).catch((err) => {
              logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
              assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
            })
          }).catch((err) => {
            logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
            assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
          })
        }).catch((err) => {
          logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
          assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
        })
      }).catch((err) => {
        logger.error(`Fail : cannot ${action} the notification and error is ${err}`);
        assert.fail(`Fail : cannot ${action} the notification and error is ${err}`)
      })
      break;
    case 'android':

      // Opening Apps from settings
      const args = [
        'start',
        '-a', ' android.settings.APPLICATION_SETTINGS',
      ];
      await browser.execute('mobile: shell', { command: 'am', args }).then(async () => {
        logger.info('Pass : navigated to device app settings ')
        // Clicking on Search icon
        await browser.$(allPageObjects.allPageAndroid.appSearch).then(async (value) => {
          // SS wait untill on value
          await browser.waitUntil(async () => await value.isDisplayed() === true, elementTimeOut).then(async () => {
            await value.click().then(async () => {
              logger.info('Pass : Clicked on search button ')
            }).catch((er1) => {
              logger.info(`Cannot click on search button andthe error is ${er1}`);
              assert.fail(`Cannot click on search button andthe error is ${er1}`);
            })
          }).catch((err2) => {
            logger.info(`Could not find the app Search icon and the error is ${err2}`);
            assert.fail(`Could not find the app Search icon and the error is ${err2}`);
          })
        }).catch((err2) => {
          logger.info(`Could not find the app Search icon and the error is ${err2}`);
          assert.fail(`Could not find the app Search icon and the error is ${err2}`);
        })

        await browser.$(allPageObjects.allPageAndroid.searchTextbox).then(async (val) => {
          // SS wait untill on value and change value to a diff variable name
          await browser.waitUntil(async () => await val.isDisplayed() === true, elementTimeOut).then(async () => {
            await val.setValue('myTempo').then(async () => {
              logger.info('Pass : Sent name of app in search ')
            }).catch((er3) => {
              logger.info(`Could not Send name of app in searcherror in ${er3}`);
              assert.fail(`Could not Send name of app in searcherror in ${er3}`);
            })
          }).catch((err4) => {
            logger.info(`error in ${err4}`);
            assert.fail(`error in ${err4}`);
          })
        }).catch((err4) => {
          logger.info(`error in ${err4}`);
          assert.fail(`error in ${err4}`);
        })
        await tapUtil.tapOnArrayOfElements('appSearchResult,appNotifications,notificationOnOff', browser)
      }).catch((er7) => {
        logger.info(`error in shell command ${er7}`);
        assert.fail(`error in shell command ${er7}`);
      })

      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

// SS after step would capture its screenshot also, make sure to skip it
const waitForTime = async (time) => {
  skipScreenshotForTheStep = true;
  const timeInput = time * 1000;
  await browser.pause(timeInput).then(() => {
    logger.info(`Info : Execution waited for ${time} seconds`)
  }).catch((err) => {
    logger.error(`Fail : Execution could not wait for ${time} seconds`)
    assert.fail(`Fail : Execution could not wait for ${time} seconds`)
  })
}

const changeTimezone = async (timeZone) => {
  skipScreenshotForTheStep = true;
  await killSettingsApp();
  await mobileActionUtil.openSettings();
  await gotoDeviceTimeSettings();
  const timeZoneChange = timeZone.toLowerCase();
  if (browser.config.params[prevTimeZone] !== undefined) {
    browser.config.params[prevTimeZone] = browser.config.params[newTimeZone];
  } else {
    browser.config.params[prevTimeZone] = 'india';
  }
  browser.config.params[newTimeZone] = timeZoneChange;
  switch (platform) {
    case 'ios':
      await browser.$(allPageObjects.allPageiOS.timeZone).then(async (element1) => {
        // SS wait untill on element1
        await browser.waitUntil(async () => await element1.isDisplayed() === true, elementTimeOut).then(async () => {
          await element1.click().then(async () => {
            await browser.$(allPageObjects.allPageiOS.timeZoneSearchBox).then(async (element2) => {
            // SS wait untill on element2
              await browser.waitUntil(async () => await element2.isDisplayed() === true, elementTimeOut).then(async () => {
                await element2.setValue(timeZone).then(async () => {
                  await browser.$(allPageObjects.allPageiOS.timeZoneResult).then(async (element2) => {
                    await element2.click().then(async () => {
                      // SS add assertion to make sure its clicked
                      elem = allPageObjects.allPageiOS.setAutomatically;
                      await browser.waitUntil(async () => await $(elem).then(async (element) => element.isDisplayed()) === true, elementTimeOut).then(async () => {
                        logger.info('Timezone changed successfully');
                      }).catch((err2) => {
                        logger.error(`Fail : timeZoneResult is still displayed and error is ${err2}`);
                        assert.fail(`Fail : timeZoneResult is still displayed and error is ${err2}`)
                      })
                    }).catch((err2) => {
                      logger.error(`Fail : Cannot tap timeZoneResult and error is ${err2}`);
                      assert.fail(`Fail : Cannot tap timeZoneResult and error is ${err2}`)
                    })
                  }).catch((errZone) => {
                    logger.error(`Fail : Cannot find timeZoneResult and error is ${errZone}`);
                    assert.fail(`Fail : Cannot find timeZoneResult and error is ${errZone}`)
                  })
                }).catch((err) => {
                  logger.err(`Fail : cannot set value of timeZone and error is ${err}`);
                  assert.fail(`cannot set value of timeZone and error is ${err}`)
                })
              }).catch((err1) => {
                logger.error(`Fail : Cannot find timeZoneSearchBox and error is ${err1}`);
                assert.fail(`Fail : Cannot find timeZoneSearchBox and error is ${err1}`)
              })
            }).catch((err1) => {
              logger.error(`Fail : Cannot find timeZoneSearchBox and error is ${err1}`);
              assert.fail(`Fail : Cannot find timeZoneSearchBox and error is ${err1}`)
            })
          }).catch((err2) => {
            logger.error(`Fail : Cannot tap timeZone and error is ${err2}`);
            assert.fail(`Fail : Cannot tap timeZone and error is ${err2}`)
          })
        }).catch((errZone) => {
          logger.error(`Fail : Cannot find timeZone and error is ${errZone}`);
          assert.fail(`Fail : Cannot find timeZone and error is ${errZone}`)
        })
      }).catch((errZone) => {
        logger.error(`Fail : Cannot find timeZone and error is ${errZone}`);
        assert.fail(`Fail : Cannot find timeZone and error is ${errZone}`)
      })
      break;

    case 'android':
      // Check whether time should be default
      if ((timeZoneChange === 'india') || (timeZoneChange === 'automatic')) {
        // Setting the default network provided timeZone
        cmdZone = 'settings put global auto_time_zone 1'
        cmdTime = 'settings put global auto_time 1'
        msgZone = 'Enable auto time zone settings'
        msgTime = 'Enable auto time settings'
        await browser.execute('mobile: shell', { command: cmdZone }).then(async () => { // Command to set the automatic timeZone to true
          logger.info(`Pass : ${msgZone} in the device`)
          await browser.execute('mobile: shell', { command: cmdTime }).then(async () => { // Command to set the automatic time to true
            logger.info(`Pass : ${msgTime} in the device`)
            const args = [
              'start',
              '-a', 'android.settings.DATE_SETTINGS',
            ];
            await browser.execute('mobile: shell', { command: 'am', args }).then(async () => {
              logger.info('Pass : navigated to device date and time zone settings ')
            }).catch((errSettings) => {
              logger.err(`Fail : cannot navigate to device date and time zone settings and error is ${errSettings}`);
              assert.fail(`Fail : cannot navigate to device date and time zone settings and error is ${errSettings}`)
            })
          }).catch((errTime) => {
            logger.error(`Fail : Cannot ${msgTime} and error is ${errTime}`);
            assert.fail(`Fail : Cannot ${msgTime} and error is ${errTime}`)
          })
        }).catch((errZone) => {
          logger.error(`Fail : Cannot ${msgZone} and error is ${errZone}`);
          assert.fail(`Fail : Cannot ${msgZone} and error is ${errZone}`)
        })
      } else { // Setting the specified custom timeZone
        cmdZone = 'settings put global auto_time_zone 0'
        cmdTime = 'settings put global auto_time 0'
        msgZone = 'Disable auto time zone settings'
        msgTime = 'Disable auto time settings'
        await browser.execute('mobile: shell', { command: cmdZone }).then(async () => { // Command to set the automatic timeZone to false
          logger.info(`Pass : ${msgZone} in the device`)
          await browser.execute('mobile: shell', { command: cmdTime }).then(async () => { // Command to set the automatic time to false
            logger.info(`Pass : ${msgTime} in the device`)
            const args = [
              'start',
              '-a', 'android.settings.DATE_SETTINGS',
            ];
            await browser.execute('mobile: shell', { command: 'am', args }).then(async () => { // Command to launch the time and timeZone device Settings
              logger.info('Pass : navigated to device date and time zone settings ')

              await browser.$(allPageObjects.allPageAndroid.timeZone).then(async (ele) => {
                await ele.click().then(() => { // Command to click on timeZone
                  logger.debug('Navigated to timezone settings page')
                }).catch((err) => {
                  logger.error(`Fail : cannot find timezone settings page and error is ${err}`)
                  assert.fail(`Fail : cannot find timezone settings page and error is ${err}`)
                })
                await browser.$(allPageObjects.allPageAndroid.timeZoneSearch).then(async (search) => {
                  await search.click().then(() => { // Command to click on Region for changing the timeZone
                    logger.debug('Navigated to timezone search page')
                  }).catch((err) => {
                    logger.error(`Fail : cannot click on timeZone search and error is ${err}`)
                    assert.fail(`Fail : cannot click on timeZone search and error is ${err}`)
                  })
                  await browser.$(allPageObjects.allPageAndroid.timeZoneSearchBox).then(async (val) => {
                    await val.setValue(timeZoneChange).then(() => { // Command to search for the specified region of timeZone
                      logger.debug('Displaying search results')
                    }).catch((err) => {
                      logger.error(`Fail : cannot search timezone and error is ${err}`)
                      assert.fail(`Fail : cannot search timezone and error is ${err}`)
                    })
                    await browser.$(allPageObjects.allPageAndroid.timeZoneResult).then(async (res) => {
                      await res.click().then(async () => { // Command to click on the country search results of the specified timeZone
                        logger.debug(`Clicked on the ${timeZoneChange} timezone from the result`)
                      }).catch((err) => {
                        logger.error(`Fail : cannot click on timezone result and error is ${err}`)
                        assert.fail(`Fail : cannot click on timezone result and error is ${err}`)
                      })
                      if (await (await browser.$(allPageObjects.allPageAndroid.timeZoneResultMutiple)).isDisplayed()) {
                        await browser.$(allPageObjects.allPageAndroid.timeZoneResultMutiple).then(async (res) => {
                          await res.click().then(async () => { // Command to select the timeZone of the specified country
                            logger.debug(`Changed to one of the ${timeZoneChange} timezone`)
                          }).catch((err) => {
                            logger.error(`Fail : cannot Change the timezone and error is ${err}`)
                            assert.fail(`Fail : cannot Change the timezone and error is ${err}`)
                          })
                        }).catch((e) => {
                          logger.error(`Fail : cannot find the timezone result and error is ${e}`)
                          assert.fail(`Fail : cannot find the timezone result and error is ${e}`)
                        })
                      }
                    }).catch((e) => {
                      logger.error(`Fail : cannot click on timeZone search and error is ${e}`)
                      assert.fail(`Fail : cannot click on timeZone search and error is ${e}`)
                    })
                  }).catch((er) => {
                    logger.error(`Fail : cannot find timezone settings page and error is ${er}`)
                    assert.fail(`Fail : cannot find timezone settings page and error is ${er}`)
                  })
                }).catch((error) => {
                  logger.err(`Fail : cannot navigate to device timezone settings and error is ${error}`);
                  assert.fail(`Fail : cannot navigate to device timezone settings and error is ${error}`)
                })
              }).catch((error) => {
                logger.err(`Fail : cannot navigate to device timezone settings and error is ${error}`);
                assert.fail(`Fail : cannot navigate to device timezone settings and error is ${error}`)
              })
            }).catch((errSettings) => {
              logger.err(`Fail : cannot navigate to device date and time zone settings and error is ${errSettings}`);
              assert.fail(`Fail : cannot navigate to device date and time zone settings and error is ${errSettings}`)
            })
          }).catch((errTime) => {
            logger.error(`Fail : Cannot ${msgTime} and error is ${errTime}`);
            assert.fail(`Fail : Cannot ${msgTime} and error is ${errTime}`)
          })
        }).catch((errZone) => {
          logger.error(`Fail : Cannot ${msgZone} and error is ${errZone}`);
          assert.fail(`Fail : Cannot ${msgZone} and error is ${errZone}`)
        })
      }
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const allowPermission = async (permission) => {
  console.log(`${permission}--------------------`);
  switch (platform) {
    case 'ios':
      logger.info('Platform: iOS');
      allPageObjects.allPageiOS.toggle = `//XCUIElementTypeSwitch[@name="Camera"]/XCUIElementTypeSwitch`;
      await tapUtil.TapOnElement('toggle');
      break;
    case 'android':
      logger.info('Platform: android');
      if (androidplatformversion >= 12 && permission === 'Bluetooth') {
        await tapUtil.tapOnArrayOfElements('appPermissions,nearByDevices,allowAppPermission,settingsBackButton,settingsBackButton', browser)
      }
      if (androidplatformversion >= 12 && permission === 'Camera') {
        await tapUtil.tapOnArrayOfElements('appPermissions,cameraPermission,allowWhileUsingApp', browser)
      }
      break;
  }
  await killSettingsApp();
}

const tapKeyboardButton = async (buttonText) => {
  let keyboardButtonXPath;
  switch (platform) {
    case 'ios':
      await tapUtil.TapOnElement(buttonText);
      break;

      case 'android':
      if (buttonText === 'Next') {
        await browser.execute('mobile: performEditorAction', { action: 'next' });
      }
      if (buttonText === 'Done') {
        await browser.execute('mobile: performEditorAction', { action: 'done' });
      }
  }
}
const scanQRCodeFromImageFile = async (imageLocator) => {
  const imagePath = "/Users/vencs/Desktop/qr-code.png";
  const imageInput = await browser.$(imageLocator);
  await imageInput.setValue(imagePath);
  await browser.waitUntil(async () => {
  },
  { timeout: 10000, timeoutMsg: 'QR code scanning timeout' });
  // const qrCodeOutput = await getQRCodeOutput();
  const qrCodeOutput = jsQR(imageData, imageWidth, imageHeight);
  console.log('QR code output:', qrCodeOutput);
  
  return qrCodeOutput;
}
module.exports = {
  putAppInBackground,
  launchApp,
  killApp,
  uninstallApp,
  reinstallApp,
  gotoDeviceTimeSettings,
  changeDeviceTime,
  changeDeviceDateInAndroid,
  unpairDevice,
  forceCloseRecentApps,
  isNotificationEnabledOrDisabled,
  killSettingsApp,
  pressHomeButton,
  accepAlertIniOS,
  isBluetoothEnabledOrDisabled,
  toggleNotification,
  waitForTime,
  changeTimezone,
  allowPermission,
  tapKeyboardButton,
  scanQRCodeFromImageFile
}
