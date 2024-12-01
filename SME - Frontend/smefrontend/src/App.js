import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Devices from './components/Devices';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import EnergyUsage from './components/EnergyUsage';
import GuideRegisterDevice from './components/GuideRegisterDevice';
import GuideViewEnergyUsage from './components/GuideViewEnergyUsage';
import GuideEnergySavingTips from './components/GuideEnergySavingTips';
import SupportAndPrivacy from './components/SupportAndPrivacy';



function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/api/Home" element={<Home />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/register" element={<Register />} />
          <Route path="/api/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/api/devices" element={<ProtectedRoute><Devices /></ProtectedRoute>}/>
          <Route path="/api/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>}/>
          <Route path="/api/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}/>
          <Route path="/api/energy-usage" element={<ProtectedRoute><EnergyUsage /></ProtectedRoute> }/>
          <Route path="/api/guide/register-device" element={<ProtectedRoute><GuideRegisterDevice /></ProtectedRoute>} />
          <Route path="/api/guide/view-energy-usage" element={<GuideViewEnergyUsage />} />
          <Route path="/api/guide/energy-saving-tips" element={<GuideEnergySavingTips />} />
          <Route path="/api/guide/support-privacy" element={<SupportAndPrivacy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
