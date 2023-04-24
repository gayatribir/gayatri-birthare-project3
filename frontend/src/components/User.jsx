import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ShowTweets from "./ShowPosts";
import Avatar from "./Avatar";

function User(){
  const [user, setUser] = useState([]);
  const [tweets, setTweets] = useState([]);
  const { userName } = useParams();

  async function init(){
    const request = await axios.get("http://localhost:8000/api/user/" + userName,{
      headers: {
        token: window.localStorage.getItem("token")
      }
    })
    setUser(request.data);
    console.log("init done");
}

async function fetchTweetsFromUser(){
  const request = await axios.get("http://localhost:8000/api/tweet/" + userName,{
    headers: {
      token: window.localStorage.getItem("token")
    }
  })
  setTweets(request.data);
  console.log("fetchTweetsFromUser done");
}

  useEffect(() => {
    init();
    // fetchTweetsFromUser();
  }, []);

  

  return (
    <div className="user-div">
      <div className="avatar-div"><Avatar userName={userName.charAt(0)}/>
        <div className="userdetails-div"><h2>{userName}</h2>joined on {user.length > 0 ? user[0].createdAt.substring(0,10)  :""}</div>
      </div>
      {tweets != null ? <ShowTweets userName={userName}></ShowTweets> : "Nothing to show"}
    </div>
  )
}
export default User;