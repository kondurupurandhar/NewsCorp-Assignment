/*
   Description : Implemented the weather forecast API's which will pull data from https://darksky.net based on 
                 the given location and weekday
   Author      : Purandhar K
   Modification History:

   Author                               Date                    Description
  ---------------------------------------------------------------------------
   Purandhar K                       23-Feb-2017              Initial version
*/
var request = require('request');
var express = require('express');
var config  = require('./config/config.json');
var weatherFucntions = require('./functions/weather_functions.js');
var app = express();
var PORT = (process.env.PORT || 8080)
// get the weather based on the given location
app.get('/weather/:location', function (req,res) {
   var address = req.params.location;
   var timestamp=null;
   // call the function to get the weather information
   weatherFucntions.runRequest(address, timestamp, function callback_runRequest(err,data) {
      if ( err ) {
         if (  err === "ZERO_RESULTS" ) {
            console.log("ERROR: Error in fetching the data - ", err);
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write('{"error":"No data found","message": "No data found for the given address"}');
            res.end();
         }
         else {
            console.log("ERROR: Error in fetching the data - ", err);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write('{"error":"Internal server error","message": "Internal server error, please try again later"}');
            res.end();
         }
      }
      else {
         console.log("SUCCESS: Successfully sent the data...");
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.write(data);
         res.end();
      }
   });
});
//get the weather forecast details for the given the weekday
app.get('/weather/:location/:weekday', function (req,res) {
   var address = req.params.location;
   var weekday = req.params.weekday;
   var dayNum;
   var timestamp=null;
   weekday = weekday.toLowerCase();
   var weekdayArr=new Array(7);
   weekdayArr['sunday']=0;
   weekdayArr['monday']=1;
   weekdayArr['tuesday']=2;
   weekdayArr['wednesday']=3;
   weekdayArr['thursday']=4;
   weekdayArr['friday']=5;
   weekdayArr['saturday']=6;
   weekdayArr['today']=7;
   weekdayNum = weekdayArr[weekday];
   if ( !weekdayNum ) {
      
      console.log("ERROR: Error in fetching the data for the given weekday- ", weekday);
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write('{"error":"No data found","message": "No data found for the given weekday"}');
      res.end(); 
   }
   else {
      var day = new Date();
      currWeekday = day.getDay();
      // fetch the weather forecast details for today
      if ( weekday === 'today' ) {
         //day.setHours(0,0,0,0);
         timestamp = Math.round(day.getTime() / 1000) 
      }
      else { 
         if ( weekdayNum < currWeekday )
            dayNum = 6 - (currWeekday - weekdayNum) + 1;
         else if ( weekdayNum == currWeekday )
            dayNum = 6 + 1;
         else
            dayNum = weekdayNum - currWeekday;
         // for the given weekday, set the time to zero hours
         day.setDate(day.getDate() + dayNum);
         day.setHours(0,0,0,0);
         timestamp = Math.round(day.getTime() / 1000)
      }
      // call the function to get the weather information
      weatherFucntions.runRequest(address, timestamp, function callback_runRequest(err,data) {
         if ( err ) {
            console.log("Error data: ", data);
            if ( data.status === "ZERO_RESULTS" ) {
               console.log("ERROR: Error in fetching the data - ", err);
               res.writeHead(404, {'Content-Type': 'application/json'});
               res.write('{"error":"No data found","message": "No data found for the given address"}');
               res.end();
            }
            else {
               console.log("ERROR: Error in fetching the data - ", err);
               res.writeHead(500, {'Content-Type': 'application/json'});
               res.write('{"error":"Internal server error","message": "Internal server error, please try again later"}');
               res.end();
            }
         }
         else {
            console.log("SUCCESS: Successfully sent the data...");
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            res.end(); 
         }
      });
   }
});
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

module.exports =  app;
