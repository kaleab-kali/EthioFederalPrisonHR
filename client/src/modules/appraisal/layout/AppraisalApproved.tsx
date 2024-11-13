import React from 'react'
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import { IAppraisalApproved} from '../types/Appraisal';
import { LuArrowDownUp } from 'react-icons/lu';

const data: IAppraisalApproved[]= [
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    department: "security",
    dateOfPromotion: "2021-06-01"
    
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    department: "security",
     dateOfPromotion: "2021-06-01"
    
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    department: "security",
     dateOfPromotion: "2021-06-01"
    
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    department: "security",
     dateOfPromotion: "2021-06-01"
    
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    department: "security",
     dateOfPromotion: "2021-06-01"
    
  },
  {
    empID: "FPC-1000",
    empName: "kaleab",
    previousTitle: "seargent",
    appraisalTitle: "main Seargent",
    department: "security",
     dateOfPromotion: "2021-06-01"
    
  },

]


const columnHelper = createColumnHelper<IAppraisalApproved>();

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
  columnHelper.accessor('dateOfPromotion',{
    header: ()=> "Date of Promotion",
    cell: (info) => info.getValue(),
  }),
]
const AppraisalApproved = () => {

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
      <h2 className='font-medium text-gray-600 font-roboto px-0 py-3'>List of Approved Candidates</h2>
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

export default AppraisalApproved