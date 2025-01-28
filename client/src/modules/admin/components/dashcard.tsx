// import * as React from "react";

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';

interface EmployeeStatsProps {
  count: number;
  newEmployees: number;
  onEmployeeClick?: () => void;
  className?: string;
}

// interface StatBadgeProps {
//   value: string;
//   className?: string;
//   onClick?: () => void;
//   ariaLabel?: string;
// }

// function StatBadge({ 
//   value, 
//   className = "", 
//   onClick,
//   ariaLabel
// }: StatBadgeProps) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-1 font-thin text-lime-700 whitespace-nowrap bg-lime-300 rounded-full h-[15px] w-[15px] flex items-center justify-center hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors ${className}`}
//       aria-label={ariaLabel}
//     >
//       {value}
//     </button>
//   );
// }

export default function EmployeeStats({ 
  count, 
  newEmployees, 
  onEmployeeClick,
  className = ""
}: EmployeeStatsProps) {
  return (
    <Table />
    // <div className={`flex flex-col rounded-none max-w-[250px] ${className}`}>
    //   <div className="flex flex-col items-start px-7 py-5 w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    //     <div className="flex gap-5 justify-between self-stretch text-4xl font-light whitespace-nowrap text-blue-950">
    //       <button
    //         onClick={onEmployeeClick}
    //         className="hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors"
    //         aria-label={`View details for ${count} employees`}
    //       >
    //         {count}
    //       </button>
    //       <div 
    //         className="flex shrink-0 self-start rounded-full bg-slate-200 h-[42px] w-[42px]" 
    //         role="presentation" 
    //       />
    //     </div>
    //     <div className="mt-2.5 text-base font-light text-blue-950">
    //       Total Employees
    //     </div>
    //     {/* <div className="flex gap-1.5 mt-1 text-xs">
    //       <StatBadge 
    //         value="+" 
    //         ariaLabel="Positive change indicator"
    //       />
    //       <div className="my-auto font-light basis-auto text-blue-950">
    //         {newEmployees} new {newEmployees === 1 ? 'employee' : 'employees'} added!
    //       </div>
    //     </div> */}
    //   </div>
    // </div>
  );
}




// Define the type for your data
type Employee = {
  id: number;
  name: string;
  age: number;
  status: string;
};

// Sample data
const data: Employee[] = [
  { id: 1, name: 'John Doe', age: 28, status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 34, status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', age: 45, status: 'Active' },
];

// Create a column helper
const columnHelper = createColumnHelper<Employee>();

// Define columns with strict typing
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('age', {
    header: 'Age',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
];

function Table() {
  // Initialize the table with strict typing
  const table = useReactTable<Employee>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// export default Table;