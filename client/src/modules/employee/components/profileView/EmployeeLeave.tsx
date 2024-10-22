import React from 'react';

const EmployeeLeave: React.FC = () => {
  const leaveHistory = [
    {
      dateFrom: '2024-10-01',
      dateTo: '2024-10-10',
      leaveType: 'Sick Leave',
      reason: 'Medical reasons',
      delegatedTo: 'John Doe',
      status: 'Accepted',
    },
    {
      dateFrom: '2024-09-05',
      dateTo: '2024-09-08',
      leaveType: 'Annual Leave',
      reason: 'Family event',
      delegatedTo: 'Jane Smith',
      status: 'Rejected',
    },
    {
      dateFrom: '2024-08-12',
      dateTo: '2024-08-15',
      leaveType: 'Casual Leave',
      reason: 'Personal reasons',
      delegatedTo: 'Mary Johnson',
      status: 'Accepted',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {leaveHistory.length > 0 ? (
        leaveHistory.map((leave, index) => (
          <div
            key={index}
            className="relative bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div
              className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg text-white font-semibold ${
                leave.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {leave.status}
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
              <div className="text-gray-600">
                <p className="font-normal text-sm">Date From</p>
                <p className="font-semibold text-gray-900">{leave.dateFrom}</p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Date To</p>
                <p className="font-semibold text-gray-900">{leave.dateTo}</p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Type of Leave</p>
                <p className="font-semibold text-gray-900">{leave.leaveType}</p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Reason</p>
                <p className="font-semibold text-gray-900">{leave.reason}</p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Delegated To</p>
                <p className="font-semibold text-gray-900">{leave.delegatedTo}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
          No leave history available at the moment.
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;
