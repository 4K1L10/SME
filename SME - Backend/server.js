require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const energyUsageRoutes = require('./routes/energyUsageRoutes');
const userRoutes = require('./routes/userRoutes');
const guideRoutes = require('./routes/guideRoutes');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use('/api/statistics', deviceRoutes);

// Ruta de estadísticas del dispositivo
app.post('/api/devices', (req, res) => {
    const { device_name, device_type } = req.body;
  
    if (!device_name || !device_type) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sql = 'INSERT INTO devices (device_name, device_type) VALUES (?, ?)';
    db.query(sql, [device_name, device_type], (err, result) => {
      if (err) {
        console.error('Error al insertar dispositivo:', err);
        return res.status(500).json({ error: 'Error al insertar dispositivo' });
      }
      res.status(201).json({ message: 'Dispositivo agregado', device_id: result.insertId });
    });
  });

  app.get('/api/statistics', (req, res) => {
    const sql = `
        SELECT 
            d.device_name,
            d.device_type,
            COALESCE(SUM(e.usage_kwh), 0) AS total_energy,
            COALESCE(COUNT(e.usage_kwh), 0) AS usage_count,
            MAX(e.timestamp) AS last_used
        FROM 
            devices d
        LEFT JOIN 
            energy_usage e ON d.device_id = e.device_id
        GROUP BY 
            d.device_id
    `;
  
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener estadísticas:', err);
            return res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
        res.status(200).json(results); // Devuelve estadísticas de todos los dispositivos
    });
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
app.use('/api/guide', guideRoutes);     
app.use(authenticateToken);


// Ruta protegida (ejemplo)
app.get('/api/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida', user: req.user });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
