import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import { IAppraisalCandidates } from '../types/Appraisal';
import { LuArrowDownUp } from 'react-icons/lu';
import { useAllAppraisals } from '../services/queries';

const data: IAppraisalCandidates[]= [
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    workYears: 5,
    department: "security",
    position: "gurard"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    workYears: 5,
    department: "security",
    position: "gurard"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    workYears: 5,
    department: "security",
    position: "gurard"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    workYears: 5,
    department: "security",
    position: "gurard"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    workYears: 5,
    department: "security",
    position: "gurard"
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    workYears: 5,
    department: "security",
    position: "gurard"
  },

]


const columnHelper = createColumnHelper<IAppraisalCandidates>();

const columns = [
  columnHelper.accessor("empID",{
    header: ()=> "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("empName",{
    header: ()=> "Employee Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("previousTitle",{
    header: ()=> "Previous Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('appraisalTitle',{
    header: ()=> "Appraisal Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('department',{
    header: ()=> "Department",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('workYears',{
    header: ()=> "Work Years",
    cell: (info) => info.getValue(),
  }),
]


const AppraisalCandidates = () => {
  const [data, setData] = useState<IAppraisalCandidates[]>([]);
    const dataQuery = useAllAppraisals();
    console.log("Data" + dataQuery.data);
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
  const pdfFunction = () => {
    alert('pdf')

  }
  const excelFunction = () => {
    alert('excel')
  }
  const csvFunction = () => {
    alert('csv')
  }
  const printFunction = () => {
    alert('print')
  }

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
   <>
      <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>List of Appraisal Candidates</h2>
      <div className="flex justify-end gap-2 mb-3">
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={pdfFunction}>PDF</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={excelFunction}>EXCEL</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={csvFunction}>CSV</button>
        <button className="bg-green-300 rounded-md px-4 text-center text-md" onClick={printFunction}>PRINT</button>

      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
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
                {
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
          </table>
    
        </div>
   </>
  )
}

export default AppraisalCandidates