import React from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  BarChart2,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { MOCK_BATCHES } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

const tests = [
  { id: 't1', title: 'Calculus Unit Test', batch: 'Math-A1', date: '2024-03-12', totalMarks: 50, status: 'upcoming', type: 'MCQ' },
  { id: 't2', title: 'Physics Full Mock', batch: 'NEET-P1', date: '2024-03-05', totalMarks: 180, status: 'completed', type: 'Mixed' },
  { id: 't3', title: 'Organic Chemistry Quiz', batch: 'JEE-C2', date: '2024-03-01', totalMarks: 30, status: 'evaluated', type: 'MCQ' },
];

export default function Exams() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search exams..." className="pl-10" />
        </div>
        <Dialog>
          <DialogTrigger render={<Button className="gap-2" />}>
            <Plus className="w-4 h-4" />
            Create Test
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Examination</DialogTitle>
              <DialogDescription>Setup a new test or exam for your students.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Test Title</label>
                <Input placeholder="e.g. Monthly Assessment - Physics" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Select Batch</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_BATCHES.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Test Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">MCQ (Auto-graded)</SelectItem>
                      <SelectItem value="subjective">Subjective</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Total Marks</label>
                  <Input type="number" placeholder="100" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Instructions</label>
                <Input placeholder="Any specific instructions for students..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create & Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent & Upcoming Tests</CardTitle>
            <CardDescription>Manage your examination schedule and results.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Title</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{test.title}</p>
                        <p className="text-xs text-muted-foreground">{test.type} • {test.totalMarks} Marks</p>
                      </div>
                    </TableCell>
                    <TableCell>{test.batch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {test.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "gap-1",
                          test.status === 'upcoming' ? "bg-blue-50 text-blue-700 border-blue-200" :
                          test.status === 'completed' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          "bg-green-50 text-green-700 border-green-200"
                        )}
                      >
                        {test.status === 'upcoming' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1">
                        {test.status === 'evaluated' ? 'View Results' : 'Manage'}
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start gap-3 h-12">
                <FileText className="w-5 h-5 text-primary" />
                Question Bank
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-12">
                <BarChart2 className="w-5 h-5 text-primary" />
                Performance Reports
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-12">
                <Users className="w-5 h-5 text-primary" />
                Rank Generation
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Auto-Evaluation</CardTitle>
              <CardDescription className="text-primary-foreground/70">
                MCQ tests are automatically evaluated upon submission.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-xs text-primary-foreground/70 text-right">
                  Accuracy in <br /> Auto-grading
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
