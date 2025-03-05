
import { api } from '@/lib/api';
import { NoticeEntity, ApiResponse } from '@/types/api';

export const noticeService = {
  getAllNotices: async (): Promise<ApiResponse<NoticeEntity[]>> => {
    const response = await api.get('/api/notice/user/getAllNotice');
    return response.data;
  },

  addNotice: async (noticeName: string, noticeMessage: string): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/notice/admin/addNotice', null, {
      params: { noticeName, noticeMessage }
    });
    return response.data;
  },

  updateNotice: async (nid: number, notice: NoticeEntity): Promise<ApiResponse<NoticeEntity>> => {
    const response = await api.put(`/api/notice/admin/updateNotice/${nid}`, notice);
    return response.data;
  },

  deleteNotice: async (nid: number): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/api/notice/admin/removeNotice/${nid}`);
    return response.data;
  },

  // Stream notifications (might need special handling for SSE)
  streamNotifications: () => {
    const eventSource = new EventSource('/api/notice/user/notification/stream');
    return eventSource;
  }
};
