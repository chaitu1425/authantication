import React, { useState } from 'react';
import '../style/Register.css';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const saveData = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register', data).then((res) => {
      alert(res.data);
    });
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <center>

        <h3 className="register-title">Register</h3>
        <form onSubmit={saveData} className="register-form">
          <input
            type="text"
            onChange={changeHandler}
            name="username"
            placeholder="User Name"
            required
          />
          <input
            type="email"
            onChange={changeHandler}
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={changeHandler}
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="password"
            onChange={changeHandler}
            name="confirmPass"
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      </center>
    </div>
  );
};

export default Register;
