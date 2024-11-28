require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const energyUsageRoutes = require('./routes/energyUsageRoutes');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');



const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.post('/api/devices', (req, res) => {
    try {
        console.log(req.body); // Revisa qué se recibe exactamente
        res.status(201).send({ message: 'Dispositivo agregado' });
    } catch (err) {
        console.error('Error procesando el cuerpo:', err);
        res.status(400).send({ error: 'Error en el formato de la solicitud' });
    }
});
// Habilitar CORS para todas las rutas
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Obtén el token del encabezado Authorization
    const token = authHeader && authHeader.split(' ')[1]; // Extrae solo el token

    if (!token) return res.status(401).json({ error: 'Token no proporcionado' }); // Si no hay token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token no válido' }); // Si el token no es válido

        req.user = user; // Asigna el contenido del token decodificado al objeto request
        next(); // Continua al siguiente middleware o controlador
    });
};

app.get('/api', (req, res) => {
    res.send("Bienvenido a la API de monitoreo de energía");
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Rutas
app.use('/api', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/energy-usage', energyUsageRoutes);

// Ruta protegida (ejemplo)
app.get('/api/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida', user: req.user });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
