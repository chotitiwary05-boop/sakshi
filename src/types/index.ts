export type UserRole = 'sadmin' | 'admin' | 'operator' | 'staff' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  code: string;
  adminId: string;
  status: 'active' | 'inactive';
}

export interface Qualification {
  level: '10th' | '12th' | 'Graduation' | 'Post Graduation' | 'Other';
  passingYear: string;
  subject: string;
  boardUniversity: string;
  division: string;
  percentage: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email?: string;
  username?: string;
  password?: string;
  role: string;
  branch?: string;
  branchId?: string;
}

export interface StudentFeeInstallment {
  id: string;
  studentId: string;
  installmentNo?: number;
  amount?: number;
  amountPaid?: number;
  date: string;
  paymentDate?: string;
  mode?: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
  paymentMode?: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
  transactionRef?: string;
  receiptNo: string;
  notes?: string;
  remarks?: string;
}

export interface Student extends User {
  role: 'student';
  regNo: string;
  aadhaarNo?: string;
  nameHindi?: string;
  fatherName?: string;
  motherName?: string;
  husbandName?: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  category?: 'General' | 'OBC' | 'SC' | 'ST';
  address?: string;
  pinCode?: string;
  whatsappNo?: string;
  mobileSecondary?: string;
  photoUrl?: string;
  qualifications?: Qualification[];
  
  courseId: string;
  courseName?: string;
  batchId: string;
  batchTiming?: string;
  facultyName?: string;
  
  admissionDate: string;
  feesPaid: number;
  totalFees: number;
  installments?: StudentFeeInstallment[];
  nextDueDate?: string;
  attendance: number; // percentage
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  batches: string[];
  designation?: string;
  joiningDate?: string;
  salary?: number;
}

export interface StaffAttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  date: string;
  status: 'present' | 'absent' | 'half_day' | 'leave';
  checkIn?: string;
  checkOut?: string;
  notes?: string;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  teacherId: string;
  schedule: string;
  studentCount: number;
  facultyName?: string;
}

export interface Course {
  id: string;
  name: string;
  code?: string;
  description: string;
  duration: string;
  fees: number;
  fee?: number;
  admissionFee?: number;
  installmentFee1?: number;
  installmentFee2?: number;
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

export type ExpenseCategory = 
  | 'Rent & Building' 
  | 'Electricity & Utilities' 
  | 'Faculty & Staff Salary' 
  | 'Marketing & Banners' 
  | 'Internet & IT Software' 
  | 'Office Maintenance' 
  | 'Miscellaneous';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paidTo: string;
  paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  description: string;
  voucherNo?: string;
  recordedBy?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMode?: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
  receiptNo?: string;
  studentId?: string;
}

export interface University {
  id: string;
  name: string;
  address: string;
}
