import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'

const Signup = ({isLoggedIn, domain}) => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    id: '',
    gender: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post(`${domain}/signup`, formData)
        .then(response => {
            // console.log(response);
            if(response.status === 200) {
              localStorage.setItem('token', response.data.token);
              isLoggedIn(true);
              alert(response.data.message);
              history.push('/beauty-salon-client-side/');
            }
            else {
              console.log('something aint right');
            }
        })
        .catch(error => {
          return alert(error.response.data.error);
          isLoggedIn(false);
        });
  };

  return (
    <form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <label className="label-group">
          First Name:
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </label>

        <label className="label-group">
          Last Name:
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </label>

        <label className="label-group">
          Id:
          <input type="number" name="id" value={formData.id} onChange={handleChange} pattern="[0-9]{9}"
            title="Please enter a 9-digit ID" required />
        </label>

        <label className="label-group">
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonBinary">Non-Binary</option>
            <option value="preferNotToDisclose">Prefer not to disclose</option>
          </select>
        </label>

        <label className="label-group">
          Birthday:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label>

        <label className="label-group">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label className="label-group">
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>

        <label className="label-group">
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>

        <label className="label-group">
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <button type="signup">Signup</button>

        <p> <Link to="/beauty-salon-client-side/login"  className="link-text">Already a member? Login now!</Link></p>

      </form>
   );
}
 
export default Signup;