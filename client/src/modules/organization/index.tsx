import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  OrgHome  from './components/orgHome';


const OrganizationModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/departments" element={<OrgHome />} />
    </Routes>
   
  );
};

export default OrganizationModule;