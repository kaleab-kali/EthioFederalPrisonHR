import React from 'react';
import { useOutletContext } from 'react-router-dom';

interface Employee {
  documents: string[];
}

const EmployeeDocuments: React.FC = () => {
  const employee = useOutletContext<Employee>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee Documents</h2>
      <ul>
        {employee.documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDocuments;
