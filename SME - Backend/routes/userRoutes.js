const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const db = require('../db'); // O tu conexión a la base de datos

router.get('/api/user', authenticateToken, (req, res) => {
    const userId = req.user.id; // Esto proviene del token decodificado
    db.query('SELECT name FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        res.json({ name: results[0]?.name || 'Usuario no encontrado' });
    });
});

module.exports = router;