import React, { useState } from 'react'
import './Home.css'
import {Link} from "react-router-dom";
import Login from "./Login"

const Home = () => {
  const isLoggedIn = useState(Login);
  const handleLogout = () =>{
    localStorage.removeItem('token');
    window.location.reload();
  }


  return (
    <div>
   {isLoggedIn ? (
   <div className='home'>
    <div className='logout'>
    <div>
    <h1 className='heading'>Logout your Form</h1>
    </div>
    <div className='button-logout'>
    <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>
    </div>
   </div>
   ):(
    <Link to={'register/'}>Register</Link>
   )}
    </div>
  )
}

export default Home