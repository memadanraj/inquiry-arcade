
import { api, fileApi } from '@/lib/api';
import { ApiResponse, TestEntity } from '@/types/api';

export const questionService = {
  getAllQuestions: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/qn/admin/getAllQn');
    return response.data;
  },

  getQuestionsBySubject: async (subId: number): Promise<ApiResponse<any>> => {
    const response = await api.get(`/api/qn/user/getQnOnSub/${subId}`);
    return response.data;
  },

  getQuestionImages: async (subId: number): Promise<ApiResponse<any>> => {
    const response = await api.get(`/api/qn/user/getQnImage/${subId}`);
    return response.data;
  },

  addQuestion: async (
    qName: string,
    qYear: string,
    qType: string,
    subName: string,
    files: File[]
  ): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await fileApi.post('/api/qn/admin/addQn', formData, {
      params: { qName, qYear, qType, subName }
    });
    
    return response.data;
  },

  updateQuestion: async (
    qid: number,
    qName: string,
    qYear: string,
    qType: string,
    testEntity: TestEntity,
    files?: File[],
    deleteIds?: string[]
  ): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    
    // Append test entity as JSON
    formData.append('testEntity', JSON.stringify(testEntity));
    
    // Append any new files
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('file', file);
      });
    }
    
    const response = await fileApi.put(`/api/qn/admin/updateQn/${qid}`, formData, {
      params: { 
        qName, 
        qYear, 
        qType,
        deleteIds: deleteIds ? deleteIds.join(',') : undefined
      }
    });
    
    return response.data;
  },

  deleteQuestion: async (qid: number): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/api/qn/admin/remove/${qid}`);
    return response.data;
  }
};
