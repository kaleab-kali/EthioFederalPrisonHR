
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComplaintComponent from './components/ComplaintComponent';

const ComplaintModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ComplaintComponent />} />
    </Routes>
  );
};

export default ComplaintModule;
