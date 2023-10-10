const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

const zlib = require("zlib");
const unzipper = require("unzipper");
const fs = require("fs");




// Step 1: Unzip myfile.zip



fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: "./unzipped"}))    



// Read each png file...

fs.createReadStream("png1.png")
    .on("data", (chunk) => console.log(chunk));