const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true, unique: true },
  blogImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
