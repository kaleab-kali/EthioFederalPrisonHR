import React, { useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { LuArrowDownUp } from "react-icons/lu";
import { AppraisalHistory } from "../types/Appraisal";
import { useAllAppraisalHistories } from "../services/queries";
import  jsPDF  from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const columnHelper = createColumnHelper<AppraisalHistory>();

const columns = [
  columnHelper.accessor("employeeId", {
    header: () => "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("currentLevel", {
    header: () => "Current Level",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nextLevel", {
    header: () => "Next Level",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalScore", {
    header: () => "Total Score",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("promotionDate", {
    header: () => "Promotion Date",
    cell: (info) => info.getValue()?.toLocaleDateString(),
  }),
];

const AppraisalApproved = () => {
  const [data, setData] = useState<AppraisalHistory[]>([]);
  const dataQuery = useAllAppraisalHistories();

  useEffect(() => {
    if (dataQuery.data) {
      const mappedData = dataQuery.data.map((appraisal: any) => ({
        employeeId: appraisal.employeeId,
        currentLevel: appraisal.currentLevel,
        nextLevel: appraisal.nextLevel,
        totalScore: appraisal.totalScore,
        status: appraisal.status,
        promotionDate: appraisal.promotionDate,
      }));
      setData(mappedData);
    }
  }, [dataQuery.data]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    (doc as any).autoTable({ html: "#appraisalTable" });
    doc.save("Appraisal_Report.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appraisal Report");
    XLSX.writeFile(workbook, "Appraisal_Report.xlsx");
  };

  const exportToCSV = () => {
    const csvContent = [
      Object.keys(data[0]).join(","),
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Appraisal_Report.csv";
    link.click();
  };

  const printTable = () => {
    window.print();
  };

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h2 className="font-medium text-gray-600 font-roboto px-0 py-3">
        List of Approved Candidates
      </h2>
      <div className="flex justify-end gap-2 mb-3">
        <button
          className="bg-green-300 rounded-md px-4 text-center text-md"
          onClick={exportToPDF}
        >
          PDF
        </button>
        <button
          className="bg-green-300 rounded-md px-4 text-center text-md"
          onClick={exportToExcel}
        >
          EXCEL
        </button>
        <button
          className="bg-green-300 rounded-md px-4 text-center text-md"
          onClick={exportToCSV}
        >
          CSV
        </button>
        <button
          className="bg-green-300 rounded-md px-4 text-center text-md"
          onClick={printTable}
        >
          PRINT
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table
          id="appraisalTable"
          className="min-w-full divide-y divide-gray-200"
        >
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
    </>
  );
};

export default AppraisalApproved;
