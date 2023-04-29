import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {useNavigate} from "react-router-dom"
import Tooltip from "react-bootstrap/Tooltip";
import { AppContext } from '../context';
import CreatePost from "./CreatePost";
import Avatar from "./Avatar";
import ShowPosts from "./ShowPosts";

function User(){
  const navigate = useNavigate();
  const {userName: loggedInUser} = useContext(AppContext);
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

  const handleEditDesc =()=>navigate("/editprofile/"+userName)
  

  return (
    <div className="user-div">
      <div className="profile-avatar-div">
        <div className="same-row-avatar-intro">
          <div><Avatar userName={userName.charAt(0)}/></div>
          <div className="intro-div">
            <h2>@{user.length > 0 ? user[0].userName :""}</h2>
            <p>{user.length > 0 ? user[0].firstName+" "+user[0].lastName :""} joined on {user.length > 0 ? user[0].createdAt.substring(0,10)+" "  :""}</p>
            <p >{user.length > 0 && user[0].description != null ? user[0].description+"  "  :"No description has been set "}{loggedInUser === userName ? <span className="desc-p">{user.length > 0 && userName === user[0].userName ? <input type="button" value="✏️" onClick={handleEditDesc}></input> : ""}</span> :""}</p>
            <div className="hide">Click edit button to edit description</div>
          </div>
        </div>
        
      </div>
      <div className="small-font-small-screen">
        <CreatePost></CreatePost>
        {tweets != null ? <ShowPosts userName={userName} isHomePage={false}></ShowPosts> : "Nothing to show"}
      </div>
      
      
    </div>
  )
}
export default User;