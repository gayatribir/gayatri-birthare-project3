import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "./Avatar";

export default function CreatePost({userName, postId}){
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  

  const handleSavePost = (event)=> {
    if(postId != null && postId.length > 0){updatePost();}
    if(content != null && content.length > 0){savePost();}
    
  }

  async function savePost(){
        const request = await axios.post(`http://localhost:8000/api/tweet`,{userName, content},
        {
          headers:{
            "token":window.localStorage.getItem("token"),
            "userName":window.localStorage.getItem("userName")
          }
        }
        );
        // console.log("done");
        // console.log(request.data);
    }

  async function updatePost(){
      const request = await axios.post(`http://localhost:8000/api/tweet/`+postId,{
        _id: _id,
        userName: userName,
        content: content
      },{
        headers:{
          "token":window.localStorage.getItem("token"),
          "userName":window.localStorage.getItem("userName")
        }
      });
      console.log("done updating");
      console.log(request.data);
  }

  async function fetchPostById(postId){
    const request = await axios.get(`http://localhost:8000/api/tweet/`+postId,{
      headers:{
        "token":window.localStorage.getItem("token"),
        "userName":window.localStorage.getItem("userName")
      }
    });
    console.log("done");
    console.log(request.data);
    setContent(request.data.content);
    // setPost(request.data);
    setId(request.data._id);
    // this.setState({
      // _id= request.data._id;
      // userNamePost= request.data.userName;
      // contentMsg= request.data.content;
      // });
}

  useEffect(()=>{
    if(postId != null && postId.length > 0){
      let oldPost = fetchPostById(postId);
      console.log(oldPost);
      
    }
  },[]);

  // const changeContent=(e)=>{
  //   setContent(e.target.value);
  //   // setState()
  // }

  return (
    <div className="create-post-div">
      {userName!="" ? 
      <form className="compose-form">
      <div className="compose-form-container">
        <Avatar userName={userName.charAt(0)}/>
        <textarea
          className="compose-form-textarea"
          placeholder="What's happening?"
          onChange={e=>setContent(e.target.value)}
          defaultValue={content}
        />
      </div>
      <button className="compose-form-submit" disabled={!content} onClick={handleSavePost}>Post</button>
    </form>
      : ""}
    </div>
  )
}