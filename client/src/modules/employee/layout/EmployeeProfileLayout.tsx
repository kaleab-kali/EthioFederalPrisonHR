import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ProfileMenu from '../components/profileView/ProfileMenu';
import ProfileCard from '../components/profileView/ProfileCard';
import Breadcrumb from '../components/BreadCrumb';

// Define the structure of an education object
interface Education {
  id?: string;
  fieldofstudy?: string;
  institution: string;
  graduationYear: number;
  educationLevel: string;
}

// Define the structure of an employee object
interface Employee {
  picture: string;
  name: string;
  id: string;
  age:string;
  title: string;
  active: string;
  manager: string;
  projects: string[];
  performance: { date: string; result30: number; result70: number; }[];
  documents: string[];
  education?: Education[]; // Add education field
}

// Define the type for employee IDs based on our dummy data keys
type EmployeeId = 'EMP001' | 'EMP002' | 'EMP003';

// Dummy Employee Data for all employees
const dummyEmployeeData: Record<EmployeeId, Employee> = {
  EMP001: {
    picture: 'https://via.placeholder.com/150',
    name: 'John Doe',
    id: 'EMP001',
    age:"20",
    title: 'Software Engineer',
    active: 'Active',
    manager: 'Jane Smith',
    projects: ['Project Alpha', 'Project Beta'],
    
    documents: ['Resume.pdf', 'ID_Card.pdf'],
    education: [
      {
        id: 'edu1',
        fieldofstudy: 'Computer Science',
        institution: 'MIT',
        graduationYear: 2020,
        educationLevel: 'Bachelor\'s',
      },
    ],
    performance: [
      { date: "Jan - June 2024", result30: 25, result70: 65 },
      { date: "July - Dec 2023", result30: 28, result70: 60 },
      { date: "Jan - June 2023", result30: 22, result70: 70 },
    ],
  },
  // Add education to other employees as well, if needed
  EMP002: {
    picture: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    id: 'EMP002',
    title: 'Project Manager',
    active: 'Active',
    age: "25",
    manager: 'Tom Johnson',
    projects: ['Project Gamma'],
    performance: [
      { date: "Jan - June 2024", result30: 25, result70: 65 },
      { date: "July - Dec 2023", result30: 28, result70: 60 },
      { date: "Jan - June 2023", result30: 22, result70: 70 },
    ],
    documents: ['Certificate.pdf', 'ID_Card.pdf'],
    education: [],
  },
  EMP003: {
    picture: 'https://via.placeholder.com/150',
    name: 'Alice Johnson',
    id: 'EMP003',
    title: 'UX Designer',
    active: 'Inactive',
    manager: 'John Doe',
    age: "36",
    projects: ['Project Delta'],
    performance: [
      { date: "Jan - June 2024", result30: 25, result70: 65 },
      { date: "July - Dec 2023", result30: 28, result70: 60 },
      { date: "Jan - June 2023", result30: 22, result70: 70 },
    ],
    documents: ['Resume.pdf'],
    education: [
      {
        id: 'edu2',
        fieldofstudy: 'Design',
        institution: 'Art Institute of Chicago',
        graduationYear: 2018,
        educationLevel: 'Bachelor\'s',
      },
    ],
  },
};

const EmployeeProfileLayout: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employeeId) {
      const id = employeeId as EmployeeId; // Type-cast employeeId to EmployeeId
      
      const fetchEmployeeData = async () => {
        setLoading(true);
        setTimeout(() => {
          setEmployeeData(dummyEmployeeData[id] || null);
          setLoading(false);
        }, 500);
      };

      fetchEmployeeData();
    }
  }, [employeeId]);

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
        <ProfileCard employee={employeeData} />
        <div className="flex-1 ml-6 bg-gray-50 p-0 rounded-md shadow-sm overflow-y-auto">
          <Outlet context={employeeData} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileLayout;



// import React, { useEffect, useState } from 'react';
// import { Outlet, useParams } from 'react-router-dom';
// import ProfileMenu from '../components/profileView/ProfileMenu';
// import ProfileCard from '../components/profileView/ProfileCard';
// import Breadcrumb from '../components/BreadCrumb';

// // Define the type for employee IDs based on our dummy data keys
// type EmployeeId = 'EMP001' | 'EMP002' | 'EMP003';

// // Define the structure of an employee object
// interface Employee {
//   picture: string;
//   name: string;
//   id: string;
//   title: string;
//   active: string;
//   manager: string;
//   projects: string[];
//   performance: string;
//   documents: string[];
// }

// // Dummy Employee Data for all employees
// const dummyEmployeeData: Record<EmployeeId, Employee> = {
//   EMP001: {
//     picture: 'https://via.placeholder.com/150',
//     name: 'John Doe',
//     id: 'EMP001',
//     title: 'Software Engineer',
//     active: 'Active',
//     manager: 'Jane Smith',
//     projects: ['Project Alpha', 'Project Beta'],
//     performance: 'Exceeds Expectations',
//     documents: ['Resume.pdf', 'ID_Card.pdf'],
//   },
//   EMP002: {
//     picture: 'https://via.placeholder.com/150',
//     name: 'Jane Smith',
//     id: 'EMP002',
//     title: 'Project Manager',
//     active: 'Active',
//     manager: 'Tom Johnson',
//     projects: ['Project Gamma'],
//     performance: 'Meets Expectations',
//     documents: ['Certificate.pdf', 'ID_Card.pdf'],
//   },
//   EMP003: {
//     picture: 'https://via.placeholder.com/150',
//     name: 'Alice Johnson',
//     id: 'EMP003',
//     title: 'UX Designer',
//     active: 'Inactive',
//     manager: 'John Doe',
//     projects: ['Project Delta'],
//     performance: 'Needs Improvement',
//     documents: ['Resume.pdf'],
//   },
// };

// const EmployeeProfileLayout: React.FC = () => {
//   const { employeeId } = useParams<{ employeeId: string }>();
//   const [employeeData, setEmployeeData] = useState<Employee | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (employeeId) {
//       const id = employeeId as EmployeeId; // Type-cast employeeId to EmployeeId
      
//       const fetchEmployeeData = async () => {
//         setLoading(true);
//         setTimeout(() => {
//           setEmployeeData(dummyEmployeeData[id] || null);
//           setLoading(false);
//         }, 500);
//       };

//       fetchEmployeeData();
//     }
//   }, [employeeId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!employeeData) {
//     return <div>Employee not found.</div>;
//   }

//   return (
//     <div className="p-6 bg-transparent h-screen w-full flex flex-col">
//       <Breadcrumb />
//       <h1 className="text-2xl font-semibold mb-4">Employee Profile</h1>
      
//       <div className="flex flex-1 overflow-hidden">
//         {/* ProfileMenu */}
//         <div className="w-1/5">
//           <ProfileMenu />
//         </div>

//         {/* ProfileCard */}
//         <div className="w-1/4 ml-4">
//           <ProfileCard employee={employeeData} />
//         </div>

//         {/* Scrollable content (Outlet) */}
//         <div className="flex-1 ml-6 bg-gray-50 p-6 rounded-md shadow-sm overflow-y-auto">
//           <Outlet context={employeeData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfileLayout;
