
import { api } from '@/lib/api';
import { ApiResponse, SubjectDto } from '@/types/api';

export const mappingService = {
  getAllSubjects: async (): Promise<ApiResponse<SubjectDto[]>> => {
    const response = await api.get('/api/mapping/admin/sub');
    return response.data;
  }
};
