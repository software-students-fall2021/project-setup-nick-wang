const express = require("express");
const router = express.Router();

require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const diarySchema = new mongoose.Schema({
  date: String,
  content: String
});

const Diary = mongoose.model('Diary', diarySchema);

  router.get('/Details/:date',(req, res) => {
    Diary.find({date: req.params.date}, (err, result)=>{
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([{
          date: req.params.date,
          content: ""
        }])
      }
      else{
        res.json(result);
      }
    })
  });
  
  router.put('/Details/:date',(req, res) => {
    Diary.deleteMany({date: req.params.date},() =>{
      const newDiary = new Diary({
        date: req.params.date,
        content: req.body.content
      });
      newDiary.save(function (err) {
        if (err) return console.error(err);
        res.status(200);
        res.send();
      });
    })
  });

  module.exports = router