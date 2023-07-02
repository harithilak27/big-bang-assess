import {React, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './Login.css'

function Login() {

  const navigate = useNavigate();

  const [loginCredentials,setLoginCredentials] = useState({userid: undefined,password: undefined,disabledButton: true})

  const handleChange = (e) => {
    setLoginCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
    if(loginCredentials.userid !== undefined &&  loginCredentials.password !== undefined && loginCredentials.password.length > 5){
      loginCredentials.disabledButton = false;
    }else {
      loginCredentials.disabledButton = true;
      
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7192/api/User/Login", loginCredentials);
      console.log(res);
      if(res.role === 'Admin'){
        navigate('/')
      }
      else if(res.role === 'doctor'){
        navigate('/')
      }
      else { 
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(loginCredentials);

  return (
    <div>
        <div className='form'>
        <label>UserName :</label>
            <input required type='text' id='userid' className='userid' name='userid'  placeholder='username' onChange={(e) => {handleChange(e)}}  />
        <label>Password :</label>
            <input type='password' name='password' id='password' className='password'  placeholder='password' onChange={(e) => {handleChange(e)}} />
        </div>
          <button className='signin' disabled={loginCredentials.disabledButton} onClick={handleLogin}>Sign in</button>
        <Link to='/Register'>
          <button className='signup'>Sign up</button>
        </Link>
        {/* {error && <span>{error.message}</span>} */}
        <div>
          
        </div>
    </div>
  )
}

export default Login
