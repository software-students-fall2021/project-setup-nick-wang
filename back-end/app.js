const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")

// BodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan")
// require cors
const cors = require("cors")
//const axios = require("axios")

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cors())

// mark the public directory as all static files that do not require pre-processing
app.use("/static", express.static("public"))

// listens for any HTTP GET request for the / path,
// and responds with the plain text, 'Hello!'
// Api
const diaryWordCloudRouter = require("./routes/Diary/Overview")
const loginRouter = require("./routes/User/Login")

// ==============================================================
// router for Login (Basic)
app.use("/", loginRouter)

// router for HTTP GET requests to the root document
app.use("/", diaryWordCloudRouter)

// Test
app.get("/", (req, res) => {
  res.send("Hello!")
})

// send static file
const mockFile = [
  { name: "Steak", date: "11/4/2021", amount: 13, type: "Food", "color": "orange"},
  { name: "iphone", date: "11/4/2021", amount: 1000, type: "School", "color": "green"},
  { name: "macbook pro", date: "11/4/2021", amount: 2000, type: "office", "color": "brown"},
  { name: "pencil", date: "11/4/2021", amount: 1.9, type: "School", "color": "green" },
  { name: "shirt", date: "11/4/2021", amount: 50, type: "Clothing", "color": "navy" },
]
app.get("/Account_transaction_data", (req, res, next) => {
  // insert the environmental variable into the URL we're requesting
  axios
    .get(`${process.env.API_BASE_URL}?key=${process.env.API_SECRET_KEY}&num=10`)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})

app.get("/static-file", (req, res) => {
  // axios
  //   .get("transcation.json")
  //   .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
  //   .catch(err => next(err)) // pass any errors to express
  res.json(mockFile)
})

// search transaction function; post from client
app.post("/post-search", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  // now do something amazing with the data we received from the client
  const data = {
    status: "amazing success!",
    message:
      "congratulations on searching this transaction: " + req.body.search,
    your_data: {
      search: req.body.search,
    },
  }
  res.json(data)
})

// add transaction function; post from client
app.post("/post-add", (req, res) => {
  // console.log(req.body.trscName)
  console.log(`post data: ${JSON.stringify(req.body, null, 2)}`)
  // now do something amazing with the data we received from the client
  const data = {
    status: "amazing success!",
    message: "congratulations on adding the transaction!",

    your_data: {
      trscName: req.body.trscName,
      trscAmount: req.body.trscAmount,
      trscType: req.body.trscType,
    },
  }
  res.json(data)
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
