import React, { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { useSubmitWork } from '../../services/mutation';

// Define the IEmployee interface
interface IEmployee {
  employeeId: string; // Add employeeId to the interface
  workExperience: {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

const WorkExperienceForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const createWorksExperience= useSubmitWork()
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const [employee, setEmployee] = useState<IEmployee>({ employeeId: '', workExperience: [] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExperience = {
      companyName,
      position,
      startDate,
      endDate,
      description,
    };

    // Update the employee state with the new experience and employeeId
    setEmployee((prev) => ({
      ...prev,
      employeeId,
      workExperience: [...prev.workExperience, newExperience],
    }));
    createWorksExperience.mutate({
      employeeId: employeeId,
      workExperience: newExperience,
    });

    // Reset the form fields
    setEmployeeId('');
    setCompanyName('');
    setPosition('');
    setStartDate('');
    setEndDate('');
    setDescription('');

    // Log the updated employee object (for demonstration purposes)
    console.log('Updated Employee:', {
      employeeId,
      workExperience: [...employee.workExperience, newExperience],
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaBriefcase className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* Company Name and Position */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
          </div>

          {/* Start Date and End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows={3}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceForm;