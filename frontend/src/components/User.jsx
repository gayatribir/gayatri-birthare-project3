import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ShowPosts from "./ShowPosts";
import Avatar from "./Avatar";

function User(){
  const [user, setUser] = useState([]);
  const [tweets, setTweets] = useState([]);
  const { userName } = useParams();

  async function init(){
    console.log("In User view profile: init() method");
    const request = await axios.get("http://localhost:8000/api/user/" + userName,{
      headers:{
        "token":window.localStorage.getItem("token"),
        "userName":window.localStorage.getItem("userName")
      }
    })
    setUser(request.data);
    console.log("init done");
}

async function fetchTweetsFromUser(){
  const request = await axios.get("http://localhost:8000/api/tweet/user/" + userName,{
    headers:{
      "token":window.localStorage.getItem("token"),
      "userName":window.localStorage.getItem("userName")
    }
  })
  setTweets(request.data);
  console.log("fetchTweetsFromUser done");
}

  useEffect(() => {
    init();
    fetchTweetsFromUser();
  }, []);

  

  return (
    <div className="user-div">
      <div className="avatar-div"><Avatar userName={userName.charAt(0)}/>
        {/* <div className="userdetails-div"><h2>{user.length > 0 ? user[0].firstName+" "+ user[0].lastName :""}</h2><h4>{userName}</h4>joined on {user.length > 0 ? user[0].createdAt.substring(0,10)  :""}</div> */}
      </div>
      <div className="intro-div">
        <h2>{user.length > 0 ? user[0].firstName+" "+ user[0].lastName :""}</h2>
        <h4>@{userName}</h4>
        <p>joined on {user.length > 0 ? user[0].createdAt.substring(0,10)  :""}</p>
        <p>{user.length > 0 ? user[0].description  :""}</p>
      </div>
      {tweets != null ? <ShowPosts userName={userName}></ShowPosts> : "Nothing to show"}
    </div>
  )
}
export default User;