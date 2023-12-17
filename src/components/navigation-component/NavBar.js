import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-class">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/about">About</Link>
      <Link className="nav-link" to="/signup">Signup</Link>
      <Link className="nav-link" to="/login">Login</Link>

    </nav>
    );
}
 
export default NavBar;