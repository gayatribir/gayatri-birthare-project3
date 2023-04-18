import React,{useEffect, useReducer, useState} from "react";
import CreateTweet from "./CreateTweet";
import ShowTweets from "./ShowTweets";

const initialState = window.localStorage.getItem("userName");
  // ? { isLoggedIn: true, user }
  // : { isLoggedIn: false, user: null };


export default function Twitter(){
  const [initialState, setInitialState] = useState("")

  useEffect(function() {
    setInitialState(window.localStorage.getItem("userName"));

}, []);

  // const [state, dispatch] = useReducer((state, action) => {
  //   switch(action.type) {
  //     case "SIGNIN":
  //       return {
  //         ...state,
  //         isLoggedIn: true
  //       };
  //       case "SIGNUP":
  //         return getInitialState(isHard);
  //     default:
  //       state
  //   }
  // }, 
  // reloadState(isHard)); 
  

  return(
    // <AppContext.Provider value={{dispatch}}>
      <div className="twitter-div">
        <h3 className="twitter-user-heading">Welcome {initialState != "" || initialState !=undefined ? initialState : ""}!</h3>
        {initialState != "" || initialState !=undefined ? <CreateTweet userName={initialState}></CreateTweet> : ""}
        <ShowTweets></ShowTweets>
      </div>
    // </AppContext.Provider>
  )
}