
import { toast } from 'sonner';
import { AuthState } from '@/types/auth';
import { ApiResponse, AuthResponse } from '@/types/api';

/**
 * Handle successful authentication by storing tokens and user data
 */
export const handleSuccessfulAuth = (
  response: ApiResponse<AuthResponse>,
  setAuthState: (state: AuthState) => void
): void => {
  // Check if response contains token and user data
  if (response.data?.token) {
    // Store JWT token and user info
    const { token, user } = response.data;
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(user));
    
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: true
    });
    
    toast.success('Login successful!');
  } else {
    throw new Error('Invalid response from server');
  }
};

/**
 * Handle authentication errors with appropriate messages
 */
export const handleAuthError = (
  error: any,
  setAuthState: (state: AuthState) => void
): void => {
  // Clear invalid credentials
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  
  setAuthState({
    user: null,
    isLoading: false,
    isAuthenticated: false
  });
  
  // More granular error handling
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      toast.error('Authentication failed: Invalid credentials');
    } else if (status === 403) {
      toast.error('Access denied: You do not have permission to perform this action');
    } else if (status === 429) {
      toast.error('Too many attempts: Please try again later');
    } else {
      const message = error.response.data?.message || 'An error occurred during authentication';
      toast.error(message);
    }
  } else if (error.request) {
    toast.error('Network error: Please check your connection and try again');
  } else {
    toast.error('Authentication error: ' + (error.message || 'An unexpected error occurred'));
  }
};
