import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './common/components/loader';
import MainLayout from './layout/MainLayout';
import './App.css';
import "./i18n/i18n";
import SignIn from './common/components/SignIn';

const Admin = lazy(() => import("./modules/admin"));
const HomeModule = lazy(() => import('./modules/home'));
const EmployeeModule = lazy(() => import('./modules/employee'));
// const OrganizationModule = lazy(()=> import ('./modules/organization'))
const CenterDocumentModule = lazy(()=> import ('./modules/centerDocument'))
const LeaveModule = lazy(()=> import('./modules/leave'))
const RetirementModule = lazy(() => import('./modules/retirement'))
const AppraisalModule = lazy(()=> import ('./modules/appraisal'))
const AttendanceModule = lazy(()=> import('./modules/attendance'))
const ComplaintModule = lazy(()=> import('./modules/complaint'))
const RewardModule = lazy(()=> import('./modules/reward'))
// const AuthModule = lazy(() => import('./modules/auth'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Auth routes */}
        {/* <Route path="/auth/*" element={<AuthModule />} /> */}
        <Route path="/login" element={<SignIn />} />

        {/* Protected routes */}
        {/* {isAuthenticated ? ( */}
        <Route path="/" element={<MainLayout />}>
          {/* Home module routes */}
          <Route path="home/*" element={<HomeModule />} />
          <Route path="employee/*" element={<EmployeeModule />} />
          <Route path="organization/*" element={<Admin />} />
          <Route path="centerDocument/*" element={<CenterDocumentModule />} />
          <Route path="leave/*" element={<LeaveModule />} />
          <Route path="retirement/*" element={<RetirementModule />} />
          <Route path="appraisal/*" element={<AppraisalModule />} />
          <Route path="attendance/*" element={<AttendanceModule />} />
          <Route path="complaint/*" element={<ComplaintModule />} />
          <Route path="reward/*" element={<RewardModule />} />
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
