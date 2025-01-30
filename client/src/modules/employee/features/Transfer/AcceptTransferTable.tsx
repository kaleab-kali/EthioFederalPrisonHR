import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { LuArrowDownUp } from 'react-icons/lu';

interface Employee {
  employeeId: string;
  profileAvatar: string;
  fullName: string;
  branch: string;
  position: string;
  department: string;
}

const data: Employee[] = [
  {
    employeeId: 'E001',
    profileAvatar: 'https://via.placeholder.com/40',
    fullName: 'John Doe',
    branch: 'New York',
    position: 'Software Engineer',
    department: 'Engineering',
  },
  {
    employeeId: 'E002',
    profileAvatar: 'https://via.placeholder.com/40',
    fullName: 'Jane Smith',
    branch: 'San Francisco',
    position: 'Product Manager',
    department: 'Product',
  },
  // Add more data as needed
];

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'employeeId',
    header: 'Employee ID',
  },
  {
    accessorKey: 'profileAvatar',
    header: 'Profile',
    cell: (info) => (
      <img src={info.getValue() as string} alt="Profile" className="w-10 h-10 rounded-full" />
    ),
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'branch',
    header: 'Branch',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex space-x-2">
        <button className="px-3 py-1 border border-green-500 text-green-500 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300">Accept</button>
        <button className="px-3 py-1 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300">Deny</button>
      </div>
    ),
  },
];

const AcceptTransferTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
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
                        ? 'cursor-pointer select-none flex items-center'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.columnDef.header !== 'actions' && (
                      <LuArrowDownUp className="ml-1" size={12} />
                    )}
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
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptTransferTable;