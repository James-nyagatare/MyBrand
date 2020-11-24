const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
