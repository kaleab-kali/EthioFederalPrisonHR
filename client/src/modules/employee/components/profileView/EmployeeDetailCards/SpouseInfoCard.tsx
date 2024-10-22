// import React from 'react';
// import Field from '../../Field';
// import { IEmployee } from '../../../../../common/Types/Employee';

// interface SpouseInfoCardProps {
//   spouseInfo?: IEmployee['spouseInfo'];
//   isEditable: boolean;
//   onToggleEdit: () => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSave: () => void;
// }

// const SpouseInfoCard: React.FC<SpouseInfoCardProps> = ({ spouseInfo, isEditable, onToggleEdit, onChange, onSave }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//     <h2 className="text-xl font-bold mb-4">Spouse Information</h2>
//     <div className="grid grid-cols-3 gap-6 flex-grow">
//       <Field label="First Name" value={spouseInfo?.firstName} name="spouseInfo.firstName" editable={isEditable} onChange={onChange} />
//       <Field label="Middle Name" value={spouseInfo?.middleName} name="spouseInfo.middleName" editable={isEditable} onChange={onChange} />
//       <Field label="Last Name" value={spouseInfo?.lastName} name="spouseInfo.lastName" editable={isEditable} onChange={onChange} />
//       <Field label="Date of Birth" value={spouseInfo?.dob?.toDateString()} name="spouseInfo.dob" editable={false} onChange={onChange} />
//       <Field label="Phone Number" value={spouseInfo?.phoneNumber} name="spouseInfo.phoneNumber" editable={isEditable} onChange={onChange} />
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

// export default SpouseInfoCard;


import React from 'react';
import Field from '../../Field';
import { IEmployee } from '../../../../../common/Types/Employee';

interface SpouseInfoCardProps {
  spouseInfo?: IEmployee['spouseInfo'];
  isEditable: boolean;
  onToggleEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const SpouseInfoCard: React.FC<SpouseInfoCardProps> = ({ spouseInfo, isEditable, onToggleEdit, onChange, onSave }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <h2 className="text-xl font-bold mb-4">Spouse Information</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field label="First Name" value={spouseInfo?.firstName || 'N/A'} name="spouseInfo.firstName" editable={isEditable} onChange={onChange} />
      <Field label="Middle Name" value={spouseInfo?.middleName || 'N/A'} name="spouseInfo.middleName" editable={isEditable} onChange={onChange} />
      <Field label="Last Name" value={spouseInfo?.lastName || 'N/A'} name="spouseInfo.lastName" editable={isEditable} onChange={onChange} />
      <Field label="Date of Birth" value={spouseInfo?.dob ? spouseInfo.dob.toDateString() : 'N/A'} name="spouseInfo.dob" editable={false} onChange={onChange} />
      <Field label="Phone Number" value={spouseInfo?.phoneNumber || 'N/A'} name="spouseInfo.phoneNumber" editable={isEditable} onChange={onChange} />
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

export default SpouseInfoCard;

