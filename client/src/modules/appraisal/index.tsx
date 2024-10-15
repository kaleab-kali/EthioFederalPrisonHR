
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppraisalComponent from './components/AppraisalComponent';

const AppraisalModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppraisalComponent />} />
    </Routes>
  );
};

export default AppraisalModule;
