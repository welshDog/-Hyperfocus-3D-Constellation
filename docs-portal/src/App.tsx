import React, { useMemo, useState } from 'react';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { StyleGuidePage } from './pages/StyleGuidePage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { MonitoringPage } from './pages/MonitoringPage';

function App() {
  const [version] = useState('v1');
  const [tab, setTab] = useState('home');
  const specUrl = useMemo(() => '/openapi.json', []);

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-surface flex items-center justify-between">
        <h1 className="text-2xl">Hyperfocus Documentation Portal</h1>
        <NavBar active={tab} onChange={setTab} />
      </header>
      <main className="p-4">
        <div className="mb-4">
          <span className="mr-2">API Version:</span>
          <span className="px-2 py-1 rounded bg-primary text-black">{version}</span>
        </div>
        {tab === 'home' && <HomePage />}
        {tab === 'style' && <StyleGuidePage />}
        {tab === 'api' && <ApiDocsPage specUrl={specUrl} />}
        {tab === 'tutorials' && <TutorialsPage />}
        {tab === 'playground' && <PlaygroundPage />}
        {tab === 'monitoring' && <MonitoringPage />}
      </main>
    </div>
  );
}

export default App;
