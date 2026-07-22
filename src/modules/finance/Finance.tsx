import React from 'react';
import { 
  IndianRupee, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Download, 
  Filter, 
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Send,
  Printer,
  FileSpreadsheet,
  AlertCircle,
  Calendar,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_TRANSACTIONS, MOCK_STUDENTS, MOCK_COURSES, MOCK_EXPENSES } from '@/src/lib/mockData';
import { Student, StudentFeeInstallment, Expense } from '@/src/types';
import DigitalReceiptModal from './DigitalReceiptModal';
import { cn } from '@/lib/utils';

export default function Finance() {
  const [activeTab, setActiveTab] = React.useState('fees');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = React.useState(false);
  const [isRecordInstallmentOpen, setIsRecordInstallmentOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // State for Fee Management
  const [students, setStudents] = React.useState<Student[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [selectedReceipt, setSelectedReceipt] = React.useState<{ student: Student; installment: StudentFeeInstallment } | null>(null);

  // Installment Form State
  const [installmentAmount, setInstallmentAmount] = React.useState('');
  const [installmentMode, setInstallmentMode] = React.useState<'cash' | 'online' | 'bank_transfer'>('cash');
  const [installmentRemarks, setInstallmentRemarks] = React.useState('Course Installment');

  // Transactions State
  const [transactions, setTransactions] = React.useState(MOCK_TRANSACTIONS);

  // Financial Metrics
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  // Student Fee Metrics
  const totalExpectedFees = students.reduce((acc, s) => acc + s.totalFees, 0);
  const totalCollectedFees = students.reduce((acc, s) => acc + s.feesPaid, 0);
  const totalOutstandingFees = totalExpectedFees - totalCollectedFees;

  const handleRecordInstallment = () => {
    if (!selectedStudent || !installmentAmount) return;
    const amountNum = parseFloat(installmentAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const receiptNo = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newInstallment: StudentFeeInstallment = {
      id: `inst-${Date.now()}`,
      studentId: selectedStudent.id,
      amountPaid: amountNum,
      paymentDate: today,
      receiptNo,
      paymentMode: installmentMode,
      remarks: installmentRemarks,
      date: today
    };

    // Update student
    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        const newPaid = s.feesPaid + amountNum;
        const newHistory = [...(s.feeHistory || []), newInstallment];
        return {
          ...s,
          feesPaid: newPaid,
          feeHistory: newHistory
        };
      }
      return s;
    });

    setStudents(updatedStudents);

    // Also record in Cash Book Income
    const newTransaction = {
      id: `tx-${Date.now()}`,
      description: `Fee Receipt ${receiptNo} - ${selectedStudent.name}`,
      amount: amountNum,
      type: 'income' as const,
      category: 'Student Fees',
      date: today
    };
    setTransactions([newTransaction, ...transactions]);

    // Open Receipt
    const updatedStudentObj = updatedStudents.find(s => s.id === selectedStudent.id)!;
    setSelectedReceipt({ student: updatedStudentObj, installment: newInstallment });
    setIsRecordInstallmentOpen(false);
    setInstallmentAmount('');
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.regNo && s.regNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.courseName && s.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Fee & Accounting Management</h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">Real-time Daily Cash Book, Course Installment Records, Digital Receipts & Reminders.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="gap-2 h-10 text-xs font-black uppercase bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/20"
            onClick={() => {
              if (students.length > 0) setSelectedStudent(students[0]);
              setIsRecordInstallmentOpen(true);
            }}
          >
            <Receipt className="w-4 h-4" />
            Record Fee Payment
          </Button>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl mb-4">
          <TabsTrigger value="fees" className="text-xs font-bold gap-2">
            <Receipt className="w-3.5 h-3.5" />
            Student Fee & Installments
          </TabsTrigger>
          <TabsTrigger value="cashbook" className="text-xs font-bold gap-2">
            <Wallet className="w-3.5 h-3.5" />
            Daily Cash Book
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-xs font-bold gap-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            P&L & Financial Reports
          </TabsTrigger>
        </TabsList>

        {/* ================= TABS CONTENT 1: FEE MANAGEMENT ================= */}
        <TabsContent value="fees" className="space-y-6">
          {/* Fee Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-emerald-50/80 border-emerald-200">
              <CardContent className="pt-4 py-3 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Total Fee Collected</p>
                    <h3 className="text-2xl font-black text-emerald-950 mt-1">₹{totalCollectedFees.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="p-2.5 bg-emerald-200/80 rounded-xl">
                    <ArrowUpCircle className="w-6 h-6 text-emerald-800" />
                  </div>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mt-2">Received across all active courses</p>
              </CardContent>
            </Card>

            <Card className="bg-rose-50/80 border-rose-200">
              <CardContent className="pt-4 py-3 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-rose-800 tracking-wider">Total Dues Pending</p>
                    <h3 className="text-2xl font-black text-rose-950 mt-1">₹{totalOutstandingFees.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="p-2.5 bg-rose-200/80 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-rose-800" />
                  </div>
                </div>
                <p className="text-[11px] text-rose-700 font-semibold mt-2">Outstanding installments from students</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white">
              <CardContent className="pt-4 py-3 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-amber-400 tracking-wider">Course Fees Expected</p>
                    <h3 className="text-2xl font-black mt-1">₹{totalExpectedFees.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="p-2.5 bg-slate-800 rounded-xl">
                    <IndianRupee className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 font-semibold mt-2">DCA, PGDCA, Tally Prime & CCC Total</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Fee Structure Reference Box */}
          <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="py-3 px-6 border-b border-amber-100">
              <CardTitle className="text-sm font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Standard Course Fee Structure & Installment Slab
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {MOCK_COURSES.map(course => (
                  <div key={course.id} className="p-3 bg-white rounded-lg border border-amber-200 shadow-sm space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-slate-900">{course.code || course.name.split(' ')[0]}</span>
                      <Badge variant="outline" className="text-[9px] font-mono border-amber-300 text-amber-900">{course.duration}</Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{course.name}</p>
                    <p className="text-sm font-black text-emerald-700">₹{(course.fees || course.fee || 0).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Installment Ledger Table */}
          <Card>
            <CardHeader className="py-4 px-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold">Student Fee Ledger & Installments</CardTitle>
                <CardDescription className="text-xs">Record payment, print receipts or send WhatsApp reminders.</CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input 
                  placeholder="Search student or course..." 
                  className="pl-9 h-9 text-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-black uppercase text-slate-500">Student & Reg</TableHead>
                      <TableHead className="text-xs font-black uppercase text-slate-500">Course Allocated</TableHead>
                      <TableHead className="text-xs font-black uppercase text-slate-500">Total Fee</TableHead>
                      <TableHead className="text-xs font-black uppercase text-slate-500">Amount Paid</TableHead>
                      <TableHead className="text-xs font-black uppercase text-slate-500">Balance Due</TableHead>
                      <TableHead className="text-right text-xs font-black uppercase text-slate-500">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const balance = student.totalFees - student.feesPaid;
                      const lastInstallment = student.feeHistory && student.feeHistory.length > 0 
                        ? student.feeHistory[student.feeHistory.length - 1] 
                        : null;

                      return (
                        <TableRow key={student.id} className="hover:bg-slate-50/50">
                          <TableCell>
                            <div>
                              <p className="font-bold text-sm text-slate-900">{student.name}</p>
                              <p className="text-[10px] font-mono font-bold text-slate-500">{student.regNo || 'ASI-6281'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-xs text-amber-900">{student.courseName || 'D.C.A.'}</span>
                          </TableCell>
                          <TableCell className="font-mono text-xs font-bold text-slate-700">
                            ₹{student.totalFees.toLocaleString('en-IN')}
                          </TableCell>
                          <TableCell className="font-mono text-xs font-bold text-emerald-700">
                            ₹{student.feesPaid.toLocaleString('en-IN')}
                          </TableCell>
                          <TableCell>
                            {balance <= 0 ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px]">FULL PAID</Badge>
                            ) : (
                              <span className="font-mono text-xs font-black text-rose-600">
                                ₹{balance.toLocaleString('en-IN')}
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                className="h-8 text-xs font-bold gap-1 bg-green-700 hover:bg-green-800 text-white"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsRecordInstallmentOpen(true);
                                }}
                              >
                                <Plus className="w-3.5 h-3.5" />
                                Pay Fee
                              </Button>

                              {lastInstallment && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 text-xs font-bold gap-1 border-slate-300"
                                  onClick={() => {
                                    setSelectedReceipt({ student, installment: lastInstallment });
                                  }}
                                >
                                  <Receipt className="w-3.5 h-3.5 text-amber-600" />
                                  Receipt
                                </Button>
                              )}

                              {balance > 0 && (
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs font-bold text-green-700 border-green-200 hover:bg-green-50"
                                  onClick={() => {
                                    const text = encodeURIComponent(`Dear ${student.name}, reminder from Sakshi Computer Institute: your fee installment of ₹${balance} for course ${student.courseName || 'DCA'} is due. Please clear at institute counter.`);
                                    window.open(`https://wa.me/91${student.whatsappNo || student.phone || '9926654640'}?text=${text}`, '_blank');
                                  }}
                                >
                                  <Send className="w-3.5 h-3.5 text-green-600" />
                                  WhatsApp
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= TABS CONTENT 2: CASH BOOK ================= */}
        <TabsContent value="cashbook" className="space-y-6">
          {/* Daily Cash Book Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-emerald-50/80 border-emerald-200">
              <CardContent className="pt-4 py-3 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Total Income (Inflow)</p>
                    <h3 className="text-2xl font-black text-emerald-950 mt-1">₹{totalIncome.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="p-2 bg-emerald-200 rounded-xl">
                    <ArrowUpCircle className="w-6 h-6 text-emerald-800" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-rose-50/80 border-rose-200">
              <CardContent className="pt-4 py-3 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-rose-800 tracking-wider">Total Expenses (Outflow)</p>
                    <h3 className="text-2xl font-black text-rose-950 mt-1">₹{totalExpense.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="p-2 bg-rose-200 rounded-xl">
                    <ArrowDownCircle className="w-6 h-6 text-rose-800" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-4 py-3 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase opacity-80 tracking-wider">Net Cash Balance</p>
                    <h3 className="text-2xl font-black mt-1">₹{netProfit.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Real-time Daily Cash Book Ledger</h3>
            <Button size="sm" className="gap-2 text-xs font-bold" onClick={() => setIsAddTransactionOpen(true)}>
              <Plus className="w-4 h-4" />
              Add Cash Transaction
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-black uppercase text-slate-500">Date</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Description</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Category Head</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Type</TableHead>
                    <TableHead className="text-right text-xs font-black uppercase text-slate-500">Amount (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-xs font-mono text-slate-600">{tx.date}</TableCell>
                      <TableCell className="font-bold text-sm text-slate-900">{tx.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-medium">{tx.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={tx.type === 'income' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : 'bg-rose-100 text-rose-800 hover:bg-rose-100'}>
                          {tx.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn("text-right font-mono font-black text-sm", tx.type === 'income' ? 'text-emerald-700' : 'text-rose-700')}>
                        {tx.type === 'income' ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= TABS CONTENT 3: FINANCIAL REPORTS ================= */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Month-End Profit & Loss Statement</CardTitle>
                <CardDescription className="text-xs">Consolidated financial statement for Sakshi Computer Institute.</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-2 text-xs font-bold" onClick={() => window.print()}>
                <Printer className="w-3.5 h-3.5" />
                Print P&L Report
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Revenue Heads */}
                <div className="space-y-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
                  <h4 className="font-extrabold text-sm text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                    <ArrowUpCircle className="w-4 h-4 text-emerald-600" /> Gross Revenue Inflow
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span>DCA / PGDCA Student Fees Collections</span>
                      <span className="font-mono font-bold">₹{totalCollectedFees.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span>Short Term Courses (CCC / Tally)</span>
                      <span className="font-mono font-bold">₹18,500</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span>Registration & Examination Forms Fee</span>
                      <span className="font-mono font-bold">₹12,400</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-black text-emerald-950 border-t-2 border-emerald-300">
                    <span>Total Income Revenue:</span>
                    <span>₹{(totalCollectedFees + 30900).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Operating Expenses */}
                <div className="space-y-3 bg-rose-50/50 p-4 rounded-xl border border-rose-200">
                  <h4 className="font-extrabold text-sm text-rose-900 uppercase tracking-wider flex items-center gap-2">
                    <ArrowDownCircle className="w-4 h-4 text-rose-600" /> Operating Overhead Expenses
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between py-1 border-b border-rose-100">
                      <span>Faculty & Lab Assistant Salaries</span>
                      <span className="font-mono font-bold">₹38,000</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-100">
                      <span>Pawai & Mohindra Center Rent</span>
                      <span className="font-mono font-bold">₹15,000</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-100">
                      <span>Electricity & Broadband Fiber Bills</span>
                      <span className="font-mono font-bold">₹6,200</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-100">
                      <span>Computer Maintenance & Software Licenses</span>
                      <span className="font-mono font-bold">₹4,500</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-black text-rose-950 border-t-2 border-rose-300">
                    <span>Total Operating Expense:</span>
                    <span>₹63,700</span>
                  </div>
                </div>
              </div>

              {/* Net Institute Profit Summary Box */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-xs uppercase font-extrabold text-amber-400">Net Operational Profit</p>
                  <p className="text-2xl font-black text-white">₹{((totalCollectedFees + 30900) - 63700).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <p>Certified by: Director Santosh Kushwaha</p>
                  <p className="text-[10px] text-slate-400">Sakshi Computer Institute Accounting System</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Digital Fee Receipt Modal */}
      <DigitalReceiptModal 
        receipt={selectedReceipt} 
        isOpen={!!selectedReceipt} 
        onClose={() => setSelectedReceipt(null)} 
      />

      {/* Record Fee Installment Dialog */}
      <Dialog open={isRecordInstallmentOpen} onOpenChange={setIsRecordInstallmentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Fee Installment Payment</DialogTitle>
            <DialogDescription>Collect student course fee and auto-generate official digital receipt.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 text-xs">
            <div className="grid gap-1.5">
              <label className="font-bold uppercase text-slate-600">Select Student</label>
              <Select 
                value={selectedStudent?.id || ''} 
                onValueChange={(id) => {
                  const s = students.find(st => st.id === id);
                  if (s) setSelectedStudent(s);
                }}
              >
                <SelectTrigger className="h-10 text-xs font-bold">
                  <SelectValue placeholder="Choose student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({s.courseName || 'DCA'}) - Due: ₹{(s.totalFees - s.feesPaid).toLocaleString('en-IN')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStudent && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-slate-800 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Course Total Fee:</span>
                  <span>₹{selectedStudent.totalFees.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Already Paid:</span>
                  <span>₹{selectedStudent.feesPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-rose-700 font-black border-t pt-1">
                  <span>Current Remaining Due:</span>
                  <span>₹{(selectedStudent.totalFees - selectedStudent.feesPaid).toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            <div className="grid gap-1.5">
              <label className="font-bold uppercase text-slate-600">Installment Amount (₹)</label>
              <Input 
                type="number" 
                placeholder="e.g. 3500" 
                className="h-10 font-bold text-base"
                value={installmentAmount}
                onChange={(e) => setInstallmentAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label className="font-bold uppercase text-slate-600">Payment Mode</label>
                <Select value={installmentMode} onValueChange={(v: any) => setInstallmentMode(v)}>
                  <SelectTrigger className="h-10 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash Counter</SelectItem>
                    <SelectItem value="online">UPI / QR Scan</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <label className="font-bold uppercase text-slate-600">Remarks</label>
                <Input 
                  value={installmentRemarks}
                  onChange={(e) => setInstallmentRemarks(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRecordInstallmentOpen(false)}>Cancel</Button>
            <Button className="bg-green-700 hover:bg-green-800 text-white font-bold" onClick={handleRecordInstallment}>
              Save & Print Digital Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Cash Transaction Dialog */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Daily Cash Book Entry</DialogTitle>
            <DialogDescription>Record a cash inflow or expense outflow.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label className="font-bold text-slate-700">Type</label>
                <Select defaultValue="expense">
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income (Inflow)</SelectItem>
                    <SelectItem value="expense">Expense (Outflow)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="font-bold text-slate-700">Amount (₹)</label>
                <Input type="number" placeholder="500" className="h-9 text-xs" />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label className="font-bold text-slate-700">Category Head</label>
              <Select defaultValue="bills">
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fees">Student Fees</SelectItem>
                  <SelectItem value="salary">Staff Salary</SelectItem>
                  <SelectItem value="rent">Center Rent</SelectItem>
                  <SelectItem value="bills">Electricity / Internet</SelectItem>
                  <SelectItem value="hardware">Computer Repair / Maintenance</SelectItem>
                  <SelectItem value="stationary">Stationary & Printing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <label className="font-bold text-slate-700">Description</label>
              <Input placeholder="Details..." className="h-9 text-xs" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddTransactionOpen(false)}>Save Ledger Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

