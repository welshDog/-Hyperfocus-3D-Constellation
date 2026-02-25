const colors = [
  { name: 'Background', value: '#0a0a0a' },
  { name: 'Surface', value: '#1a1a1a' },
  { name: 'Primary', value: '#00d4ff' },
  { name: 'Accent', value: '#ff00d4' },
  { name: 'Text', value: '#e0e0e0' },
  { name: 'Muted', value: '#a0a0a0' }
];

export function StyleGuidePage() {
  return (
    <div className="space-y-4">
      <section className="bg-surface p-4 rounded">
        <h2 className="text-xl mb-2">Design Tokens</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <div key={color.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded" style={{ background: color.value }} />
              <div>
                <div className="text-sm">{color.name}</div>
                <div className="text-xs text-muted">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface p-4 rounded">
        <h2 className="text-xl mb-2">Typography</h2>
        <p className="text-muted">Use system fonts with clear contrast and generous spacing.</p>
      </section>
    </div>
  );
}
