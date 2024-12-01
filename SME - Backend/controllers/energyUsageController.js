const db = require('../db');

// Obtener todos los registros de consumo de energía
exports.getEnergyUsage = (req, res) => {
    const query = 'SELECT * FROM energy_usage';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al obtener datos.' });
      }
      res.json(results);
    });
  };
  
  // Agregar un nuevo registro de consumo
  exports.addEnergyUsage = (req, res) => {
    const { usage_kwh, device_name } = req.body;
    const query = 'INSERT INTO energy_usage (usage_kwh, device_name, timestamp) VALUES (?, ?, NOW())';
    db.query(query, [usage_kwh, device_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al agregar datos.' });
      }
      res.json({ message: 'Consumo agregado correctamente', usage_id: result.insertId });
    });
  };
  
  // Actualizar un registro de consumo existente
  exports.updateEnergyUsage = (req, res) => {
    const { usage_id } = req.params;
    const { usage_kwh, device_id } = req.body;
    const query = 'UPDATE energy_usage SET usage_kwh = ?, device_id = ? WHERE usage_id = ?';
    db.query(query, [usage_kwh, device_id, usage_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al actualizar datos.' });
      }
      res.json({ message: 'Consumo actualizado correctamente' });
    });
  };
  
  // Eliminar un registro de consumo
  exports.deleteEnergyUsage = (req, res) => {
    const { usage_id } = req.params;
    const query = 'DELETE FROM energy_usage WHERE usage_id = ?';
    db.query(query, [usage_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al eliminar datos.' });
      }
      res.json({ message: 'Consumo eliminado correctamente' });
    });
  };