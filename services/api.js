import axios from 'axios';
import { REACT_APP_API_URL } from '../urlconf';
baseURL = REACT_APP_API_URL
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
