const fs = require('fs');
const path = require('path');

const openapiPath = path.join(process.cwd(), 'openapi', 'openapi.json');
if (!fs.existsSync(openapiPath)) {
  throw new Error('OpenAPI file missing');
}

const doc = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
if (!doc.openapi || !doc.paths || !doc.components) {
  throw new Error('OpenAPI file missing required fields');
}

const repoPath = doc.paths['/api/v1/repositories'];
if (!repoPath || !repoPath.get) {
  throw new Error('OpenAPI missing /api/v1/repositories');
}

console.log('OpenAPI validation passed');
