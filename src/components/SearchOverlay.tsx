import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { journalPosts } from '../data/content';
import { Bottle } from './Bottle';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

const suggestions = [
  'woody', 'floral', 'oud', 'rose', 'summer', 'unisex', 'vegan', 'best seller', 'sample', 'bergamot',
];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], posts: [] };
    const q = query.toLowerCase();
    const productResults = products.filter((p) => {
      const haystack = [
        p.name, p.tagline, p.family, p.gender, p.concentration, p.inspiration,
        ...p.pyramid.top.map((n) => n.name),
        ...p.pyramid.heart.map((n) => n.name),
        ...p.pyramid.base.map((n) => n.name),
        ...p.mood, ...p.occasion,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    }).slice(0, 5);
    const postResults = journalPosts.filter((p) =>
      (p.title + p.excerpt + p.category).toLowerCase().includes(q)
    ).slice(0, 3);
    return { products: productResults, posts: postResults };
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)} />
      <div className="absolute left-1/2 top-0 w-full max-w-2xl -translate-x-1/2 px-4 pt-20">
        <div className="overflow-hidden rounded-2xl bg-[rgb(var(--bg))] shadow-2xl animate-fade-down">
          <div className="flex items-center gap-3 border-b border-ink-200/60 px-5 py-4 dark:border-ink-800/60">
            <Search size={20} className="text-ink-400" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances, notes, or journal…"
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-ink-400"
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={20} /></button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-5">
            {query.trim() === '' ? (
              <div>
                <p className="eyebrow mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-ink-300 px-3 py-1.5 text-xs capitalize text-ink-700 hover:border-gold-500 hover:text-gold-600 dark:border-ink-700 dark:text-ink-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.products.length === 0 && results.posts.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-500 dark:text-ink-400">
                No results for "{query}". Try a scent family like "woody" or a note like "rose".
              </p>
            ) : (
              <div className="space-y-6">
                {results.products.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">Fragrances</p>
                    <ul className="space-y-2">
                      {results.products.map((p, i) => (
                        <li key={p.id}>
                          <button
                            onClick={() => { setSearchOpen(false); navigate({ name: 'product', slug: p.slug }); }}
                            className="flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-ink-100/60 dark:hover:bg-ink-900/40"
                          >
                            <div
                              className="flex h-14 w-12 items-center justify-center rounded-lg"
                              style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}
                            >
                              <Bottle color={p.color} size={36} variant={variants[i % variants.length]} />
                            </div>
                            <div className="flex-1">
                              <p className="font-display text-lg leading-tight">{p.name}</p>
                              <p className="text-xs text-ink-500 dark:text-ink-400">{p.family} · {p.tagline}</p>
                            </div>
                            <span className="text-sm text-ink-600 dark:text-ink-300">${p.price}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {results.posts.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">From the Journal</p>
                    <ul className="space-y-2">
                      {results.posts.map((p) => (
                        <li key={p.id}>
                          <button
                            onClick={() => { setSearchOpen(false); navigate({ name: 'journal-post', slug: p.slug }); }}
                            className="block w-full rounded-xl p-2 text-left transition-colors hover:bg-ink-100/60 dark:hover:bg-ink-900/40"
                          >
                            <p className="font-display text-lg leading-tight">{p.title}</p>
                            <p className="text-xs text-ink-500 dark:text-ink-400">{p.category} · {p.readTime}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
