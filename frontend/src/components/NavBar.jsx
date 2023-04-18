import {Link, useMatch, useResolvedPath} from "react-router-dom"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import SignUp from "./SignUp";
import SignOut from "./SignOut";

const isLoggedIn = window.localStorage.getItem("userName")!="" ? true :false;

function Navbar(){
  // console.log("In NavBar, gamePath=",gamePath);
  return (
    <nav className="nav">
      <a href="/"><FontAwesomeIcon icon={faTwitter} size="3x" className="twitter-icon"/></a>
            <ul className="nav-items">
              <Link to="/signin">Sign In</Link>
              {` `}
              {isLoggedIn ? <Link to="/signout" element={<SignOut></SignOut>}>Sign Out</Link> : <Link to="/signup" element={<SignUp></SignUp>}>Sign Up</Link>}
            </ul>
    </nav>
  )
}

export default Navbar