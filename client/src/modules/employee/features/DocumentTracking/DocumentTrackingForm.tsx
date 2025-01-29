import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';

interface DocumentRecord {
  direction: 'In' | 'Out'; // Whether the document is incoming or outgoing
  documentType: string; // Type of document (e.g., Contract, Report, Memo)
  documentId: string; // Unique identifier for the document
  sender: string; // Who sent the document (for In) or who it was sent to (for Out)
  dateSent: string; // Date the document was sent
  dateReceived?: string; // Date the document was received (only for In)
  description: string; // Additional notes about the document
}

interface IEmployee {
  employeeId: string;
  documentRecords?: DocumentRecord[]; // Optional array of document records
}

const DocumentTrackingForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [direction, setDirection] = useState<'In' | 'Out'>('In');
  const [documentType, setDocumentType] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [sender, setSender] = useState('');
  const [dateSent, setDateSent] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [description, setDescription] = useState('');

  const [employee, setEmployee] = useState<IEmployee>({ employeeId: '', documentRecords: [] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDocumentRecord: DocumentRecord = {
      direction,
      documentType,
      documentId,
      sender,
      dateSent,
      dateReceived: direction === 'In' ? dateReceived : undefined, // Only include dateReceived for In
      description,
    };

    // Update the employee state with the new document record
    setEmployee((prev) => ({
      ...prev,
      employeeId,
      documentRecords: [...(prev.documentRecords || []), newDocumentRecord],
    }));

    // Reset the form fields
    setEmployeeId('');
    setDirection('In');
    setDocumentType('');
    setDocumentId('');
    setSender('');
    setDateSent('');
    setDateReceived('');
    setDescription('');

    // Log the updated employee object (for demonstration purposes)
    console.log('Updated Employee:', {
      employeeId,
      documentRecords: [...(employee.documentRecords || []), newDocumentRecord],
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaFileAlt className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Document Tracking</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid Container for 3 fields per row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Employee ID Field */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Direction (In/Out) */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as 'In' | 'Out')}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              >
                <option value="In">Incoming</option>
                <option value="Out">Outgoing</option>
              </select>
            </div>

            {/* Document Type */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Document Type</label>
              <input
                type="text"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Document ID */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Document ID</label>
              <input
                type="text"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Sender */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                {direction === 'In' ? 'Sender' : 'Recipient'}
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Date Sent and Date Received (for Incoming) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Date Sent</label>
              <input
                type="date"
                value={dateSent}
                onChange={(e) => setDateSent(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            {direction === 'In' && (
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Date Received</label>
                <input
                  type="date"
                  value={dateReceived}
                  onChange={(e) => setDateReceived(e.target.value)}
                  className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            )}

            {/* Description */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-3">
            <button
              type="submit"
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Document Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentTrackingForm;