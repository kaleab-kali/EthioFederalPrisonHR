
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeaveComponent from './components/LeaveComponent';

const LeaveModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaveComponent />} />
    </Routes>
  );
};

export default LeaveModule;
