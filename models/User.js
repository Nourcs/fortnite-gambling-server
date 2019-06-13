const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: String,
    firstName: String,
    lastName: String,
    displayName: { type: String, default: "Jon Doe" },
    email: String,
    photoURL: String
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
