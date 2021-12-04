const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    userID: String,
    username: String,
    monthlyLimit: Number
});

module.exports = mongoose.model('Summary', summarySchema);