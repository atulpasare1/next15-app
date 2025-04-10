import axios from 'axios';

import endpoints from './endpoints';

const api = axios.create({
  baseURL: 'https://iitjobs.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

const apiService = {
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
};

export default apiService;
export { endpoints };
