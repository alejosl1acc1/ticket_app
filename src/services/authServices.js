import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (correo, contraseña) => {
  const response = await axios.post(`${API_URL}/login`, {
    correo_usuario: correo,
    contraseña_usuario: contraseña,
  });
  return response.data;
};