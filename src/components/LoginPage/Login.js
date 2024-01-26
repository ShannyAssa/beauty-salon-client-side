import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

const Login = ({isLoggedIn, domain}) => {

  const [loginData, setLoginData] = useState({
    loginType: 'email',
    loginValue: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if(loginData.loginType && loginData.loginValue && loginData.password) {
      axios.post(`${domain}/login`, loginData)
        .then(response => {
          // console.log(response);
          if(response && response.status === 200) {
            localStorage.setItem('token', response.data.token);
            isLoggedIn(true);
            history.push('/beauty-salon-client-side/');
          } else {
              // alert(response.data.error);
              alert(response?.data?.error || 'An error occurred');
              isLoggedIn(false);
            }
        })
        .catch(err=> {
          // alert(err.response.data.error);
          alert(err.response?.data?.error || 'An error occurred');
          isLoggedIn(false);
        });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
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
        <p> <Link to="/beauty-salon-client-side/passwordReset" className="link-text">Forgot your password?</Link></p>
        <p> <Link to="/beauty-salon-client-side/signup" className="link-text">New member? Sign up now!</Link></p>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </form>
  );
}
 
export default Login;