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
  ChevronLeft
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
import { MOCK_LEADS, MOCK_COURSES } from '@/src/lib/mockData';
import { AdmissionLead } from '@/src/types';
import RegistrationForm from './RegistrationForm';
import { cn } from '@/lib/utils';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Phone },
  converted: { label: 'Converted', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
};

export default function Admissions() {
  const [view, setView] = React.useState<'leads' | 'registration'>('leads');
  const [leads, setLeads] = React.useState<AdmissionLead[]>(MOCK_LEADS);
  const [searchTerm, setSearchTerm] = React.useState('');

  if (view === 'registration') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80" onClick={() => setView('leads')}>
            <ChevronLeft className="w-4 h-4" /> Back to Leads
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

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads by name, email or phone..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
            <Button className="gap-2" onClick={() => setView('registration')}>
              <Plus className="w-4 h-4" />
              New Registration
            </Button>
            <Dialog>
            <DialogTrigger
              render={
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Lead
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admission Lead</DialogTitle>
                <DialogDescription>Enter the details of the prospective student.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Interested Course</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
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
                <Button variant="outline">Cancel</Button>
                <Button>Save Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Manage and track your admission pipeline.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const config = statusConfig[lead.status];
                const StatusIcon = config.icon;
                const course = MOCK_COURSES.find(c => c.id === lead.courseId);

                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{course?.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("gap-1 font-medium", config.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{lead.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Phone className="w-4 h-4" /> Call Lead
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="w-4 h-4" /> Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-green-600">
                            <UserCheck className="w-4 h-4" /> Convert to Admission
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <XCircle className="w-4 h-4" /> Close Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
