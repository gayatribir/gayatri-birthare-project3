import React from "react";
import CreatePost from "./CreatePost";
import { useParams } from 'react-router';


export default function EditPost(){
  const userName = window.localStorage.getItem("userName");
  const { postId } = useParams();

 
  return (
    <div className="edit-post-div">
      <CreatePost userName={userName} postId={postId}></CreatePost>
    </div>
    
  )
}