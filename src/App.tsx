import React from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import Admissions from './modules/admissions/Admissions';
import Courses from './modules/courses/Courses';
import LMS from './modules/lms/LMS';
import Exams from './modules/exams/Exams';
import Attendance from './modules/attendance/Attendance';
import Finance from './modules/finance/Finance';
import Users from './modules/users/Users';
import Settings from './modules/settings/Settings';
import Login from './modules/auth/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const handleLogin = (success: boolean) => {
    if (success) setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'admissions':
        return <Admissions />;
      case 'courses':
        return <Courses />;
      case 'lms':
        return <LMS />;
      case 'exams':
        return <Exams />;
      case 'attendance':
        return <Attendance />;
      case 'finance':
        return <Finance />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
}
