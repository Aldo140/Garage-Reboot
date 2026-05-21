import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import TownPage from './TownPage.tsx';
import CommunitiesPage from './CommunitiesPage.tsx';
import { trackPageView } from './analytics.ts';
import './index.css';


function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/:slug" element={<TownPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
