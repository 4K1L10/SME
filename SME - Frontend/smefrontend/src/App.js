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


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/register" element={<Register />} />
          
          {/* Las rutas protegidas */}
          <Route 
            path="/api/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/api/devices" 
            element={
              <ProtectedRoute>
                <Devices />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/api/statistics" 
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/api/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

            <Route 
            path="/api/energy-usage" 
            element={
              <ProtectedRoute>
                <EnergyUsage />
              </ProtectedRoute>
            }
          />

          {/* Rutas no protegidas */}
          <Route path="/api/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
