import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';


const EmployeeModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/list" element={<EmployeeComponent />} />
    </Routes>
    //   <Route path="dashboard" element={<HomeComponent />} />
   
  );
};

export default EmployeeModule;