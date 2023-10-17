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
  AdmZip = require("adm-zip"),
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
  return new Promise((resolve, reject) => {
    try {
      const zip = new AdmZip(pathIn);
      zip.extractAllTo(pathOut, true);
      console.log("Extraction operation complete");
      resolve();

    } catch (err) {
      reject(err)
    }
  });
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

        const pngFiles = files
          .filter((file) => path.extname(file) === ".png")
          .filter((file) => file !== ".DS_Store")
          .filter((file) => file !== "__MACOSX")
          .map((file) => path.join(dir, file));
        resolve(pngFiles);
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



const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(pathIn);
    const output = fs.createWriteStream(pathOut);
    const transformStream = new PNG({});
  
    input
      .pipe(transformStream)
      .on("parsed", function() {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const gray = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
            this.data[idx] = this.data[idx + 1] = this.data[idx + 2] = gray;
          }
        }
    
        this.pack().pipe(output);

        output
          .on("finish", () => {resolve()})
          .on("error", (err) => {reject(err)});

      });
    input
      .on("error", (err) => {reject(err)});
  });
};



const processImages = (pngFiles, pathProcessed) => {
  const grayScalePromises = pngFiles.map((file) => {
    const outputFilePath = path.join(pathProcessed, path.basename(file));
    return grayScale(file, outputFilePath);
  });
  return Promise.all(grayScalePromises);
};



module.exports = {
  unzip,
  readDir,
  grayScale,
  processImages
};
