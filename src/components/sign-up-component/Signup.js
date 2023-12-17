import React, { useState } from 'react';
import './Signup.css'

const Signup = () => {

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

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., sending data to the server)
    console.log('Form submitted:', formData);
  };

  return ( 
    <form onSubmit={handleSignup}>
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
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
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
    </form>

   );
}
 
export default Signup;