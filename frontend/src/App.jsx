import React, {useReducer} from "react";
import Navbar from './components/NavBar';
import Twitter from "./components/Twitter";
import {Route, Routes} from "react-router-dom"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/User";
import SignOut from "./components/SignOut";
import UserList from "./components/UserList";
import EditPost from "./components/EditPost";
import EditDesc from "./components/EditDesc";
import { ToastContainer } from 'react-toastify';
import {AppContext} from "./context"
import "./App.css";
import "./styles/ShowPosts.css"
import "./styles/NavBar.css"
import "./styles/CreatePost.css"
import "./styles/User.css"
import "./styles/Twitter.css"
import "./styles/SignIn.css"
import './styles/Avatar.css'
import './styles/Post.css'
import './styles/SearchUser.css'
import './styles/UserList.css';
import './styles/UserNavigate.css'
import './styles/PostActions.css'
import './styles/LoginSetup.css'
import './styles/EditPost.css'
import './styles/EditDesc.css'
import 'react-toastify/dist/ReactToastify.css';
import './styles/SignOut.css'
import './styles/SignUp.css'


const getInitialState = () => {
  return { 
    userName: "",
    token: "",
    _id:"",
    description:""
  }
}

const reloadState = () => {
  let prestate;
  try {
    prestate = JSON.parse(window.localStorage.getItem("user_info"));
  } catch(e) {}

  return prestate || getInitialState();
}


function App() {
  const [{userName, token, _id, description}, dispatch] = useReducer((state, action) => {
    switch(action.type) {

      case "SIGNIN":
        const newState = {
          ...action.payload,
        };
        window.localStorage.setItem("user_info", JSON.stringify(newState));
        return newState;

        case "SIGNOUT":
          window.localStorage.removeItem("user_info");
        return getInitialState();

      default:
        state
    }
  }, 
  reloadState());


  return (
    <AppContext.Provider value={{dispatch, userName, token, _id, description}}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/" element={<Twitter/>}></Route>
          <Route path="/user/:userName" element={<User/>}></Route>
          <Route path="/users/:userName" element={<UserList/>}></Route>
          <Route path="/edit/:postId" element={<EditPost/>}></Route>
          <Route path="/editprofile/:userName" element={<EditDesc/>}></Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} className="toast-div"/>
      </div>
    </AppContext.Provider>
  );
}

export default App;