import React from 'react';
import '../styles/Devices.css';


function Devices(){

const [devices, setDevices] = useState([]);


const Devices = () => {
    const devices = [
        { id: 1, name: 'Aire Acondicionado', status: 'Activo', consumption: '150 kWh' },
        { id: 2, name: 'Refrigerador', status: 'Activo', consumption: '90 kWh' },
        { id: 3, name: 'Lámpara', status: 'Inactivo', consumption: '10 kWh' },
    ];

    return (
        <div className="devices">
            <h2>Devices</h2>
            <table className="devices-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Consumo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <tr key={devices.id}>
                            <td>{devices.name}</td>
                            <td>{devices.status}</td>
                            <td>{devices.consumption}</td>
                            <td>
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

}
export default Devices;
