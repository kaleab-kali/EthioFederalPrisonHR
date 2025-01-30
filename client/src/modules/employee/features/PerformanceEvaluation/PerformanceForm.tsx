import React, { useState } from 'react';
import { FaChartLine } from 'react-icons/fa';
// import { useSubmitPerformance } from '../../services/mutation';

// Define the IEmployee interface with performanceEvaluation
interface IEmployee {
  employeeId: string;
  performanceEvaluation: {
    resultOutOf70: number;
    resultOutOf30: number;
  }[];
}

const PerformanceForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [resultOutOf70, setResultOutOf70] = useState<string>(''); // Store as string
  const [resultOutOf30, setResultOutOf30] = useState<string>(''); // Store as string
//   const submitPerformance = useSubmitPerformance();

  const [employee, setEmployee] = useState<IEmployee>({
    employeeId: '',
    performanceEvaluation: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string inputs to numbers
    const result70 = parseFloat(resultOutOf70);
    const result30 = parseFloat(resultOutOf30);

    // Validate inputs
    if (isNaN(result70) || isNaN(result30)) {
      alert('Please enter valid numbers for the results.');
      return;
    }

    const newEvaluation = {
      resultOutOf70: result70,
      resultOutOf30: result30,
    };

    // Update the employee state with the new evaluation
    setEmployee((prev) => ({
      ...prev,
      employeeId,
      performanceEvaluation: [...prev.performanceEvaluation, newEvaluation],
    }));

    // Submit the performance data
    // submitPerformance.mutate({
    //   employeeId,
    //   performanceEvaluation: newEvaluation,
    // });

    // Reset the form fields
    setEmployeeId('');
    setResultOutOf70('');
    setResultOutOf30('');

    // Log the updated employee object (for demonstration purposes)
    console.log('Updated Employee:', {
      employeeId,
      performanceEvaluation: [...employee.performanceEvaluation, newEvaluation],
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Employee Performance</h2>
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

          {/* Result Out of 70 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Result Out of 70</label>
            <input
              type="number"
              value={resultOutOf70}
              onChange={(e) => setResultOutOf70(e.target.value)} // Store as string
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="70"
              required
            />
          </div>

          {/* Result Out of 30 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Result Out of 30</label>
            <input
              type="number"
              value={resultOutOf30}
              onChange={(e) => setResultOutOf30(e.target.value)} // Store as string
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="30"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Performance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerformanceForm;