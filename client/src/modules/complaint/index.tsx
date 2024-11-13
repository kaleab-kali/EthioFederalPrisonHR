
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComplaintComponent from './components/ComplaintComponent';
import ComplaintList from './layout/ComplaintList';

const ComplaintModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ComplaintComponent />} />
      <Route path="/list" element={<ComplaintList />} />
      <Route path="/registration" element={<ComplaintComponent />} />
      <Route path="/rebuttalEntry" element={<ComplaintComponent />} />
    </Routes>
  );
};

export default ComplaintModule;
