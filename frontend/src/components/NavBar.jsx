import {Link, useNavigate} from "react-router-dom"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import User from "./User";
import SignIn from "./SignIn";
import SearchUser from "./SearchUser";
import Avatar from "./Avatar";
import "react-dropdown/style.css";
import UserNavigate from "./UserNavigate";
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import LoginSetup from "./LoginSetup";
import {AppContext} from "../context"

const isLoggedIn = window.localStorage.getItem("userName")!=null ? true : false;
const userName = window.localStorage.getItem("userName");


const options = [
  { value: "View Profile", label: "View Profile" },
  { value: "SignOut", label: "SignOut" }
];

const onSelect= (option)=> {
  console.log('You selected ', option.label)
  console.log('You selected ', option.value)
  // if(option.label === "View Profile"){
  //   navigate("/user/"+userName);
  // }
  
  //this.setState({selected: option})
}
const defaultOption = options[0];



function Navbar(){
  
  return (
    <nav className="nav">
      <div className="logo"><a href="/" className="logo-a">Social Media Platform</a></div>
      <div className="nav-search-div"><SearchUser></SearchUser></div>
      <div className="nav-items-div">
            <ul className="nav-items">
              <LoginSetup isLoggedIn={isLoggedIn} userName={userName}></LoginSetup>
            </ul>
            </div>
    </nav>
  )
}

export default Navbar