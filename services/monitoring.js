const metrics = [];

export function getGatewayMonitor() {
  return {
    record(source, payload) {
      metrics.push({ source, payload, ts: Date.now() });
      try {
        localStorage.setItem('gateway_metrics', JSON.stringify(metrics.slice(-200)));
      } catch (_) {}
    },
    snapshot() {
      return metrics.slice();
    },
  };
}
