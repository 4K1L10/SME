const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).json({ error: 'No token provided or invalid token' }); // Cambié el error a 403
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' }); // Cambié el error a 403
    }
    req.user = decoded; // Guardar los datos del usuario decodificados en `req.user`
    next(); // Permitir que la solicitud continúe a la siguiente función
  });
}

module.exports = { verifyToken };