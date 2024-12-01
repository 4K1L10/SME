import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './authService'; // Asegúrate de importar la función
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamar a la función de login y almacenar el token
      const token = await login(formData.email, formData.password);
      console.log('Token de autenticación:', token);

      // Redirigir al usuario al dashboard u otra página protegida
      navigate('/api/dashboard');
    } catch (error) {
      console.error('Error de autenticación:', error);
      alert('Login fallido. Verifica tus credenciales.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;