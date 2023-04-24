import React,{useEffect, useReducer, useState} from "react";
import CreatePost from "./CreatePost";
import ShowPosts from "./ShowPosts";
import SearchUser from "./SearchUser";

// const userName = window.localStorage.getItem("userName")==null ? "guest" : window.localStorage.getItem("userName");
  // ? { isLoggedIn: true, user }
  // : { isLoggedIn: false, user: null };

const getInitialState = (isLoggedIn) => {
  return { 
    isLoggedIn:isLoggedIn
  };
}

const reloadState = (isLoggedIn) => {
  let prestate;
  try {
    prestate = JSON.parse(window.localStorage.getItem("userName"));
  } catch(e) {}

  return prestate || getInitialState(isLoggedIn);
}


export default function Twitter(){
  const userName = window.localStorage.getItem("userName")==null ? "guest" : window.localStorage.getItem("userName");
  const isLoggedIn = userName!=null ? true :false;


const [state, dispatch] = useReducer((state, action) => {
  switch(action.type) {
    case "SIGNIN":
      return {
        ...state,
        isLoggedIn: [...state.isLoggedIn, action.payload]
      };
      case "SIGNOUT":
      return {
        ...state,
        isLoggedIn: [...state.isLoggedIn, action.payload]
      };
      case "SIGNUP":
        return getInitialState(isLoggedIn);
    default:
      state
  }
}, 
reloadState(isLoggedIn));
  

  return(
      <div className="twitter-div">
        <h3 className="twitter-user-heading">Welcome {userName}!</h3>
        {userName != "guest"? <CreatePost userName={userName}></CreatePost> : ""}
        <ShowPosts></ShowPosts>
      </div>
  )
}