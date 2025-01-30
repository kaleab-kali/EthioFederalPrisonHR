import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { useSubmitDocument } from "../../services/mutation";

interface DocumentRecord {
  documentType: "in" | "out";
  tag: "personal" | "organizational";
  documentNumber: string;
  empId: string;
  from: string;
  to: string;
  title: string;
  documentFile: File | null;
  docReceiverId: string;
  docSenderId: string;
  content: string;
  shelf: string;
  date: string;
  topic: string;
}

const DocumentTrackingForm: React.FC = () => {
  const createDocumentRecord = useSubmitDocument();
  const [document, setDocument] = useState<DocumentRecord>({
    documentType: "in",
    tag: "personal",
    documentNumber: "",
    empId: "",
    from: "",
    to: "",
    title: "",
    documentFile: null,
    docReceiverId: "",
    docSenderId: "",
    content: "",
    shelf: "",
    date: "",
    topic: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDocument({ ...document, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDocument((prev) => ({ ...prev, documentFile: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("empId", document.empId);
    formData.append("date", document.date);
    formData.append("docReceiverId", document.docReceiverId);
    formData.append("from", document.from);
    formData.append("to", document.to);
    formData.append("topic", document.topic);
    formData.append("shelf", document.shelf);
    formData.append("title", document.title);
    formData.append("documentType", document.documentType);
    formData.append("docSenderId", document.docSenderId);
    if (document.documentFile) {
      formData.append("documentFile", document.documentFile);
    }


    console.log("Submitted Document:", formData);
    formData.forEach((value, key) => console.log(key, value));

    createDocumentRecord.mutate(formData as any);

    // setDocument({
    //   documentType: "in",
    //   tag: "personal",
    //   documentNumber: "",
    //   empId: "",
    //   from: "",
    //   to: "",
    //   title: "",
    //   documentFile: null,
    //   docReceiverId: "",
    //   docSenderId: "",
    //   content: "",
    //   shelf: "",
    //   date: "",
    //   topic: "",
    // });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-8 border border-gray-200">
      <div className="flex items-center mb-6">
        <FaFileAlt className="text-3xl text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Document Tracking</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="empId"
              value={document.empId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Document Type
            </label>
            <select
              name="documentType"
              value={document.documentType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="in">Incoming</option>
              <option value="out">Outgoing</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="from"
            placeholder="From"
            value={document.from}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={document.to}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={document.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="content"
          placeholder="Description"
          value={document.content}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        ></textarea>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="shelf"
            placeholder="Shelf"
            value={document.shelf}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="date"
            value={document.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={document.topic}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="mb-4">
          <input
            type="file"
            id="documentFile"
            name="documentFile"
            placeholder="Upload Document"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="docReceiverId"
            placeholder="Receiver ID"
            value={document.docReceiverId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="docSenderId"
            placeholder="Sender ID"
            value={document.docSenderId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Submit Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentTrackingForm;
