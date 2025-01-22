import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { IEmployee } from '../../../../common/Types/Employee';


const EmployeeAttendance: React.FC = () => {

  const employee = useOutletContext<IEmployee>();
  
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
          {employee.attendanceRecords?.map((record, index) => (
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
