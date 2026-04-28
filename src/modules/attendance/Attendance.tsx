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
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { MOCK_BATCHES, MOCK_STUDENTS } from '@/src/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Attendance() {
  const [selectedBatch, setSelectedBatch] = React.useState('b1');
  const [attendanceData, setAttendanceData] = React.useState<Record<string, 'present' | 'absent' | 'late' | null>>({});
  const batchStudents = MOCK_STUDENTS.filter(s => s.batchId === selectedBatch);

  const handleAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status
    }));
  };

  const handleSave = () => {
    const total = batchStudents.length;
    const marked = Object.keys(attendanceData).length;
    if (marked < total) {
      alert(`Please mark attendance for all students. (${marked}/${total} marked)`);
      return;
    }
    alert('Attendance saved successfully for ' + new Date().toLocaleDateString());
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Mark Attendance</CardTitle>
            <CardDescription className="text-xs">Choose a method to record attendance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5 flex flex-col items-center text-center">
              <QrCode className="w-12 h-12 text-primary mb-3" />
              <h3 className="font-bold text-base">QR Attendance</h3>
              <p className="text-xs text-muted-foreground mb-3">Generate a unique QR code for students to scan via their mobile app.</p>
              <Button className="w-full gap-2 h-10 text-xs font-bold uppercase" onClick={() => alert('Feature coming soon in mobile app')}>
                Generate QR Code
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span className="bg-background px-2 text-muted-foreground">Or Manual Entry</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Select Batch</label>
                <Select value={selectedBatch} onValueChange={(val) => {
                  setSelectedBatch(val);
                  setAttendanceData({});
                }}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_BATCHES.map(batch => (
                      <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full gap-2 h-10 text-xs font-black uppercase shadow-lg shadow-primary/20"
                onClick={handleSave}
              >
                <UserCheck className="w-4 h-4" />
                Save Attendance Session
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="py-4 px-6 md:px-8 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Daily Attendance Log</CardTitle>
                <CardDescription className="text-xs">{MOCK_BATCHES.find(b => b.id === selectedBatch)?.name} • Total: {batchStudents.length} Students</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search student..." className="pl-10 h-10 text-sm" />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>

            <div className="border-t">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="text-xs font-black uppercase tracking-widest px-6 h-10">Student Enrollment</TableHead>
                    <TableHead className="text-xs font-black uppercase tracking-widest px-6 h-10">Avg. Stat</TableHead>
                    <TableHead className="text-right text-xs font-black uppercase tracking-widest px-6 h-10">Daily Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-slate-800">{student.name}</span>
                          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">#{student.id.toUpperCase()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                            <div 
                              className={cn(
                                "h-full transition-all duration-500",
                                student.attendance > 85 ? "bg-green-500" : student.attendance > 70 ? "bg-primary" : "bg-red-500"
                              )}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-600">{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button 
                            variant={attendanceData[student.id] === 'present' ? 'default' : 'outline'} 
                            size="icon" 
                            className={cn(
                              "h-9 w-9 transition-all",
                              attendanceData[student.id] === 'present' 
                                ? "bg-green-600 hover:bg-green-700 shadow-md shadow-green-200" 
                                : "text-green-600 border-green-200 hover:bg-green-50"
                            )}
                            onClick={() => handleAttendance(student.id, 'present')}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant={attendanceData[student.id] === 'absent' ? 'default' : 'outline'} 
                            size="icon" 
                            className={cn(
                              "h-9 w-9 transition-all",
                              attendanceData[student.id] === 'absent' 
                                ? "bg-red-600 hover:bg-red-700 shadow-md shadow-red-200" 
                                : "text-red-600 border-red-200 hover:bg-red-50"
                            )}
                            onClick={() => handleAttendance(student.id, 'absent')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant={attendanceData[student.id] === 'late' ? 'default' : 'outline'} 
                            size="icon" 
                            className={cn(
                              "h-9 w-9 transition-all",
                              attendanceData[student.id] === 'late' 
                                ? "bg-yellow-500 hover:bg-yellow-600 shadow-md shadow-yellow-200 text-white" 
                                : "text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                            )}
                            onClick={() => handleAttendance(student.id, 'late')}
                          >
                            <Clock className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
