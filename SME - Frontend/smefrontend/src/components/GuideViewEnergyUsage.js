import React from 'react';
import '../styles/Dashboard.css';

const GuideViewEnergyUsage = () => {
  return (
    <div className="white-box">
      <button onClick={() => window.history.back()}>Volver</button>
      <h1>Guía para Ver el Consumo de Energía</h1>
      <p>Para ver el consumo de energía de los dispositivos registrados:</p>
      <ol>
        <li>Accede a tu cuenta.</li>
        <li>Ve a la sección <strong>Dispositivos</strong>.</li>
        <li>Selecciona el dispositivo para ver su consumo.</li>
        <li>El sistema mostrará gráficos y estadísticas del consumo en tiempo real.</li>
      </ol>
      <p>Así podrás analizar el consumo de energía y tomar decisiones para reducirlo.</p>
    </div>
  );
};

export default GuideViewEnergyUsage;
