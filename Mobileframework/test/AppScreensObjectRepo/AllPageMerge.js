/* eslint-disable import/no-dynamic-require */
const path = require('path');
const {
  ABSOLUTE_PATHS, readSync,
} = require('readdir');

const allPageAndroid = {};
const allPageiOS = {};
const allPageMacOS = {};

const arrOfFiles = readSync(path.resolve(__dirname), ['*.js'], ABSOLUTE_PATHS);
arrOfFiles.forEach((key) => {
  // eslint-disable-next-line global-require
  const fileObjects = require(path.resolve(process.cwd(), __dirname, key));
  if (fileObjects.android !== undefined) {
    Object.assign(allPageAndroid, fileObjects.android);
  }
  if (fileObjects.ios !== undefined) {
    Object.assign(allPageiOS, fileObjects.ios);
  }
  if (fileObjects.macos !== undefined) {
    Object.assign(allPageMacOS, fileObjects.macos);
  }
});

module.exports = { allPageAndroid, allPageiOS, allPageMacOS };
