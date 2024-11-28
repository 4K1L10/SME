const db = require('../db');

// Agregar datos de uso de energía
exports.addEnergyUsage = (req, res) => {
    const { userId, deviceId, usageKwh } = req.body;
    const query = 'INSERT INTO energy_usage (user_id, device_id, usage_kwh) VALUES (?, ?, ?)';
    db.query(query, [userId, deviceId, usageKwh], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar los datos de uso de energía' });
        res.status(201).json({ message: 'Datos de uso de energía agregados exitosamente' });
    });
};

// Obtener historial de uso de energía por usuario
exports.getEnergyUsageHistory = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM energy_usage WHERE user_id = ? ORDER BY timestamp DESC';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el historial de uso de energía' });
        res.json(results);
    });
};

// Actualizar un registro de uso de energía
exports.updateEnergyUsage = (req, res) => {
    const { usageId } = req.params;
    const { usageKwh } = req.body;
    const query = 'UPDATE energy_usage SET usage_kwh = ? WHERE usage_id = ?';
    db.query(query, [usageKwh, usageId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar los datos de uso de energía' });
        res.json({ message: 'Registro de uso de energía actualizado exitosamente' });
    });
};

// Eliminar un registro de uso de energía
exports.deleteEnergyUsage = (req, res) => {
    const { usageId } = req.params;
    const query = 'DELETE FROM energy_usage WHERE usage_id = ?';
    db.query(query, [usageId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el registro de uso de energía' });
        res.json({ message: 'Registro de uso de energía eliminado exitosamente' });
    });
};
