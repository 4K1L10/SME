import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verifica si hay un token en el localStorage
  
  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/api/login" />;
  }

  // Si hay token, renderiza la página protegida
  return children;
};

export default ProtectedRoute;