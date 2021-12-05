const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");
require("dotenv").config({ silent: true }); // Load env variables

// BodyParser
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// import some useful middleware
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require("morgan");
// require cors
const cors = require("cors")
// require passport
const passport = require("passport")

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"));
// use cors
app.use(cors())
// use passport
app.use(passport.initialize())

//Database
require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

// listens for any HTTP GET request for the / path,
// and responds with the plain text, 'Hello!'
// Api
const diaryWordCloudRouter = require("./routes/Diary/Overview")
const diaryDetailRouter = require("./routes/Diary/Detail")
const accountSummaryRouter = require("./routes/Accountbook/Summary")
const transactionRouter = require("./routes/Account_book_trancsaction/transaction_display");
const internal = require("stream");

// ==============================================================
// Users function
app.use("/users", require("./routes/users"));

// router for HTTP GET requests to the root document
app.use("/", diaryWordCloudRouter);

app.use("/", diaryDetailRouter)

app.use("/", accountSummaryRouter)

app.use("/", transactionRouter)

// Test
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// database for accout book main page
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:!!!'));
db.once('open', function() {
  // we're connected!
  console.log("hi database conntected")
});

const transactionSchema = new mongoose.Schema({
  username: String,
  name: String,
  date: Date,
  amount: Number,
  type: String
});

const Transaction = mongoose.model('Transactions', transactionSchema);

let userNameForSearch;
// get recent transactions from db and sent them back to front-end
app.post("/recent-trsc", (req, res) => {
  userNameForSearch = req.body.username
  console.log("user in the backend: " +req.body.username)
  console.log(JSON.stringify(req.body, null, 2))

  Transaction.find({username: req.body.username}, (err, docs) => {
    if(err) return console.error(err);

    console.log(docs.length)

    if (docs.length > 5)
    {
      console.log(docs[docs.length-1])
      res.json([docs[docs.length-1], docs[docs.length-2], docs[docs.length-3], 
        docs[docs.length-4], docs[docs.length-5]])
    }
    else
      res.json(docs);
  })
})

app.get("/transaction_data", (req, res) => {
  Transaction.find({}, (err, docs) => {
    if(err) return console.error(err);
    res.json(docs);
  })
})

// search transaction function; post from client
app.post("/post-search", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))

  Transaction.find({name: req.body.search, username:userNameForSearch}, (err, result)=>{
    if(err) return console.error(err);
    if(result.length === 0){
      res.json([])
    }
    else{
      console.log(result)
      res.json(result);
    }
  })

})

// add transaction function; post from client
app.post("/post-add", (req, res) => {
  console.log(`post data: ${JSON.stringify(req.body, null, 2)}`)

  const today = new Date()
  const newTrsc = new Transaction ({
    //username added
    username: req.body.username,
    name: req.body.trscName,
    date: today,
    amount: req.body.trscAmount,
    type: req.body.trscType,
  })

  console.log(newTrsc)
  newTrsc.save().then(() => console.log("new transaction added"))
  //res.json(data)
  res.send();
})

// proxy requests to/from an API
app.get("/proxy-example", (req, res, next) => {
  // use axios to make a request to an API for animal data
  axios
    .get("http://localhost:9000/post-search")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})
module.exports = app
