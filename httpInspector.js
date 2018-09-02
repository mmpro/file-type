const _ = require('lodash');

const http = require('https');
const fileType = require('./');

const argv = require('minimist')(process.argv.slice(2));
const url = _.get(argv, 'url')
let showSignature = _.get(argv, 'showSignature')
const signatureLength = _.get(argv, 'signatureLength', 252)
const startPos = _.get(argv, 'startPos')

http.get(url, res => {
   res.once('data', result => {
     res.destroy();

     let detectedFileType = fileType(result);

            // determine signature so we can compare it with magic number lists and add it to file-type
            let signature = "";
            for(let x = 0; x < signatureLength; x++) {
             if(!_.isNil(result[x])) signature += _.padStart(result[x].toString(16),2,0) + ' ';
            }

      if (!detectedFileType) {
        console.log("COULD NOT DETECT fileType for %s - here's the signature", fileName);
        showSignature = true
      }
      else {
        console.log("DETECTED", detectedFileType);
      }

      if (showSignature) {
        console.log(_.repeat('-', 3))
        console.log(signature)
        console.log(_.repeat('-', 3))
        console.log(result.toString().substr(0, signatureLength))
        console.log(_.repeat('-', 60))
      }
      if (startPos) {
        console.log('%s starts at position %s', startPos, signature.indexOf(startPos)/3)
      }
      

   })
})
