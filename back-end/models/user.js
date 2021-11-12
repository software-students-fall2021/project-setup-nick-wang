const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
});

// Create models
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
