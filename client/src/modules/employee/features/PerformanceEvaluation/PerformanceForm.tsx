import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { useSubmitPerformance } from "../../services/mutation";

interface IEmployee {
  employeeId: string;
  performanceEvaluation: {
    resultOutOf70: number;
    resultOutOf30: number;
    fromDate: string;
    toDate: string;
  }[];
}

const PerformanceForm: React.FC = () => {
  const createPerformance = useSubmitPerformance();
  const [employeeId, setEmployeeId] = useState("");
  const [resultOutOf70, setResultOutOf70] = useState<string>("");
  const [resultOutOf30, setResultOutOf30] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [employee, setEmployee] = useState<IEmployee>({
    employeeId: "",
    performanceEvaluation: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result70 = parseFloat(resultOutOf70);
    const result30 = parseFloat(resultOutOf30);

    if (isNaN(result70) || isNaN(result30)) {
      alert("Please enter valid numbers for the results.");
      return;
    }

    const newEvaluation = {
      resultOutOf70: result70,
      resultOutOf30: result30,
      fromDate,
      toDate,
    };

    setEmployee((prev) => ({
      ...prev,
      employeeId,
      performanceEvaluation: [...prev.performanceEvaluation, newEvaluation],
    }));

    createPerformance.mutate({
      employeeId,
      self: newEvaluation.resultOutOf70,
      colleague: newEvaluation.resultOutOf30,
      from: newEvaluation.fromDate,
      to: newEvaluation.toDate,
    });

    setEmployeeId("");
    setResultOutOf70("");
    setResultOutOf30("");
    setFromDate("");
    setToDate("");

    console.log("Updated Employee:", {
      employeeId,
      performanceEvaluation: [...employee.performanceEvaluation, newEvaluation],
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Employee Performance
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Result Out of 70
            </label>
            <input
              type="number"
              value={resultOutOf70}
              onChange={(e) => setResultOutOf70(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="70"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Result Out of 30
            </label>
            <input
              type="number"
              value={resultOutOf30}
              onChange={(e) => setResultOutOf30(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="30"
              required
            />
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

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
