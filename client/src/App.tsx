import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './common/components/loader';
import MainLayout from './layout/MainLayout';
import './App.css';


const HomeModule = lazy(() => import('./modules/home'));
const EmployeeModule = lazy(() => import('./modules/employee'));
const OrganizationModule = lazy(()=> import ('./modules/organization'))
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
