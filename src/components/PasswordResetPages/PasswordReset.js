import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PasswordReset.css';

const PasswordReset = () => {

  const [userIdentifier, setUserIdentififier] = useState({
    identifierType:'email',
    value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserIdentififier({
      ...userIdentifier,
      [name]: value,
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
  };

  return ( 
    <div className="password-reset-container">
      <h2>Password Reset</h2>

      <label>
      <div className="radio-group">
        <label>
          <input 
          type="radio"
          name="identifierType"
          value="email"
          checked={userIdentifier.identifierType === 'email'}
          onChange={handleChange} />
          Email
        </label>
        
        <label>
          <input 
          type="radio"
          name="identifierType"
          value="username"
          checked={userIdentifier.identifierType === 'username'}
          onChange={handleChange} />
          Username
        </label>
      </div>

        <input 
          type={userIdentifier.identifierType === 'email' ? 'email' : 'text'}
          name="value" 
          onChange={handleChange} 
          required />

      </label>

      <div className="button-group">
        <button onClick={handleResetPassword}>Reset Password</button>
        <Link to="/login">
          <button className="cancel-button">Cancel</button>
        </Link>
      </div>
    </div>
   );
}
 
export default PasswordReset;
