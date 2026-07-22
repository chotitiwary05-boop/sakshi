import React from 'react';
import { 
  QrCode, 
  UserCheck, 
  Calendar, 
  Search, 
  Filter, 
  Download,
  Check,
  X,
  Clock,
  Users,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { MOCK_BATCHES, MOCK_STUDENTS, MOCK_STAFF_ATTENDANCE } from '@/src/lib/mockData';
import { StaffAttendanceRecord } from '@/src/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Attendance() {
  const [activeTab, setActiveTab] = React.useState<'student' | 'staff'>('student');
  const [selectedBatch, setSelectedBatch] = React.useState('b1');
  const [studentAttendance, setStudentAttendance] = React.useState<Record<string, 'present' | 'absent' | 'late' | null>>({});
  const [staffAttendance, setStaffAttendance] = React.useState<StaffAttendanceRecord[]>(MOCK_STAFF_ATTENDANCE);
  const [searchTerm, setSearchTerm] = React.useState('');

  const batchStudents = MOCK_STUDENTS.filter(s => {
    const matchesBatch = s.batchId === selectedBatch;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  const handleStudentAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status
    }));
  };

  const handleMarkAllStudentsPresent = () => {
    const newRecord: Record<string, 'present'> = {};
    batchStudents.forEach(s => {
      newRecord[s.id] = 'present';
    });
    setStudentAttendance(prev => ({ ...prev, ...newRecord }));
  };

  const handleStaffAttendanceChange = (staffId: string, status: 'present' | 'absent' | 'half_day' | 'leave') => {
    setStaffAttendance(prev => prev.map(item => {
      if (item.id === staffId || item.staffId === staffId) {
        return { ...item, status };
      }
      return item;
    }));
  };

  const handleSaveStudentAttendance = () => {
    const markedCount = Object.keys(studentAttendance).length;
    alert(`Student attendance saved successfully! (${markedCount}/${batchStudents.length} records processed for ${new Date().toLocaleDateString()})`);
  };

  const handleSaveStaffAttendance = () => {
    alert(`Staff & Faculty attendance register updated successfully for ${new Date().toLocaleDateString()}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Attendance Management</h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">Record daily attendance for Students (80% mandatory for exams) and Faculty Staff.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-amber-50 border-amber-300 text-amber-900 text-xs font-mono font-bold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Today: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </Badge>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl mb-4">
          <TabsTrigger value="student" className="text-xs font-bold gap-2">
            <Users className="w-3.5 h-3.5" />
            Student Attendance Register
          </TabsTrigger>
          <TabsTrigger value="staff" className="text-xs font-bold gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            Faculty & Staff Attendance
          </TabsTrigger>
        </TabsList>

        {/* STUDENT ATTENDANCE TAB */}
        <TabsContent value="student" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 border-slate-200">
              <CardHeader className="py-4 border-b">
                <CardTitle className="text-base font-bold">Session & Batch Control</CardTitle>
                <CardDescription className="text-xs">Select batch and mark attendance.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">Select Batch</label>
                  <Select value={selectedBatch} onValueChange={(val) => {
                    setSelectedBatch(val);
                    setStudentAttendance({});
                  }}>
                    <SelectTrigger className="h-10 text-xs font-bold">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_BATCHES.map(batch => (
                        <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs font-bold border-green-300 text-green-800 hover:bg-green-50"
                    onClick={handleMarkAllStudentsPresent}
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 mr-1" />
                    Mark All Present
                  </Button>
                </div>

                <Button 
                  className="w-full gap-2 h-10 text-xs font-black uppercase shadow-lg shadow-primary/20"
                  onClick={handleSaveStudentAttendance}
                >
                  <FileCheck className="w-4 h-4" />
                  Save Student Attendance
                </Button>

                {/* 80% Notice Box */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
                  <p className="font-extrabold text-amber-900 flex items-center gap-1.5 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Rule Notice: 80% Mandatory
                  </p>
                  <p className="text-[10px] text-amber-800 leading-snug">
                     विद्यार्थियों की उपस्थिति 80% से कम होने पर MCU परीक्षा फॉर्म स्वीकृत नहीं किया जावेगा।
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Batch Attendance Roll Call</CardTitle>
                  <CardDescription className="text-xs">
                    {MOCK_BATCHES.find(b => b.id === selectedBatch)?.name} • {batchStudents.length} Students Listed
                  </CardDescription>
                </div>
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input 
                    placeholder="Filter student..." 
                    className="pl-9 h-8 text-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-xs font-black uppercase text-slate-500">Student</TableHead>
                      <TableHead className="text-xs font-black uppercase text-slate-500">Overall %</TableHead>
                      <TableHead className="text-right text-xs font-black uppercase text-slate-500">Today Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batchStudents.map((student) => {
                      const currentStatus = studentAttendance[student.id];
                      return (
                        <TableRow key={student.id} className="hover:bg-slate-50/50">
                          <TableCell>
                            <div>
                              <p className="font-bold text-sm text-slate-900">{student.name}</p>
                              <p className="text-[10px] font-mono text-slate-500">{student.regNo || student.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={cn("font-bold text-xs", student.attendance < 80 ? "text-red-600" : "text-emerald-700")}>
                                {student.attendance}%
                              </span>
                              {student.attendance < 80 && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-[9px] px-1 py-0">Low</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1.5">
                              <Button 
                                size="sm" 
                                variant={currentStatus === 'present' ? 'default' : 'outline'}
                                className={cn(
                                  "h-8 px-3 text-xs font-bold gap-1",
                                  currentStatus === 'present' ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                )}
                                onClick={() => handleStudentAttendance(student.id, 'present')}
                              >
                                <Check className="w-3.5 h-3.5" /> Present
                              </Button>
                              <Button 
                                size="sm" 
                                variant={currentStatus === 'absent' ? 'default' : 'outline'}
                                className={cn(
                                  "h-8 px-3 text-xs font-bold gap-1",
                                  currentStatus === 'absent' ? "bg-rose-600 hover:bg-rose-700 text-white" : "border-rose-200 text-rose-700 hover:bg-rose-50"
                                )}
                                onClick={() => handleStudentAttendance(student.id, 'absent')}
                              >
                                <X className="w-3.5 h-3.5" /> Absent
                              </Button>
                              <Button 
                                size="sm" 
                                variant={currentStatus === 'late' ? 'default' : 'outline'}
                                className={cn(
                                  "h-8 px-2.5 text-xs font-bold gap-1",
                                  currentStatus === 'late' ? "bg-amber-500 hover:bg-amber-600 text-slate-950" : "border-amber-200 text-amber-800 hover:bg-amber-50"
                                )}
                                onClick={() => handleStudentAttendance(student.id, 'late')}
                              >
                                <Clock className="w-3.5 h-3.5" /> Late
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* STAFF ATTENDANCE TAB */}
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Faculty & Staff Attendance Register</CardTitle>
                <CardDescription className="text-xs">Record daily check-in times and shift attendance for instructors.</CardDescription>
              </div>
              <Button size="sm" className="gap-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-slate-950" onClick={handleSaveStaffAttendance}>
                <FileCheck className="w-3.5 h-3.5" />
                Save Staff Register
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-black uppercase text-slate-500">Faculty / Staff Name</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Designation & Center</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500">Check In / Out</TableHead>
                    <TableHead className="text-right text-xs font-black uppercase text-slate-500">Attendance Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffAttendance.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <p className="font-bold text-sm text-slate-900">{staff.staffName}</p>
                        <p className="text-[10px] text-slate-500 font-mono">ID: {staff.staffId}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-xs text-amber-900">{staff.designation}</p>
                        <p className="text-[10px] text-slate-500">{staff.centerLocation}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                          <span className="p-1 bg-slate-100 rounded border">In: {staff.checkIn || '08:30 AM'}</span>
                          <span className="p-1 bg-slate-100 rounded border">Out: {staff.checkOut || '05:00 PM'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          {(['present', 'absent', 'half_day', 'leave'] as const).map(st => (
                            <Button 
                              key={st}
                              size="sm" 
                              variant={staff.status === st ? 'default' : 'outline'}
                              className={cn(
                                "h-8 px-2.5 text-xs font-bold capitalize",
                                staff.status === st 
                                  ? (st === 'present' ? 'bg-emerald-700' : st === 'absent' ? 'bg-rose-700' : 'bg-amber-600')
                                  : 'text-slate-600'
                              )}
                              onClick={() => handleStaffAttendanceChange(staff.id, st)}
                            >
                              {st.replace('_', ' ')}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

