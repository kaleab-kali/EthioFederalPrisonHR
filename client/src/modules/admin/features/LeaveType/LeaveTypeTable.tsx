import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { LuArrowDownUp } from "react-icons/lu";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import LeaveTypeForm from "./LeaveTypeForm";
import { LeaveType, NewLeaveType } from "../../types/LeaveType";

// Dummy data
const dummyData: LeaveType[] = [
  { id: "1", type: "Annual Leave", credit: 20 },
  { id: "2", type: "Sick Leave", credit: 10 },
  { id: "3", type: "Casual Leave", credit: 15 },
];

// Column helper
const columnHelper = createColumnHelper<LeaveType>();

const LeaveTypeTable: React.FC = () => {
  const [data, setData] = useState<LeaveType[]>(dummyData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<LeaveType | NewLeaveType>({
    type: "",
    credit: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Define columns
  const columns = [
    columnHelper.accessor("type", {
      header: "Leave Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("credit", {
      header: "Credit",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="px-3 py-1 border border-blue-400 text-blue-500 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="px-3 py-1 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Handle form submission
  const handleFormSubmit = (data: NewLeaveType) => {
    if (isEditing) {
      // Update existing leave type
      setData((prev) =>
        prev.map((leaveType) =>
          leaveType.id === (formData as LeaveType).id ? { ...leaveType, ...data } : leaveType
        )
      );
    } else {
      // Add new leave type
      setData((prev) => [...prev, { id: String(prev.length + 1), ...data }]);
    }
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (leaveType: LeaveType) => {
    setFormData(leaveType);
    setIsEditing(true);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((leaveType) => leaveType.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Types</h1>
        <button
          onClick={() => {
            setFormData({ type: "", credit: 0 });
            setIsEditing(false);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Leave Type
        </button>
      </div>

      {/* Table */}
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

      {/* Form Popup */}
      {showForm && (
        <LeaveTypeForm
          initialData={formData}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
          title={isEditing ? "Edit Leave Type" : "Add Leave Type"}
        />
      )}
    </div>
  );
};

export default LeaveTypeTable;