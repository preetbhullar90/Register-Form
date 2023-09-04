import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import {Link} from "react-router-dom";

const Login = () => {
  const [data, setformData] = useState({
    email: '',
    password: '',
  });
  const [error,setError] = useState('')
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const url = "http://localhost:8080/api/auth";
      const {data:res} = await axios.post(url, data);
      localStorage.setItem('token',res.data);
      window.location = '/'
      console.log(res.message)

    }catch (error){
        if (error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
          ){
            setError(error.response.data.message)
          }
    }

  }


return (

<div className='login-container'>
<div className='login-back'>
<div className='inputs'>
<h1 className='form-heading'>Login</h1>
<form className='form' onSubmit={handleSubmit}>
<input onChange={handleInputChange} className='name py-2' type="email" name='email' value={data.email} placeholder='Email'/>
<input onChange={handleInputChange} className='name py-2' type="password" name='password' value={data.password} placeholder='Password'/>
<div className='button-container'>
{error && <div>{error}</div>}
<button className='btn btn-info button' type="submit">Login</button>

</div>
</form>
    <p className='paragraph'>You don't have a account
   

    <Link to='/register'> Register</Link>
</p>
<p className='paragraph'>Change Your
<Link to='/change-password'> Password</Link>
</p>
    </div>
</div>
    </div>
  )
}

export default Login