import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordModal />} />
      <Route path="/home" element={<HomePage/>}/>
    </Routes>
  );
};

export default App;
