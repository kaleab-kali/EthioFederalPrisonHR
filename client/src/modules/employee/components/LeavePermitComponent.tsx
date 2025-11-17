import React, { useState, useEffect } from "react";
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
import moment from "moment";
import { useFetchLeavePermit } from "../../leave/services/queries";

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  logo: { width: 50, height: 50, marginRight: 10 },
  companyName: { fontSize: 18, fontWeight: "bold" },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  signature: { marginTop: 30, fontSize: 12, fontWeight: "bold" },
});

const LeavePassPDF = ({ employee, leaveDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="/logo.png" style={styles.logo} />
        <Text style={styles.companyName}>Your Company Name</Text>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.section}>
        <Text style={styles.text}>
          This is to certify that {employee.employeePermit?.employee?.firstName}
          , holding the position of{" "}
          {employee.employeePermit?.employee?.position} in the{" "}
          {employee.employeePermit?.employee?.department} department, has been
          granted leave for {leaveDetails.days} days, starting from{" "}
          {leaveDetails.startDate} to {leaveDetails.endDate}. The employee is
          expected to return to work on {leaveDetails.returnDate}.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Leave Balance</Text>
        <Text style={styles.text}>
          Annual Leave:{" "}
          {
            employee.employeePermit?.employee?.leaveBalances[0]?.balances[6]
              ?.credit
          }{" "}
          days
        </Text>
        <Text style={styles.text}>
          Sick Leave:{" "}
          {
            employee.employeePermit?.employee?.leaveBalances[0]?.balances[0]
              ?.credit
          }{" "}
          days
        </Text>
        <Text style={styles.text}>
          Emergency Leave:{" "}
          {
            employee.employeePermit?.employee?.leaveBalances[0]?.balances[2]
              ?.credit
          }{" "}
          days
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.signature}>
          Approved By: ___________________________
        </Text>
      </View>
    </Page>
  </Document>
);

const LeavePermitComponent = () => {
  const [employeeId, setEmployeeId] = useState("");
  const { data: employee, isLoading, error } = useFetchLeavePermit(employeeId);
  const [leaveDetails, setLeaveDetails] = useState({
    type: "",
    startDate: "",
    endDate: "",
    days: 0,
    returnDate: "",
  });

  useEffect(() => {
    if (employee?.employeePermit?.upcomingLeaves?.length > 0) {
      const upcomingLeave = employee.employeePermit.upcomingLeaves[0];
      const startDate = moment(upcomingLeave.from);
      const endDate = moment(upcomingLeave.to);
      const days = endDate.diff(startDate, "days") + 1;

      // Add one day to the endDate to calculate the returnDate
      const returnDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

      setLeaveDetails({
        type: upcomingLeave.leaveType || "",
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        days,
        returnDate, // Updated returnDate with one day added
      });
    }
  }, [employee]);

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
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error fetching data.</p>}
        {employee && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Employee Information
              </h3>
              <p className="text-sm text-gray-600">
                Name: {employee.employeePermit?.employee?.firstName}
              </p>
              <p className="text-sm text-gray-600">
                Position: {employee.employeePermit?.employee?.position}
              </p>
              <p className="text-sm text-gray-600">
                Department: {employee.employeePermit?.employee?.department}
              </p>
            </div>
          </div>
        )}
        {employee && (
          <div className="space-y-4">
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
            <button
              onClick={handleDownloadPDF}
              className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaDownload className="mr-2" />
              Download Leave Pass
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeavePermitComponent;
