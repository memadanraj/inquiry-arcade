
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api';

export const communityService = {
  createQuestion: async (
    title: string,
    description: string,
    imageUrl?: string,
    tags?: string
  ): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/ComQn/user/createQn', null, {
      params: { title, description, imageUrl, tags }
    });
    return response.data;
  }
};
