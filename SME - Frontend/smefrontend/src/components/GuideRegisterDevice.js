import React from 'react';
import '../styles/Dashboard.css';

const GuideRegisterDevice = () => {
  return (
    <div className="white-box">
      <button onClick={() => window.history.back()}>Volver</button>
      <h1>Guía para Registrar el Dispositivo</h1>
      <p>Para registrar un nuevo dispositivo en el sistema, sigue estos pasos:</p>
      <ul>
        <li>Inicia sesión en tu cuenta.</li>
        <li>Navega al panel de <strong>Dispositivos</strong>.</li>
        <li>Haz clic en <strong>Agregar Dispositivo</strong>.</li>
        <li>Rellena los campos de <strong>Nombre del dispositivo</strong> y <strong>Tipo de dispositivo</strong>.</li>
        <li>Haz clic en <strong>Guardar</strong>.</li>
        <li>El dispositivo aparecerá en tu lista de dispositivos con su respectiva información.</li>
      </ul>
      <p>¡Listo! Ahora podrás monitorear el consumo energético de este dispositivo.</p>
    </div>
  );
};

export default GuideRegisterDevice;
