import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Devices.css';
import { useNavigate } from 'react-router-dom';

function DeviceManagement() {
  const [devices, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  const navigate = useNavigate(); // Hook para navegación

  // Cargar dispositivos al montar el componente
  useEffect(() => {
    fetchDevices();
  }, []);

  // Obtener la lista de dispositivos
  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:3007/api/devices');
      setDevices(response.data);
    } catch (error) {
      console.error('Error al cargar dispositivos:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar o actualizar un dispositivo
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (!token) {
        return alert('No se encontró un token de autenticación');
      }

      const dataToSend = {
        device_name: formData.name,
        device_type: formData.type,
      };

      const response = await axios.post('http://localhost:3007/api/devices', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Respuesta del servidor:', response.data); // Muestra los datos del dispositivo agregado
      alert('Dispositivo agregado exitosamente');
      setFormData({ name: '', type: '' });
      fetchDevices(); // Actualizar la lista
    } catch (error) {
      console.error('Error al agregar dispositivo:', error);
    }
  };

  // Eliminar un dispositivo
  const handleDelete = async (deviceId) => {
    try {
      await axios.delete(`http://localhost:3007/api/devices/${deviceId}`);
      alert('Dispositivo eliminado');
      fetchDevices();
    } catch (error) {
      console.error('Error al eliminar dispositivo:', error);
    }
  };

  return (
    <div className="device-management-container">
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
      <h2>Gestión de dispositivos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre de Dispositivo:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Tipo de Dispositivo:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {formData.id ? 'Actualizar Dispositivo' : 'Agregar Dispositivo'}
        </button>
      </form>

      <h3>Lista de Dispositivos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre de Dispositivo</th>
            <th>Tipo de Dispositivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>
                <button onClick={() => setFormData(device)}>Editar</button>
                <button onClick={() => handleDelete(device.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceManagement;
