import React, { useEffect, useState } from "react";
import { IEmployeeListTable } from "../EmployeeList";
import { useNavigate } from 'react-router-dom';
import {
    FiUser    
  } from "react-icons/fi";
  import { LuArrowDownUp } from "react-icons/lu";
  
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import { IEmployee } from "../../../common/Types/Employee";
import { useAllEmployees } from "../services/queries";


const columnHelper = createColumnHelper<IEmployeeListTable>();
const getColumns = (handleAction: (row: Row<IEmployeeListTable>) => void) => [
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: () => (
      <span className="flex items-center">
        <FiUser className="mr-2" size={16} /> First Name
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("department", {
    header: () => "Department",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("position", {
    header: () => "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "actions",
    id: "action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => handleAction(row)}
          className="px-3 py-1 border border-blue-500 text-blue-500 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        >
          View
        </button>
        <button
          onClick={() => handleAction(row)}
          className="px-3 py-1 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
        >
          Delete
        </button>
      </div>
    ),
  }),
];


const EmployeeListTable: React.FC = () => {
  const navigate = useNavigate();
  
  const [emplyees, setEmployees] = useState<IEmployeeListTable[]>([]);
  const employeesQuery = useAllEmployees();
  console.log("employees" + employeesQuery.data);

  // Update employees state when employeesQuery.data changes
  useEffect(() => {
    if (employeesQuery.data) {
      const mappedData = employeesQuery.data.map((employee: any) => ({
        empID: employee.empId,
        title: employee.title,
        firstName: employee.firstName,
        lastName: employee.lastName,
        department: employee.department,
        position: employee.position,
      }));
      setEmployees(mappedData);
    }
  }, [employeesQuery.data]);

  const handleAction = (row: Row<IEmployeeListTable>) => {
    console.log('Action button clicked for row:', row);
    console.log('Action button data row:', row.original);
    navigate(`profile/${row.original.empID}`);
  };

  const columns = getColumns(handleAction); 
  const table = useReactTable({
    data: emplyees,
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

export default EmployeeListTable;
