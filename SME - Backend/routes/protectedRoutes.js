const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // No se proporciona el token

    jwt.verify(token, 'secreto', (err, user) => {
        if (err) return res.sendStatus(403); // Token no válido
        req.user = user;
        next();
    });
};
// Ruta protegida
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida', user: req.user });
});

module.exports = router;
