import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import { useParams } from "react-router";
import User from "./User";

export default function UserList() {
  const { userName } = useParams();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
 
  async function searchUsers(userName){
    const request = await axios.get(`http://localhost:8000/api/user/`+userName);
    setUsers(request.data);
    console.log("user search done");
    console.log(request.data);
}

  useEffect(() => {
    searchUsers(userName);
  }, [userName]);

  return (
      <div className="user-result-div">
        { users.length > 0 ?
        
        users.map(user =>(
            <li key={user._id}>
              <Link to={"/user/"+user.userName} element={<User></User>}>{user.userName}</Link>
           </li>
          )) : ""
        }
      </div>
  );
}
