import axios from 'axios';

// Creamos una instancia de axios pre-configurada
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // La URL de nuestro backend NestJS
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores global (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
