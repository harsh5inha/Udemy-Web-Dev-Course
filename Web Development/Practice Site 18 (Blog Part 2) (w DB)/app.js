//require modules
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connect to our cloud DB named blogDB
// we're using an environment variable to hide our DB password
mongoose.connect("mongodb+srv://admin-harsh:" + process.env.MDB_PASS + "@cluster0.ldyey.mongodb.net/blogDB", {useNewUrlParser: true,useUnifiedTopology: true})

// create schema for Posts
const postsSchema = {
  title: String,
  post: String
}

// create Post model, which follows above schema, for those inputs. Creates the `posts` collection in our blogDB Databse
const Post = mongoose.model("Post", postsSchema)

// starting content
const homeStartingContent = "This is our default Home Page content. Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "This is our default 'About Us' content. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "This is our default 'Contact Us' content. Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// instructions for get requests to our static pages
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});


// instructions for post requests to our /compose route (what to do when a new entry is posted)
app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    post: req.body.postBody
  })
  post.save(function(err){
    if(!err){                 // make sure the redirect only once the the post is saved
      res.redirect("/")
    }
  });
});


// instructions for get request to home page (show the default home content always, and other truncated posts, if they exist)
app.get("/", function(req, res){
  Post.find({}, function(err, foundPosts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundPosts
      });
  })
});


// instructions for get request for specific posts (when you clickon 'Read More') paths are specified by their unique Mongo `_Id`
app.get("/posts/:postId", function(req, res){
  Post.findOne({_id: req.params.postId}, function(err, foundPost){
    res.render("post", {
      title: foundPost.title,
      content: foundPost.post
    })
  })
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
