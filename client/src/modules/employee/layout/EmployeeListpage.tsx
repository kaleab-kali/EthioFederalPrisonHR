import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/BreadCrumb';
import { IEmployee } from '../../../common/Types/Employee';

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



const EmployeeListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (employeeId: string) => {
    navigate(`profile/${employeeId}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md h-full w-full">
      <Breadcrumb />
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Title</th>
          </tr>
        </thead>
        <tbody>
          {dummyEmployees.map((employee) => (
            <tr
              key={employee.empId}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(employee.empId)}
            >
              <td className="py-2 px-4 border-b">{employee.empId}</td>
              <td className="py-2 px-4 border-b">{employee.firstName}</td>
              <td className="py-2 px-4 border-b">{employee.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeListPage;

