import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateTweet({userName}){
  const [content, setContent] = useState("");

  const handleSaveTweet = (event)=> {
    saveTweet();
  }
  async function saveTweet(){
        const request = await axios.post(`http://localhost:8000/api/tweet`,{userName, content},{
          "token":window.localStorage.getItem("token")
        });
        console.log("done");
        console.log(request.data);
    }

  return (
    <div className="create-tweet">
      {userName!=null ? 
      <div>
        <textarea rows={4}
        cols={40} defaultValue="What's on your mind today!" onChange={e => setContent(e.target.value)}></textarea>
        <div><input type="button" className="btn btn-primary btn-sm" value="Submit!" onClick={handleSaveTweet}></input></div>
      </div>
      : ""}
    </div>
  )
}