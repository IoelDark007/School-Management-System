import api, { ApiResponse } from "../client";

interface Subject {
  id: number;
  subject_name: string;
  subject_code: string;
}

interface Class {
  id: number;
  class_name: string;
  academic_year: string;
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

interface Grade {
  id: number;
  student: {
    id: number;
    first_name: string;
    last_name: string;
  };
  subject: Subject;
  marks: string;
  grade_date: string;
}

interface Enrollment {
  id: number;
  student: {
    id: number;
    first_name: string;
    last_name: string;
  };
  class_obj: Class;
}

export const academicApi = {
  // Subjects
  subjects: {
    list: (): Promise<ApiResponse<Subject[]>> => api.get("/api/subjects/"),
    get: (id: number): Promise<ApiResponse<Subject>> => api.get(`/api/subjects/${id}/`),
    create: (data: Omit<Subject, "id">): Promise<ApiResponse<Subject>> =>
      api.post("/api/subjects/", data),
    update: (id: number, data: Partial<Subject>): Promise<ApiResponse<Subject>> =>
      api.patch(`/api/subjects/${id}/`, data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/subjects/${id}/`),
  },

  // Classes
  classes: {
    list: (): Promise<ApiResponse<Class[]>> => api.get("/api/classes/"),
    get: (id: number): Promise<ApiResponse<Class>> => api.get(`/api/classes/${id}/`),
    create: (data: Partial<Class>): Promise<ApiResponse<Class>> =>
      api.post("/api/classes/", data),
    update: (id: number, data: Partial<Class>): Promise<ApiResponse<Class>> =>
      api.patch(`/api/classes/${id}/`, data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/classes/${id}/`),
  },

  // Grades
  grades: {
    list: (): Promise<ApiResponse<Grade[]>> => api.get("/api/grades/"),
    get: (id: number): Promise<ApiResponse<Grade>> => api.get(`/api/grades/${id}/`),
    create: (data: Partial<Grade>): Promise<ApiResponse<Grade>> =>
      api.post("/api/grades/", data),
    update: (id: number, data: Partial<Grade>): Promise<ApiResponse<Grade>> =>
      api.patch(`/api/grades/${id}/`, data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/grades/${id}/`),
    byStudent: (studentId: number): Promise<ApiResponse<Grade[]>> =>
      api.get(`/api/grades/?student=${studentId}`),
  },

  // Enrollments
  enrollments: {
    list: (): Promise<ApiResponse<Enrollment[]>> => api.get("/api/enrollments/"),
    get: (id: number): Promise<ApiResponse<Enrollment>> => api.get(`/api/enrollments/${id}/`),
    create: (data: Partial<Enrollment>): Promise<ApiResponse<Enrollment>> =>
      api.post("/api/enrollments/", data),
    delete: (id: number): Promise<ApiResponse<void>> => api.delete(`/api/enrollments/${id}/`),
  },
};