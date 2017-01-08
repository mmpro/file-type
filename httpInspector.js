const _ = require('lodash');

const http = require('https');
const fileType = require('./');


const url = 'https://urltoyourfile';

http.get(url, res => {
   res.once('data', result => {
     res.destroy();

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
})
