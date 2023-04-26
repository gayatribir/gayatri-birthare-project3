import React from "react";
import UserNavigate from "./UserNavigate";
import Avatar from "./Avatar";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"

export default function LoginSetup(isLoggedIn, userName){
  const navigate = useNavigate();
  
  const onSignInClick=(event)=>{
    navigate("/signin");
  }
  
  const onSignUpClick=(event)=>{
    navigate("/signup");
  }

  if(isLoggedIn.isLoggedIn){
    return(
<div className="nav-options-div">
  <UserNavigate userName={isLoggedIn.userName}></UserNavigate>
  <div className="avatar-div"><Avatar userName={isLoggedIn.userName.charAt(0)}></Avatar></div>
</div>
    )
  }else{
    return(
    <div className="nav-options-div">
      <Button variant="secondary" id="signin-btn" onClick={onSignInClick}>Sign In</Button>{'    '}
      <Button variant="secondary" id="signup-btn" onClick={onSignUpClick}>Sign Up</Button>
    </div>
    )
  }
}