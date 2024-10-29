import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IEmployee, DocumentRecord } from '../../../../common/Types/Employee';

const EmployeeDocuments: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const [inActiveIndex, setInActiveIndex] = useState<number | null>(null);
  const [outActiveIndex, setOutActiveIndex] = useState<number | null>(null);

  const toggleInAccordion = () => {
    setInActiveIndex(inActiveIndex === null ? 0 : null);
  };

  const toggleOutAccordion = () => {
    setOutActiveIndex(outActiveIndex === null ? 0 : null);
  };

  const renderDocumentTable = (records: DocumentRecord[]) => (
    <table className="min-w-full bg-white border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Header</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Date</th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">Type</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index} className="hover:bg-blue-50">
            <td className="py-3 px-4 border-b border-gray-200 text-sm">{record.header}</td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">
              {(record.dateIn || record.dateOut)?.toDateString()}
            </td>
            <td className="py-3 px-4 border-b border-gray-200 text-sm">{record.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="mb-4 shadow-lg rounded-lg bg-white">
        <button
          onClick={toggleInAccordion}
          className="w-full text-left py-4 px-6 bg-slate-200 text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
        >
          IN
        </button>
        {inActiveIndex !== null && (
          <div className="p-2 bg-white rounded-b-lg">
            {renderDocumentTable(employee.documentRecords?.filter(record => record.dateIn) ?? [])}
          </div>
        )}
      </div>

      <div className="mb-4 shadow-lg rounded-lg bg-white">
        <button
          onClick={toggleOutAccordion}
          className="w-full text-left py-4 px-6 bg-slate-200 text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
        >
          OUT
        </button>
        {outActiveIndex !== null && (
          <div className="p-6 bg-white rounded-b-lg">
            {renderDocumentTable(employee.documentRecords?.filter(record => record.dateOut) ?? [])}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDocuments;
