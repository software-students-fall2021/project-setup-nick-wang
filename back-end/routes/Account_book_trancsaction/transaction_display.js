const express = require("express");
const router = express.Router();
const Transaction = require("../../models/transaction");

require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

router.get("/Transaction_data/:username", (req, res) => {
    console.log(req.params.username);
    Transaction.find({username : req.params.username}, (err, docs) => {
        if(err) return console.error(err);
        res.json(docs);
        res.status(200);
      })
});

router.get("/Transaction_data/:type", (req, res) => {
  console.log(req.body.username);
  Transaction.find({username : req.body.username, type: req.params.type}, (err, docs) => {
      if(err) return console.error(err);
      res.json(docs);
    })
});

router.put("/save_transaction_data",(req, res) => {
  //var i = 1;
  res.status(200);
          res.send();
    for(var i=0; i<req.body.length; i++){
      console.log(req.body.length);
      Transaction.findOneAndUpdate({_id:req.body[i]._id}, 
        {name:req.body[i].name, amount:req.body[i].amount, date:req.body[i].date}, null, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
          res.status(200);
          res.send();
        }
    })
    res.status(200);
    res.send();
  }
  /*
  findOne({ _id:req.body[i]._id }, function (err, doc){
      doc.name = req.body[i].name;
      doc.amount = req.body[i].amount;
      doc.date = req.body[i].date;
      doc.save();
    });
  }
  */
})

router.post("/delete_transaction",(req, res) => {
  console.log(req.body.name)
  Transaction.deleteOne( {username : req.body.username, name: req.body.name}, (err, result)=>{
      if(err) return console.error(err);
      else{
        res.redirect('http://localhost:3000/account_book');
        res.status(200)
      }
  })
  res.status(200)
})

router.post("/edit_transaction_data",(req, res) => {
    summary.monthlyLimit = req.body.amount
    res.redirect('http://localhost:3000/account_book/category');
    res.status(200)
})
  
module.exports = router