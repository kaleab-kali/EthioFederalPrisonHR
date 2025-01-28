import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  OrgHome  from './components/orgHome';


const OrganizationModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/departments" element={<OrgHome />} />
      <Route path="/leaveTypes" element={<OrgHome />} />
      <Route path="/calender" element={<OrgHome />} />
      <Route path="/assignManager" element={<OrgHome />} />
      <Route path="/position" element={<OrgHome />} />
      <Route path="/titles" element={<OrgHome />} />
    </Routes>
   
  );
}; 

export default OrganizationModule;