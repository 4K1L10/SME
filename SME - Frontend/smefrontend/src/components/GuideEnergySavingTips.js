import React from 'react';
import '../styles/Dashboard.css';

const GuideEnergySavingTips = () => {
  return (
    <div className="white-box">
      <button onClick={() => window.history.back()}>Volver</button>
      <h1>Guía para Consejos de Ahorro de Energía</h1>
      <ul>
        <li>Apaga los dispositivos cuando no estén en uso.</li>
        <li>Utiliza electrodomésticos eficientes.</li>
        <li>Establece horarios automáticos para que los dispositivos se apaguen.</li>
        <li>Monitorea el consumo regularmente para identificar patrones.</li>
      </ul>
      <p>Con estos consejos podrás reducir tu consumo de energía y ahorrar en tus facturas.</p>
    </div>
  );
};

export default GuideEnergySavingTips;
