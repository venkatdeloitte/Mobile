/* eslint-disable no-irregular-whitespace */
// this file contains general test data
const moment = require('moment');
const DotEnvProperties = require('../../utils/DotEnvProperties');

const dotEnvProperties = new DotEnvProperties();

const myMoney = {
  MyMoney_Disclaimertext: 'You can also change your currency sign later.',
  MyMoney_Norecorddescription: 'No record in this month. Tap + to add new expense or income.',
  // Add a new account 
  amount: '100',
  name: 'Test',

}

Object.assign(myMoney)

module.exports = { myMoney }
