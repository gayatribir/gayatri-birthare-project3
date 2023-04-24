import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "./Avatar";

export default function CreatePost({userName}){
  const [content, setContent] = useState("");

  const handleSavePost = (event)=> {
    if(content != null && content.length > 0){savePost();}
    
  }
  async function savePost(){
        const request = await axios.post(`http://localhost:8000/api/tweet`,{userName, content},{
          "token":window.localStorage.getItem("token"),
          "userName":window.localStorage.getItem("userName")
        });
        console.log("done");
        console.log(request.data);
    }

  return (
    <div className="create-post-div">
      {userName!="" ? 
      <form className="compose-form">
      <div className="compose-form-container">
        <Avatar userName={userName.charAt(0)}/>
        <textarea
          className="compose-form-textarea"
          placeholder="What's happening?"
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button className="compose-form-submit" disabled={!content} onClick={handleSavePost}>Post</button>
    </form>
      : ""}
    </div>
  )
}