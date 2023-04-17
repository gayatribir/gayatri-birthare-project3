const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

exports.UserSchema = new Schema({
  firstName: { type: String, default: null, required:true },
  lastName: { type: String, default: null, required:true },
  userName: { type: String, unique: true,required:true },
  password: { type: String,required:true },
  token: { type: String },
},{collection : 'User'});

// module.exports = mongoose.model("user", UserSchema);