const examples = {
  javascript: `fetch('/api/v1/repositories')
  .then((res) => res.json())
  .then((data) => console.log(data.items));`,
  typescript: `type Repo = { name: string; category: string };
const res = await fetch('/api/v1/repositories');
const data: { items: Repo[] } = await res.json();`,
  python: `import requests
data = requests.get('http://localhost:8000/api/v1/repositories').json()`,
  curl: `curl http://localhost:8000/api/v1/repositories`
};

export function UsageExample() {
  return (
    <div className="bg-surface p-4 rounded">
      <h3 className="text-lg mb-2">Usage Example</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(examples).map(([key, snippet]) => (
          <div key={key}>
            <div className="text-sm text-muted mb-1">{key}</div>
            <pre className="bg-background p-3 rounded text-sm overflow-auto">{snippet}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
