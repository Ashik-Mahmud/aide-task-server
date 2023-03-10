const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: "admin",
    enum: ["editor", "author", "maintainer", "subscriber", "admin"],
  },
  plan: {
    type: String,
    required: true,
    default: "basic",
    enum: ["enterprise", "team", "basic", "company"],
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["active", "inactive", "pending"],
  },
  avatar: {
    url: {
      type: String,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
