const express = require("express");
const mongoose = require("mongoose");
const Summary = require("../../models/summary");
const Transactions = require("../../models/transaction");
const router = express.Router();

require('dotenv').config()
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', err => {logError(err);});

router.get('/get-monthly-spending/:username', (req, res) => {
  Transactions.aggregate([
    {
      $match : { 
        $and : [
          { username : req.params.username},
          { $expr: { $eq: [ { "$month": "$date" }, { "$month": new Date() } ] } },
          { $expr: { $eq: [ { "$year": "$date" }, { "$year": new Date() } ] } }
        ]
      }
    },
    {
      $group: 
      {
        _id: {$month: "$date"}, 
        monthlySpending: { $sum: "$amount" } 
      }
    }], (err, result) => {
      if(err) return console.error(err);
      if(result.length === 0){
        res.json({
          _id: "",
          monthlySpending: 0
        })
      }
      else{
        res.json(result[0]);
        res.status(200)
      }
    });
})

router.get('/get-transac-data/:username', (req, res) => {
  Transactions.aggregate([
    { $match: { username : req.params.username } },
    {
      $group: 
      {
        _id: { $toLower: "$type" }, 
        totalAmount: { $sum: "$amount" } 
      }
    },
    {
      $sort : { totalAmount: -1 }
    }], (err, result) => {
      if(err) return console.error(err);
      if(result.length === 0){
        res.json([{
          _id: "It's currently empty",
          totalAmount: 0.01,
        }])
      }
      else{
        res.json(result);
        res.status(200)
      }
    });
})

router.get('/get-monthly-limit/:username', (req, res) => {
    Summary.find({username : req.params.username}, (err, result) => {
        if(err) return console.error(err);
        if(result.length === 0){
          res.json({
            monthlyLimit: 0
          })
        }
        else{
          res.json(result[0]);
          res.status(200)
        }
    })
});
  
router.put("/set-monthly-budget",(req, res) => {
    Summary.updateOne({username : req.body.username}, {monthlyLimit: req.body.monthlyLimit}, (err, result)=>{
        if(err) return console.error(err);
        else{
            res.send(req.body.monthlyLimit)
            res.status(200)
        }
    })

})

module.exports = router