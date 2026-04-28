import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  BookOpen, 
  CalendarCheck, 
  IndianRupee, 
  Users, 
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ShieldAlert,
  Globe
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
      "flex items-center w-full gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg group text-left",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
    )}
  >
    <Icon className={cn("w-4 h-4 shrink-0", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-secondary-foreground")} />
    <span className="truncate">{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  role: string;
}

export default function Layout({ children, activeTab, setActiveTab, onLogout, role }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    ...(role === 'sadmin' ? [{ id: 'control-panel', label: 'Super Admin', icon: ShieldAlert }] : []),
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'courses', label: 'Courses & Batches', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'finance', label: 'Finance', icon: IndianRupee },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-white border-r md:relative",
          isSidebarOpen ? "w-64" : "w-20",
          !isMobileMenuOpen && " -translate-x-full md:translate-x-0",
          isMobileMenuOpen && "w-64 translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-bottom">
          <div className={cn("flex items-center gap-2 font-bold text-primary", (!isSidebarOpen && !isMobileMenuOpen) && "hidden")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">E</div>
            <span className="text-xl tracking-tight">EduFlow</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileMenuOpen(false);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            className="md:flex"
          >
            {isSidebarOpen || isMobileMenuOpen ? <X className="w-5 h-5 text-slate-500" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={(isSidebarOpen || isMobileMenuOpen) ? item.label : ''}
                active={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setIsMobileMenuOpen(false);
                }}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className={cn("flex items-center gap-3", (!isSidebarOpen && !isMobileMenuOpen) && "justify-center")}>
            <Avatar>
              <AvatarImage src={MOCK_USER.avatar} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {(isSidebarOpen || isMobileMenuOpen) && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{MOCK_USER.name}</span>
                <span className="text-xs text-muted-foreground truncate">{MOCK_USER.role}</span>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            onClick={onLogout}
            className={cn("w-full mt-4 justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10", (!isSidebarOpen && !isMobileMenuOpen) && "justify-center px-0")}
          >
            <LogOut className="w-5 h-5" />
            {(isSidebarOpen || isMobileMenuOpen) && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b shrink-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold capitalize truncate">{activeTab.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="h-8 w-px bg-border mx-2 hidden xs:block" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Welcome back,</p>
              <p className="text-xs text-muted-foreground">{MOCK_USER.name}</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
