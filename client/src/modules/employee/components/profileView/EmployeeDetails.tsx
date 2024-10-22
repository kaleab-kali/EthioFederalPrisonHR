// import React, { useState } from 'react';
// import { useOutletContext } from 'react-router-dom';

// interface Employee {
//   name: string;
//   id: string;
//   age: number;
//   title: string;
//   department: string;
//   position: string;
//   salary: string;
//   employmentDate: string;
//   manager: string;
//   motherName: string;
//   motherContact: string;
//   address: string;
//   emergencyContactName: string;
//   emergencyContactPhone: string;
// }

// const EmployeeDetails: React.FC = () => {
//   const employee = useOutletContext<Employee>();
//   const [editableCard, setEditableCard] = useState<string | null>(null);
//   const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedEmployee({ ...editedEmployee, [name]: value });
//   };

//   const toggleEdit = (card: string) => {
//     setEditableCard(editableCard === card ? null : card);
//   };

//   const handleSave = () => {
//     console.log('Updated Employee Data:', editedEmployee);
//     setEditableCard(null);
//   };

//   const renderField = (label: string, value: string | number, fieldName: keyof Employee) => (
//     <div className="col-span-1 mb-1">
//       <label className="text-sm text-gray-500">{label}</label>
//       {editableCard ? (
//         <input
//           type="text"
//           name={fieldName}
//           value={editedEmployee[fieldName]}
//           onChange={handleInputChange}
//           className="w-full p-1 mt-1 border rounded text-gray-700 font-bold"
//         />
//       ) : (
//         <p className="text-base font-bold mt-1 font-roboto">{value}</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="space-y-4">
//       {/* Basic Employee Information Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//         <h2 className="text-xl font-bold mb-4">Basic Employee Information</h2>
//         <div className="grid grid-cols-3 gap-6 flex-grow">
//           {renderField('Name', employee.name, 'name')}
//           {renderField('Age', employee.age, 'age')}
//           {renderField('Title', employee.title, 'title')}
//           {renderField('Department', employee.department, 'department')}
//           {renderField('Position', employee.position, 'position')}
//           {renderField('Salary', employee.salary, 'salary')}
//           {renderField('Employment Date', employee.employmentDate, 'employmentDate')}
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => toggleEdit('basic')}
//           >
//             {editableCard === 'basic' ? 'Save' : 'Edit'}
//           </button>
//         </div>
//       </div>

//       {/* Mother's Information Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//         <h2 className="text-xl font-bold mb-4">Mother's Information</h2>
//         <div className="grid grid-cols-3 gap-6 flex-grow">
//           {renderField("Mother's Name", employee.motherName, 'motherName')}
//           {renderField("Mother's Contact", employee.motherContact, 'motherContact')}
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => toggleEdit('mother')}
//           >
//             {editableCard === 'mother' ? 'Save' : 'Edit'}
//           </button>
//         </div>
//       </div>

//       {/* Address Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//         <h2 className="text-xl font-bold mb-4">Current Address</h2>
//         <div className="grid grid-cols-3 gap-6 flex-grow">
//           {renderField('Address', employee.address, 'address')}
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => toggleEdit('address')}
//           >
//             {editableCard === 'address' ? 'Save' : 'Edit'}
//           </button>
//         </div>
//       </div>

//       {/* Emergency Contact Information Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//         <h2 className="text-xl font-bold mb-4">Emergency Contact Information</h2>
//         <div className="grid grid-cols-3 gap-6 flex-grow">
//           {renderField('Emergency Contact Name', employee.emergencyContactName, 'emergencyContactName')}
//           {renderField('Emergency Contact Phone', employee.emergencyContactPhone, 'emergencyContactPhone')}
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => toggleEdit('emergency')}
//           >
//             {editableCard === 'emergency' ? 'Save' : 'Edit'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;


import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IEmployee } from '../../../../common/Types/Employee';
import BasicInfoCard from './EmployeeDetailCards/BasicInfoCard';
import MotherInfoCard from './EmployeeDetailCards/MotherInfoCard';
import AddressCard from './EmployeeDetailCards/AddressCard';
import EmergencyContactCard from './EmployeeDetailCards/EmergencyContactCard';
import SpouseInfoCard from './EmployeeDetailCards/SpouseInfoCard';

const EmployeeDetails: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const [editableCard, setEditableCard] = useState<string | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<IEmployee>(employee);

  const toggleEdit = (card: string) => {
    setEditableCard(editableCard === card ? null : card);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSave = () => {
    console.log('Updated Employee Data:', editedEmployee);
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
