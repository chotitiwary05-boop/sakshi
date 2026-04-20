import React from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_COURSES, MOCK_BATCHES, MOCK_TEACHERS } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

export default function Courses() {
  const [activeTab, setActiveTab] = React.useState('courses');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="batches" className="gap-2">
              <Users className="w-4 h-4" />
              Batches
            </TabsTrigger>
          </TabsList>
          
          <Dialog>
            <DialogTrigger
              render={
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add {activeTab === 'courses' ? 'Course' : 'Batch'}
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New {activeTab === 'courses' ? 'Course' : 'Batch'}</DialogTitle>
                <DialogDescription>
                  {activeTab === 'courses' 
                    ? 'Create a new course offering for your institute.' 
                    : 'Create a new batch for an existing course.'}
                </DialogDescription>
              </DialogHeader>
              
              {activeTab === 'courses' ? (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Course Name</label>
                    <Input placeholder="e.g. Mathematics (Class 12)" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Brief description of the course" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Input placeholder="e.g. 1 Year" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Fees (₹)</label>
                      <Input type="number" placeholder="25000" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Batch Name</label>
                    <Input placeholder="e.g. NEET-2025-A1" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Select Course</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose course" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_COURSES.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Assign Teacher</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_TEACHERS.map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Schedule</label>
                    <Input placeholder="e.g. Mon-Fri, 4:00 PM - 6:00 PM" />
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create {activeTab === 'courses' ? 'Course' : 'Batch'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="courses" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COURSES.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">{course.duration}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {MOCK_BATCHES.filter(b => b.courseId === course.id).length} Batches
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">₹{course.fees.toLocaleString()}</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View Details <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="batches" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_BATCHES.map((batch) => {
              const course = MOCK_COURSES.find(c => c.id === batch.courseId);
              const teacher = MOCK_TEACHERS.find(t => t.id === batch.teacherId);
              
              return (
                <Card key={batch.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {course?.name}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardTitle className="mt-2">{batch.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {batch.studentCount} Students Enrolled
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                        {teacher?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{teacher?.name}</p>
                        <p className="text-xs text-muted-foreground">Instructor</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {batch.schedule}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full gap-2">
                      <Users className="w-4 h-4" />
                      Manage Students
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
