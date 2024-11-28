import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css'; // Asegúrate de tener un archivo CSS para personalizar el diseño

const AccountSettings = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        'http://localhost:3007/api/user-settings',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Información actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la información:', error);
    }
  };

  return (
    <div className="account-settings-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
      <h2>Ajustes de Cuenta</h2>
      <form onSubmit={handleSubmit} className="account-settings-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
