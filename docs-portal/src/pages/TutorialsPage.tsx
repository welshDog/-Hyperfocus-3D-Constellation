import { MarkdownViewer } from '../components/MarkdownViewer';
import { useSearchFilter } from '../hooks/useSearchFilter';

const tutorials = [
  { title: 'Gateway Setup', content: '1. Install backend dependencies\n2. Run uvicorn\n3. Verify /api/v1/repositories' },
  { title: 'A/B Rollout', content: 'Use ?gateway=on to force gateway. Store variants in localStorage.' },
  { title: 'Contract Tests', content: 'Run npm run test:contract to validate Pact contracts.' }
];

export function TutorialsPage() {
  const { query, setQuery, filtered } = useSearchFilter(tutorials, (item, q) =>
    item.title.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-4">
      <div className="bg-surface p-4 rounded">
        <input
          className="w-full p-2 bg-background rounded"
          placeholder="Search tutorials"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {filtered.map((item) => (
        <div key={item.title} className="bg-surface p-4 rounded">
          <h3 className="text-lg mb-2">{item.title}</h3>
          <MarkdownViewer content={item.content} />
        </div>
      ))}
    </div>
  );
}
