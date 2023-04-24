import {Link, useMatch, useResolvedPath} from "react-router-dom"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import User from "./User";
import SignIn from "./SignIn";
import SearchUser from "./SearchUser";
import Avatar from "./Avatar";

const isLoggedIn = window.localStorage.getItem("userName")!=null ? true : false;
const userName = window.localStorage.getItem("userName");

function Navbar(){
  return (
    <nav className="nav">
      <div className="logo"><a href="/" className="logo-a">Social Media Platform</a></div>
      <div className="nav-search-div"><SearchUser></SearchUser></div>
      <div className="nav-items-div">
            <ul className="nav-items">
            {isLoggedIn ? <Link to={"/user/"+userName} element={<User></User>}>{userName}</Link> : <Link to="/signin" element={<SignIn></SignIn>}>Sign In</Link>}
            
            {isLoggedIn ? <Avatar userName={userName.charAt(0)}></Avatar> : <Link to="/signup" element={<SignUp></SignUp>}>Sign Up</Link>}
            </ul>
            </div>
    </nav>
  )
}

export default Navbar