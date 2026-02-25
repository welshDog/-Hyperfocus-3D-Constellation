import { useMemo, useState } from 'react';

export function useSearchFilter<T>(
  items: T[],
  matcher: (item: T, query: string) => boolean
) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => items.filter((item) => matcher(item, query.toLowerCase())),
    [items, matcher, query]
  );
  return { query, setQuery, filtered };
}
