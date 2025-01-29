import React from "react";
import { useOutletContext } from "react-router-dom";
import { IEmployee } from "../../../../common/Types/Employee";

const EmployeeWorkExperience: React.FC = () => {
  const employee = useOutletContext<IEmployee>();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
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
                {new Date(experience.startDate).toDateString()}
              </td>
              <td className="p-4">
                {new Date(experience.endDate).toDateString()}
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
