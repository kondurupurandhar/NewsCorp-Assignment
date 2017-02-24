# News Corp - Assignment
## Description:
The application will fetch the weather forecast details for the given weekday and location. The data will be fetched using the below API's

https://api.darksky.net/forecast/[key]/[latitude],[longitude]

https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]

Used the below Google API go get the latitude and longitude:

https://maps.googleapis.com/maps/api/geocode/json?address=

## NPM Module used:
Used the below modules in application server:

1. express
2. request
3. mocha   
4. chai
5. chai-http

## How to run ?

Clone the project and go to the folder NewsCorp-Assignment

npm start

Access the server using below curl commands

curl http://localhost:8080/weather/chennai

curl http://localhost:8080/weather/thursday

curl http://localhost:8080/weather/today

## How to run test cases ?

From the current folder run the below command:

mocha test or npm test

Before running the command install below module:

mocha
chai
chai-http




