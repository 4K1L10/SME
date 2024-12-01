import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DeviceStats = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate(); // Usado para redirigir a otra página

  useEffect(() => {
    axios
      .get('http://localhost:3007/api/statistics')
      .then((response) => setDevices(response.data))
      .catch((error) => console.error('Error al cargar dispositivos:', error));
  }, []);

  if (!devices.length) return <p>Cargando dispositivos...</p>;

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleGoHome = () => {
    navigate('/api/dashboard'); // Redirige a la página principal
  };

  const barData = selectedDevice
    ? {
        labels: ['Consumo total (kWh)', 'Veces usado'],
        datasets: [
          {
            label: 'Estadísticas del dispositivo',
            data: [selectedDevice.total_energy, selectedDevice.usage_count],
            backgroundColor: ['#4caf50', '#2196f3'],
          },
        ],
      }
    : null;

  const pieData = selectedDevice
    ? {
        labels: ['Energía consumida', 'Energía restante (estimada)'],
        datasets: [
          {
            data: [selectedDevice.total_energy, 100 - selectedDevice.total_energy],
            backgroundColor: ['#ff9800', '#cddc39'],
          },
        ],
      }
    : null;

  return (
    <div className="white-box">
      <div className="header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={handleGoHome}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff5722',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
}}>Volver </button>
        <h1>Estadísticas de Dispositivos</h1>
        {selectedDevice && (
          <button
            style={{
              marginLeft: '20px',
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedDevice(null)} // Resetea la selección
          >
            Atrás
          </button>
        )}
      </div>

      <div className="center-box" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        {!selectedDevice ? (
          <>
            <h3>Selecciona un dispositivo para ver sus estadísticas:</h3>
            <ul>
              {devices.map((device) => (
                <li
                  key={device.device_id}
                  onClick={() => handleDeviceSelect(device)}
                  style={{
                    cursor: 'pointer',
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {device.device_name} ({device.device_type})
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>
              {selectedDevice.device_name} ({selectedDevice.device_type})
            </h2>
            <p>
  Total de energía consumida: {selectedDevice.total_energy ? `${selectedDevice.total_energy} kWh` : 'No disponible'}
</p>
<p>
  Total de usos: {selectedDevice.usage_count ? selectedDevice.usage_count : 'No disponible'}
</p>
<p>
  Última vez utilizado: {selectedDevice.last_used ? new Date(selectedDevice.last_used).toLocaleString() : 'Fecha no disponible'}
</p>

            <div>
              <h3>Gráfica de Barras</h3>
              <Bar data={barData} />
            </div>

            <div>
              <h3>Gráfica Circular</h3>
              <Pie data={pieData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceStats;
