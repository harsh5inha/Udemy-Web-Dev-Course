//This isn't actually a website, just called it site 9 for consistency

//Load express
const express = require('express')

//use app to represent the express module. This is common procedure.
const app = express();

//Using a forward slash means we're specifying the root directory
//And our callback funciton tells the server what to do when a browser makes a request to that directory
app.get("/", function(req, res){
  console.log(req);
  res.send("<h1>Hello, world!</h1>");
})

//create an about page
app.get("/about", function(req, res){
  res.send("Hiya mate, I'm Harsh.");
})

//create a contact page
app.get("/contact", function(req, res){
  res.send("Contact me @ hhrsinha@gmail.com");
})

//listen to a particular port, add a callback function
app.listen(3000, function() {
  console.log("Server started on port 3000");
})
