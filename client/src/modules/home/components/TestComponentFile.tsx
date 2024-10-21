import React from 'react';

const TestComponentFile: React.FC = () => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Total Employees</h2>
          <p className="text-2xl font-bold text-blue-700">150</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-red-700">Absent</h2>
          <p className="text-2xl font-bold text-red-700">5</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Branches</h2>
          <p className="text-2xl font-bold text-green-700">3</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-yellow-700">On Leave</h2>
          <p className="text-2xl font-bold text-yellow-700">10</p>
        </div>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 text-white p-2 rounded-full">J</div>
            <div>
              <p className="text-gray-700">John Doe applied for leave.</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-red-500 text-white p-2 rounded-full">J</div>
            <div>
              <p className="text-gray-700">Jane Smith was marked absent today.</p>
              <p className="text-sm text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-500 text-white p-2 rounded-full">N</div>
            <div>
              <p className="text-gray-700">New branch opened in New York.</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">HR Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Total Projects</h3>
            <p className="text-2xl font-bold text-indigo-700">20</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Upcoming Meetings</h3>
            <p className="text-2xl font-bold text-purple-700">5</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">New Hires</h3>
            <p className="text-2xl font-bold text-pink-700">3</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Other Dashboard Stats</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-blue-500">•</span>
            <p className="text-gray-700">Employee Satisfaction: 85%</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-500">•</span>
            <p className="text-gray-700">Training Sessions: 12</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-500">•</span>
            <p className="text-gray-700">Pending Approvals: 7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponentFile;
