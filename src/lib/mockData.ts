import { AdmissionLead, Batch, Course, Student, Teacher, Transaction, User, VideoLecture, University, Branch, AdminAccount } from "../types";

export const MOCK_USER: User = {
  id: '1',
  name: 'Arjun Mehra',
  email: 'arjun@sakshi.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
};

export const MOCK_BRANCHES: Branch[] = [
  { id: 'br1', name: 'Sakshi Pawai', location: 'Pawai, Panna', code: 'SP01', adminId: '1', status: 'active' },
  { id: 'br2', name: 'Sakshi Panna', location: 'Panna City', code: 'SP02', adminId: 'aa2', status: 'active' },
];

export const MOCK_ADMIN_ACCOUNTS: AdminAccount[] = [
  { id: 'aa1', username: 'admin', password: '123456', role: 'admin', name: 'Arjun Mehra', branchId: 'br1' },
  { id: 'aa2', username: 'panna_admin', password: 'password123', role: 'admin', name: 'Suresh Kumar', branchId: 'br2' },
  { id: 'aa3', username: 'staff1', password: 'welcome2024', role: 'staff', name: 'Anjali Sharma', branchId: 'br1' },
];

export const MOCK_COURSES: Course[] = [
  { id: 'c1', name: 'D.C.A.', description: 'Diploma in Computer Applications (Eligibility: 12th)', duration: '1 Year', fees: 15000 },
  { id: 'c2', name: 'P.G.D.C.A.', description: 'Post Graduate Diploma in Computer Applications (Eligibility: Graduate)', duration: '1 Year', fees: 18000 },
  { id: 'c3', name: 'B.C.A.', description: 'Bachelor of Computer Applications', duration: '3 Years', fees: 45000 },
  { id: 'c4', name: 'B.B.A.', description: 'Bachelor of Business Administration', duration: '3 Years', fees: 40000 },
  { id: 'c5', name: 'M.C.A.', description: 'Master of Computer Applications', duration: '2 Years', fees: 60000 },
  { id: 'c6', name: 'M.B.A.', description: 'Master of Business Administration', duration: '2 Years', fees: 75000 },
  { id: 'c7', name: 'B.Ed.', description: 'Bachelor of Education', duration: '2 Years', fees: 50000 },
  { id: 'c8', name: 'D.Eled (D.Ed.)', description: 'Diploma in Elementary Education', duration: '2 Years', fees: 35000 },
  { id: 'c9', name: 'B.Sc.', description: 'Bachelor of Science', duration: '3 Years', fees: 30000 },
  { id: 'c10', name: 'B.A.', description: 'Bachelor of Arts', duration: '3 Years', fees: 20000 },
  { id: 'c11', name: 'B.Com.', description: 'Bachelor of Commerce', duration: '3 Years', fees: 22000 },
  { id: 'c12', name: 'M.A.', description: 'Master of Arts', duration: '2 Years', fees: 25000 },
  { id: 'c13', name: 'M.Sc.', description: 'Master of Science', duration: '2 Years', fees: 35000 },
  { id: 'c14', name: 'M.Com.', description: 'Master of Commerce', duration: '2 Years', fees: 28000 },
  { id: 'c15', name: 'MSW', description: 'Master of Social Work', duration: '2 Years', fees: 30000 },
  { id: 'c16', name: 'M.Lib.', description: 'Master of Library Science', duration: '1 Year', fees: 20000 },
  { id: 'c17', name: 'B.Lib.', description: 'Bachelor of Library Science', duration: '1 Year', fees: 15000 },
];

export const MOCK_BATCHES: Batch[] = [
  { id: 'b1', name: 'DCA-2024-A', courseId: 'c1', teacherId: 't1', schedule: 'Mon-Sat, 9:00 AM - 11:00 AM', studentCount: 30 },
  { id: 'b2', name: 'PGDCA-2024-A', courseId: 'c2', teacherId: 't2', schedule: 'Mon-Sat, 11:00 AM - 1:00 PM', studentCount: 25 },
  { id: 'b3', name: 'BCA-1st-Year', courseId: 'c3', teacherId: 't1', schedule: 'Mon-Fri, 2:00 PM - 4:00 PM', studentCount: 40 },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'student', batchId: 'b1', admissionDate: '2023-08-15', feesPaid: 5000, totalFees: 15000, attendance: 85 },
  { id: 's2', name: 'Priya Patel', email: 'priya@example.com', role: 'student', batchId: 'b1', admissionDate: '2023-08-20', feesPaid: 15000, totalFees: 15000, attendance: 92 },
  { id: 's3', name: 'Amit Kumar', email: 'amit@example.com', role: 'student', batchId: 'b2', admissionDate: '2023-09-01', feesPaid: 8000, totalFees: 18000, attendance: 78 },
  { id: 's4', name: 'Sneha Gupta', email: 'sneha@example.com', role: 'student', batchId: 'b2', admissionDate: '2023-09-05', feesPaid: 18000, totalFees: 18000, attendance: 95 },
  { id: 's5', name: 'Vikram Singh', email: 'vikram@example.com', role: 'student', batchId: 'b3', admissionDate: '2023-09-10', feesPaid: 10000, totalFees: 45000, attendance: 82 },
  { id: 's6', name: 'Anjali Sharma', email: 'anjali@example.com', role: 'student', batchId: 'b1', admissionDate: '2024-01-10', feesPaid: 2000, totalFees: 15000, attendance: 88 },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 't1', name: 'Dr. Rajesh Verma', email: 'verma@eduflow.com', role: 'teacher', subjects: ['Mathematics'], batches: ['b1', 'b3'] },
  { id: 't2', name: 'Prof. Sunita Singh', email: 'singh@eduflow.com', role: 'teacher', subjects: ['Physics'], batches: ['b2'] },
  { id: 't3', name: 'Anil Kulkarni', email: 'anil@eduflow.com', role: 'teacher', subjects: ['Chemistry'], batches: [] },
];

export const MOCK_LEADS: AdmissionLead[] = [
  { id: 'l1', name: 'Suresh Raina', email: 'suresh@gmail.com', phone: '9876543210', courseId: 'c1', status: 'new', date: '2024-03-10' },
  { id: 'l2', name: 'Anjali Gupta', email: 'anjali@gmail.com', phone: '9876543211', courseId: 'c2', status: 'contacted', date: '2024-03-08' },
  { id: 'l3', name: 'Ishaan Kishan', email: 'ishaan@gmail.com', phone: '9876543212', courseId: 'c3', status: 'new', date: '2024-03-11' },
];

export const MOCK_VIDEOS: VideoLecture[] = [
  { id: 'v1', title: 'Calculus Basics', description: 'Introduction to differentiation', url: '#', thumbnail: 'https://picsum.photos/seed/math/400/225', duration: '45:00', subject: 'Mathematics', tags: ['Calculus', 'Basics'] },
  { id: 'v2', title: 'Newton\'s Laws', description: 'Deep dive into motion', url: '#', thumbnail: 'https://picsum.photos/seed/physics/400/225', duration: '52:15', subject: 'Physics', tags: ['Mechanics', 'Laws'] },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tr1', type: 'income', amount: 12000, category: 'Fees', description: 'Priya Patel - Full Payment', date: '2024-03-01' },
  { id: 'tr2', type: 'expense', amount: 5000, category: 'Rent', description: 'March Rent', date: '2024-03-05' },
  { id: 'tr3', type: 'income', amount: 8000, category: 'Fees', description: 'Rahul Sharma - Installment', date: '2024-03-07' },
];

export const MOCK_UNIVERSITIES: University[] = [
  { id: 'u1', name: 'Makhanlal Chaturvedi National University of Journalism & Communication, Bhopal', address: 'Bhopal' },
  { id: 'u2', name: 'Rani Durgavati Vishwavidyalaya, Jabalpur', address: 'Jabalpur' },
  { id: 'u3', name: 'Maharaja Chhatrasal Bundelkhand University, Chhatarpur', address: 'Chhatarpur' },
];
