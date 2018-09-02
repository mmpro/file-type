const _ = require('lodash');

const http = require('https');
const fileType = require('./');

const argv = require('minimist')(process.argv.slice(2));
const url = _.get(argv, 'url')

http.get(url, res => {
   res.once('data', result => {
     res.destroy();

     let detectedFileType = fileType(result);

            // determine signature so we can compare it with magic number lists and add it to file-type
            let signature = "";
            for(let x = 0; x < 720; x++) {
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
})
