import React from 'react';

interface AttendanceRecord {
  date: string;
  totalDays: number;
  presentDays: number;
}

const EmployeeAttendance: React.FC = () => {
  // Dummy attendance data
  const attendanceHistory: AttendanceRecord[] = [
    { date: 'October 2024', totalDays: 22, presentDays: 20 },
    { date: 'September 2024', totalDays: 20, presentDays: 18 },
    { date: 'August 2024', totalDays: 23, presentDays: 21 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-4">Month</th>
            <th className="p-4">Total Working Days</th>
            <th className="p-4">Days Present</th>
            <th className="p-4">Days Absent</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory.map((record, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{record.date}</td>
              <td className="p-4">{record.totalDays}</td>
              <td className="p-4">{record.presentDays}</td>
              <td className="p-4 font-semibold text-red-500">{record.totalDays - record.presentDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendance;
