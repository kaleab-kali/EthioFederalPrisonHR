import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ProfileMenu from '../components/profileView/ProfileMenu';
import ProfileCard from '../components/profileView/ProfileCard';
import Breadcrumb from '../components/BreadCrumb';
import { IEmployee } from '../../../common/Types/Employee';
import { useFetchEmployee } from '../services/queries';

interface ProfileCardEmployeeInfo {
  picture: string;
  name: string;
  id: string;
  title: string;
  active: string;
  manager: string;
}

const dummyEmployeeData: IEmployee[] = [
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
    email: "john.doe@example.com",
    salary: "80000",
    currentAddress: {
      region: "New York",
      subcity: "Manhattan",
      woreda: "3rd",
      houseNumber: "45B",
      leyuBota: "Near Central Park"
    },
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
      },
      address: {
        region: "New York",
        subcity: "Manhattan",
        woreda: "3rd",
        houseNumber: "45B",
        leyuBota: "Near Central Park"
      
    }},
    education: [
      {
        id: "edu3",
        fieldofstudy: "Biotechnology",
        institution: "Stanford",
        graduationYear: 2015,
        educationLevel: "PhD",
      }
    ],
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
    documentRecords: [
      {
        type: "In",
        header: "appraisal",
        dateIn: new Date('2019-5-14'),
      },
      {
        type: "Out",
        header: "appraisal",
        dateOut: new Date('2019-5-14'),
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

  const extractProfileCardInfo = (employee: IEmployee): ProfileCardEmployeeInfo => ({
    picture: 'https://via.placeholder.com/150',
    name: `${employee.firstName} ${employee.lastName}`,
    id: employee.empId ?? '',
    title: employee.title,
    active: employee.status === 'active' ? 'Active' : 'Inactive',
    manager: employee.emergencyContact?.info?.firstName ?? '', 
  });
  
  const EmployeeProfileLayout: React.FC = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);
    const [profileCardData, setProfileCardData] = useState<ProfileCardEmployeeInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const employeeQuery= useFetchEmployee(employeeId || '');
    useEffect(() => {
      if (employeeId) {
        const fetchEmployeeData = async () => {
          setLoading(true);

          // Fetch data using the custom hook
          const fetchedEmployee = employeeQuery.data;
          console.log(fetchedEmployee?.employee);

          if (fetchedEmployee) {
            setEmployeeData(fetchedEmployee.employee);
            setProfileCardData(extractProfileCardInfo(fetchedEmployee.employee)); // Assuming `extractProfileCardInfo` processes the employee data
          }

          setLoading(false);
        };

        fetchEmployeeData();
      }
    }, [employeeId, employeeQuery.data]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!employeeData) {
      return <div>Employee not found.</div>;
    }
  
    return (
      <div className="p-6 bg-transparent h-full w-full">
        <Breadcrumb />
        <h1 className="text-2xl font-semibold mb-4">Employee Profile</h1>
        <ProfileMenu />
        <div className="flex mt-6">
          {profileCardData && <ProfileCard employee={profileCardData} />}
          <div className="flex-1 ml-6 bg-gray-50 p-0 rounded-md shadow-sm overflow-y-auto">
            <Outlet context={employeeData} />
          </div>
        </div>
      </div>
    );
  };
  
  export default EmployeeProfileLayout;



