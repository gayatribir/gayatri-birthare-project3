import React, { useEffect } from 'react'
import SearchUser from "./SearchUser";
import "react-dropdown/style.css";
import { useReducer } from "react";
import LoginSetup from "./LoginSetup";
import {AppContext} from "../context"

// const isLoggedIn = window.localStorage.getItem("userName")!=null ? true : false;
// const userName = window.localStorage.getItem("userName");


const getInitialState = (isLoggedIn) => {
  return { 
    isLoggedIn:isLoggedIn,
    userName: window.localStorage.getItem("userName")
  };
}

const reloadState = (isLoggedIn) => {
  let prestate;
  try {
    prestate = JSON.parse(window.localStorage.getItem("userName"));
  } catch(e) {}

  return prestate || getInitialState(isLoggedIn);
}

function Navbar(){
  const userName = window.localStorage.getItem("userName");
  const isLoggedIn = userName!=null ? true :false;

  // useEffect=()=>{

  // }

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "SIGNIN":
        return {
          ...state,
          isLoggedIn: [state.isLoggedIn, action.payload]
        };
        case "SIGNOUT":
        return {
          ...state,
          isLoggedIn: [state.isLoggedIn, action.payload]
        };
        case "SIGNUP":
          return getInitialState(isLoggedIn);
      default:
        state
    }
  }, 
  reloadState(isLoggedIn));
  console.log("isLoggedIn=",isLoggedIn);
  console.log("userName=",userName);
  
  return (
    <AppContext.Provider value={{dispatch}}>
    <nav className="nav">
      <div className='div-logo-search'>
      <div className="logo"><a href="/" className="logo-a">FrenConnect</a>{'  '}</div>
      <div className="nav-search-div"><SearchUser></SearchUser></div>
      </div>
      
      <div className="nav-items-div">
            <ul className="nav-items">
              <LoginSetup isLoggedIn={isLoggedIn} userName={userName}></LoginSetup>
            </ul>
            </div>
    </nav>
    </AppContext.Provider>
  )
}

export default Navbar