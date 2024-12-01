const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();
const db = require('../db'); // Ajusta según tu configuración de base de datos

// Endpoint para obtener el nombre del usuario
router.get('/user', authenticateToken, (req, res) => {
    const userId = req.user.id; // Esto viene del token decodificado
    db.query('SELECT name FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ name: results[0].name });
    });
});

module.exports = router;
