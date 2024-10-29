import React, { useState } from "react";
import { IEmployeeListTable } from "../types/EmployeeList";
import {
    FiArrowDown, // Equivalent to ArrowUpDown
    FiChevronLeft,  // Equivalent to ChevronLeft
    FiChevronRight, // Equivalent to ChevronRight
    FiChevronsLeft, // Equivalent to ChevronsLeft
    FiChevronsRight, // Equivalent to ChevronsRight
    FiMail,         // Equivalent to Mail
    FiPhone,        // Equivalent to Phone
    FiSearch,       // Equivalent to Search
    FiUser          // Equivalent to User
  } from "react-icons/fi";
  import { LuArrowDownUp } from "react-icons/lu";
  
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";

const employeeList: IEmployeeListTable[] = [
  {
    empID: "FPC-1100",
    title: "Mr.",
    firstName: "John",
    lastName: "Doe",
    department: "Engineering",
    position: "Software Engineer",
  },
  {
    empID: "FPC-1101",
    title: "Ms.",
    firstName: "Jane",
    lastName: "Smith",
    department: "Marketing",
    position: "Marketing Manager",
  },
  {
    empID: "FPC-1102",
    title: "Dr.",
    firstName: "Emma",
    lastName: "Brown",
    department: "Research",
    position: "Lead Scientist",
  },
  {
    empID: "FPC-1103",
    title: "Prof.",
    firstName: "Robert",
    lastName: "Wilson",
    department: "Education",
    position: "Professor",
  },
  {
    empID: "FPC-1104",
    title: "Mr.",
    firstName: "Michael",
    lastName: "Johnson",
    department: "Sales",
    position: "Sales Executive",
  },
];

const columnHelper = createColumnHelper<IEmployeeListTable>();
const columns = [
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
        <button onClick={() => handleAction(row)}>Action</button>
      ),
  }),
];

function handleAction(row: Row<IEmployeeListTable>) {
    // Define what happens when the action button is clicked
    console.log('Action button clicked for row:', row);
    console.log('Action button data row:', row.original);
  }

const EmployeeListTable: React.FC = () => {
  const [emplyees, setEmployees] = useState<IEmployeeListTable[]>([]);
  const table = useReactTable({
    data: employeeList,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table);
  console.log("divder 0");
  console.log(table.getHeaderGroups());
  console.log("divder 1");
  console.log(table.getHeaderGroups()[0].headers[1]);
  console.log("header lsit", table.getHeaderGroups()[0].headers[0].column.columnDef.header)
  return (
    <>
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
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
