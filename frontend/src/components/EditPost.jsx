import React, { useContext } from "react";
import CreatePost from "./CreatePost";
import { useParams } from 'react-router';
import { AppContext } from "../context";


export default function EditPost(){
  const {userName} = useContext(AppContext);
  const { postId } = useParams();


 
  return (
    <div className="edit-post-div">
      <CreatePost userName={userName} postId={postId} isDelete={postId.charAt(postId.length-1) == '_'}></CreatePost>
    </div>
    
  )
}