import React, {useContext} from 'react'
import SearchUser from "./SearchUser";
import "react-dropdown/style.css";
import LoginSetup from "./LoginSetup";
import {AppContext} from "../context"

function Navbar(){
  const {userName} = useContext(AppContext);
  
  console.log("user_info: ", userName);
  return (
    <nav className="nav">
      <div className='div-logo-search'>
      <div className="logo"><a href="/" className="logo-a">FrenConnect</a>{'  '}</div>
      <div className="nav-search-div"><SearchUser></SearchUser></div>
      </div>
      
      <div className="nav-items-div">
            <ul className="nav-items">
              <LoginSetup userName={userName}></LoginSetup>
            </ul>
            </div>
    </nav>
  )
}

export default Navbar