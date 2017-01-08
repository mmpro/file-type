const _ = require('lodash');

const readChunk = require('read-chunk');
const fileType = require('./');

const fileName = './2dfd7f41-27e7-498d-9a42-f00a95cc7b1a.txt' // add

readChunk(fileName, 0, 262)
  .then(function(result) {

    let detectedFileType = fileType(result);
    if (!detectedFileType) {

      // determine signature so we can compare it with magic number lists and add it to file-type
      let signature = "";
      for(let x = 0; x < 20; x++) {
        if(!_.isNil(result[x])) signature += _.padStart(result[x].toString(16),2,0) + ' ';
      }
      console.log("COULD NOT DETECT fileType - here's the signature");
      console.log(signature)
    }
    else {
      console.log("DETECTED", detectedFileType);
    }

  })
  .catch(function(err) {
    console.error('FAILED', err)
  });
