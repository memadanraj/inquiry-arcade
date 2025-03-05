
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { LoginRequestDto, ApiResponse, AuthResponse, User } from '@/types/api';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequestDto) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });
  const navigate = useNavigate();

  // Check for existing token and validate it
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
        } else {
          // If no stored user but we have a token, we could fetch user info here
          // Uncomment when API endpoint is available
          // const userInfo = await authService.validateToken();
          // if (userInfo.data) {
          //   setAuthState({
          //     user: userInfo.data,
          //     isLoading: false,
          //     isAuthenticated: true
          //   });
          // }
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        handleAuthError(error);
      } finally {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    validateSession();
  }, []);

  const handleAuthError = (error: any) => {
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

  const login = async (credentials: LoginRequestDto) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.login(credentials);
      
      // Handle successful login
      handleSuccessfulAuth(response);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      handleAuthError(error);
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
      handleAuthError(error);
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSuccessfulAuth = (response: ApiResponse<AuthResponse>) => {
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
      handleAuthError(error);
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const contextValue: AuthContextType = {
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    login,
    register,
    logout,
    changePassword
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
