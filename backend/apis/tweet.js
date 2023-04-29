const express = require('express')
const router = express.Router();
const TweetModel = require('../db/tweet/tweet.model');
const auth = require('../middleware/auth')


router.get("/:tweetId", async (req, res) => {
  const tweetId = req.params.tweetId;
  if(tweetId == 'undefined'){
    res.status(200).send("Paramater is null or undefined: getTweetById", tweet);
  }
  try{
    const tweet = await TweetModel.getTweetById(tweetId);
    return res.send(tweet);
  }catch(e){
    return res.send("Error occurred in getTweetById ", e);
  }
});

router.get("/user/:userName", async (req, res) => {
  const userName = req.params.userName.toLowerCase();
  try{
    let tweet = await TweetModel.getTweetByUserName(userName);
    tweet = tweet.filter(t => {
      if (t.userName.toLowerCase() === userName) {
          return true;
      }
      return false;
    });
      res.send(tweet);
  }catch(e){
    return res.send("Error occurred in getTweetByUserName ", e);
  }

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
  } else{
    return response.status(401).send("Invalid Token");
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
  }else{
    return response.status(401).send("Invalid Token");
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
  }else{
    return response.status(401).send("Invalid Token");
  }
});

module.exports = router ;