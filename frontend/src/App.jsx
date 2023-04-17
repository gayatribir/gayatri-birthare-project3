import React from "react";
import "./App.css";
import axios from "axios";
import Navbar from './Navbar';
import ShowTweets from "./styles/SignUp.css";
import "./styles/ShowTweets.css"
import "./styles/NavBar.css"
import "./styles/CreateTweet.css"
import Twitter from "./Twitter";
import {Link, Route, Routes} from "react-router-dom"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import User from "./User";

const router = createBrowserRouter([
  
  {
    path: '/login',
    element: <SignIn />
  },
  {
    path: '/',
    element: <Twitter />
  },


])

function App() {
  // const [data, setData] = React.useState([]);

  // React.useEffect(() => {
  //   axios.get("http://localhost:8000/api/").then((response) => {
  //     console.log("received response: "+ response);
  //     setData(response.data.message);
  //   });
  // }, []);

  return (
    <div className="App">
      <Navbar></Navbar>
      {/* <RouterProvider router={router } /> */}
      <Routes>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/" element={<Twitter/>}></Route>
        <Route path="/user/:userName" element={<User/>}></Route>
      </Routes>
      <Link to="/" element={<Twitter/>}></Link>
      {/* <Twitter></Twitter> */}
    </div>
  );
}

export default App;