
import { api, fileApi } from '@/lib/api';
import { ApiResponse } from '@/types/api';

export const resultsService = {
  getAllResults: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/results/user/getAllResults');
    return response.data;
  },

  addResult: async (resultName: string, pdfFile: File): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('pdfFIle', pdfFile);
    
    const response = await fileApi.post('/api/results/admin/addResults', formData, {
      params: { resultName }
    });
    
    return response.data;
  },

  deleteResult: async (resultId: number): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/api/results/admin/removeResults/${resultId}`);
    return response.data;
  }
};
