const express = require('express');
const router = express.Router();
const db = require('../db'); 
const energyUsageController = require('../controllers/energyUsageController');

// Ruta para obtener datos de consumo de energía desde la base de datos
router.get('/', (req, res) => {
    const query = 'SELECT user_id, device_id, usage_kwh, timestamp, usage_id FROM energy_usage';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener datos de la base de datos:', err);
        return res.status(500).json({ error: 'Error al obtener los datos' });
      }
      res.json(results); // Devuelve los registros como un arreglo
    });
  });

  // Rutas para gestión de consumo de energía
router.get('/', energyUsageController.getEnergyUsage);
router.post('/', energyUsageController.addEnergyUsage);
router.put('/:usage_id', energyUsageController.updateEnergyUsage);
router.delete('/:usage_id', energyUsageController.deleteEnergyUsage);

  


module.exports = router;