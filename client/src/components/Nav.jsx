import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Nav.css'; // external stylesheet

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
