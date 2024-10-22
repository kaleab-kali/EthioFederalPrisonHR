// import React from 'react';
// import Field from '../../Field';
// import { IEmployee } from '../../../../../common/Types/Employee';

// interface EmergencyContactCardProps {
//   emergencyContact: IEmployee['emergencyContact'];
//   isEditable: boolean;
//   onToggleEdit: () => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSave: () => void;
// }

// const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
//   emergencyContact,
//   isEditable,
//   onToggleEdit,
//   onChange,
//   onSave,
// }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//     <h2 className="text-xl font-bold mb-4">Emergency Contact Information</h2>
//     <div className="grid grid-cols-3 gap-6 flex-grow">
//       <Field
//         label="First Name"
//         value={emergencyContact.info.firstName}
//         name="emergencyContact.info.firstName"
//         editable={isEditable}
//         onChange={onChange}
//       />
//       <Field
//         label="Middle Name"
//         value={emergencyContact.info.middleName}
//         name="emergencyContact.info.middleName"
//         editable={isEditable}
//         onChange={onChange}
//       />
//       <Field
//         label="Last Name"
//         value={emergencyContact.info.lastName}
//         name="emergencyContact.info.lastName"
//         editable={isEditable}
//         onChange={onChange}
//       />
//       <Field
//         label="Phone Number"
//         value={emergencyContact.info.phoneNumber}
//         name="emergencyContact.info.phoneNumber"
//         editable={isEditable}
//         onChange={onChange}
//       />
//       <Field
//         label="Relationship"
//         value={emergencyContact.info.relationship}
//         name="emergencyContact.info.relationship"
//         editable={isEditable}
//         onChange={onChange}
//       />
//       <Field
//         label="Email"
//         value={emergencyContact.info.email}
//         name="emergencyContact.info.email"
//         editable={isEditable}
//         onChange={onChange}
//       />
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

// export default EmergencyContactCard;

import React from 'react';
import Field from '../../Field';
import { IEmployee } from '../../../../../common/Types/Employee';

interface EmergencyContactCardProps {
  emergencyContact: IEmployee['emergencyContact'];
  isEditable: boolean;
  onToggleEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
  emergencyContact,
  isEditable,
  onToggleEdit,
  onChange,
  onSave,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <h2 className="text-xl font-bold mb-4">Emergency Contact Information</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field
        label="First Name"
        value={emergencyContact?.info?.firstName || 'N/A'}
        name="emergencyContact.info.firstName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Middle Name"
        value={emergencyContact?.info?.middleName || 'N/A'}
        name="emergencyContact.info.middleName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Last Name"
        value={emergencyContact?.info?.lastName || 'N/A'}
        name="emergencyContact.info.lastName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Phone Number"
        value={emergencyContact?.info?.phoneNumber || 'N/A'}
        name="emergencyContact.info.phoneNumber"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Relationship"
        value={emergencyContact?.info?.relationship || 'N/A'}
        name="emergencyContact.info.relationship"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Email"
        value={emergencyContact?.info?.email || 'N/A'}
        name="emergencyContact.info.email"
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

export default EmergencyContactCard;
