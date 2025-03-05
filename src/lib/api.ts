
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = 'http://localhost:8081';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    const message = error.response?.data?.message || 'An unexpected error occurred';
    
    if (error.response?.status === 401) {
      // Handle unauthorized access - token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      toast.error('Your session has expired. Please login again.');
      window.location.href = '/';
    } else if (error.response?.status === 403) {
      // Handle forbidden access - user doesn't have permission
      toast.error('You do not have permission to perform this action');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// File upload API instance with different content type
export const fileApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Apply same JWT token logic to fileApi
fileApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fileApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    const message = error.response?.data?.message || 'An unexpected error occurred';
    
    if (error.response?.status === 401) {
      // Handle unauthorized access for file uploads
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      toast.error('Your session has expired. Please login again.');
      window.location.href = '/';
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);
