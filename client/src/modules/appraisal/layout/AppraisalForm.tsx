import React, { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

interface IAppraisalForm {
  employeeID: string;
  score70: number;
  score30: number;
  currentLevel: string;
  appraisalLevel: string;
  position: string;
  department: string;
  disciplinaryDedication: number;
  remark: string;
}

const AppraisalForm: React.FC = () => {
  const [form, setForm] = useState<IAppraisalForm>({
    employeeID: '',
    score70: 0,
    score30: 0,
    currentLevel: '',
    appraisalLevel: '',
    position: '',
    department: '',
    disciplinaryDedication: 0,
    remark: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const positions = ['Position 1', 'Position 2', 'Position 3'];
  const departments = ['Department A', 'Department B', 'Department C'];

  return (
    <div className="flex flex-row justify-between p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Appraisal Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeID">Employee ID</label>
            <input 
              type="text" 
              name="employeeID" 
              value={form.employeeID} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter Employee ID"
            />
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="currentLevel">Current Level</label>
              <input 
                type="text" 
                name="currentLevel" 
                value={form.currentLevel} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Enter Current Level"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="appraisalLevel">Appraisal Level</label>
              <input 
                type="text" 
                name="appraisalLevel" 
                value={form.appraisalLevel} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Enter Appraisal Level"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="position">Position</label>
              <select
                name="position" 
                value={form.position} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Select position</option>
                {positions.map((position) => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="department">Department</label>
              <select
                name="department" 
                value={form.department} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Select department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="score70">Score out of 70</label>
              <input 
                type="number" 
                name="score70" 
                value={form.score70} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Enter Score out of 70"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="score30">Score out of 30</label>
              <input 
                type="number" 
                name="score30" 
                value={form.score30} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Enter Score out of 30"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700" htmlFor="disciplinaryDedication">Disciplinary Dedication</label>
              <input 
                type="number" 
                name="disciplinaryDedication" 
                value={form.disciplinaryDedication} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Enter Disciplinary Dedication"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="remark">Remark</label>
            <textarea 
              name="remark" 
              value={form.remark} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Enter Remark"
            ></textarea>
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
        <FaClipboardList size="80%" className="text-gray-300" />
      </div>
    </div>
  );
};

export default AppraisalForm;
