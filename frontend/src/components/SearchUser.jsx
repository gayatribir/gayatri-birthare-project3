import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SearchUser(){
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const onChange=(value)=>{
    setUserName(value);
  }

  const onSearch =()=>{
    if(userName != null && userName!=" " && userName.trim().length > 0){
      navigate("/users/"+userName);
    } 
  }

  return (
    <div className="search-div">
        <div className="col-12">
            <div className="input-group">
              <input className="search-user" key="search-bar" value={userName} placeholder="Search user" onChange={(e) => onChange(e.target.value)}/>
              <input type="button" id="search-btn" className="" onClick={onSearch} value="Search"></input>
            </div>
        </div>
    </div>
  )
}