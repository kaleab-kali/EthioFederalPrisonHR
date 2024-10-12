import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import RegistrationForm from './features/Registration/RegistrationForm';


const EmployeeModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/list" element={<EmployeeComponent />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/remove" element={<EmployeeComponent />} />
    </Routes>
    //   <Route path="dashboard" element={<HomeComponent />} />
   
  );
};

export default EmployeeModule;