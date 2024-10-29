// import React from 'react';
// import Field from '../../Field';
// import { IEmployee } from '../../../../../common/Types/Employee';

// interface MotherInfoCardProps {
//   employee: IEmployee;
//   isEditable: boolean;
//   onToggleEdit: () => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSave: () => void;
// }

// const MotherInfoCard: React.FC<MotherInfoCardProps> = ({ employee, isEditable, onToggleEdit, onChange, onSave }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//     <h2 className="text-xl font-bold mb-4">Mother's Information</h2>
//     <div className="grid grid-cols-3 gap-6 flex-grow">
//       <Field label="Mother's First Name" value={employee.motherInformation.firstName} name="motherInformation.firstName" editable={isEditable} onChange={onChange} />
//       <Field label="Mother's Middle Name" value={employee.motherInformation.middleName} name="motherInformation.middleName" editable={isEditable} onChange={onChange} />
//       <Field label="Mother's Last Name" value={employee.motherInformation.lastName} name="motherInformation.lastName" editable={isEditable} onChange={onChange} />
//       <Field label="Mother's Phone Number" value={employee.motherInformation.phoneNumber.number} name="motherInformation.phoneNumber.number" editable={isEditable} onChange={onChange} />
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

// export default MotherInfoCard;

import React from 'react';
import Field from '../../Field';
import { IEmployee } from '../../../../../common/Types/Employee';


interface MotherInfoCardProps {
  employee: IEmployee;
  isEditable: boolean;
  onToggleEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const MotherInfoCard: React.FC<MotherInfoCardProps> = ({ employee, isEditable, onToggleEdit, onChange, onSave }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <h2 className="text-xl font-bold mb-4">Mother's Information</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field
        label="Mother's First Name"
        value={employee.motherInformation?.firstName}
        name="motherInformation.firstName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Mother's Middle Name"
        value={employee.motherInformation?.middleName}
        name="motherInformation.middleName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Mother's Last Name"
        value={employee.motherInformation?.lastName}
        name="motherInformation.lastName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Mother's Phone Number"
        value={employee.motherInformation?.phoneNumber?.number}
        name="motherInformation.phoneNumber.number"
        editable={isEditable}
        onChange={onChange}
      />
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

export default MotherInfoCard;
