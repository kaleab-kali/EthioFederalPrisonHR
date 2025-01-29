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
import EmployeeListTable from './components/EmployeeListTable';
import TransferEmployeeTable from './components/TransferEmployeeTable';
import EmployeePhotoCapture from './features/LivePicture/EmployeePhotoCapture';
import WorkExperienceForm from './features/WorkExprience/WorkExperienceForm';
import DocumentTrackingForm from './features/DocumentTracking/DocumentTrackingForm';
import FamilyRecordForm from './features/FamilyRecords/FamilyRecordForm';
import HealthRecordForm from './features/FamilyRecords/HealthRecordForm';
import LeavePermitComponent from './components/LeavePermitComponent';


const EmployeeModule: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/list" element={<EmployeeComponent />} /> */}

      {/* <Route path="list" element={<EmployeeListPage />} /> */}
      <Route path="list" element={<EmployeeListTable />} />
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
      <Route path="/transfer" element={<TransferEmployeeTable />} />
      <Route path="/picture" element={<EmployeePhotoCapture />} />

      <Route path="/workExperience" element={<WorkExperienceForm />} />
      <Route path="/document" element={<DocumentTrackingForm />} />
      <Route path="/healthRecord" element={<HealthRecordForm />} />
      <Route path="/martialStatus" element={<FamilyRecordForm />} />
      <Route path="/leavePass" element={<LeavePermitComponent />} />

    </Routes>
    
    //   <Route path="dashboard" element={<HomeComponent />} />
  );
};

export default EmployeeModule;