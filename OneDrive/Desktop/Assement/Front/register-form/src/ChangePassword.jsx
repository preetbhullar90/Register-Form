import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';
import {Link} from "react-router-dom";

const ChangePassword = () => {
  const [data, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
  });
  const [error,setError] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/api/passwordRoutes";
      const {data:res} = await axios.post(url, data);
      localStorage.setItem('token',res.data);
      window.location = '/'
      console.log(res.message)
    
      
    } catch (error) {
      if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
        ){
          setError(error.response.data.message)
        }
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Change Password</button>
      </form>
      <Link to='/register'> Register</Link>
    </div>
  );
};


export default ChangePassword;