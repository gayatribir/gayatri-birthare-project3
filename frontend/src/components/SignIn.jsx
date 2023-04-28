import React,{useState, useContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { AppContext } from '../context';
import {toast } from 'react-toastify';

export default function SignIn(){
  const[message, setMessage] = useState("")
  const[userName, setUserName] = useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate();
  const {dispatch} = useContext(AppContext);

  const navigateToSignup=()=>{navigate("/signup");}

  async function submit(event){
    event.preventDefault();
    if(userName == "" || password == ""){
      setMessage("All fields are mandatory. Please enter details.");
      return;
    }
    try{
      const result = await axios.post(`/api/user/signin`, {
        userName,password
      });
      if(result.status === 200){
        setMessage();
        dispatch({type: "SIGNIN", payload: result.data});
        toast.success("Yay!! 🎉 You have successfully logged in.");
        navigate("/");
      } 
    } catch(e) {
      if(e.response.status === 400){
        setMessage(e.response.data);
      }else{
        setMessage("Error occurred." + e);
      }
    } 
  }

  return(
    <div className="login-div">
      
      <div className="signin-auth-form-container">
      <div className="div-message">{message}</div>
        <form action="POST" className="Auth-form">
          <div className="Auth-form-content">
            <h1 className="Auth-form-title">Login</h1>
            <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={navigateToSignup}>
                    Sign Up
                  </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input className="form-control mt-1" type="userName" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter username" id="username" required></input>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input className="form-control mt-1" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password" id="password" required></input>{` `}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
          </div>
        </form>
      </div>
      <br/>
    </div>
  )
}