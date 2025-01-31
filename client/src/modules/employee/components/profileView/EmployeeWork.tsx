import React from "react";
import { useOutletContext } from "react-router-dom";
import { IEmployee } from "../../../../common/Types/Employee";
import { EthDateTime } from "ethiopian-calendar-date-converter";

const EmployeeWorkExperience: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
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
  return (
    <div className="max-w-4xl mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-4">Company Name</th>
            <th className="p-4">Position</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {employee.workExperience?.map((experience, index) => (
            <tr key={experience._id || index} className="border-t">
              <td className="p-4">{experience.companyName}</td>
              <td className="p-4">{experience.position}</td>
              <td className="p-4">
                {convertToEthiopianDate(formatDate(experience.startDate))}
              </td>
              <td className="p-4">
                {convertToEthiopianDate(formatDate(experience.endDate))}
              </td>

              <td className="p-4">{experience.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeWorkExperience;
