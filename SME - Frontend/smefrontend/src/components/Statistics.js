import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartPie } from 'react-icons/fa';
import ChartJS from 'chart.js/auto';
import '../styles/Statistics.css';



// Registrar los elementos necesarios
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Statistics = () => {
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Consumo Mensual (kWh)',
                data: [120, 190, 300, 500, 200, 300],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <div className="section-container">
            <h2><FaChartPie /> Statistics</h2>
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Statistics;
