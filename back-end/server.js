#!/usr/bin/env node

// import the express app
const server = require('./app')

// which port to listen for HTTP(S) requests
const port = 9000

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

// export the close function
module.exports = {
  close: close,
}