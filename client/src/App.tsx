import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './common/components/loader';
import MainLayout from './layout/MainLayout';
import './App.css';


const HomeModule = lazy(() => import('./modules/home'));
const EmployeeModule = lazy(() => import('./modules/employee'));
const OrganizationModule = lazy(()=> import ('./modules/organization'))
const CenterDocumentModule = lazy(()=> import ('./modules/centerDocument'))
const SalaryRaiseModule = lazy(()=> import('./modules/salaryRaise'))
const LeaveModule = lazy(()=> import('./modules/leave'))
const RetirementModule = lazy(() => import('./modules/retirement'))
const AppraisalModule = lazy(()=> import ('./modules/appraisal'))
const AttendanceModule = lazy(()=> import('./modules/attendance'))
const ComplaintModule = lazy(()=> import('./modules/complaint'))
// const AuthModule = lazy(() => import('./modules/auth'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Auth routes */}
        {/* <Route path="/auth/*" element={<AuthModule />} /> */}
        
        {/* Protected routes */}
        {/* {isAuthenticated ? ( */}
          <Route path="/" element={<MainLayout />}>
            {/* Home module routes */}
            <Route path="home/*" element={<HomeModule />} />
            <Route path="employee/*" element={<EmployeeModule />} />
            <Route path="organization/*" element={<OrganizationModule />} />
            <Route path="centerDocument/*" element={<CenterDocumentModule />} />
            <Route path="leave/*" element={<LeaveModule />} />
            <Route path="retirement/*" element={<RetirementModule />} />
            <Route path="appraisal/*" element={<AppraisalModule />} />
            <Route path="salaryRaise/*" element={<SalaryRaiseModule />} />
            <Route path="attendance/*" element={<AttendanceModule />} />
            <Route path="complaint/*" element={<ComplaintModule />} />

            

            
            {/* Employee (admin) module routes
            <Route path="employee/*" element={<PrivateRoute><EmployeeModule /></PrivateRoute>} /> */}
          </Route>
        {/* // ) : (
        //   <Route path="*" element={<Navigate to="/auth/login" />} />
        // )} */}
      </Routes>
    </Suspense>
  );
}

export default App;
