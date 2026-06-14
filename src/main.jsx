import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Matrix from './pages/Matrix';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Matrix />
  </StrictMode>
);