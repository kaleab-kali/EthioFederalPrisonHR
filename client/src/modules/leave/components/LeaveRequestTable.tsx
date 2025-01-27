import React, { useEffect, useState } from "react";
import { IleaveRequestList } from "../types/LeaveRequest";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  Table
} from "@tanstack/react-table";

import { LuArrowDownUp } from "react-icons/lu";
import { useAllLeaves } from "../services/queries";

const leaveRequestList: IleaveRequestList[] = [
    {
      empID: 'E123',
      fullName: 'Alice Johnson',
      from: new Date('2023-06-01'),
      to: new Date('2023-06-10'),
      reason: 'Family vacation',
      department: 'HR'
    },
    {
      empID: 'E124',
      fullName: 'Bob Smith',
      from: new Date('2023-07-05'),
      to: new Date('2023-07-15'),
      reason: 'Medical leave',
      department: 'Finance'
    },
    {
      empID: 'E125',
      fullName: 'Charlie Brown',
      from: new Date('2023-08-10'),
      to: new Date('2023-08-20'),
      reason: 'Conference',
      department: 'IT'
    },
    {
      empID: 'E126',
      fullName: 'David Lee',
      from: new Date('2023-09-01'),
      to: new Date('2023-09-07'),
      reason: 'Training',
      department: 'Marketing'
    },
    {
      empID: 'E127',
      fullName: 'Eva Green',
      from: new Date('2023-10-10'),
      to: new Date('2023-10-17'),
      reason: 'Personal leave',
      department: 'Sales'
    },
    {
      empID: 'E128',
      fullName: 'Frank Ocean',
      from: new Date('2023-11-01'),
      to: new Date('2023-11-05'),
      reason: 'Maternity leave',
      department: 'Logistics'
    },
    {
      empID: 'E129',
      fullName: 'Grace Hopper',
      from: new Date('2023-12-01'),
      to: new Date('2023-12-10'),
      reason: 'Research',
      department: 'Development'
    },
    {
      empID: 'E130',
      fullName: 'Hank Moody',
      from: new Date('2024-01-15'),
      to: new Date('2024-01-25'),
      reason: 'Vacation',
      department: 'Legal'
    },
    {
      empID: 'E131',
      fullName: 'Ivy League',
      from: new Date('2024-02-10'),
      to: new Date('2024-02-20'),
      reason: 'Work from home',
      department: 'R&D'
    },
    {
      empID: 'E132',
      fullName: 'Jack Daniels',
      from: new Date('2024-03-01'),
      to: new Date('2024-03-10'),
      reason: 'Sabbatical',
      department: 'Support'
    }
  ];
  
  const formatDate = (date: Date | string) => {
    // Ensure that the date is a valid Date object
    const formattedDate = new Date(date);
    return formattedDate instanceof Date && !isNaN(formattedDate.getTime())
      ? formattedDate.toLocaleDateString()
      : "Invalid date";
  };

const columnHelper = createColumnHelper<IleaveRequestList>();
function handleAction(row: Row<IleaveRequestList>): void {
  console.log("leave rquest row data", row);
}
const columns = [
  columnHelper.accessor("empID", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fullName", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("from", {
    header: () => "From",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("to", {
    header: () => "To",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("reason", {
    header: () => "Reason",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("department", {
    header: () => "Department",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "actions",
    id: "action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => handleAction(row)}
          className="px-3 py-1 border border-green-400 text-green-500 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        >
          Accept
        </button>
        <button
          onClick={() => handleAction(row)}
          className="px-3 py-1 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
        >
          Deny
        </button>
      </div>
    ),
  }),
];

const LeaveRequestTable = () => {
  const [data, setData] = useState<IleaveRequestList[]>([]);
        const dataQuery = useAllLeaves();
        console.log("Data" + dataQuery.data);
         useEffect(() => {
           if (dataQuery.data) {
             const mappedData = dataQuery.data.map((leave: any) => ({
               empID: leave.employeeId,
               fullName: leave.fullName,
               from: leave.from,
               to: leave.to,
               reason: leave.reason,
               department: leave.department
             }));
             setData(mappedData);
           }
         }, [dataQuery.data]);
    const table = useReactTable({
      data: data,
      columns,
      debugTable: true,
      getCoreRowModel: getCoreRowModel(),
    });
      return (
        <>
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
      );
    
};

export default LeaveRequestTable;
