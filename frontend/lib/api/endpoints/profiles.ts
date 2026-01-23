import api, { ApiResponse } from "../client";

interface Student {
  id: number;
  user_id: number;
  parent_id?: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  status: "active" | "graduated" | "inactive";
}

interface Teacher {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  specialization?: string;
}

interface Parent {
  id: number;
  user_id: number;
  phone_number?: string;
  address?: string;
}

export const profilesApi = {
  // Students
  students: {
    list: (): Promise<ApiResponse<Student[]>> => api.get("/api/students/"),
    get: (id: number): Promise<ApiResponse<Student>> => api.get(`/api/students/${id}/`),
    create: (data: Partial<Student>): Promise<ApiResponse<Student>> =>
      api.post("/api/students/", data),
    update: (id: number, data: Partial<Student>): Promise<ApiResponse<Student>> =>
      api.patch(`/api/students/${id}/`, data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/students/${id}/`),
  },

  // Teachers
  teachers: {
    list: (): Promise<ApiResponse<Teacher[]>> => api.get("/api/teachers/"),
    get: (id: number): Promise<ApiResponse<Teacher>> => api.get(`/api/teachers/${id}/`),
    create: (data: Partial<Teacher>): Promise<ApiResponse<Teacher>> =>
      api.post("/api/teachers/", data),
    update: (id: number, data: Partial<Teacher>): Promise<ApiResponse<Teacher>> =>
      api.patch(`/api/teachers/${id}/`, data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/teachers/${id}/`),
  },

  // Parents
  parents: {
    list: (): Promise<ApiResponse<Parent[]>> => api.get("/api/parents/"),
    get: (id: number): Promise<ApiResponse<Parent>> => api.get(`/api/parents/${id}/`),
    create: (data: Partial<Parent>): Promise<ApiResponse<Parent>> =>
      api.post("/api/parents/", data),
    update: (id: number, data: Partial<Parent>): Promise<ApiResponse<Parent>> =>
      api.patch(`/api/parents/${id}/`, data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/parents/${id}/`),
  },
};