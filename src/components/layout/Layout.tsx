import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  BookOpen, 
  Video, 
  FileText, 
  CalendarCheck, 
  IndianRupee, 
  Users, 
  Settings,
  Menu,
  X,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USER } from '@/src/lib/mockData';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg group",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-secondary-foreground")} />
    {label}
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Layout({ children, activeTab, setActiveTab, onLogout }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'courses', label: 'Courses & Batches', icon: BookOpen },
    { id: 'lms', label: 'Video Library', icon: Video },
    { id: 'exams', label: 'Exams & Results', icon: FileText },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'finance', label: 'Finance', icon: IndianRupee },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-white border-r md:relative",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-bottom">
          <div className={cn("flex items-center gap-2 font-bold text-primary", !isSidebarOpen && "hidden")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">E</div>
            <span className="text-xl tracking-tight">EduFlow</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={isSidebarOpen ? item.label : ''}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
            <Avatar>
              <AvatarImage src={MOCK_USER.avatar} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{MOCK_USER.name}</span>
                <span className="text-xs text-muted-foreground truncate">{MOCK_USER.role}</span>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            onClick={onLogout}
            className={cn("w-full mt-4 justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10", !isSidebarOpen && "justify-center px-0")}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b shrink-0">
          <h1 className="text-xl font-semibold capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="h-8 w-px bg-border mx-2" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Welcome back,</p>
              <p className="text-xs text-muted-foreground">{MOCK_USER.name}</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
