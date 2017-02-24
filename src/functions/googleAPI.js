var config = require('../config/config.json');
var request = require('request');
var googleAPI = config.googleAPI;
// get the lat and lng for the given location address
function getCoorinates(address,callback)
{
   myrequest = googleAPI + address;
   // call the google API to get the co-ordinates
   request(myrequest, function (err, res, body ) {
      if ( err ) {
         callback(err,null);
      }
      else {
         response = JSON.parse(body);
         if ( response.status === "ZERO_RESULTS" ) 
            callback('ZERO_RESULTS',null);
         else {
            console.log("Latitude and Longitude for the given location: ",response.results[0].geometry.location);
            callback(false,response.results[0].geometry.location);
         }
      }
   });
}

exports.getCoorinates = getCoorinates;
