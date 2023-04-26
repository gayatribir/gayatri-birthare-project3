const mongoose = require("mongoose")
const TweetSchema = require('./tweet.schema').TweetSchema;

const TweetModel = mongoose.model("TweetModel", TweetSchema);

function createTweet(tweet) {
  return TweetModel.create(tweet);
}

function returnAllTweets() {
  return TweetModel.find().sort({updatedAt:-1}).exec();
}

function getTweetById(id) {
  return TweetModel.findById(id).exec();
}

function getTweetByUserName(userName) {
  return TweetModel.find().sort({updatedAt:-1}).exec();
}

function deleteTweet(id) {
  return TweetModel.deleteOne({_id: id}).exec();
}
function updatePost(postId, post) {
  return TweetModel.findByIdAndUpdate(postId, post, {new:true});
}

module.exports = {
  createTweet,
  returnAllTweets,
  getTweetById,
  deleteTweet,
  getTweetByUserName,
  updatePost
}