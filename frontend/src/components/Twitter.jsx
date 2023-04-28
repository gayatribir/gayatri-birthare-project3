import React, { useContext } from "react";
import { AppContext } from "../context";
import CreatePost from "./CreatePost";
import ShowPosts from "./ShowPosts";


export default function Twitter(){
  const {userName} = useContext(AppContext);
  
  return(
      <div className="twitter-div">
        {userName !=null && userName != ""? <CreatePost tweetId={null}></CreatePost> : ""}
        <ShowPosts userName={userName} isHomePage={true}></ShowPosts>
      </div>
  )
}