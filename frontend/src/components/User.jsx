import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ShowPosts from "./ShowPosts";
import Avatar from "./Avatar";
import {useNavigate} from "react-router-dom"
import Tooltip from "react-bootstrap/Tooltip";
import { AppContext } from '../context';

function User(){
  const navigate = useNavigate();
  const {userName: loggedInUser, token} = useContext(AppContext);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    description: ""
  });
  const [tweets, setTweets] = useState([]);
  const { userName } = useParams();

  const showTooltip = props => (
    <Tooltip {...props}>MaxLength of a post is 200 characters.</Tooltip>
  );

  async function init(){
    console.log("In User view profile: init() method");
    const response = await axios.get("/api/user/search/" + userName)
    setUser(response.data);
    console.log("init done");
}

async function fetchTweetsFromUser(){
  const response = await axios.get("/api/tweet/user/" + userName)
  setTweets(response.data);
}

  useEffect(() => {
    init();
    fetchTweetsFromUser();
  }, []);

  const handleEditDesc =(e)=>{
    navigate("/editprofile/"+userName)
  }
  

  return (
    <div className="user-div">
      <div className="profile-avatar-div">
        <Avatar userName={userName.charAt(0)}/>
      <div className="intro-div">
        <h2>@{user.length > 0 ? user[0].userName :""}</h2>
        <p>{user.length > 0 ? user[0].firstName+" "+user[0].lastName :""} joined on {user.length > 0 ? user[0].createdAt.substring(0,10)+" "  :""}</p>
        <p >{user.length > 0 && user[0].description != null ? user[0].description+"  "  :"No description has been set "}{loggedInUser === userName ? <span className="desc-p">{user.length > 0 && userName === user[0].userName ? <input type="button" value="✏️" onClick={handleEditDesc}></input> : ""}</span> :""}</p>
        <div className="hide">Click edit button to edit description</div>
      </div>
      </div>
      {tweets != null ? <ShowPosts userName={userName} isHomePage={false}></ShowPosts> : "Nothing to show"}
      
    </div>
  )
}
export default User;