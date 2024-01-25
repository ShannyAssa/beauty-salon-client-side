import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css';
import logoDefault from '../../resources/logo-64px.png';
import logoHover from '../../resources/logo2-64px.png';

const NavBar = ({isLoggedIn, isAdminLoggedIn, handleLogout}) => {

  const history = useHistory();

  const handleLogoutClick = () => {

    handleLogout();
    alert('logged out successfully');
    history.push('/');
  };

  return (
    <nav className="nav-class">
      <div className="home">
        <Link to="/" className="nav-icon-link">
          <img className="nav-icon"
            src={logoDefault}
            onMouseOver={(e) => (e.currentTarget.src = logoHover)}
            onMouseOut={(e) => (e.currentTarget.src = logoDefault)}
            alt="Logo"
          />
        </Link>
        <Link to="/">
          <h2 className="nav-title">Heavenly Horizon Beauty Salon & Spa</h2>
        </Link>
      </div>

      <div className="nav-links">
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/treatments">Our Treatments</Link>
        {/* { isLoggedIn ? ( 
        <>
          <div className="logged-in-links">
            <Link className="nav-link" to="/MyProfile">My Profile</Link>
            <div className="logout-button" onClick={handleLogoutClick}>Logout</div>
          </div>
        </>
        ) : ( 
          
          <>
          <Link className="nav-link" to="/signup">Signup</Link>
          <Link className="nav-link" to="/login">Login</Link>
          </>
        )} */}
        {isLoggedIn ? (
          // If the user is logged in
          <div className="logged-in-links">
            <Link className="nav-link" to="/MyProfile">My Profile</Link>
            <div className="logout-button" onClick={handleLogoutClick}>Logout</div>
          </div>
        ) : isAdminLoggedIn ? (
          // else, if an admin is logged in
          <div className="logged-in-links">
            <Link className="nav-link" to="/admin">Admin</Link>
            <div className="logout-button" onClick={handleLogoutClick}>Logout</div>
          </div>
        ) : (
          // if neither of them is logged in
          <>
            <Link className="nav-link" to="/signup">Signup</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </>
        )}

      </div>
    </nav>
    );
}
 
export default NavBar;