require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Inicio de sesión
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar que JWT_SECRET esté definida
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET no está definida en el archivo .env' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};
// Registro de usuario
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Validar la entrada
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }

  // Verificar si el usuario ya existe
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Hashear la contraseña y registrar al usuario
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error al hashear la contraseña:', err);
        return res.status(500).json({ error: 'Error al hashear la contraseña' });
      }

      const insertQuery = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, hash], (err, result) => {
        if (err) {
          console.error('Error al registrar el usuario:', err);
          return res.status(500).json({ error: 'Error al registrar el usuario', details: err });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
};