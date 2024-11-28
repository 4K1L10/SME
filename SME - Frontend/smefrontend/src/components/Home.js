import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logosme.png';
import '../styles/Home.css'

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-title">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Monitoreo de Energía</h1>
        </div>
        <nav className="nav-links">
          <Link to="/api/login">Login</Link>
          <Link to="/api/register">Registro</Link>
        </nav>
      </header>

      <section className="welcome-section">
        <h2>Bienvenido al Sistema de Monitoreo de Energía</h2>
        <p>Optimiza tu consumo de energía y reduce costos fácilmente.</p>
      </section>

      <section className="quick-access">
        <h3>Acceso Rápido</h3>
        <div className="access-buttons">
          <Link to="/api/devices" className="access-btn">Registrar Dispositivo</Link>
          <Link to="/api/energy-usage" className="access-btn">Ver Consumo de Energía</Link>
          <Link to="/api/tips" className="access-btn">Consejos de Ahorro</Link>
        </div>
      </section>

      <section className="quick-stats">
        <h3>Estadísticas Rápidas</h3>
        <div className="stats-box">
          <p>Consumo Actual: 300 kWh</p>
          <p>Ahorro este mes: $30</p>
          <p>Comparación con mes anterior: +5%</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>Contacta con soporte | Ayuda | Términos de privacidad</p>
      </footer>
    </div>
  );
}

export default Home;