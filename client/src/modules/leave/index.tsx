
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeaveComponent from './components/LeaveComponent';
import LeaveRecordEntry from './features/LeaveRecord/LeaveRecordEntry';
import LeaveBalance from './features/LeaveBalance/LeaveBalance';

const LeaveModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaveComponent />} />
      <Route path="request" element={<LeaveRecordEntry/>} />
      <Route path="balance" element={<LeaveBalance/>} />
    </Routes>
  );
};

export default LeaveModule;
