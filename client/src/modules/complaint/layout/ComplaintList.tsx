import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import { LuArrowDownUp, LuDownload } from 'react-icons/lu';
import { IComplaintList } from '../types/Complaint';
import { useAllComplaints } from '../services/queries';

const data: IComplaintList[]= [
  {
    empID: "FPC-1000",
    empName: "kaleab",
    complaintID: "COM-1248",
    complaintDate: "2021-06-01",
    category: "article 30",
    subCategory: "not wearing uniform",
    reason: "not wearing uniform",
    status: "decided"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    complaintID: "COM-1248",
    complaintDate: "2021-06-01",
    category: "article 30",
    subCategory: "not wearing uniform",
    reason: "not wearing uniform",
    status: "pending"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    complaintID: "COM-1248",
    complaintDate: "2021-06-01",
    category: "article 30",
    subCategory: "not wearing uniform",
    reason: "not wearing uniform",
    status: "pending"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    complaintID: "COM-1248",
    complaintDate: "2021-06-01",
    category: "article 30",
    subCategory: "not wearing uniform",
    reason: "not wearing uniform",
    status: "pending"
  },


]


const columnHelper = createColumnHelper<IComplaintList>();

const columns = [
  columnHelper.accessor("empID", {
    header: () => "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("empName", {
    header: () => "Employee Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("complaintID", {
    header: () => "Complaint ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("complaintDate", {
    header: () => "Complaint Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: () => "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("reason", {
    header: () => "Reason",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => {
      return info.getValue() === "pending" ? (
        <span className="text-cyan-500">{info.getValue()}</span>
      ) : (
        <span className="text-red-600">{info.getValue()}</span>
      );
    },
  }),
  columnHelper.accessor("attachments", {
    header: () => "Attachments",
    cell: (info) => {
  const attachments = info.getValue();
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

  return attachments && attachments.length > 0 ? (
    <div className="flex flex-col gap-2  bg-gray-100 rounded-lg shadow-md">
      {attachments.map((file, index) => (
        <button
          key={index}
          className="flex items-center justify-start gap-2 text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
          onClick={() =>
            downloadFile(
              `http://localhost:5000${file}`,
              `attachment-${index + 1}`
            )
          }
        >
          <LuDownload size={16} />
          <span>Attachment {index + 1}</span>
        </button>
      ))}
    </div>
  ) : (
    <span className="text-gray-500">No attachments</span>
  );
},
  }),
];

const ComplaintList = () => {
  const [data, setData] = useState<IComplaintList[]>([]);
      const dataQuery = useAllComplaints();
      console.log("Data" + dataQuery.data);
       useEffect(() => {
         if (Array.isArray(dataQuery.data?.complaints)) {
           console.log("Mapping data:", dataQuery.data);
           const mappedData = dataQuery.data?.complaints.map((complaint: any) => ({
             empID: complaint.employeeId,
             empName: complaint.empName,
             complaintID: complaint.complaintId,
             complaintDate: complaint.createdAt,
             category: complaint.category,
             subCategory: complaint.subCategory,
             reason: complaint.description,
             status: complaint.status,
             attachments: complaint.attachments || [],
           }));
           setData(mappedData);
         } else {
           console.error("Expected an array but got:", dataQuery.data);
         }
       }, [dataQuery.data]);


    const pdfFunction = () => {
        alert('pdf')
    
      }
      const excelFunction = () => {
        alert('excel')
      }
      const csvFunction = () => {
        alert('csv')
      }
      const printFunction = () => {
        alert('print')
      }
    
      const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
  return (
    <>
      <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>List of Complaint Received</h2>
      <div className="flex justify-end gap-2 mb-3">
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={pdfFunction}>PDF</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={excelFunction}>EXCEL</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={csvFunction}>CSV</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={printFunction}>PRINT</button>

      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.columnDef.header !== "actions" && <LuArrowDownUp className="ml-1" size={12} />}
                          
                        </div>
                      
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
          </table>
    
        </div>
   </>
  )
}

export default ComplaintList