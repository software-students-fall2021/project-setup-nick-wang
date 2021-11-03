// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules


app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data


// listens for any HTTP GET request for the / path, 
// and responds with the plain text, 'Hello!'
app.get("/", (req, res) => {
    res.send("Hello!")
  })

// search transaction function; post from client
app.post("/post-search", (req, res) => {
    // now do something amazing with the data we received from the client
    const data = {
      status: "amazing success!",
      message: "congratulations on searching this transaction: " + req.body.search,
      your_data: {
        search: req.body.search,
      },
    }
    res.json(data);
    //res.redirect("/")
  })

// add transaction function; post from client
app.post("/post-add", (req, res) => {
    // now do something amazing with the data we received from the client
    const data = {
      status: "amazing success!",
      message: "congratulations on send us this data!",
      your_data: {
        trscName: req.body.trscName,
        trscAmount: req.body.trscAmount,
        trscType: req.body.trscType,
      },
    }
    res.json(data);
    //res.redirect("/")
  })

// proxy requests to/from an API
app.get("/proxy-example", (req, res, next) => {
    // use axios to make a request to an API for animal data
    axios
      .get("http://localhost:3001/post-search")
      .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
      .catch(err => next(err)) // pass any errors to express
  })
module.exports = app