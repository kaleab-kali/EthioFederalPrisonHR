import React, { useState } from 'react';
import { FaUser, FaHeart, FaChild, FaHospital } from 'react-icons/fa';

interface HealthRecord {
  beneficiary: 'Employee' | 'Spouse' | 'Child'; 
  childName?: string; 
  costOfCoverage: number; 
  hospitalName: string;
  coverageStartDate: string; 
  coverageEndDate: string; 
}

interface IEmployee {
  employeeId: string;
  spouseName?: string; 
  children?: Array<{ name: string; dateOfBirth: string }>; // List of children (name and date of birth)
  healthRecords?: HealthRecord[]; 
}

const HealthRecordForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [beneficiary, setBeneficiary] = useState<'Employee' | 'Spouse' | 'Child'>('Employee');
  const [childName, setChildName] = useState('');
  const [costOfCoverage, setCostOfCoverage] = useState<number>(0);
  const [hospitalName, setHospitalName] = useState('');
  const [coverageStartDate, setCoverageStartDate] = useState('');
  const [coverageEndDate, setCoverageEndDate] = useState('');

  const [employee, setEmployee] = useState<IEmployee>({
    employeeId: '',
    spouseName: 'Jane Doe', 
    children: [
      { name: 'Child 1', dateOfBirth: '2010-05-15' }, 
      { name: 'Child 2', dateOfBirth: '2005-08-20' }, 
    ],
    healthRecords: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHealthRecord: HealthRecord = {
      beneficiary,
      childName: beneficiary === 'Child' ? childName : undefined,
      costOfCoverage,
      hospitalName,
      coverageStartDate,
      coverageEndDate,
    };

    // Update the employee state with the new health record
    setEmployee((prev) => ({
      ...prev,
      employeeId,
      healthRecords: [...(prev.healthRecords || []), newHealthRecord],
    }));

    // Reset the form fields
    setEmployeeId('');
    setBeneficiary('Employee');
    setChildName('');
    setCostOfCoverage(0);
    setHospitalName('');
    setCoverageStartDate('');
    setCoverageEndDate('');

   
    console.log('Updated Employee:', {
      employeeId,
      healthRecords: [...(employee.healthRecords || []), newHealthRecord],
    });
  };

  // Filter children who are under 18 years old
  const eligibleChildren = employee.children?.filter((child) => {
    const today = new Date();
    const birthDate = new Date(child.dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age < 18;
  });

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaHospital className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Health Record</h2>
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

          {/* Beneficiary (Employee, Spouse, Child) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Beneficiary</label>
            <select
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value as 'Employee' | 'Spouse' | 'Child')}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="Employee">Employee</option>
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
            </select>
          </div>

          {/* Child Name (if beneficiary is Child) */}
          {beneficiary === 'Child' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Child Name</label>
              <select
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              >
                <option value="">Select a child</option>
                {eligibleChildren?.map((child, index) => (
                  <option key={index} value={child.name}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Health Coverage Details */}
          <div className="grid grid-cols-4 gap-4">
            {/* Cost of Coverage */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Cost of Coverage</label>
              <input
                type="number"
                value={costOfCoverage}
                onChange={(e) => setCostOfCoverage(parseFloat(e.target.value))}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Hospital Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Coverage Start Date */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Coverage Start Date</label>
              <input
                type="date"
                value={coverageStartDate}
                onChange={(e) => setCoverageStartDate(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Coverage End Date */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Coverage End Date</label>
              <input
                type="date"
                value={coverageEndDate}
                onChange={(e) => setCoverageEndDate(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Health Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthRecordForm;