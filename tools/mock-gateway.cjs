const http = require('http');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data', 'repos.json');
const items = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const response = JSON.stringify({ items, page: 1, perPage: items.length, total: items.length });

const server = http.createServer((req, res) => {
  if (req.url === '/api/v1/repositories') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(response);
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(9325, () => {
  console.log('Mock gateway listening on http://localhost:9325');
});
