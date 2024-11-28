import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Librería para gráficos

const EnergyUsage = () => {
    const [energyData, setEnergyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3007/api/energy-usage', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEnergyData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos de consumo:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Cargando datos...</p>;

    // Configuración para el gráfico
    const chartData = {
        labels: energyData.map(item => item.date), // Fechas de consumo
        datasets: [
            {
                label: 'Consumo Energético (kWh)',
                data: energyData.map(item => item.usage), // Uso energético
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div>
            <h2>Consumo de Energía</h2>
            <Line data={chartData} />
        </div>
    );
};

export default EnergyUsage;
