
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RetirementComponent from './components/RetirementComponent';
import RetirmentRequest from './components/RetirmentRequest';

const RetirementModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RetirementComponent />} />
      <Route path="/requestNumber" element={<RetirementComponent />} />
      <Route path="/form" element={<RetirmentRequest />} />
      <Route path="/" element={<RetirementComponent />} />
    </Routes>
  );
};

export default RetirementModule;
