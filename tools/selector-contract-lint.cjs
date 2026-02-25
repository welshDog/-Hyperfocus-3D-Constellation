const fs = require('fs');
const path = require('path');

function hasForbiddenSelector(content) {
  const locatorRegex = /page\.locator\(['"`][^'"`]*['"`]\)/g;
  const matches = content.match(locatorRegex) || [];
  return matches.some((m) => !/\[data-testid=/.test(m));
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
      return;
    }
    if (entry.isFile() && full.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (hasForbiddenSelector(content)) {
        console.error(`Selector contract violation in ${full}`);
        process.exitCode = 1;
      }
    }
  });
}

scanDir(path.join(process.cwd(), 'tests', 'e2e'));
