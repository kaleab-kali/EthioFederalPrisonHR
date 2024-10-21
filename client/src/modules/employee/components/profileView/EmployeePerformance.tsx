import React from 'react';
import { useOutletContext } from 'react-router-dom';

interface Employee {
  performance: string;
}

const EmployeePerformance: React.FC = () => {
  const employee = useOutletContext<Employee>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Performance Review</h2>
      <p>{employee.performance}</p>
    </div>
  );
};

export default EmployeePerformance;
