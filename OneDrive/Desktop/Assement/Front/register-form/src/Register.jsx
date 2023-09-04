import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [data, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      const [error,setError] = useState('')
      const navigate = useNavigate();
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...data, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const url = "http://localhost:8080/api/users";
          const {data:res} = await axios.post(url, data);
          navigate('/login')
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
    
    <div className='register-container'>
    <div className='back'>
    <div className='inputs'>
    <h1 className='form-heading'>Register</h1>
    <form className='form' onSubmit={handleSubmit}>
    <input onChange={handleInputChange} className='name py-2' type="text" name='firstName' value={data.firstName} placeholder='First Name'/>
    <input onChange={handleInputChange} className='name py-2' type="text" name='lastName' value={data.lastName} placeholder='Last Name'/>
    <input onChange={handleInputChange} className='name py-2' type="email" name='email' value={data.email} placeholder='Email'/>
    <input onChange={handleInputChange} className='name py-2' type="password" name='password' value={data.password} placeholder='Password'/>
    <div className='button-container'>
    {error && <div>{error}</div>}
    <button className='btn btn-info button' type="submit">Register</button>
   
    </div>
    </form>

    <p className='paragraph'>Already have a account
   

    <Link to='/login'> Login</Link>
   
    </p>
    </div>
</div>
    </div>
  )
}

export default Register