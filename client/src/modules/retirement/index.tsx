
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RetirementComponent from './components/RetirementComponent';

const RetirementModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RetirementComponent />} />
      <Route path="/requestNumber" element={<RetirementComponent />} />
      <Route path="/date" element={<RetirementComponent />} />
      <Route path="/" element={<RetirementComponent />} />
    </Routes>
  );
};

export default RetirementModule;
