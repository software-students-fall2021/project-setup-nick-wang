const express = require("express");
const mongoose = require("mongoose");
const Summary = require("../../models/summary");
const router = express.Router();

require('dotenv').config()
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', err => {logError(err);});

Summary.deleteOne({monthlyLimit: null})

router.get('/get-monthly-budget', (req, res) => {

    Summary.find({}, (err, result)=>{
      console.log(result);
        if(err) return console.error(err);
        if(result.length === 0){
          res.json([{
            monthlyLimit: 0,
            monthlySpending: 0
          }])
        }
        else{
          res.json(result[0]);
          res.status(200)
        }
    })
});
  
router.post("/set-monthly-budget",(req, res) => {
    Summary.updateMany({}, {monthlyLimit: req.body.amount}, (err, result)=>{
        if(err) return console.error(err);
        else{
            res.redirect('http://localhost:3000/account_book');
            res.status(200)
        }
    })

})


/*
router.get('/:username/get-monthly-budget', (req, res) => {
    summary.find({username: req.params.username}, (err, result)=>{
        if(err) return console.error(err);
        if(result.length === 0){
          res.json([{
            monthlyLimit: 0,
            monthlySpending: 0
          }])
        }
        else{
          res.json(result);
          res.status(200)
        }
    })
});
  
router.post("/:username/set-monthly-budget",(req, res) => {
    summary.updateOne({username: req.params.username}, {monthlyLimit: req.body.amount}, (err, result)=>{
        if(err) return console.error(err);
        else{
            res.redirect('http://localhost:3000/account_book');
            res.status(200)
        }
    })

})
*/

module.exports = router