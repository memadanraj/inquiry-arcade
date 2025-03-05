
import { api } from '@/lib/api';
import { LoginRequestDto, ApiResponse, AuthResponse } from '@/types/api';

export const authService = {
  login: async (credentials: LoginRequestDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/api/userinfo/public/login', credentials);
    return response.data;
  },

  register: async (uName: string, uPassword: string, uEmail: string): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/userinfo/public/reg', null, {
      params: { uName, uPassword, uEmail }
    });
    return response.data;
  },

  changePassword: async (uPassword: string): Promise<ApiResponse<any>> => {
    const response = await api.put('/api/userinfo/user/pwChange', null, {
      params: { uPassword }
    });
    return response.data;
  },

  removeAccount: async (): Promise<ApiResponse<any>> => {
    const response = await api.delete('/api/userinfo/user/removeAcc');
    return response.data;
  },
  
  validateToken: async (): Promise<ApiResponse<any>> => {
    // This endpoint would be used to validate tokens on app startup
    // You may need to adjust this based on your actual API
    const response = await api.get('/api/userinfo/user/validate');
    return response.data;
  }
};

// Admin specific auth operations
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
