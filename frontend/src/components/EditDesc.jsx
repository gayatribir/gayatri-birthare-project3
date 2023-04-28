import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router';
import axios from "axios";
import {toast } from 'react-toastify';
import { AppContext } from '../context';

export default function EditDesc() {
  const navigate = useNavigate();
  const {userName, token,_id,description} = useContext(AppContext);

  const [oldDesc, setOldDesc] = useState("");
  const [user, setUser] = useState({
    _id,
    userName,
    description
  });


  const handleClose = () => {
    navigate("/user/"+userName);
  }
  
  async function updateProfile(){
    const response = await axios.put(`/api/user/`+user._id,{
      _id:user._id,
      userName: userName,
      description: user.description,
      firstName: user.firstName,
      lastName:user.lastName
    });
    if(response.status === 200){
      toast.success("You have successfully updated the description!");
      navigate("/user/"+userName);
    }
  }
  async function init(){
    const response = await axios.get("/api/user/search/" + userName)
    setUser(response.data[0]);
    setOldDesc(response.data[0].description);
}

  useEffect(() => {
    init();
  }, []);

  const handleUpdateDesc =(e)=>{
    if(user.description != null){
      if(user.description.trim() === oldDesc){
        toast.error("No update has been done to description.");
        return;
      }
      updateProfile();
    }else{
        toast.error("Please set description before submitting.");
      }
  }

 
if(user){
  return(
<div>
  <div className="edit-Auth-form-container">
      <form action="POST" className="Auth-form">
          <div className="form-group mt-3">
            <label>Description</label>
            <textarea
              className="form-control mt-1"
              onChange={e=>{setUser({ ...user, description: e.target.value })}}
              value={user.description != null ? user.description :""}
              maxLength="200"
            />
            {/* <input className="form-control mt-1" type="text" onChange={(e)=>{setUser({ ...user, description: e.target.value })}} value={user.description}></input>{` `} */}
          </div>
          <div className='div-btn'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateDesc}>
            Save Changes
          </Button>
          </div>
            
      </form>
    </div>
</div>
  )

}else{
  return ("");
}
}

