import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import RegisterBusiness from './pages/RegisterBusiness';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/* 
          Route protected...
          {user && <Route path='/home' element={<Dashboard />} />}
          {user && <Route path='/checkin' element={<Checkin />} />} */}

          <Route path='/businessMain' element={<BusinessDashboard />} />
          <Route path='/registerBusiness' element={<RegisterBusiness />} />
          <Route path='/home' element={<Dashboard />} />
          <Route path='/checkin' element={<Checkin />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
