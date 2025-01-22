// import React from 'react';
// import Field from '../../Field';
// import { IEmployee } from '../../../../../common/Types/Employee';

// interface AddressCardProps {
//   address: IEmployee['currentAddress'];
//   isEditable: boolean;
//   onToggleEdit: () => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSave: () => void;
// }

// const AddressCard: React.FC<AddressCardProps> = ({ address, isEditable, onToggleEdit, onChange, onSave }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
//     <h2 className="text-xl font-bold mb-4">Current Address</h2>
//     <div className="grid grid-cols-3 gap-6 flex-grow">
//       <Field label="Region" value={address?.region} name="currentAddress.region" editable={isEditable} onChange={onChange} />
//       <Field label="Subcity" value={address?.subcity} name="currentAddress.subcity" editable={isEditable} onChange={onChange} />
//       <Field label="Woreda" value={address?.woreda} name="currentAddress.woreda" editable={isEditable} onChange={onChange} />
//       <Field label="House Number" value={address?.houseNumber} name="currentAddress.houseNumber" editable={isEditable} onChange={onChange} />
//       <Field label="Leyu Bota" value={address?.leyuBota} name="currentAddress.leyuBota" editable={isEditable} onChange={onChange} />
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

// export default AddressCard;
import React from 'react';
import Field from '../../Field';
import { IEmployee } from '../../../../../common/Types/Employee';

interface AddressCardProps {
  address: IEmployee['currentAddress'];
  isEditable: boolean;
  onToggleEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, isEditable, onToggleEdit, onChange, onSave }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <h2 className="text-xl font-bold mb-4">Current Address</h2>
    <div className="grid grid-cols-3 gap-6 flex-grow">
      <Field label="Region" value={address?.region} name="currentAddress.region" editable={isEditable} onChange={onChange} />
      <Field label="Subcity" value={address?.subcity} name="currentAddress.subcity" editable={isEditable} onChange={onChange} />
      <Field label="Woreda" value={address?.woreda} name="currentAddress.woreda" editable={isEditable} onChange={onChange} />
      <Field label="House Number" value={address?.houseNumber} name="currentAddress.houseNumber" editable={isEditable} onChange={onChange} />
      <Field label="Leyu Bota" value={address?.leyuBota} name="currentAddress.leyuBota" editable={isEditable} onChange={onChange} />
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

export default AddressCard;
