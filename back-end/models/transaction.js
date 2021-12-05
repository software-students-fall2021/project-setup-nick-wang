const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    userID: String,
    username: String,
    name: String,
    date: Date,
    amount: Number,
    type: String
  });

module.exports = mongoose.model('transactions', transactionsSchema);