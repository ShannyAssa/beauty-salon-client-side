import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import '../LoginPage/Login.css';

const AdminLogin = ({isAdminLoggedIn, domain}) => {

  const [loginPassword, setLoginPassword] = useState('');

  const handleChange = (e) => {
    setLoginPassword(e.target.value);
  }

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    const reqData = {
      id : {loginPassword}
    };
    
    if(loginPassword) {
      axios.post(`${domain}/admin/login`, reqData)
        .then(response => {
          console.log(response);
          if(response && response.status === 200) {
            localStorage.setItem('token', response.data.token);
            isAdminLoggedIn(true);
            history.push('/beauty-salon-client-side/admin');
            alert('admin logged in successfully');
          } else {
              // alert(response.data.error);
              alert(response?.data?.error || 'An error occurred');
              isAdminLoggedIn(false);
            }
        })
        .catch(err=> {
          // alert(err.response.data.error);
          alert(err.response?.data?.error || 'An error occurred');
          isAdminLoggedIn(false);
        });
    }
  };


  return ( 
    <div className="admin-login">
      <form>
        <h1>Admin Login</h1>
        <label>
          Id:
          <input
            type="text"
            name="id"
            value={loginPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="login" onClick={handleLogin}>Log In</button>
      </form>
    </div>
   );
}
 
export default AdminLogin;