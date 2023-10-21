const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: Array,
  publicationData: Date,
  readTime: String,
  articleImg: String,
});

module.exports = mongoose.model("Articles", articleSchema);
