import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { FaUser, FaDownload } from "react-icons/fa";


interface Employee {
  employeeId: string;
  name: string;
  position: string;
  department: string;
  leaveBalance: {
    annual: number;
    sick: number;
    casual: number;
  };
  isEligibleForLeave: boolean;
  leaveHistory: {
    type: string;
    startDate: string;
    endDate: string;
    days: number;
    status: string;
  }[];
}

// Dummy employee data (to be replaced with backend API call)
const dummyEmployeeData: Employee = {
  employeeId: "12345",
  name: "John Doe",
  position: "Software Engineer",
  department: "Engineering",
  leaveBalance: {
    annual: 15,
    sick: 10,
    casual: 5,
  },
  isEligibleForLeave: true,
  leaveHistory: [
    {
      type: "Annual",
      startDate: "2023-10-01",
      endDate: "2023-10-15",
      days: 15,
      status: "Approved",
    },
  ],
};

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  signature: {
    marginTop: 30,
    fontSize: 12,
    fontWeight: "bold",
  },
});

// PDF Document Component
const LeavePassPDF = ({
  employee,
  leaveDetails,
}: {
  employee: Employee;
  leaveDetails: any;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src="/logo.png" style={styles.logo} />{" "}
    
        <Text style={styles.companyName}>Your Company Name</Text>
      </View>
      <View style={styles.horizontalLine} />

      <View style={styles.section}>
        <Text style={styles.text}>
          This is to certify that {employee.name}, holding the position of{" "}
          {employee.position} in the {employee.department} department, has been
          granted leave for {leaveDetails.days} days, starting from{" "}
          {leaveDetails.startDate} to {leaveDetails.endDate}. The employee is
          expected to return to work on {leaveDetails.returnDate}.
        </Text>
      </View>

      {/* Leave Balance Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Leave Balance</Text>
        <Text style={styles.text}>
          Annual Leave: {employee.leaveBalance.annual} days
        </Text>
        <Text style={styles.text}>
          Sick Leave: {employee.leaveBalance.sick} days
        </Text>
        <Text style={styles.text}>
          Casual Leave: {employee.leaveBalance.casual} days
        </Text>
      </View>

      {/* Signature Section */}
      <View style={styles.section}>
        <Text style={styles.signature}>
          Approved By: ___________________________
        </Text>
      </View>
    </Page>
  </Document>
);

const LeavePermitComponent: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [leaveDetails, setLeaveDetails] = useState({
    type: "Annual",
    startDate: "",
    endDate: "",
    days: 0,
    returnDate: "",
  });

  const fetchEmployeeData = () => {
    if (employeeId === dummyEmployeeData.employeeId) {
      setEmployee(dummyEmployeeData);
      setLeaveDetails({
        type: "Annual",
        startDate: "2023-10-01",
        endDate: "2023-10-15",
        days: 15,
        returnDate: "2023-10-16",
      });
    } else {
      alert("Employee not found!");
    }
  };

  const handleDownloadPDF = async () => {
    if (employee) {
      const blob = await pdf(
        <LeavePassPDF employee={employee} leaveDetails={leaveDetails} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leave_pass.pdf";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaUser className="text-xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Leave Permit</h2>
        </div>

        {/* Employee ID Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            required
          />
          <button
            onClick={fetchEmployeeData}
            className="mt-2 w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Fetch Employee Data
          </button>
        </div>

        {/* Display Employee Information */}
        {employee && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Employee Information
              </h3>
              <p className="text-sm text-gray-600">Name: {employee.name}</p>
              <p className="text-sm text-gray-600">
                Position: {employee.position}
              </p>
              <p className="text-sm text-gray-600">
                Department: {employee.department}
              </p>
              <p className="text-sm text-gray-600">
                Leave Eligibility:{" "}
                {employee.isEligibleForLeave ? "Eligible" : "Not Eligible"}
              </p>
            </div>

            {/* Leave Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Leave Details
              </h3>
              <p className="text-sm text-gray-600">Type: {leaveDetails.type}</p>
              <p className="text-sm text-gray-600">
                Start Date: {leaveDetails.startDate}
              </p>
              <p className="text-sm text-gray-600">
                End Date: {leaveDetails.endDate}
              </p>
              <p className="text-sm text-gray-600">Days: {leaveDetails.days}</p>
              <p className="text-sm text-gray-600">
                Return Date: {leaveDetails.returnDate}
              </p>
            </div>

            {/* Download Leave Pass Button */}
            <div>
              <button
                onClick={handleDownloadPDF}
                className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FaDownload className="mr-2" />
                Download Leave Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeavePermitComponent;