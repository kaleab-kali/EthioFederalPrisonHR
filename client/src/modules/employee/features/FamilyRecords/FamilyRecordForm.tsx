import React, { useState } from 'react';
import { FaUser, FaHeart, FaChild, FaTimesCircle, FaUserSlash } from 'react-icons/fa';
import { useSubmitFamily } from '../../services/mutation';

interface FamilyRecord {
  eventType: 'Marriage' | 'Child' | 'Divorce' | 'Widowed'; 
  spouseName?: string; 
  spousePhoneNumber?: string; 
  spouseEthnicity?: string; 
  spouseAddress?: {
    region: string;
    subcity: string;
    woreda: string;
  }; 
  spouseDateOfBirth?: string; 
  childName?: string;
  childDateOfBirth?: string; 
  divorceDate?: string; 
  widowedDate?: string; 
}

interface IEmployee {
  employeeId: string;
  familyRecords?: FamilyRecord[]; 
}

const FamilyRecordForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const createFamilyRecord = useSubmitFamily()
  const [eventType, setEventType] = useState<'Marriage' | 'Child' | 'Divorce' | 'Widowed'>('Marriage');
  const [spouseName, setSpouseName] = useState('');
  const [spousePhoneNumber, setSpousePhoneNumber] = useState('');
  const [spouseEthnicity, setSpouseEthnicity] = useState('');
  const [spouseAddress, setSpouseAddress] = useState({
    region: '',
    subcity: '',
    woreda: '',
  });
  const [spouseDateOfBirth, setSpouseDateOfBirth] = useState('');
  const [childName, setChildName] = useState('');
  const [childDateOfBirth, setChildDateOfBirth] = useState('');
  const [divorceDate, setDivorceDate] = useState('');
  const [widowedDate, setWidowedDate] = useState('');

  const [employee, setEmployee] = useState<IEmployee>({ employeeId: '', familyRecords: [] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFamilyRecord: FamilyRecord = {
      eventType,
      spouseName: eventType === 'Marriage' || eventType === 'Divorce' || eventType === 'Widowed' ? spouseName : undefined,
      spousePhoneNumber: eventType === 'Marriage' ? spousePhoneNumber : undefined,
      spouseEthnicity: eventType === 'Marriage' ? spouseEthnicity : undefined,
      spouseAddress: eventType === 'Marriage' ? spouseAddress : undefined,
      spouseDateOfBirth: eventType === 'Marriage' ? spouseDateOfBirth : undefined,
      childName: eventType === 'Child' ? childName : undefined,
      childDateOfBirth: eventType === 'Child' ? childDateOfBirth : undefined,
      divorceDate: eventType === 'Divorce' ? divorceDate : undefined,
      widowedDate: eventType === 'Widowed' ? widowedDate : undefined,
    };

    // Update the employee state with the new family record
    setEmployee((prev) => ({
      ...prev,
      employeeId,
      familyRecords: [...(prev.familyRecords || []), newFamilyRecord],
    }));
    createFamilyRecord.mutate({id:employeeId, data:newFamilyRecord})

    // Reset the form fields
    setEmployeeId('');
    setEventType('Marriage');
    setSpouseName('');
    setSpousePhoneNumber('');
    setSpouseEthnicity('');
    setSpouseAddress({ region: '', subcity: '', woreda: '' });
    setSpouseDateOfBirth('');
    setChildName('');
    setChildDateOfBirth('');
    setDivorceDate('');
    setWidowedDate('');

    
    console.log('Updated Employee:', {
      employeeId,
      familyRecords: [...(employee.familyRecords || []), newFamilyRecord],
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaUser className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Family Record</h2>
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

          {/* Event Type (Marriage, Child, Divorce, Widowed) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as 'Marriage' | 'Child' | 'Divorce' | 'Widowed')}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="Marriage">New Marriage</option>
              <option value="Child">Have Kids</option>
              <option value="Divorce">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Fields based on Event Type */}
          <div className="grid grid-cols-4 gap-4">
            {/* Spouse Name (for Marriage, Divorce, or Widowed) */}
            {(eventType === 'Marriage' || eventType === 'Divorce' || eventType === 'Widowed') && (
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Spouse Name</label>
                <input
                  type="text"
                  value={spouseName}
                  onChange={(e) => setSpouseName(e.target.value)}
                  className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            )}

            {/* Additional Fields for New Marriage */}
            {eventType === 'Marriage' && (
              <>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Spouse Phone Number</label>
                  <input
                    type="text"
                    value={spousePhoneNumber}
                    onChange={(e) => setSpousePhoneNumber(e.target.value)}
                    className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Spouse Ethnicity</label>
                  <input
                    type="text"
                    value={spouseEthnicity}
                    onChange={(e) => setSpouseEthnicity(e.target.value)}
                    className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Spouse Address</label>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Region"
                      value={spouseAddress.region}
                      onChange={(e) => setSpouseAddress({ ...spouseAddress, region: e.target.value })}
                      className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Subcity"
                      value={spouseAddress.subcity}
                      onChange={(e) => setSpouseAddress({ ...spouseAddress, subcity: e.target.value })}
                      className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Woreda"
                      value={spouseAddress.woreda}
                      onChange={(e) => setSpouseAddress({ ...spouseAddress, woreda: e.target.value })}
                      className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Spouse Date of Birth</label>
                  <input
                    type="date"
                    value={spouseDateOfBirth}
                    onChange={(e) => setSpouseDateOfBirth(e.target.value)}
                    className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
              </>
            )}

            {/* Child Name and Date of Birth (for Child) */}
            {eventType === 'Child' && (
              <>
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Child Name</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Child Date of Birth</label>
                  <input
                    type="date"
                    value={childDateOfBirth}
                    onChange={(e) => setChildDateOfBirth(e.target.value)}
                    className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
              </>
            )}

            {/* Divorce Date (for Divorce) */}
            {eventType === 'Divorce' && (
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Divorce Date</label>
                <input
                  type="date"
                  value={divorceDate}
                  onChange={(e) => setDivorceDate(e.target.value)}
                  className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            )}

            {/* Widowed Date (for Widowed) */}
            {eventType === 'Widowed' && (
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700">Widowed Date</label>
                <input
                  type="date"
                  value={widowedDate}
                  onChange={(e) => setWidowedDate(e.target.value)}
                  className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Family Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyRecordForm;