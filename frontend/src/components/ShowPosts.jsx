import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ShowPosts"
import Post from "./Post";
import { AppContext } from '../context';

function ShowPosts({userName,isHomePage}){
  const [posts, setPosts] = useState([]);
  const {token} = useContext(AppContext)  
  
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