import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';

export default function SignUp(){
  const[message, setMessage] = useState("")
  const[userName, setUserName] = useState("")
  const[password, setPassword] = useState("")
  const[firstName, setFirstName] = useState("")
  const[lastName, setLastName] = useState("")
  const navigate = useNavigate();

  const navigateToSignIn = ()=>{navigate("/signin");}

  async function submit(event){
    event.preventDefault();
    event.preventDefault();
    if(userName == "" || password == "" || firstName=="" || lastName==""){
      setMessage("All fields are mandatory. Please enter details.");
      return;
    }
    try{
      const result = await axios.post(`/api/user/signup`, {
        userName,
        password,
        firstName,
        lastName
      });
      if(result.status === 200) {
        toast.success("Yay!! 🎉 You have registered successfully.");
        navigate("/");
      }
    }catch(e){
      if(e.response.status === 409){
        setMessage(e.response.data);
      } else{
        setMessage("Error occurred."+e);
      }
      
    } 
  }

  return(
<div className="signup-div">

  <div className="signup-auth-form-container">
    <div className="div-message">{message}</div>
      <form action="POST" className="Auth-form-signup">
        <div className="Auth-form-content">
          <h1 className="Auth-form-title">Sign Up</h1>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={navigateToSignIn}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input className="form-control mt-1" type="firstName" onChange={(e)=>{setFirstName(e.target.value)}} placeholder="Enter first name" id="firstname"></input>
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input className="form-control mt-1" type="lastName" onChange={(e)=>{setLastName(e.target.value)}} placeholder="Enter last name" id="lastname"></input>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input className="form-control mt-1" type="userName" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter username" id="username"></input>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input className="form-control mt-1" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password" id="password"></input>{` `}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
</div>
  )
}