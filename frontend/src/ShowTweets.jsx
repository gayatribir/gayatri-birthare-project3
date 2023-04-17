import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTweets"
import moment from "moment/moment";
import { Link } from "react-router-dom";

function ShowTweets(){
  const [tweets, setTweets] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  
 
  useEffect(()=>{

    async function fetchAllTweets(){
        const request = await axios.get(`http://localhost:8000/api/tweet`);
        setTweets(request.data);
        console.log("done");
    }
    fetchAllTweets();
    // init();
  
},[])

const components = [];
    for(let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];
        const tweetComponent = (
        
          <div key={tweet._id} className="tweet">
            <div className="tweet-header">
                <div className="tweet-user"><Link to={'/user/' + tweet.userName}>{tweet.userName}</Link></div>
                <div className="tweet-user tweet-time">{moment.utc(tweet.updatedAt).local().startOf('seconds').fromNow()}</div>
                <div className="hide">{tweet.updatedAt}</div>
                </div>
              <div className="tweet-content">{tweet.content}</div>
            </div>); 
        components.push(tweetComponent);
    }


  const init = ()=>{
    axios.get("http://localhost:8000/api/tweet")
    .then(response =>{
      console.log('Printing buyers records ..  ', response.data );
      setTweets(response.data );
    })
    .catch(error=>{
      console.log('Something went wrong ', error);
    })
}
  return (
    <div className="tweet-div">
    {components}
    {/* {
          tweets.map(tweet =>(
            <div key={tweet._id} className="tweet">
            <div className="tweet-header">
                <div className="tweet-user"><Link to="/:userName">{tweet.userName}</Link></div>
                <div className="tweet-user tweet-time">{moment.utc(tweet.updatedAt).local().startOf('seconds').fromNow()}</div>
                <div className="hide">{tweet.updatedAt}</div>
                </div>
              <div className="tweet-content">{tweet.content}</div>
            </div>
          ))
        } */}
    
        
   </div>
  )
}
export default ShowTweets;