const assert = require('assert')

const platform = browser.config.platformIs;
const allPageObjects = require('../../test/AppScreensObjectRepo/AllPageMerge');
const isDisplayedUtils = require('./isDisplayed');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');

const slide = async (slider, swipedirection) => {
  const isPresent = isDisplayedUtils.isDisplayedWithoutMsg(slider);
  if (isPresent) {
    try {
      switch (platform) {
        case 'ios':
          await browser.execute('mobile: swipe', { direction: swipedirection, element: browser.$(allPageObjects.allPageiOS[slider]).value.ELEMENT }); logger.info(`swiped ${swipedirection} on ${slider} element`)

          break;

        case 'android':
          break;

        default:
          break;
      }
    } catch (e) {
      logger.error(e);
      return assert.strictEqual(platform, 'ios', ' Cannot slide ');
    }
  }
  return undefined
}
const swipeScreen = async (swipedirection) => {
  try {
    switch (platform) {
      case 'ios':

        await browser.execute('mobile: scroll', { direction: swipedirection }).then(async () => {
          logger.info(`Pass : swiped ${swipedirection}`);
        }).catch((err) => {
          msg = `Fail : cant swipe ${swipedirection} and error is ${err}`;
          logger.error(msg);
          assert.fail(msg)
        })

        break;

      case 'android':
        let xMid;
        let xMid1;
        const yMargin = 200;
        let Ybottom;
        switch (swipedirection) {
          case 'down':
            await browser.pause(5000);
            await browser.getWindowSize().then(async (value) => {
              xMid = value.width / 2;
              Ybottom = value.height;
              Ybottom -= yMargin;
            }).catch((err) => {
              logger.error(`Fail : Error in swiped down : ${err}`)
              assert.fail(`Fail : Error in swiped down : ${err}`);
            });

            await browser.touchAction([
              { action: 'press', x: xMid, y: Ybottom },
              { action: 'wait', ms: 1000 },
              { action: 'moveTo', x: xMid, y: yMargin },
              'release',
            ]).then(async () => {
              logger.info('Pass : swiped down')
            })
            break;

          case 'up':
            await browser.pause(5000);
            await browser.getWindowSize().then(async (value) => {
              xMid1 = value.width / 2;
              Ybottom = value.height;
              Ybottom -= yMargin;
            }).catch((err) => {
              msg = `Fail : Error in swiped up : ${err}`;
              logger.error(msg);
              assert.fail(msg)
            });
            await browser.touchAction([
            // please change the y co-ordinate to (yMargin + 100) for press action (line #88) if swipe up is not working
              { action: 'press', x: xMid1, y: yMargin +100 },
              { action: 'wait', ms: 1000 },
              { action: 'moveTo', x: xMid, y: Ybottom },
              'release',
            ]).then(async () => {
              logger.info('Pass : swiped up')
            })
        }

        break;

      default:
        break;
    }
  } catch (e) {
    msg = `Fail : cant swipe ${swipedirection} and error is ${e}`;
    logger.error(msg);
    assert.fail(msg)
  }
}

const swipeForNotifications = async () => {
  await browser.pause(5000);
  await browser.touchAction([
    { action: 'press', x: 100, y: 2 },
    { action: 'wait', ms: 500 },
    { action: 'moveTo', x: 100, y: 896 },
    'release',
  ]).then(async () => {
    await browser.pause(5000);
  }).catch((er) => {
    logger.error(`error is ${er}`)
    assert.fail(`error is ${er}`)
  })
}

const SwipeLeftOnElementByCoordinates = async (e) => {
  let x1; let
    y1;
  await e.getLocation().then(async (loc) => {
    x1 = Number(loc.x);
    y1 = Number(loc.y) + 200;

    await browser.touchAction([
      { action: 'press', element: e },
      { action: 'wait', ms: 500 },
      { action: 'moveTo', x: x1, y: y1 },

    ])
  }).catch((err) => {
    msg = `Fail : cannot fetch X1 and Y1 for long press on ${e} and the error is ${err}`;
    logger.error(msg);
    assert.fail(msg);
  })
}

const SlideOnElement = async (element, swipedirection) => {
  const action = swipedirection.toLowerCase();

  switch (platform) {
    case 'ios':
      ele = allPageObjects.allPageiOS[element]
      break;

    case 'android':
      ele = allPageObjects.allPageAndroid[element]
      break

    default:
      break
  }
  let x1; let
    y1;
  await browser.getWindowSize().then(async (val) => {
    wid = val.width
    hgt = val.height
  }).catch((err) => {
    msg = `Fail : Error in getting the ${element} size and error is ${err}`;
    logger.error(msg);
    assert.fail(msg)
  })

  await browser.$(ele).then(async (element) => {
  // SS wait untill on element
    await browser.waitUntil(async () => await element.isDisplayed() === true, elementTimeOut).then(async () => {
      await element.getLocation().then(async (loc) => {
        x1 = Number(loc.x)
        y1 = Number(loc.y)
      }).catch((err) => {
        msg = `Fail : Error in getting the ${element} location and error is ${err}`;
        logger.error(msg);
        assert.fail(msg)
      })
    }).catch((err) => {
      msg = `Fail : Cannot find the ${element} and the error is ${err}`;
      logger.error(msg);
      assert.fail(msg);
    })
  })

  if (action === 'up') {
    x2 = x1
    y2 = y1 - 200
  } else if (action === 'down') {
    x2 = x1
    y2 = y1 + 200
  } else if (action === 'left') {
    x1 = wid - 10;
    x2 = 10
    y2 = y1
  } else if (action === 'right') {
    x1 = 50;
    x2 = wid - 30
    y2 = y1
  }

  await browser.touchAction([
    { action: 'press', x: x1, y: y1 },
    { action: 'wait', ms: 1000 },
    { action: 'moveTo', x: x2, y: y2 },
    { action: 'release' },
  ]).then(async () => {
    logger.info(`Pass : ${element} is swiped ${action}`)
  }).catch((err) => {
    msg = `Fail : Error in sliding the ${element} and error is ${err}`;
    logger.error(msg);
    assert.fail(msg)
  })
}

module.exports = {
  slide, swipeScreen, swipeForNotifications, SwipeLeftOnElementByCoordinates, SlideOnElement,
};
