import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { DocumentRecord, IEmployee } from "../../../../common/Types/Employee";
import { useFetchDocument } from "../../services/queries";
import { LuDownload } from "react-icons/lu";
import { EthDateTime } from "ethiopian-calendar-date-converter";

const EmployeeDocuments: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const {
    data: documentData,
    isLoading,
    error,
  } = useFetchDocument(employee.empId);
  const [inActiveIndex, setInActiveIndex] = useState<number | null>(null);
  const [outActiveIndex, setOutActiveIndex] = useState<number | null>(null);

  const toggleInAccordion = () => {
    setInActiveIndex(inActiveIndex === null ? 0 : null);
  };
   const downloadFile = (url: RequestInfo | URL, filename: string) => {
     fetch(url)
       .then((response) => response.blob())
       .then((blob) => {
         const link = document.createElement("a");
         link.href = URL.createObjectURL(blob);
         link.download = filename;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       })
       .catch((error) => {
         console.error("Error downloading file:", error);
         alert("Error downloading file");
       });
   };

  const toggleOutAccordion = () => {
    setOutActiveIndex(outActiveIndex === null ? 0 : null);
  };
const convertToEthiopianDate = (dateString: string) => {
  const date = new Date(dateString);
  const ethDate = EthDateTime.fromEuropeanDate(date);
  return `${ethDate.year}/${ethDate.month}/${ethDate.date}`;
};
const formatDate = (date: Date | string) => {
  // Ensure that the date is a valid Date object
  const formattedDate = new Date(date);
  return formattedDate instanceof Date && !isNaN(formattedDate.getTime())
    ? formattedDate.toLocaleDateString()
    : "Invalid date";
};
  const renderDocumentTable = (records: DocumentRecord[]) => (
    <table className="min-w-full bg-white border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Title
          </th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Date
          </th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Document Number
          </th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Tag
          </th>
          <th className="py-3 px-4 text-left text-sm font-semibold bg-blue-100 border-b border-gray-200">
            Shelf
          </th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => {
          const date = new Date(record.date);
          const formattedDate = !isNaN(date.getTime())
            ? date.toDateString()
            : "Invalid Date";

          return (
            <tr key={index} className="hover:bg-blue-50">
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {record.title || "N/A"}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {convertToEthiopianDate(formatDate(record.date))}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {record.topic || "N/A"}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                <button
                          key={index}
                          className="flex items-center justify-start gap-2 text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
                          onClick={() =>
                            downloadFile(
                              `http://localhost:5000${record.documentFile}`,
                              `attachment-${index + 1}`
                            )
                          }
                        >
                          <LuDownload size={16} />
                          <span>File {index + 1}</span>
                        </button>
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {record.shelf}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure `documentData` is an array
  const filteredInRecords = Array.isArray(documentData)
    ? documentData.filter((record) => record.documentType === "in")
    : [];
  const filteredOutRecords = Array.isArray(documentData)
    ? documentData.filter((record) => record.documentType === "out")
    : [];

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
            {renderDocumentTable(filteredInRecords)}
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
            {renderDocumentTable(filteredOutRecords)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDocuments;
