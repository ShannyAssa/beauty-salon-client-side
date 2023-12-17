import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const [loginData, setLoginData] = useState({
    loginType: 'email',
    loginValue: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your logic for handling login submission
    console.log('Login submitted:', loginData);
  };

  return (
    <form onLogin={handleLogin}>
      
      <div className="radio-group">
        <label>
          <input 
          type="radio"
          name="loginType"
          value="email"
          checked={loginData.loginType === 'email'}
          onChange={handleChange} />
          Email
        </label>
        <label>
          <input 
          type="radio"
          name="loginType"
          value="username"
          checked={loginData.loginType === 'username'}
          onChange={handleChange} />
          Username
        </label>
      </div>

      <div>
      <input
        type="text"
        name="loginValue"
        value={loginData.loginValue}
        onChange={handleChange}
        required
        />
      </div>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="login">Log In</button>

      <div>
        <p> <Link to="/passwordReset">Forgot your password?</Link></p>
        <p> <Link to="/signup">New member? Sign up now!</Link></p>
      </div>
    </form>
  );
}
 
export default Login;