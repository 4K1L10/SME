import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardContent from '../components/DashboardContent';
import '../styles/Dashboard.css';
import { jwtDecode } from 'jwt-decode';// Asegúrate de instalar jwt-decode: npm install jwt-decode

const Dashboard = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decodificar el token JWT
                setUserName(decodedToken.name); // Asumimos que 'name' es un campo del payload del token
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <DashboardContent name={userName} /> {/* Pasa el nombre al componente DashboardContent */}
            </div>
        </div>
    );
};

export default Dashboard;
