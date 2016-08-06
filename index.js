var express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    morgan = require("morgan"),
    bodyParser = require("body-parser");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/", function(req,res){
  res.render("home");
});

app.get("*", function(req,res){
  res.status("404");
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});