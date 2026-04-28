import React from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  GripVertical, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Phone, 
  MapPin, 
  Layout, 
  Type, 
  Monitor,
  Eye,
  Settings as SettingsIcon,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INITIAL_WEBSITE_CONFIG } from './mockData';
import { WebsiteConfig, WebsiteSection } from './types';
import { motion, Reorder } from 'motion/react';

export default function WebsiteEditor() {
  const [config, setConfig] = React.useState<WebsiteConfig>(INITIAL_WEBSITE_CONFIG);
  const [activeView, setActiveView] = React.useState<'edit' | 'preview'>('edit');
  const [editingSection, setEditingSection] = React.useState<string | null>(null);

  const saveConfig = () => {
    console.log('Saving config...', config);
    // In a real app, this would update Firestore
  };

  const addSection = (type: WebsiteSection['type']) => {
    const newSection: WebsiteSection = {
      id: `section-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      order: config.sections.length,
    };
    setConfig({ ...config, sections: [...config.sections, newSection] });
    setEditingSection(newSection.id);
  };

  const removeSection = (id: string) => {
    setConfig({ ...config, sections: config.sections.filter(s => s.id !== id) });
  };

  const updateSection = (id: string, updates: Partial<WebsiteSection>) => {
    setConfig({
      ...config,
      sections: config.sections.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-muted">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-primary flex items-center gap-3 italic uppercase leading-none">
            <Layout className="w-6 h-6 md:w-8 md:h-8" />
            Website Manager
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">Customize your public website content and appearance.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2 h-10 text-xs font-bold px-4" onClick={() => window.open('/', '_blank')}>
            <Monitor className="w-3.5 h-3.5" />
            Visit Live
          </Button>
          <Button className="flex-1 sm:flex-none gap-2 h-10 text-xs font-black uppercase px-6 shadow-lg shadow-primary/20" onClick={saveConfig}>
            <Save className="w-3.5 h-3.5" />
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-muted/20">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">Website Sections</CardTitle>
                  <CardDescription className="text-xs font-medium">Drag and drop to reorder sections on your website.</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                   <Button size="sm" onClick={() => addSection('hero')} className="flex-1 sm:flex-none gap-1 h-9 font-bold px-4">
                      <Plus className="w-4 h-4" />
                      Hero
                   </Button>
                   <Button size="sm" onClick={() => addSection('slider')} className="flex-1 sm:flex-none gap-1 h-9 bg-orange-600 hover:bg-orange-700 font-bold px-4">
                      <Plus className="w-4 h-4" />
                      Slider
                   </Button>
                   <Button size="sm" onClick={() => addSection('gallery')} className="flex-1 sm:flex-none gap-1 h-9 bg-indigo-600 hover:bg-indigo-700 font-bold px-4">
                      <Plus className="w-4 h-4" />
                      Gallery
                   </Button>
                   <Button size="sm" onClick={() => addSection('director-message')} className="flex-1 sm:flex-none gap-1 h-9 bg-emerald-600 hover:bg-emerald-700 font-bold px-4">
                      <Plus className="w-4 h-4" />
                      Director
                   </Button>
                   <Button size="sm" onClick={() => addSection('branches')} className="flex-1 sm:flex-none gap-1 h-9 bg-rose-600 hover:bg-rose-700 font-bold px-4">
                      <Plus className="w-4 h-4" />
                      Branches
                   </Button>
                   <Button size="sm" onClick={() => addSection('custom')} className="flex-1 sm:flex-none gap-1 h-9 font-bold px-4">
                      <Plus className="w-4 h-4" />
                      About
                   </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {config.sections.sort((a, b) => a.order - b.order).map((section, idx) => (
                  <div 
                    key={section.id} 
                    className={`group flex items-center justify-between p-4 transition-colors ${editingSection === section.id ? 'bg-primary/5 ring-1 ring-primary/20' : 'hover:bg-muted/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="cursor-grab active:cursor-grabbing text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div className={`p-2 rounded-lg ${
                        section.type === 'hero' ? 'bg-orange-100' : 
                        section.type === 'courses' ? 'bg-blue-100' : 
                        section.type === 'director-message' ? 'bg-emerald-100' :
                        section.type === 'branches' ? 'bg-rose-100' :
                        'bg-purple-100'
                      }`}>
                        <Monitor className={`w-4 h-4 ${
                           section.type === 'hero' ? 'text-orange-600' : 
                           section.type === 'courses' ? 'text-blue-600' : 
                           section.type === 'director-message' ? 'text-emerald-600' :
                           section.type === 'branches' ? 'text-rose-600' :
                           'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{section.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{section.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button 
                        variant="ghost" 
                        size="icon" 
                        className={editingSection === section.id ? 'text-primary' : ''}
                        onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                       >
                          <SettingsIcon className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeSection(section.id)}>
                          <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Settings Editor */}
          {editingSection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-none shadow-2xl shadow-primary/10 ring-1 ring-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Edit Section: {config.sections.find(s => s.id === editingSection)?.title}</CardTitle>
                      <CardDescription>Modify text, images, and actions for this component.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setEditingSection(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>{
                        config.sections.find(s => s.id === editingSection)?.type === 'director-message' ? 'Section Title' : 
                        config.sections.find(s => s.id === editingSection)?.type === 'branches' ? 'Branches Header' : 
                        'Heading'
                      }</Label>
                      <Input 
                        value={config.sections.find(s => s.id === editingSection)?.title || ''} 
                        onChange={(e) => updateSection(editingSection, { title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{
                        config.sections.find(s => s.id === editingSection)?.type === 'director-message' ? 'Director Name' : 
                        config.sections.find(s => s.id === editingSection)?.type === 'branches' ? 'Branches Subtitle' : 
                        'Subheading'
                      }</Label>
                      <Input 
                        value={config.sections.find(s => s.id === editingSection)?.subtitle || ''} 
                        onChange={(e) => updateSection(editingSection, { subtitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{
                      config.sections.find(s => s.id === editingSection)?.type === 'director-message' ? 'Message Content' : 
                      config.sections.find(s => s.id === editingSection)?.type === 'branches' ? 'Branches List/Info' : 
                      'Content / Body Text'
                    }</Label>
                    <Input 
                      className="min-h-[100px]"
                      value={config.sections.find(s => s.id === editingSection)?.content || ''} 
                      onChange={(e) => updateSection(editingSection, { content: e.target.value })}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>CTA Button Text</Label>
                      <Input 
                        value={config.sections.find(s => s.id === editingSection)?.ctaText || ''} 
                        onChange={(e) => updateSection(editingSection, { ctaText: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CTA Action Type</Label>
                      <Select 
                        value={config.sections.find(s => s.id === editingSection)?.ctaAction || 'link'}
                        onValueChange={(val) => updateSection(editingSection, { ctaAction: val as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">Internal Link</SelectItem>
                          <SelectItem value="call">Click to Call</SelectItem>
                          <SelectItem value="map">Google Maps Location</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Link / Target</Label>
                      <Input 
                        placeholder={
                          config.sections.find(s => s.id === editingSection)?.ctaAction === 'call' ? '+91...' :
                          config.sections.find(s => s.id === editingSection)?.ctaAction === 'map' ? 'Google Maps URL' :
                          '#about'
                        }
                        value={config.sections.find(s => s.id === editingSection)?.ctaLink || ''} 
                        onChange={(e) => updateSection(editingSection, { ctaLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                       <ImageIcon className="w-4 h-4" />
                       Section Images / Media
                    </Label>
                    <div className="grid grid-cols-1 gap-4">
                      {config.sections.find(s => s.id === editingSection)?.images?.map((img, i) => (
                        <div key={i} className="flex gap-4 p-4 border rounded-xl bg-slate-50 items-start group">
                           <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border bg-white">
                              <img src={img} className="w-full h-full object-cover" alt="Thumb" referrerPolicy="no-referrer" />
                           </div>
                           <div className="flex-1 space-y-2">
                              <Label className="text-xs uppercase font-bold text-muted-foreground">Image URL {i + 1}</Label>
                              <div className="flex gap-2">
                                <Input 
                                  value={img} 
                                  onChange={(e) => {
                                    const section = config.sections.find(s => s.id === editingSection);
                                    if (section && section.images) {
                                      const newImages = [...section.images];
                                      newImages[i] = e.target.value;
                                      updateSection(editingSection, { images: newImages });
                                    }
                                  }}
                                  placeholder="https://..."
                                  className="h-9 text-xs"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive h-9 w-9 shrink-0"
                                  onClick={() => {
                                    const section = config.sections.find(s => s.id === editingSection);
                                    if (section && section.images) {
                                      const newImages = section.images.filter((_, idx) => idx !== i);
                                      updateSection(editingSection, { images: newImages });
                                    }
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                           </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const section = config.sections.find(s => s.id === editingSection);
                          const newImg = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200`;
                          if (section) {
                            const newImages = [...(section.images || []), newImg];
                            updateSection(editingSection, { images: newImages });
                          }
                        }}
                        className="w-full h-12 border-dashed gap-2 text-xs font-bold uppercase tracking-widest"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Global Settings */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-muted/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                Global Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Header Logo (Image URL)</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://..."
                    value={config.header.logo || ''} 
                    onChange={(e) => setConfig({ ...config, header: { ...config.header, logo: e.target.value } })}
                  />
                  {config.header.logo && (
                    <div className="w-10 h-10 border rounded-lg overflow-hidden shrink-0 bg-white">
                      <img src={config.header.logo} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Header Brand Name</Label>
                <Input 
                  value={config.header.title} 
                  onChange={(e) => setConfig({ ...config, header: { ...config.header, title: e.target.value } })}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Manage Branches</Label>
                <div className="space-y-6">
                  {config.footer.branches?.map((branch, i) => (
                    <div key={i} className="p-4 border rounded-xl space-y-4 bg-muted/20 relative">
                       <button 
                        className="absolute top-2 right-2 text-destructive hover:scale-110 transition-transform"
                        onClick={() => {
                          const newBranches = config.footer.branches?.filter((_, idx) => idx !== i);
                          setConfig({ ...config, footer: { ...config.footer, branches: newBranches } });
                        }}
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase">Branch Name</Label>
                          <Input 
                            value={branch.name} 
                            onChange={(e) => {
                              const newBranches = [...(config.footer.branches || [])];
                              newBranches[i] = { ...branch, name: e.target.value };
                              setConfig({ ...config, footer: { ...config.footer, branches: newBranches } });
                            }}
                            className="h-8 text-xs font-bold"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase">Branch Image URL</Label>
                          <Input 
                            value={branch.image || ''} 
                            onChange={(e) => {
                              const newBranches = [...(config.footer.branches || [])];
                              newBranches[i] = { ...branch, image: e.target.value };
                              setConfig({ ...config, footer: { ...config.footer, branches: newBranches } });
                            }}
                            className="h-8 text-xs"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase">Address</Label>
                          <Input 
                            value={branch.address || ''} 
                            onChange={(e) => {
                              const newBranches = [...(config.footer.branches || [])];
                              newBranches[i] = { ...branch, address: e.target.value };
                              setConfig({ ...config, footer: { ...config.footer, branches: newBranches } });
                            }}
                            className="h-8 text-xs"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase">Phone Numbers (Comma separated)</Label>
                          <Input 
                            value={branch.phones.join(', ')} 
                            onChange={(e) => {
                              const newBranches = [...(config.footer.branches || [])];
                              newBranches[i] = { ...branch, phones: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                              setConfig({ ...config, footer: { ...config.footer, branches: newBranches } });
                            }}
                            className="h-8 text-xs"
                          />
                       </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs font-bold h-10 border-dashed"
                    onClick={() => {
                      const newBranch = { name: 'New Branch', phones: ['+91...'], address: '', image: 'https://images.unsplash.com/photo-1544652277-2f3b9c7b4169?auto=format&fit=crop&q=80&w=600' };
                      setConfig({ ...config, footer: { ...config.footer, branches: [...(config.footer.branches || []), newBranch] } });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Branch
                  </Button>
                </div>
              </div>

              <Separator />
              
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Footer Contact Info</Label>
                <div className="space-y-3">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Phone"
                      className="pl-10"
                      value={config.footer.contact.phone}
                      onChange={(e) => setConfig({ ...config, footer: { ...config.footer, contact: { ...config.footer.contact, phone: e.target.value } } })}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Address"
                      className="pl-10"
                      value={config.footer.contact.address}
                      onChange={(e) => setConfig({ ...config, footer: { ...config.footer, contact: { ...config.footer.contact, address: e.target.value } } })}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs font-bold text-primary mb-2">PRO TIP</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use high-resolution images for Hero sections (1920x1080) for the best visual impact on desktop screens.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function X({ className, ...props }: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
