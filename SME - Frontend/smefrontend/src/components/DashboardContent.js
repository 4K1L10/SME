import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import '../styles/DashboardContent.css';
import { Link } from 'react-router-dom';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardContent = () => {
  const [name, setName] = useState('');
  const [metrics, setMetrics] = useState({
    savedProducts: 0,
    productsInStock: 0,
    productsInSale: 0,
    workApps: 0,
  });

  useEffect(() => {
    // Obtiene el nombre del usuario desde la API
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
        const response = await axios.get('http://localhost:3007/api/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token al encabezado
          },
        });
        setName(response.data.name); // Ajusta esto según tu estado
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };

    fetchUserName();

    // Establece métricas simuladas
    setMetrics({
      savedProducts: 178,
      productsInStock: 20,
      productsInSale: 190,
      workApps: 12,
    });
  }, []);

  // Datos para el gráfico de línea (consumo de energía)
  const lineChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Consumo de Energía (kWh)',
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  // Datos para el gráfico de anillo (dispositivos)
  const pieChartData = {
    labels: ['Dispositivo A', 'Dispositivo B', 'Dispositivo C'],
    datasets: [
      {
        label: 'Consumo Energético (%)',
        data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-content">
      <h2>Bienvenido {name} al Sistema de Monitoreo de Energía</h2>
      <p>Optimiza tu consumo de energía y reduce costos.</p>
      <Link to="/api/guide/register-device" className="access-btn">Guia para Registrar Dispositivo</Link>

      {/* Tarjetas de Métricas */}
      <div className="metrics-cards">
        <div className="card">{metrics.savedProducts}+ Productos Guardados</div>
        <div className="card">{metrics.productsInStock}+ Productos en Stock</div>
        <div className="card">{metrics.productsInSale}+ Productos en Venta</div>
        <div className="card">{metrics.workApps}+ Aplicaciones de Trabajo</div>
      </div>

      {/* Gráficos */}
      <div className="charts">
        <div className="line-chart">
          <h3>Gráfico de Línea - Consumo de Energía</h3>
          <Line data={lineChartData} />
        </div>
        <div className="pie-chart">
          <h3>Gráfico de Anillo - Consumo Energético</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
