const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    username: String,
    monthlyLimit: Number,
    monthlySpending: Number
});

module.exports = mongoose.model('Summary', summarySchema);