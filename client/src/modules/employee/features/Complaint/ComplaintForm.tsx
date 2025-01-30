import React, { useState } from 'react';

export interface ComplaintDocument {
  employeeId: string;
  category: string;
  complaint: string;
  description: string;
  complaintId: string;
  status: 'sent' | 'pending' | 'reject' | 'inprogress' | 'guilt' | 'not guilt';
  evidenceFiles?: string[];
  comment?: string;
}

const ComplaintUpdateForm: React.FC = () => {
 
  const [complaintId, setComplaintId] = useState('');
  const [status, setStatus] = useState<'sent' | 'pending' | 'reject' | 'inprogress' | 'guilt' | 'not guilt'>('sent');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: ComplaintDocument = {
      employeeId: 'FPC-1003', 
      category: 'General', 
      complaint: 'Sample Complaint', 
      description: 'Sample Description', 
      complaintId,
      status,
      comment,
      evidenceFiles: file ? [file.name] : undefined, 
    };

    
    console.log('Form Data:', formData);

    setComplaintId('');
    setStatus('sent');
    setComment('');
    setFile(null);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Complaint Status</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complaint ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Complaint ID</label>
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'sent' | 'pending' | 'reject' | 'inprogress' | 'guilt' | 'not guilt')
              }
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="sent">Sent</option>
              <option value="pending">Pending</option>
              <option value="reject">Reject</option>
              <option value="inprogress">In Progress</option>
              <option value="guilt">Guilt</option>
              <option value="not guilt">Not Guilt</option>
            </select>
          </div>

          {/* Comment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows={3}
              required
            />
          </div>

          {/* File Attachment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">File Attachment</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintUpdateForm;