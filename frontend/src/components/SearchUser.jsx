import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SearchUser(){
  const [userName, setUserName] = useState("");
  const [userRecords, setUserRecords] = useState([]);
  const navigate = useNavigate();

  const onChange=(value)=>{
    setUserName(value);
  }

  const onSearch =(event)=>{
    if(userName != null && userName!=" " && userName.trim().length > 0){navigate("/users/"+userName);}
      
  }
  const keyDownHandler = event => {
    console.log('User pressed: ', event.key);

    if (event.key === 'Enter') {
      event.preventDefault();

      navigate("/users/"+userName);
    }
  };

  return (
    <div className="search-div">
        <div className="col-12">
            <div className="input-group">
              <input className="search-user" key="search-bar" value={userName} placeholder="Search user" onChange={(e) => onChange(e.target.value)}/>
              <input type="button" id="search-btn" className="" onClick={onSearch} value="Search"></input>
            </div>
        </div>
        {/* {userRecords.length > 0 ? <Navigate to="/users" state={{ userRecords: userRecords}} replace={true} /> : ""} */}
    </div>
  )
}