import React from "react";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import "./ShowPosts"
import Post from "./Post";
import User from "./User";


function ShowPosts({userName,isHomePage}){
  const [posts, setPosts] = useState([]); 
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function fetchTweetsFromUser(){
        const request = await axios.get(`/api/tweet/user/`+userName);
        setPosts(request.data);
    }
    async function fetchAllTweets(){
      const request = await axios.get(`/api/tweet/`);
      setPosts(request.data);
  }
  if(isHomePage){
    fetchAllTweets();
  } else{
    fetchTweetsFromUser();
  }
},[])

// function navigateToUserPage(userName){navigate("/user/"+userName);}
  return (
    <div>
       <ul className="timeline">
      {
        posts.map(post =>(
          <li key={post._id} className="timeline-item">
            <Post postUserName={post.userName} updatedAt={post.updatedAt} content={post.content} tweetId={post._id}></Post>
         </li>
        ))
      }
      </ul>
    </div>
  )
}
export default ShowPosts;