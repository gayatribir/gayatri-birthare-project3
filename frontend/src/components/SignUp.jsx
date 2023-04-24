import React,{useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom"

export default function SignUp(){
  const[message, setMessage] = useState("")
  const[userName, setUserName] = useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate();

  const navigateToSignIn=()=>{navigate("/signin");}

  async function submit(event){
    event.preventDefault();
    try{
      const result = await axios.post(`http://localhost:8000/api/user/signin`, {
        userName,password
      });
      if(result.status === 200){navigate("/home");}
      else if(result.status !== 409){setMessage(result.data);}
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
          <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
        </div>
      </form>
    </div>
  <h1>Login</h1>
  
  <form action="POST">
    <input type="userName" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Username" id="username"></input>
    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" id="password"></input>
    <input type="submit" onClick={submit}/>
  </form>
  <br/>
  <p>OR</p>
  <br/>
  <Link to="/signup">Signup Page</Link>

  {/* <form onSubmit = {submitSignin}>
    <label htmlFor="userName">User Name:</label>
    <input name = "userName" />
    <br />
    <label htmlFor="password">Password:</label>
    <input name = "password" />
    <br />
    <button type = "submit">SignIn</button>
  </form> */}
</div>
  )
}