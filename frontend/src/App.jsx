import React from "react";
import "./App.css";
import Navbar from './components/NavBar';
import "./styles/ShowTweets.css"
import "./styles/NavBar.css"
import "./styles/CreateTweet.css"
import "./styles/User.css"
import "./styles/Twitter.css"
import Twitter from "./components/Twitter";
import {Link, Route, Routes} from "react-router-dom"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/User";
import SignOut from "./components/SignOut";


function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signout" element={<SignOut/>}></Route>
        <Route path="/" element={<Twitter/>}></Route>
        <Route path="/user/:userName" element={<User/>}></Route>
      </Routes>
      {/* <div className="twitter-div">
      <Link to="/" element={<Twitter/>}></Link>
      </div> */}
      
    </div>
  );
}

export default App;