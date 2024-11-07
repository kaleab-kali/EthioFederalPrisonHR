import React, { useState } from "react";
import { IEmployeeListTable } from "../EmployeeList";
import { useNavigate } from 'react-router-dom';
import {
    FiUser    
  } from "react-icons/fi";
  import { LuArrowDownUp } from "react-icons/lu";
  
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import { IEmployee } from "../../../common/Types/Employee";



const dummyEmployees: IEmployee[] = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    position: "Software Engineer",
    title: "Mr.",
    empId: "FPC-1100",
    birthday: new Date('1994-05-15'),
    gender: "Male",
    department: "Engineering",
    ethnicity: "Caucasian",
    phoneNumber: {
      prefix: "+1",
      number: "5551234567"
    },
    education: [
      {
        id: "edu3",
        fieldofstudy: "Biotechnology",
        institution: "Stanford",
        graduationYear: 2015,
        educationLevel: "PhD",
      }
    ],
    email: "john.doe@example.com",
    salary: "80000",
    motherInformation: {
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: {
        prefix: "+1",
        number: "5559876543"
      }
    },
    emergencyContact: {
      info: {
        firstName: "Alice",
        lastName: "Smith",
        relationship: "Sister",
        phoneNumber: "5556667777"
      }
    },
    maritalStatus: "Single",
    password: "securePassword123",
    role: "Engineer",
    status: 'active',
    skinColor: "Fair",
    noseStructure: "Straight",
    eyeColor: "Blue",
    hairTexture: "Curly",
    height: "180 cm",
    religion: "Christian",
    nationality: "American",
    employmentDate: new Date('2018-07-01'),
    appraisalRecords: [
      {
        previousTitle: "Junior Engineer",
        appraisedTitle: "Software Engineer",
        date: "2021-07-01",
        rating: 'Excellent',
        performanceEvaluation: {
          primary: 65,
          secondary: 25
        },
        remarks: "Great performance"
      }
    ],
    attendanceRecords: [
      {
        date: "2023-09-01",
        totalDays: 22,
        presentDays: 20
      }
    ],
    performance: [
      {
        date: "2023-08-01",
        result30: 28,
        result70: 65
      }
    ],
    leaveRecords: [
      {
        dateFrom: '2024-10-01',
        dateTo: '2024-10-10',
        leaveType: 'Sick Leave',
        reason: 'Medical reasons',
        delegatedTo: 'John Doe',
        status: 'Accepted'
      }
    ]
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    position: "Marketing Manager",
    title: "Ms.",
    empId: "FPC-1101",
    birthday: new Date('1996-02-25'),
    gender: "Female",
    department: "Marketing",
    ethnicity: "Hispanic",
    phoneNumber: {
      prefix: "+1",
      number: "5552345678"
    },
    email: "jane.smith@example.com",
    salary: "75000",
    motherInformation: {
      firstName: "Maria",
      lastName: "Smith",
      phoneNumber: {
        prefix: "+1",
        number: "5558765432"
      }
    },
    emergencyContact: {
      info: {
        firstName: "David",
        lastName: "Smith",
        relationship: "Brother",
        phoneNumber: "5557778888"
      }
    },
    maritalStatus: "Married",
    password: "password456",
    role: "Manager",
    status: 'active',
    skinColor: "Tan",
    noseStructure: "Pointed",
    eyeColor: "Brown",
    hairTexture: "Straight",
    height: "165 cm",
    religion: "Catholic",
    nationality: "American",
    employmentDate: new Date('2017-03-15'),
    appraisalRecords: [
      {
        previousTitle: "Assistant Manager",
        appraisedTitle: "Marketing Manager",
        date: "2020-03-15",
        rating: 'Satisfactory',
        performanceEvaluation: {
          primary: 55,
          secondary: 25
        },
        remarks: "Consistent performance"
      }
    ],
    attendanceRecords: [
      {
        date: "2023-09-01",
        totalDays: 22,
        presentDays: 21
      }
    ],
    performance: [
      {
        date: "2023-08-01",
        result30: 27,
        result70: 63
      }
    ],
    leaveRecords: [
      {
        dateFrom: '2024-10-01',
        dateTo: '2024-10-05',
        leaveType: 'Annual Leave',
        reason: 'Vacation',
        delegatedTo: 'Jane Smith',
        status: 'Accepted'
      }
    ]
  },
  {
    firstName: "Emma",
    lastName: "Brown",
    age: 35,
    position: "Lead Scientist",
    title: "Dr.",
    empId: "FPC-1102",
    birthday: new Date('1989-08-10'),
    gender: "Female",
    department: "Research",
    ethnicity: "Asian",
    phoneNumber: {
      prefix: "+1",
      number: "5553456789"
    },
    email: "emma.brown@example.com",
    salary: "90000",
    motherInformation: {
      firstName: "Linda",
      lastName: "Brown",
      phoneNumber: {
        prefix: "+1",
        number: "5557654321"
      }
    },
    emergencyContact: {
      info: {
        firstName: "Mark",
        lastName: "Brown",
        relationship: "Husband",
        phoneNumber: "5558889999"
      }
    },
    maritalStatus: "Married",
    password: "securePassword789",
    role: "Scientist",
    status: 'active',
    skinColor: "Olive",
    noseStructure: "Flat",
    eyeColor: "Hazel",
    hairTexture: "Wavy",
    height: "170 cm",
    religion: "Buddhist",
    nationality: "American",
    employmentDate: new Date('2015-09-01'),
    appraisalRecords: [
      {
        previousTitle: "Scientist",
        appraisedTitle: "Lead Scientist",
        date: "2019-09-01",
        rating: 'Excellent',
        performanceEvaluation: {
          primary: 67,
          secondary: 28
        },
        remarks: "Outstanding contributions"
      }
    ],
    attendanceRecords: [
      {
        date: "2023-09-01",
        totalDays: 22,
        presentDays: 22
      }
    ],
    performance: [
      {
        date: "2023-08-01",
        result30: 30,
        result70: 68
      }
    ],
    leaveRecords: [
      {
        dateFrom: '2024-10-01',
        dateTo: '2024-10-07',
        leaveType: 'Research Leave',
        reason: 'Project work',
        delegatedTo: 'Emma Brown',
        status: 'Accepted'
      }]
}]

const employeeList: IEmployeeListTable[] = dummyEmployees.map(employee => ({
  empID: employee.empId,
  title: employee.title,
  firstName: employee.firstName,
  lastName: employee.lastName,
  department: employee.department,
  position: employee.position
}));
const columnHelper = createColumnHelper<IEmployeeListTable>();
const getColumns = (handleAction: (row: Row<IEmployeeListTable>) => void) => [
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: () => (
      <span className="flex items-center">
        <FiUser className="mr-2" size={16} /> First Name
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("department", {
    header: () => "Department",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("position", {
    header: () => "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "actions",
    id: "action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => handleAction(row)}
          className="px-3 py-1 border border-blue-500 text-blue-500 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        >
          View
        </button>
        <button
          onClick={() => handleAction(row)}
          className="px-3 py-1 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
        >
          Delete
        </button>
      </div>
    ),
  }),
];


const EmployeeListTable: React.FC = () => {
  const navigate = useNavigate();
  
  const [emplyees, setEmployees] = useState<IEmployeeListTable[]>([]);

  const handleAction = (row: Row<IEmployeeListTable>) => {
    console.log('Action button clicked for row:', row);
    console.log('Action button data row:', row.original);
    navigate(`profile/${row.original.empID}`);
  };

  const columns = getColumns(handleAction); 
  const table = useReactTable({
    data: employeeList,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <>
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
  );
};

export default EmployeeListTable;
