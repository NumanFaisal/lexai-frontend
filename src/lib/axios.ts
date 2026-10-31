import axios from "axios";

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // If accessing from LAN (e.g. mobile device on 192.168.x.x), dynamically target that IP
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return `http://${window.location.hostname}:4000/api/v1`;
    }
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  return `${apiUrl.replace(/\/$/, '')}/api/v1`;
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Intercept requests and add the token automatically
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
