const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  hash: String,
  salt: String,
  age: String,
  gender: String,
  city: String,
  phone: String,
  email: String,
  role: String,
  admin: Boolean,
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
