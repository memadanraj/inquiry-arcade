
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { AuthState } from '@/types/auth';
import { LoginRequestDto } from '@/types/api';
import { handleSuccessfulAuth, handleAuthError } from '@/utils/authUtils';

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });
  const navigate = useNavigate();

  // Check for existing token and validate it on mount
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // Try to validate the token and get user info
        const storedUser = localStorage.getItem('user_info');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true
          });
        }
        // Future implementation: Fetch user info if we have token but no stored user
      } catch (error) {
        console.error('Token validation failed:', error);
        handleAuthError(error, setAuthState);
      } finally {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    validateSession();
  }, []);

  const login = async (credentials: LoginRequestDto) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.login(credentials);
      
      // Handle successful login
      handleSuccessfulAuth(response, setAuthState);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      handleAuthError(error, setAuthState);
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.register(name, password, email);
      toast.success('Registration successful! Please login.');
    } catch (error) {
      console.error('Registration failed:', error);
      handleAuthError(error, setAuthState);
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
    
    toast.info('You have been logged out.');
    navigate('/');
  };

  const changePassword = async (newPassword: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.changePassword(newPassword);
      toast.success('Password changed successfully!');
    } catch (error) {
      console.error('Password change failed:', error);
      handleAuthError(error, setAuthState);
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    changePassword
  };
};
