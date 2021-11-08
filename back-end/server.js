#!/usr/bin/env node

// import the express app
const server = require('./app')

// which port to listen for HTTP(S) requests
const port = 9000

// call a function to start listening to the port
const diaries = require("./DiaryMockData/Diaries")
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

server.get('/Details/:date',(req, res) => {
  res.json(diaries.filter(diaries => diaries.date === req.params.date));
});

server.put('/Details/:date',(req, res) => {
  //console.log(req.body);
  const targetDiary = diaries.filter(diaries => diaries.date === req.params.date);
  targetDiary[0].content = req.body.content;
  res.status(200);
});

// a function to stop listening to the port
const close = () => {
  listener.close()
}

// export the close function
module.exports = {
  close: close,
}