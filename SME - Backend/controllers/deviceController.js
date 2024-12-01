const db = require('../db');

// Obtener todos los dispositivos
exports.getDevices = (req, res) => {
    const query = 'SELECT * FROM devices';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al obtener dispositivos.' });
        }
        res.json(results);
    });
};

// Agregar un nuevo dispositivo
exports.addDevice = (req, res) => {
    const { device_name, device_type, total_energy = 0, usage_count = 0, last_used = null } = req.body;
    const query = 'INSERT INTO devices (device_name, device_type, user_id, total_energy, usage_count, last_used) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [device_name, device_type, req.user.id, total_energy, usage_count, last_used], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al agregar dispositivo.' });
        }
        res.json({ message: 'Dispositivo agregado correctamente', device_id: result.insertId });
    });
};

// Actualizar un dispositivo existente
exports.updateDevice = (req, res) => {
    const { device_id } = req.params;
    const { device_name, device_type, total_energy, usage_count, last_used } = req.body;
    
    const query = 'UPDATE devices SET device_name = ?, device_type = ?, total_energy = ?, usage_count = ?, last_used = ? WHERE device_id = ?';
    
    db.query(query, [device_name, device_type, total_energy, usage_count, last_used, device_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al actualizar dispositivo.' });
        }
        res.json({ message: 'Dispositivo actualizado correctamente' });
    });
};

// Eliminar un dispositivo
exports.deleteDevice = (req, res) => {
    const { device_id } = req.params;
    const query = 'DELETE FROM devices WHERE device_id = ?';
    
    db.query(query, [device_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al eliminar dispositivo.' });
        }
        res.json({ message: 'Dispositivo eliminado correctamente' });
    });
};
