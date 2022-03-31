//jshint esversion:6

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


mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get((req, res) => {

  Article.find(function(err, foundArticle) {
    if (err) {
      res.send(err);
    } else {
      res.send(foundArticle);
    }
  });
})

.post((req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save((err) => {
    if (!err) {
      res.send("Successufully articles added!");
    } else {
      res.send(err);
    }
  });

})

.delete((req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("articles deleted Successufully !");
    } else {
      res.send(err);
    }
  });
});

app.route("/articles/:articleTitle")
.get((req,res)=>{

Article.findOne({title:req.params.articleTitle}, (err,foundArticle)=>{
  if(foundArticle) {res.send(foundArticle);}
  else
  { res.send("Noo article match to the title");}
});

})
.put((req,res)=>{
Article.update(
    {title:req.params.articleTitle},
    {title:req.body.title, content:req.body.content},
    {overwrite:true},
    (err)=>{
      if(!err){res.send("Article successufully updated!");}
    });

})
.patch((req,res)=>{
  Article.update(
  {title:req.params.articleTitle},
  {$set:req.body},
  (err)=>{
    if(!err){res.send("Article successufully updated!");}
    else { res.send(err);}
  });


})
.delete((req,res)=>{
  Article.deleteOne(  
{title:req.params.articleTitle},
(err)=>{
  if(!err){res.send("Article successufully deleted!");}
  else { res.send(err);}
}
);
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
