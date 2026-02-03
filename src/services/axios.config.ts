import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.cubi.casa',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds
});

apiClient.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_CUBICASA_API_KEY;
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
