const express = require('express');
const {
    addEnergyUsage,
    getEnergyUsageHistory,
    updateEnergyUsage,
    deleteEnergyUsage
} = require('../controllers/energyUsageController');
const router = express.Router();

// Ruta para agregar datos de uso de energía
router.post('/', addEnergyUsage);

// Ruta para obtener el historial de uso de energía de un usuario
router.get('/:userId', getEnergyUsageHistory);

// Ruta para actualizar un registro de uso de energía
router.put('/:usageId', updateEnergyUsage);

// Ruta para eliminar un registro de uso de energía
router.delete('/:usageId', deleteEnergyUsage);

module.exports = router;
