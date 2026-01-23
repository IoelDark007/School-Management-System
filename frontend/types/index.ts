// User types matchingDjango backend
export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "bursar" | "teacher" | "student" | "parent";
  first_name?: string;
  last_name?: string;
}

// Student type
export interface Student {
  id: number;
  user_id: number;
  parent_id?: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  status: "active" | "graduated" | "inactive";
}

// Teacher type
export interface Teacher {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  specialization?: string;
}

// Parent type
export interface Parent {
  id: number;
  user_id: number;
  phone_number?: string;
  address?: string;
}

// Subject type
export interface Subject {
  id: number;
  subject_name: string;
  subject_code: string;
}

// Class type
export interface Class {
  id: number;
  class_name: string;
  academic_year: string;
  teacher: Teacher;
}

// Grade type
export interface Grade {
  id: number;
  student: Student;
  subject: Subject;
  marks: string;
  grade_date: string;
}

// Enrollment type
export interface Enrollment {
  id: number;
  student: Student;
  class_obj: Class;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}