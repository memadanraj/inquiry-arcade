import { api } from '@/lib/api';
import { LoginRequestDto, ApiResponse, AuthResponse, User } from '@/types/api';

/**
 * Authentication service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Authenticates a user with email and password
   * @param credentials User login credentials
   * @returns Promise with auth response containing token and user info
   */
  login: async (credentials: LoginRequestDto): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post('/api/userinfo/public/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login request failed:', error);
      throw error;
    }
  },

  /**
   * Registers a new user
   * @param uName User's name
   * @param uPassword User's password
   * @param uEmail User's email
   * @returns Promise with registration response
   */
  register: async (uName: string, uPassword: string, uEmail: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post('/api/userinfo/public/reg', null, {
        params: { uName, uPassword, uEmail }
      });
      return response.data;
    } catch (error) {
      console.error('Registration request failed:', error);
      throw error;
    }
  },

  /**
   * Changes the password for the current authenticated user
   * @param uPassword New password
   * @returns Promise with password change response
   */
  changePassword: async (uPassword: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.put('/api/userinfo/user/pwChange', null, {
        params: { uPassword }
      });
      return response.data;
    } catch (error) {
      console.error('Password change request failed:', error);
      throw error;
    }
  },

  /**
   * Removes the current user account
   * @returns Promise with account removal response
   */
  removeAccount: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete('/api/userinfo/user/removeAcc');
      return response.data;
    } catch (error) {
      console.error('Account removal request failed:', error);
      throw error;
    }
  },
  
  /**
   * Validates the current authentication token
   * @returns Promise with token validation response
   */
  validateToken: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get('/api/userinfo/user/validate');
      return response.data;
    } catch (error) {
      console.error('Token validation request failed:', error);
      throw error;
    }
  },

  /**
   * Retrieves the current user profile
   * @returns Promise with user profile data
   */
  getUserProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get('/api/userinfo/user/profile');
      return response.data;
    } catch (error) {
      console.error('User profile request failed:', error);
      throw error;
    }
  }
};

// Admin specific auth operations remain the same
export const adminAuthService = {
  getAllUsers: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/userinfo/admin/getAll');
    return response.data;
  },

  createUser: async (uName: string, uPassword: string, uEmail: string, roleName?: string): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/userinfo/admin/reg', null, {
      params: { uName, uPassword, uEmail, roleName }
    });
    return response.data;
  },

  updateUser: async (userId: number, newPassword: string, roleName?: string): Promise<ApiResponse<any>> => {
    const response = await api.put(`/api/userinfo/admin/updateUserInfo/${userId}`, null, {
      params: { newPassword, roleName }
    });
    return response.data;
  },

  removeUser: async (userId: number): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/api/userinfo/admin/removeUserAccs/${userId}`);
    return response.data;
  },

  createRole: async (roleName: string): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/userinfo/admin/addRole', null, {
      params: { roleName }
    });
    return response.data;
  }
};
