import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Avatar from "./Avatar";
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AppContext } from "../context";

export default function CreatePost({postId}){
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const {userName} = useContext(AppContext)  

  const handleSavePost = ()=> {
    if(postId != null && postId.length > 0){
      updatePost();
    } else {
      savePost();
    }
  }

  async function savePost(){
    const request = await axios.post(`/api/tweet`, {userName, content});
      if(request.status === 200){
        toast.success("Status created successfully!");
        navigate(0);
        return;
      } else {
        toast.error("Error occurred while updating. Please try again.");
        return;
      }
  }

  async function updatePost(){
    const response = await axios.put(`/api/tweet/`+postId,{
      _id: id,
      userName,
      content: content
    });

    console.log("Resonse " + response)
    if(response.status === 200){
      toast.success("Status updated successfully!");
      navigate("/");
      return;
    } else{
      toast.error("Error occurred while updating. Please try again.");
      return;
    }
  }

  async function fetchPostById(){
    const request = await axios.get(`/api/tweet/`+postId);
    setContent(request.data.content);
    setId(request.data._id);
  }

  useEffect(()=>{
    if(postId != null){
      fetchPostById();
    }
    
  },[]);

  return (
    <div className="create-post-div">
      {
        userName!="" ? 
        <div className="compose-form">
          <div className="compose-form-container">
            <Avatar userName={userName.charAt(0)}/>
            <textarea
              className="compose-form-textarea"
              placeholder="Let's connect!!👋"
              onChange={e=>setContent(e.target.value)}
              defaultValue={content}
              maxLength="200"
            />
          </div>
          <button className="compose-form-submit" disabled={!content} onClick={handleSavePost}>Post</button>
        </div>
        : ""
      }
    </div>
  )
}