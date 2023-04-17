import React,{useReducer} from "react";
import CreateTweet from "./CreateTweet";
import ShowTweets from "./ShowTweets";

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

export default function Twitter(){

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
        <CreateTweet userName={""}></CreateTweet>
        <ShowTweets></ShowTweets>
      </div>
    // </AppContext.Provider>
  )
}