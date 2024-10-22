import React, { useState } from 'react';

// Define types for health records and persons
type HealthRecord = {
  date: string;
  healthIssue: string;
  cost: number;
};

type Person = {
  name: string;
  role: 'Employee' | 'Spouse' | 'Kid';
  healthRecords: HealthRecord[];
};

type Kid = Person & {
  age: number;
  isEligible: boolean;
};

// Dummy data for employee, spouse, and kids
const employeeData: Person = {
  name: 'John Doe',
  role: 'Employee',
  healthRecords: [
    { date: '2023-02-10', healthIssue: 'Flu', cost: 200 },
    { date: '2024-01-14', healthIssue: 'Back Pain', cost: 500 },
  ],
};

const spouseData: Person = {
  name: 'Jane Doe',
  role: 'Spouse',
  healthRecords: [
    { date: '2023-03-22', healthIssue: 'Migraine', cost: 300 },
  ],
};

const kidsData: Kid[] = [
  {
    name: 'Alice Doe',
    age: 19,
    isEligible: false,
    role: 'Kid',
    healthRecords: [
      { date: '2023-06-15', healthIssue: 'Allergy', cost: 150 },
    ],
  },
  {
    name: 'Bob Doe',
    age: 16,
    isEligible: true,
    role: 'Kid',
    healthRecords: [
      { date: '2023-08-10', healthIssue: 'Broken Arm', cost: 400 },
      { date: '2023-08-10', healthIssue: 'Broken Arm', cost: 400 },
      { date: '2023-08-10', healthIssue: 'Broken Arm', cost: 400 },
    ],
  },
];

// The main component
const EmployeeHealth: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderHealthTable = (records: HealthRecord[]) => (
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

  const renderKidTable = () => (
    <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Name</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Age</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Eligible</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Health Records</th>
        </tr>
      </thead>
      <tbody>
        {kidsData.map((kid, index) => (
          <tr key={index} className="hover:bg-blue-50">
            <td className="py-3 px-4 border-b border-gray-200 text-sm">{kid.name}</td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">{kid.age}</td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">
              {kid.isEligible ? (
                <span className="text-green-600 font-medium">Eligible</span>
              ) : (
                <span className="text-red-600 font-medium">Not Eligible</span>
              )}
            </td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">
              {renderHealthTable(kid.healthRecords)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Employee Accordion */}
      <div className="mb-4 shadow-lg rounded-lg bg-white">
        <button
          onClick={() => toggleAccordion(0)}
          className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
        >
          {employeeData.name} - {employeeData.role}
        </button>
        {activeIndex === 0 && (
          <div className="p-6 bg-white rounded-b-lg">
            {renderHealthTable(employeeData.healthRecords)}
          </div>
        )}
      </div>

      {/* Spouse Accordion */}
      <div className="mb-4 shadow-lg rounded-lg bg-white">
        <button
          onClick={() => toggleAccordion(1)}
          className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
        >
          {spouseData.name} - {spouseData.role}
        </button>
        {activeIndex === 1 && (
          <div className="p-6 bg-white rounded-b-lg">
            {renderHealthTable(spouseData.healthRecords)}
          </div>
        )}
      </div>

      {/* Kids Accordion */}
      <div className="mb-4 shadow-lg rounded-lg bg-white">
        <button
          onClick={() => toggleAccordion(2)}
          className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
        >
          Kids
        </button>
        {activeIndex === 2 && (
          <div className="p-6 bg-white rounded-b-lg">
            {renderKidTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHealth;
