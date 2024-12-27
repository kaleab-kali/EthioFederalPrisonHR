import React, { useEffect, useState } from "react";
import { IEmployeeListTable } from "../EmployeeList";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { LuArrowDownUp,LuChevronLeft,LuChevronRight,LuChevronsLeft,LuChevronsRight,LuSearch } from "react-icons/lu";
import mockData from "../../../common/utils/dummy_employees.json";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
  const [data] = useState<any>(() => [...emplyees]);
  const employeeList: IEmployeeListTable[] = data.map((employee) => ({
    empID: employee.empId,
    title: employee.title,
    firstName: employee.firstName,
    lastName: employee.lastName,
    department: employee.department,
    position: employee.position,
  }));

  const [employees] = useState<IEmployeeListTable[]>(()=>[...employeeList]);

  const [sorting, setSorting] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleAction = (row: Row<IEmployeeListTable>) => {
    console.log("Action button clicked for row:", row);
    console.log("Action button data row:", row.original);
    navigate(`profile/${row.original.empId}`);
  };

  const columns = getColumns(handleAction);
  const table = useReactTable({
    data: employees,
    columns,
    debugTable: true,
    
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  console.log('row model', table.getRowModel().rows[0].getVisibleCells())
  console.log('page size gt', table.getPageCount)
  console.log('page size', table.getState().pagination.pageSize)
  return (
    <>
    <h1 className="px-2 sm:px-4 lg:px-6 mb-3 font-poppins ">List of Employees</h1>
    <div className="flex flex-col min-h-screen  px-2 sm:px-4 lg:px-6">
    <div className="mb-4 relative">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <LuSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
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
                      {header.column.columnDef.header !== "actions" && (
                        <LuArrowDownUp className="ml-1" size={12} />
                      )}
                      {/* <LuArrowDownUp className="ml-1" size={12} /> */}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
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
            <LuChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <LuChevronLeft size={20} />
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
            <LuChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <LuChevronsRight size={20} />
          </button>
        </div>
      </div>

      </div>
    </>
  );
};

export default EmployeeListTable;
