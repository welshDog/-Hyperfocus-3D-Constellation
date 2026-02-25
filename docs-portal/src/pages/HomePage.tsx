import { UsageExample } from '../components/UsageExample';

export function HomePage() {
  return (
    <div className="space-y-4">
      <section className="bg-surface p-4 rounded">
        <h2 className="text-xl mb-2">Overview</h2>
        <p className="text-muted">
          This portal centralizes gateway docs, style guidelines, onboarding tutorials, and a
          live API playground for Hyperfocus services.
        </p>
      </section>
      <UsageExample />
    </div>
  );
}
