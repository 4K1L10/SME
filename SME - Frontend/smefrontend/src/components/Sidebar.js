import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlug, FaChartLine, FaCog } from 'react-icons/fa'; // Ejemplo de íconos
import '../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src="/path/to/your/logo.png" alt="Logo" />
            </div>
            <ul className="sidebar-nav">
                <li>
                    <Link to="/api/dashboard">
                        <FaHome className="sidebar-icon" /> Panel
                    </Link>
                </li>
                <li>
                    <Link to="/api/Devices">
                        <FaPlug className="sidebar-icon" /> Gestión de dispositivos
                    </Link>
                </li>
                <li>
                    <Link to="/api/energy-usage">
                        <FaPlug className="sidebar-icon" /> Consumo de energia
                    </Link>
                </li>
                <li>
                    <Link to="/api/statistics">
                        <FaChartLine className="sidebar-icon" /> Estadística de dispositivo
                    </Link>
                </li>
                <li>
                    <Link to="/api/settings">
                        <FaCog className="sidebar-icon" /> Ajustes de cuenta
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;