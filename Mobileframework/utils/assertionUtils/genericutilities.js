/* eslint-disable radix */
const _ = require('lodash');
const moment = require('moment');

const methods = {
  timestamp() {
    console.log(`Current Time in Unix Timestamp: ${Math.floor(Date.now() / 1000)}`);
  },
  currentDate() {
    return new Date().toISOString().slice(0, 10);
  },
  verifyStringMatches(testString, substring) {
    return _.includes(testString, substring);
  },
  getcurrentMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[new Date().getMonth()];
  },
  getMonthNumber(month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthNumber = monthNames.indexOf(month) + 1;
    if (monthNumber <= 9) { monthNumber = `${0}${monthNumber}` }
    return monthNumber;
  },
  getCurrentYear() {
    return new Date().getFullYear();
  },
  getPrevMonth() {
    return moment().subtract(1, 'month').format('MMMM');
  },
  getPrevYear() {
    return new Date().getFullYear();
  },
  getcurrenttime() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    let strTime;
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    if (hours <= 9) {
      strTime = `0${hours}:${minutes} ${ampm}`;
    } else {
      strTime = `${hours}:${minutes} ${ampm}`;
    }
    console.log(`current time=${strTime}`);
    return strTime;
  },
  getcurrenttime1() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },
  getcurrenttime24() {
    const today = new Date()
    const hours = today.getHours();
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes}`;
    return strTime;
  },

  isarraysorted(times, unsortedtimes) {
    times.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`));
    const isequal = times.length === unsortedtimes.length
      && times.every((element, index) => element === unsortedtimes[index]);
    return isequal
  },

  comparearrays(arr1, arr2) {
    const objMap = {};

    arr1.forEach((e1) => arr2.forEach((e2) => {
      if (e1 === e2) {
        objMap[e1] = objMap[e1] + 1 || 1;
      }
    }));
    return (Object.keys(objMap).map((e) => Number(e)));
  },
  getcurrentampmtime() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },

  getdevicecurrenttime() {
    const time = browser.getDeviceTime();
    const values = Object.keys(time).map((key) => time[key]);
    let hours = parseInt(values[0].toString().slice(11, 13));
    let minutes = parseInt(values[0].toString().slice(14, 16));
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },

  getdevicecurrenttime24() {
    const time = browser.getDeviceTime();
    const values = Object.keys(time).map((key) => time[key]);
    let hours = parseInt(values[0].toString().slice(11, 13));
    let minutes = parseInt(values[0].toString().slice(14, 16));
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes}`;
    return strTime;
  },

  getdevicecurrenttime1() {
    const time = browser.getDeviceTime();
    const values = Object.keys(time).map((key) => time[key]);
    let hours = parseInt(values[0].toString().slice(11, 13));
    let minutes = parseInt(values[0].toString().slice(14, 16));
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },

  chimeraDetailsRefactor(field, value) {
    let val;
    switch (field) {
      case 'chimeraDose':
        const valArray = value.split('.');
        val = valArray[0];
        break;

      case 'vendorMedicationSensor':
        if (value.includes('187C184F1707')) {
          val = 'Basaglar';
        } else if (value.includes('3EF03D5082C')) {
          val = 'Humalog';
        } else if (value.includes('7F305DC0458')) {
          val = 'Lyumjev';
        }
        break;

      case 'vendorMedicationSensorRaw':
        if (value === 'Unidentified') { val = 'Insulin: Unknown'; }
        break;

      case 'extendedFlag':
        if (value.includes('5FF')) {
          val = 'Units: Unknown';
        }
        break;

      case 'timeError':
        if (value === 'Time Error') {
          val = 'Time: Unknown';
        }
        break;

      case 'dateError':
        if (value === 'Time Error') {
          val = 'Date: Unknown';
        }
        break;

      case 'timeInChimera':
        val = value.substring(value.indexOf(' ')).trim();
        break;

      case 'lastSyncDate':
        val = value.split(',')
        const dateValue = val[0];
        const date = dateValue.split('/');
        val = `${date[1]}/${date[0]}/${'20'}${date[2]}`;
        break;

      default:
        break;
    }
    return val;
  },

  getTimeStampFromApp(dateFromApp) {
    if (browser.config.params[dateFromApp] !== undefined) { dateFromApp = browser.config.params[dateFromApp]; }
    // date format - 'Tuesday, May 11';
    dateFromApp = dateFromApp.split(' ');
    const year = this.getCurrentYear();
    const month = this.getMonthNumber(dateFromApp[1])
    const newDate = `${year}-${month}-${dateFromApp[2]}`;
    const timeStampFromApp = Date.parse(newDate);
    return timeStampFromApp.toString();
  },

  getTimeStampFromChimera(value) {
    value = value.split(',');
    const dateValue = value[0];
    const date = dateValue.split('/');
    const refactoredDate = `${'20'}${date[2]}-${date[1]}-${date[0]}`;
    const dateFromChimera = Date.parse(refactoredDate);
    logger.trace('dateFromChimera', dateFromChimera);
    return dateFromChimera.toString();
  },
};

module.exports = methods;
