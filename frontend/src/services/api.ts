import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.50:3333',
  // baseURL: 'http://localhost:3333',
});

export default api;
