import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ShowTweets from "./ShowTweets";

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
    fetchTweetsFromUser();
  }, []);

  

  return (
    <div>
      <div><h1>{user.userName}</h1></div>
      <div>{user.createdAt}</div>
      {tweets != null ? <ShowTweets></ShowTweets> : "Nothing to show"}
      
    </div>
  )
}
export default User;