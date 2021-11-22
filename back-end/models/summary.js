const mongoose = require('mongoose');

const summarySchema = mongoose.Schema({
    username: String,
    monthlyLimit: Number,
    monthlySpending: Number
});

module.exports = mongoose.model('Summary', summarySchema);