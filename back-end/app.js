// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require("cors")
const morgan = require("morgan")
//const axios = require("axios")

const app = express() // instantiate an Express object

// we will put some server logic here later...
// export the express app we created to make it available to other modules
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cors())
app.use(morgan("dev")) // outputs each request for debugging

// mark the public directory as all static files that do not require pre-processing
app.use("/static", express.static("public"))

// listens for any HTTP GET request for the / path,
// and responds with the plain text, 'Hello!'
app.get("/", (req, res) => {
  res.send("Hello!")
})

// send static file
const mockFile = [
  { name: "Steak", date: "11/4/2021", amount: 13, type: "Food" },
  { name: "iphone", date: "11/4/2021", amount: 1000, type: "School" },
  { name: "macbook pro", date: "11/4/2021", amount: 2000, type: "School" },
  { name: "pencil", date: "11/4/2021", amount: 1.9, type: "School" },
  { name: "shirt", date: "11/4/2021", amount: 50, type: "Clothing" },
]

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
  //res.redirect("/")
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
  // console.log(JSON.stringify(data, null, 2))
  res.json(data)
  //res.redirect("/")
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
