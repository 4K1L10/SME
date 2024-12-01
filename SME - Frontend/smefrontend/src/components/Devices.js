import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    device_name: '',
    device_type: '',
    total_energy: '',
    usage_count: '',
    last_used: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editDevice, setEditDevice] = useState({
    device_id: null,
    device_name: '',
    device_type: '',
    total_energy: '',
    usage_count: '',
    last_used: ''
  });

  // Obtener dispositivos
  useEffect(() => {
    axios.get('http://localhost:3007/api/devices')
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener dispositivos:', error);
      });
  }, []);

  // Agregar dispositivo
  const handleAddDevice = () => {
    axios.post('http://localhost:3007/api/devices', newDevice)
      .then(() => {
        setDevices([...devices, newDevice]);
        setNewDevice({
          device_name: '',
          device_type: '',
          total_energy: '',
          usage_count: '',
          last_used: ''
        });
      })
      .catch((error) => {
        console.error('Error al agregar dispositivo:', error);
      });
  };

  // Eliminar dispositivo
  const handleDeleteDevice = (id) => {
    axios.delete(`http://localhost:3007/api/devices/${id}`)
      .then(() => {
        setDevices(devices.filter(device => device.device_id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar dispositivo:', error);
      });
  };

  // Activar modo edición
  const handleEditClick = (device) => {
    setEditMode(true);
    setEditDevice(device);
  };

  // Actualizar dispositivo
  const handleUpdateDevice = () => {
    axios.put(`http://localhost:3007/api/devices/${editDevice.device_id}`, {
      device_name: editDevice.device_name,
      device_type: editDevice.device_type,
      total_energy: editDevice.total_energy,
      usage_count: editDevice.usage_count,
      last_used: editDevice.last_used
    })
      .then(() => {
        setDevices(devices.map(device =>
          device.device_id === editDevice.device_id ? editDevice : device
        ));
        setEditMode(false);
        setEditDevice({
          device_id: null,
          device_name: '',
          device_type: '',
          total_energy: '',
          usage_count: '',
          last_used: ''
        });
      })
      .catch((error) => {
        console.error('Error al actualizar dispositivo:', error);
      });
  };

  // Botón para volver atrás
  const handleBack = () => {
    window.history.back(); // Regresa a la página anterior
  };

  return (
    <div className="white-box">
      <h1>Gestión de Dispositivos</h1>
      <button onClick={handleBack}>Volver Atrás</button>

      <table>
        <thead>
          <tr>
            <th>Nombre del Dispositivo</th>
            <th>Tipo de Dispositivo</th>
            <th>Total de Energía</th>
            <th>Total de Usos (Por semana)</th>
            <th>Última vez utilizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.device_id}>
              <td>{device.device_name}</td>
              <td>{device.device_type}</td>
              <td>{device.total_energy}</td>
              <td>{device.usage_count}</td>
              <td>{new Date(device.last_used).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEditClick(device)}>Editar</button>
                <button onClick={() => handleDeleteDevice(device.device_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMode ? (
        <div>
          <h2>Editar Dispositivo</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editDevice.device_name}
            onChange={(e) => setEditDevice({ ...editDevice, device_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={editDevice.device_type}
            onChange={(e) => setEditDevice({ ...editDevice, device_type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total de energía (kWh)"
            value={editDevice.total_energy}
            onChange={(e) => setEditDevice({ ...editDevice, total_energy: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total de usos"
            value={editDevice.usage_count}
            onChange={(e) => setEditDevice({ ...editDevice, usage_count: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="Última vez utilizado"
            value={editDevice.last_used}
            onChange={(e) => setEditDevice({ ...editDevice, last_used: e.target.value })}
          />
          <button onClick={handleUpdateDevice}>Actualizar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h2>Agregar Dispositivo</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={newDevice.device_name}
            onChange={(e) => setNewDevice({ ...newDevice, device_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={newDevice.device_type}
            onChange={(e) => setNewDevice({ ...newDevice, device_type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total de energía (kWh)"
            value={newDevice.total_energy}
            onChange={(e) => setNewDevice({ ...newDevice, total_energy: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total de usos"
            value={newDevice.usage_count}
            onChange={(e) => setNewDevice({ ...newDevice, usage_count: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="Última vez utilizado"
            value={newDevice.last_used}
            onChange={(e) => setNewDevice({ ...newDevice, last_used: e.target.value })}
          />
          <button onClick={handleAddDevice}>Agregar</button>
        </div>
      )}
    </div>
  );
};

export default Devices;
