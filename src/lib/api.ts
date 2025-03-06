
import axios, { AxiosInstance } from 'axios';
import { API_URL, HEADERS } from './apiConfig';
import { addAuthInterceptor, addResponseInterceptor } from './apiInterceptors';

/**
 * Create and configure main API instance
 */
export const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: HEADERS.DEFAULT,
  });

  return instance;
};

/**
 * Create and configure file upload API instance
 */
export const createFileApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: HEADERS.MULTIPART,
  });

  return instance;
};

// Initialize API instances
export const api = createApiInstance();
export const fileApi = createFileApiInstance();

// Apply interceptors
addAuthInterceptor(api);
addResponseInterceptor(api);
addAuthInterceptor(fileApi);
addResponseInterceptor(fileApi);
