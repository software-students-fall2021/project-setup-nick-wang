const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
// require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan")
// require cors
const cors = require("cors")

const diaryWordCloud = require("./routes/Diary/Overview")


// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))
// use cors
app.use(cors())

// ==============================================================
// route for HTTP GET requests to the root document
app.use("/", diaryWordCloud)

app.get("/", (req, res) => {
  res.send("Hello world!")
})

// ==============================================================
// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
// import and instantiate express
const cors = require('cors')
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
app.use(cors())
// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app

