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
  const batchStudents = MOCK_STUDENTS.filter(s => s.batchId === selectedBatch);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>Choose a method to record attendance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5 flex flex-col items-center text-center">
              <QrCode className="w-16 h-16 text-primary mb-4" />
              <h3 className="font-bold text-lg">QR Attendance</h3>
              <p className="text-sm text-muted-foreground mb-4">Generate a unique QR code for students to scan via their mobile app.</p>
              <Button className="w-full gap-2">
                Generate QR Code
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or Manual Entry</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Batch</label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_BATCHES.map(batch => (
                    <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full gap-2">
                <UserCheck className="w-4 h-4" />
                Manual Attendance
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Attendance Report</CardTitle>
                <CardDescription>Daily attendance log for {MOCK_BATCHES.find(b => b.id === selectedBatch)?.name}</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search student..." className="pl-10" />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-lg text-sm font-medium">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Avg. Attendance</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>#{student.id.toUpperCase()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-[100px]">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{student.attendance}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-green-600 border-green-200 hover:bg-green-50">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50">
                          <X className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-yellow-600 border-yellow-200 hover:bg-yellow-50">
                          <Clock className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
