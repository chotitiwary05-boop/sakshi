export type UserRole = 'admin' | 'staff' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Student extends User {
  role: 'student';
  batchId: string;
  admissionDate: string;
  feesPaid: number;
  totalFees: number;
  attendance: number; // percentage
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  batches: string[];
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  teacherId: string;
  schedule: string;
  studentCount: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  fees: number;
}

export interface AdmissionLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  date: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  subject: string;
  tags: string[];
}

export interface Test {
  id: string;
  title: string;
  batchId: string;
  date: string;
  totalMarks: number;
  type: 'MCQ' | 'Subjective' | 'Mixed';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}
