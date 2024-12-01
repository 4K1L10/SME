const express = require('express');
const router = express.Router();
const devicesController = require('../controllers/deviceController');
const db = require('../db'); 

// Rutas para la gestión de dispositivos
router.get('/', devicesController.getDevices);
router.post('/', devicesController.addDevice);
router.put('/:device_id', devicesController.updateDevice);
router.delete('/:device_id', devicesController.deleteDevice);



module.exports = router;
