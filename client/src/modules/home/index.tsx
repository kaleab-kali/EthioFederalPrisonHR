import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import EmployeeProfileLayout from "../employee/layout/EmployeeProfileLayout";
import EmployeeDetails from "../employee/components/profileView/EmployeeDetails";
import EmployeeProjects from "../employee/components/profileView/EmployeeAppraisal";
import EmployeePerformance from "../employee/components/profileView/EmployeePerformance";
import EmployeeDocuments from "../employee/components/profileView/EmployeeDocuments";
import EmployeeListPage from "../employee/layout/EmployeeListpage";

const HomeModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomeComponent />} />
      {/* <Route index element={<EmployeeListPage />} />
      <Route
        path="home/employee/profile/:employeeId"
        element={<EmployeeProfileLayout />}
      >
        <Route index element={<EmployeeDetails />} />
        <Route path="details" element={<EmployeeDetails />} />
        <Route path="projects" element={<EmployeeProjects />} />
        <Route path="performance" element={<EmployeePerformance />} />
        <Route path="documents" element={<EmployeeDocuments />} />
      </Route> */}
    </Routes>
    //   <Route path="dashboard" element={<HomeComponent />} />
  );
};

export default HomeModule;
