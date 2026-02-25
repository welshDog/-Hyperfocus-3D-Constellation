import { useEffect, useState } from 'react';

type Metrics = {
  source: string;
  success: number;
  failure: number;
};

export function MonitoringPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/monitoring/flip')
      .then((res) => res.json())
      .then(setMetrics)
      .catch(() => setMetrics({ source: 'unavailable', success: 0, failure: 0 }));
  }, []);

  return (
    <div className="bg-surface p-4 rounded">
      <h2 className="text-xl mb-2">Migration Monitoring</h2>
      <div className="text-sm text-muted mb-4">
        Tracks data source flips and gateway health during rollout.
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="bg-background p-3 rounded">
          <div className="text-xs text-muted">Source</div>
          <div className="text-lg">{metrics?.source ?? 'loading'}</div>
        </div>
        <div className="bg-background p-3 rounded">
          <div className="text-xs text-muted">Success</div>
          <div className="text-lg">{metrics?.success ?? 0}</div>
        </div>
        <div className="bg-background p-3 rounded">
          <div className="text-xs text-muted">Failure</div>
          <div className="text-lg">{metrics?.failure ?? 0}</div>
        </div>
      </div>
    </div>
  );
}
