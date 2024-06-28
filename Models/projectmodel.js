const mongoose = require("mongoose");

//each model has model- schema
//schema creation
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  coverImg: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
    unique: true,
  },
  gitHub: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

//model creation - name same as db collection name
const projects = mongoose.model("projects", projectSchema);

// exporting model to be used in controllers
module.exports = projects;
