// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumb from '../components/BreadCrumb';

// // Dummy list of employees for demonstration
// const dummyEmployees = [
//   { id: 'EMP001', name: 'John Doe', title: 'Software Engineer' },
//   { id: 'EMP002', name: 'Jane Smith', title: 'Project Manager' },
//   { id: 'EMP003', name: 'Alice Johnson', title: 'UX Designer' },
// ];

// const EmployeeListPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleRowClick = (employeeId: string) => {
//     navigate(`profile/${employeeId}`);
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-md h-full w-full">
//       <Breadcrumb />
//       <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">ID</th>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">Title</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dummyEmployees.map((employee) => (
//             <tr
//               key={employee.id}
//               className="cursor-pointer hover:bg-gray-100"
//               onClick={() => handleRowClick(employee.id)}
//             >
//               <td className="py-2 px-4 border-b">{employee.id}</td>
//               <td className="py-2 px-4 border-b">{employee.name}</td>
//               <td className="py-2 px-4 border-b">{employee.title}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeListPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BiSearch,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import Breadcrumb from "../components/BreadCrumb";
import mockData from "../utils/data.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";

// Define the type for your employee data
type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

const columnHelper = createColumnHelper<Employee>();

// Define columns with the Employee type
const columns: ColumnDef<Employee, any>[] = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <AiOutlineUser className="mr-2" size={16} /> ID
      </span>
    ),
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <AiOutlineUser className="mr-2" size={16} /> Name
      </span>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => (
      <span className="italic text-blue-600">{info.getValue()}</span>
    ),
    header: () => (
      <span className="flex items-center">
        <AiOutlineMail className="mr-2" size={16} /> Email
      </span>
    ),
  }),
  columnHelper.accessor("phone", {
    header: () => (
      <span className="flex items-center">
        <AiOutlinePhone className="mr-2" size={16} /> Phone
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
];

const EmployeeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [data] = React.useState<Employee[]>(() => [...mockData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable<Employee>({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleRowClick = (employeeId: string) => {
    navigate(`profile/${employeeId}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md min-h-full w-full">
      <Breadcrumb />
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>

      {/* Global Filter (Search) */}
      <div className="mb-4 relative">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <BiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
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
                      <BiChevronLeft className="ml-2" size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[2, 5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <BiChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <BiChevronLeft size={20} />
          </button>

          <span className="flex items-center">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <BiChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <BiChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;

// import { createColumnHelper, useReactTable } from '@tanstack/react-table'
// import React from 'react'
// import mockData from '../utils/data.json'


// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor("id", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center">
//         <AiOutlineUser className="mr-2" size={16} /> ID
//       </span>
//     ),
//   }),

//   columnHelper.accessor("name", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center">
//         <AiOutlineUser className="mr-2" size={16} /> Name
//       </span>
//     ),
//   }),
//   columnHelper.accessor("email", {
//     id: "email",
//     cell: (info) => (
//       <span className="italic text-blue-600">{info.getValue()}</span>
//     ),
//     header: () => (
//       <span className="flex items-center">
//         <AiOutlineMail className="mr-2" size={16} /> Email
//       </span>
//     ),
//   }),
//   columnHelper.accessor("phone", {
//     header: () => (
//       <span className="flex items-center">
//         <AiOutlinePhone className="mr-2" size={16} /> Phone
//       </span>
//     ),
//     cell: (info) => info.getValue(),
//   }),
// ];


// const EmployeeListpage = () => {
//   const [data] = React.useState(() => [...mockData]);

//   const table = useReactTable({
//     data,
//     columns
//   });

//   return (
//     <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

//     </div>
//   )
// }

// export default EmployeeListpage