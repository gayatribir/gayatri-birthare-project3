import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import { useParams } from "react-router";
import User from "./User";
import Avatar from './Avatar';

export default function UserList() {
  const { userName } = useParams();
  const [users, setUsers] = useState([]);
 
  async function searchUsers(userName){
    const request = await axios.get(`/api/user/` + userName);
    setUsers(request.data);
    console.log("user search done");
    console.log(request.data);
}

  useEffect(() => {
    searchUsers(userName);
  }, [userName]);

  if(users.length > 0){
  return (
      <div className="user-result-div">
        <p>Here are the results:</p>
        { users.length > 0 ?
        
        users.map(user =>(
            <li key={user._id} className="user-result-li">
              <Avatar userName={user.firstName.charAt(0)}></Avatar>
              <Link to={"/user/"+user.userName} element={<User></User>} className="capitalize-link">{user.firstName+" "+user.lastName}</Link>
           </li>
          )) : ""
        }
      </div>
  );
      }else{return(
        <div className="user-result-div">
          <p>Sorry, no user exist in our system by this username.</p>
        </div>
      );}
}
