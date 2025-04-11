import axios from 'axios';

import endpoints from './endpoints';

const api = axios.create({
  baseURL: 'https://testxsystem.iitjobs.com/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds
  maxRedirects: 5,

  headers: {
    'Content-Type': '*',
    'Accept': '*',

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
