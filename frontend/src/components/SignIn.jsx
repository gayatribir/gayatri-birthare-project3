import React,{useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom"

export default function SignIn(){
  const[message, setMessage] = useState("")
  const[userName, setUserName] = useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate();

  const navigateToSignup=()=>{navigate("/signup");}

  async function submit(event){
    event.preventDefault();
    try{
      const result = await axios.post(`http://localhost:8000/api/user/signin`, {
        userName,password
      });
      if(result.status === 200){navigate("/");
        setMessage(result.data);
        window.localStorage.setItem("token", result.data.token);
        window.localStorage.setItem("userName", result.data.userName);
        // dispatch({type:"SIGNIN", payload: {result.data.token, result.data.userName}});
      }
      
      else
      {setMessage("Well that's embarrasing!! For me!! Could you please try again.")}
    }catch(e){
      setMessage("Error occurred."+e);
    } 
  }

  return(
<div className="login-div">
  {message}
  <div className="Auth-form-container">
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
          <input className="form-control mt-1" type="userName" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter username" id="username"></input>
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input className="form-control mt-1" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password" id="password"></input>{` `}
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
        </div>
        <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
      </div>
    </form>
  </div>
  <br/>
  {/* <p>OR</p>
  <br/>
  <Link to="/signup">Signup Page</Link> */}
</div>
  )
}