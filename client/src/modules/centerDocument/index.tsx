
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CenterdocumentComponent from './components/CenterdocumentComponent';

const CenterdocumentModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CenterdocumentComponent />} />
    </Routes>
  );
};

export default CenterdocumentModule;
