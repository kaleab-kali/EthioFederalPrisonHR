// import React, { useEffect, useState } from 'react'

// import {
//   useReactTable,
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   Row,
// } from "@tanstack/react-table";

// import { LuArrowDownUp } from 'react-icons/lu';
// import { ISalaryRaise } from '../types/salaryRaise';
// import { useAllRaises } from '../services/queries';


// const columnHelper = createColumnHelper<ISalaryRaise>();

// const columns = [
//   columnHelper.accessor("empID",{
//     header: ()=> "Employee ID",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("empName",{
//     header: ()=> "Employee Name",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("currentSalary",{
//     header: ()=> "Current Salary",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('newSalary',{
//     header: ()=> "New Salary",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('raiseDate',{
//     header: ()=> "Raise Date",
//     cell: (info) => info.getValue(),
//   }),
// ]

// const SalaryRaise = () => {
//   const [data, setData] = useState<ISalaryRaise[]>([]);
//     const dataQuery = useAllRaises();
//     console.log("Data" + dataQuery.data);
//     useEffect(() => {
//       if (dataQuery.data) {
//         const mappedData = dataQuery.data.map((raise: any) => ({
//           empID: raise.employeeId,
//           empName: raise.empName,
//           empTitle: raise.empTitle,
//           raiseDate: raise.raiseDate,
//           newSalary: raise.newSalary,
//           currentSalary: raise.currentSalary,
//         }));
//         setData(mappedData);
//       }
//     }, [dataQuery.data]);
//     const pdfFunction = () => {
//         alert('pdf')
    
//       }
//       const excelFunction = () => {
//         alert('excel')
//       }
//       const csvFunction = () => {
//         alert('csv')
//       }
//       const printFunction = () => {
//         alert('print')
//       }
    
//       const table = useReactTable({
//         data: data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//       });
//   return (
//     <>
//       <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>Salary Raise Candidates</h2>
//       <div className="flex justify-end gap-2 mb-3">
//         <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={pdfFunction}>PDF</button>
//         <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={excelFunction}>EXCEL</button>
//         <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={csvFunction}>CSV</button>
//         <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={printFunction}>PRINT</button>

//       </div>

//       <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//         <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id} className="">
//                   {headerGroup.headers.map((header) => (
//                     <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         <div
//                           {...{
//                             className: header.column.getCanSort()
//                               ? "cursor-pointer select-none flex items-center"
//                               : "",
//                             onClick: header.column.getToggleSortingHandler(),
//                           }}
//                         >
//                           {flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                           {header.column.columnDef.header !== "actions" && <LuArrowDownUp className="ml-1" size={12} />}
                          
//                         </div>
                      
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//                 {
//                     table.getRowModel().rows.map((row) => (
//                         <tr key={row.id} className="hover:bg-gray-50">
//                             {row.getVisibleCells().map((cell) => (
//                                 <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))
//                 }
//             </tbody>
//           </table>
    
//         </div>
//    </>
//   )
// }

// export default SalaryRaise


import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { LuArrowDownUp } from 'react-icons/lu';
import { ISalaryRaise } from '../types/salaryRaise';
import { useAllRaises } from '../services/queries';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';

const columnHelper = createColumnHelper<ISalaryRaise>();

const columns = [
  columnHelper.accessor("empID", {
    header: () => "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("empName", {
    header: () => "Employee Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("currentSalary", {
    header: () => "Current Salary",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('newSalary', {
    header: () => "New Salary",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('raiseDate', {
    header: () => "Raise Date",
    cell: (info) => info.getValue(),
  }),
];

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  table: {
    // display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const SalaryRaise = () => {
  const [data, setData] = useState<ISalaryRaise[]>([]);
  const dataQuery = useAllRaises();

  useEffect(() => {
    if (dataQuery.data) {
      const mappedData = dataQuery.data.map((raise: any) => ({
        empID: raise.employeeId,
        empName: raise.empName,
        empTitle: raise.empTitle,
        raiseDate: raise.raiseDate,
        newSalary: raise.newSalary,
        currentSalary: raise.currentSalary,
      }));
      setData(mappedData);
    }
  }, [dataQuery.data]);

  const handleDownloadPDF = async (pdfDocument: JSX.Element, fileName: string) => {
    const blob = await pdf(pdfDocument).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const pdfFunction = () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Employee ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Employee Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Current Salary</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>New Salary</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Raise Date</Text>
              </View>
            </View>
            {data.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.empID}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.empName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.currentSalary}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.newSalary}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.raiseDate}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    handleDownloadPDF(MyDocument, 'salary_raises.pdf');
  };

  const excelFunction = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Raises");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'salary_raises.xlsx');
  };

  const csvData = data.map(row => ({
    empID: row.empID,
    empName: row.empName,
    currentSalary: row.currentSalary,
    newSalary: row.newSalary,
    raiseDate: row.raiseDate,
  }));

  const printFunction = () => {
    const printableTable = document.getElementById('printable-table');
  
    // Check if the element exists
    if (!printableTable) {
      console.error('Printable table not found!');
      return;
    }
  
    const printContent = printableTable.innerHTML;
    const originalContent = document.body.innerHTML;
  
    // Replace the entire page content with the table content
    document.body.innerHTML = printContent;
  
    // Trigger the print dialog
    window.print();
  
    // Restore the original page content
    document.body.innerHTML = originalContent;
  
    // Re-render the React app (optional, if needed)
    window.location.reload();
  };

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>Salary Raise Candidates</h2>
      <div className="flex justify-end gap-2 mb-3">
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={pdfFunction}>PDF</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={excelFunction}>EXCEL</button>
        <CSVLink data={csvData} filename={"salary_raises.csv"} className="bg-green-300 rounded-md px-4 text-center text-md no-underline">
          CSV
        </CSVLink>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={printFunction}>PRINT</button>
      </div>

      <div id="printable-table" className="overflow-x-auto bg-white shadow-md rounded-xl">
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
    </>
  );
};

export default SalaryRaise;