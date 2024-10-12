import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';

const HomeModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomeComponent />} />
    </Routes>
    //   <Route path="dashboard" element={<HomeComponent />} />
   
  );
};

export default HomeModule;
