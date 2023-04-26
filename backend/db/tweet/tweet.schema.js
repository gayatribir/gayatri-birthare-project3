const { Long } = require("mongodb");

const Schema = require("mongoose").Schema;
var current_millies = new Date().getTime();

exports.TweetSchema = new Schema({
  userName: { type: String, required: true, trim: true, minLength:1, maxLength: 15 },
  content: { type: String, required: true, trim: true, minLength:1, maxLength: 200 },
  file: { data: Buffer, contentType: String},
  fileName: { type: String, required: false,}
},{ collection : 'Tweet' , timestamps:true});
