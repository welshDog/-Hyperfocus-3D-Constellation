import React, { useMemo, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { NavBar } from './components/NavBar';

function App() {
  const [version] = useState('v1');
  const [tab, setTab] = useState('api');
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
        {tab === 'api' && <SwaggerUI url={specUrl} />}
        {tab === 'style' && <div className="bg-surface p-4 rounded">Style guide coming soon</div>}
        {tab === 'tutorials' && <div className="bg-surface p-4 rounded">Onboarding tutorials coming soon</div>}
        {tab === 'playground' && <div className="bg-surface p-4 rounded">API playground coming soon</div>}
        {tab === 'home' && <div className="bg-surface p-4 rounded">Overview</div>}
      </main>
    </div>
  );
}

export default App;
