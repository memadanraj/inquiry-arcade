
import { api, fileApi } from '@/lib/api';
import { NotesEntity, ApiResponse, ChapterEntity } from '@/types/api';

export const notesService = {
  getAllNotes: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/notes/admin/getAllNotes');
    return response.data;
  },

  getNotesOnChapter: async (chapID: number): Promise<ApiResponse<any>> => {
    const response = await api.get(`/api/notes/user/getNotesONChap/${chapID}`);
    return response.data;
  },

  addNotes: async (
    content: string,
    options: {
      semesterId?: number;
      newSemesterName?: string;
      subjectId?: number;
      newSubjectName?: string;
      chapterId?: number;
      newChapterName?: string;
    }
  ): Promise<ApiResponse<NotesEntity>> => {
    const response = await api.post('/api/notes/admin/addNotes', null, {
      params: {
        content,
        ...options
      }
    });
    return response.data;
  },

  updateNotes: async (chapID: number, notes: NotesEntity): Promise<ApiResponse<any>> => {
    const response = await api.put(`/api/notes/admin/updateOnChap/${chapID}`, notes);
    return response.data;
  },

  deleteNotes: async (chapID: number): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/api/notes/admin/deleteNotesOnChap/${chapID}`);
    return response.data;
  },

  uploadImage: async (file: File): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fileApi.post('/api/notes/admin/upload-images', formData);
    return response.data;
  }
};
