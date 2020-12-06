//boilerplate server code
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))    //use bodyParser as specified
app.use(express.static("public"))                   //use static
app.set('view engine', "ejs");                      //use ejs as the template engine

//require our custom-built, local module
const date = require(__dirname + "/date.js");

// initialize arrays for items
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = []

// instructions for get request to root directory
app.get("/", function(req, res) {

  let day = date.getDay()     // use export method defined in date.js

  // pass your formatted date and the items array to your list.ejs HTML page
  // Note: by default the function searches in the views folder for whatever label we provide below. Here we have the 'list' label for the 'list.ejs' file.
  res.render("list", {
    listTitle: day,
    newListItems: items
  })
});

// instructions for post request to root directory
app.post("/", function(req, res) {

  let item = req.body.newItem;        // Get the data inputted on the HTML form by the user

  if (req.body.list === "Work"){      // If user added item to the work page
    workItems.push(item);             // Add item to workItems array
    res.redirect("/work");            // Initiate a get request to the /work route (which will show an updated work list and basically the list adding process can start all over again.)
  } else {                            // If user added item to the default page
    items.push(item);                 // Add the item to the items array
    res.redirect("/");                // initiate a get request to the root directory (which will show an updated list and basically the list adding process can start all over again.)
  }
  })

// instructions for get request to work directory
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
})

// instructions for get request to about directory
app.get("/about", function(req, res) {
  res.render("about")
})

//listen on port
app.listen(3000, function() {
  console.log("Server running on port 3000")
})



// // deprecated code for a switch statement to figure out what day it is
// // use switch bc there are so many cases
// switch (currentDay) {
//   case 0:
//     day = "Sunday";
//     break;
//   case 1:
//     day = "Monday";
//     break;
//   case 2:
//     day = "Tuesday";
//     break;
//   case 3:
//     day = "Wednesday";
//     break;
//   case 4:
//     day = "Thursday";
//     break;
//   case 5:
//     day = "Friday";
//     break;
//   case 6:
//     day = "Saturday";
//     break;
//   // theoretically, this should never execute
//   default:
//   console.log("Error: current day is equal to: " + currentDay);
// }
