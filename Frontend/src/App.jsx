import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';
import { LoadingScreen } from './components/LoadingScreen';

import { RadarPage } from './pages/RadarPage';
import { FactCheckPage } from './pages/FactCheckPage';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';

function App() {
  // Show loading only once per session
  const [ready, setReady] = useState(
    sessionStorage.getItem('app_loaded') === 'true'
  );

  useEffect(() => {
    if (ready) {
      sessionStorage.setItem('app_loaded', 'true');
    }
  }, [ready]);

  return (
    <>
      {/* Loading Screen */}
      {!ready && (
        <LoadingScreen onComplete={() => setReady(true)} />
      )}

      {/* App Routes */}
      {ready && (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

          {/* Protected App Layout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/radar" element={<RadarPage />} />
            <Route path="/factcheck" element={<FactCheckPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;