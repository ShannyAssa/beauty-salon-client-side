import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logoDefault from '../../resources/logo-64px.png';
import logoHover from '../../resources/logo2-64px.png';

const NavBar = () => {
  return (
    <nav className="nav-class">
      <img className="nav-icon" 
        src={logoDefault}
        onMouseOver={(e) => (e.currentTarget.src = logoHover)}
        onMouseOut={(e) => (e.currentTarget.src = logoDefault)}
      ></img>
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