const assert = require('assert');
const allTestData = require('../../test/testData/allTestData').allTestData
const moment = require('moment-timezone');
const { logger } = require('../../config/mobileCapabilitiesConfig/log4js.conf');
// eslint-disable-next-line import/extensions
const { getTextOfAnElement } = require('../actionUtils/getText.js');
const genericUtils = require('./genericutilities')

const prevTimeZone = 'prevTimeZone';
const newTimeZone = 'newTimeZone';

const writeInTestData = (key, value) => {
  if (value !== undefined) {
    browser.config.params[key] = value;
    logger.info('Stored : ', browser.config.params[key])
  } else {
    logger.info(' The value to store is undefined ', value)
  }
}

const readFromTestData = (key) => {
  let value = '';

  value = allTestData[key]
  if (value !== undefined) {
    logger.info(' value from test data is ', value)
  } else {
    value = browser.config.params[key]
    logger.info(' value fetched at run-time is ', value)
  }
  return value;
}

const setValueInTestData = (keyName, value) => {
  value = browser.config.params[keyName]
  if (value !== undefined) {
    allTestData[keyName] = value;
    logger.info(`${keyName} has been set to ${value}`);
  }
  logger.info(`${keyName} has been set to ${value}`);
}

const writeMultipleData = (keyListArray, valuesArray) => {
  const keySize = keyListArray.length;
  const valueSize = valuesArray.length

  for (i = 0; i < keySize; i += 1) {
    const key = keyListArray[i];
    const value = valuesArray[i];
    browser.config.params.key = value;
    logger.info('stored ', key, ' as ', browser.config.params.key)
  }

  //  key list and values are both of array type
}

const readMultipleData = (keyListArray) => {
  const keySize = keyListArray.length;

  const valuesArray = [];

  for (i = 0; i < keySize; i += 1) {
    valuesArray.push(allTestData[keyListArray[i]])
    logger.info('fetched ', keyListArray[i], ' with value ', allTestData[keyListArray[i]], 'from test data')
  }

  return valuesArray;
}

const containsValues = (valueFromAppKey, expectedValues) => {
  let expectedValuesKeys = [];

  if (expectedValues.includes(',')) {
    expectedValuesKeys = expectedValues.split(',');
  } else {
    expectedValuesKeys.push(expectedValues)
  }

  // get value from value key
  let valueFromApp = browser.config.params[valueFromAppKey];

  if (valueFromApp === undefined) {
    valueFromApp = valueFromAppKey
  }

  // This is for converting the date string fetched from app to timestamp
  if (valueFromAppKey.includes('appDate')) {
    valueFromApp = genericUtils.getTimeStampFromApp(valueFromAppKey);
  }
  // get values of expected values keys

  for (let i = 0; i < expectedValuesKeys.length; i += 1) {
    let expected = browser.config.params[expectedValuesKeys[i]];
    if (expected === undefined) {
      expected = readFromTestData(expectedValuesKeys[i]);
      if (expected === undefined) {
        expected = expectedValuesKeys[i];
      }
    }

    const isContains = valueFromApp.replace(/\s|\n|!/g, '').trim().includes(expected.replace(/\s|\n|!/g, '').trim());
    if (isContains === true) {
      logger.info(`Pass : ${valueFromApp} contains ${expected} value`)
    } else if (expected.replace('\n', '').includes(valueFromApp.replace('\n', ''))) logger.info(`Pass : ${expected.replace('\n', '')} contains ${valueFromApp.replace('\n', '')} value`)
    else if ((valueFromApp.toLowerCase().includes(' am') || valueFromApp.toLowerCase().includes(' pm')) && expected.match(/^[1-3]?[0-9]\/[0-1]?[0-9]\/[0-2][0-9], .*[AM]|[PM]|[am]|[pm]$/)) {
      if (expected.toLowerCase().includes('am')) {
        const minValTestData = Number(expected.substring((expected.indexOf(':') + 1), expected.toLowerCase().indexOf('a')).trim());
        const minVal = Number(valueFromApp.substring((valueFromApp.indexOf(':') + 1), valueFromApp.toLowerCase().indexOf('a')).trim());
        if ((minVal === minValTestData) || (minVal === (minValTestData + 1)) || (minVal === (minValTestData - 1))) {
          if ((expected.substring(0, expected.indexOf(':') + 1)).replace('\n', '').includes((valueFromApp.substring(0, valueFromApp.indexOf(':') + 1)).replace('\n', ''))
          && valueFromApp.toLowerCase().includes(' am')) {
            logger.info('Pass : Time from Chimera matches logbook reading');
          } else {
            logger.error(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
            assert.fail(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
          }
        } else {
          logger.error(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
          assert.fail(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
        }
      } else if (expected.toLowerCase().includes('pm')) {
        const minValTestData = Number(expected.substring((expected.indexOf(':') + 1), expected.toLowerCase().indexOf('p')).trim());
        console.log('minValTestData', minValTestData)
        const minVal = Number(valueFromApp.substring((valueFromApp.indexOf(':') + 1), valueFromApp.toLowerCase().indexOf('p')).trim());
        console.log('minVal', minVal)
        if ((minVal === minValTestData) || (minVal === (minValTestData + 1)) || (minVal === (minValTestData - 1))) {
          if ((expected.substring(0, expected.indexOf(':') + 1)).replace('\n', '').includes((valueFromApp.substring(0, valueFromApp.indexOf(':') + 1)).replace('\n', ''))
          && valueFromApp.toLowerCase().includes(' pm')) {
            logger.info('Pass : Time from Chimera matches logbook reading');
          } else {
            logger.error(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
            assert.fail(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
          }
        } else {
          logger.error(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
          assert.fail(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
        }
      }
    } else {
      logger.error(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
      assert.fail(`Fail : ${expected.replace('\n', '')} doesnt contain ${valueFromApp.replace('\n', '')} value`);
    }
  }
}

const compareValues = (valueKey) => {
  let value = [];
  let keys = [];
  if (valueKey.includes(',')) {
    keys = valueKey.split(',');
    value = readMultipleData(keys);
  } else {
    keys.push(valueKey);
    value.push(readFromTestData(valueKey));
  }

  for (let i = 0; i < value.length; i += 1) {
    const valueFromTestData = value[i];

    const key = keys[i];
    const val = browser.config.params[key];
    if (val.replace('\n', '') === valueFromTestData.replace('\n', '')) {
      logger.info(`Pass : The actual data for ${key} is ${val} and the expected value is ${valueFromTestData}`)
    } else {
      logger.error(`Fail : The actual data for ${key} is ${val} and the expected value is ${valueFromTestData}`);
      assert.fail(`Fail : The actual data for ${key} is ${val} and the expected value is ${valueFromTestData}`)
    }
  }
}

const verifyOrder = (inputKey, orderBy) => {
  let inputKeys = [];
  let size;

  if (inputKey.includes(',')) { inputKeys = inputKey.split(','); } else { inputKeys.push(inputKey); }

  orderBy = orderBy.toLowerCase().trim();

  switch (orderBy) {
    case 'occurence':

      const timeOfInputKeys = [];
      inputKeys.forEach((input) => {
        const val = parseTimeFromString(input);
        timeOfInputKeys.push(val);
      })

      //  check if sorted already
      let isordered = false;
      if (timeOfInputKeys.length > 1) {
        for (let i = 0; i < timeOfInputKeys.length - 1; i += 1) {
          if (timeOfInputKeys[i] < timeOfInputKeys[i + 1]) { isordered = true; } else {
            isordered = false;
            break;
          }
        }
      } else {
        logger.error('Fail: Only one input has been entered');
        assert.fail('Fail: Only one input has been entered')
      }

      if (isordered === true) { logger.info(`Pass : The inputs ${inputKey} are ordered by occurence`) } else {
        logger.error(`Fail : The inputs ${inputKey} are not ordered by occurence`);
        assert.fail(`Fail : The inputs ${inputKey} are not ordered by occurence`)
      }

      break;

    case 'ascending order':
      size = inputKeys.length;
      let isSorted;
      if (size > 1) {
        for (let i = 1; i < size; i += 1) {
          if (inputKeys[i - 1] <= inputKeys[i]) {
            isSorted = true;
          } else {
            isSorted = false;
            break;
          }
        }
      }

      if (isSorted || size === 1) {
        logger.info(`PASS : the values ${inputKeys} are in ascending order`)
      } else {
        logger.error(`FAIL : the values ${inputKeys} are not in ascending order`);
        assert.fail(`FAIL : the values ${inputKeys} are not in ascending order`)
      }
      break;

    case 'descending order':
      size = inputKeys.length;
      isSorted;
      if (size > 1) {
        for (let i = 0; i < size - 1; i += 1) {
          if (inputKeys[i] >= inputKeys[i + 1]) {
            isSorted = true;
          } else {
            isSorted = false;
            break;
          }
        }
      }

      if (isSorted || size === 1) {
        logger.info(`PASS : the values ${inputKeys} are in descending order`)
      } else {
        logger.error(`FAIL : the values ${inputKeys} are not in descending order`);
        assert.fail(`FAIL : the values ${inputKeys} are not in descending order`)
      }
      break;

    default:
      logger.fatal('platform specified doesnt match with ios or android');
      break;
  }
}

const parseTimeFromString = (inputText) => {
  let time;
  let unit;
  let day;

  if (inputText !== undefined || inputText !== '') {
    const splittedValues = inputText.split(' ');

    splittedValues.forEach((input) => {
      if (input.includes(':')) time = input;

      else if (input.includes('AM') || input.includes('PM')) unit = input;

      else if (input.includes('/')) day = input;
    })
  }
  if (day !== undefined) return Date.parse(day, time, unit);

  return moment(`${time} ${unit}`, 'hh:mm a').format('hh:mm a')
}

// Date function to validate Format and Date -Expected format [Day, Month Date] Eg: expectedDate=[Today, Month Date], dateFromApp=[Today, April 04]
// Expected format is expectedDate and date from app is dateFromApp
const dateValidate = (expectedDate, dateFromApp) => {
  let index;
  const newReg = /[A-Za-z]{1,9}[,][\s][A-Za-z]{1,8}[\s][0-9]{1,2}/;
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let cflag = true;
  let fflag = false;

  if (newReg.test(dateFromApp) === true) {
    fflag = true;
  }
  let i = 0;
  const expectedDateFormat = expectedDate.replace(',', '').split(' ');
  const dateFromAppFormat = dateFromApp.replace(',', '').split(' ');
  while (i < expectedDateFormat.length) {
    switch (i) {
      case 0:
        if (expectedDateFormat.indexOf(dateFromAppFormat[i]) === -1) {
          cflag = false;
        }
        break;

      case 1:
        index = monthList.indexOf(dateFromAppFormat[i]);
        if (monthList.indexOf(dateFromAppFormat[i]) === -1) {
          cflag = false;
        }
        break;

      case 2:
        const today = new Date();
        const lastDayOfMonth = new Date(2000, index, 0);
        if (dateFromAppFormat > lastDayOfMonth.getDate()) {
          cflag = false;
        }
        break;

      default:
        logger.error('Fail : Both Format and Date is invalid');
        assert.fail('Fail : Both Format and Date is invalid');
        break;
    }
    i += 1;
  }

  if (cflag === true && fflag === true) {
    logger.info('Pass : Valid Format and Date');
  } else if (cflag === true && fflag === false) {
    logger.error('Fail : Format is invalid but date is valid ');
    assert.fail('Fail : Format is invalid but date is valid ')
  } else if (cflag === false && fflag === true) {
    logger.error('Fail : Format is valid but date is invalid');
    assert.fail('Fail : Format is valid but date is invalid')
  } else {
    logger.error('Fail : Both Format and Date is invalid')
    assert.fail('Fail : Both Format and Date is invalid')
  }
}

const compareBDValues = (valueKey, valueSim) => {
  let value = [];
  let keys = [];
  let valueSimulator = [];
  let keysSimulator = [];
  if (valueKey.includes(',')) {
    keys = valueKey.split(',');
    value = readMultipleData(keys);
  } else {
    keys.push(valueKey);
    value.push(readFromTestData(valueKey));
  }
  if (valueSim.includes(',')) {
    keysSimulator = valueSim.split(',');
    valueSimulator = readMultipleData(keysSimulator);
  } else {
    keysSimulator.push(valueSim);
    valueSimulator.push(readFromTestData(valueSim));
  }
  for (let i = 0; i < value.length; i += 1) {
    // const appValueFromTestData = value[i];
    const key = keys[i];
    const valueFromApp = browser.config.params[key];
    // const simValueFromTestData = valueSimulator[i];
    const keysSimulator = keysSimulator[i];
    const valueFromSimulator = browser.config.params[keysSimulator];
    if (valueFromApp.replace('\n', '').trim() === valueFromSimulator.replace('\n', '').trim()) {
      logger.info(`Pass : The actual data for ${key} is ${valueFromApp} and the expected value is ${valueFromSimulator}`)
    } else {
      logger.error(`Fail : The actual data for ${key} is ${valueFromApp} and the expected value is ${valueFromSimulator}`);
      assert.fail(`Fail : The actual data for ${key} is ${valueFromApp} and the expected value is ${valueFromSimulator}`)
    }
  }
}

const verifyChangedTimeFromApp = (timeFromApp, changedTimeFromApp) => {
  let initialTimeValue = [];
  let finalTimeValue = [];
  if (timeFromApp.includes(',')) {
    initialTimeValue = timeFromApp.split(',');
  } else {
    initialTimeValue.push(timeFromApp);
  }
  if (changedTimeFromApp.includes(',')) {
    finalTimeValue = changedTimeFromApp.split(',');
  } else {
    finalTimeValue.push(changedTimeFromApp);
  }
  if (initialTimeValue.length !== finalTimeValue.length) {
    logger.error('Number of parameters do not match');
    assert.fail('Number of parameters do not match');
  } else {
    newCountry = browser.config.params[newTimeZone];
    prevCountry = browser.config.params[prevTimeZone];
    const timeZoneData = readFromTestData('timeZoneCountries');
    const timeZone = timeZoneData.find((x) => x.country === newCountry).offset;
    const oldTimeZone = timeZoneData.find((x) => x.country === prevCountry).offset;
    for (i = 0; i < initialTimeValue.length; i++) {
      const initialTime = readFromTestData(initialTimeValue[i]);
      const finalTime = readFromTestData(finalTimeValue[i]);
      // Converting initial fetched time to time zone before change
      let convTimeFromApp = moment.tz(initialTime, ['h:mm A'], oldTimeZone);
      // Converting initial fetched time to time zone after change
      convTimeFromApp = convTimeFromApp.tz(timeZone).format('h:mm A');
      // Converting final fetched time to similar format for comparison
      const convChangedTimeFromApp = moment(finalTime, ['h:mm A']).format('h:mm A');
      if (convTimeFromApp === convChangedTimeFromApp) {
        logger.info(`Pass : ${initialTime} was correctly converted to ${finalTime}.`);
      } else {
        logger.error(`Fail : ${initialTime} was not correctly converted to ${convTimeFromApp}. Instead, ${finalTime} was displayed.`);
        assert.fail(`Fail : ${initialTime} was not correctly converted to ${convTimeFromApp}. Instead, ${finalTime} was displayed.`);
      }
    }
  }
}

const verifyHeaderChangedDate = (header, timeFromApp) => {
  header = readFromTestData(header);
  timeFromApp = readFromTestData(timeFromApp);

  newCountry = browser.config.params[newTimeZone];
  prevCountry = browser.config.params[prevTimeZone];
  const timeZoneData = readFromTestData('timeZoneCountries');
  const timeZone = timeZoneData.find((x) => x.country === newCountry).offset;
  const oldTimeZone = timeZoneData.find((x) => x.country === prevCountry).offset;

  // Steps to avoid moment from taking UTC date by default
  const realDate = moment().format('MMMM DD h:mm A');
  const initialAppDate = moment(realDate, ['MMMM DD h:mm A']).tz(oldTimeZone).format('MMMM DD');
  const beforeConversion = `${initialAppDate} ${timeFromApp}`

  // Converting initial fetched time to time zone before change
  timeFromApp = moment.tz(beforeConversion, ['MMMM DD h:mm A'], oldTimeZone);
  // Converting initial fetched time to time zone after change
  const convertedDate = timeFromApp.tz(timeZone).format('MMMM DD');
  containsValues(header, convertedDate);
}

module.exports = {
  writeInTestData,
  readFromTestData,
  readMultipleData,
  writeMultipleData,
  compareValues,
  verifyOrder,
  containsValues,
  dateValidate,
  setValueInTestData,
  compareBDValues,
  verifyChangedTimeFromApp,
  verifyHeaderChangedDate,
}
