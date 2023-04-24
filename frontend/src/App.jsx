import React from "react";
import "./App.css";
import Navbar from './components/NavBar';
import "./styles/ShowPosts.css"
import "./styles/NavBar.css"
import "./styles/CreatePost.css"
import "./styles/User.css"
import "./styles/Twitter.css"
import "./styles/SignIn.css"
import Twitter from "./components/Twitter";
import {Link, Route, Routes} from "react-router-dom"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/User";
import SignOut from "./components/SignOut";
import './styles/Avatar.css'
import './styles/Post.css'
import './styles/SearchUser.css'
import UserList from "./components/UserList";
import './styles/UserList.css';


function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signout" element={<SignOut/>}></Route>
        <Route path="/" element={<Twitter/>}></Route>
        <Route path="/user/:userName" element={<User/>}></Route>
        <Route path="/users/:userName" element={<UserList/>}></Route>
        {/* <Link to="/users" element={<UserList userRecords={userRecords}></UserList>}></Link> */}
      </Routes>
      
    </div>
  );
}

export default App;