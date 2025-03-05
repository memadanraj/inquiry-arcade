
// API response and request models

export interface LoginRequestDto {
  userName: string;
  userPassword: string;
}

export interface NoticeEntity {
  noticeId?: number;
  noticeName: string;
  noticeMessage: string;
  createdDate?: string;
}

export interface ImageInfoMultipleImage {
  publicId: string;
  imageUrl: string;
}

export interface SemesterEntity {
  semId?: number;
  semsterName: string;
  subjectEntities?: SubjectEntity[];
}

export interface SubjectEntity {
  subId?: number;
  subjectName: string;
  semesterEntiry?: SemesterEntity;
  chapterEntityList?: ChapterEntity[];
  solutionEntities?: SolutionEntity[];
  testEntities?: TestEntity[];
}

export interface SubjectDto {
  subId: number;
  subjectName: string;
}

export interface ChapterEntity {
  chapId?: number;
  chapterTitle: string;
  subjectEntity?: SubjectEntity;
  notesEntiries?: NotesEntity[];
}

export interface NotesEntity {
  notesId?: number;
  notesContent: string;
  images?: string[];
  chapId?: ChapterEntity;
}

export interface TestEntity {
  qid?: number;
  name: string;
  year: string;
  type: string;
  imageurls?: ImageInfoMultipleImage[];
  subjectEntity?: SubjectEntity;
}

export interface SolutionEntity {
  solId?: number;
  solName: string;
  images?: ImageInfoMultipleImage[];
  subjectEntity?: SubjectEntity;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserProfile extends User {
  // Additional profile fields can be added here
}
