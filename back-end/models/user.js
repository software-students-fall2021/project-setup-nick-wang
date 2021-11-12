const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
    username: String,
    password: String
});

// Create models
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
