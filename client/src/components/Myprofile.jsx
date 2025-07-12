import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Myprofile = () => {
  const [token, setToken] = useContext(Store)
  const [data, setData] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = token || localStorage.getItem('token');
    if (!localToken) {
      navigate('/login')
      return;
    }
    axios.get('http://localhost:8000/profile', {
      headers: {'x-token': localToken,},
    }).then((res)=> setData(res.data)).catch((err) => console.log(err))
  }, [token])


  return (
    <div>
      {
        data ?(
        <center>
          Welcome, {data.username}
        </center>
        ):(
          <center>Loading your profile....</center>
        )
      }
    </div>
  )
}

export default Myprofile