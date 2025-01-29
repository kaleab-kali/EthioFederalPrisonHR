import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";

interface HealthRecord {
  personName: string;
  role: 'Employee' | 'Spouse' | 'Kid';
  age?: number; // Specific to kids
  isEligible?: boolean; 
  records: { date: string; healthIssue: string; cost: number }[];
}

interface IEmployee {
  name: string;
  healthRecords: HealthRecord[];
}

const employeeData: IEmployee = {
  name: 'John Doe',
  healthRecords: [
    {
      personName: 'John Doe',
      role: 'Employee',
      records: [
        { date: '2023-02-10', healthIssue: 'Flu', cost: 200 },
        { date: '2024-01-14', healthIssue: 'Back Pain', cost: 500 },
      ],
    },
    {
      personName: 'Jane Doe',
      role: 'Spouse',
      records: [
        { date: '2023-03-22', healthIssue: 'Migraine', cost: 300 },
      ],
    },
    {
      personName: 'Alice Doe',
      role: 'Kid',
      age: 19,
      isEligible: false,
      records: [
        { date: '2023-06-15', healthIssue: 'Allergy', cost: 150 },
      ],
    },
    {
      personName: 'Bob Doe',
      role: 'Kid',
      age: 16,
      isEligible: true,
      records: [
        { date: '2023-08-10', healthIssue: 'Broken Arm', cost: 400 },
      ],
    },
  ],
};

const EmployeeHealth: React.FC = () => {
    const employee = useOutletContext<IEmployee>();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderHealthTable = (records: { date: string; healthIssue: string; cost: number }[]) => (
    <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Date</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Health Issue</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Cost</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index} className="hover:bg-blue-50">
            <td className="py-3 px-4 border-b border-gray-200 text-sm">{record.date}</td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">{record.healthIssue}</td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">${record.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="max-w-4xl mx-auto">
  
      {employeeData.healthRecords
        .filter((personRecord) => personRecord.role !== 'Kid') 
        .map((personRecord, index) => (
          <div key={index} className="mb-4 shadow-lg rounded-lg bg-white">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
            >
              {personRecord.role === 'Employee' ? 'Personal' : 'Spouse'}
            </button>
            {activeIndex === index && (
              <div className="p-6 bg-white rounded-b-lg">
                {renderHealthTable(personRecord.records)}
              </div>
            )}
          </div>
        ))}

      {/* Kids Accordion */}
      <div className="mb-4 shadow-lg rounded-lg bg-white">
        <button
          onClick={() => toggleAccordion(-1)} 
          className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
        >
          Kids
        </button>
        {activeIndex === -1 && (
          <div className="p-6 bg-gray-50 rounded-b-lg space-y-4">
           
            {employeeData.healthRecords
              .filter((personRecord) => personRecord.role === 'Kid')
              .map((kidRecord, kidIndex) => (
                <div
                  key={kidIndex}
                  className="p-4 rounded-lg shadow-md bg-white border border-gray-200"
                >
                  <h3 className="text-lg font-semibold mb-1">{kidRecord.personName}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Age: {kidRecord.age} -{' '}
                    {kidRecord.isEligible ? (
                      <span className="text-green-600 font-medium">Eligible</span>
                    ) : (
                      <span className="text-red-600 font-medium">Not Eligible</span>
                    )}
                  </p>
                  {renderHealthTable(kidRecord.records)}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHealth;
