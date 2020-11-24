const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true, unique: true },
  blogImage: { type: String, required: true },
  authorName: { type: String },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  commentCounts: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
