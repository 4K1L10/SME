const express = require('express');
const db = require('../db'); // Asegúrate de que la conexión a la base de datos esté importada
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');



// Ruta para obtener todos los dispositivos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM devices';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener dispositivos' });
        res.json(results);
    });
});

// Ruta para agregar un nuevo dispositivo
router.post('/api/devices', (req, res) => {
    console.log("Datos recibidos del frontend:", req.body);

    const { device_name, device_type } = req.body;

    if (!device_name || !device_type) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const query = 'INSERT INTO devices (device_name, device_type) VALUES (?, ?)';
    db.query(query, [device_name, device_type], (err, result) => {
        if (err) {
            console.error("Error al agregar dispositivo:", err);
            return res.status(500).json({ error: 'Error al agregar el dispositivo' });
        }

        const nuevoDispositivo = {
            device_id: result.insertId,
            device_name,
            device_type,
        };

        console.log("Dispositivo agregado exitosamente:", nuevoDispositivo);
        res.status(201).json({ message: 'Dispositivo agregado', device: nuevoDispositivo });
    });
});
// Obtener un dispositivo por ID
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM devices WHERE device_id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener dispositivo' });
        if (results.length === 0) return res.status(404).send('Dispositivo no encontrado');
        res.json(results[0]);
    });
});

// Actualizar un dispositivo
router.put('/:id', (req, res) => {
    const { user_id, device_name, device_type } = req.body;
    const query = 'UPDATE devices SET user_id = ?, device_name = ?, device_type = ? WHERE device_id = ?';
    db.query(query, [user_id, device_name, device_type, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar dispositivo' });
        res.json({ device_id: req.params.id, user_id, device_name, device_type });
    });
});

// Eliminar un dispositivo
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM devices WHERE device_id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar dispositivo' });
        if (result.affectedRows === 0) return res.status(404).send('Dispositivo no encontrado');
        res.status(204).send();
    });
});

module.exports = router;