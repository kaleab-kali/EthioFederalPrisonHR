
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RewardComponent } from './components/RewardComponent';
import SalaryRaise from './layout/SalaryRaise';
import ServiceReward from './layout/ServiceReward';


const RewardModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RewardComponent />} />
      <Route path="/salaryRaise" element={<SalaryRaise />} />
      <Route path="/serviceReward" element={<ServiceReward />} />

    </Routes>
  );
};

export default RewardModule;
