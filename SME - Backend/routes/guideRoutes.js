const express = require('express');
const router = express.Router();

// Ruta para la guía de registro de dispositivo
router.get('/register-device', (req, res) => {
  res.json({ content: 'Contenido de la guía para registrar el dispositivo' });
});

// Ruta para la guía de ver consumo de energía
router.get('/view-energy-usage', (req, res) => {
  res.json({ content: 'Contenido de la guía para ver el consumo de energía' });
});

// Ruta para consejos de ahorro de energía
router.get('/energy-saving-tips', (req, res) => {
  res.json({ content: 'Contenido de la guía para consejos de ahorro de energía' });
});

// Ruta para soporte y privacidad
router.get('/support-privacy', (req, res) => {
  res.json({ content: 'Contenido de soporte, ayuda y términos de privacidad' });
});

module.exports = router;
