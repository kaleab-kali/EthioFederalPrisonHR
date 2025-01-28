import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';

type LeaveType =
  | 'annual'
  | 'family'
  | 'paternity'
  | 'health'
  | 'maternity'
  | 'study';

interface Balance {
  leaveType: LeaveType;
  credit: number;
  used: number;
  available: number;
}

interface LeaveBalance {
  year: string;
  balances: Balance[];
}

interface Employee {
  empId: string;
  firstName: string;
  lastName: string;
  leaveBalances: LeaveBalance[];
}

interface TableEmployee {
  key: string;
  empId: string;
  name: string;
  year: string;
  leaveBalances: Record<string, Record<LeaveType, Balance>>;
}

// Sample data
const sampleEmployees: Employee[] = [
  {
    empId: 'E001',
    firstName: 'John',
    lastName: 'Doe',
    leaveBalances: [
      {
        year: '2024',
        balances: [
          { leaveType: 'annual', credit: 20, used: 5, available: 15 },
          { leaveType: 'family', credit: 10, used: 2, available: 8 },
        ],
      },
    ],
  },
  {
    empId: 'E002',
    firstName: 'Jane',
    lastName: 'Smith',
    leaveBalances: [
      {
        year: '2024',
        balances: [
          { leaveType: 'annual', credit: 20, used: 10, available: 10 },
          { leaveType: 'paternity', credit: 15, used: 0, available: 15 },
        ],
      },
    ],
  },
];
const transformData = (employees: Employee[], year: string): TableEmployee[] => {
    return employees.map((employee) => {
      const leaveBalances = employee.leaveBalances.reduce((acc, leaveBalance) => {
        acc[leaveBalance.year] = leaveBalance.balances.reduce((innerAcc, balance) => {
          innerAcc[balance.leaveType] = balance;
          return innerAcc;
        }, {} as Record<LeaveType, Balance>);
        return acc;
      }, {} as Record<string, Record<LeaveType, Balance>>);
  
      return {
        key: employee.empId,
        empId: employee.empId,
        name: `${employee.firstName} ${employee.lastName}`,
        year,
        leaveBalances,
      };
    });
  };

  const LeaveBalanceTable: React.FC = () => {
    const [yearDisplayed, setYearDisplayed] = useState<string>('2024');
    const [updatedBalances, setUpdatedBalances] = useState<
      Record<string, Record<string, Record<LeaveType, Partial<Balance>>>>
    >({});
  
    // Transform sample data for the table
    const dataSource = transformData(sampleEmployees, yearDisplayed);
  
    const handleChange = (
      empId: string,
      year: string,
      type: LeaveType,
      field: keyof Balance,
      value: number
    ) => {
      setUpdatedBalances((prev) => ({
        ...prev,
        [empId]: {
          ...prev[empId],
          [year]: {
            ...prev[empId]?.[year],
            [type]: {
              ...prev[empId]?.[year]?.[type],
              [field]: value,
            },
          },
        },
      }));
    };
  
    const handleSave = (record: TableEmployee) => {
      const confirmed = window.confirm('Are you sure you want to update these values?');
      if (confirmed) {
        const updated = updatedBalances[record.empId]?.[record.year];
        if (updated) {
          console.log('Updated Balances:', updated);
          // Call your mutation here (e.g., updateEmployeeBalance.mutate)
        }
      }
    };
  
    const columnHelper = createColumnHelper<TableEmployee>();
  
    const columns = [
      columnHelper.accessor('empId', {
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('year', {
        header: 'Year',
        cell: (info) => (
          <select
            value={yearDisplayed}
            onChange={(e) => setYearDisplayed(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        ),
      }),
      ...(['annual', 'family', 'paternity', 'health', 'maternity', 'study'] as LeaveType[]).map(
        (type) =>
          columnHelper.group({
            header: type.toUpperCase(),
            columns: [
              columnHelper.accessor((row) => row.leaveBalances[row.year]?.[type]?.credit || 0, {
                id: `${type}.credit`,
                header: 'Credit',
                cell: (info) => (
                  <input
                    type="number"
                    min={0}
                    value={info.getValue()}
                    onChange={(e) =>
                      handleChange(
                        info.row.original.empId,
                        yearDisplayed,
                        type,
                        'credit',
                        parseInt(e.target.value, 10)
                      )
                    }
                    disabled={yearDisplayed !== '2024'}
                    className="w-full p-1 border rounded"
                  />
                ),
              }),
              columnHelper.accessor((row) => row.leaveBalances[row.year]?.[type]?.used || 0, {
                id: `${type}.used`,
                header: 'Used',
                cell: (info) => (
                  <input
                    type="number"
                    min={0}
                    value={info.getValue()}
                    disabled
                    className="w-full p-1 border rounded bg-gray-100"
                  />
                ),
              }),
              columnHelper.accessor((row) => row.leaveBalances[row.year]?.[type]?.available || 0, {
                id: `${type}.available`,
                header: 'Available',
                cell: (info) => (
                  <input
                    type="number"
                    min={0}
                    value={info.getValue()}
                    disabled
                    className="w-full p-1 border rounded bg-gray-100"
                  />
                ),
              }),
            ],
          })
      ),
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: (info) => (
          <button
            onClick={() => handleSave(info.row.original)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        ),
      }),
    ];
  
    const table = useReactTable({
      data: dataSource,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Leave Balances</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-2 border border-gray-300"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border border-gray-300">
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
  
  export default LeaveBalanceTable;