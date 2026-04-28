import React from 'react';
import { 
  Building2, 
  Key, 
  MapPin, 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Search,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MOCK_BRANCHES, MOCK_ADMIN_ACCOUNTS } from '@/src/lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SuperAdmin({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [branches, setBranches] = React.useState(MOCK_BRANCHES);
  const [admins, setAdmins] = React.useState(MOCK_ADMIN_ACCOUNTS);
  const [showPasswords, setShowPasswords] = React.useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const [newBranch, setNewBranch] = React.useState({ name: '', location: '', code: '' });
  const [isAddBranchOpen, setIsAddBranchOpen] = React.useState(false);

  const togglePassword = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddBranch = () => {
    const id = `br${branches.length + 1}`;
    const branch = { ...newBranch, id, adminId: 'aa1', status: 'active' as const };
    setBranches([...branches, branch]);
    setIsAddBranchOpen(false);
    setNewBranch({ name: '', location: '', code: '' });
  };

  const resetPassword = (id: string) => {
    const newAdmins = admins.map(a => 
      a.id === id ? { ...a, password: Math.random().toString(36).slice(-8) } : a
    );
    setAdmins(newAdmins);
  };

  const filteredAdmins = admins.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-[#4A3728]">Super Admin Control Panel</h2>
        <p className="text-sm text-muted-foreground">Manage organization branches and administrative credentials.</p>
      </div>

      <Tabs defaultValue="branches" className="space-y-4">
        <TabsList className="bg-white border w-full justify-start overflow-x-auto overflow-y-hidden no-scrollbar">
          <TabsTrigger value="branches" className="gap-2 shrink-0">
            <Building2 className="w-4 h-4" />
            Branches
          </TabsTrigger>
          <TabsTrigger value="credentials" className="gap-2 shrink-0">
            <Key className="w-4 h-4" />
            Admin Credentials
          </TabsTrigger>
          <TabsTrigger value="website" className="gap-2 shrink-0">
            <Globe className="w-4 h-4" />
            Website Manager
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Institute Branches</h3>
            <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
              <DialogTrigger render={<Button className="gap-2 h-9 text-xs font-bold" />}>
                <Plus className="w-3.5 h-3.5" />
                Add New Branch
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Branch</DialogTitle>
                  <DialogDescription>Create a new regional branch for the computer center.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="b-name">Branch Name</Label>
                    <Input 
                      id="b-name" 
                      placeholder="e.g. Sakshi Computer Center, Jabalpur" 
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-loc">Location</Label>
                    <Input 
                      id="b-loc" 
                      placeholder="City, District" 
                      value={newBranch.location}
                      onChange={(e) => setNewBranch({...newBranch, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-code">Branch Code</Label>
                    <Input 
                      id="b-code" 
                      placeholder="e.g. SP03" 
                      value={newBranch.code}
                      onChange={(e) => setNewBranch({...newBranch, code: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBranchOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddBranch}>Create Branch</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <Card key={branch.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                      {branch.status}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{branch.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {branch.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Branch Code:</span>
                    <span className="font-mono font-bold">{branch.code}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Internal ID:</span>
                    <span className="font-medium">{branch.id}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-xl font-semibold">Account Visibility & Management</h3>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search admins..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Admin Name</th>
                    <th className="px-6 py-4">Username</th>
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Password</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{admin.role}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono">{admin.username}</td>
                      <td className="px-6 py-4 text-sm">
                        {branches.find(b => b.id === admin.branchId)?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm min-w-[100px] text-center">
                            {showPasswords[admin.id] ? admin.password : '••••••••'}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => togglePassword(admin.id)}
                          >
                            {showPasswords[admin.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 text-warning"
                          onClick={() => resetPassword(admin.id)}
                        >
                          <RefreshCw className="w-3 h-3" />
                          Reset
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg">
            <AlertCircle className="w-4 h-4 text-primary" />
            Super admin can view all branch credentials. Use reset to generate a new secure password for users who lost access.
          </div>
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <Card className="border-none shadow-xl shadow-primary/5 bg-slate-50">
            <CardHeader className="bg-white border-b py-4 px-6 md:px-8">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black uppercase tracking-tighter">Website Management Panel</CardTitle>
                    <CardDescription className="text-xs">Configure the public-facing content that students and visitors see.</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active Module
                  </Badge>
               </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12 text-center space-y-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary shadow-inner">
                <Globe className="w-10 h-10" />
              </div>
              <div className="space-y-3 max-w-xl">
                <h4 className="text-lg font-bold">Launch Website Editor</h4>
                <p className="text-sm text-muted-foreground font-medium">
                  The website manager has its own dedicated interface for better focus. Click the button below to switch to the Website Editor and begin customizing your homepage.
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 h-12 text-sm font-bold shadow-sm"
                  onClick={() => window.open('/', '_blank')}
                >
                  View Live Site
                </Button>
                <Button 
                  size="lg" 
                  className="px-8 h-12 text-sm font-black uppercase shadow-2xl shadow-primary/30"
                  onClick={() => setActiveTab?.('website-manager')}
                >
                  Open Editor Panel
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card>
               <CardHeader>
                 <CardTitle className="text-sm">SEO & Visibility</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automatically optimized for search engines. All content added via the manager is indexed with appropriate meta tags for your institute name and location.
                  </p>
               </CardContent>
             </Card>
             <Card>
               <CardHeader>
                 <CardTitle className="text-sm">Mobile Readiness</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Adaptive layout ensures your website looks professional on phones, tablets, and desktops without any additional manual configuration.
                  </p>
               </CardContent>
             </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
