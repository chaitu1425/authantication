import React, { useState,useContext}from 'react'
import axios from 'axios'
import '../style/Login.css'
import  {Store} from '../App'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [token,setToken] = useContext(Store);
  const [data,setData] = useState({
    email:'',
    password:''
  });

  const navigate = useNavigate();
  
  const changeHandler = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  
  const saveData = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/login",data).then((res)=>{
      if (res.data.token){
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        navigate('/myprofile')
      }else{
          alert('Login failed: No token received');
      }
    });
  }

    return (
    <div className="login-container">
        <center>
        <h3>Login</h3>
        <form onSubmit={saveData} className="login-form">
            <input type="email" onChange={changeHandler} name="email" placeholder='Email' required/><br />
            <input type="password" onChange={changeHandler} name="password" id="password" placeholder='Password' required/><br />
            <button type='submit'>Login</button>
        </form>
        </center>
    </div>
  )
}

export default Login