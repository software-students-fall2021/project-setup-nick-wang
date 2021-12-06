const express = require("express");
const Diary = require("../../models/detail");
const router = express.Router();

require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

  router.get('/Details/:username/:date',(req, res) => {
    Diary.find({username:req.params.username, date: req.params.date}, (err, result)=>{
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
  
  router.put('/Details/:username/:date',(req, res) => {
    Diary.deleteMany({username: req.params.username, date: req.params.date},() =>{
      const newDiary = new Diary({
        username: req.params.username,
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

  router.get('/overview/yearList/:username',(req, res) => {
    Diary.find({username:req.params.username}, (err, result)=>{
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([{}]);
      }
      else{
        const yearList = [];
        for(var i = 0; i < result.length; i++){
          const date = result[i].date;
          const searchedYear = date.substring(date.length, date.length - 4);
          if(yearList.includes(searchedYear) === false){
            yearList.push(searchedYear);
          }
        }
        res.json(yearList);
      }
    })
  });

  router.get('/overview/:username/:year',(req, res) => {
    const selectedYear = new RegExp('.*-' + req.params.year);
    Diary.find({username: req.params.username, date: selectedYear}, (err, result)=>{
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([]);
      }
      else{
        const searchResult = {};
        for(var i = 0; i < result.length; i++){
          const splitedResult = result[i].content.split(" ");
          for(var j = 0; j < splitedResult.length; j++){
            if(searchResult[splitedResult[j]] == null){
              searchResult[splitedResult[j]] = 1;
            }
            else{
              searchResult[splitedResult[j]] = searchResult[splitedResult[j]] + 1;
            }
          }
        }
        //console.log(searchResult);
        const modifiedResult = [];
        for (var key in searchResult) {
          modifiedResult.push({
            text:key,
            value:searchResult[key]
          });
        }
        res.json(modifiedResult);
      }
    })
  });

  router.get('/overview/:username/:month/:year',(req, res) => {
    const selectedMonth = new RegExp(req.params.month + '.*-' + req.params.year);
    Diary.find({username: req.params.username, date: selectedMonth}, (err, result)=>{
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([]);
      }
      else{
        const searchResult = {};
        for(var i = 0; i < result.length; i++){
          const splitedResult = result[i].content.split(" ");
          for(var j = 0; j < splitedResult.length; j++){
            if(searchResult[splitedResult[j]] == null){
              searchResult[splitedResult[j]] = 1;
            }
            else{
              searchResult[splitedResult[j]] = searchResult[splitedResult[j]] + 1;
            }
          }
        }
        //console.log(searchResult);
        const modifiedResult = [];
        for (var key in searchResult) {
          modifiedResult.push({
            text:key,
            value:searchResult[key]
          });
        }
        res.json(modifiedResult);
      }
    })
  });

  module.exports = router