const { Long } = require("mongodb");

const Schema = require("mongoose").Schema;
var current_millies = new Date().getTime();

exports.TweetSchema = new Schema({
  userName: { type: String, required: true, trim: true, minLength:5, maxLength: 15 },
  content: { type: String, required: true, trim: true, minLength:10, maxLength: 200 },
},{ collection : 'Tweet' , timestamps:true});
