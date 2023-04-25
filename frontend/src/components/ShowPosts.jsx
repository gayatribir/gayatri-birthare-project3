import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ShowPosts"
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Post from "./Post";

function ShowPosts({userName}){
  const [posts, setPosts] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  
 
  useEffect(()=>{

    async function fetchTweetsFromUser(){
        const request = await axios.get(`http://localhost:8000/api/tweet/`+userName);
        setPosts(request.data);
        console.log("done");
    }
    async function fetchAllTweets(){
      const request = await axios.get(`http://localhost:8000/api/tweet/`);
      setPosts(request.data);
      console.log("done");
  }
  if(userName == null){fetchAllTweets();}
  else{fetchTweetsFromUser();}
    
},[])


  return (
    <div>
       <ul className="timeline">
      {
        posts.map(post =>(
          <li key={post._id} className="timeline-item">
            <Post postUserName={post.userName} updatedAt={post.updatedAt} content={post.content} tweetId={post._id} loggedInUser={userName}></Post>
         </li>
        ))
      }
      </ul>
    </div>
  )
}
export default ShowPosts;