
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalaryraiseComponent from './components/SalaryraiseComponent';

const SalaryraiseModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SalaryraiseComponent />} />
    </Routes>
  );
};

export default SalaryraiseModule;
