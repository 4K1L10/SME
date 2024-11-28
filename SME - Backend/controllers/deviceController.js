const db = require('../db');

// Obtener todos los dispositivos
exports.getAllDevices = (req, res) => {
    const query = 'SELECT * FROM devices';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        res.json(results);
    });
};

// Agregar un nuevo dispositivo
exports.addDevice = (req, res) => {
    const { name, userId } = req.body;
    const query = 'INSERT INTO devices (name, user_id) VALUES (?, ?)';
    db.query(query, [name, userId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar el dispositivo' });
        res.status(201).json({ message: 'Dispositivo agregado exitosamente' });
    });
};
