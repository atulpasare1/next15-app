import axios from 'axios';

import endpoints from './endpoints';

// Create an axios instance that uses the Next.js rewrite feature
// This will automatically proxy requests to the external API
const api = axios.create({
  // Use the /api path which will be rewritten by Next.js to the external API
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds
  maxRedirects: 5,

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('Making request to:', config.baseURL + config.url);
    console.log('Request params:', config.params);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => {
    console.log('Received response from:', response.config.url);
    console.log('Response status:', response.status);
    return response;
  },
  error => {
    // Handle CORS and other errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.status, error.response.data);
      console.error('Error URL:', error.config.url);
    } else if (error.request) {
      // The request was made but no response was received
      // This could be a CORS issue or network error
      console.error('Error request:', error.request);
      console.error('Request config:', error.config);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// API service that works with the Next.js rewrite feature
const apiService = {
  get: (url, params) => {
    console.log(`apiService.get called with url: ${url}, params:`, params);
    return api.get(url, { params });
  },
  post: (url, data) => {
    console.log(`apiService.post called with url: ${url}, data:`, data);
    return api.post(url, data);
  },
  put: (url, data) => {
    console.log(`apiService.put called with url: ${url}, data:`, data);
    return api.put(url, data);
  },
  delete: (url) => {
    console.log(`apiService.delete called with url: ${url}`);
    return api.delete(url);
  },
};

export default apiService;
export { endpoints };
