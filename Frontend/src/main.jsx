import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Matrix from './pages/Matrix';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/matrix" element={<PrivateRoute><Matrix /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);