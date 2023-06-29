// this file contains reference to all test data files
const generalTestData = require('./generalTestData').generalTestData
const notificationsData = require('./notifications').notifications
// const bgmTestData = require('./bgmTestData').bgmTestData
// const bdTestData = require('./bdTestdata').bdTestData

const allTestData = {

}

Object.assign(allTestData, generalTestData, notificationsData)
module.exports = { allTestData }
