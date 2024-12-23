
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeaveRecordEntry from './features/LeaveRecord/LeaveRecordEntry';
import LeaveBalance from './features/LeaveBalance/LeaveBalance';
import LeaveRequestTable from './components/LeaveRequestTable';
import EmployeeListTable from '../employee/components/EmployeeListTable';

const LeaveModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaveRequestTable />} />
      <Route path="request" element={<LeaveRequestTable/>} />
      {/* <Route path="request" element={<LeaveRecordEntry/>} /> */}
      <Route path="balance" element={<LeaveBalance/>} />
    </Routes>
  );
};

export default LeaveModule;
