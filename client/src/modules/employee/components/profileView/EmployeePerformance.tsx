import React from "react";
import { useOutletContext } from "react-router-dom";
import { IEmployee } from "../../../../common/Types/Employee";
import { EthDateTime } from "ethiopian-calendar-date-converter";

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

const EmployeePerformance: React.FC = () => {
  const employee = useOutletContext<IEmployee>();

  return (
    <div className="max-w-4xl mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-4">From Date (Ethiopian)</th>
            <th className="p-4">To Date (Ethiopian)</th>
            <th className="p-4">Result (out of 30)</th>
            <th className="p-4">Result (out of 70)</th>
            <th className="p-4">Total (out of 100)</th>
          </tr>
        </thead>
        <tbody>
          {employee.evaluation?.map((record, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">
                {convertToEthiopianDate(formatDate(record.from))}
              </td>
              <td className="p-4">
                {convertToEthiopianDate(formatDate(record.to))}
              </td>
              <td className="p-4">{record.colleague}</td>
              <td className="p-4">{record.self}</td>
              <td className="p-4 font-semibold">{record.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePerformance;
