const express = require("express");
const mongoose = require("mongoose");
const Summary = require("../../models/summary");
const transactions = require("../../models/transaction");
const router = express.Router();

require('dotenv').config()
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', err => {logError(err);});

router.get('/get-monthly-spending', (req, res) => {
  transactions.aggregate([
    {
      $match : { $expr: { $eq: [ { "$month": "$date" }, { "$month": new Date() } ] } }
    },
    {
      $group: 
      {
        _id: {$month: "$date"}, 
        totalAmount: { $sum: "$amount" } 
      }
    },
    {
      $sort: {_id: -1}
    }], (err, result) => {
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([{
          monthlySpending: 0
        }])
      }
      else{
        res.json(result[0]);
        res.status(200)
      }
    });
})

router.get('/get-transac-data', (req, res) => {
  transactions.aggregate([
    {
      $group: 
      {
        _id: "$type", 
        totalAmount: { $sum: "$amount" } 
      }
    }], (err, result) => {
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([{
          title: "",
          value: 0,
          color: '#FFFFFF'
        }])
      }
      else{
        res.json(result);
        res.status(200)
      }
    });
})

router.get('/get-monthly-limit', (req, res) => {
    Summary.find({}, (err, result) => {
        if(err) return console.error(err);
        if(result.length === 0){
          res.json([{
            monthlyLimit: 0
          }])
        }
        else{
          res.json(result[0]);
          res.status(200)
        }
    })
});
  
router.put("/set-monthly-budget",(req, res) => {
    Summary.updateOne({}, {monthlyLimit: req.body.monthlyLimit}, (err, result)=>{
        if(err) return console.error(err);
        else{
            res.send(req.body.monthlyLimit)
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