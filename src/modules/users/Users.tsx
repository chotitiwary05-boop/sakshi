import React from 'react';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  GraduationCap, 
  School,
  ShieldCheck,
  IndianRupee,
  CreditCard,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { MOCK_STUDENTS, MOCK_TEACHERS } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

export default function Users() {
  const [isCollectFeeOpen, setIsCollectFeeOpen] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = MOCK_TEACHERS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="students" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="students" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className="gap-2">
              <School className="w-4 h-4" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="staff" className="gap-2">
              <ShieldCheck className="w-4 h-4" />
              Staff
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        <TabsContent value="students" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Student</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Admission Date</TableHead>
                    <TableHead>Fees Status</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{student.batchId}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{student.admissionDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-medium">
                              <span>₹{student.feesPaid.toLocaleString()}</span>
                              <span>₹{student.totalFees.toLocaleString()}</span>
                            </div>
                            <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${(student.feesPaid / student.totalFees) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Dialog open={isCollectFeeOpen === student.id} onOpenChange={(open) => setIsCollectFeeOpen(open ? student.id : null)}>
                              <DialogTrigger render={<Button variant="outline" size="sm" className="gap-2 h-8" />}>
                                  <IndianRupee className="w-3.5 h-3.5" />
                                  Collect
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Collect Fee - {student.name}</DialogTitle>
                                  <DialogDescription>
                                    Record a fee payment for this student.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Fees</p>
                                      <p className="text-sm font-bold">₹{student.totalFees.toLocaleString()}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Remaining</p>
                                      <p className="text-sm font-bold text-red-600">₹{(student.totalFees - student.feesPaid).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <label className="text-sm font-medium">Amount to Collect (₹)</label>
                                    <Input type="number" placeholder="Enter amount" />
                                  </div>
                                  <div className="grid gap-2">
                                    <label className="text-sm font-medium">Payment Method</label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select method" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="cash">
                                          <div className="flex items-center gap-2">
                                            <Wallet className="w-4 h-4" /> Cash
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="upi">
                                          <div className="flex items-center gap-2">
                                            <IndianRupee className="w-4 h-4" /> UPI / QR
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="card">
                                          <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" /> Card
                                          </div>
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid gap-2">
                                    <label className="text-sm font-medium">Receipt Number (Optional)</label>
                                    <Input placeholder="e.g. REC-12345" />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsCollectFeeOpen(null)}>Cancel</Button>
                                  <Button onClick={() => setIsCollectFeeOpen(null)}>Confirm Payment</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No students found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <Card key={teacher.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.name}`} />
                      <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                      <CardDescription>{teacher.email}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map(subject => (
                        <Badge key={subject} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <School className="w-4 h-4" />
                        {teacher.batches.length} Batches
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UsersIcon className="w-4 h-4" />
                        85 Students
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Mail className="w-4 h-4" /> Message
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Phone className="w-4 h-4" /> Call
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full h-48 flex items-center justify-center text-muted-foreground border rounded-xl bg-muted/20">
                No teachers found matching your search.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
