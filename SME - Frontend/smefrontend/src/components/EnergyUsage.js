import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EnergyUsage.css'

const EnergyUsage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newUsage, setNewUsage] = useState({ usage_kwh: '', device_id: '' });
  const [editingUsage, setEditingUsage] = useState(null);

  // Obtener datos de consumo de energía desde el backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3007/api/energy-usage');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Manejo de la adición de consumo
  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:3007/api/energy-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsage),
      });
      if (response.ok) {
        alert('Consumo agregado correctamente');
        setNewUsage({ usage_kwh: '', device_id: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error al agregar el consumo:', error);
    }
  };

  // Manejo de la edición de consumo
  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3007/api/energy-usage/${editingUsage.usage_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUsage),
      });
      if (response.ok) {
        alert('Consumo actualizado correctamente');
        setEditingUsage(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error al editar el consumo:', error);
    }
  };

  // Manejo de la eliminación de consumo
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3007/api/energy-usage/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Consumo eliminado correctamente');
        fetchData();
      }
    } catch (error) {
      console.error('Error al eliminar el consumo:', error);
    }
  };

  return (
    <div className="white-box">
      <h1>Gestión de Consumo de Energía</h1>

      <button onClick={() => navigate(-1)}>Volver</button>

      <table>
        <thead>
          <tr>
          <th>Uso</th>
          <th>Dispositivo</th>
            <th>Consumo (kWh)</th>
            <th>Tiempo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {data.map((item) => (
    <tr key={item.usage_id}>
      <td>{item.usage_kwh}</td> {/* Mostrar el uso */}
      <td>{item.device_id}</td> {/* Mostrar el nombre del dispositivo */}
      <td>{item.usage_kwh}</td> {/* Consumo en kWh */}
      <td>{new Date(item.timestamp).toLocaleString()}</td> {/* Fecha y hora formateada */}
      <td>
        <button onClick={() => setEditingUsage(item)}>Editar</button>
        <button onClick={() => handleDelete(item.usage_id)}>Eliminar</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      <h2>{editingUsage ? 'Editar Consumo' : 'Agregar Consumo'}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingUsage ? handleEdit() : handleAdd();
        }}
      >
        <input
          type="number"
          placeholder="Consumo (kWh)"
          value={editingUsage ? editingUsage.usage_kwh : newUsage.usage_kwh}
          onChange={(e) =>
            editingUsage
              ? setEditingUsage({ ...editingUsage, usage_kwh: e.target.value })
              : setNewUsage({ ...newUsage, usage_kwh: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Device ID"
          value={editingUsage ? editingUsage.device_id : newUsage.device_id}
          onChange={(e) =>
            editingUsage
              ? setEditingUsage({ ...editingUsage, device_id: e.target.value })
              : setNewUsage({ ...newUsage, device_id: e.target.value })
          }
          required
        />
        <button type="submit">{editingUsage ? 'Actualizar' : 'Agregar'}</button>
        {editingUsage && <button onClick={() => setEditingUsage(null)}>Cancelar</button>}
      </form>
    </div>
  );
};

export default EnergyUsage;
