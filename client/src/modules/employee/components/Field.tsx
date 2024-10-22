import React from 'react';

interface FieldProps {
  label: string;
  value: string | number | undefined;
  name: string;
  editable: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, value, name, editable, onChange }) => (
  <div className="col-span-1 mb-1">
    <label className="text-sm text-gray-500">{label}</label>
    {editable ? (
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full p-1 mt-1 border rounded text-gray-700 font-bold"
      />
    ) : (
      <p className="text-base font-bold mt-1 font-roboto">{value}</p>
    )}
  </div>
);

export default Field;
