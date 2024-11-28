import React from 'react';
import '../styles/Navbar.css';

const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    window.location.href = '/api/Home'; // Redirige al login
};

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-title">Dashboard</div>
            <div className="navbar-date-picker">
            <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </nav>
    
    );
};

export default Navbar;