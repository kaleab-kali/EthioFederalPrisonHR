import React from 'react';
import { useOutletContext } from 'react-router-dom';

interface PerformanceRecord {
  date: string;
  result30: number;
  result70: number;
}

interface Employee {
  performance: PerformanceRecord[];
}

const EmployeePerformance: React.FC = () => {
  const employee = useOutletContext<Employee>();

  return (
    <div className="max-w-4xl mx-auto">
  
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-4">Date</th>
            <th className="p-4">Result (out of 30)</th>
            <th className="p-4">Result (out of 70)</th>
            <th className="p-4">Total (out of 100)</th>
          </tr>
        </thead>
        <tbody>
          {employee.performance.map((record, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{record.date}</td>
              <td className="p-4">{record.result30}</td>
              <td className="p-4">{record.result70}</td>
              <td className="p-4 font-semibold">{record.result30 + record.result70}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePerformance;
