/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: October 10, 2023
 * Author: Chiao-Jhu (Katy) Chan
 *
 */


const path = require("path");
const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");





IOhandler.unzip(zipFilePath, pathUnzipped)
    .then(()=> IOhandler.readDir(pathUnzipped))
    .then((pngFiles) => IOhandler.processImages(pngFiles, pathProcessed))
    .then(() => {console.log("Grayscale conversion completed for all PNG files.");})
    .catch((err)=> console.log(err))
