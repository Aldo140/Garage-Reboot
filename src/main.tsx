import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import TownPage from './TownPage.tsx';
import CommunitiesPage from './CommunitiesPage.tsx';
import { trackPageView } from './analytics.ts';
import './index.css';

// THREE.Clock was deprecated in three.js r184; @react-three/fiber 9.x still
// uses it internally. Suppress until R3F migrates to THREE.Timer.
const _origWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].startsWith('THREE.Clock:')) return;
  _origWarn(...args);
};

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
