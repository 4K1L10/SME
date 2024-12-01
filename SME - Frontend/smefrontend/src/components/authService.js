import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3007/api/login', { email, password });
    const token = response.data.token;
    
    // Almacenar el token en el localStorage
    localStorage.setItem('token', token);
    
    return token;
  } catch (error) {
    throw new Error('Error de autenticación');
  }
};