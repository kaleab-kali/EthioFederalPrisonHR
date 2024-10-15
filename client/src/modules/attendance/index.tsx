
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AttendanceComponent from './components/AttendanceComponent';

const AttendanceModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AttendanceComponent />} />
    </Routes>
  );
};

export default AttendanceModule;
