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
  return TweetModel.findOne({userName:userName}).exec();
}

function deleteTweet(id) {
  return TweetModel.deleteOne({_id: id}).exec();
}

module.exports = {
  createTweet,
  returnAllTweets,
  getTweetById,
  deleteTweet,
  getTweetByUserName
}

// app.post("/add", async (request, response) => {
//   const post = new postModel(request.body);

//   try {
//     await post.save();
//     response.status(200).send(user);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// app.get("/", async (request, response) => {
//   const posts = await postModel.find({});

//   try {
//     response.status(200).send(posts);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });
// app.get("/:postId", async (request, response) => {
//   const postId = req.params.postId;
  

//   try {
//     const post = await postModel.filter(x => x.id == postId);
//         if(post == undefined || post == null){
//             return res.status(400).send("Post "+post.id+" not found!");
//         }
//         return res.status(200).send(post[0]);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// module.exports = app;