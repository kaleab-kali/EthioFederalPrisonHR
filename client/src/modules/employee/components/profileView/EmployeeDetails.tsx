import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IEmployee } from '../../../../common/Types/Employee';
import BasicInfoCard from './EmployeeDetailCards/BasicInfoCard';
import MotherInfoCard from './EmployeeDetailCards/MotherInfoCard';
import AddressCard from './EmployeeDetailCards/AddressCard';
import EmergencyContactCard from './EmployeeDetailCards/EmergencyContactCard';
import SpouseInfoCard from './EmployeeDetailCards/SpouseInfoCard';
import { useUpdateEmployee } from '../../services/mutation';

const EmployeeDetails: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const [editableCard, setEditableCard] = useState<string | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<IEmployee>(employee);
  const updateEmp= useUpdateEmployee();

  const toggleEdit = (card: string) => {
    setEditableCard(editableCard === card ? null : card);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSave = () => {
    console.log('Updated Employee Data:', editedEmployee);
    const empId = employee.empId;
    updateEmp.mutate({ id: empId, data: editedEmployee });
    setEditableCard(null);
  };

  return (
    <div className="space-y-4">
      {/* Basic Information */}
      <BasicInfoCard
        employee={editedEmployee}
        isEditable={editableCard === 'basic'}
        onToggleEdit={() => toggleEdit('basic')}
        onChange={handleInputChange}
        onSave={handleSave}
      />

      {/* Mother's Information */}
      <MotherInfoCard
        employee={editedEmployee}
        isEditable={editableCard === 'mother'}
        onToggleEdit={() => toggleEdit('mother')}
        onChange={handleInputChange}
        onSave={handleSave}
      />

      {/* Address */}
      <AddressCard
        address={editedEmployee.currentAddress}
        isEditable={editableCard === 'address'}
        onToggleEdit={() => toggleEdit('address')}
        onChange={handleInputChange}
        onSave={handleSave}
      />

      {/* Emergency Contact */}
      <EmergencyContactCard
        emergencyContact={editedEmployee.emergencyContact}
        isEditable={editableCard === 'emergency'}
        onToggleEdit={() => toggleEdit('emergency')}
        onChange={handleInputChange}
        onSave={handleSave}
      />

      {/* Spouse Info (conditionally rendered based on marital status) */}
      {editedEmployee.maritalStatus === 'married' && (
        <SpouseInfoCard
          spouseInfo={editedEmployee.spouseInfo}
          isEditable={editableCard === 'spouse'}
          onToggleEdit={() => toggleEdit('spouse')}
          onChange={handleInputChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
