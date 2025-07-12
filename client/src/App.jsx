import React, { useState, createContext } from 'react';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Myprofile from './components/Myprofile';

export const Store = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <Router>
      <Store.Provider value={[token, setToken]}>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Routes>
      </Store.Provider>
    </Router>
  );
};

export default App;
