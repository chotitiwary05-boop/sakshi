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
  Smartphone,
  User,
  Image as ImageIcon,
  Check,
  Moon,
  Sun,
  Monitor,
  Plus,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MOCK_UNIVERSITIES } from '@/src/lib/mockData';
import { motion } from 'motion/react';

export default function Settings() {
  const [universities, setUniversities] = React.useState(MOCK_UNIVERSITIES);
  const [activeTab, setActiveTab] = React.useState('institute');

  const settingsTabs = [
    { id: 'institute', label: 'Institute', icon: Building2, description: 'Profile and contact' },
    { id: 'academic', label: 'Academic', icon: Globe, description: 'Sessions and years' },
    { id: 'affiliations', label: 'Affiliations', icon: ShieldCheck, description: 'University ties' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Themes and colors' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts and mails' },
    { id: 'security', label: 'Security', icon: ShieldCheck, description: 'Data and safety' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Settings</h2>
          <p className="text-muted-foreground">Manage your institute profile and application preferences.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            Discard
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar Navigation */}
        <aside className="space-y-2">
          <div className="md:sticky md:top-6 space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeTab === tab.id ? "bg-white/20" : "bg-muted group-hover:bg-white"
                )}>
                  <tab.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className={cn(
                    "text-[10px] opacity-70 leading-none mt-0.5",
                    activeTab === tab.id ? "text-white/80" : "text-muted-foreground"
                  )}>{tab.description}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="space-y-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Institute Profile */}
            {activeTab === 'institute' && (
              <div className="space-y-6">
                <Card className="overflow-hidden border-none shadow-xl shadow-muted/20">
                  <div className="h-24 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b" />
                  <CardContent className="relative pt-0">
                    <div className="flex flex-col sm:flex-row gap-6 -mt-12 items-end px-4">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-white border-4 border-background shadow-xl flex items-center justify-center overflow-hidden">
                          <Building2 className="w-10 h-10 text-primary" />
                        </div>
                        <button className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold">
                          <ImageIcon className="w-4 h-4 mb-1" />
                          CHANGE
                        </button>
                      </div>
                      <div className="flex-1 pb-2">
                        <h3 className="text-xl font-bold">Sakshi Computer Center</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">ESTD. 2012</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="space-y-2">
                        <Label>Institute Full Name</Label>
                        <Input defaultValue="Sakshi Computer Center" />
                      </div>
                      <div className="space-y-2">
                        <Label>Short Name / Code</Label>
                        <Input defaultValue="SCC-MOHANDRA" />
                      </div>
                      <div className="space-y-2">
                        <Label>Official Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input defaultValue="contact@sakshicomputer.com" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Contact Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input defaultValue="+91 9926654640" className="pl-10" />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label>Office Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input defaultValue="Near Jain Mandir, Main Road Mohindra, Panna (M.P.)" className="pl-10" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-muted/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Billing Info</CardTitle>
                    <CardDescription>Details used for invoices and financial headers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>GSTIN (Optional)</Label>
                        <Input placeholder="Enter GST number" />
                      </div>
                      <div className="space-y-2">
                        <Label>PAN of Entity</Label>
                        <Input placeholder="Enter PAN number" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Academic Setup */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <Card className="border-none shadow-xl shadow-muted/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Cycle</CardTitle>
                    <CardDescription>Setup academic years and automated rules.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Current Academic Year</Label>
                        <Select defaultValue="2024-25">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2023-24">2023 - 2024</SelectItem>
                            <SelectItem value="2024-25">2024 - 2025</SelectItem>
                            <SelectItem value="2025-26">2025 - 2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Default Language</Label>
                        <Select defaultValue="hindi">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div className="space-y-0.5">
                          <Label className="text-base">Auto-Rollout Grades</Label>
                          <p className="text-xs text-muted-foreground">Automatically update student status after exam finalization.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div className="space-y-0.5">
                          <Label className="text-base">Attendance Threshold</Label>
                          <p className="text-xs text-muted-foreground">Alert when student attendance falls below 75%.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-muted/20 overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Session Deadlines</CardTitle>
                        <CardDescription>Manage admission and examination windows.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-6">
                    {/* July Session */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2 text-[#4A3728]">
                        <div className="w-1.5 h-4 bg-[#4A3728] rounded-full" />
                        July Session
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Admission Last Date', value: '31 August', icon: Calendar },
                          { label: '1st Sem Exam Last', value: '15 October', icon: Calendar },
                          { label: '2nd Sem Exam Last', value: '31 March', icon: Calendar }
                        ].map((d, i) => (
                          <div key={i} className="p-4 border border-dashed rounded-xl space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{d.label}</p>
                            <p className="text-lg font-bold text-[#4A3728]">{d.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* January Session */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2 text-primary">
                        <div className="w-1.5 h-4 bg-primary rounded-full" />
                        January Session
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Admission Last Date', value: '05 March' },
                          { label: '1st Sem Exam Last', value: '31 March' },
                          { label: '2nd Sem Exam Last', value: '15 October' }
                        ].map((d, i) => (
                          <div key={i} className="p-4 border border-dashed rounded-xl space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{d.label}</p>
                            <p className="text-lg font-bold text-primary">{d.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-primary/5 text-[10px] text-muted-foreground/70 py-3 uppercase tracking-tighter text-center justify-center font-bold">
                    * Automated validation strictly enforces these deadlines across all modules.
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Affiliations Setup */}
            {activeTab === 'affiliations' && (
              <Card className="border-none shadow-xl shadow-muted/20">
                <CardHeader>
                  <CardTitle className="text-lg">University Affiliations</CardTitle>
                  <CardDescription>Universities affiliated with Sakshi Computer Center.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    {universities.map((univ) => (
                      <div key={univ.id} className="flex gap-4 items-center p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-white transition-all group">
                        <div className="bg-primary/10 p-3 rounded-xl">
                          <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Input 
                            value={univ.name} 
                            className="font-bold border-none p-0 h-auto focus-visible:ring-0 bg-transparent text-lg"
                            onChange={(e) => {
                              const newUnivs = universities.map(u => u.id === univ.id ? { ...u, name: e.target.value } : u);
                              setUniversities(newUnivs);
                            }}
                          />
                          <Input 
                            value={univ.address} 
                            className="text-sm text-muted-foreground border-none p-0 h-auto focus-visible:ring-0 bg-transparent"
                            onChange={(e) => {
                              const newUnivs = universities.map(u => u.id === univ.id ? { ...u, address: e.target.value } : u);
                              setUniversities(newUnivs);
                            }}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 transition-opacity"
                          onClick={() => setUniversities(universities.filter(u => u.id !== univ.id))}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full border-dashed h-16 rounded-2xl gap-2 hover:bg-primary/5 hover:border-primary/40 transition-all"
                      onClick={() => {
                        const newUniv = { id: Math.random().toString(36).substr(2, 9), name: 'New University', address: 'City, State' };
                        setUniversities([...universities, newUniv]);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add New University Affiliation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <Card className="border-none shadow-xl shadow-muted/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Application Theme</CardTitle>
                    <CardDescription>Choose how your ERP looks on your device.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup defaultValue="system" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Light Mode', icon: Sun, color: 'bg-white' },
                        { id: 'dark', label: 'Dark Mode', icon: Moon, color: 'bg-slate-950' },
                        { id: 'system', label: 'System', icon: Monitor, color: 'bg-gradient-to-br from-white to-slate-950' }
                      ].map((theme) => (
                        <div key={theme.id}>
                          <RadioGroupItem value={theme.id} id={theme.id} className="sr-only" />
                          <Label
                            htmlFor={theme.id}
                            className={cn(
                              "flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-muted",
                            )}
                          >
                            <div className={cn("w-full h-24 rounded-lg flex items-center justify-center border shadow-sm", theme.color)}>
                              <theme.icon className={cn("w-8 h-8", theme.id === 'light' ? 'text-orange-500' : theme.id === 'dark' ? 'text-blue-400' : 'text-slate-500')} />
                            </div>
                            <span className="font-bold">{theme.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-base">Brand Accent Color</Label>
                      <div className="flex gap-4">
                        {['#4A3728', '#1e40af', '#15803d', '#be123c', '#7c3aed'].map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "w-10 h-10 rounded-full border-4 border-white shadow-lg relative flex items-center justify-center transition-transform hover:scale-110",
                              color === '#4A3728' && "ring-2 ring-primary ring-offset-2"
                            )}
                            style={{ backgroundColor: color }}
                          >
                            {color === '#4A3728' && <Check className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <Card className="border-none shadow-xl shadow-muted/20">
                <CardHeader>
                  <CardTitle className="text-lg">Communication Preferences</CardTitle>
                  <CardDescription>Control alerts and notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    {[
                      { label: 'WhatsApp Alerts', desc: 'Fee reminders & admission updates', icon: Smartphone, color: 'bg-green-100 text-green-600', active: true },
                      { label: 'Email Summaries', desc: 'Daily finance & registration reports', icon: Mail, color: 'bg-blue-100 text-blue-600', active: false },
                      { label: 'Desktop Notifications', desc: 'Real-time student attendance pings', icon: Bell, color: 'bg-purple-100 text-purple-600', active: true },
                    ].map((n, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-2.5 rounded-xl", n.color)}>
                            <n.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold">{n.label}</p>
                            <p className="text-xs text-muted-foreground">{n.desc}</p>
                          </div>
                        </div>
                        <Switch defaultChecked={n.active} />
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t">
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-4 px-2">Trigger-based Messages</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Admission Success', 'Fee Collected', 'Attendance Marking', 'Result Publishing', 'Student Absence'].map((event) => (
                        <div key={event} className="flex items-center justify-between bg-muted/20 p-3 rounded-lg">
                          <span className="text-sm font-medium">{event}</span>
                          <Switch defaultChecked={['Admission Success', 'Fee Collected'].includes(event)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="border-none shadow-xl shadow-muted/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Data & Backups</CardTitle>
                    <CardDescription>Secure your institute information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Database className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">Cloud Data Backup</p>
                          <p className="text-xs text-muted-foreground font-medium">Last synced: Today, 09:20 AM</p>
                        </div>
                      </div>
                      <Button className="w-full sm:w-auto shadow-md">Sync Data Now</Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 space-y-4">
                        <div>
                          <h4 className="text-destructive font-bold">Danger Zone</h4>
                          <p className="text-xs text-muted-foreground">Irreversible actions that affect your entire data store.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button variant="outline" className="text-destructive hover:bg-destructive/10 border-destructive/20">
                            Clear Cache
                          </Button>
                          <Button variant="destructive">
                            Factory Reset Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
