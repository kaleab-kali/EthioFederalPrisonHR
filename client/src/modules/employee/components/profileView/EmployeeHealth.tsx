import { EthDateTime } from "ethiopian-calendar-date-converter";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

interface HealthRecord {
  age?: number;
  beneficiary: "Employee" | "Spouse" | "Child";
  childName?: string;
  costOfCoverage: number;
  hospitalName: string;
  coverageStartDate: Date;
  coverageEndDate: Date;
}

interface IEmployee {
  name: string;
  healthRecords: HealthRecord[];
}

const EmployeeHealth: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const convertToEthiopianDate = (dateString: string) => {
    const date = new Date(dateString);
    const ethDate = EthDateTime.fromEuropeanDate(date);
    return `${ethDate.year}/${ethDate.month}/${ethDate.date}`;
  };
  const formatDate = (date: Date | string) => {
    // Ensure that the date is a valid Date object
    const formattedDate = new Date(date);
    return formattedDate instanceof Date && !isNaN(formattedDate.getTime())
      ? formattedDate.toLocaleDateString()
      : "Invalid date";
  };

  const renderHealthTable = (records: HealthRecord[]) => (
    <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            End Date
          </th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Hospital
          </th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index} className="hover:bg-blue-50">
            <td className="py-3 px-4 border-b border-gray-200 text-sm">
              {convertToEthiopianDate(formatDate(record.coverageEndDate))}
            </td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">
              {record.hospitalName}
            </td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">
              ${record.costOfCoverage}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {employee.healthRecords
        .filter((record) => record.beneficiary !== "Child")
        .map((record, index) => (
          <div key={index} className="mb-4 shadow-lg rounded-lg bg-white">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
            >
              {record.beneficiary === "Employee" ? "Personal" : "Spouse"}
            </button>
            {activeIndex === index && (
              <div className="p-6 bg-white rounded-b-lg">
                {renderHealthTable([record])}
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
            {employee.healthRecords
              .filter((record) => record.beneficiary === "Child")
              .map((record, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg shadow-md bg-white border border-gray-200"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {record.childName || "Unnamed Child"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Age: {record.age ?? "N/A"}
                  </p>
                  {renderHealthTable([record])}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHealth;
