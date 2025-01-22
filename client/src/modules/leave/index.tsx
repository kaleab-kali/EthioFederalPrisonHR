
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeaveRecordEntry from './features/LeaveRecord/LeaveRecordEntry';
import LeaveBalance from './features/LeaveBalance/LeaveBalance';
import LeaveRequestTable from './components/LeaveRequestTable';
import EmployeeListTable from '../employee/components/EmployeeListTable';
import LeaveRequestForm from './layout/LeaveRequestForm';

const LeaveModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaveRequestTable />} />
      <Route path="request" element={<LeaveRequestForm/>} />
      {/* <Route path="request" element={<LeaveRecordEntry/>} /> */}
      <Route path="balance" element={<LeaveRequestTable/>} />
    </Routes>
  );
};

export default LeaveModule;
