const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, unique: true },
  content: { type: String, unique: true },
  blogImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
