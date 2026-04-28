import React from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import Admissions from './modules/admissions/Admissions';
import Courses from './modules/courses/Courses';
import Attendance from './modules/attendance/Attendance';
import Finance from './modules/finance/Finance';
import Users from './modules/users/Users';
import Settings from './modules/settings/Settings';
import Login from './modules/auth/Login';
import SuperAdmin from './modules/super-admin/SuperAdmin';
import Website from './modules/website/Website';
import WebsiteEditor from './modules/website/WebsiteEditor';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [role, setRole] = React.useState<string>('admin');
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLogin = (success: boolean, userRole: string) => {
    if (success) {
      setIsAuthenticated(true);
      setRole(userRole);
      setShowLogin(false);
      setActiveTab(userRole === 'sadmin' ? 'control-panel' : 'dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setShowLogin(false);
  };

  if (!isAuthenticated && !showLogin) {
    return (
      <div className="relative min-h-screen">
        <Website />
        <button 
          onClick={() => setShowLogin(true)}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-110 transition-all flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Admin Login
        </button>
      </div>
    );
  }

  if (showLogin) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'control-panel':
        return <SuperAdmin setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'admissions':
        return <Admissions />;
      case 'courses':
        return <Courses />;
      case 'attendance':
        return <Attendance />;
      case 'finance':
        return <Finance />;
      case 'users':
        return <Users />;
      case 'website-manager':
        return <WebsiteEditor />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} role={role}>
      {renderContent()}
    </Layout>
  );
}
