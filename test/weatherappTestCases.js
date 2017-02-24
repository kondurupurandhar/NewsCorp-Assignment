var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../src/server.js');
chai.use(chaiHttp);
describe('Weather forecast test cases', function () {
    before(function (done) {
        this.request = chai.request(server);
        setTimeout(function () {
            done();
        }, 1000);
    });
   describe('Method GET /weather/chennai', function () {
       it('Scenario 1: should be able to fetch the weather data for given location', function (done) {
          this.request.get("/weather/chennai")
              .end(function (err, res) {
                  console.log("Body after /weather/chennai API call : ",JSON.stringify(res.body));
                  res.statusCode.should.be.equal(200);
                  done();
               });
       });
       it('Scenario 2: should be able to handle the location not found',  function (done) {
          this.request.get("/weather/kajsjdf")
              .end(function (err, res) {
                 console.log("Body after /weather/kajsjdf API call : ",JSON.stringify(res.body));
                 res.statusCode.should.be.equal(404);
                 done();
              });
       });
       it('Scenario 3: should be able to fetch the weather data for the given weekday',  function (done) {
          this.request.get("/weather/chennai/thursday")
              .end(function (err, res) {
                 console.log("Body after /weather/chennai/thursday API call : ",JSON.stringify(res.body));
                 res.statusCode.should.be.equal(200);
                 done();
              });
       });
       it('Scenario 4: should be able to handle invalid weekday',  function (done) {
          this.request.get("/weather/chennai/thursdaaaay")
              .end(function (err, res) {
                 console.log("Body after /weather/chennai/thursdaaaay API call : ",JSON.stringify(res.body));
                 res.statusCode.should.be.equal(404);
                 done();
              });
       });
       it('Scenario 4: should be able to fetch the weather forecast details for today',  function (done) {
          this.request.get("/weather/chennai/today")
              .end(function (err, res) {
                 console.log("Body after /weather/chennai/today API call : ",JSON.stringify(res.body));
                 res.statusCode.should.be.equal(200);
                 done();
              });
       });
       it('Scenario 4: should be able to handle the invalid text given for today',  function (done) {
          this.request.get("/weather/chennai/todaaaaay")
              .end(function (err, res) {
                 console.log("Body after /weather/chennai/today API call : ",JSON.stringify(res.body));
                 res.statusCode.should.be.equal(404);
                 done();
              });
       });
   });
});
