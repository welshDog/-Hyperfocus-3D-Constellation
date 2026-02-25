const fs = require('fs');
const path = require('path');

const metricsPath = path.join(process.cwd(), 'local-metrics.json');
const output = path.join(process.cwd(), 'rollback-plan.json');

const base = {
  rollback: [
    { step: 'Disable service worker by unregistering in index.html', owner: 'frontend' },
    { step: 'Revert data-testid additions if breaking UI behavior', owner: 'frontend' },
    { step: 'Revert test selector updates and lint rule if CI blocks', owner: 'qa' }
  ],
  metrics: {
    errorRate: 0,
    loadMs: 0,
    firstContentfulPaintMs: 0
  }
};

if (fs.existsSync(metricsPath)) {
  try {
    const metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
    base.metrics.errorRate = metrics.errors + metrics.rejections;
    base.metrics.loadMs = metrics.load;
    base.metrics.firstContentfulPaintMs = metrics.paint;
  } catch (_) {}
}

fs.writeFileSync(output, JSON.stringify(base, null, 2));
console.log(`Rollback plan written to ${output}`);
