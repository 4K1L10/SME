import React, { useEffect, useState } from 'react';

function Devices() {
  const [devices, setDevices] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/devices`)
      .then(response => response.json())
      .then(data => {
        setDevices(data); // Guardar los datos en el estado
      })
      .catch(error => console.error('Error al obtener dispositivos:', error));
  }, []);

  return (
    <div>
      <h1>Dispositivos</h1>
      {devices.length > 0 ? (
        <ul>
          {devices.map((device, index) => (
            <li key={index}>{device.name}</li> // Ejemplo de cómo mostrar datos
          ))}
        </ul>
      ) : (
        <p>No hay dispositivos disponibles.</p>
      )}
    </div>
  );
}

export default Devices;
