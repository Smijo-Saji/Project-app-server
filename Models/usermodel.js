const mongoose = require("mongoose");

//each model has model- schema
//schema creation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  gitHub: {
    type: String,
  },
});

//model creation - name same as db collection name
const users = mongoose.model("users", userSchema);

// exporting model to be used in controllers
module.exports = users;
