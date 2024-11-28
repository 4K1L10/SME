import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DashboardContent.css';

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
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local o donde lo guardes
        const response = await axios.get('http://localhost:3007/api/user', {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el token al encabezado
            },
        });
        console.log('Usuario obtenido:', response.data.name);
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

    return (
        <div className="dashboard-content">
            <h2>Bienvenido, {name} al Sistema de Monitoreo de Energía</h2>
            <p>Optimiza tu consumo de energía y reduce costos.</p>

            {/* Tarjetas de Métricas */}
            <div className="metrics-cards">
                <div className="card">{metrics.savedProducts}+ Productos Guardados</div>
                <div className="card">{metrics.productsInStock}+ Productos en Stock</div>
                <div className="card">{metrics.productsInSale}+ Productos en Venta</div>
                <div className="card">{metrics.workApps}+ Aplicaciones de Trabajo</div>
            </div>

            {/* Gráficos */}
            <div className="charts">
                <div className="line-chart">Gráfico de Línea Aquí</div>
                <div className="pie-chart">Gráfico de Anillo Aquí</div>
            </div>
        </div>
    );
};

export default DashboardContent;
