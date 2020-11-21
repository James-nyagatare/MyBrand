const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  commentedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
