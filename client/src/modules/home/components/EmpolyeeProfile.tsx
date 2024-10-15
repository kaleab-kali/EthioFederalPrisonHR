import React, { useState } from 'react';

const EmployeeProfilePage: React.FC = () => {
  // State to track the selected menu item
  const [selectedMenu, setSelectedMenu] = useState<string>('profile');

  // Function to render content based on selected menu item
  const renderContent = () => {
    switch (selectedMenu) {
      case 'leave':
        return <Content title="Leave Management" description="Details about employee leave will be shown here." />;
      case 'attendance':
        return <Content title="Attendance Records" description="Details about attendance will be shown here." />;
      case 'appraisal':
        return <Content title="Appraisal History" description="Employee appraisal details will be shown here." />;
      case 'health':
        return <Content title="Health Information" description="Health-related information will be shown here." />;
      case 'document':
        return <Content title="Documents" description="Employee-related documents will be shown here." />;
      case 'performance':
        return <Content title="Performance Reports" description="Performance evaluation details will be shown here." />;
      default:
        return <Content title="Employee Profile" description="Welcome to your profile page. Please select a menu item to view details." />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex">
      {/* Main container with profile card and content area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200"></div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p>ID: 12345</p>
              <p>Branch: NYC Office</p>
              <p>Manager: Jane Smith</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <h3 className="font-semibold">Title:</h3>
            <span className="text-sm bg-blue-100 px-2 py-1 rounded-full">Software Engineer</span>
            <span className="ml-auto bg-gray-300 p-2 rounded-full">🔧</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          {renderContent()}
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-6 ml-4">
        <nav className="flex flex-col space-y-2">
          <button onClick={() => setSelectedMenu('profile')} className="hover:bg-blue-50 p-2 rounded">
            Profile
          </button>
          <button onClick={() => setSelectedMenu('leave')} className="hover:bg-blue-50 p-2 rounded">
            Leave
          </button>
          <button onClick={() => setSelectedMenu('attendance')} className="hover:bg-blue-50 p-2 rounded">
            Attendance
          </button>
          <button onClick={() => setSelectedMenu('appraisal')} className="hover:bg-blue-50 p-2 rounded">
            Appraisal
          </button>
          <button onClick={() => setSelectedMenu('health')} className="hover:bg-blue-50 p-2 rounded">
            Health
          </button>
          <button onClick={() => setSelectedMenu('document')} className="hover:bg-blue-50 p-2 rounded">
            Document
          </button>
          <button onClick={() => setSelectedMenu('performance')} className="hover:bg-blue-50 p-2 rounded">
            Performance
          </button>
        </nav>
      </div>
    </div>
  );
};

// Generic content component to display information based on the selected menu item
const Content: React.FC<{ title: string, description: string }> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default EmployeeProfilePage;
