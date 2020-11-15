//require express
const express = require('express')

//use app to represent the express module
const app = express();

//require body-bodyparser
const bodyParser = require("body-parser")

//use body parser, specify a `urlencoded` output bc we're receiving information from a form
//and specify extended to true to parse nested objects if we hypothetically we were doing that. (required to specify even if we're not)
app.use(bodyParser.urlencoded({extended: true}))

//listen to a particular port for any HTTP requests from the browser.
//This is your server, it literally serves your HTML/CSS/JS to the client whenever the browser requests it
app.listen(3000, function() {
  console.log("Server is running on port 3000");
})



//index.html
//send the index.html file when the browser requests the root route
app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
})

//when we get a post request to our home route, perform this series of events
app.post("/", function(req, res){

  //Get the two submitted numbers on the form from index.html via body-parser.urlencoded
  var num1 = Number(req.body.num1)
  var num2 = Number(req.body.num2)

  //add them together
  var result = num1 + num2

  //Return text to the screen
  res.send("Your BMI is " + result)
})





//bmicalculator.html
//Send the bmiCalculator page when 'bmicalculator' web url is requested by browser
app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + '/bmiCalculator.html');
})

//when we get a post request delivered to our bmi route, perform this series of events
app.post("/bmicalculator", function(req, res){

  //Get the two submitted numbers on the form from index.html via body-parser.urlencoded
  var weight = Number(req.body.weight)
  var height = Number(req.body.height)

  //add them together
  var result = weight / (height*height)

  //Return text to the screen
  res.send("Your bmi is " + result)
})
