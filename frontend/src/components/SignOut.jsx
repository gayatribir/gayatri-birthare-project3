import React,{useState, useContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { AppContext } from '../context';

export default function SignOut(){
  const[message, setMessage] = useState("")
  const navigate = useNavigate();
  const {dispatch, userName, token} = useContext(AppContext);

  async function submit(event){
    event.preventDefault();
    try{
      const result = await axios.get(`/api/user/logout/`+ userName);
      if(result.status === 200){
        dispatch({type: "SIGNOUT"});
        navigate("/");
      }
      else if(result.status !== 409){
        setMessage(result.data);
      } else {
        setMessage("Well that's embarrasing!! For me!! Could you please try again.")
      }
    } catch(e) {
      setMessage("Error occurred."+e);
    } 
  }

  const cancel = () => navigate("/");


  return(
<div className="login-div">
  <h1>Do you want to sign out?</h1>
  {message}
  <form action="POST">
    <input type="submit" onClick={submit} value="Yes"/>{"  "}
    <input type="button" onClick={cancel} className="cancel-btn" value="No"/>
  </form>
  <br/>
</div>
  )
}