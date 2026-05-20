import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import TownPage from './TownPage.tsx';
import CommunitiesPage from './CommunitiesPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/:slug" element={<TownPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
