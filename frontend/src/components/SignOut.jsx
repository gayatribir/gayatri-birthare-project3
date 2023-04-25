import React,{useState, useContext} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom"
import { AppContext } from '../context';

export default function SignOut(){
  const[message, setMessage] = useState("")
  const navigate = useNavigate();
  const {dispatch} = useContext(AppContext);

  async function submit(event){
    event.preventDefault();
    try{
      const result = await axios.post(`http://localhost:8000/api/user/logout`);
      if(result.status === 200){
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("token");
        dispatch({type: "SIGNOUT"});
        navigate("/");
      }
      else if(result.status !== 409){setMessage(result.data);}
      else
      {setMessage("Well that's embarrasing!! For me!! Could you please try again.")}
    }catch(e){
      setMessage("Error occurred."+e);
    } 
  }

  return(
<div className="login-div">
  <h1>SignOut</h1>
  {message}
  <form action="POST">
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