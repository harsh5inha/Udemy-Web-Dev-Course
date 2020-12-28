const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//connect to local DB named wikiDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

//define schema for documents of type 'article'
const articleSchema = {
  title: String,
  content: String
}

// create model for new articles (documents follow the articleSchema above & go into the collection named 'articles')
const Article = mongoose.model("Article", articleSchema);


////////////////////REQUESTS TARGETTING ARTICLES COLLECTION AS A WHOLE////////////////////
app.route("/articles") //using the chained route handler notation
  //instructions for a get request to our articles route (Get All)
  .get(function(req, res){
    Article.find(function(err, foundArticles){
    if (!err) {
      res.send(foundArticles)
    } else {
      res.send(err);
    }
    })
  })
  //instructions for a post request to our articles collection
  .post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article.")
    } else {
      res.send(err);
    }
  })
  })
  //instructions for a delete request to our Articles collection (Delete All)
  .delete(function(req, res){
    Article.deleteMany({},function(err){
      if(!err){
        res.send("Successfully deleted all articles.")
      } else {
        res.send(err)
      }
    })
  })


////////////////////REQUESTS TARGETTING SPECIFIC DOCUMENTS WITHIN OUR COLLECTION////////////////////
app.route("/articles/:articleTitle") //using the chained route handler notation
  //instructions for a get request to a particular article's directory
  .get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){ //get the article title requested through the ":" notation
      if (foundArticle){
        res.send(foundArticle)
      } else {
        res.send("No articles matching that title was found.")
      }
    })
  })
  // instructions for a put request to a particular article's directory (Update the data with brand new entry)
  .put(function(req,res){
    Article.update(
      {title: req.params.articleTitle},                     //find the data needing to be replaced
      {title: req.body.title, content: req.body.content},   //replace said data with new data
      {overwrite: true},                                    //ensure that fields in document will be overwritten even if not explicitly specified in the PUT request (have to do this bc mongoose by default has this set to false, so it'd effectively function as a PATCH request unless we specify this)
      function(err){
        if(!err){
          res.send("Successfully replaced the selected article.")
        }
      })
  })
// instructions for a patch request to a particular article's directory (update an observation's fields as specified by user)
  .patch(function(req,res){
    Article.update(
      {title: req.params.articleTitle},               //find the data needing to be updated
      {$set: req.body},                               //update only the fields which the user specifies
      function(err){
        if(!err){
          res.send("Successfully updated the selected article.")
        } else {
          res.send(err);
        }
      })
  })
  //instructions for a delete request to a particular article's directory
  .delete(function(req,res){
    Article.deleteOne(
      {title: req.params.articleTitle},             //find article with title as specified by user in 'articleTitle'
      function(err){
      if(!err){
        res.send("Successfully deleted selected article.")
      } else {
        res.send(err)
      }
    })
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
