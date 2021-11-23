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

Transaction.deleteMany({ type: '' }, function (err) {
  if(err) console.log(err);
  //console.log("Successful deletion");
});

router.get("/Transaction_data", (req, res) => {
    Transaction.find({}, (err, docs) => {
        if(err) return console.error(err);
        res.json(docs);
      })
});



router.post("/edit_transaction_data",(req, res) => {
    summary.monthlyLimit = req.body.amount
    res.redirect('http://localhost:3000/account_book/category');
    res.status(200)
})
  
module.exports = router