//require dotenv, express, https, and body-parser
require('dotenv').config();
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')


//init express
const app = express();

//init body-parser
app.use(bodyParser.urlencoded({extended: true}));

//init server on port 3000
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})

//instructions for get request to root directory
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

//instructions for post request to root directory
app.post("/", function(req, res){

    //get parameters for api request
    const query = req.body.cityName; //query = name of the city inputted to the index.html file rendered on browser
    const apiKey = process.env.API_KEY  //my unique api key (using Environment Variable to hide key - in .env file)
    const unit = "metric" //units for temperature

    // make request for data from api using parameters
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit //final api endpoint to get weather data
    https.get(url, function(response){ //use input name 'response' to distinguish from res used earlier
    console.log(response.statusCode); //log the response code to the console for example's sake

    //parse data from API for what's needed on your site
    response.on('data', function(data){
      const weatherData = JSON.parse(data) //parse into JS object
      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" //dynamic icon URL (address template provided on openweathermap site)

    // display your webpage on browser based on data gleaned from API (desc, temp, & imgURL) and user input (query)
    res.write("<h1>The weather is currently " + desc + " in " + query + "</h1>")
    res.write('The temperature is ' + temp + " degrees Celcius.")
    res.write("<img src =" +  imgURL + ">")
    res.send()
    })
  })
})
