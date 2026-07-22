import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  XCircle,
  UserCheck,
  Printer,
  ChevronLeft,
  Info,
  CreditCard,
  GraduationCap,
  Download,
  Send,
  UserPlus
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
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
import { MOCK_LEADS, MOCK_COURSES, MOCK_STUDENTS, MOCK_BATCHES } from '@/src/lib/mockData';
import { AdmissionLead, Student } from '@/src/types';
import RegistrationForm from './RegistrationForm';
import StudentIdCardModal from './StudentIdCardModal';
import { cn } from '@/lib/utils';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Phone },
  converted: { label: 'Converted', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
};

export default function Admissions() {
  const [view, setView] = React.useState<'directory' | 'leads' | 'registration'>('directory');
  const [studentsList, setStudentsList] = React.useState<Student[]>(MOCK_STUDENTS);
  const [leads, setLeads] = React.useState<AdmissionLead[]>(MOCK_LEADS);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = React.useState<string>('all');
  const [isAddLeadOpen, setIsAddLeadOpen] = React.useState(false);
  const [idCardStudent, setIdCardStudent] = React.useState<Student | null>(null);

  // Filter students
  const filteredStudents = studentsList.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.regNo && student.regNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.aadhaarNo && student.aadhaarNo.includes(searchTerm)) ||
      (student.phone && student.phone.includes(searchTerm)) ||
      (student.whatsappNo && student.whatsappNo.includes(searchTerm));

    const matchesCourse = selectedCourseFilter === 'all' || student.courseId === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

  const filteredLeads = leads.filter(lead => {
    const course = MOCK_COURSES.find(c => c.id === lead.courseId);
    return (
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      course?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (view === 'registration') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80" onClick={() => setView('directory')}>
            <ChevronLeft className="w-4 h-4" /> Back to Student Directory
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /> Print Form
            </Button>
          </div>
        </div>
        <RegistrationForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & View Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Student Admissions & ID Cards</h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">Digital admission records, course allocation & instant ID card generation.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="gap-2 h-10 text-xs font-black uppercase shadow-lg shadow-primary/20"
            onClick={() => setView('registration')}
          >
            <UserPlus className="w-4 h-4" />
            Digital Admission Form
          </Button>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex gap-2">
          <Button 
            variant={view === 'directory' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setView('directory')}
            className="gap-2 font-bold text-xs"
          >
            <GraduationCap className="w-4 h-4" />
            Admitted Students ({studentsList.length})
          </Button>
          <Button 
            variant={view === 'leads' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setView('leads')}
            className="gap-2 font-bold text-xs"
          >
            <Clock className="w-4 h-4" />
            Admission Enquiries ({leads.length})
          </Button>
        </div>

        {/* Filter / Search Controls */}
        <div className="flex items-center gap-2">
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input 
              placeholder="Search Reg No, Name, Phone..." 
              className="pl-9 h-9 text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCourseFilter} onValueChange={setSelectedCourseFilter}>
            <SelectTrigger className="h-9 text-xs w-36">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {MOCK_COURSES.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Directory Content */}
      {view === 'directory' && (
        <Card className="shadow-sm">
          <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Registered Students</CardTitle>
              <CardDescription className="text-xs">Click "ID Card" to generate and print student pass instantly.</CardDescription>
            </div>
            <Badge variant="secondary" className="font-mono text-xs">
              {filteredStudents.length} Students Listed
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-black uppercase text-slate-500">Student & Reg No.</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Course & Batch</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Aadhaar & Contact</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Fee Status</TableHead>
                    <TableHead className="text-right text-xs font-black uppercase text-slate-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const balance = student.totalFees - student.feesPaid;
                    return (
                      <TableRow key={student.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                              <img 
                                src={student.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} 
                                alt={student.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-slate-900">{student.name}</p>
                              {student.fatherName && <p className="text-[11px] text-slate-500 font-medium">S/O {student.fatherName}</p>}
                              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono font-bold text-slate-600 mt-0.5">
                                {student.regNo || 'ASI-6281'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-bold text-xs text-slate-800">{student.courseName || 'D.C.A.'}</p>
                            <p className="text-[11px] text-slate-500">{student.batchTiming || 'Morning Batch'}</p>
                            <p className="text-[10px] text-amber-700 font-bold mt-0.5">Faculty: {student.facultyName || 'Er. R. K. Tiwari'}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-0.5 text-xs">
                            <p className="font-mono text-slate-600">Aadhaar: {student.aadhaarNo || 'Registered'}</p>
                            <p className="text-slate-500 flex items-center gap-1 text-[11px]">
                              <Phone className="w-3 h-3 text-green-600" />
                              {student.whatsappNo || student.phone || 'N/A'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className={balance <= 0 ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-900 hover:bg-amber-100"}>
                                ₹{student.feesPaid.toLocaleString('en-IN')} paid
                              </Badge>
                              {balance > 0 && (
                                <span className="text-xs font-bold text-red-600">Due: ₹{balance.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Total Course Fee: ₹{student.totalFees.toLocaleString('en-IN')}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 gap-1 text-xs font-bold border-amber-300 text-amber-900 hover:bg-amber-50"
                              onClick={() => setIdCardStudent(student)}
                            >
                              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                              Print ID Card
                            </Button>
                            {balance > 0 && (
                              <Button 
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 text-xs font-bold text-green-700 border-green-200 hover:bg-green-50"
                                onClick={() => {
                                  const text = encodeURIComponent(`Dear ${student.name}, your fee installment of ₹${balance} for course ${student.courseName || 'DCA'} is pending at Sakshi Computer Institute. Please pay at earliest.`);
                                  window.open(`https://wa.me/91${student.whatsappNo || '9926654640'}?text=${text}`, '_blank');
                                }}
                              >
                                <Send className="w-3.5 h-3.5 text-green-600" />
                                Reminder
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
      )}

      {/* Leads Content */}
      {view === 'leads' && (
        <Card>
          <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Admission Pipeline</CardTitle>
              <CardDescription className="text-xs">Prospective students and enquiry follow-ups.</CardDescription>
            </div>
            <Button size="sm" className="gap-2 text-xs font-bold" onClick={() => setIsAddLeadOpen(true)}>
              <Plus className="w-3.5 h-3.5" />
              Add Lead
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Interested Course</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enquiry Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const config = statusConfig[lead.status];
                  const StatusIcon = config.icon;
                  const course = MOCK_COURSES.find(c => c.id === lead.courseId);

                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium text-sm">{lead.name}</TableCell>
                      <TableCell className="text-xs font-bold text-slate-700">{course?.name}</TableCell>
                      <TableCell>
                        <div className="text-xs text-slate-600 font-mono">{lead.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("gap-1 font-medium text-xs", config.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">{lead.date}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs text-green-700 font-bold gap-1"
                          onClick={() => setView('registration')}
                        >
                          <UserCheck className="w-3.5 h-3.5" /> Convert Admission
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ID Card Modal */}
      <StudentIdCardModal 
        student={idCardStudent} 
        isOpen={!!idCardStudent} 
        onClose={() => setIdCardStudent(null)} 
      />

      {/* Add Lead Dialog */}
      <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Admission Enquiry / Lead</DialogTitle>
            <DialogDescription>Enter contact details for student enquiry follow-up.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase text-slate-600">Full Name</label>
              <Input placeholder="Enter student name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase text-slate-600">Mobile Number</label>
                <Input placeholder="+91 99266 54640" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase text-slate-600">WhatsApp No</label>
                <Input placeholder="+91 99266 54640" />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase text-slate-600">Interested Course</label>
              <Select>
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_COURSES.map(course => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLeadOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddLeadOpen(false)}>Save Lead Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

