import { Activity, BookOpen, FlaskConical, Layout, LibraryBig, Rocket } from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: JSX.Element;
};

const items: NavItem[] = [
  { id: 'home', label: 'Overview', icon: <Layout className="w-4 h-4" /> },
  { id: 'style', label: 'Style Guide', icon: <LibraryBig className="w-4 h-4" /> },
  { id: 'api', label: 'API Docs', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'tutorials', label: 'Tutorials', icon: <Rocket className="w-4 h-4" /> },
  { id: 'playground', label: 'Playground', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'monitoring', label: 'Monitoring', icon: <Activity className="w-4 h-4" /> }
];

export function NavBar({
  active,
  onChange
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`px-3 py-2 rounded flex items-center gap-2 ${
            active === item.id ? 'bg-primary text-black' : 'bg-surface text-text'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
}
