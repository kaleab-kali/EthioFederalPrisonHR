import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useSubmitLeave } from '../services/mutation';

interface ILeaveRequestForm {
  employeeId: string;
  from: string;
  to: string;
  leaveType: string;
  reason: string;
  delegatedTo: string;
  numberOfDays: number;
}

const LeaveRequestForm: React.FC = () => {
  const leaveForm= useSubmitLeave();
  const [form, setForm] = useState<ILeaveRequestForm>({
    employeeId: '',
    from: '',
    to: '',
    leaveType: '',
    reason: '',
    delegatedTo: '',
    numberOfDays: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const calculateDays = () => {
    if (form.from && form.to) {
      const fromDate = new Date(form.from);
      const toDate = new Date(form.to);
      const timeDifference = toDate.getTime() - fromDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24) + 1; // Add 1 to include both start and end dates
      setForm({ ...form, numberOfDays: daysDifference });
    }
  };

  useEffect(() => {
    calculateDays();
  }, [form.from, form.to]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    leaveForm.mutate(form)
  };

  const leaveTypes = ['sick leave', 'annual leave', 'maternity leave', 'paternity leave'];

  return (
    <div className="flex flex-row justify-between p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Leave Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeId">Employee ID</label>
            <input 
              type="text" 
              name="employeeId" 
              value={form.employeeId} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter Employee ID"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="from">From</label>
              <input 
                type="date" 
                name="from" 
                value={form.from} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="to">To</label>
              <input 
                type="date" 
                name="to" 
                value={form.to} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="leaveType">Leave Type</label>
            <select
              name="leaveType" 
              value={form.leaveType} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select leave type</option>
              {leaveTypes.map((leaveType) => (
                <option key={leaveType} value={leaveType}>{leaveType}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="reason">Reason</label>
            <textarea 
              name="reason" 
              value={form.reason} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter Reason"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="delegatedTo">Delegated To</label>
            <input 
              type="text" 
              name="delegatedTo" 
              value={form.delegatedTo} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter Name of Delegated Person"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="numberOfDays">Number of Days</label>
            <input 
              type="number" 
              name="numberOfDays" 
              value={form.numberOfDays} 
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-start">
            <button 
              type="submit" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <FaCalendarAlt size="80%" className="text-gray-300" />
      </div>
    </div>
  );
};

export default LeaveRequestForm;
