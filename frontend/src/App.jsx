import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/HomePage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UserContextProvider from './context/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
    <Router> 
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;
