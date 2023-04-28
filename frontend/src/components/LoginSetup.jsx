import React from "react";
import UserNavigate from "./UserNavigate";
import Avatar from "./Avatar";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"

export default function LoginSetup(userName){
  const navigate = useNavigate();
  
  const onSignInClick=()=>navigate("/signin");
  
  const onSignUpClick=()=>navigate("/signup");

  if(userName.userName != "" && userName.userName != undefined){
    return(
<div className="nav-options-div">
  <UserNavigate userName={userName.userName}></UserNavigate>
  <div className="avatar-div"><Avatar userName={userName.userName.charAt(0)}></Avatar></div>
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