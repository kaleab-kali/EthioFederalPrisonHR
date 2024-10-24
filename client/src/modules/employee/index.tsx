import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import RegistrationForm from './features/Registration/RegistrationForm';
import EmployeeListPage from './layout/EmployeeListpage';
import EmployeeProfileLayout from './layout/EmployeeProfileLayout';
import EmployeeDetails from './components/profileView/EmployeeDetails';
import EmployeePerformance from './components/profileView/EmployeePerformance';
import EmployeeDocuments from './components/profileView/EmployeeDocuments';
import EmployeeAppraisal from './components/profileView/EmployeeAppraisal';
import EmployeeLeave from './components/profileView/EmployeeLeave';
import EmployeeMaterial from './components/profileView/EmployeeMaterial';
import EmployeeAttendance from './components/profileView/EmployeeAttendance';
import EmployeeEducation from './components/profileView/EmployeeEducation';
import EmployeeHealth from './components/profileView/EmployeeHealth';


const EmployeeModule: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/list" element={<EmployeeComponent />} /> */}
      
      <Route path="list" element={<EmployeeListPage />} />
      <Route
        path="list/profile/:employeeId"
        element={<EmployeeProfileLayout />}
      >
        <Route index element={<EmployeeDetails />} />
        <Route path="details" element={<EmployeeDetails />} />
        <Route path="education" element={<EmployeeEducation />} />
        <Route path="health" element={<EmployeeHealth />} />
        <Route path="material" element={<EmployeeMaterial />} />
        <Route path="attendance" element={<EmployeeAttendance />} />
        <Route path="leave" element={<EmployeeLeave />} />

        <Route path="appraisal" element={<EmployeeAppraisal />} />
        <Route path="performance" element={<EmployeePerformance />} />
        <Route path="documents" element={<EmployeeDocuments />} />
      </Route>

      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/remove" element={<EmployeeComponent />} />
    </Routes>
    //   <Route path="dashboard" element={<HomeComponent />} />
   
  );
};

export default EmployeeModule;