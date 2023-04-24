const express = require('express')
const router = express.Router();
const TweetModel = require('../db/tweet/tweet.model');


// router.get("/:tweetId", async (req, res) => {
//   const tweetId = req.params.tweetId;
//   const tweet = await TweetModel.getTweetById(tweetId);
//   res.send(tweet);
// });

router.get("/:userName", async (req, res) => {
  const userName = req.params.userName;
  const tweet = await TweetModel.getTweetByUserName(userName);
  console.log(tweet);
  res.send(tweet);
});

router.post("/", async (request, response) => {
  const tweet = request.body;
  const tweetRes = await TweetModel.createTweet(tweet);
  response.send(tweetRes);
});

router.put("/", async (request, response) => {
  const post = request.body;
  const postRes = await TweetModel.updatePost(post);
  response.send(postRes);
});

module.exports = router ;