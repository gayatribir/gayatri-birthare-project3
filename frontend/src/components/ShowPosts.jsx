import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ShowPosts"
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Post from "./Post";
import { AppContext } from '../context';

function ShowPosts({userName}){
  const [posts, setPosts] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  const {state, dispatch} = useContext(AppContext);
  
  console.log("state=",state);
  useEffect(()=>{

    async function fetchTweetsFromUser(){
        const request = await axios.get(`http://localhost:8000/api/tweet/user/`+userName,{
          headers:{
            "token":window.localStorage.getItem("token"),
            "userName":window.localStorage.getItem("userName")
          }
        });
        setPosts(request.data);
        console.log("done");
    }
    async function fetchAllTweets(){
      const request = await axios.get(`http://localhost:8000/api/tweet/`,{
        headers:{
          "token":window.localStorage.getItem("token"),
          "userName":window.localStorage.getItem("userName")
        }
      });
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