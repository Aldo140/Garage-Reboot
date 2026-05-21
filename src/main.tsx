import { StrictMode, useEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import { trackPageView } from './analytics.ts';
import './index.css';

const TownPage = lazy(() => import('./TownPage.tsx'));
const CommunitiesPage = lazy(() => import('./CommunitiesPage.tsx'));

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
        <Route path="/communities" element={<Suspense fallback={null}><CommunitiesPage /></Suspense>} />
        <Route path="/:slug" element={<Suspense fallback={null}><TownPage /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
