const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    username: String,
    date: String,
    content: String
  });
  
module.exports = mongoose.model('Diary', diarySchema);