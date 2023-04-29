const express = require('express')
const router = express.Router();
const TweetModel = require('../db/tweet/tweet.model');
const auth = require('../middleware/auth')


router.get("/:tweetId", async (req, res) => {
  const tweetId = req.params.tweetId;
  if(tweetId == 'undefined'){
    res.status(200).send("Paramater is null or undefined: getTweetById", tweet);
  }
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
  if(auth.verifyToken(request, response)) {
    const tweet = request.body;
    try{
      const tweetRes = await TweetModel.createTweet(tweet);
      response.send(tweetRes);
    }catch(e){
      return response.status(500).send(e);
    }  
  }
});

router.put("/:postId", async(request, response) => {
  if(auth.verifyToken(request, response)) {
    const postId = request.params.postId;
    const postBody = request.body;
    try{
      const postRes = await TweetModel.updatePost(postId, postBody);
      response.send(postRes);
    }catch(e){
      return response.status(500).send(e);
    }
  }
});

router.delete("/:postId", async(request, response) => {
  if(auth.verifyToken(request, response)) {
    console.log("Deleting post id");
    const postId = request.params.postId;
    try{
      const postRes = await TweetModel.deleteTweet(postId);
      response.status(200).send(postRes);
    }catch(e){
      return response.status(500).send(e);
    }
  }
});

module.exports = router ;