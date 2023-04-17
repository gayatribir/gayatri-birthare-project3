import {Link, useMatch, useResolvedPath} from "react-router-dom"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import SignUp from "./SignUp";


function Navbar(){
  // console.log("In NavBar, gamePath=",gamePath);
  return (
    <nav className="nav">
      <a href="/"><FontAwesomeIcon icon={faTwitter} size="3x" className="twitter-icon"/></a>
            <ul className="nav-items">
              <Link to="/signin">Sign In</Link>
              {` `}
              <Link to="/signup" element={<SignUp></SignUp>}>Sign Up</Link>
              {` `}
              {/* <Link to="/" element>Homepage</Link> */}
                {/* <li class="list-item"><a href="/academic.html">About</a></li>
                <li class="list-item"><a href="/contact.html">Contact</a></li>
                <li class="list-item"><a href="/blog.html">Blog</a></li> */}
            </ul>
    </nav>
  )
}

export default Navbar