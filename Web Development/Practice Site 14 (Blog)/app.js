//require modules (including lodash)
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

// use/format modules
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// starting content for the primary pages (home, about, contact)
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// global variable
let posts = [];

//instructions for get request to home directory
app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    // send posts if there are any
    postInput: posts
  });
})

//instructions for get request to about directory
app.get("/about", function(req, res) {
  res.render("about", {
    aboutStartingContent: aboutContent
  });
})

//instructions for get request to contact directory
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactStartingContent: contactContent
  });
})

//instructions for get request to compose directory
app.get("/compose", function(req, res) {
  res.render("compose");
})

//instructions for post request to compose directory
app.post("/compose", function(req, res) {
  // store input from post
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  //add post data to array
  posts.push(post)
  //send back home (should have new blog post added)
  res.redirect("/")
})

//instructions for get request to all blog directories
app.get("/posts/:topic", function(req, res) {
  // get name of the extension they typed into the address bar
  const requestedTitle = req.params.topic
  // render the appropriate page, if it exists
  posts.forEach(function(ele) {
    // use lodash for casing
    if (_.lowerCase(ele.title) === _.lowerCase(requestedTitle)) {
      res.render("post", {
        topicTitle: ele.title,
        topicPost: ele.content
      });
    } else {
      console.log("No match.")
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});