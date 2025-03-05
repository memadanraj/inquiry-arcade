
import { api, fileApi } from '@/lib/api';
import { ApiResponse } from '@/types/api';

export const solutionService = {
  getAllSolutions: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/solution/admin/getAll');
    return response.data;
  },

  getSolutionById: async (solid: number): Promise<ApiResponse<any>> => {
    const response = await api.get(`/api/solution/user/updateGet/${solid}`);
    return response.data;
  },

  getSolutionsBySubject: async (subId: number): Promise<ApiResponse<any>> => {
    const response = await api.get(`/api/solution/user/getOnSub/${subId}`);
    return response.data;
  },

  addSolution: async (solutionEntity: string, subName: string, files: File[]): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('file', file);
    });
    
    const response = await fileApi.post('/api/solution/admin/addSolution', formData, {
      params: { solutionEntity, subName }
    });
    
    return response.data;
  },

  updateSolution: async (solId: number, solName: string, files?: File[], deleteIds?: string[]): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }
    
    const response = await fileApi.put(`/api/solution/admin/update/${solId}`, formData, {
      params: { 
        solName,
        deleteIds: deleteIds ? deleteIds.join(',') : undefined
      }
    });
    
    return response.data;
  },

  deleteSolution: async (solId: number): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/api/solution/admin/removeSolution/${solId}`);
    return response.data;
  }
};
