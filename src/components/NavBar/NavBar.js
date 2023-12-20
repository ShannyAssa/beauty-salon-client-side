import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-class">
      <h2 className='nav-title'>Heavenly Horizon Beauty Salon & Spa</h2>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/signup">Signup</Link>
        <Link className="nav-link" to="/login">Login</Link>
      </div>
    </nav>
    );
}
 
export default NavBar;