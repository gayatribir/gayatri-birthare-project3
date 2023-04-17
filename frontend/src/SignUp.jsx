import React,{useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom"

export default function SignUp(){
  const[message, setMessage] = useState("")
  const[userName, setUserName] = useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate();

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
  <h1>Login</h1>
  {message}
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