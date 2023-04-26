const express = require('express')
const router = express.Router();
const TweetModel = require('../db/tweet/tweet.model');



router.get("/:tweetId", async (req, res) => {
  const tweetId = req.params.tweetId;
  const tweet = await TweetModel.getTweetById(tweetId);
  res.send(tweet);
});

router.get("/user/:userName", async (req, res) => {
  const userName = req.params.userName.toLowerCase();
  let tweet = await TweetModel.getTweetByUserName(userName);
  tweet = tweet.filter(t => {
    if (t.userName.toLowerCase() === userName) {
        return true;
    }
    return false;
});
  // console.log(tweet);
  res.send(tweet);
});

router.post("/", async (request, response) => {
  const tweet = request.body;
  const tweetRes = await TweetModel.createTweet(tweet);
  // console.log("post created with id"+tweetRes);
  response.send(tweetRes);
});

router.put("/:postId", async(request, response) => {
  const postId = request.params.postId;
  const postBody = request.body;
  // if(postBody=={}){console.log("Body is empty")}
  // console.log("Found post body "+postBody);
 
  const postRes = await TweetModel.updatePost(postId, postBody);
  // console.log("post created with id"+postRes);
  response.send(postRes);
});

module.exports = router ;