/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 10, 2023
 * Author: Chiao-Jhu (Katy) Chan
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  // { createReadStream } = require("fs");
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise()
};



/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files.filter((file) => path.extname(file)=== ".png");
        const filePaths = pngFiles.map((file) => path.join(dir, file));
        resolve(filePaths);
      }
    });
  });
};




/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */



const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
