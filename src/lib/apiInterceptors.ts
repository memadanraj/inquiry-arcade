
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'sonner';

/**
 * Adds authentication token to request headers
 */
export const addAuthInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    }
  );
};

/**
 * Handles API response errors
 */
export const addResponseInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
      console.error('API Error:', error);
      
      // Add proper type assertion for error.response?.data
      const errorData = error.response?.data as { message?: string } | undefined;
      const message = errorData?.message || 'An unexpected error occurred';
      
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
};
