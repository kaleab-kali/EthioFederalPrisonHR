import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppraisalComponent from './components/AppraisalComponent';
import AppraisalForm from './layout/AppraisalForm';
import AppraisalApproved from './layout/AppraisalApproved';
import AppraisalCandidates from './layout/AppraisalCandidates';

const AppraisalModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppraisalComponent />} />
      <Route path="/candidates" element={<AppraisalCandidates />} />
      <Route path="/form" element={<AppraisalForm />} />
      <Route path="/approved" element={<AppraisalApproved />} />

    </Routes>
  );
};

export default AppraisalModule;
