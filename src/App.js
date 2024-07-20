import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
