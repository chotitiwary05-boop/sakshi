import React from 'react';
import { 
  Building2, 
  Palette, 
  Bell, 
  ShieldCheck, 
  Database, 
  Globe,
  Save,
  Mail,
  Phone,
  MapPin,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Settings</h2>
          <p className="text-muted-foreground">Manage your institute profile and application preferences.</p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="institute" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 bg-muted">
          <TabsTrigger value="institute" className="py-2 gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Institute</span>
          </TabsTrigger>
          <TabsTrigger value="academic" className="py-2 gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Academic</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="py-2 gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-2 gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="py-2 gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Institute Profile */}
        <TabsContent value="institute">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Institute Profile</CardTitle>
                <CardDescription>Update your institute details shown on receipts and reports.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Institute Name</label>
                    <Input defaultValue="Sakshi Computer Center" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Short Name / Code</label>
                    <Input defaultValue="SCC-MOHANDRA" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Official Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input defaultValue="contact@sakshicomputer.com" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input defaultValue="+91 9926654640" className="pl-10" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue="Near Jain Mandir, Main Road Mohindra, Panna (M.P.)" className="pl-10" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Setup */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Configuration</CardTitle>
              <CardDescription>Setup academic years and session preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Academic Year</label>
                <Select defaultValue="2024-25">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-24">2023 - 2024</SelectItem>
                    <SelectItem value="2024-25">2024 - 2025</SelectItem>
                    <SelectItem value="2025-26">2025 - 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Auto-Rollout Grades</p>
                    <p className="text-xs text-muted-foreground">Automatically update student status after exam finalization.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Attendance Threshold</p>
                    <p className="text-xs text-muted-foreground">Alert when student attendance falls below 75%.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>Control how you communicate with students and parents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WhatsApp Notifications</p>
                      <p className="text-xs text-muted-foreground">Send automated fee alerts and holiday notices.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email Daily Reports</p>
                      <p className="text-xs text-muted-foreground">Send daily cash flow summary to admin email.</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Bell className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">App notifications for teachers and students.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="text-sm font-medium mb-4">Event-specific SMS/WhatsApp</h4>
                <div className="space-y-3">
                   {['Admission Confirmation', 'Fees Collection', 'Exam Result', 'Student Absence'].map((event) => (
                     <div key={event} className="flex items-center justify-between text-sm py-1">
                        <span>{event}</span>
                        <Switch defaultChecked={['Admission Confirmation', 'Fees Collection'].includes(event)} />
                     </div>
                   ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Backup */}
        <TabsContent value="security">
          <div className="grid gap-6">
             <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Secure your data and manage backups.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                   <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Last Cloud Backup</p>
                        <p className="text-xs text-muted-foreground">Today at 12:45 AM</p>
                      </div>
                   </div>
                   <Button variant="outline" size="sm">Backup Now</Button>
                </div>
                <Button variant="destructive" className="w-full sm:w-auto">
                   Reset Application Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
