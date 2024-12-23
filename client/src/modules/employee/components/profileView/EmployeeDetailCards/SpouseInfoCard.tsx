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

const SpouseInfoCard: React.FC<SpouseInfoCardProps> = ({
  spouseInfo,
  isEditable,
  onToggleEdit,
  onChange,
  onSave,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <h2 className="text-xl font-bold mb-4">Spouse Information</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field
        label="First Name"
        value={spouseInfo?.firstName || ''}
        name="spouseInfo.firstName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Middle Name"
        value={spouseInfo?.middleName || ''}
        name="spouseInfo.middleName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Last Name"
        value={spouseInfo?.lastName || ''}
        name="spouseInfo.lastName"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Date of Birth"
        value={spouseInfo?.dob ? spouseInfo.dob.toDateString() : ''}
        name="spouseInfo.dob"
        editable={false} // Date should not be edited directly with text input; modify the behavior as per your needs
        onChange={onChange}
      />
      <Field
        label="Phone Number"
        value={spouseInfo?.phoneNumber || ''}
        name="spouseInfo.phoneNumber"
        editable={isEditable}
        onChange={onChange}
      />
    </div>

    <h2 className="text-xl font-bold mb-4 mt-6">Spouse Address</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field
        label="Region"
        value={spouseInfo?.address?.region || ''}
        name="spouseInfo.address.region"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Subcity"
        value={spouseInfo?.address?.subcity || ''}
        name="spouseInfo.address.subcity"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Woreda"
        value={spouseInfo?.address?.woreda || ''}
        name="spouseInfo.address.woreda"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="House Number"
        value={spouseInfo?.address?.houseNumber || ''}
        name="spouseInfo.address.houseNumber"
        editable={isEditable}
        onChange={onChange}
      />
      <Field
        label="Leyu Bota"
        value={spouseInfo?.address?.leyuBota || ''}
        name="spouseInfo.address.leyuBota"
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

export default SpouseInfoCard;
