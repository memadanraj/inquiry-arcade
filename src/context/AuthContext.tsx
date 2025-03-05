
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { LoginRequestDto } from '@/types/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequestDto) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token and validate it
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        // Try to validate the token and get user info
        const storedUser = localStorage.getItem('user_info');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If no stored user but we have a token, we could fetch user info here
          // await fetchUserProfile();
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        // Clear invalid credentials
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (credentials: LoginRequestDto) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      // Check if response contains token and user data
      if (response.data?.token) {
        // Store JWT token and user info
        const { token, user } = response.data;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_info', JSON.stringify(user));
        
        setUser(user);
        toast.success('Login successful!');
        
        // Navigate to dashboard or home after successful login
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.register(name, password, email);
      toast.success('Registration successful! Please login.');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    setUser(null);
    toast.info('You have been logged out.');
    
    // Navigate to home page after logout
    navigate('/');
  };

  const changePassword = async (newPassword: string) => {
    setIsLoading(true);
    try {
      await authService.changePassword(newPassword);
      toast.success('Password changed successfully!');
    } catch (error) {
      console.error('Password change failed:', error);
      toast.error('Failed to change password. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        changePassword
      }}
    >
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
