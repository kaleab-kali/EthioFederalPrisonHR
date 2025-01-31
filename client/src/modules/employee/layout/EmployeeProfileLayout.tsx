// import React, { useEffect, useState } from "react";
// import { Outlet, useParams } from "react-router-dom";
// import ProfileMenu from "../components/profileView/ProfileMenu";
// import ProfileCard from "../components/profileView/ProfileCard";
// import Breadcrumb from "../components/BreadCrumb";
// import { IEmployee } from "../../../common/Types/Employee";
// import { useFetchEmployee } from "../services/queries";

// interface ProfileCardEmployeeInfo {
//   picture: string;
//   name: string;
//   id: string;
//   title: string;
//   active: string;
//   manager: string;
// }

// const extractProfileCardInfo = (
//   employee: IEmployee
// ): ProfileCardEmployeeInfo => ({
//   picture: "https://via.placeholder.com/150",
//   name: `${employee.firstName} ${employee.lastName}`,
//   id: employee.empId ?? "",
//   title: employee.title,
//   active: employee.status === "active" ? "Active" : "Inactive",
//   manager: employee.emergencyContact?.info?.firstName ?? "",
// });

// const EmployeeProfileLayout: React.FC = () => {
//   const { employeeId } = useParams<{ employeeId: string }>();
//   const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);
//   const [profileCardData, setProfileCardData] =
//     useState<ProfileCardEmployeeInfo | null>(null);
//   const [loading, setLoading] = useState(true);
//   const employeeQuery = useFetchEmployee(employeeId || "");
//   useEffect(() => {
//     if (employeeId) {
//       const fetchEmployeeData = async () => {
//         setLoading(true);

//         // Fetch data using the custom hook
//         const fetchedEmployee = employeeQuery.data;
//         console.log(fetchedEmployee?.employee);

//         if (fetchedEmployee) {
//           setEmployeeData(fetchedEmployee.employee);
//           setProfileCardData(extractProfileCardInfo(fetchedEmployee.employee)); // Assuming `extractProfileCardInfo` processes the employee data
//         }

//         setLoading(false);
//       };

//       fetchEmployeeData();
//     }
//   }, [employeeId, employeeQuery.data]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!employeeData) {
//     return <div>Employee not found.</div>;
//   }

//   return (
//     <div className="p-6 bg-transparent h-full w-full">
//       <Breadcrumb />
//       <h1 className="text-2xl font-semibold mb-4">Employee Profile</h1>
//       <ProfileMenu />
//       <div className="flex mt-6">
//         {profileCardData && <ProfileCard employee={profileCardData} />}
//         <div className="flex-1 ml-6 bg-gray-50 p-0 rounded-md shadow-sm overflow-y-auto">
//           <Outlet context={employeeData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfileLayout;

import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ProfileMenu from "../components/profileView/ProfileMenu";
import ProfileCard from "../components/profileView/ProfileCard";
import Breadcrumb from "../components/BreadCrumb";
import { IEmployee } from "../../../common/Types/Employee";
import { useFetchEmployee } from "../services/queries";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
  Font,
} from "@react-pdf/renderer";

interface ProfileCardEmployeeInfo {
  picture: string;
  name: string;
  id: string;
  title: string;
  active: string;
  manager: string;
}

const extractProfileCardInfo = (
  employee: IEmployee
): ProfileCardEmployeeInfo => ({
  picture: "https://via.placeholder.com/150",
  name: `${employee.firstName} ${employee.lastName}`,
  id: employee.empId ?? "",
  title: employee.title,
  active: employee.status === "active" ? "Active" : "Inactive",
  manager: employee.emergencyContact?.info?.firstName ?? "",
});

// Font.register({
//   family: 'Poppins',
//   fonts: [
//     {
//       src: '/fonts/Poppins-Regular.ttf', // Path to the regular font file
//       fontWeight: 'normal',
//     },
//     {
//       src: '/fonts/Poppins-Bold.ttf', // Path to the bold font file
//       fontWeight: 'bold',
//     },
//   ],
// });
Font.register({
  family: "NotoSansEthiopic",
  fonts: [
    {
      src: "/fonts/NotoSansEthiopic-Regular.ttf", // Path to the regular font file
      fontWeight: "normal",
    },
    {
      src: "/fonts/NotoSansEthiopic-Bold.ttf", // Path to the bold font file
      fontWeight: "bold",
    },
  ],
});

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "NotoSansEthiopic", // Use Poppins font
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  headerText: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 20, // Space between logo and text
  },
  englishText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  amharicText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "left",
    direction: "rtl", // Right-to-left for Amharic text
    fontFamily: "NotoSansEthiopic", // Ensure Poppins supports Amharic characters
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 20,
  },
  registrationHeading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align field name and value to the left
    marginBottom: 10,
  },
  fieldName: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 120, // Fixed width for field names
  },
  fieldValue: {
    fontSize: 12,
    fontWeight: 'normal',
    flex: 1, // Allow the value to take up the remaining space
  },
});

const EmploymentProfilePDF = ({ employee }: { employee: IEmployee }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.amharicText}>
          <Text style={styles.amharicText}>የኢትዮጵያ ፌዴራላዊ ዴሞክራሲያዊ ሪፐብሊክ</Text>
          <Text style={styles.amharicText}>የፍትህ ሚኒስቴር</Text>
          <Text style={styles.amharicText}>የፌዴራል እስር ቤቶች ፖሊስ ኮሚሽን</Text>
        </View>
        <Image src="/fpp.jpg" style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.englishText}>
            Federal Democratic Republic of Ethiopia
          </Text>
          <Text style={styles.englishText}>Ministry of Justice</Text>
          <Text style={styles.englishText}>
            Federal Prison Police Commission
          </Text>
        </View>
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />

      {/* Registration Heading */}
      <Text style={styles.registrationHeading}>Registration Form</Text>

      {/* Fields */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>First Name:</Text>
        <Text style={styles.fieldValue}>{employee.firstName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Last Name:</Text>
        <Text style={styles.fieldValue}>{employee.lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Employee ID:</Text>
        <Text style={styles.fieldValue}>{employee.empId}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Title:</Text>
        <Text style={styles.fieldValue}>{employee.title}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Status:</Text>
        <Text style={styles.fieldValue}>{employee.status}</Text>
      </View>
    </Page>
  </Document>
);

const FullProfilePDF = ({ employee }: { employee: IEmployee }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src="/fpp.jpg" style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.englishText}>
            Federal Democratic Republic of Ethiopia
          </Text>
          <Text style={styles.englishText}>Ministry of Justice</Text>
          <Text style={styles.englishText}>
            Federal Prison Police Commission
          </Text>
          <Text style={styles.amharicText}>የኢትዮጵያ ፌዴራላዊ ዴሞክራሲያዊ ሪፐብሊክ</Text>
          <Text style={styles.amharicText}>የፍትህ ሚኒስቴር</Text>
          <Text style={styles.amharicText}>የፌዴራል እስር ቤቶች ፖሊስ ኮሚሽን</Text>
        </View>
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />

      {/* Registration Heading */}
      <Text style={styles.registrationHeading}>Registration Form</Text>

      {/* Fields */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>First Name:</Text>
        <Text style={styles.fieldValue}>{employee.firstName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Last Name:</Text>
        <Text style={styles.fieldValue}>{employee.lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Employee ID:</Text>
        <Text style={styles.fieldValue}>{employee.empId}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Title:</Text>
        <Text style={styles.fieldValue}>{employee.title}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Status:</Text>
        <Text style={styles.fieldValue}>{employee.status}</Text>
      </View>
    </Page>
  </Document>
);

const EmployeeProfileLayout: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);
  const [profileCardData, setProfileCardData] =
    useState<ProfileCardEmployeeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const employeeQuery = useFetchEmployee(employeeId || "");

  useEffect(() => {
    if (employeeId) {
      const fetchEmployeeData = async () => {
        setLoading(true);
        const fetchedEmployee = employeeQuery.data;
        console.log(fetchedEmployee?.employee);

        if (fetchedEmployee) {
          setEmployeeData(fetchedEmployee.employee);
          setProfileCardData(extractProfileCardInfo(fetchedEmployee.employee));
        }

        setLoading(false);
      };

      fetchEmployeeData();
    }
  }, [employeeId, employeeQuery.data]);

  const handleDownloadPDF = async (
    pdfDocument: JSX.Element,
    fileName: string
  ) => {
    const blob = await pdf(pdfDocument).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employeeData) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="p-6 bg-transparent h-full w-full">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Employee Profile</h1>
        <div className="flex space-x-4">
          <button
            onClick={() =>
              handleDownloadPDF(
                <EmploymentProfilePDF employee={employeeData} />,
                "employment_profile.pdf"
              )
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Employment Profile
          </button>
          <button
            onClick={() =>
              handleDownloadPDF(
                <FullProfilePDF employee={employeeData} />,
                "full_profile.pdf"
              )
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Full Profile
          </button>
        </div>
      </div>
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
