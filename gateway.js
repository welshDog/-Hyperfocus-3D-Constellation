import { repositories as staticRepositories } from './data.js';
import { validateRepositories } from './schema-validator.js';
import { withCircuitBreaker } from './services/circuit-breaker.js';
import { fetchWithRetry } from './services/fetcher.js';
import { getGatewayVariant } from './services/feature-flags.js';
import { getGatewayMonitor } from './services/monitoring.js';

const DEFAULT_GATEWAY_URL = '/api/v1/repositories';

export async function getRepositories(options = {}) {
  const { forceGateway = false, gatewayUrl = DEFAULT_GATEWAY_URL } = options;
  const flags = getGatewayVariant();
  const useGateway = forceGateway || flags.useGateway;
  const monitor = getGatewayMonitor();

  if (!useGateway) {
    monitor.record('static', { ok: true, count: staticRepositories.length });
    return staticRepositories;
  }

  try {
    const data = await withCircuitBreaker('gateway', async () => {
      const response = await fetchWithRetry(gatewayUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const error = new Error(body.message || 'Gateway error');
        error.status = response.status;
        throw error;
      }
      return response.json();
    });

    const repos = Array.isArray(data?.items) ? data.items : data;
    const validation = validateRepositories(repos);
    if (!validation.ok) {
      monitor.record('gateway', { ok: false, reason: 'schema', details: validation.errors });
      return staticRepositories;
    }
    monitor.record('gateway', { ok: true, count: repos.length });
    return repos;
  } catch (error) {
    monitor.record('gateway', { ok: false, reason: error.message });
    return staticRepositories;
  }
}
