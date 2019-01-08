const mongoose = require("mongoose");
const express = require("express");
const app = express();
const methodOverride = require('method-override')
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require('dotenv').config();
const Word = require("./models/word.js")
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;


// Middleware- after config and dependencies but bedore routes
// use method override
// use PUT and DELETE verbs (HTML only allows GET and POST)
app.use(methodOverride('_method'))
// use public folder for static asses, like css
app.use(express.static('public'))
// populates req.body with parsed info from forms, if no data from forms, it will return an empty object
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());


// ---------------ROUTES-----------------
app.get("/words", (req,res)=>{
  Word.find((err,data)=>{
    res.render("index.html")
  })
})


db.once("open", ()=> console.log("connected to the database"));

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'words';

// // Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
// open the connection to mongo
db.on('open' , ()=>{
  console.log('connected to mongo');
});


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
