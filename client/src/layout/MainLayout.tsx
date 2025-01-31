import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/components/Header';
import Sidebar from '../common/components/Sidebar';
import { useAuth } from '../common/components/context/AuthContex';

const MainLayout: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const {user} = useAuth()
    const userRole = user?.role || '';

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header onToggleSidebar={handleToggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isCollapsed={isSidebarCollapsed} userRole={userRole} />
          <main className="flex-1 p-6 bg-grey shadow-md rounded-tl-2xl overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };
export default MainLayout;
