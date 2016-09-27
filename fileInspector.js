var readChunk = require('read-chunk');
var fileType = require('./');
var _ = require('lodash');

var fileName = './testFiles/addYourFileNameHere'; // add

readChunk(fileName, 0, 262)
  .then(function(result) {

    var detectedFileType = fileType(result);
    if (!detectedFileType) {

      // determine signature so we can compare it with magic number lists and add it to file-type
      var signature = "";
      for(var x = 0; x < 20; x++) {
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
