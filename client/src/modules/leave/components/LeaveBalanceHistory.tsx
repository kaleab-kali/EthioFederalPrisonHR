// import React from 'react';
// import { useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';

// interface LeaveData {
//   id: number;
//   name: string;
//   year: number;
//   leaveType: string;
//   credit: number;
//   used: number;
//   available: number;
// }

// const data: LeaveData[] = [
//   { id: 1, name: 'John Doe', year: 2023, leaveType: 'Annual', credit: 10, used: 5, available: 5 },
//   { id: 2, name: 'Jane Smith', year: 2023, leaveType: 'Medical', credit: 15, used: 3, available: 12 },
//   // Add more data as needed
// ];

// const columns: ColumnDef<LeaveData>[] = [
//   {
//     accessorKey: 'id',
//     header: 'ID',
//   },
//   {
//     accessorKey: 'name',
//     header: 'Name',
//   },
//   {
//     accessorKey: 'year',
//     header: 'Year',
//   },
//   {
//     accessorKey: 'leaveType',
//     header: 'Leave Type',
//   },
//   {
//     accessorKey: 'credit',
//     header: 'Credit',
//   },
//   {
//     accessorKey: 'used',
//     header: 'Used',
//   },
//   {
//     accessorKey: 'available',
//     header: 'Available',
//   },
// ];

// const LeaveBalanceHistory: React.FC = () => {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel()
//   });

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leave Balance History</h1>
//       <table className="min-w-full bg-white">
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id} className="border-b">
//               {headerGroup.headers.map(header => (
//                 <th key={header.id} className="px-4 py-2 text-left">
//                   {header.isPlaceholder ? null : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id} className="border-b">
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id} className="px-4 py-2">
//                   {cell.renderCell()}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeaveBalanceHistory;

import React from 'react'

const LeaveBalanceHistory = () => {
  return (
    <div>LeaveBalanceHistory</div>
  )
}

export default LeaveBalanceHistory