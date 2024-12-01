import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';



function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3007/api/register', formData);
        console.log(response.data); // Verifica la respuesta del backend
        alert('Registration successful!');
        navigate('/api/login'); // Redirige al login
    } catch (error) {
        console.error(error);
        alert('Registration failed!');
    }
};

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
