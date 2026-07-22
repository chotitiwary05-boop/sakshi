import { AdmissionLead, Batch, Course, Student, Teacher, Transaction, User, University, Branch, AdminAccount, Expense, StaffAttendanceRecord } from "../types";

export const MOCK_USER: User = {
  id: '1',
  name: 'Santosh Kushwaha',
  email: 'director@sakshicomputer.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1519085185758-26987a15998b?auto=format&fit=crop&q=80&w=200',
  phone: '+91 9926654640'
};

export const MOCK_BRANCHES: Branch[] = [
  { id: 'br1', name: 'Sakshi Pawai Branch', location: 'Near Bus Stand, Pawai, Panna (M.P.)', code: 'ASI-6281-PAWAI', adminId: '1', status: 'active' },
  { id: 'br2', name: 'Sakshi Mohandra Branch', location: 'Near Jain Mandir, Main Road Mohindra, Panna (M.P.)', code: 'ASI-6281-MOH', adminId: 'aa2', status: 'active' },
];

export const MOCK_ADMIN_ACCOUNTS: AdminAccount[] = [
  { id: 'aa1', username: 'admin', password: '123456', role: 'admin', name: 'Santosh Kushwaha (Director)', branchId: 'br1' },
  { id: 'aa2', username: 'operator', password: 'operator123', role: 'staff', name: 'Ramesh Patel (Operator)', branchId: 'br1' },
];

export const MOCK_COURSES: Course[] = [
  { id: 'c1', name: 'D.C.A. (Diploma in Computer Applications)', description: 'Affiliated with MCU. Duration: 1 Year (Eligibility: 12th Pass)', duration: '1 Year', fees: 11500, admissionFee: 4500, installmentFee1: 3500, installmentFee2: 3500 },
  { id: 'c2', name: 'P.G.D.C.A.', description: 'Post Graduate Diploma in Computer Applications (Eligibility: Graduation)', duration: '1 Year', fees: 12500, admissionFee: 5500, installmentFee1: 3500, installmentFee2: 3500 },
  { id: 'c3', name: 'Tally Prime with GST', description: 'Complete Industrial Accounting, Inventory & Tax e-Filing', duration: '3 Months', fees: 5000, admissionFee: 2500, installmentFee1: 2500 },
  { id: 'c4', name: 'C / C++ & Data Structures', description: 'Programming Logic, Algorithms & Object-Oriented Principles', duration: '3 Months', fees: 4000, admissionFee: 2000, installmentFee1: 2000 },
  { id: 'c5', name: 'CCC (Course on Computer Concepts)', description: 'Basic IT Skills, MS Office & Internet Fundamentals', duration: '2 Months', fees: 3500, admissionFee: 2000, installmentFee1: 1500 },
  { id: 'c6', name: 'Full Stack Web Development', description: 'HTML, CSS, JavaScript, React & Backend Services', duration: '6 Months', fees: 15000, admissionFee: 5000, installmentFee1: 5000, installmentFee2: 5000 },
];

export const MOCK_BATCHES: Batch[] = [
  { id: 'b1', name: 'DCA Morning Batch', courseId: 'c1', teacherId: 't1', schedule: 'Mon-Sat, 08:00 AM - 10:00 AM', studentCount: 28, facultyName: 'Er. R. K. Tiwari' },
  { id: 'b2', name: 'PGDCA Morning Batch', courseId: 'c2', teacherId: 't2', schedule: 'Mon-Sat, 10:00 AM - 12:00 PM', studentCount: 24, facultyName: 'Prof. S. N. Mishra' },
  { id: 'b3', name: 'Tally Evening Batch', courseId: 'c3', teacherId: 't1', schedule: 'Mon-Sat, 04:00 PM - 05:30 PM', studentCount: 18, facultyName: 'Er. R. K. Tiwari' },
  { id: 'b4', name: 'Web Dev Evening Batch', courseId: 'c6', teacherId: 't3', schedule: 'Mon-Sat, 05:30 PM - 07:00 PM', studentCount: 15, facultyName: 'Er. Akash Kushwaha' },
];

export const MOCK_STUDENTS: Student[] = [
  { 
    id: 's1', 
    regNo: 'ASI-6281-2024-001',
    name: 'Rahul Sharma', 
    nameHindi: 'राहुल शर्मा',
    email: 'rahul.sharma@gmail.com', 
    role: 'student', 
    fatherName: 'Mahesh Sharma',
    motherName: 'Sunita Sharma',
    dob: '2004-05-12',
    gender: 'Male',
    category: 'General',
    aadhaarNo: '9876 5432 1098',
    address: 'Near Jain Mandir, Main Road Mohindra, Panna (M.P.)',
    pinCode: '488441',
    whatsappNo: '9876543210',
    mobileSecondary: '9926654640',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    courseId: 'c1',
    courseName: 'D.C.A. (1 Year)',
    batchId: 'b1', 
    batchTiming: '08:00 AM - 10:00 AM',
    facultyName: 'Er. R. K. Tiwari',
    admissionDate: '2024-01-15', 
    feesPaid: 8000, 
    totalFees: 11500, 
    nextDueDate: '2024-08-15',
    attendance: 88,
    qualifications: [
      { level: '10th', passingYear: '2020', subject: 'All General', boardUniversity: 'MPBSE Bhopal', division: '1st', percentage: '78%' },
      { level: '12th', passingYear: '2022', subject: 'PCM Science', boardUniversity: 'MPBSE Bhopal', division: '1st', percentage: '82%' }
    ],
    installments: [
      { id: 'inst-1', studentId: 's1', installmentNo: 1, amount: 4500, date: '2024-01-15', mode: 'Cash', receiptNo: 'REC-2024-001', notes: 'Admission Fee' },
      { id: 'inst-2', studentId: 's1', installmentNo: 2, amount: 3500, date: '2024-04-10', mode: 'UPI', transactionRef: 'UPI/389102910', receiptNo: 'REC-2024-045', notes: 'Semester 1 Fee' }
    ]
  },
  { 
    id: 's2', 
    regNo: 'ASI-6281-2024-002',
    name: 'Priya Patel', 
    nameHindi: 'प्रिया पटेल',
    email: 'priya.patel@gmail.com', 
    role: 'student', 
    fatherName: 'Suresh Patel',
    motherName: 'Kiran Patel',
    dob: '2002-11-20',
    gender: 'Female',
    category: 'OBC',
    aadhaarNo: '8765 4321 0987',
    address: 'Near Bus Stand, Pawai, Panna (M.P.)',
    pinCode: '488446',
    whatsappNo: '9871234567',
    mobileSecondary: '9893883172',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    courseId: 'c2',
    courseName: 'P.G.D.C.A. (1 Year)',
    batchId: 'b2', 
    batchTiming: '10:00 AM - 12:00 PM',
    facultyName: 'Prof. S. N. Mishra',
    admissionDate: '2024-02-01', 
    feesPaid: 12500, 
    totalFees: 12500, 
    nextDueDate: '',
    attendance: 94,
    qualifications: [
      { level: '10th', passingYear: '2018', subject: 'General', boardUniversity: 'MPBSE Bhopal', division: '1st', percentage: '85%' },
      { level: '12th', passingYear: '2020', subject: 'Commerce', boardUniversity: 'MPBSE Bhopal', division: '1st', percentage: '80%' },
      { level: 'Graduation', passingYear: '2023', subject: 'B.Com', boardUniversity: 'MCBU Chhatarpur', division: '1st', percentage: '76%' }
    ],
    installments: [
      { id: 'inst-3', studentId: 's2', installmentNo: 1, amount: 5500, date: '2024-02-01', mode: 'UPI', transactionRef: 'UPI/981273918', receiptNo: 'REC-2024-012', notes: 'Full Fee Payment' },
      { id: 'inst-4', studentId: 's2', installmentNo: 2, amount: 7000, date: '2024-05-02', mode: 'Bank Transfer', transactionRef: 'NEFT/0912381', receiptNo: 'REC-2024-089', notes: 'Final Installment Clearance' }
    ]
  },
  { 
    id: 's3', 
    regNo: 'ASI-6281-2024-003',
    name: 'Amit Kumar Kushwaha', 
    nameHindi: 'अमित कुमार कुशवाहा',
    email: 'amit.kushwaha@gmail.com', 
    role: 'student', 
    fatherName: 'Ramcharan Kushwaha',
    motherName: 'Rajni Kushwaha',
    dob: '2005-03-15',
    gender: 'Male',
    category: 'OBC',
    aadhaarNo: '7654 3210 9876',
    address: 'Gram Simariya, Pawai Road, Panna (M.P.)',
    pinCode: '488446',
    whatsappNo: '8770542560',
    courseId: 'c3',
    courseName: 'Tally Prime with GST',
    batchId: 'b3', 
    batchTiming: '04:00 PM - 05:30 PM',
    facultyName: 'Er. R. K. Tiwari',
    admissionDate: '2024-03-01', 
    feesPaid: 2500, 
    totalFees: 5000, 
    nextDueDate: '2024-08-01',
    attendance: 82,
    qualifications: [
      { level: '10th', passingYear: '2021', subject: 'General', boardUniversity: 'MPBSE', division: '1st', percentage: '72%' },
      { level: '12th', passingYear: '2023', subject: 'Arts', boardUniversity: 'MPBSE', division: '2nd', percentage: '68%' }
    ],
    installments: [
      { id: 'inst-5', studentId: 's3', installmentNo: 1, amount: 2500, date: '2024-03-01', mode: 'Cash', receiptNo: 'REC-2024-025', notes: 'First Installment' }
    ]
  },
  { 
    id: 's4', 
    regNo: 'ASI-6281-2024-004',
    name: 'Sneha Gupta', 
    nameHindi: 'स्नेहा गुप्ता',
    email: 'sneha.gupta@gmail.com', 
    role: 'student', 
    fatherName: 'Vijay Gupta',
    motherName: 'Usha Gupta',
    dob: '2003-08-25',
    gender: 'Female',
    category: 'General',
    aadhaarNo: '6543 2109 8765',
    address: 'Main Bazaar, Mohindra, Panna (M.P.)',
    pinCode: '488441',
    whatsappNo: '9171654640',
    courseId: 'c1',
    courseName: 'D.C.A. (1 Year)',
    batchId: 'b1', 
    batchTiming: '08:00 AM - 10:00 AM',
    facultyName: 'Er. R. K. Tiwari',
    admissionDate: '2024-03-10', 
    feesPaid: 4500, 
    totalFees: 11500, 
    nextDueDate: '2024-08-10',
    attendance: 91,
    installments: [
      { id: 'inst-6', studentId: 's4', installmentNo: 1, amount: 4500, date: '2024-03-10', mode: 'UPI', transactionRef: 'UPI/120938120', receiptNo: 'REC-2024-032', notes: 'Admission Fee Paid' }
    ]
  },
  { 
    id: 's5', 
    regNo: 'ASI-6281-2024-005',
    name: 'Vikram Singh Thakur', 
    nameHindi: 'विक्रम सिंह ठाकुर',
    email: 'vikram.thakur@gmail.com', 
    role: 'student', 
    fatherName: 'Bhanu Pratap Singh',
    motherName: 'Sunita Thakur',
    dob: '2001-02-14',
    gender: 'Male',
    category: 'General',
    aadhaarNo: '5432 1098 7654',
    address: 'Katni Road, Pawai, Panna (M.P.)',
    pinCode: '488446',
    whatsappNo: '9893883172',
    courseId: 'c6',
    courseName: 'Full Stack Web Development',
    batchId: 'b4', 
    batchTiming: '05:30 PM - 07:00 PM',
    facultyName: 'Er. Akash Kushwaha',
    admissionDate: '2024-04-01', 
    feesPaid: 10000, 
    totalFees: 15000, 
    nextDueDate: '2024-08-15',
    attendance: 85,
    installments: [
      { id: 'inst-7', studentId: 's5', installmentNo: 1, amount: 5000, date: '2024-04-01', mode: 'UPI', transactionRef: 'UPI/091238129', receiptNo: 'REC-2024-051', notes: '1st Installment' },
      { id: 'inst-8', studentId: 's5', installmentNo: 2, amount: 5000, date: '2024-06-01', mode: 'Cash', receiptNo: 'REC-2024-098', notes: '2nd Installment' }
    ]
  }
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 't1', name: 'Er. R. K. Tiwari', email: 'rktiwari@sakshicomputer.com', role: 'teacher', designation: 'Senior Faculty & Computer Instructor', subjects: ['DCA Programming', 'Tally Prime', 'MS Office'], batches: ['b1', 'b3'], salary: 25000 },
  { id: 't2', name: 'Prof. S. N. Mishra', email: 'snmishra@sakshicomputer.com', role: 'teacher', designation: 'Assistant Professor (IT)', subjects: ['PGDCA Core', 'Database Systems', 'Operating Systems'], batches: ['b2'], salary: 28000 },
  { id: 't3', name: 'Er. Akash Kushwaha', email: 'akash@sakshicomputer.com', role: 'teacher', designation: 'Web Development Trainer', subjects: ['JavaScript', 'React', 'Node.js'], batches: ['b4'], salary: 22000 },
];

export const MOCK_STAFF_ATTENDANCE: StaffAttendanceRecord[] = [
  { id: 'sa1', staffId: 't1', staffName: 'Er. R. K. Tiwari', role: 'Faculty', date: new Date().toISOString().split('T')[0], status: 'present', checkIn: '07:50 AM', checkOut: '05:30 PM' },
  { id: 'sa2', staffId: 't2', staffName: 'Prof. S. N. Mishra', role: 'Faculty', date: new Date().toISOString().split('T')[0], status: 'present', checkIn: '09:45 AM', checkOut: '04:00 PM' },
  { id: 'sa3', staffId: 't3', staffName: 'Er. Akash Kushwaha', role: 'Faculty', date: new Date().toISOString().split('T')[0], status: 'present', checkIn: '11:00 AM', checkOut: '07:15 PM' },
  { id: 'sa4', staffId: 'aa2', staffName: 'Ramesh Patel', role: 'Operator / Accountant', date: new Date().toISOString().split('T')[0], status: 'present', checkIn: '08:00 AM', checkOut: '06:00 PM' },
];

export const MOCK_LEADS: AdmissionLead[] = [
  { id: 'l1', name: 'Suresh Raina', email: 'suresh@gmail.com', phone: '9876543210', courseId: 'c1', status: 'new', date: '2024-03-10' },
  { id: 'l2', name: 'Anjali Gupta', email: 'anjali@gmail.com', phone: '9876543211', courseId: 'c2', status: 'contacted', date: '2024-03-08' },
  { id: 'l3', name: 'Ishaan Kishan', email: 'ishaan@gmail.com', phone: '9876543212', courseId: 'c3', status: 'new', date: '2024-03-11' },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'exp-1', category: 'Rent & Building', amount: 8500, date: '2024-07-01', paidTo: 'Landlord - Pawai Branch', paymentMode: 'Bank Transfer', description: 'Monthly premises rent Pawai campus', voucherNo: 'VOUCH-701' },
  { id: 'exp-2', category: 'Electricity & Utilities', amount: 3200, date: '2024-07-05', paidTo: 'MPPKVVCL Electricity Dept', paymentMode: 'UPI', description: 'Lab electricity bill payment', voucherNo: 'VOUCH-702' },
  { id: 'exp-3', category: 'Faculty & Staff Salary', amount: 75000, date: '2024-07-07', paidTo: 'Faculty & Office Staff', paymentMode: 'Bank Transfer', description: 'Monthly faculty and operator salaries', voucherNo: 'VOUCH-703' },
  { id: 'exp-4', category: 'Marketing & Banners', amount: 4500, date: '2024-07-10', paidTo: 'Panna Printers', paymentMode: 'Cash', description: 'Admission season pamphlets and flex banners', voucherNo: 'VOUCH-704' },
  { id: 'exp-5', category: 'Internet & IT Software', amount: 2200, date: '2024-07-12', paidTo: 'Airtel Broadband', paymentMode: 'UPI', description: 'High-speed optical fiber monthly recharge', voucherNo: 'VOUCH-705' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tr1', type: 'income', amount: 4500, category: 'Student Fees', description: 'Rahul Sharma - DCA Admission Fee', date: '2024-01-15', paymentMode: 'Cash', receiptNo: 'REC-2024-001', studentId: 's1' },
  { id: 'tr2', type: 'income', amount: 5500, category: 'Student Fees', description: 'Priya Patel - PGDCA Admission Fee', date: '2024-02-01', paymentMode: 'UPI', receiptNo: 'REC-2024-012', studentId: 's2' },
  { id: 'tr3', type: 'income', amount: 2500, category: 'Student Fees', description: 'Amit Kumar - Tally 1st Installment', date: '2024-03-01', paymentMode: 'Cash', receiptNo: 'REC-2024-025', studentId: 's3' },
  { id: 'tr4', type: 'expense', amount: 8500, category: 'Rent & Building', description: 'Pawai Building Rent', date: '2024-07-01', paymentMode: 'Bank Transfer' },
  { id: 'tr5', type: 'expense', amount: 3200, category: 'Electricity & Utilities', description: 'Electricity Bill', date: '2024-07-05', paymentMode: 'UPI' },
  { id: 'tr6', type: 'income', amount: 3500, category: 'Student Fees', description: 'Rahul Sharma - DCA 1st Installment', date: '2024-04-10', paymentMode: 'UPI', receiptNo: 'REC-2024-045', studentId: 's1' },
  { id: 'tr7', type: 'income', amount: 5000, category: 'Student Fees', description: 'Vikram Singh - Web Dev 1st Installment', date: '2024-04-01', paymentMode: 'UPI', receiptNo: 'REC-2024-051', studentId: 's5' },
];

export const MOCK_UNIVERSITIES: University[] = [
  { id: 'u1', name: 'Makhanlal Chaturvedi National University of Journalism & Communication, Bhopal', address: 'Bhopal (M.P.)' },
  { id: 'u2', name: 'Rani Durgavati Vishwavidyalaya, Jabalpur', address: 'Jabalpur (M.P.)' },
  { id: 'u3', name: 'Maharaja Chhatrasal Bundelkhand University, Chhatarpur', address: 'Chhatarpur (M.P.)' },
];

export const MOCK_VIDEOS = [
  { 
    id: 'v1', 
    title: 'DCA Computer Fundamentals - Module 1', 
    course: 'DCA', 
    subject: 'Computer Fundamentals',
    description: 'Overview of computer architecture, memory units, and peripheral input/output devices.',
    duration: '25 min', 
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    tags: ['DCA', 'Fundamentals', 'Hardware']
  },
  { 
    id: 'v2', 
    title: 'Tally Prime GST Creation & Vouchers', 
    course: 'Tally', 
    subject: 'Tally & Accounting',
    description: 'Step-by-step practical guide to configuring GST rates, ledgers, and sales/purchase vouchers in Tally Prime.',
    duration: '40 min', 
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
    tags: ['Tally', 'GST', 'Accounting']
  },
];


