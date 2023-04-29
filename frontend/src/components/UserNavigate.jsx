import Dropdown from 'react-bootstrap/Dropdown';
import {toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context';
import {useNavigate} from "react-router-dom"
import React,{useContext} from "react";

function UserNavigate({userName}) {
  const navigate = useNavigate();
  const {dispatch} = useContext(AppContext);

  async function submit(event){
    event.preventDefault();
    try{
      const result = await axios.get(`/api/user/logout/`+ userName);
      if(result.status === 200){
        dispatch({type: "SIGNOUT"});
        toast.success("You have successfully signed out.");
        navigate("/");
      }
      else if(result.status !== 409){
        toast.error(result.data);
      } else {
        toast.error(result.data);
        // setMessage("Well that's embarrasing!! For me!! Could you please try again.")
      }
    } catch(e) {
      console.log(e);
      toast.error(e);
      // setMessage("Error occurred."+e);
    } 
  }

  return (
    <Dropdown>
    <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic" className='navigate-user-ddl'>
      {userName}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href={"/user/"+userName}>View Profile</Dropdown.Item>
      <Dropdown.Item onClick={submit}>SignOut</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default UserNavigate;