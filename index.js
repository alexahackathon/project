var express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    knex = require('./db/knex')

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

if(process.env.NODE_ENV !== "production"){
  require('dotenv').load();
}

app.get("/", function(req,res){
  knex('users').join('contacts', 'users.id', 'contacts.user_id')
    .select('users.firstname as user_name', 
            'users.phone as user_phone', 
            'contacts.firstname as contacts_name',
            'contacts.phone as contacts_phone')
    .where('users.id', 1)
    .then((data) => {
        res.render("home", {data});
    })
  
});

app.get("/api/contacts", function(req,res){
  knex('users').join('contacts', 'users.id', 'contacts.user_id')
    .select('users.firstname as user_name', 
            'users.phone as user_phone', 
            'contacts.firstname as contacts_name',
            'contacts.phone as contacts_phone')
    .where('users.id', 1)
    .then((data) => {
      res.send(data)
    })
});

app.post("/api/contacts", function(req,res){
  knex('contacts').insert({
    firstname: req.body.firstname,
    phone: req.body.phone,
    user_id: 1
    })
    .then((data) => {
      res.redirect('/')
    })
});

app.get("*", function(req,res){
  res.status("404");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port 3000...")
});