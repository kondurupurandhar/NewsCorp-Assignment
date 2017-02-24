var config = require('../config/config.json');
var googleAPI = require('./googleAPI.js');
var request = require ('request');
var weatherAPILocation = config.weatherAPILocation;
var secreatKey = config.secreatKey;
// function to pull the weather forecast based on the given location latitude and longitude. Also it will pull
// weather information based on the weekday
exports.runRequest = function (address,timestamp, callback) {
   googleAPI.getCoorinates(address, function mycallback(err,data) {
      if ( err ) {
         if ( err === "ZERO_RESULTS" )
            callback('ZERO_RESULTS',null);
         else 
            callback(err,null);
      }
      else {
         if ( timestamp )
            var callrequest = weatherAPILocation + secreatKey + '/' + data.lat+','+data.lng+','+timestamp;
         else
            var callrequest = weatherAPILocation + secreatKey + '/' + data.lat+','+data.lng;
            // call the weather forecast API
         request(callrequest, function (err,response, body) {
            if ( err )
               callback(err,null)
            else 
               callback(false, body);
         });
      }
   });
}
