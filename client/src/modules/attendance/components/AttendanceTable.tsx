import React, { useEffect } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";

interface Attendance {
  Name: string;
  Year: number;
  Month: string;
  [key: string]: any;
}
const dummyAttendance: Attendance[] = [
  {
    Name: "John Doe",
    Year: 2021,
    Month: "January",
    D1: "P",
    D2: "A",
    D3: "P",
    D4: "P",
    D5: "P",
    D6: "A",
    D7: "P",
    D8: "P",
    D9: "P",
    D10: "A",
    D11: "P",
    D12: "P",
    D13: "P",
    D14: "A",
    D15: "P",
    D16: "P",
    D17: "P",
    D18: "A",
    D19: "P",
    D20: "P",
    D21: "P",
    D22: "A",
    D23: "P",
    D24: "P",
    D25: "P",
    D26: "A",
    D27: "P",
    D28: "P",
    D29: "P",
    D30: "A",
  },
  {
    Name: "Jane Doe",
    Year: 2021,
    Month: "February",
    D1: "P",
    D2: "P",
    D3: "A",
    D4: "P",
    D5: "P",
    D6: "A",
    D7: "P",
    D8: "P",
    D9: "P",
    D10: "A",
    D11: "P",
    D12: "P",
    D13: "P",
    D14: "A",
    D15: "P",
    D16: "P",
    D17: "P",
    D18: "A",
    D19: "P",
    D20: "P",
    D21: "P",
    D22: "A",
    D23: "P",
    D24: "P",
    D25: "P",
    D26: "A",
    D27: "P",
    D28: "P",
    D29: "P",
    D30: "A",
  },
  {
    Name: "John Smith",
    Year: 2022,
    Month: "March",
    D1: "A",
    D2: "P",
    D3: "P",
    D4: "P",
    D5: "A",
    D6: "P",
    D7: "P",
    D8: "A",
    D9: "P",
    D10: "P",
    D11: "A",
    D12: "P",
    D13: "P",
    D14: "P",
    D15: "A",
    D16: "P",
    D17: "P",
    D18: "A",
    D19: "P",
    D20: "P",
    D21: "A",
    D22: "P",
    D23: "P",
    D24: "P",
    D25: "A",
    D26: "P",
    D27: "P",
    D28: "A",
    D29: "P",
    D30: "P",
  },
];
const columnHelper = createColumnHelper<Attendance>();

const columns = [
  columnHelper.accessor("Name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Year", {
    header: () => "Year",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Month", {
    header: () => "Month",
    cell: (info) => info.getValue(),
  }),
  ...Array.from({ length: 30 }, (_, i) =>
    columnHelper.accessor(`D${i + 1}`, {
      header: () => `${i + 1}`,
      cell: (info) => info.getValue(),
    })
  ),
];

const AttendanceTable = () => {
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const filteredData = selectedYear
    ? dummyAttendance.filter((record) => record.Year === selectedYear)
    : dummyAttendance;


  const table = useReactTable({
    data: dummyAttendance,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="mb-4">
        {" "}
        <label htmlFor="yearFilter" className="mr-2">
          Select Year:
        </label>{" "}
        <select
          id="yearFilter"
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2"
        >
          {" "}
          <option value="">All Years</option>{" "}
          {Array.from(
            new Set(dummyAttendance.map((record) => record.Year))
          ).map((year) => (
            <option key={year} value={year}>
              {" "}
              {year}{" "}
            </option>
          ))}
        </select>{" "}
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
      </div>
    </>
  );
};

export default AttendanceTable;
