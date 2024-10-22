// import React from 'react';
// import Field from '../../Field';
// import { IEmployee } from '../../../../../common/Types/Employee';

// interface BasicInfoCardProps {
//   employee: IEmployee;
//   isEditable: boolean;
//   onToggleEdit: () => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSave: () => void;
// }

// const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ employee, isEditable, onToggleEdit, onChange, onSave }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//     <h2 className="text-xl font-bold mb-4">Basic Employee Information</h2>
//     <div className="grid grid-cols-3 gap-6 flex-grow">
//       <Field label="First Name" value={employee.firstName} name="firstName" editable={isEditable} onChange={onChange} />
//       <Field label="Last Name" value={employee.lastName} name="lastName" editable={isEditable} onChange={onChange} />
//       <Field label="Age" value={employee.age} name="age" editable={isEditable} onChange={onChange} />
//       <Field label="Title" value={employee.title} name="title" editable={isEditable} onChange={onChange} />
//       <Field label="Position" value={employee.position} name="position" editable={isEditable} onChange={onChange} />
//       <Field label="Department" value={employee.department} name="department" editable={isEditable} onChange={onChange} />
//       <Field label="Salary" value={employee.salary} name="salary" editable={isEditable} onChange={onChange} />
//       <Field
//   label="Employment Date"
//   value={employee.employmentDate ? employee.employmentDate.toDateString() : 'N/A'}
//   name="employmentDate"
//   editable={false}
//   onChange={onChange}
// />

//     </div>
//     <div className="flex justify-end mt-4">
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         onClick={isEditable ? onSave : onToggleEdit}
//       >
//         {isEditable ? 'Save' : 'Edit'}
//       </button>
//     </div>
//   </div>
// );

// export default BasicInfoCard;


import React from 'react';
import Field from '../../Field';
import { IEmployee } from '../../../../../common/Types/Employee';

interface BasicInfoCardProps {
  employee: IEmployee;
  isEditable: boolean;
  onToggleEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ employee, isEditable, onToggleEdit, onChange, onSave }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <h2 className="text-xl font-bold mb-4">Basic Employee Information</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field label="First Name" value={employee.firstName || 'N/A'} name="firstName" editable={isEditable} onChange={onChange} />
      <Field label="Last Name" value={employee.lastName || 'N/A'} name="lastName" editable={isEditable} onChange={onChange} />
      <Field label="Age" value={employee.age || 'N/A'} name="age" editable={isEditable} onChange={onChange} />
      <Field label="Title" value={employee.title || 'N/A'} name="title" editable={isEditable} onChange={onChange} />
      <Field label="Position" value={employee.position || 'N/A'} name="position" editable={isEditable} onChange={onChange} />
      <Field label="Department" value={employee.department || 'N/A'} name="department" editable={isEditable} onChange={onChange} />
      <Field label="Salary" value={employee.salary || 'N/A'} name="salary" editable={isEditable} onChange={onChange} />
      <Field label="Employment Date" value={employee.employmentDate ? employee.employmentDate.toDateString() : 'N/A'} name="employmentDate" editable={false} onChange={onChange} />
    </div>
    <div className="flex justify-end mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={isEditable ? onSave : onToggleEdit}
      >
        {isEditable ? 'Save' : 'Edit'}
      </button>
    </div>
  </div>
);

export default BasicInfoCard;
