const _ = require('lodash');

const readChunk = require('read-chunk');
const fileType = require('./');

const argv = require('minimist')(process.argv.slice(2));
const fileName = _.get(argv, 'file')

readChunk(fileName, 0, 272)
  .then((result) =>{

    let detectedFileType = fileType(result);

    // determine signature so we can compare it with magic number lists and add it to file-type
    let signature = "";
    for(let x = 0; x < 700; x++) {
      if(!_.isNil(result[x])) signature += _.padStart(result[x].toString(16),2,0) + ' ';
    }

    if (!detectedFileType) {
      console.log("COULD NOT DETECT fileType for %s - here's the signature", fileName);
      console.log(signature)
      console.log(_.repeat('-', 3))
      console.log(result.toString())
      console.log(_.repeat('-', 60))
    }
    else {
      console.log("DETECTED", detectedFileType);
      if (_.get(argv, 'showSignature')) {
        console.log(_.repeat('-', 3))
        console.log(signature)
        console.log(_.repeat('-', 3))
        console.log(result.toString())
        console.log(_.repeat('-', 60))
      }
    }

  })
  .catch(function(err) {
    console.error('FAILED', err)
  });
