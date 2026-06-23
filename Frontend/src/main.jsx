import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Matrix from './pages/matrix';
import Login from './pages/login';
import Admin from './pages/admin';
import Profile from './pages/profile';
import PrivateRoute from './PrivateRoute';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/matrix" element={<PrivateRoute><Matrix /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);