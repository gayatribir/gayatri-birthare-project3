import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Avatar from "./Avatar";
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AppContext } from "../context";

export default function CreatePost({postId,isDelete}){
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [id, setId] = useState("");
  let actualPostId = (isDelete) ? postId.substring(0,postId.length-1) :postId; 
  
  const {token, userName} = useContext(AppContext)  

  async function deletePost(){

    if(actualPostId == undefined){
      toast.error("Tweet Id is null");
      return;
    }
    const request = await axios.delete(`/api/tweet/`+actualPostId);

    if(request.status === 200) {
      console.log("setting actualpostid null");
      actualPostId = null;

      console.log("Deleted post id");
      toast.success("Status deleted successfully!");
      navigate("/");
    } else {
      console.log("error while deleting");
      toast.error("Error occurred while updating. Please try again.");
      return;
    }
  }

  const handleSavePost = (event)=> {
    if(isDelete == true){
      deletePost();
      return;
    }

    if(actualPostId != null && actualPostId.length > 0){
      updatePost();
    } else {
      savePost();
    }
  }

  async function savePost(){
    const request = await axios.post(`/api/tweet`, {userName, content});
        
      if(request.status === 200){
        toast.success("Status created successfully!");
        navigate("/");
        return;
      } else {
        toast.error("Error occurred while updating. Please try again.");
        return;
      }
  }

  async function updatePost(){
    if(actualPostId == undefined){
      toast.error("Tweet Id is null");
      return;
    }
      const request = await axios.put(`/api/tweet/`+actualPostId,{
        _id: id,
        userName,
        content: content
      });
      if(request.status === 200){
        toast.success("Status updated successfully!");
        return;
      } else{
        toast.error("Error occurred while updating. Please try again.");
        return;
      }
  }

  async function fetchPostById(){
    if(actualPostId == undefined || actualPostId == null){
      toast.error("Tweet Id is null");
      return;
    }
    const request = await axios.get(`/api/tweet/`+actualPostId);
    console.log("done");
    console.log(request.data);
    setContent(request.data.content);
    setId(request.data._id);
  }

  useEffect(()=>{
    if(actualPostId != null){
      fetchPostById();
    }else{
      console.log("else useEffect: ",userName);
    }
    
  },[]);

  return (
    <div className="create-post-div">
      {
        userName!="" ? 
        <form className="compose-form">
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
          <button className="compose-form-submit" disabled={!content} onClick={handleSavePost}>{actualPostId!=null && actualPostId.length>0 ? isDelete? "Delete" : "Edit" : "Post"}</button>
        </form>
        : ""
      }
    </div>
  )
}