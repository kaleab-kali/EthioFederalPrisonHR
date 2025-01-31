// import React, { useEffect, useState } from 'react'
// import {
//   useReactTable,
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   Row,
// } from "@tanstack/react-table";
// import { IAppraisalCandidates } from '../types/Appraisal';
// import { LuArrowDownUp } from 'react-icons/lu';
// import { useAllAppraisals } from '../services/queries';
// import { useCreateAppraisal } from '../services/mutation';
// import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import { CSVLink } from 'react-csv';

// const columnHelper = createColumnHelper<IAppraisalCandidates>();

// const columns = [
//   columnHelper.accessor("empID",{
//     header: ()=> "Employee ID",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("empName",{
//     header: ()=> "Employee Name",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("previousTitle",{
//     header: ()=> "Previous Title",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('appraisalTitle',{
//     header: ()=> "Appraisal Title",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('department',{
//     header: ()=> "Department",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('workYears',{
//     header: ()=> "Work Years",
//     cell: (info) => info.getValue(),
//   }),
// ]

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#E4E4E4',
//     padding: 10,
//   },
//   table: {
//     // display: 'table',
//     width: 'auto',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   tableCol: {
//     width: '12.5%', // Adjust based on the number of columns
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 10,
//   },
// });

// const AppraisalCandidates = () => {
//   const createAppreisalCandidate = useCreateAppraisal();
//   const [data, setData] = useState<IAppraisalCandidates[]>([]);
//     const dataQuery = useAllAppraisals();
//     console.log("Data" + dataQuery.data);
//      useEffect(() => {
//        if (dataQuery.data) {
//          const mappedData = dataQuery.data.map((appraisal: any) => ({
//            empID: appraisal.empId,
//            empName: appraisal.empName,
//            previousTitle: appraisal.previousTitle,
//            appraisalTitle: appraisal.appraisalTitle,
//            workYears: appraisal.workYears,
//            department: appraisal.department,
//            position: appraisal.position,
//          }));
//          setData(mappedData);
//        }
//      }, [dataQuery.data]);
//      const handelCandidate = () => {
//       const newData = '';
//       createAppreisalCandidate.mutate(newData); 
//      }

//   const handleDownloadPDF = async (pdfDocument: JSX.Element, fileName: string) => {
//       const blob = await pdf(pdfDocument).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName;
//       link.click();
//       URL.revokeObjectURL(url);
//     };
//   const pdfFunction = () => {
//       const MyDocument = (
//         <Document>
//           <Page size="A4" style={styles.page}>
//             <View style={styles.table}>
//               <View style={styles.tableRow}>
//                 <View style={styles.tableCol}>
//                   <Text style={styles.tableCell}>Employee ID</Text>
//                 </View>
//                 <View style={styles.tableCol}>
//                   <Text style={styles.tableCell}>Employee Name</Text>
//                 </View>
//                 <View style={styles.tableCol}>
//                   <Text style={styles.tableCell}>Previous Title</Text>
//                 </View>
//                 <View style={styles.tableCol}>
//                   <Text style={styles.tableCell}>Appraisal Title</Text>
//                 </View>
//                 <View style={styles.tableCol}>
//                   <Text style={styles.tableCell}>Department</Text>
//                 </View>
//                 <View style={styles.tableCol}>
//                   <Text style={styles.tableCell}>Work Year</Text>
//                 </View>
//               </View>
//               {data.map((row, index) => (
//                 <View key={index} style={styles.tableRow}>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCell}>{row.empID}</Text>
//                   </View>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCell}>{row.empName}</Text>
//                   </View>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCell}>{row.previousTitle}</Text>
//                   </View>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCell}>{row.appraisalTitle}</Text>
//                   </View>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCell}>{row.department}</Text>
//                   </View>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCell}>{row.workYears}</Text>
//                   </View>
                 
//                 </View>
//               ))}
//             </View>
//           </Page>
//         </Document>
//       );
  
//       handleDownloadPDF(MyDocument, 'apprasial_candidates.pdf');
//     };
//   const excelFunction = () => {
//       const worksheet = XLSX.utils.json_to_sheet(data);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
//       const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//       const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       saveAs(blob, 'complaints.xlsx');
//     };
//     const csvData = data.map((row) => ({
//       empID: row.empID,
//       empName: row.empName,
//       previousTitle: row.previousTitle,
//       appraisalTitle: row.appraisalTitle,
//       department: row.department,
//       workYears: row.workYears,
//     }));
//     const printFunction = () => {
//       const printableTable = document.getElementById('printable-table');
  
//       if (!printableTable) {
//         console.error('Printable table not found!');
//         return;
//       }
  
//       const printContent = printableTable.innerHTML;
//       const originalContent = document.body.innerHTML;
  
//       document.body.innerHTML = printContent;
//       window.print();
//       document.body.innerHTML = originalContent;
//       window.location.reload();
//     };

//   const table = useReactTable({
//     data: data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//   return (
//    <>
//       <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>List of Appraisal Candidates</h2>
//       <div className="flex justify-start gap-2 mb-3">
//         <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={handelCandidate}>Check</button>
//       </div>
//       <div className="flex justify-end gap-2 mb-3">
//         <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={pdfFunction}>PDF</button>
//                 <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={excelFunction}>EXCEL</button>
//                 <CSVLink data={csvData} filename={"complaints.csv"} className="bg-green-300 rounded-md px-4 text-center text-md no-underline">
//                   CSV
//                 </CSVLink>
//                 <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={printFunction}>PRINT</button>

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

// export default AppraisalCandidates


import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { IAppraisalCandidates } from '../types/Appraisal';
import { LuArrowDownUp } from 'react-icons/lu';
import { useAllAppraisals } from '../services/queries';
import { useCreateAppraisal } from '../services/mutation';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';

const columnHelper = createColumnHelper<IAppraisalCandidates>();

const columns = [
  columnHelper.accessor("empID", {
    header: () => "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("empName", {
    header: () => "Employee Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("previousTitle", {
    header: () => "Previous Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('appraisalTitle', {
    header: () => "Appraisal Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('department', {
    header: () => "Department",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('workYears', {
    header: () => "Work Years",
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
    display: 'flex',
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
    width: '16.66%', // Adjust based on the number of columns
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

const AppraisalCandidates = () => {
  const createAppraisalCandidate = useCreateAppraisal();
  const [data, setData] = useState<IAppraisalCandidates[]>([]);
  const dataQuery = useAllAppraisals();

  useEffect(() => {
    if (dataQuery.data) {
      const mappedData = dataQuery.data.map((appraisal: any) => ({
        empID: appraisal.empId,
        empName: appraisal.empName,
        previousTitle: appraisal.previousTitle,
        appraisalTitle: appraisal.appraisalTitle,
        workYears: appraisal.workYears,
        department: appraisal.department,
        position: appraisal.position,
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
                <Text style={styles.tableCell}>Previous Title</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Appraisal Title</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Department</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Work Years</Text>
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
                  <Text style={styles.tableCell}>{row.previousTitle}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.appraisalTitle}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.department}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.workYears}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    handleDownloadPDF(MyDocument, 'appraisal_candidates.pdf');
  };

  const excelFunction = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appraisal Candidates");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'appraisal_candidates.xlsx');
  };

  const csvData = data.map((row) => ({
    empID: row.empID,
    empName: row.empName,
    previousTitle: row.previousTitle,
    appraisalTitle: row.appraisalTitle,
    department: row.department,
    workYears: row.workYears,
  }));

  const printFunction = () => {
    const printableTable = document.getElementById('printable-table');

    if (!printableTable) {
      console.error('Printable table not found!');
      return;
    }

    const printContent = printableTable.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleCandidate = () => {
    const newData = '';
    createAppraisalCandidate.mutate(newData);
  };

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>List of Appraisal Candidates</h2>
      <div className="flex justify-start gap-2 mb-3">
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={handleCandidate}>Check</button>
      </div>
      <div className="flex justify-end gap-2 mb-3">
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={pdfFunction}>PDF</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={excelFunction}>EXCEL</button>
        <CSVLink data={csvData} filename={"appraisal_candidates.csv"} className="bg-green-300 rounded-md px-4 text-center text-md no-underline">
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

export default AppraisalCandidates;