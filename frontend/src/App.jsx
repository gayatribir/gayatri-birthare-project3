import React from "react";
import "./App.css";
import Navbar from './components/NavBar';
import "./styles/ShowTweets.css"
import "./styles/NavBar.css"
import "./styles/CreateTweet.css"
import Twitter from "./components/Twitter";
import {Link, Route, Routes} from "react-router-dom"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/User";


function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/" element={<Twitter/>}></Route>
        <Route path="/user/:userName" element={<User/>}></Route>
      </Routes>
      <Link to="/" element={<Twitter/>}></Link>
    </div>
  );
}

export default App;